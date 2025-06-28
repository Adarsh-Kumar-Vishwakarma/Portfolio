# Backend Deployment Guide for Vercel

This guide will help you deploy your portfolio backend with email functionality to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Gmail App Password**: For email functionality

## Step 1: Prepare Gmail App Password

1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Copy the 16-character password

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Connect Repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `backend` folder as the root directory

2. **Configure Environment Variables**:
   - In the project settings, go to "Environment Variables"
   - Add the following variables:
     ```
     GMAIL_APP_PASSWORD=your_16_character_app_password
     YOUR_EMAIL=your_email@gmail.com
     NODE_ENV=production
     ```

3. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your backend

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
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
   vercel
   ```

5. **Set Environment Variables**:
   ```bash
   vercel env add GMAIL_APP_PASSWORD
   vercel env add YOUR_EMAIL
   vercel env add NODE_ENV
   ```

## Step 3: Update Frontend Configuration

After deployment, update your frontend to use the new Vercel URL:

1. **Find your Vercel URL**: It will be something like `https://your-project.vercel.app`

2. **Update frontend API calls**: In your frontend code, update the API base URL:
   ```javascript
   // In your frontend API configuration
   const API_BASE_URL = 'https://your-project.vercel.app/api';
   ```

## Step 4: Test the Deployment

1. **Health Check**: Visit `https://your-project.vercel.app/api/contact-health`
   - Should return a JSON response with service status

2. **Test Contact Form**: Submit a test message through your portfolio
   - Check Vercel logs for any errors
   - Verify email is received

## Step 5: Monitor and Debug

### View Logs
- Go to your Vercel dashboard
- Click on your project
- Go to "Functions" tab to see serverless function logs

### Common Issues

1. **Email Service Not Working**:
   - Verify `GMAIL_APP_PASSWORD` is set correctly
   - Check that `YOUR_EMAIL` is your Gmail address
   - Ensure 2FA is enabled on your Google account

2. **CORS Errors**:
   - The serverless functions include CORS headers
   - If issues persist, check your frontend domain

3. **Function Timeout**:
   - Email sending might take time
   - Functions are configured with 30-second timeout

## API Endpoints

After deployment, your API will be available at:

- **Contact Form**: `POST https://your-project.vercel.app/api/contact`
- **Health Check**: `GET https://your-project.vercel.app/api/contact-health`

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `GMAIL_APP_PASSWORD` | 16-character Gmail app password | Yes |
| `YOUR_EMAIL` | Your Gmail address | Yes |
| `NODE_ENV` | Environment (production/development) | No (defaults to production) |

## Security Notes

- Never commit your `GMAIL_APP_PASSWORD` to version control
- Use Vercel's environment variables for sensitive data
- The app password is more secure than your regular Gmail password

## Troubleshooting

### Email Not Sending
1. Check Vercel function logs
2. Verify environment variables are set
3. Test with a simple email first

### Deployment Fails
1. Check `package.json` for correct dependencies
2. Ensure all imports use `.js` extensions (ES modules)
3. Verify `vercel.json` configuration

### Function Errors
1. Check function logs in Vercel dashboard
2. Verify all required files are in the correct location
3. Test locally first with `npm start`

## Support

If you encounter issues:
1. Check Vercel documentation
2. Review function logs in Vercel dashboard
3. Test endpoints with tools like Postman
4. Verify environment variables are correctly set 