// import emailService from '../services/emailService.js';

import gmailEmailService from '../services/gmailEmailService.js';
import { CustomError } from '../middleware/errorHandler.js';

class ContactController {
  async sendContactMessage(req, res) {
    try {
      const { name, email, subject, message } = req.body;

      console.log('📝 Contact form submission received:', {
        name,
        email,
        subject,
        messageLength: message?.length
      });
  

    //   SendGrid Code
    //   // Send email using the email service
    //   const result = await emailService.sendContactEmail({
    //     name,
    //     email,
    //     subject,
    //     message
    //   });

    // Send email using the Gmail service
    const result = await gmailEmailService.sendContactEmail({
        name,
        email,
        subject,
        message
    });
    

      // Return success response
      res.status(200).json({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
        data: {
          messageId: result.messageId,
          timestamp: result.timestamp,
          fallback: result.fallback || false // remove this in sendgrid code
        }
      });

    } catch (error) {
      console.error('❌ Contact controller error:', error);
      
    //   SendGrid Code
    // Handle specific error types
    //   if (error.message.includes('SendGrid')) {
    //     return res.status(503).json({
    //       success: false,
    //       message: 'Email service temporarily unavailable. Please try again later.',
    //       error: 'EMAIL_SERVICE_ERROR'
    //     });
    //   }

        if (error.message.includes('GMAIL_APP_PASSWORD')) {
            throw new CustomError('Email service not configured. Please set up Gmail app password.', 503);
        }

      // Generic error response
      throw new CustomError('Failed to send message. Please try again.', 500);
    }
  }

  // Health check for contact service
  async getContactHealth(req, res) {
    try {
      const healthStatus = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        // services: {  //   SendGrid Code
        //   email: emailService.isInitialized ? 'connected' : 'disconnected',   
        //   sendgrid: emailService.isInitialized ? 'configured' : 'not_configured'
        // }
        services: {
            email: gmailEmailService.isInitialized ? 'connected' : 'disconnected',
            gmail: gmailEmailService.isInitialized ? 'configured' : 'not_configured'
          }
      };

      res.status(200).json(healthStatus);
    } catch (error) {
      throw new CustomError(error.message, 503);
    }
  }
}

// Create singleton instance
const contactController = new ContactController();

export default contactController; 