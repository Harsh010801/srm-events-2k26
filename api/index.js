const express = require('express');
const cors = require('cors');

// Import routes
const authRoutes = require('../server/routes/auth');
const eventsRoutes = require('../server/routes/events');
const clubsRoutes = require('../server/routes/clubs');
const registrationsRoutes = require('../server/routes/registrations');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', process.env.FRONTEND_URL || '*'],
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/clubs', clubsRoutes);
app.use('/api/registrations', registrationsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SRM Events API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
