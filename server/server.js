const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Run seed script in production (one-time)
if (process.env.NODE_ENV === 'production' && process.env.RUN_SEED === 'true') {
  console.log('Running seed script...');
  require('./seed');
}

// Middleware
app.use(cors());
app.use(express.json());

// API Routes (define these BEFORE static file serving)
app.use('/api/cards', require('./routes/cards'));
app.use('/api/comments', require('./routes/comments'));

// Health check route for Render
app.get('/healthz', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    message: 'Digital Scrapbook API is running!',
    timestamp: new Date().toISOString()
  });
});

// Debug route to check environment variables
app.get('/debug', (req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    RENDER: process.env.RENDER,
    PORT: process.env.PORT,
    buildExists: require('fs').existsSync(path.join(__dirname, '../client/build')),
    buildIndexExists: require('fs').existsSync(path.join(__dirname, '../client/build/index.html'))
  });
});

// Serve static files from React build
// Check if build directory exists
const buildPath = path.join(__dirname, '../client/build');
const fs = require('fs');

if (fs.existsSync(buildPath)) {
  console.log('✅ Build directory found, serving React app');
  
  // Serve static files from the React app build directory
  app.use(express.static(buildPath));
  
  // Handle React routing - send all non-API requests to React app
  app.get('*', (req, res) => {
    const indexPath = path.join(buildPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ error: 'React app not built properly' });
    }
  });
} else {
  console.log('❌ Build directory not found');
  // Development mode or build failed
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Build directory not found. Run "npm run build" first.',
      buildPath: buildPath,
      NODE_ENV: process.env.NODE_ENV
    });
  });
  
  // Catch all other routes
  app.get('*', (req, res) => {
    res.status(404).json({ 
      error: 'React app not built. Run "npm run build" first.',
      path: req.path
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Build path: ${buildPath}`);
  console.log(`Build exists: ${fs.existsSync(buildPath)}`);
});