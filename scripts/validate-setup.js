#!/usr/bin/env node

/**
 * Setup Validation Script
 *
 * This script validates that the MockAPI setup is complete and ready for development
 * Run with: node scripts/validate-setup.js
 */

const { default: API_CONFIG } = require('../constants/api.js');

function validateApiConfig() {
  console.log('🔍 Validating API configuration...\n');

  const issues = [];

  // Check if BASE_URL is updated
  if (API_CONFIG.BASE_URL.includes('YOUR_PROJECT_ID')) {
    issues.push(
      '❌ BASE_URL still contains placeholder. Update with your MockAPI project URL.'
    );
  } else {
    console.log('✅ BASE_URL is configured');
  }

  // Check URL format
  if (!API_CONFIG.BASE_URL.includes('mockapi.io')) {
    issues.push('❌ BASE_URL should be a MockAPI.io URL');
  } else {
    console.log('✅ BASE_URL format looks correct');
  }

  // Check endpoints
  if (API_CONFIG.ENDPOINTS.BRANDS !== '/brands') {
    issues.push('❌ Brands endpoint should be "/brands"');
  } else {
    console.log('✅ Brands endpoint is configured correctly');
  }

  // Check if API URLs are generated correctly
  const { API_URLS } = require('../constants/api.js');
  const brandsUrl = API_URLS.BRANDS;
  const brandByIdUrl = API_URLS.BRAND_BY_ID('1');

  if (!brandsUrl.includes('/brands')) {
    issues.push('❌ Generated brands URL is incorrect');
  } else {
    console.log('✅ Generated brands URL looks correct');
  }

  if (!brandByIdUrl.includes('/brands/1')) {
    issues.push('❌ Generated brand by ID URL is incorrect');
  } else {
    console.log('✅ Generated brand by ID URL looks correct');
  }

  console.log('\n📊 Validation Summary:');

  if (issues.length === 0) {
    console.log('✅ All validations passed! API configuration is ready.');
    console.log('\n🚀 Next steps:');
    console.log(
      '1. Make sure you have created your MockAPI project at https://mockapi.io'
    );
    console.log('2. Add the sample brand data from docs/mockapi-setup.md');
    console.log('3. Run "node scripts/test-api.js" to test your API endpoints');
    return true;
  } else {
    console.log('❌ Configuration issues found:');
    issues.forEach(issue => console.log(`   ${issue}`));
    console.log(
      '\n📖 Please refer to docs/mockapi-setup.md for setup instructions'
    );
    return false;
  }
}

// Run validation if this script is executed directly
if (require.main === module) {
  const isValid = validateApiConfig();
  process.exit(isValid ? 0 : 1);
}

module.exports = { validateApiConfig };
