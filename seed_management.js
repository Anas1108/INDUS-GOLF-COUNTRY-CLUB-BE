const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ManagementPerson = require('./src/models/ManagementPerson');

dotenv.config();

const dummyMembers = [
  {
    name: 'Lt. General John Doe',
    appointment: 'President',
    picture: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Major Jane Smith',
    appointment: 'Secretary',
    picture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Dr. Robert Johnson',
    appointment: 'Captain of Golf',
    picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Emily Davis',
    appointment: 'Treasurer',
    picture: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400'
  }
];

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  console.log('Connected to MongoDB');
  
  await ManagementPerson.deleteMany(); // Clear existing
  console.log('Cleared existing management persons');

  await ManagementPerson.insertMany(dummyMembers);
  console.log('Inserted dummy management persons');

  mongoose.connection.close();
  console.log('Connection closed');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
