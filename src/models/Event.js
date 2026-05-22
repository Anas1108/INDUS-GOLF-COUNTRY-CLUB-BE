const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], required: true }
}, { _id: false });

const EventSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Event title is required'], trim: true },
  description: { type: String, trim: true },
  date: { type: Date, default: Date.now },
  media: [MediaSchema]
}, {
  timestamps: true,
  collection: 'events'
});

module.exports = mongoose.model('Event', EventSchema);
