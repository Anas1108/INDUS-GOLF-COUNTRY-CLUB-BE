const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  section_id: {
    type: String,
    required: [true, 'Section identifier key is required'],
    unique: true,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  list_items: [{
    type: String,
    trim: true
  }],
  extra_data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Section', SectionSchema);
