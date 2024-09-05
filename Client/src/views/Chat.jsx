import React, { useEffect, useState, useRef  } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styles from '../css/Chat.module.css'; // Custom CSS module

const socket = io('http://localhost:8080');

const Chat = ({dataApiEmployers,dataApiDevelopers}) => {
    const { chatId, emailTo } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const { email } = decodedToken;
    const notificationSound = new Audio('../../public/sounds/notification.mp3');
        // Reference for the messages container
    const messagesEndRef = useRef(null);
    const arrayreceiver = [...dataApiEmployers.employersApiArray, ...dataApiDevelopers.developersApiArray];
    const receiver = arrayreceiver.find(receiver => receiver.email==emailTo);


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
            if (message.sender !== email) {
                notificationSound.play();
            }
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
            socket.emit('leaveChat', { chatId });
        };
    }, [chatId, email, notificationSound]);

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages,receiver]);

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
        // If receiver is not found, handle it by showing a loading message or returning null
        if (!receiver) {
            return <p>Loading chat information...</p>;
        }

    return (
        <div className={`${styles.chats} card text-white`} style={{ width: '70rem' }}>
            <div className={`${styles.cardHeader} card-header`}>
                <div className={styles.headera}>
                    <img className={styles.iconx} src={`data:image/jpeg;base64,${receiver.image}`} alt="Profile" />
                </div>
                <div className={styles.headerb}>
                    <h2>{!receiver.stageOfCompletion? receiver.orgName:receiver.firstName + ' ' + receiver.lastName}</h2>
                </div>

            </div>
            <div className={`${styles.cardBody} card-body`}>
                <div className={`${styles.messages}`}>
                    {messages.map((message) => (
                        <div
                            key={message._id}
                            className={message.sender === email ? styles.sentMessage : styles.receivedMessage}
                        >
                            {message.content}
                        </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                </div>
            </div>
            <div className={`${styles.cardFooter} card-footer`}>
                <div className={`${styles.messageInputContainer} input-group`}>
                    <input
                        type="text"
                        className={`${styles.messageInput} form-control`}
                        placeholder="Type your message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button className="btn btn-primary" onClick={handleSendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;

