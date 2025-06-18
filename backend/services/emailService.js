import sgMail from '@sendgrid/mail';
import { getEmailConfig } from '../config/email.js';

class EmailService {
    constructor() {
        this.isInitialized = false;
    }

    initialize() {
        console.log('🔧 EmailService.initialize() called');

        const emailConfig = getEmailConfig();
        console.log('📋 Checking emailConfig:', {
            sendGridApiKey: emailConfig.sendGridApiKey ? 'Present' : 'Missing',
            toEmail: emailConfig.toEmail,
            fromEmail: emailConfig.fromEmail
        });

        if (!emailConfig.sendGridApiKey) {
            console.error('❌ emailConfig.sendGridApiKey is missing');
            throw new Error('SendGrid API key is not configured');
        }

        if (!emailConfig.sendGridApiKey.startsWith('SG.')) {
            console.error('❌ Invalid SendGrid API key format');
            throw new Error('Invalid SendGrid API key format. Should start with "SG."');
        }

        sgMail.setApiKey(emailConfig.sendGridApiKey);
        this.isInitialized = true;
        console.log('✅ Email service initialized successfully');
    }

    async sendContactEmail(contactData) {
        if (!this.isInitialized) {
            throw new Error('Email service not initialized');
        }

        const emailConfig = getEmailConfig();
        const { name, email, subject, message } = contactData;

        // Try with user's email first, fallback to verified sender if needed
        let emailContent;

        try {
            // First attempt: Use user's email as from address
            emailContent = {
                to: emailConfig.toEmail,
                from: email, // User's email from frontend
                replyTo: email,
                subject: `Portfolio Contact: ${subject}`,
                html: this.createContactEmailTemplate(contactData),
                // text: this.createContactEmailText(contactData),
            };

            console.log(`📧 Attempting to send from user's email: ${email}`);
            const result = await sgMail.send(emailContent);

            console.log('✅ Contact email sent successfully from user email');

            // Log success for monitoring
            this.logEmailSuccess(contactData);

            return {
                success: true,
                messageId: result[0]?.headers['x-message-id'],
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('❌ Error sending from user email:', error.message);

            // If 403 error, try with verified sender as fallback
            if (error.code === 403) {
                console.log('🔄 Trying fallback with verified sender...');

                emailContent = {
                    to: emailConfig.toEmail,
                    from: emailConfig.fromEmail, // Use verified sender
                    replyTo: email, // Keep user's email as reply-to
                    subject: `Portfolio Contact from ${email}: ${subject}`,
                    html: this.createContactEmailTemplate(contactData, true), // Add fallback indicator
                    // text: this.createContactEmailText(contactData, true),
                };

                try {s
                    const fallbackResult = await sgMail.send(emailContent);
                    console.log('✅ Contact email sent successfully with fallback method');

                    // Log success for monitoring
                    this.logEmailSuccess(contactData);

                    return {
                        success: true,
                        messageId: fallbackResult[0]?.headers['x-message-id'],
                        timestamp: new Date().toISOString(),
                        fallback: true
                    };
                } catch (fallbackError) {
                    console.error('❌ Fallback also failed:', fallbackError.message);
                    throw new Error('SendGrid configuration issue. Please verify your domain and API key permissions.');
                }
            }

            // Log error for monitoring
            this.logEmailError(error, contactData);
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }

    createContactEmailTemplate(contactData, fallback = false) {
        const { name, email, subject, message } = contactData;

        const fallbackNotice = fallback ? `
      <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 10px; border-radius: 4px; margin-bottom: 15px;">
        <strong>Note:</strong> This message was sent via portfolio system. Reply to this email to respond to ${name} at ${email}.
      </div>
    ` : '';

        return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .field-label { font-weight: bold; color: #374151; }
          .field-value { background-color: white; padding: 10px; border-radius: 4px; border-left: 4px solid #2563eb; }
          .message-box { background-color: white; padding: 15px; border-radius: 4px; border: 1px solid #e5e7eb; margin-top: 10px; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>Someone has reached out through your portfolio</p>
          </div>
          
          <div class="content">
            ${fallbackNotice}
            
            <div class="field">
              <div class="field-label">Name:</div>
              <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Email:</div>
              <div class="field-value">${email}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Subject:</div>
              <div class="field-value">${subject}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Message:</div>
              <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This message was sent from your portfolio contact form at ${new Date().toLocaleString()}</p>
            <p>Reply directly to this email to respond to ${name}</p>
          </div>
        </div>
      </body>
      </html>
    `;
    }

//     createContactEmailText(contactData, fallback = false) {
//         const { name, email, subject, message } = contactData;

//         const fallbackNotice = fallback ? `
// Note: This message was sent via portfolio system. Reply to this email to respond to ${name} at ${email}.

// ` : '';

//         return `
// ${fallbackNotice}New Contact Form Submission

// Name: ${name}
// Email: ${email}
// Subject: ${subject}

// Message:
// ${message}

// ---
// This message was sent from your portfolio contact form.
// Reply directly to this email to respond to ${name}.
//     `.trim();
//     }

    logEmailSuccess(contactData) {
        const emailConfig = getEmailConfig();
        const logEntry = {
            type: 'EMAIL_SUCCESS',
            timestamp: new Date().toISOString(),
            from: emailConfig.fromEmail,
            to: emailConfig.toEmail,
            subject: contactData.subject,
            name: contactData.name
        };

        console.log('📊 Email Success Log:', JSON.stringify(logEntry, null, 2));
    }

    logEmailError(error, contactData) {
        const emailConfig = getEmailConfig();
        const logEntry = {
            type: 'EMAIL_ERROR',
            timestamp: new Date().toISOString(),
            error: error.message,
            errorCode: error.code,
            from: emailConfig.fromEmail,
            to: emailConfig.toEmail,
            subject: contactData.subject,
            name: contactData.name
        };

        console.error('📊 Email Error Log:', JSON.stringify(logEntry, null, 2));
    }
}

// Create singleton instance
const emailService = new EmailService();

export default emailService;