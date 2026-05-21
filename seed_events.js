const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'src', '..', '.env') });
const Event = require('./src/models/Event');
const connectDB = require('./src/config/db');

const seedEvent = async () => {
  try {
    await connectDB();
    
    // Check if we already have events
    const count = await Event.countDocuments();
    if (count > 0) {
      console.log('Events already exist, clearing old ones...');
      await Event.deleteMany({});
    }

    const dummyEvent = new Event({
      title: 'Annual Golf Tournament 2026',
      description: 'Join us for the most prestigious golfing event of the year. Experience the lush greens, amazing prizes, and fantastic networking opportunities at our award-winning championship course. The tournament will conclude with a grand gala dinner.',
      date: new Date('2026-06-15T09:00:00Z'),
      media: [
        {
          url: 'https://images.unsplash.com/photo-1587334274328-64186a80aee6?auto=format&fit=crop&q=80&w=1000',
          public_id: 'dummy_golf_1',
          type: 'image'
        },
        {
          url: 'https://images.unsplash.com/photo-1593111774240-d529f12cb416?auto=format&fit=crop&q=80&w=1000',
          public_id: 'dummy_golf_2',
          type: 'image'
        },
        {
          url: 'https://images.unsplash.com/photo-1535159804868-b302c1f55a15?auto=format&fit=crop&q=80&w=1000',
          public_id: 'dummy_golf_3',
          type: 'image'
        }
      ]
    });

    await dummyEvent.save();
    console.log('Dummy event injected successfully.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding event:', error);
    process.exit(1);
  }
};

seedEvent();
