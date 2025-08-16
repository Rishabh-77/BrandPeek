/**
 * Test script for API services
 * This is a React Native compatible test that can be imported and run in the app
 */

// Import services
import { brandService } from '../services';

async function testServices() {
  console.log('🧪 Testing API Services...\n');

  try {
    // Test 1: Get all brands
    console.log('📋 Test 1: Fetching all brands...');
    const brands = await brandService.getBrands();
    console.log(`✅ Success: Fetched ${brands.length} brands`);

    if (brands.length > 0) {
      console.log('📄 Sample brand:', {
        id: brands[0].id,
        name: brands[0].name,
        description: brands[0].description.substring(0, 50) + '...',
      });
    }
    console.log('');

    // Test 2: Get brand by ID (if brands exist)
    if (brands.length > 0) {
      const firstBrandId = brands[0].id;
      console.log(`🔍 Test 2: Fetching brand by ID (${firstBrandId})...`);
      const brand = await brandService.getBrandById(firstBrandId);
      console.log(`✅ Success: Fetched brand "${brand.name}"`);
      console.log('📄 Brand details:', {
        id: brand.id,
        name: brand.name,
        category: brand.category || 'No category',
        website: brand.website || 'No website',
      });
      console.log('');
    }

    // Test 3: Test error handling with invalid ID
    console.log('❌ Test 3: Testing error handling with invalid ID...');
    try {
      await brandService.getBrandById('invalid-id-12345');
      console.log('⚠️  Expected error but got success');
    } catch (error) {
      console.log(`✅ Success: Properly handled error - ${error.message}`);
    }
    console.log('');

    // Test 4: Test search functionality
    if (brands.length > 0) {
      const searchTerm = brands[0].name.split(' ')[0]; // Use first word of first brand
      console.log(`🔎 Test 4: Searching brands for "${searchTerm}"...`);
      const searchResults = await brandService.searchBrands(searchTerm);
      console.log(
        `✅ Success: Found ${searchResults.length} brands matching "${searchTerm}"`
      );
      console.log('');
    }

    // Test 5: Test categories
    console.log('📂 Test 5: Fetching categories...');
    const categories = await brandService.getCategories();
    console.log(
      `✅ Success: Found ${categories.length} categories:`,
      categories
    );
    console.log('');

    console.log('🎉 All tests completed successfully!');
  } catch (error) {
    process.exit(1);
  }
}

// Export for use in React Native app
export { testServices };
