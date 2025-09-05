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
app.use(express.static('public'));

// API Routes
app.use('/api/cards', require('./routes/cards'));
app.use('/api/comments', require('./routes/comments'));

// Serve static files from React build (for production)
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app build directory
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Handle React routing - send all non-API requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  // Development mode - just show a message
  app.get('/', (req, res) => {
    res.json({ message: 'Development mode - use npm run dev' });
  });
}

// Health check route for Render
app.get('/healthz', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    message: 'Digital Scrapbook API is running!',
    timestamp: new Date().toISOString()
  });
});

// Root route for API testing (optional)
app.get('/api', (req, res) => {
  res.json({ message: 'Digital Scrapbook API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});