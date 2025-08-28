const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Serve images and audio from the public directory
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));
app.use('/audio', express.static(path.join(__dirname, '../client/public/audio')));

// API Routes
app.use('/api/cards', require('./routes/cards'));
app.use('/api/comments', require('./routes/comments'));

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});