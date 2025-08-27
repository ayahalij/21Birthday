const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// Get comments for a card
router.get('/:cardId', async (req, res) => {
  try {
    const comments = await Comment.find({ cardId: req.params.cardId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add comment
router.post('/', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all comments (for main page)
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 }).limit(10);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;