import gmailEmailService from '../services/gmailEmailService.js';

// Initialize email service
try {
  gmailEmailService.initialize();
} catch (error) {
  console.error('❌ Failed to initialize Gmail email service:', error.message);
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        email: gmailEmailService.isInitialized ? 'connected' : 'disconnected',
        gmail: gmailEmailService.isInitialized ? 'configured' : 'not_configured'
      },
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime()
    };

    return res.status(200).json(healthStatus);
  } catch (error) {
    return res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
      environment: process.env.NODE_ENV || 'development'
    });
  }
} 