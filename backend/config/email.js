                                        //   SendGrid Config Code

import sgMail from '@sendgrid/mail';

// Email configuration - load dynamically
export const getEmailConfig = () => ({
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  fromEmail: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
  toEmail: process.env.YOUR_EMAIL || 'adarshvish2606@gmail.com',
  replyToEmail: process.env.REPLY_TO_EMAIL || 'adarshvish2606@gmail.com',
});

// Initialize SendGrid
export const initializeEmailService = () => {
  const emailConfig = getEmailConfig();
  
  console.log('🔧 Initializing email service...');
  console.log('📋 Environment check:');
  console.log('  - SENDGRID_API_KEY:', emailConfig.sendGridApiKey ? 'Present' : 'Missing');
  console.log('  - YOUR_EMAIL:', emailConfig.toEmail);
  console.log('  - FROM_EMAIL:', emailConfig.fromEmail);
  
  if (!emailConfig.sendGridApiKey) {
    console.error('❌ SENDGRID_API_KEY is missing from environment variables');
    console.error('   Make sure your .env file contains: SENDGRID_API_KEY=your_key_here');
    throw new Error('SENDGRID_API_KEY is required');
  }
  
  if (!emailConfig.sendGridApiKey.startsWith('SG.')) {
    console.error('❌ Invalid SendGrid API key format. Should start with "SG."');
    throw new Error('Invalid SendGrid API key format. Should start with "SG."');
  }
  
  sgMail.setApiKey(emailConfig.sendGridApiKey);
  console.log('✅ SendGrid initialized successfully');
  console.log('📧 Default recipient email:', emailConfig.toEmail);
};

// For backward compatibility
export const emailConfig = getEmailConfig();

export default emailConfig; 