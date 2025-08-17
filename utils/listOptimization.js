import { Dimensions } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

/**
 * Performance optimization utilities for FlatList components
 */
export class ListOptimization {
  /**
   * Calculate optimal FlatList performance settings based on screen size and data
   * @param {number} itemHeight - Height of each list item
   * @param {number} dataLength - Length of the data array
   * @returns {object} Optimized FlatList props
   */
  static getOptimalSettings(itemHeight = 88, dataLength = 0) {
    const visibleItems = Math.ceil(screenHeight / itemHeight);

    return {
      // Render only what's visible plus a small buffer
      initialNumToRender: Math.min(visibleItems + 2, dataLength, 8),

      // Window size should be proportional to visible items
      windowSize: Math.max(5, Math.min(visibleItems * 2, 21)),

      // Batch size should be smaller for better performance
      maxToRenderPerBatch: Math.min(5, Math.ceil(visibleItems / 2)),

      // Update frequency based on scroll speed
      updateCellsBatchingPeriod: 100,

      // Remove clipped subviews for memory optimization
      removeClippedSubviews: true,

      // Disable virtualization for small lists
      disableVirtualization: dataLength < 20,

      // Legacy implementation for better performance on older devices
      legacyImplementation: false,
    };
  }

  /**
   * Get optimized viewability configuration
   * @returns {object} Viewability config for FlatList
   */
  static getViewabilityConfig() {
    return {
      itemVisiblePercentThreshold: 50,
      minimumViewTime: 100,
      waitForInteraction: true,
    };
  }

  /**
   * Get optimized getItemLayout function
   * @param {number} itemHeight - Height of each item
   * @param {number} itemMargin - Margin between items
   * @returns {function} getItemLayout function
   */
  static getItemLayout(itemHeight = 88, itemMargin = 0) {
    const totalItemHeight = itemHeight + itemMargin;

    return (data, index) => ({
      length: totalItemHeight,
      offset: totalItemHeight * index,
      index,
    });
  }

  /**
   * Debounce function for scroll events
   * @param {function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {function} Debounced function
   */
  static debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function for frequent events
   * @param {function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {function} Throttled function
   */
  static throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}

/**
 * Memory optimization utilities
 */
export class MemoryOptimization {
  /**
   * Clean up unused images from memory
   * @param {Array} currentBrands - Currently visible brands
   * @param {Array} allBrands - All brands in the list
   */
  static cleanupUnusedImages(currentBrands, allBrands) {
    if (!Array.isArray(currentBrands) || !Array.isArray(allBrands)) return;

    const currentIds = new Set(
      currentBrands.map(brand => brand?.id).filter(Boolean)
    );
    const unusedBrands = allBrands.filter(brand => !currentIds.has(brand?.id));

    // This would be used with image cache cleanup
    if (__DEV__ && unusedBrands.length > 0) {
      console.log(
        `[MemoryOptimization] ${unusedBrands.length} unused brand images can be cleaned up`
      );
    }
  }

  /**
   * Monitor memory usage (development only)
   */
  static monitorMemory() {
    if (__DEV__ && global.performance && global.performance.memory) {
      const memory = global.performance.memory;
      console.log('[MemoryOptimization] Memory usage:', {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + ' MB',
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + ' MB',
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + ' MB',
      });
    }
  }
}

export default {
  ListOptimization,
  MemoryOptimization,
};
