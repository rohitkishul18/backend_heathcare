const express = require('express');
const connectDB = require('./db/connection');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', require('./routes/users')); // User management routes
app.use('/api/habit', require('./routes/habit')); // Habit management routes
app.use('/api/habitlogs', require('./routes/habitlog')); // Habit logging routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
