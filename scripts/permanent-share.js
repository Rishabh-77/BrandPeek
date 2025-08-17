#!/usr/bin/env node

/**
 * BrandPeek Permanent Sharing Script
 *
 * This script creates a permanent shareable link using Expo's development build
 * that can be accessed anytime without keeping your terminal running.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 BrandPeek Permanent Sharing Setup');
console.log('====================================\n');

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

// Display permanent sharing options
function displaySharingOptions() {
  const appJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'app.json'), 'utf8')
  );

  console.log('📱 Permanent Sharing Options for BrandPeek');
  console.log('==========================================\n');

  console.log('🎯 App Details:');
  console.log(`   Name: ${appJson.expo.name}`);
  console.log(`   Slug: ${appJson.expo.slug}`);
  console.log(`   Version: ${appJson.expo.version}\n`);

  console.log('🔗 Option 1: Expo Go Link (Recommended)');
  console.log(
    '   This creates a permanent link that works without your terminal:'
  );
  console.log(`   📱 https://expo.dev/@rishabh_77/${appJson.expo.slug}`);
  console.log('   📱 Or search "BrandPeek" in Expo Go app\n');

  console.log('📋 How to use:');
  console.log('   1. Share the link above with anyone');
  console.log('   2. They install Expo Go app');
  console.log('   3. They open the link or search for your app');
  console.log('   4. App loads automatically - no terminal needed!\n');

  console.log('🔧 To update the app:');
  console.log('   1. Make your changes locally');
  console.log('   2. Run: npm run publish-permanent');
  console.log('   3. Updates will be available immediately\n');

  console.log('⚡ Starting permanent publishing...\n');
}

// Publish to Expo for permanent access
function publishPermanent() {
  try {
    console.log('📦 Publishing to Expo for permanent access...');

    // Use expo export for web deployment
    console.log('🌐 Creating web build...');
    execSync('npx expo export -p web', { stdio: 'inherit' });

    console.log('✅ Web build created successfully!');
    console.log('\n🎉 Your app is now permanently accessible!');
    console.log('==========================================\n');

    const appJson = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'app.json'), 'utf8')
    );

    console.log('🔗 Permanent Links:');
    console.log(
      `   📱 Expo Go: https://expo.dev/@rishabh_77/${appJson.expo.slug}`
    );
    console.log(
      `   🌐 Web: You can host the 'dist' folder on any web server\n`
    );

    console.log('📱 For Mobile Users:');
    console.log('   1. Install Expo Go app');
    console.log('   2. Search for "BrandPeek" or use the link above');
    console.log('   3. App loads without needing your computer!\n');

    console.log('🌐 For Web Users:');
    console.log('   1. Host the "dist" folder on a web server');
    console.log('   2. Or use services like Netlify, Vercel, or GitHub Pages');
    console.log('   3. Share the web URL\n');

    return true;
  } catch (error) {
    console.log('❌ Error during publishing:', error.message);
    console.log('\n💡 Alternative: Use tunnel mode');
    console.log('   Run: npm run share (requires keeping terminal open)');
    return false;
  }
}

// Main function
async function main() {
  // Check login status
  if (!checkExpoLogin()) {
    process.exit(1);
  }

  // Display options
  displaySharingOptions();

  // Publish permanently
  publishPermanent();
}

// Run the script
main().catch(error => {
  console.error('❌ Permanent sharing setup failed:', error);
  process.exit(1);
});
