import fetch from 'node-fetch';

// Configuration
const API_BASE_URL = process.env.VERCEL_URL || 'http://localhost:3001';

async function testDeployment() {
  console.log('🧪 Testing Portfolio Backend Deployment...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await fetch(`${API_BASE_URL}/api/contact-health`);
    const healthData = await healthResponse.json();
    
    if (healthResponse.ok) {
      console.log('✅ Health check passed');
      console.log('📊 Status:', healthData);
    } else {
      console.log('❌ Health check failed');
      console.log('📊 Response:', healthData);
    }

    // Test 2: Contact Form (without actually sending email)
    console.log('\n2️⃣ Testing Contact Form Endpoint...');
    const contactResponse = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Deployment Test',
        message: 'This is a test message to verify deployment.'
      })
    });

    const contactData = await contactResponse.json();
    
    if (contactResponse.ok) {
      console.log('✅ Contact form endpoint working');
      console.log('📊 Response:', contactData);
    } else {
      console.log('❌ Contact form endpoint failed');
      console.log('📊 Response:', contactData);
    }

    // Test 3: CORS Headers
    console.log('\n3️⃣ Testing CORS Configuration...');
    const corsResponse = await fetch(`${API_BASE_URL}/api/contact-health`, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://your-frontend-domain.com',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });

    if (corsResponse.headers.get('access-control-allow-origin')) {
      console.log('✅ CORS headers present');
    } else {
      console.log('⚠️  CORS headers not found');
    }

    console.log('\n🎉 Deployment test completed!');
    console.log(`🔗 API Base URL: ${API_BASE_URL}`);
    
    if (healthResponse.ok && contactResponse.ok) {
      console.log('✅ All tests passed! Your backend is ready.');
    } else {
      console.log('⚠️  Some tests failed. Check the logs above.');
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.log('\n🔍 Troubleshooting tips:');
    console.log('1. Check if the server is running');
    console.log('2. Verify the API_BASE_URL is correct');
    console.log('3. Check Vercel deployment logs');
    console.log('4. Ensure environment variables are set');
  }
}

// Run the test
testDeployment(); 