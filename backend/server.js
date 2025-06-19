import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import our modules
import routes from './routes/index.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
// import emailService from './services/emailService.js';
import gmailEmailService from './services/gmailEmailService.js';

// Load environment variables
dotenv.config();

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Allow preflight CORS requests for all routes
app.options('*', cors());

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Verify production mode
if (NODE_ENV === 'production') {
  console.log('🚀 Server running in PRODUCTION mode');
} else {
  console.warn('⚠️ Server running in DEVELOPMENT mode');
}

// Debug environment variables
console.log('🔍 Environment check on server start:');
// console.log('  - SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'Present' : 'Missing');
console.log('  - GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'Present' : 'Missing');
console.log('  - YOUR_EMAIL:', process.env.YOUR_EMAIL || 'Not set');
console.log('  - NODE_ENV:', NODE_ENV);
console.log('  - PORT:', PORT);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration
const corsOptions = {
  origin: true, // Allow all origins
  credentials: false,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting for all routes
app.use(apiRateLimiter);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
  next();
});



// Initialize email service
try {
  // console.log('🚀 Starting email service initialization...');
  // emailService.initialize();
  // console.log('✅ Email service initialized successfully');
  console.log('🚀 Starting Gmail email service initialization...');
  gmailEmailService.initialize();
  console.log('✅ Gmail email service initialized successfully');
} catch (error) {
  // console.error('❌ Failed to initialize email service:', error.message);
  console.error('❌ Failed to initialize Gmail email service:', error.message);
  if (NODE_ENV === 'production') {
    console.error('Exiting due to email service initialization failure');
    process.exit(1);
  }
}

// Mount routes
app.use('/', routes);

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Global error handler:', error);
  
  // Don't leak error details in production
  const errorMessage = NODE_ENV === 'production' 
    ? 'Internal server error' 
    : error.message;
  
  res.status(error.status || 500).json({
    success: false,
    message: errorMessage,
    ...(NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
  
  // Force close after 10 seconds
  setTimeout(() => {
    console.error('❌ Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

// Start server
const server = app.listen(PORT, () => {
  console.log(`
🚀 Portfolio API Server Started!
📍 Environment: ${NODE_ENV}
🌐 Port: ${PORT}
🔗 URL: http://localhost:${PORT}
📧 Email Service: ${gmailEmailService.isInitialized ? '✅ Connected' : '❌ Disconnected'}
⏰ Started at: ${new Date().toISOString()}
  `);
});  // 📧 Email Service: ${emailService.isInitialized ? '✅ Connected' : '❌ Disconnected'}


// Handle graceful shutdown
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

export default app; 