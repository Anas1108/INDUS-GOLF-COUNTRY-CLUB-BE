const mongoose = require('mongoose');

const TermSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Term text is required'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Term', TermSchema);
