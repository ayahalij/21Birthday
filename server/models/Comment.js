const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  cardId: {
    type: Number,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);