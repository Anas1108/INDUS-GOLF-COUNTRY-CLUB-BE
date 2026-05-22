const Event = require('../models/Event');
const cloudinary = require('../config/cloudinary');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error fetching events', error: error.message });
  }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error creating event', error: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
exports.updateEvent = async (req, res, next) => {
  try {
    const oldEvent = await Event.findById(req.params.id);
    if (!oldEvent) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (req.body.media && Array.isArray(req.body.media)) {
      const newMediaIds = req.body.media.map(m => m.public_id).filter(Boolean);
      const removedMedia = oldEvent.media.filter(m => m.public_id && !newMediaIds.includes(m.public_id));
      
      for (const m of removedMedia) {
        try {
          await cloudinary.uploader.destroy(m.public_id, { resource_type: m.type === 'video' ? 'video' : 'image' });
        } catch (err) {
          console.error('Failed to delete removed media from Cloudinary', err);
        }
      }
    }

    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error updating event', error: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Optionally: delete all associated media from Cloudinary
    if (event.media && event.media.length > 0) {
      for (const m of event.media) {
        if (m.public_id) {
          try {
            await cloudinary.uploader.destroy(m.public_id, { resource_type: m.type === 'video' ? 'video' : 'image' });
          } catch (cloudErr) {
            console.error('Failed to delete from Cloudinary', cloudErr);
          }
        }
      }
    }

    res.status(200).json({ success: true, data: {}, message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error deleting event', error: error.message });
  }
};
