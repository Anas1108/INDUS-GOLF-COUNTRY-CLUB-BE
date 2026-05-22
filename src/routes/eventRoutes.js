const express = require('express');
const router = express.Router();
const protectAdmin = require('../middleware/auth');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

router.route('/')
  .get(getEvents)
  .post(protectAdmin, createEvent);

router.route('/:id')
  .put(protectAdmin, updateEvent)
  .delete(protectAdmin, deleteEvent);

module.exports = router;
