const path = require('path');
// Load environment variables from BE/.env
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = require('./app');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`\x1b[35m%s\x1b[0m`, `Health Check: http://localhost:${PORT}/api/health`);
});

// Handle unhandled promise rejections (e.g. database connection failures)
process.on('unhandledRejection', (err, promise) => {
  console.error(`\x1b[31m%s\x1b[0m`, `Unhandled Promise Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
