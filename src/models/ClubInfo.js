const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  phone: { type: String, trim: true },
  email: { type: String, trim: true },
  website: { type: String, trim: true }
}, { _id: false });

const InfrastructureSchema = new mongoose.Schema({
  clubhouse: { type: String, trim: true }
}, { _id: false });

const ClubInfoSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Club name is required'], trim: true },
  short_name: { type: String, trim: true },
  location: { type: String, trim: true },
  motto: { type: String, trim: true },
  affiliations: [{ type: String, trim: true }],
  contact: ContactSchema,
  infrastructure: InfrastructureSchema
}, {
  timestamps: true,
  collection: 'club_info'
});

module.exports = mongoose.model('ClubInfo', ClubInfoSchema);
