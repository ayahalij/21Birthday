const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true
  },
  secretMessage: {
    type: String,
    required: true
  },

}, {
  timestamps: true
});

module.exports = mongoose.model('Card', cardSchema);