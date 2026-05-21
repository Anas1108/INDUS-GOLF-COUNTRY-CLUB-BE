const Member = require('../models/Member');

// @desc    Get all members
// @route   GET /api/members
// @access  Public
exports.getMembers = async (req, res, next) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching members',
      error: error.message
    });
  }
};

// @desc    Get single member by membership number
// @route   GET /api/members/:membership_no
// @access  Public
exports.getMemberByNo = async (req, res, next) => {
  try {
    const member = await Member.findOne({ membership_no: req.params.membership_no });
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: `Member with membership number ${req.params.membership_no} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching member details',
      error: error.message
    });
  }
};

// @desc    Create new member
// @route   POST /api/members
// @access  Public
exports.createMember = async (req, res, next) => {
  try {
    const { membership_no } = req.body;

    // Check if membership number already exists
    const existingMember = await Member.findOne({ membership_no });
    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: `Membership number ${membership_no} already exists`
      });
    }

    const member = await Member.create(req.body);
    res.status(201).json({
      success: true,
      data: member
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error creating member',
      error: error.message
    });
  }
};

// @desc    Update member details
// @route   PUT /api/members/:id
// @access  Public
exports.updateMember = async (req, res, next) => {
  try {
    let member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: `Member with ID ${req.params.id} not found`
      });
    }

    member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error updating member',
      error: error.message
    });
  }
};

// @desc    Delete member
// @route   DELETE /api/members/:id
// @access  Public
exports.deleteMember = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: `Member with ID ${req.params.id} not found`
      });
    }

    await Member.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
      message: 'Member successfully removed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error deleting member',
      error: error.message
    });
  }
};
