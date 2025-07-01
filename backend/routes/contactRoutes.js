import express from 'express';
import contactController from '../controllers/contactController.js';
import { contactValidationRules, validateRequest } from '../middleware/validation.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';
import { asyncErrorHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// POST /api/contact - Send contact message
router.post('/contact', 
  contactRateLimiter,
  contactValidationRules,
  validateRequest,
  asyncErrorHandler(contactController.sendContactMessage)
);

// GET /api/contact/health - Health check for contact service
router.get('/contact/health', asyncErrorHandler(contactController.getContactHealth));

// Handle OPTIONS for /contact (CORS preflight)
router.options('/contact', (req, res) => {
  res.sendStatus(200);
});

export default router; 