const cloudinary = require('../config/cloudinary');

exports.uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Convert buffer to base64 data URI string
    const fileBase64 = req.file.buffer.toString('base64');
    const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'indus_club_members', // We can keep this or make it dynamic
      resource_type: 'auto'
    });

    res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      type: req.file.mimetype.startsWith('video/') ? 'video' : 'image'
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload media to Cloudinary',
      error: error.message
    });
  }
};

exports.destroyMedia = async (req, res, next) => {
  try {
    const { public_id, resource_type } = req.body;
    if (!public_id) {
      return res.status(400).json({ success: false, message: 'public_id is required' });
    }
    const result = await cloudinary.uploader.destroy(public_id, { resource_type: resource_type || 'image' });
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Cloudinary destroy error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete media', error: error.message });
  }
};
