const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const Member = require('../models/Member');
const ClubInfo = require('../models/ClubInfo');
const Privilege = require('../models/Privilege');
const Term = require('../models/Term');
const Section = require('../models/Section');
const Admin = require('../models/Admin');


const seedDB = async () => {
  try {
    const connString = process.env.MONGODB_URI;
    if (!connString || connString === 'YOUR_MONGODB_ATLAS_URI_HERE') {
      console.error('\x1b[31m%s\x1b[0m', 'Seeding aborted: MONGODB_URI is not set or contains the default placeholder inside BE/.env.');
      return;
    }

    // Connect to database
    console.log('Connecting to database for seeding...');
    await mongoose.connect(connString);
    console.log('Database connected.');

    // Path to the frontend JSON data file
    const dataPath = path.join(__dirname, '..', '..', '..', 'FE', 'indus_golf_club_data.json');
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Data file not found at path: ${dataPath}`);
    }

    // Read and parse JSON data
    console.log('Reading indus_golf_club_data.json...');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const clubData = JSON.parse(rawData);

    // 0. Seed Admin Credentials
    console.log('Cleaning and seeding admins collection...');
    await Admin.deleteMany();
    await Admin.create([
      { username: 'admin', password: '12345678' },
      { username: 'name', password: '12345678' }
    ]);
    console.log('Admin accounts successfully seeded.');

    // 1. Seed Club Info
    console.log('Cleaning and seeding club_info collection...');
    await ClubInfo.deleteMany();
    await ClubInfo.create(clubData.club_info);
    console.log('Club details successfully seeded.');

    // 2. Seed Privileges
    console.log('Cleaning and seeding privileges collection...');
    await Privilege.deleteMany();
    await Privilege.insertMany(clubData.club_privileges);
    console.log('Privileges successfully seeded.');

    // 3. Seed Terms
    console.log('Cleaning and seeding terms collection...');
    await Term.deleteMany();
    const formattedTerms = clubData.terms_and_conditions.map(text => ({ text }));
    await Term.insertMany(formattedTerms);
    console.log('Terms successfully seeded.');

    // 4. Seed Members
    console.log('Cleaning and seeding members collection...');
    await Member.deleteMany();
    const formattedMembers = clubData.members.map(member => ({
      membership_no: member.membership_no,
      name: member.name,
      father_spouse_name: member.father_spouse_name,
      address: member.address,
      cnic: member.cnic,
      dob: member.dob,
      handicap: Number(member.handicap) || 0,
      category: member.category,
      valid_upto: member.valid_upto,
      card_style: member.card_style || 'classic-green',
      photo_url: member.photo_url,
      signatory: member.signatory || 'Club Management'
    }));
    await Member.insertMany(formattedMembers);
    console.log('Members successfully seeded.');

    // 5. Seed Section Copy Texts (previously hardcoded in App.vue)
    console.log('Cleaning and seeding sections collection...');
    await Section.deleteMany();

    const sections = [
      {
        section_id: 'hero',
        title: 'Golf Café & Lounge',
        subtitle: 'ESTABLISHED 2026 • GOLF - CAMARADERIE - EXCELLENCE • ATTOCK CANTT, PAKISTAN',
        description: 'Welcome to Indus Golf & Country Club, an ultra-exclusive culinary sanctuary overlooking the pristine fairway in Attock Cantt, Pakistan. Experience the perfect harmony of gourmet dining, state-of-the-art virtual golf simulator bays, and premium social privileges.',
        list_items: [],
        extra_data: {
          primary_cta: 'Explore Café & Bays',
          secondary_cta: 'Reserve a Simulator',
          stats: {
            bays: '6',
            est: '2026'
          }
        }
      },
      {
        section_id: 'privileges',
        title: 'Our Luxury Café Facilities',
        subtitle: 'THE ULTIMATE GOLF CAFÉ EXPERIENCE',
        description: 'Experience golf access, café dining, VIP events, practice facilities, and secure parking under an exclusive umbrella.',
        list_items: []
      },
      {
        section_id: 'simulator',
        title: 'Virtual Simulator Bays',
        subtitle: 'STATE-OF-THE-ART INDOOR GOLF',
        description: "Experience Indus Golf & Country Club's premium indoor simulator bays at Café-de-Golf. Practice your swing, play world-famous courses, and refine your game in a climate-controlled luxury environment.",
        list_items: [
          '6 private bays with HD projection',
          'TrackMan-grade shot analytics',
          'Members-only bay reservations'
        ],
        extra_data: {
          cta: 'View Membership'
        }
      },
      {
        section_id: 'roster',
        title: 'Club Leadership & Committee',
        subtitle: 'CLUB GOVERNANCE & REGISTRY',
        description: 'We proudly introduce the executive board, military commanders, and key administrative officers managing the prestigious Indus Golf & Country Club.',
        list_items: []
      }
    ];

    await Section.insertMany(sections);
    console.log('Section contents successfully seeded.');

    console.log('\x1b[32m%s\x1b[0m', 'Database Normalization Seeding Completed Successfully!');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `Error seeding database: ${error.message}`);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  }
};

seedDB();
