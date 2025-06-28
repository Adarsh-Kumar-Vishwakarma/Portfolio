# 🚀 Quick Vercel Deployment Guide

## 📋 Prerequisites
- ✅ Gmail account with 2FA enabled
- ✅ Gmail app password (16 characters)
- ✅ GitHub repository with your code

## 🔧 Step 1: Gmail App Password
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification → App passwords
3. Generate app password for "Mail"
4. Copy the 16-character password

## 🌐 Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework**: Node.js
   - **Root Directory**: `backend`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)

## ⚙️ Step 3: Environment Variables
In Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `GMAIL_USER` | your-email@gmail.com | Production |
| `GMAIL_APP_PASSWORD` | your-16-char-password | Production |
| `YOUR_EMAIL` | your-email@gmail.com | Production |
| `NODE_ENV` | production | Production |

## 🚀 Step 4: Deploy
1. Click "Deploy"
2. Wait for completion
3. Copy your deployment URL

## 🧪 Step 5: Test
1. Update `test-vercel-deployment.js` with your URL
2. Run: `node test-vercel-deployment.js`
3. Check your email for test messages

## 🔗 Step 6: Update Frontend
Update your frontend API calls to use your Vercel URL:
```javascript
const API_BASE_URL = 'https://your-project.vercel.app/api';
```

## 📞 API Endpoints
- **Health Check**: `GET /api/contact-health`
- **Contact Form**: `POST /api/contact`

## 🔍 Troubleshooting
- Check Vercel function logs
- Verify environment variables
- Test with Postman/curl
- Check Gmail app password validity

## 🎉 Success!
Your email API is now live on Vercel! 🚀 