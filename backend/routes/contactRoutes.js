import express from 'express';
import contactController from '../controllers/contactController.js';
import { contactValidationRules, validateRequest } from '../middleware/validation.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// POST /api/contact - Send contact message
router.post('/contact', 
  contactRateLimiter,
  contactValidationRules,
  validateRequest,
  contactController.sendContactMessage
);

// GET /api/contact/health - Health check for contact service
router.get('/contact/health', contactController.getContactHealth);

export default router; 