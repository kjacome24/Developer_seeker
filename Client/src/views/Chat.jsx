import React, { useEffect, useState } from 'react';
import Socket from './Socket';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (socket) {
            socket.on('message', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            return () => {
                socket.off('message');
            };
        }
    }, [socket]); // Dependency on socket ensures the effect runs when socket is set

    const sendMessage = () => {
        console.log('Sending message:', newMessage);
        console.log('Socket:', socket);
        if (socket) {
            socket.emit('message', newMessage);
            setNewMessage('');
        }
    };

    return (
        <div>
            <Socket setSocket={setSocket} />
            <h1>Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
