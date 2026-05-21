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

module.exports = {
  loginAdmin,
  verifyAdmin
};
