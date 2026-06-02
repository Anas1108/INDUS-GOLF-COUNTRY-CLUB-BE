const express = require('express');
const router = express.Router();
const {
  getClubData,
  getClubInfo,
  updateClubInfo,
  getPrivileges,
  createPrivilege,
  updatePrivilege,
  deletePrivilege,
  getTerms,
  createTerm,
  updateTerm,
  deleteTerm,
  getSections,
  updateSection
} = require('../controllers/clubController');
const protectAdmin = require('../middleware/auth');

// Aggregated full payload route (public read)
router.get('/data', getClubData);

// Metadata routes
router.route('/info')
  .get(getClubInfo)
  .put(protectAdmin, updateClubInfo);

// Privileges CRUD routes
router.route('/privileges')
  .get(getPrivileges)
  .post(protectAdmin, createPrivilege);

router.route('/privileges/:id')
  .put(protectAdmin, updatePrivilege)
  .delete(protectAdmin, deletePrivilege);

// Terms CRUD routes
router.route('/terms')
  .get(getTerms)
  .post(protectAdmin, createTerm);

router.route('/terms/:id')
  .put(protectAdmin, updateTerm)
  .delete(protectAdmin, deleteTerm);

// Sections CRUD routes
router.route('/sections')
  .get(getSections);

router.route('/sections/:section_id')
  .put(protectAdmin, updateSection);

module.exports = router;
