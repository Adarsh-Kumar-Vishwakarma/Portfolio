// Simple test script for Vercel deployment
// Replace YOUR_VERCEL_URL with your actual Vercel deployment URL

const VERCEL_URL = 'https://your-project.vercel.app'; // Replace with your actual URL

async function testVercelDeployment() {
  console.log('🧪 Testing Vercel Deployment...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await fetch(`${VERCEL_URL}/api/contact-health`);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health check passed');
      console.log('📊 Status:', healthData);
    } else {
      console.log('❌ Health check failed');
      console.log('Status:', healthResponse.status);
    }

    // Test 2: Contact Form Endpoint
    console.log('\n2️⃣ Testing Contact Form Endpoint...');
    const contactResponse = await fetch(`${VERCEL_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Vercel Deployment Test',
        message: 'This is a test message to verify the deployment is working.'
      })
    });

    if (contactResponse.ok) {
      const contactData = await contactResponse.json();
      console.log('✅ Contact form endpoint working');
      console.log('📊 Response:', contactData);
    } else {
      const errorData = await contactResponse.json();
      console.log('❌ Contact form endpoint failed');
      console.log('📊 Error:', errorData);
    }

    console.log('\n🎉 Deployment test completed!');
    console.log(`🔗 Your API URL: ${VERCEL_URL}`);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔍 Make sure to:');
    console.log('1. Replace YOUR_VERCEL_URL with your actual deployment URL');
    console.log('2. Set up environment variables in Vercel dashboard');
    console.log('3. Check Vercel function logs for any errors');
  }
}

// Instructions for usage
console.log('📝 Instructions:');
console.log('1. Replace the VERCEL_URL constant with your actual deployment URL');
console.log('2. Run this script with: node test-vercel-deployment.js');
console.log('3. Make sure your environment variables are set in Vercel\n');

// Uncomment the line below to run the test
// testVercelDeployment(); 