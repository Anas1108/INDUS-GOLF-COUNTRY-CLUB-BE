const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connString = process.env.MONGODB_URI;
    
    // Check if the URI is still the default placeholder
    if (!connString || connString === 'YOUR_MONGODB_ATLAS_URI_HERE') {
      console.error('\x1b[31m%s\x1b[0m', 'Error: MongoDB connection string (MONGODB_URI) is not configured in the BE/.env file.');
      console.warn('\x1b[33m%s\x1b[0m', 'Please setup your MongoDB Atlas cluster and paste the URI in BE/.env. Server will run but DB calls will fail.');
      return null;
    }

    const conn = await mongoose.connect(connString);

    console.log(`\x1b[32m%s\x1b[0m`, `MongoDB Connected Successfully to Host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`\x1b[31m%s\x1b[0m`, `Error Connecting to MongoDB: ${error.message}`);
    // Do not crash the process in development to allow server to start, but log the error
    process.exit(1);
  }
};

module.exports = connectDB;
