# 🚀 Vercel Deployment Guide for Portfolio Backend

This guide will help you deploy your portfolio backend with email functionality to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Gmail Account**: For sending emails
3. **Node.js**: Version 18+ (already configured in package.json)

## 🔧 Step 1: Gmail App Password Setup

### Generate Gmail App Password:
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** → **App passwords**
3. Select "Mail" and generate a new app password
4. Copy the 16-character password (you'll need this for environment variables)

## 🌍 Step 2: Environment Variables Setup

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=production

# Gmail Email Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
YOUR_EMAIL=your-email@gmail.com

# Security (optional)
SESSION_SECRET=your-random-secret-string
```

## 📦 Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

4. **Deploy**:
   ```bash
   vercel --prod
   ```

### Option B: Using the Deployment Script

1. **Make the script executable**:
   ```bash
   chmod +x deploy.sh
   ```

2. **Run the deployment script**:
   ```bash
   ./deploy.sh
   ```

### Option C: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your repository
5. Set the root directory to `backend`
6. Configure environment variables (see Step 4)

## 🌟 Step 4: Configure Environment Variables in Vercel

After deployment, set up environment variables in Vercel:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `GMAIL_USER` | your-email@gmail.com | Production |
| `GMAIL_APP_PASSWORD` | your-16-char-app-password | Production |
| `YOUR_EMAIL` | your-email@gmail.com | Production |
| `NODE_ENV` | production | Production |

## 🔗 Step 5: Update Frontend Configuration

After deployment, update your frontend to use the new API URL:

1. Get your deployment URL from Vercel (e.g., `https://your-project.vercel.app`)
2. Update your frontend API calls to use this URL
3. Test the contact form functionality

## 🧪 Step 6: Testing

Test your deployed API:

1. **Health Check**:
   ```bash
   curl https://your-project.vercel.app/api/health
   ```

2. **Contact Form Test**:
   ```bash
   curl -X POST https://your-project.vercel.app/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "subject": "Test Message",
       "message": "This is a test message"
     }'
   ```

## 🔍 Troubleshooting

### Common Issues:

1. **Email not sending**:
   - Check Gmail app password is correct
   - Verify environment variables are set in Vercel
   - Check Vercel function logs

2. **CORS errors**:
   - Verify CORS configuration in server.js
   - Check frontend URL is allowed

3. **Function timeout**:
   - Email sending might take time
   - Consider increasing function timeout in vercel.json

### Check Logs:
```bash
vercel logs your-project-name
```

## 📊 Monitoring

- **Vercel Dashboard**: Monitor function invocations and performance
- **Email Delivery**: Check your Gmail sent folder
- **Error Tracking**: Monitor Vercel function logs

## 🔄 Updating Deployment

To update your deployment:

```bash
vercel --prod
```

## 🎉 Success!

Your portfolio backend with email functionality is now deployed on Vercel! 

- ✅ Serverless functions running
- ✅ Email service configured
- ✅ Contact form API live
- ✅ CORS configured for frontend

## 📞 Support

If you encounter issues:
1. Check Vercel function logs
2. Verify environment variables
3. Test locally first
4. Check Gmail app password validity 