const express = require('express');
const router = express.Router();
const {
  getManagementPersons,
  addManagementPerson,
  updateManagementPerson,
  deleteManagementPerson
} = require('../controllers/managementPersonController');
const protectAdmin = require('../middleware/auth');

router.route('/')
  .get(getManagementPersons)
  .post(protectAdmin, addManagementPerson);

router.route('/:id')
  .put(protectAdmin, updateManagementPerson)
  .delete(protectAdmin, deleteManagementPerson);

module.exports = router;
