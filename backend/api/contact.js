import gmailEmailService from '../services/gmailEmailService.js';
import { body, validationResult } from 'express-validator';

// Initialize email service
try {
  gmailEmailService.initialize();
} catch (error) {
  console.error('❌ Failed to initialize Gmail email service:', error.message);
}

// Validation rules for contact form
const contactValidationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Subject must be between 5 and 100 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
    .escape()
    .withMessage('Message contains invalid characters'),
];

// Validation function for serverless environment
const validateContactRequest = async (req) => {
  // Create a mock request object for validation
  const mockReq = {
    body: req.body,
    method: req.method,
    url: req.url
  };

  // Run validation
  await Promise.all(contactValidationRules.map(validation => validation.run(mockReq)));
  
  const errors = validationResult(mockReq);
  return errors;
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Health check endpoint
  if (req.method === 'GET' && req.url.includes('/health')) {
    try {
      const healthStatus = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          email: gmailEmailService.isInitialized ? 'connected' : 'disconnected',
          gmail: gmailEmailService.isInitialized ? 'configured' : 'not_configured'
        }
      };
      return res.status(200).json(healthStatus);
    } catch (error) {
      return res.status(503).json({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message
      });
    }
  }

  // Contact form endpoint
  if (req.method === 'POST') {
    try {
      const { name, email, subject, message } = req.body;

      console.log('📝 Contact form submission received:', {
        name,
        email,
        subject,
        messageLength: message?.length
      });

      // Validate request
      const validationErrors = await validateContactRequest(req);
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validationErrors.array().map(error => ({
            field: error.path,
            message: error.msg
          }))
        });
      }

      // Send email using the Gmail service
      const result = await gmailEmailService.sendContactEmail({
        name,
        email,
        subject,
        message
      });

      // Return success response
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
        data: {
          messageId: result.messageId,
          timestamp: result.timestamp,
          fallback: result.fallback || false
        }
      });

    } catch (error) {
      console.error('❌ Contact handler error:', error);

      if (error.message.includes('GMAIL_APP_PASSWORD')) {
        return res.status(503).json({
          success: false,
          message: 'Email service not configured. Please set up Gmail app password.',
          error: 'EMAIL_SERVICE_ERROR'
        });
      }

      // Generic error response
      return res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again.',
        error: 'INTERNAL_SERVER_ERROR'
      });
    }
  }

  // Method not allowed
  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
} 