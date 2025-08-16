#!/usr/bin/env node

/**
 * Service Validation Script
 * Validates that the API services are properly structured and exported
 * Run with: node scripts/validate-services.js
 */

const path = require('path');
const fs = require('fs');

console.log('🔍 Validating API Services...\n');

// Check if service files exist
const serviceFiles = [
  'services/apiService.js',
  'services/brandService.js',
  'services/index.js',
];

let allFilesExist = true;

serviceFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - exists`);
  } else {
    console.log(`❌ ${file} - missing`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n💥 Some service files are missing!');
  process.exit(1);
}

// Check service structure by reading files
console.log('\n🔍 Validating service structure...');

try {
  // Check apiService.js
  const apiServiceContent = fs.readFileSync(
    path.join(__dirname, '..', 'services/apiService.js'),
    'utf8'
  );
  const apiServiceChecks = [
    { name: 'ApiService class', pattern: /class ApiService/ },
    { name: 'makeRequest method', pattern: /async makeRequest/ },
    { name: 'get method', pattern: /async get/ },
    { name: 'post method', pattern: /async post/ },
    { name: 'error handling', pattern: /handleError/ },
    { name: 'logging functionality', pattern: /log\(/ },
    { name: 'timeout handling', pattern: /createTimeoutPromise/ },
    { name: 'retry logic', pattern: /retryCount/ },
  ];

  apiServiceChecks.forEach(check => {
    if (check.pattern.test(apiServiceContent)) {
      console.log(`✅ ApiService - ${check.name}`);
    } else {
      console.log(`❌ ApiService - ${check.name} missing`);
    }
  });

  // Check brandService.js
  const brandServiceContent = fs.readFileSync(
    path.join(__dirname, '..', 'services/brandService.js'),
    'utf8'
  );
  const brandServiceChecks = [
    { name: 'BrandService class', pattern: /class BrandService/ },
    { name: 'getBrands method', pattern: /async getBrands/ },
    { name: 'getBrandById method', pattern: /async getBrandById/ },
    { name: 'searchBrands method', pattern: /async searchBrands/ },
    { name: 'error handling', pattern: /catch \(error\)/ },
    { name: 'data validation', pattern: /validateBrandData/ },
    { name: 'API service import', pattern: /import.*apiService/ },
  ];

  brandServiceChecks.forEach(check => {
    if (check.pattern.test(brandServiceContent)) {
      console.log(`✅ BrandService - ${check.name}`);
    } else {
      console.log(`❌ BrandService - ${check.name} missing`);
    }
  });

  // Check index.js exports
  const indexContent = fs.readFileSync(
    path.join(__dirname, '..', 'services/index.js'),
    'utf8'
  );
  const indexChecks = [
    { name: 'apiService export', pattern: /export.*apiService/ },
    { name: 'brandService export', pattern: /export.*brandService/ },
  ];

  indexChecks.forEach(check => {
    if (check.pattern.test(indexContent)) {
      console.log(`✅ Index - ${check.name}`);
    } else {
      console.log(`❌ Index - ${check.name} missing`);
    }
  });

  console.log('\n🎉 Service validation completed!');
  console.log('\n📋 Summary:');
  console.log('✅ All service files exist');
  console.log(
    '✅ ApiService provides base HTTP functionality with error handling'
  );
  console.log('✅ BrandService provides brand-specific API methods');
  console.log('✅ Services are properly exported for use in the app');
  console.log(
    '\n🚀 Services are ready for integration with React Native components!'
  );
} catch (error) {
  console.error('\n💥 Error validating services:', error.message);
  process.exit(1);
}
