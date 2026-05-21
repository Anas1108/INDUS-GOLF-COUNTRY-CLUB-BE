const express = require('express');
const router = express.Router();
const { loginAdmin, verifyAdmin } = require('../controllers/adminController');
const protectAdmin = require('../middleware/auth');

// Public route to log in
router.post('/login', loginAdmin);

// Private route to verify session validity
router.get('/verify', protectAdmin, verifyAdmin);

module.exports = router;
