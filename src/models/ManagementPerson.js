const mongoose = require('mongoose');

const managementPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  appointment: {
    type: String,
    required: [true, 'Appointment is required']
  },
  picture: {
    type: String, // Cloudinary URL
    required: [true, 'Picture is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ManagementPerson', managementPersonSchema);
