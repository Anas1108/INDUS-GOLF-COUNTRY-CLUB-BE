const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// @desc    Admin login and token generation
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username and password'
      });
    }

    // Find admin by username (stored in lowercase)
    const admin = await Admin.findOne({ username: username.toLowerCase() });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token valid for 1 day
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'super_secret_jwt_key_indus_golf_club',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify admin token
// @route   GET /api/admin/verify
// @access  Private
const verifyAdmin = async (req, res, next) => {
  try {
    // req.admin was populated in authentication middleware
    res.status(200).json({
      success: true,
      message: 'Token is valid',
      admin: req.admin
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin credentials
// @route   PUT /api/admin/credentials
// @access  Private
const updateCredentials = async (req, res, next) => {
  try {
    const { currentPassword, newUsername, newPassword } = req.body;
    
    // req.admin.id is set by protectAdmin middleware
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // Verify current password
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect current password' });
    }

    // Update username if provided
    if (newUsername) {
      admin.username = newUsername.toLowerCase();
    }

    // Update password if provided
    if (newPassword) {
      admin.password = newPassword;
    }

    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Credentials updated successfully'
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }
    next(error);
  }
};

module.exports = {
  loginAdmin,
  verifyAdmin,
  updateCredentials
};
