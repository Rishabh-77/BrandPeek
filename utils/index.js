/**
 * Utility modules for performance optimization and app enhancement
 */

export { default as imageCache } from './imageCache';
export { ListOptimization, MemoryOptimization } from './listOptimization';
export { AnimationUtils, AnimationPresets } from './animations';
export {
  default as performanceMonitor,
  withPerformanceMonitoring,
} from './performanceMonitor';

// Re-export commonly used utilities
export const utils = {
  imageCache: require('./imageCache').default,
  listOptimization: require('./listOptimization'),
  animations: require('./animations'),
  performanceMonitor: require('./performanceMonitor').default,
};

export default utils;
