import { Image } from 'expo-image';

/**
 * Image cache utility for optimizing brand logo loading
 * Provides preloading and cache management functionality
 */
class ImageCache {
  constructor() {
    this.preloadedImages = new Set();
    this.failedImages = new Set();
  }

  /**
   * Preload images for better performance
   * @param {string[]} imageUrls - Array of image URLs to preload
   */
  async preloadImages(imageUrls) {
    if (!Array.isArray(imageUrls)) return;

    const preloadPromises = imageUrls
      .filter(
        url =>
          url && !this.preloadedImages.has(url) && !this.failedImages.has(url)
      )
      .map(async url => {
        try {
          await Image.prefetch(url, {
            cachePolicy: 'memory-disk',
            priority: 'low',
          });
          this.preloadedImages.add(url);
          if (__DEV__) {
            console.log(`[ImageCache] Preloaded: ${url}`);
          }
        } catch (error) {
          this.failedImages.add(url);
          if (__DEV__) {
            console.warn(`[ImageCache] Failed to preload: ${url}`, error);
          }
        }
      });

    await Promise.allSettled(preloadPromises);
  }

  /**
   * Preload brand logos from brand data
   * @param {Array} brands - Array of brand objects with logo URLs
   */
  async preloadBrandLogos(brands) {
    if (!Array.isArray(brands)) return;

    const logoUrls = brands.map(brand => brand?.logo).filter(Boolean);

    await this.preloadImages(logoUrls);
  }

  /**
   * Clear the image cache
   */
  async clearCache() {
    try {
      await Image.clearMemoryCache();
      await Image.clearDiskCache();
      this.preloadedImages.clear();
      this.failedImages.clear();
      if (__DEV__) {
        console.log('[ImageCache] Cache cleared');
      }
    } catch (error) {
      if (__DEV__) {
        console.warn('[ImageCache] Failed to clear cache:', error);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      preloaded: this.preloadedImages.size,
      failed: this.failedImages.size,
    };
  }

  /**
   * Check if an image is preloaded
   * @param {string} url - Image URL to check
   */
  isPreloaded(url) {
    return this.preloadedImages.has(url);
  }

  /**
   * Check if an image failed to load
   * @param {string} url - Image URL to check
   */
  hasFailed(url) {
    return this.failedImages.has(url);
  }
}

// Export singleton instance
export default new ImageCache();
