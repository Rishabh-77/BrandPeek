#!/usr/bin/env node

/**
 * BrandPeek Demo Links Generator
 *
 * This script provides quick access to all demo options and sharing links
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 BrandPeek Demo Access Options');
console.log('=================================\n');

// Read app configuration
const appJsonPath = path.join(__dirname, '..', 'app.json');
const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
const appName = appJson.expo.name;
const appSlug = appJson.expo.slug;

console.log(`📱 App: ${appName}`);
console.log(`🔗 Slug: ${appSlug}\n`);

console.log('🎯 LIVE DEMO OPTIONS:');
console.log('=====================\n');

console.log('1️⃣  EXPO GO + QR CODE (Recommended)');
console.log('   📋 Command: npm run share');
console.log('   📱 Install: Expo Go from App Store/Google Play');
console.log('   🎯 Access: Scan QR code when command runs');
console.log('   ✅ Global access, full native experience\n');

console.log('2️⃣  TUNNEL URL');
console.log('   📋 Command: npm run tunnel');
console.log('   🔗 Access: Copy tunnel URL from terminal');
console.log('   📱 Usage: Open URL in Expo Go app');
console.log('   ✅ Shareable link, works anywhere\n');

console.log('3️⃣  ANDROID APK (Permanent)');
console.log('   📋 Command: npm run build:android');
console.log('   📦 Output: Downloadable APK file');
console.log('   📱 Install: Direct installation on Android');
console.log('   ✅ No Expo Go needed, permanent install\n');

console.log('4️⃣  WEB VERSION');
console.log('   📋 Command: npm run web');
console.log('   🌐 Access: http://localhost:8081');
console.log('   💻 Usage: Open in any web browser');
console.log('   ✅ No app installation required\n');

console.log('📊 QUICK COMPARISON:');
console.log('====================');
console.log('Method          | Setup Time | Permanent | Global Access');
console.log('----------------|------------|-----------|---------------');
console.log('Expo Go + QR   | 2 min      | No*       | Yes');
console.log('Tunnel URL     | 1 min      | No*       | Yes');
console.log('Android APK    | 10 min     | Yes       | Yes');
console.log('Web Version    | 1 min      | No*       | Local only');
console.log('');
console.log('* Requires keeping terminal running\n');

console.log('🎮 WHAT TO TEST:');
console.log('================');
console.log('✅ Brand discovery with gradient background');
console.log('✅ Tap brands to view detailed information');
console.log('✅ Follow/unfollow button interactions');
console.log('✅ Pull-to-refresh functionality');
console.log('✅ Smooth navigation and animations');
console.log('✅ Error handling and loading states\n');

console.log('🚀 QUICK START:');
console.log('===============');
console.log('For immediate demo: npm run share');
console.log('For permanent build: npm run build:android');
console.log('For web testing: npm run web\n');

console.log('📖 For detailed instructions, see: docs/live-demo-guide.md');
console.log('📋 For setup help, see: README.md');

console.log('\n🎉 Ready to share your BrandPeek app!');
