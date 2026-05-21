const Complaint = require('../models/Complaint');

// @desc    Submit a new complaint
// @route   POST /api/complaints
// @access  Public
exports.submitComplaint = async (req, res, next) => {
  try {
    const { userName, message, honeypot } = req.body;

    // Honeypot check for simple bot/spam protection
    if (honeypot) {
      // Silently accept it if the bot filled the hidden honeypot field
      return res.status(200).json({
        success: true,
        message: 'Complaint submitted successfully'
      });
    }

    if (!userName || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both user name and message'
      });
    }

    const complaint = await Complaint.create({ userName, message });

    res.status(201).json({
      success: true,
      data: complaint,
      message: 'Complaint submitted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Admin
exports.getAllComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (err) {
    next(err);
  }
};
