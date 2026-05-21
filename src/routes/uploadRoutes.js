const express = require('express');
const router = express.Router();
const multer = require('multer');
const protectAdmin = require('../middleware/auth');
const { uploadImage } = require('../controllers/uploadController');

// Configure multer memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Upload endpoint secured with admin authentication
router.post('/', protectAdmin, upload.single('image'), uploadImage);

module.exports = router;
