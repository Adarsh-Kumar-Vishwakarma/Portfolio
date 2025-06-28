#!/bin/bash

# Backend Deployment Script for Vercel
echo "🚀 Starting backend deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

# Deploy to Vercel
echo "📦 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed!"
echo "📝 Don't forget to set your environment variables in Vercel dashboard:"
echo "   - GMAIL_APP_PASSWORD"
echo "   - YOUR_EMAIL"
echo "   - NODE_ENV=production" 