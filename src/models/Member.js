const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  membership_no: {
    type: String,
    required: [true, 'Membership number is required'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Member name is required'],
    trim: true
  },
  father_spouse_name: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  cnic: {
    type: String,
    trim: true
  },
  dob: {
    type: String,
    trim: true
  },
  handicap: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Category/Designation is required'],
    trim: true
  },
  valid_upto: {
    type: String,
    default: null
  },
  card_style: {
    type: String,
    enum: ['gold-luxury', 'classic-green'],
    default: 'classic-green'
  },
  photo_url: {
    type: String,
    default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400' // Default fallback photo
  },
  signatory: {
    type: String,
    default: 'Club Management'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', MemberSchema);
