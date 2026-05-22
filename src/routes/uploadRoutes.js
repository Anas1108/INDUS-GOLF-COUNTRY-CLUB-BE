const express = require('express');
const router = express.Router();
const multer = require('multer');
const protectAdmin = require('../middleware/auth');
const { uploadMedia, destroyMedia } = require('../controllers/uploadController');
const ClubInfo = require('../models/ClubInfo');

const storage = multer.memoryStorage();

// Middleware to configure multer dynamically based on db limit
const dynamicMulter = async (req, res, next) => {
  let limitMb = 50; // default
  try {
    const info = await ClubInfo.findOne();
    if (info && info.upload_limit_mb) {
      limitMb = info.upload_limit_mb;
    }
  } catch (err) {
    console.error('Failed to fetch ClubInfo for upload limit', err);
  }

  const upload = multer({
    storage,
    limits: {
      fileSize: limitMb * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image and video files are allowed!'), false);
      }
    }
  }).single('file'); // We will use 'file' as the generic field name

  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

router.post('/', protectAdmin, dynamicMulter, uploadMedia);
router.post('/destroy', protectAdmin, destroyMedia);

module.exports = router;
