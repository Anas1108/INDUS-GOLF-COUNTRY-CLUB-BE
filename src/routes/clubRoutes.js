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

// Aggregated full payload route
router.get('/data', getClubData);

// Metadata routes
router.route('/info')
  .get(getClubInfo)
  .put(updateClubInfo);

// Privileges CRUD routes
router.route('/privileges')
  .get(getPrivileges)
  .post(createPrivilege);

router.route('/privileges/:id')
  .put(updatePrivilege)
  .delete(deletePrivilege);

// Terms CRUD routes
router.route('/terms')
  .get(getTerms)
  .post(createTerm);

router.route('/terms/:id')
  .put(updateTerm)
  .delete(deleteTerm);

// Sections CRUD routes
router.route('/sections')
  .get(getSections);

router.route('/sections/:section_id')
  .put(updateSection);

module.exports = router;
