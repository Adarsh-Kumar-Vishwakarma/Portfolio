import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Debugging Environment Variables...\n');

// Check if .env file exists
const envPath = join(__dirname, '.env');
console.log('📁 .env file path:', envPath);
console.log('📁 .env file exists:', existsSync(envPath));

if (existsSync(envPath)) {
  console.log('\n📄 .env file content:');
  try {
    const envContent = readFileSync(envPath, 'utf8');
    console.log(envContent);
  } catch (error) {
    console.error('❌ Error reading .env file:', error.message);
  }
}

// Load environment variables
console.log('\n🔧 Loading environment variables...');
dotenv.config();

// Check environment variables
console.log('\n📋 Environment variables after loading:');
console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'Set' : 'Not set');
console.log('YOUR_EMAIL:', process.env.YOUR_EMAIL ? 'Set' : 'Not set');
console.log('FROM_EMAIL:', process.env.FROM_EMAIL ? 'Set' : 'Not set');
console.log('PORT:', process.env.PORT || 'Not set');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Not set');

if (process.env.SENDGRID_API_KEY) {
  console.log('\n✅ SendGrid API Key found!');
  console.log('Key starts with SG.:', process.env.SENDGRID_API_KEY.startsWith('SG.'));
} else {
  console.log('\n❌ SendGrid API Key not found!');
} 