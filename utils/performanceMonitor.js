/**
 * Performance monitoring utilities for development and optimization
 */
export class PerformanceMonitor {
  constructor() {
    this.timers = new Map();
    this.metrics = new Map();
  }

  /**
   * Start timing an operation
   * @param {string} label - Label for the operation
   */
  startTimer(label) {
    if (__DEV__) {
      this.timers.set(label, Date.now());
    }
  }

  /**
   * End timing an operation and log the result
   * @param {string} label - Label for the operation
   * @returns {number} Duration in milliseconds
   */
  endTimer(label) {
    if (__DEV__ && this.timers.has(label)) {
      const startTime = this.timers.get(label);
      const duration = Date.now() - startTime;
      this.timers.delete(label);

      console.log(`[Performance] ${label}: ${duration}ms`);

      // Store metric for analysis
      if (!this.metrics.has(label)) {
        this.metrics.set(label, []);
      }
      this.metrics.get(label).push(duration);

      return duration;
    }
    return 0;
  }

  /**
   * Measure the execution time of a function
   * @param {string} label - Label for the measurement
   * @param {function} fn - Function to measure
   * @returns {any} Result of the function
   */
  async measure(label, fn) {
    this.startTimer(label);
    try {
      const result = await fn();
      this.endTimer(label);
      return result;
    } catch (error) {
      this.endTimer(label);
      throw error;
    }
  }

  /**
   * Get performance statistics for a label
   * @param {string} label - Label to get stats for
   * @returns {object} Performance statistics
   */
  getStats(label) {
    if (!__DEV__ || !this.metrics.has(label)) {
      return null;
    }

    const measurements = this.metrics.get(label);
    const sum = measurements.reduce((a, b) => a + b, 0);
    const avg = sum / measurements.length;
    const min = Math.min(...measurements);
    const max = Math.max(...measurements);

    return {
      count: measurements.length,
      average: Math.round(avg),
      min,
      max,
      total: sum,
    };
  }

  /**
   * Log all performance statistics
   */
  logAllStats() {
    if (__DEV__) {
      console.log('[Performance] All Statistics:');
      for (const [label, _] of this.metrics) {
        const stats = this.getStats(label);
        console.log(`  ${label}:`, stats);
      }
    }
  }

  /**
   * Clear all metrics
   */
  clear() {
    this.timers.clear();
    this.metrics.clear();
  }

  /**
   * Monitor React component render performance
   * @param {string} componentName - Name of the component
   * @returns {function} Cleanup function
   */
  monitorComponent(componentName) {
    if (!__DEV__) {
      return () => {};
    }

    const renderStart = Date.now();

    return () => {
      const renderTime = Date.now() - renderStart;
      if (renderTime > 16) {
        // Log slow renders (>16ms)
        console.warn(
          `[Performance] Slow render: ${componentName} took ${renderTime}ms`
        );
      }
    };
  }

  /**
   * Monitor memory usage (if available)
   */
  logMemoryUsage() {
    if (__DEV__ && global.performance && global.performance.memory) {
      const memory = global.performance.memory;
      console.log('[Performance] Memory Usage:', {
        used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`,
        total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)}MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`,
        usage: `${Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)}%`,
      });
    }
  }

  /**
   * Monitor FlatList performance
   * @param {string} listName - Name of the list
   * @returns {object} Performance monitoring functions
   */
  monitorFlatList(listName) {
    if (!__DEV__) {
      return {
        onScrollBeginDrag: () => {},
        onScrollEndDrag: () => {},
        onMomentumScrollBegin: () => {},
        onMomentumScrollEnd: () => {},
      };
    }

    let scrollStartTime = 0;
    let momentumStartTime = 0;

    return {
      onScrollBeginDrag: () => {
        scrollStartTime = Date.now();
      },
      onScrollEndDrag: () => {
        if (scrollStartTime > 0) {
          const scrollDuration = Date.now() - scrollStartTime;
          console.log(
            `[Performance] ${listName} scroll duration: ${scrollDuration}ms`
          );
        }
      },
      onMomentumScrollBegin: () => {
        momentumStartTime = Date.now();
      },
      onMomentumScrollEnd: () => {
        if (momentumStartTime > 0) {
          const momentumDuration = Date.now() - momentumStartTime;
          console.log(
            `[Performance] ${listName} momentum duration: ${momentumDuration}ms`
          );
        }
      },
    };
  }
}

// Export singleton instance
export default new PerformanceMonitor();

/**
 * Higher-order component for monitoring component performance
 * @param {React.Component} WrappedComponent - Component to monitor
 * @param {string} componentName - Name for monitoring
 * @returns {React.Component} Monitored component
 */
export function withPerformanceMonitoring(WrappedComponent, componentName) {
  if (!__DEV__) {
    return WrappedComponent;
  }

  return function MonitoredComponent(props) {
    const cleanup = performanceMonitor.monitorComponent(componentName);

    React.useEffect(() => {
      return cleanup;
    }, []);

    return React.createElement(WrappedComponent, props);
  };
}
