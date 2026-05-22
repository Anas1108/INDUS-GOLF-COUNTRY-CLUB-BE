const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'User name is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
