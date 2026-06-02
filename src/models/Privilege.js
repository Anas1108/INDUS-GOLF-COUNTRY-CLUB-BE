const mongoose = require('mongoose');

const PrivilegeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Privilege ID key is required'],
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Privilege title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Privilege description is required'],
    trim: true
  },
  icon: {
    type: String,
    default: 'fa-solid fa-star',
    trim: true
  },
  label: {
    type: String,
    default: 'CLUB PRIVILEGE',
    trim: true
  },
  details: [{
    type: { type: String, enum: ['text', 'list', 'image'], default: 'text' },
    title: { type: String, trim: true },
    content: { type: String, trim: true }, // Used for text type
    items: [mongoose.Schema.Types.Mixed], // Used for list type (can be String or { text, imageUrl })
    imageUrl: { type: String, trim: true } // Used for image type
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Privilege', PrivilegeSchema);
