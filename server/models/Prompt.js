const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  template: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'General',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Prompt', promptSchema);
