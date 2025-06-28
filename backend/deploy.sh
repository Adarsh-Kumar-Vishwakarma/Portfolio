#!/bin/bash

echo "🚀 Starting Vercel deployment for Portfolio Backend..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if we're in the backend directory
if [ ! -f "server.js" ]; then
    echo "❌ Please run this script from the backend directory"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Please create one with your environment variables:"
    echo "   GMAIL_USER=your-email@gmail.com"
    echo "   GMAIL_APP_PASSWORD=your-16-char-app-password"
    echo "   YOUR_EMAIL=your-email@gmail.com"
    echo "   NODE_ENV=production"
    exit 1
fi

echo "✅ Environment check passed"

# Deploy to Vercel
echo "📦 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment completed!"
echo "📧 Your email API is now live!"
echo "🔗 Check your Vercel dashboard for the deployment URL" 