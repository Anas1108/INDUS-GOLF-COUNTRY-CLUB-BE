const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const memberRoutes = require('./routes/memberRoutes');
const clubRoutes = require('./routes/clubRoutes');
const adminRoutes = require('./routes/adminRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const managementPersonRoutes = require('./routes/managementPersonRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Middlewares
app.use(helmet());
const allowedOrigins = [
  'http://localhost:3000',
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map(s => s.trim()) : [])
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json()); // Body parser

// Dev request logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    db_state: require('mongoose').connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Routes
app.use('/api/members', memberRoutes);
app.use('/api/club', clubRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/management', managementPersonRoutes);
app.use('/api/events', eventRoutes);


// Fallback Route for Undefined API Paths (404)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.originalUrl}`
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
