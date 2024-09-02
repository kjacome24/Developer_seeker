import { io } from 'socket.io-client';
import { useEffect } from 'react';

const Socket = ({ setSocket }) => {
    useEffect(() => {
        const socketInstance = io('http://localhost:8080/');
        setSocket(socketInstance);

        console.log('Socket connection established.');

        // Clean up the socket connection when the component unmounts
        return () => {
            console.log('Socket connection closed.');
            socketInstance.disconnect();
        };
    }, []); // Dependency on setSocket ensures this effect runs only once

    return null; // This component doesn't render anything
};

export default Socket;
