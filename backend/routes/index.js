import express from 'express';
import contactRoutes from './contactRoutes.js';

const router = express.Router();

// API version prefix
const API_VERSION = '/api';

// Mount routes
router.use(API_VERSION, contactRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 404 handler for undefined routes
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

export default router; 