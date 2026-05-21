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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Privilege', PrivilegeSchema);
