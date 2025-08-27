const express = require('express');
const Card = require('../models/Card');
const router = express.Router();

// Get all cards
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find().sort({ id: 1 });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single card
router.get('/:id', async (req, res) => {
  try {
    const card = await Card.findOne({ id: req.params.id });
    if (!card) return res.status(404).json({ message: 'Card not found' });
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;