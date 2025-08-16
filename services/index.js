/**
 * Services index file
 * Provides centralized exports for all service modules
 */

export { default as apiService } from './apiService';
export { default as brandService } from './brandService';

// Re-export for convenience
export default {
  api: require('./apiService').default,
  brand: require('./brandService').default,
};
