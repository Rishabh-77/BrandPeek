#!/usr/bin/env node

/**
 * BrandPeek App Sharing Script
 *
 * This script starts the Expo development server with tunnel mode
 * to create a shareable link for the BrandPeek app.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 BrandPeek App Sharing');
console.log('========================\n');

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

// Display sharing instructions
function displayInstructions() {
  const appJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'app.json'), 'utf8')
  );

  console.log('📱 BrandPeek App Sharing Instructions');
  console.log('=====================================\n');

  console.log('🎯 App Details:');
  console.log(`   Name: ${appJson.expo.name}`);
  console.log(`   Version: ${appJson.expo.version}`);
  console.log(`   Description: ${appJson.expo.description}\n`);

  console.log('📋 How to share:');
  console.log('   1. A QR code will appear below');
  console.log('   2. Share the QR code or tunnel URL with testers');
  console.log('   3. Testers scan with Expo Go app\n');

  console.log('📱 For testers:');
  console.log('   1. Install Expo Go from App Store/Google Play');
  console.log('   2. Scan the QR code with Expo Go');
  console.log('   3. The app will load automatically\n');

  console.log('⚠️  Important:');
  console.log('   - Keep this terminal open while sharing');
  console.log('   - The tunnel URL works from anywhere');
  console.log('   - Press Ctrl+C to stop sharing\n');

  console.log('🚀 Starting Expo tunnel...\n');
}

// Start Expo with tunnel for sharing
function startSharing() {
  try {
    // Start expo with tunnel mode for global access
    execSync('npx expo start --tunnel', { stdio: 'inherit' });
  } catch (error) {
    console.log('\n❌ Error starting Expo tunnel:', error.message);
    console.log('\n💡 Alternative options:');
    console.log('   - Try: npx expo start --lan (for local network)');
    console.log('   - Try: npx expo start (for localhost only)');
    console.log('   - Check your internet connection');
  }
}

// Main function
async function main() {
  // Check login status
  if (!checkExpoLogin()) {
    process.exit(1);
  }

  // Display instructions
  displayInstructions();

  // Start sharing
  startSharing();
}

// Run the script
main().catch(error => {
  console.error('❌ Sharing failed:', error);
  process.exit(1);
});
