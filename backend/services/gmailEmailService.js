import nodemailer from 'nodemailer';

class GmailEmailService {
  constructor() {
    this.isInitialized = false;
    this.transporter = null;
  }

  initialize() {
    const gmailUser = process.env.GMAIL_USER || 'adarshvish2606@gmail.com';
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    
    if (!gmailPassword) {
      throw new Error('GMAIL_APP_PASSWORD is required. Please generate an app password from Google Account settings.');
    }
    
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword
      }
    });
    
    this.isInitialized = true;
    console.log('✅ Gmail email service initialized');
    console.log('📧 Using Gmail account:', gmailUser);
  }

  async sendContactEmail(contactData) {
    if (!this.isInitialized) {
      throw new Error('Gmail email service not initialized');
    }

    const { name, email, subject, message } = contactData;
    const toEmail = process.env.YOUR_EMAIL || 'adarshvish2606@gmail.com';

    try {
      console.log(`📧 Sending contact email from ${email} to ${toEmail}`);
      
      const mailOptions = {
        from: email, // User's email from contact form
        to: toEmail,
        replyTo: email,
        subject: `Portfolio Contact: ${subject}`,
        html: this.createContactEmailTemplate(contactData),
        text: this.createContactEmailText(contactData),
      };
      
      const result = await this.transporter.sendMail(mailOptions);
      
      console.log('✅ Contact email sent successfully via Gmail');
      console.log('📧 Message ID:', result.messageId);
      
      return {
        success: true,
        messageId: result.messageId,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('❌ Error sending contact email via Gmail:', error);
      
      // If Gmail rejects the FROM address, try with your Gmail as FROM
      if (error.code === 'EAUTH' || error.message.includes('authentication')) {
        console.log('🔄 Trying with Gmail as FROM address...');
        
        const fallbackMailOptions = {
          from: process.env.GMAIL_USER || 'adarshvish2606@gmail.com',
          to: toEmail,
          replyTo: email,
          subject: `Portfolio Contact from ${email}: ${subject}`,
          html: this.createContactEmailTemplate(contactData, true),
          text: this.createContactEmailText(contactData, true),
        };
        
        try {
          const fallbackResult = await this.transporter.sendMail(fallbackMailOptions);
          console.log('✅ Contact email sent successfully with fallback method');
          
          return {
            success: true,
            messageId: fallbackResult.messageId,
            timestamp: new Date().toISOString(),
            fallback: true
          };
        } catch (fallbackError) {
          console.error('❌ Fallback also failed:', fallbackError.message);
          throw new Error('Gmail configuration issue. Please check your app password.');
        }
      }
      
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

  createContactEmailText(contactData, fallback = false) {
    const { name, email, subject, message } = contactData;
    
    const fallbackNotice = fallback ? `
Note: This message was sent via portfolio system. Reply to this email to respond to ${name} at ${email}.

` : '';
    
    return `
${fallbackNotice}New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from your portfolio contact form.
Reply directly to this email to respond to ${name}.
    `.trim();
  }
}

// Create singleton instance
const gmailEmailService = new GmailEmailService();

export default gmailEmailService; 