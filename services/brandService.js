import apiService from './apiService';
import { API_CONFIG, API_URLS } from '../constants/api';

/**
 * Brand service for handling brand-related API operations
 * Provides methods for fetching brand data from MockAPI backend
 */
class BrandService {
  /**
   * Fetch all brands from the API
   * @returns {Promise<Array>} Promise resolving to array of brand objects
   * @throws {Object} Formatted error object with message, code, and details
   */
  async getBrands() {
    try {
      if (__DEV__) {
        console.log('[BrandService] Fetching all brands...');
      }

      // Make API call to get brands
      const response = await apiService.get(API_URLS.BRANDS);

      // Validate response structure
      if (!Array.isArray(response)) {
        throw new Error('Invalid response format: expected array of brands');
      }

      // Validate each brand object has required fields
      const validatedBrands = response.map((brand, index) => {
        if (!brand.id || !brand.name) {
          console.warn(
            `[BrandService] Brand at index ${index} missing required fields:`,
            brand
          );
        }

        return {
          id: brand.id || `brand_${index}`,
          name: brand.name || 'Unknown Brand',
          logo: brand.logo || '',
          description: brand.description || 'No description available',
          fullDescription:
            brand.fullDescription ||
            brand.description ||
            'No detailed description available',
          website: brand.website || '',
          category: brand.category || '',
          founded: brand.founded || '',
          headquarters: brand.headquarters || '',
        };
      });

      if (__DEV__) {
        console.log(
          `[BrandService] Successfully fetched ${validatedBrands.length} brands`
        );
      }

      return validatedBrands;
    } catch (error) {
      if (__DEV__) {
        console.error('[BrandService] Error fetching brands:', error);
      }

      // Re-throw formatted error from apiService or create new one
      if (error.code && error.message) {
        throw error;
      } else {
        throw {
          message: API_CONFIG.ERROR_MESSAGES.SERVER_ERROR,
          code: 'BRANDS_FETCH_ERROR',
          originalError: error,
          timestamp: new Date().toISOString(),
        };
      }
    }
  }

  /**
   * Fetch a specific brand by ID from the API
   * @param {string|number} brandId - The ID of the brand to fetch
   * @returns {Promise<Object>} Promise resolving to brand object
   * @throws {Object} Formatted error object with message, code, and details
   */
  async getBrandById(brandId) {
    try {
      // Validate input
      if (!brandId) {
        throw {
          message: 'Brand ID is required',
          code: 'INVALID_BRAND_ID',
          timestamp: new Date().toISOString(),
        };
      }

      if (__DEV__) {
        console.log(`[BrandService] Fetching brand with ID: ${brandId}`);
      }

      // Make API call to get specific brand
      const response = await apiService.get(API_URLS.BRAND_BY_ID(brandId));

      // Validate response structure
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response format: expected brand object');
      }

      // Validate brand object has required fields
      const validatedBrand = {
        id: response.id || brandId,
        name: response.name || 'Unknown Brand',
        logo: response.logo || '',
        description: response.description || 'No description available',
        fullDescription:
          response.fullDescription ||
          response.description ||
          'No detailed description available',
        website: response.website || '',
        category: response.category || '',
        founded: response.founded || '',
        headquarters: response.headquarters || '',
      };

      if (__DEV__) {
        console.log(
          `[BrandService] Successfully fetched brand: ${validatedBrand.name}`
        );
      }

      return validatedBrand;
    } catch (error) {
      if (__DEV__) {
        console.error(`[BrandService] Error fetching brand ${brandId}:`, error);
      }

      // Handle specific error cases
      if (error.code === 'NOT_FOUND') {
        throw {
          message: `Brand with ID ${brandId} not found`,
          code: 'BRAND_NOT_FOUND',
          brandId,
          timestamp: new Date().toISOString(),
        };
      }

      // Re-throw formatted error from apiService or create new one
      if (error.code && error.message) {
        throw error;
      } else {
        throw {
          message: API_CONFIG.ERROR_MESSAGES.SERVER_ERROR,
          code: 'BRAND_FETCH_ERROR',
          brandId,
          originalError: error,
          timestamp: new Date().toISOString(),
        };
      }
    }
  }

  /**
   * Search brands by name (client-side filtering)
   * Note: This method fetches all brands and filters locally
   * For production apps, consider server-side search endpoints
   * @param {string} searchTerm - Term to search for in brand names
   * @returns {Promise<Array>} Promise resolving to filtered array of brand objects
   */
  async searchBrands(searchTerm) {
    try {
      if (!searchTerm || typeof searchTerm !== 'string') {
        return [];
      }

      if (__DEV__) {
        console.log(`[BrandService] Searching brands for: "${searchTerm}"`);
      }

      const allBrands = await this.getBrands();
      const searchTermLower = searchTerm.toLowerCase().trim();

      const filteredBrands = allBrands.filter(
        brand =>
          brand.name.toLowerCase().includes(searchTermLower) ||
          brand.description.toLowerCase().includes(searchTermLower) ||
          (brand.category &&
            brand.category.toLowerCase().includes(searchTermLower))
      );

      if (__DEV__) {
        console.log(
          `[BrandService] Found ${filteredBrands.length} brands matching "${searchTerm}"`
        );
      }

      return filteredBrands;
    } catch (error) {
      if (__DEV__) {
        console.error(`[BrandService] Error searching brands:`, error);
      }
      throw error;
    }
  }

  /**
   * Get brands by category (client-side filtering)
   * @param {string} category - Category to filter by
   * @returns {Promise<Array>} Promise resolving to filtered array of brand objects
   */
  async getBrandsByCategory(category) {
    try {
      if (!category || typeof category !== 'string') {
        return [];
      }

      if (__DEV__) {
        console.log(
          `[BrandService] Fetching brands in category: "${category}"`
        );
      }

      const allBrands = await this.getBrands();
      const categoryLower = category.toLowerCase().trim();

      const filteredBrands = allBrands.filter(
        brand =>
          brand.category && brand.category.toLowerCase() === categoryLower
      );

      if (__DEV__) {
        console.log(
          `[BrandService] Found ${filteredBrands.length} brands in category "${category}"`
        );
      }

      return filteredBrands;
    } catch (error) {
      if (__DEV__) {
        console.error(
          `[BrandService] Error fetching brands by category:`,
          error
        );
      }
      throw error;
    }
  }

  /**
   * Validate brand data structure
   * @param {Object} brand - Brand object to validate
   * @returns {boolean} True if valid, false otherwise
   */
  validateBrandData(brand) {
    if (!brand || typeof brand !== 'object') {
      return false;
    }

    const requiredFields = ['id', 'name'];
    const hasRequiredFields = requiredFields.every(
      field =>
        brand.hasOwnProperty(field) &&
        brand[field] !== null &&
        brand[field] !== undefined
    );

    return hasRequiredFields;
  }

  /**
   * Get available brand categories from all brands
   * @returns {Promise<Array>} Promise resolving to array of unique categories
   */
  async getCategories() {
    try {
      if (__DEV__) {
        console.log('[BrandService] Fetching available categories...');
      }

      const allBrands = await this.getBrands();
      const categories = [
        ...new Set(
          allBrands
            .map(brand => brand.category)
            .filter(category => category && category.trim() !== '')
        ),
      ].sort();

      if (__DEV__) {
        console.log(
          `[BrandService] Found ${categories.length} categories:`,
          categories
        );
      }

      return categories;
    } catch (error) {
      if (__DEV__) {
        console.error('[BrandService] Error fetching categories:', error);
      }
      throw error;
    }
  }
}

// Export singleton instance
export default new BrandService();
