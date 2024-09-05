import styles from '../css/ChatList.module.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ChatList = ({ dataApiEmployers, dataApiDevelopers }) => {
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); // Initialize `useNavigate`
    let decodedToken;

    // Check if the token exists, if not navigate to the login or fallback route
    if (token) {
        try {
            decodedToken = jwtDecode(token);
        } catch (error) {
            console.error('Failed to decode token:', error);
            navigate('/login'); // Redirect to login if token is invalid
            return null; // Don't render the component if token is invalid
        }
    } else {
        navigate('/login'); // Redirect to login if token doesn't exist
        return null; // Don't render the component if there's no token
    }

    const { email, stageOfCompletion } = decodedToken;

    // Ensure the arrays are defined before using them
    const arrayreceiver = [
        ...(dataApiEmployers?.employersApiArray || []),
        ...(dataApiDevelopers?.developersApiArray || [])
    ];

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
            } finally {
                setIsLoading(false); // Set loading state to false after fetching
            }
        };

        fetchChats();
    }, [token]);

    if (isLoading) {
        return <p>Loading chats...</p>; // Display a loading message
    }

    return (
        <div className={`${styles.chats} card text-white`} style={{ width: "70rem" }}>
            <div className={`${styles.cardHeader} card-header`}>
                <h1>{stageOfCompletion === 5 ? decodedToken.orgName : decodedToken.firstName}'s Chats:</h1>
            </div>
            <div className={`${styles.cardBody} card-body`}>
                {chats.length === 0 ? (
                    <p>No chats available.</p>
                ) : (
                    chats.map((chat) => {
                        const otherParticipantEmail = chat.participants.find(participant => participant !== email);
                        const receiver = arrayreceiver.find(receiver => receiver.email === otherParticipantEmail);

                        if (!receiver) {
                            return null; // Skip rendering if no receiver is found
                        }

                        return (
                            <div key={chat._id} className={`${styles.chatsCard} card bg-dark`}>
                                <Link to={`/chats/${chat._id}/${receiver.email}`}>
                                    <div className={styles.chatPic}>
                                        <img className={styles.iconx} src={`data:image/jpeg;base64,${receiver.image}`} alt="Profile" />
                                    </div>
                                    <div className={styles.chatInfo}>
                                        <h4>
                                            {!receiver.stageOfCompletion
                                                ? receiver.orgName
                                                : `${receiver.firstName} ${receiver.lastName}`}
                                        </h4>
                                        <h3>{chat.lastMessage?.content || 'No messages yet.'}</h3>
                                    </div>
                                    <div className={styles.chatDate}>
                                        <p>{new Date(chat.lastMessage?.updatedAt).toLocaleString()}</p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ChatList;

