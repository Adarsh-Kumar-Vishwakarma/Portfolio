# Portfolio Backend API

A production-ready Node.js/Express API for handling portfolio contact form submissions with email functionality using Gmail SMTP or SendGrid but i comment all code related to SendGrid.

## 🚀 Features

- **Email Service**: Gmail SMTP/SendGrid integration for reliable email delivery
- **Input Validation**: Comprehensive form validation with express-validator
- **Rate Limiting**: Protection against spam and abuse (5 requests per 15 minutes per IP)
- **Security**: Helmet.js for security headers, CORS configuration
- **Logging**: Request logging and error tracking with Morgan
- **Error Handling**: Global error handling with proper HTTP status codes
- **Health Checks**: API health monitoring endpoints
- **Production Ready**: Graceful shutdown, compression, environment configuration
- **Email Fallback**: Automatic fallback if user's email is blocked by Gmail

## 📁 Project Structure

```
backend/
├── config/
│   └── email.js              # Email service configuration
├── controllers/
│   └── contactController.js  # Contact form logic
├── middleware/
│   ├── validation.js         # Input validation middleware
│   └── rateLimiter.js        # Rate limiting middleware
├── routes/
│   ├── contactRoutes.js      # Contact form routes
│   └── index.js              # Main routes index
├── services/
│   ├── emailService.js       # SendGrid email service (legacy)
│   └── gmailEmailService.js  # Gmail SMTP email service (current)
├── server.js                 # Main server file
├── package.json              # Dependencies and scripts
├── env.example               # Environment variables template
└── README.md                 # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js 24.2.0+** (Recommended: v24.2.0 or higher)
- **Gmail account** with 2-Factor Authentication enabled

### 1. Install Dependencies
```bash
npm install
```

### 2. Gmail App Password Setup

#### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click "Security" → "2-Step Verification"
3. Enable it with your phone number

#### Step 2: Generate App Password
1. Go to [Google Account → App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" → "Other (Custom name)"
3. Name it "Portfolio Contact Form"
4. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### 3. Environment Configuration
```bash
# Copy the example file
cp env.example .env

# Edit .env with your settings
```

#### Required Environment Variables:
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Gmail Email Configuration
GMAIL_USER=adarshvish2606@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
YOUR_EMAIL=adarshvish2606@gmail.com

# Security (optional)
SESSION_SECRET=your_session_secret_here
```

## 🚀 Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Manual Start
```bash
node server.js
```

## 📡 API Endpoints

### Contact Form
- **POST** `/api/contact` - Submit contact form
  - **Body**: `{ name, email, subject, message }`
  - **Rate Limited**: 5 requests per 15 minutes per IP
  - **Validation**: Name (2-50 chars), Email (valid format), Subject (5-100 chars), Message (10-1000 chars)

### Health Checks
- **GET** `/health` - General API health
- **GET** `/api/contact/health` - Contact service health

## 📧 Email Configuration

The API sends emails using Gmail SMTP with the following configuration:

