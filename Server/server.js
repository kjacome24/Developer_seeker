// Import necessary packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Import the configuration file to connect to the database
import connectDB from './config/database.js';
// Import the routes file
import developersRoutes from './routes/developers.routes.js';
import skillsRoutes from './routes/skills.routes.js';
import employersRoutes from './routes/employers.routes.js';
import positionsRoutes from './routes/positions.routes.js';
import chatsRoutes from './routes/chats.routes.js';

// Load environment variables from a .env file
dotenv.config();

// Create an instance of the express application
const app = express();

// Create an HTTP server
const server = createServer(app);

// Define the port on which the server will listen for requests
const port = process.env.PORT || 8000;

// Function to connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173"
}));

// Socket.io setup
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    },
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');
    console.log(socket.id);

  // Se escucha el evento newMessage para recibir mensajes del cliente
  // y se reenvían a todos los clientes conectados usando io.emit.
    socket.on('message', (message) => {
    console.log('Mensaje recibido:', message);
    io.emit('message', message);
});

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    
});


// Define basic routes with use so we can further go to the routes.
app.use('/api/developers', developersRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/employers', employersRoutes);
app.use('/api/positions', positionsRoutes);
app.use('/api/chats', chatsRoutes);

// Configure the server to listen on the specified port
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});