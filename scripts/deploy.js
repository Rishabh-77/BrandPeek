#!/usr/bin/env node

/**
 * BrandPeek Deployment Script
 *
 * This script helps deploy the BrandPeek app to Expo Go for sharing and testing.
 * It provides step-by-step instructions and automated deployment commands.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 BrandPeek Deployment Script');
console.log('================================\n');

// Check if user is logged in to Expo
function checkExpoLogin() {
  try {
    const result = execSync('npx expo whoami', { encoding: 'utf8' });
    if (result.includes('Not logged in')) {
      console.log('❌ You are not logged in to Expo.');
      console.log('📝 Please run: npx expo login');
      console.log('   Then run this script again.\n');
      return false;
    } else {
      console.log('✅ Logged in to Expo as:', result.trim());
      return true;
    }
  } catch (error) {
    console.log('❌ Error checking Expo login status:', error.message);
    return false;
  }
}

// Validate project configuration
function validateProject() {
  console.log('🔍 Validating project configuration...');

  const appJsonPath = path.join(__dirname, '..', 'app.json');
  if (!fs.existsSync(appJsonPath)) {
    console.log('❌ app.json not found');
    return false;
  }

  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  const expo = appJson.expo;

  if (!expo.name || !expo.slug || !expo.version) {
    console.log('❌ Missing required fields in app.json');
    return false;
  }

  console.log('✅ Project configuration is valid');
  console.log(`   App Name: ${expo.name}`);
  console.log(`   Slug: ${expo.slug}`);
  console.log(`   Version: ${expo.version}\n`);

  return true;
}

// Start Expo development server for sharing
function startExpoServer() {
  console.log('📦 Starting Expo development server for sharing...');

  try {
    console.log('🚀 Starting Expo server...');
    console.log('   This will generate a QR code and shareable link');
    console.log('   Keep this terminal open to maintain the connection\n');

    // Start the expo server
    execSync('npx expo start --tunnel', { stdio: 'inherit' });

    return true;
  } catch (error) {
    console.log('❌ Error starting Expo server:', error.message);
    console.log('💡 Try running: npx expo start --tunnel manually');
    return false;
  }
}

// Generate sharing information
function generateSharingInfo() {
  console.log('\n🎉 App is Ready for Sharing!');
  console.log('=============================\n');

  console.log('📱 How to share your app:');
  console.log('   1. The QR code above can be scanned with Expo Go');
  console.log('   2. The tunnel URL works from anywhere in the world');
  console.log('   3. Share the QR code or URL with testers\n');

  console.log('📋 Instructions for testers:');
  console.log('   1. Install Expo Go app from App Store/Google Play');
  console.log('   2. Scan the QR code or open the tunnel URL');
  console.log('   3. The app will load automatically\n');

  console.log('🔧 Development commands:');
  console.log('   npm run start     - Start development server');
  console.log('   npm run android   - Start on Android simulator');
  console.log('   npm run ios       - Start on iOS simulator');
  console.log('   npm run deploy    - Start tunnel for sharing\n');

  console.log('⚠️  Keep this terminal open to maintain the connection!');
}

// Main deployment process
async function main() {
  // Step 1: Check Expo login
  if (!checkExpoLogin()) {
    process.exit(1);
  }

  // Step 2: Validate project
  if (!validateProject()) {
    process.exit(1);
  }

  // Step 3: Generate sharing info
  generateSharingInfo();

  // Step 4: Start Expo server for sharing
  startExpoServer();
}

// Run the deployment
main().catch(error => {
  process.exit(1);
});
