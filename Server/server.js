// Import necessary packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// Import the configuration file to connect to the database
import connectDB from './config/database.js';
// Import the routes file
import developersRoutes from './routes/developers.routes.js';
import skillsRoutes from './routes/skills.routes.js';
import employersRoutes from './routes/employers.routes.js';
import positionsRoutes from './routes/positions.routes.js';

// Load environment variables from a .env file
dotenv.config();

// Create an instance of the express application
const app = express();

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



// Define basic routes with use so we can further go to the routes.
app.use('/api/developers', developersRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/employers', employersRoutes);
app.use('/api/positions', positionsRoutes);

// Configure the server to listen on the specified port
app.listen(port, () => {
	console.log(`El servidor está activo en el puerto: ${port}`);
});