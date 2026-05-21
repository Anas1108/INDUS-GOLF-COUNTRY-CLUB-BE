const express = require('express');
const router = express.Router();
const {
  getMembers,
  getMemberByNo,
  createMember,
  updateMember,
  deleteMember
} = require('../controllers/memberController');
const protectAdmin = require('../middleware/auth');

// Routes mapped to controllers
router.route('/')
  .get(getMembers)
  .post(protectAdmin, createMember);

router.route('/:membership_no')
  .get(getMemberByNo);

router.route('/:id')
  .put(protectAdmin, updateMember)
  .delete(protectAdmin, deleteMember);

module.exports = router;
