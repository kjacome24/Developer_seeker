import styles from '../css/ChatList.module.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ChatList = ({dataApiEmployers,dataApiDevelopers}) => {
    const [chats, setChats] = useState([]);
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const {email, stageOfCompletion} = decodedToken;
    console.log(decodedToken);
    const arrayreceiver = [...dataApiEmployers.employersApiArray, ...dataApiDevelopers.developersApiArray];
    console.log(arrayreceiver);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/chats', {
                    headers: {
                        'user_token': token,
                    },
                });
                setChats(response.data);
            } catch (error) {
                console.error('Failed to fetch chats:', error);
            }
        };

        fetchChats();
    }, [token]);
    
    
    return (
        <div className={`${styles.chats} card text-white`} style={{ width: "70rem" }}>
            <div className={`${styles.cardHeader} card-header`}>
                <h1>{stageOfCompletion===5? decodedToken.orgName: decodedToken.firstName
                }'s Chats:</h1>
            </div>
            <div className={`${styles.cardBody} card-body`}>
                {chats.length === 0 ? (
                    <p>No chats available.</p>
                ) : (
                    chats.map((chat) => (
                        <div className="chat-card card">
                            <Link to={`/chats/${chat._id}`} key={chat._id} className="chat-card">
                                <div className="chat-info">
                                    <h4>
                                        {chat.participants.find(email0 => email0 !== email) }
                                    </h4>
                                    <p>{chat.lastMessage?.content || 'No messages yet.'}</p>
                                </div>
                            </Link>

                        </div>   

                    ))
                )}
            </div>

        </div>
    );
};

export default ChatList;
