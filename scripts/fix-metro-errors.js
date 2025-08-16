#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Metro bundler errors...\n');

// Function to run commands safely
function runCommand(command, description) {
  try {
    console.log(`📋 ${description}...`);
    execSync(command, { stdio: 'inherit', cwd: __dirname + '/..' });
    console.log(`✅ ${description} completed successfully\n`);
  } catch (error) {
    console.log(`❌ ${description} failed: ${error.message}\n`);
  }
}

// Function to remove directories safely
function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`🗑️  Removed: ${dirPath}`);
    } catch (error) {
      console.log(`⚠️  Could not remove ${dirPath}: ${error.message}`);
    }
  }
}

// Clear various caches
console.log('🧹 Clearing caches...\n');

// Remove Metro cache
removeDirectory(path.join(__dirname, '..', 'node_modules', '.cache'));
removeDirectory(path.join(__dirname, '..', '.expo', 'web-build'));

// Clear npm cache
runCommand('npm cache clean --force', 'Clearing npm cache');

// Clear Expo cache
runCommand('npx expo install --fix', 'Fixing Expo dependencies');

// Clear Metro cache
runCommand('npx expo start --clear', 'Clearing Metro cache');

console.log('\n🎉 Metro error fix completed!');
console.log('\n📱 Next steps:');
console.log('1. Stop the current development server (Ctrl+C)');
console.log('2. Run: npm run reset-metro');
console.log('3. Or run: npm start');
console.log('\n💡 If errors persist, try:');
console.log('- npm run reset-metro');
console.log('- Delete node_modules and run npm install');
console.log('- Check for any syntax errors in your components');
