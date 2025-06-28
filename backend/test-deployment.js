// Test script for deployed backend
const API_BASE_URL = process.env.API_URL || 'https://your-project.vercel.app/api';

async function testHealthEndpoint() {
  try {
    console.log('🏥 Testing health endpoint...');
    const response = await fetch(`${API_BASE_URL}/contact-health`);
    const data = await response.json();
    
    console.log('✅ Health check response:', data);
    return data.status === 'healthy';
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

async function testContactEndpoint() {
  try {
    console.log('📧 Testing contact endpoint...');
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Message',
      message: 'This is a test message from the deployment verification script.'
    };

    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const data = await response.json();
    console.log('✅ Contact endpoint response:', data);
    return data.success === true;
  } catch (error) {
    console.error('❌ Contact endpoint failed:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Running deployment tests...\n');
  
  const healthOk = await testHealthEndpoint();
  console.log('');
  
  const contactOk = await testContactEndpoint();
  console.log('');
  
  if (healthOk && contactOk) {
    console.log('🎉 All tests passed! Your backend is working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Check your deployment and environment variables.');
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests();
}

export { testHealthEndpoint, testContactEndpoint, runTests }; 