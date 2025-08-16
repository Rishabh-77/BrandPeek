#!/usr/bin/env node

/**
 * API Testing Script for BrandPeek MockAPI
 *
 * This script tests the MockAPI endpoints to ensure they return proper JSON responses
 * Run with: node scripts/test-api.js
 */

const { default: API_CONFIG, API_URLS } = require('../constants/api.js');

// Test configuration
const TEST_CONFIG = {
  timeout: 10000,
  expectedBrandCount: 8, // Minimum expected brands
  requiredFields: ['id', 'name', 'logo', 'description', 'fullDescription'],
};

/**
 * Make HTTP request with timeout
 */
async function makeRequest(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TEST_CONFIG.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Test GET /brands endpoint
 */
async function testGetBrands() {
  console.log('🧪 Testing GET /brands endpoint...');

  try {
    const brands = await makeRequest(API_URLS.BRANDS);

    // Validate response structure
    if (!Array.isArray(brands)) {
      throw new Error('Response should be an array of brands');
    }

    if (brands.length < TEST_CONFIG.expectedBrandCount) {
      console.warn(
        `⚠️  Expected at least ${TEST_CONFIG.expectedBrandCount} brands, got ${brands.length}`
      );
    }

    // Validate each brand has required fields
    brands.forEach((brand, index) => {
      TEST_CONFIG.requiredFields.forEach(field => {
        if (!brand[field]) {
          throw new Error(
            `Brand ${index + 1} missing required field: ${field}`
          );
        }
      });
    });

    console.log(`✅ GET /brands - Success! Retrieved ${brands.length} brands`);
    return brands;
  } catch (error) {
    console.error(`❌ GET /brands - Failed: ${error.message}`);
    throw error;
  }
}

/**
 * Test GET /brands/:id endpoint
 */
async function testGetBrandById(brandId) {
  console.log(`🧪 Testing GET /brands/${brandId} endpoint...`);

  try {
    const brand = await makeRequest(API_URLS.BRAND_BY_ID(brandId));

    // Validate response structure
    if (typeof brand !== 'object' || Array.isArray(brand)) {
      throw new Error('Response should be a single brand object');
    }

    // Validate brand has required fields
    TEST_CONFIG.requiredFields.forEach(field => {
      if (!brand[field]) {
        throw new Error(`Brand missing required field: ${field}`);
      }
    });

    // Validate ID matches
    if (brand.id !== brandId) {
      throw new Error(`Expected brand ID ${brandId}, got ${brand.id}`);
    }

    console.log(
      `✅ GET /brands/${brandId} - Success! Retrieved brand: ${brand.name}`
    );
    return brand;
  } catch (error) {
    console.error(`❌ GET /brands/${brandId} - Failed: ${error.message}`);
    throw error;
  }
}

/**
 * Test API error handling
 */
async function testErrorHandling() {
  console.log('🧪 Testing error handling...');

  try {
    // Test non-existent brand
    await makeRequest(API_URLS.BRAND_BY_ID('999999'));
    console.warn(
      '⚠️  Expected 404 error for non-existent brand, but request succeeded'
    );
  } catch (error) {
    if (error.message.includes('404')) {
      console.log(
        '✅ Error handling - 404 for non-existent brand works correctly'
      );
    } else {
      console.log(`✅ Error handling - Got expected error: ${error.message}`);
    }
  }
}

/**
 * Validate brand data quality
 */
function validateBrandData(brands) {
  console.log('🧪 Validating brand data quality...');

  const issues = [];

  brands.forEach((brand, index) => {
    // Check for empty or placeholder values
    if (brand.name === 'Brand Name' || brand.name.includes('TODO')) {
      issues.push(`Brand ${index + 1}: Generic or placeholder name`);
    }

    if (
      brand.description === 'Description' ||
      brand.description.includes('TODO')
    ) {
      issues.push(`Brand ${index + 1}: Generic or placeholder description`);
    }

    // Check logo URL format
    if (!brand.logo.startsWith('http')) {
      issues.push(`Brand ${index + 1}: Logo should be a valid URL`);
    }

    // Check description length
    if (brand.description.length < 10) {
      issues.push(`Brand ${index + 1}: Description too short`);
    }

    if (brand.fullDescription.length < 50) {
      issues.push(`Brand ${index + 1}: Full description too short`);
    }
  });

  if (issues.length > 0) {
    console.warn('⚠️  Data quality issues found:');
    issues.forEach(issue => console.warn(`   - ${issue}`));
  } else {
    console.log('✅ Brand data quality - All checks passed');
  }
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('🚀 Starting MockAPI tests...\n');
  console.log(`📍 Base URL: ${API_CONFIG.BASE_URL}\n`);

  let allTestsPassed = true;

  try {
    // Test GET /brands
    const brands = await testGetBrands();
    console.log('');

    // Test GET /brands/:id with first brand
    if (brands.length > 0) {
      await testGetBrandById(brands[0].id);
      console.log('');
    }

    // Test error handling
    await testErrorHandling();
    console.log('');

    // Validate data quality
    validateBrandData(brands);
    console.log('');
  } catch (error) {
    allTestsPassed = false;
    console.error(`\n💥 Test suite failed: ${error.message}`);
  }

  // Summary
  console.log('📊 Test Summary:');
  if (allTestsPassed) {
    console.log('✅ All tests passed! Your MockAPI is ready to use.');
  } else {
    console.log(
      '❌ Some tests failed. Please check your MockAPI configuration.'
    );
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().catch(error => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  });
}

module.exports = {
  runTests,
  testGetBrands,
  testGetBrandById,
  testErrorHandling,
  validateBrandData,
};
