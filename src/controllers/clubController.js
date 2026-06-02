const ClubInfo = require('../models/ClubInfo');
const Privilege = require('../models/Privilege');
const Term = require('../models/Term');
const Member = require('../models/Member');
const Section = require('../models/Section');

// @desc    Get aggregated club data for frontend
// @route   GET /api/club/data
// @access  Public
exports.getClubData = async (req, res, next) => {
  try {
    const [clubInfo, privileges, terms, members, sectionsList] = await Promise.all([
      ClubInfo.findOne(),
      Privilege.find(),
      Term.find(),
      Member.find(),
      Section.find()
    ]);

    const termsArray = terms.map(t => t.text);

    const sectionsObj = {};
    sectionsList.forEach(sec => {
      sectionsObj[sec.section_id] = {
        title: sec.title,
        subtitle: sec.subtitle,
        description: sec.description,
        list_items: sec.list_items,
        extra_data: sec.extra_data
      };
    });

    res.status(200).json({
      success: true,
      data: {
        club_info: clubInfo || {},
        club_privileges: privileges || [],
        terms_and_conditions: termsArray || [],
        members: members || [],
        sections: sectionsObj || {}
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get club metadata
// @route   GET /api/club/info
// @access  Public
exports.getClubInfo = async (req, res, next) => {
  try {
    const info = await ClubInfo.findOne();
    if (!info) {
      return res.status(404).json({ success: false, message: 'Club info not found' });
    }
    res.status(200).json({ success: true, data: info });
  } catch (error) {
    next(error);
  }
};

// @desc    Update club metadata
// @route   PUT /api/club/info
// @access  Private
exports.updateClubInfo = async (req, res, next) => {
  try {
    let info = await ClubInfo.findOne();
    if (!info) {
      info = await ClubInfo.create(req.body);
    } else {
      info = await ClubInfo.findByIdAndUpdate(info._id, req.body, { new: true, runValidators: true });
    }
    res.status(200).json({ success: true, data: info });
  } catch (error) {
    next(error);
  }
};

// --- Privileges CRUD ---

exports.getPrivileges = async (req, res, next) => {
  try {
    const privileges = await Privilege.find();
    res.status(200).json({ success: true, data: privileges });
  } catch (error) {
    next(error);
  }
};

exports.createPrivilege = async (req, res, next) => {
  try {
    const privilege = await Privilege.create(req.body);
    res.status(201).json({ success: true, data: privilege });
  } catch (error) {
    next(error);
  }
};

exports.updatePrivilege = async (req, res, next) => {
  try {
    const privilege = await Privilege.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!privilege) return res.status(404).json({ success: false, message: 'Privilege not found' });
    res.status(200).json({ success: true, data: privilege });
  } catch (error) {
    next(error);
  }
};

exports.deletePrivilege = async (req, res, next) => {
  try {
    const privilege = await Privilege.findByIdAndDelete(req.params.id);
    if (!privilege) return res.status(404).json({ success: false, message: 'Privilege not found' });
    res.status(200).json({ success: true, data: {}, message: 'Privilege removed' });
  } catch (error) {
    next(error);
  }
};

// --- Terms CRUD ---

exports.getTerms = async (req, res, next) => {
  try {
    const terms = await Term.find();
    res.status(200).json({ success: true, data: terms });
  } catch (error) {
    next(error);
  }
};

exports.createTerm = async (req, res, next) => {
  try {
    const term = await Term.create(req.body);
    res.status(201).json({ success: true, data: term });
  } catch (error) {
    next(error);
  }
};

exports.updateTerm = async (req, res, next) => {
  try {
    const term = await Term.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!term) return res.status(404).json({ success: false, message: 'Term not found' });
    res.status(200).json({ success: true, data: term });
  } catch (error) {
    next(error);
  }
};

exports.deleteTerm = async (req, res, next) => {
  try {
    const term = await Term.findByIdAndDelete(req.params.id);
    if (!term) return res.status(404).json({ success: false, message: 'Term not found' });
    res.status(200).json({ success: true, data: {}, message: 'Term removed' });
  } catch (error) {
    next(error);
  }
};

// --- Sections CRUD ---

exports.getSections = async (req, res, next) => {
  try {
    const sections = await Section.find();
    res.status(200).json({ success: true, data: sections });
  } catch (error) {
    next(error);
  }
};

exports.updateSection = async (req, res, next) => {
  try {
    const section = await Section.findOneAndUpdate(
      { section_id: req.params.section_id },
      req.body,
      { new: true, runValidators: true, upsert: true }
    );
    res.status(200).json({ success: true, data: section });
  } catch (error) {
    next(error);
  }
};
