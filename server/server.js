const express = require('express');
const cors = require('cors');
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

// Routes
app.use('/api/cards', require('./routes/cards'));
app.use('/api/comments', require('./routes/comments'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});