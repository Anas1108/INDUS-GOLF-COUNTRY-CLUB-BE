const ManagementPerson = require('../models/ManagementPerson');

// @desc    Get all management persons
// @route   GET /api/management
// @access  Public
exports.getManagementPersons = async (req, res, next) => {
  try {
    const managementPersons = await ManagementPerson.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: managementPersons });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a management person
// @route   POST /api/management
// @access  Private/Admin
exports.addManagementPerson = async (req, res, next) => {
  try {
    const { name, appointment, picture } = req.body;

    if (!name || !appointment || !picture) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const managementPerson = await ManagementPerson.create({ name, appointment, picture });
    res.status(201).json({ success: true, data: managementPerson });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a management person
// @route   PUT /api/management/:id
// @access  Private/Admin
exports.updateManagementPerson = async (req, res, next) => {
  try {
    const { name, appointment, picture } = req.body;

    const managementPerson = await ManagementPerson.findById(req.params.id);
    if (!managementPerson) {
      return res.status(404).json({ success: false, message: 'Management person not found' });
    }

    managementPerson.name = name || managementPerson.name;
    managementPerson.appointment = appointment || managementPerson.appointment;
    managementPerson.picture = picture || managementPerson.picture;
    await managementPerson.save();

    res.status(200).json({ success: true, data: managementPerson });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a management person
// @route   DELETE /api/management/:id
// @access  Private/Admin
exports.deleteManagementPerson = async (req, res, next) => {
  try {
    const managementPerson = await ManagementPerson.findByIdAndDelete(req.params.id);
    if (!managementPerson) {
      return res.status(404).json({ success: false, message: 'Management person not found' });
    }
    res.status(200).json({ success: true, data: {}, message: 'Management person removed' });
  } catch (error) {
    next(error);
  }
};
