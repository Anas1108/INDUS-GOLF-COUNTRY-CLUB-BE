const express = require('express');
const router = express.Router();
const { submitComplaint, getAllComplaints } = require('../controllers/complaintController');
const protectAdmin = require('../middleware/auth');

router.route('/')
  .post(submitComplaint)
  .get(protectAdmin, getAllComplaints);

module.exports = router;
