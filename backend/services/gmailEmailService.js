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
    console.log(contactData);
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
    const sentAt = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }); 
    const { name, email, subject, message } = contactData;

    const fallbackNotice = fallback ? `
      <div style="background-color: #2d3748; color: #f6e05e; border: 1px solid #f6e05e; padding: 10px; border-radius: 4px; margin-bottom: 15px; font-family: 'Fira Mono', 'Consolas', monospace;">
        <strong>Note:</strong> This message was sent via portfolio system. Reply to this email to respond to <span style="color:#63b3ed;">${name}</span> at <span style="color:#63b3ed;">${email}</span>.
      </div>
    ` : '';

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <link href="https://fonts.googleapis.com/css?family=Fira+Mono:400,700&display=swap" rel="stylesheet">
        <style>
          body {
            background: #1a202c;
            color: #f7fafc;
            font-family: 'Fira Mono', 'Consolas', monospace;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 700px;
            margin: 40px auto;
            background: #2d3748;
            border-radius: 10px;
            box-shadow: 0 0 20px #000a;
            padding: 32px;
          }
          .header {
            color: #63b3ed;
            font-size: 2em;
            margin-bottom: 10px;
            letter-spacing: 2px;
          }
          .subtitle {
            color: #f6e05e;
            font-size: 1.1em;
            margin-bottom: 24px;
          }
          .field {
            margin-bottom: 18px;
          }
          .field-label {
            color: #f6e05e;
            font-weight: bold;
            font-size: 1em;
          }
          .field-value {
            background: #1a202c;
            color: #f7fafc;
            padding: 10px 16px;
            border-radius: 4px;
            border-left: 4px solid #63b3ed;
            font-size: 1.05em;
            margin-top: 4px;
            font-family: 'Fira Mono', 'Consolas', monospace;
          }
          .message-box {
            background: #1a202c;
            color: #f7fafc;
            padding: 18px;
            border-radius: 4px;
            border: 1px solid #4fd1c5;
            font-size: 1.1em;
            margin-top: 10px;
            font-family: 'Fira Mono', 'Consolas', monospace;
          }
          .footer {
            text-align: center;
            margin-top: 32px;
            color: #718096;
            font-size: 0.95em;
          }
          .ascii-art {
            color: #4fd1c5;
            font-size: 1.2em;
            text-align: center;
            margin-bottom: 24px;
            font-family: 'Fira Mono', 'Consolas', monospace;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">New Portfolio Contact</div>
          <div class="subtitle">A message from your digital terminal...</div>
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
          <div class="footer">
            <p>// This message was sent from your portfolio contact form at ${sentAt}</p>
            <p>// Reply directly to this email to respond to <span style="color:#63b3ed;">${name}</span></p>
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