- **Primary**: FROM user's email (from contact form) TO your email
- **Fallback**: FROM your Gmail TO your email (if user's email is blocked)
- **Reply-To**: Always set to user's email for easy replies
- **Subject**: "Portfolio Contact: [user's subject]"
- **Content**: Professional HTML email template

### Email Flow:
1. User fills contact form with their email
2. System attempts to send FROM user's email TO your email
3. If Gmail blocks user's email, automatically falls back to your Gmail as FROM
4. You receive email and can reply directly to the user

## 🔒 Security Features

- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Sanitizes and validates all inputs
- **CORS**: Accepts requests from any origin (development-friendly)
- **Helmet.js**: Security headers
- **Request Logging**: Tracks all API requests
- **Error Handling**: Prevents information leakage
- **Compression**: Response compression for better performance

## 📦 Dependencies

### Production Dependencies:
```json
{
  "express": "^4.18.2",           // Web framework
  "cors": "^2.8.5",               // Cross-origin resource sharing
  "@sendgrid/mail": "^8.1.1",     // SendGrid email service (legacy)
  "nodemailer": "^6.9.7",         // Gmail SMTP email service (current)
  "dotenv": "^16.3.1",            // Environment variables
  "helmet": "^7.1.0",             // Security headers
  "express-rate-limit": "^7.1.5", // Rate limiting
  "express-validator": "^7.0.1",  // Input validation
  "morgan": "^1.10.0",            // HTTP request logger
  "compression": "^1.7.4"         // Response compression
}
```

### Development Dependencies:
```json
{
  "nodemon": "^3.0.2",            // Auto-restart on file changes
  "jest": "^29.7.0"               // Testing framework
}
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Manual API Testing
```bash
# Test health endpoint
curl http://localhost:3001/health

# Test contact endpoint
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

## 📊 Monitoring & Logging

The API includes comprehensive logging:
- **Request/Response Logging**: All API requests tracked
- **Email Success/Error Tracking**: Email delivery monitoring
- **Error Monitoring**: Detailed error logs
- **Health Check Endpoints**: Service status monitoring

### Log Levels:
- **Development**: Detailed logs with Morgan
- **Production**: Combined logs for performance

## 🚀 Deployment

### Environment Variables for Production:
```env
NODE_ENV=production
PORT=3001
GMAIL_USER=adarshvish2606@gmail.com
GMAIL_APP_PASSWORD=your_production_app_password
YOUR_EMAIL=adarshvish2606@gmail.com
SESSION_SECRET=your_production_session_secret
```

### Recommended Hosting Platforms:
- **Vercel**: Easy deployment with serverless functions
- **Railway**: Simple Node.js deployment
- **Heroku**: Traditional hosting with add-ons
- **DigitalOcean**: VPS hosting with full control
- **Render**: Free tier available

### Deployment Commands:
```bash
# Install dependencies
npm install --production

# Start server
npm start

# Or use PM2 for production
npm install -g pm2
pm2 start server.js --name "portfolio-api"
```

## 🔧 Troubleshooting

### Common Issues:

#### 1. Gmail App Password Error:
```
❌ GMAIL_APP_PASSWORD is required
```
**Solution**: Generate app password from Google Account settings

#### 2. Email Service Not Connected:
```
📧 Email Service: ❌ Disconnected
```
**Solution**: Check GMAIL_APP_PASSWORD in .env file

#### 3. Rate Limiting:
```
429 Too Many Requests
```
**Solution**: Wait 15 minutes or check rate limit headers

#### 4. CORS Errors:
```
CORS policy blocked request
```
**Solution**: API accepts all origins, check frontend URL

#### 5. Validation Errors:
```
400 Validation failed
```
**Solution**: Check input format and length requirements

### Debug Commands:
```bash
# Check environment variables
node -e "console.log(process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not set')"

# Test email service
node -e "
import gmailEmailService from './services/gmailEmailService.js';
gmailEmailService.initialize();
console.log('Email service:', gmailEmailService.isInitialized ? 'Connected' : 'Disconnected');
"
```

## 🔄 Migration from SendGrid

If you were previously using SendGrid:

1. **Update .env file**:
   ```env
   # Remove SendGrid
   # SENDGRID_API_KEY=your_key
   
   # Add Gmail
   GMAIL_USER=your_email@gmail.com
   GMAIL_APP_PASSWORD=your_app_password
   ```

2. **The system automatically uses Gmail service** instead of SendGrid

## 📝 API Response Format

### Success Response:
```json
{
  "success": true,
  "message": "Message sent successfully! I'll get back to you soon.",
  "data": {
    "messageId": "email_message_id",
    "timestamp": "2025-06-17T11:42:57.489Z",
    "fallback": false
  }
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_TYPE"
}
```

### Validation Error Response:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this in your projects!

## 👨‍💻 Author

**Adarsh Kumar Vishwakarma**
- Email: adarshvish2606@gmail.com
- GitHub: [Adarsh-Kumar-Vishwakarma](https://github.com/Adarsh-Kumar-Vishwakarma)
- LinkedIn: [Adarsh Kumar Vishwakarma](https://www.linkedin.com/in/adarsh-kumar-vishwakarma-6ba71a192/)

---

**Built with ❤️ using Node.js, Express, and Gmail SMTP** 