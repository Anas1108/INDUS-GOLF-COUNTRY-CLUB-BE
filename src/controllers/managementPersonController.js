const ManagementPerson = require('../models/ManagementPerson');

// @desc    Get all management persons
// @route   GET /api/management
// @access  Public
exports.getManagementPersons = async (req, res) => {
  try {
    const managementPersons = await ManagementPerson.find().sort({ createdAt: 1 });
    res.status(200).json(managementPersons);
  } catch (error) {
    console.error('Error fetching management persons:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a management person
// @route   POST /api/management
// @access  Private/Admin
exports.addManagementPerson = async (req, res) => {
  try {
    const { name, appointment, picture } = req.body;

    if (!name || !appointment || !picture) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const managementPerson = await ManagementPerson.create({
      name,
      appointment,
      picture
    });

    res.status(201).json(managementPerson);
  } catch (error) {
    console.error('Error adding management person:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a management person
// @route   PUT /api/management/:id
// @access  Private/Admin
exports.updateManagementPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, appointment, picture } = req.body;

    let managementPerson = await ManagementPerson.findById(id);

    if (!managementPerson) {
      return res.status(404).json({ message: 'Management person not found' });
    }

    managementPerson.name = name || managementPerson.name;
    managementPerson.appointment = appointment || managementPerson.appointment;
    managementPerson.picture = picture || managementPerson.picture;

    await managementPerson.save();

    res.status(200).json(managementPerson);
  } catch (error) {
    console.error('Error updating management person:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a management person
// @route   DELETE /api/management/:id
// @access  Private/Admin
exports.deleteManagementPerson = async (req, res) => {
  try {
    const { id } = req.params;

    const managementPerson = await ManagementPerson.findById(id);

    if (!managementPerson) {
      return res.status(404).json({ message: 'Management person not found' });
    }

    await managementPerson.deleteOne();

    res.status(200).json({ message: 'Management person removed' });
  } catch (error) {
    console.error('Error deleting management person:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
