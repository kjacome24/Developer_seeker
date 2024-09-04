import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const socket = io('http://localhost:8080');

const Chat = () => {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const {email} = decodedToken;

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/chats/${chatId}/messages`, {
                    headers: {
                        'user_token': token,
                    },
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        fetchMessages();
    }, [chatId, token]);

    useEffect(() => {
        socket.emit('joinChat', { chatId });

        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
            socket.emit('leaveChat', { chatId }); // Optionally leave the chat room
        };
    }, [chatId]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            socket.emit('sendMessage', {
                chatId,
                content: newMessage,
                senderEmail: email,
            });
            setNewMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`message ${message.sender === email ? 'sent' : 'received'}`}
                    >
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;

