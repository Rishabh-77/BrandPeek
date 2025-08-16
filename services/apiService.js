import { API_CONFIG } from '../constants/api';

/**
 * Base API service with fetch configuration and error handling
 * Provides common functionality for all API calls including:
 * - Request/response logging
 * - Error handling and classification
 * - Timeout management
 * - Retry logic
 */
class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.defaultConfig = API_CONFIG.REQUEST_CONFIG;
    this.retryConfig = API_CONFIG.RETRY_CONFIG;
  }

  /**
   * Log API requests and responses for development debugging
   * @param {string} method - HTTP method
   * @param {string} url - Request URL
   * @param {Object} data - Request/response data
   * @param {string} type - 'request' or 'response' or 'error'
   */
  log(method, url, data, type = 'info') {
    if (__DEV__) {
      const timestamp = new Date().toISOString();
      const logPrefix = `[API ${type.toUpperCase()}] ${timestamp}`;

      switch (type) {
        case 'request':
          console.log(
            `${logPrefix} ${method} ${url}`,
            data ? { body: data } : ''
          );
          break;
        case 'response':
          console.log(
            `${logPrefix} ${method} ${url} - Status: ${data.status}`,
            {
              data: data.data,
              headers: data.headers,
            }
          );
          break;
        case 'error':
          console.error(`${logPrefix} ${method} ${url} - Error:`, data);
          break;
        default:
          console.log(`${logPrefix} ${method} ${url}`, data);
      }
    }
  }

  /**
   * Create a timeout promise that rejects after specified milliseconds
   * @param {number} ms - Timeout in milliseconds
   * @returns {Promise} Promise that rejects with timeout error
   */
  createTimeoutPromise(ms) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(API_CONFIG.ERROR_MESSAGES.TIMEOUT));
      }, ms);
    });
  }

  /**
   * Classify and format API errors based on error type and status code
   * @param {Error|Response} error - Error object or failed response
   * @param {string} url - Request URL for logging
   * @returns {Object} Formatted error object
   */
  handleError(error, url) {
    let errorMessage = API_CONFIG.ERROR_MESSAGES.GENERIC;
    let errorCode = 'UNKNOWN_ERROR';
    let statusCode = null;

    // Network or timeout errors
    if (error.message === API_CONFIG.ERROR_MESSAGES.TIMEOUT) {
      errorMessage = API_CONFIG.ERROR_MESSAGES.TIMEOUT;
      errorCode = 'TIMEOUT_ERROR';
    } else if (
      error.name === 'TypeError' ||
      error.message.includes('Network request failed')
    ) {
      errorMessage = API_CONFIG.ERROR_MESSAGES.NETWORK_ERROR;
      errorCode = 'NETWORK_ERROR';
    } else if (error.status) {
      // HTTP status code errors
      statusCode = error.status;

      switch (error.status) {
        case API_CONFIG.STATUS_CODES.NOT_FOUND:
          errorMessage = API_CONFIG.ERROR_MESSAGES.NOT_FOUND;
          errorCode = 'NOT_FOUND';
          break;
        case API_CONFIG.STATUS_CODES.BAD_REQUEST:
          errorMessage = 'Invalid request';
          errorCode = 'BAD_REQUEST';
          break;
        case API_CONFIG.STATUS_CODES.UNAUTHORIZED:
          errorMessage = 'Unauthorized access';
          errorCode = 'UNAUTHORIZED';
          break;
        case API_CONFIG.STATUS_CODES.FORBIDDEN:
          errorMessage = 'Access forbidden';
          errorCode = 'FORBIDDEN';
          break;
        case API_CONFIG.STATUS_CODES.INTERNAL_SERVER_ERROR:
        case API_CONFIG.STATUS_CODES.SERVICE_UNAVAILABLE:
          errorMessage = API_CONFIG.ERROR_MESSAGES.SERVER_ERROR;
          errorCode = 'SERVER_ERROR';
          break;
        default:
          if (error.status >= 500) {
            errorMessage = API_CONFIG.ERROR_MESSAGES.SERVER_ERROR;
            errorCode = 'SERVER_ERROR';
          } else if (error.status >= 400) {
            errorMessage = 'Client error occurred';
            errorCode = 'CLIENT_ERROR';
          }
      }
    }

    const formattedError = {
      message: errorMessage,
      code: errorCode,
      statusCode,
      originalError: error,
      url,
      timestamp: new Date().toISOString(),
    };

    this.log('ERROR', url, formattedError, 'error');
    return formattedError;
  }

  /**
   * Sleep for specified milliseconds (used for retry delays)
   * @param {number} ms - Milliseconds to sleep
   * @returns {Promise} Promise that resolves after delay
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Make HTTP request with retry logic, timeout, and error handling
   * @param {string} url - Request URL
   * @param {Object} options - Fetch options
   * @param {number} retryCount - Current retry attempt (internal use)
   * @returns {Promise} Promise resolving to response data
   */
  async makeRequest(url, options = {}, retryCount = 0) {
    const method = options.method || 'GET';
    const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;

    // Merge default configuration with provided options
    const requestOptions = {
      ...this.defaultConfig,
      ...options,
      headers: {
        ...this.defaultConfig.headers,
        ...options.headers,
      },
    };

    // Log the request
    this.log(method, fullUrl, options.body, 'request');

    try {
      // Create fetch promise with timeout
      const fetchPromise = fetch(fullUrl, requestOptions);
      const timeoutPromise = this.createTimeoutPromise(
        this.defaultConfig.timeout
      );

      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);

      // Check if response is ok
      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}`);
        error.status = response.status;
        error.statusText = response.statusText;
        throw error;
      }

      // Parse JSON response
      const data = await response.json();

      // Log successful response
      this.log(
        method,
        fullUrl,
        {
          status: response.status,
          data,
          headers: Object.fromEntries(response.headers.entries()),
        },
        'response'
      );

      return data;
    } catch (error) {
      // Handle retry logic for network errors and server errors
      const shouldRetry =
        retryCount < this.retryConfig.maxRetries &&
        (error.message === API_CONFIG.ERROR_MESSAGES.TIMEOUT ||
          error.name === 'TypeError' ||
          error.message.includes('Network request failed') ||
          (error.status && error.status >= 500));

      if (shouldRetry) {
        const delay =
          this.retryConfig.retryDelay *
          Math.pow(this.retryConfig.backoffMultiplier, retryCount);

        if (__DEV__) {
          console.log(
            `[API RETRY] Attempt ${retryCount + 1}/${this.retryConfig.maxRetries} for ${fullUrl} in ${delay}ms`
          );
        }

        await this.sleep(delay);
        return this.makeRequest(url, options, retryCount + 1);
      }

      // Format and throw the error
      throw this.handleError(error, fullUrl);
    }
  }

  /**
   * Make GET request
   * @param {string} url - Request URL
   * @param {Object} options - Additional fetch options
   * @returns {Promise} Promise resolving to response data
   */
  async get(url, options = {}) {
    return this.makeRequest(url, { ...options, method: 'GET' });
  }

  /**
   * Make POST request
   * @param {string} url - Request URL
   * @param {Object} data - Request body data
   * @param {Object} options - Additional fetch options
   * @returns {Promise} Promise resolving to response data
   */
  async post(url, data, options = {}) {
    return this.makeRequest(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Make PUT request
   * @param {string} url - Request URL
   * @param {Object} data - Request body data
   * @param {Object} options - Additional fetch options
   * @returns {Promise} Promise resolving to response data
   */
  async put(url, data, options = {}) {
    return this.makeRequest(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * Make DELETE request
   * @param {string} url - Request URL
   * @param {Object} options - Additional fetch options
   * @returns {Promise} Promise resolving to response data
   */
  async delete(url, options = {}) {
    return this.makeRequest(url, { ...options, method: 'DELETE' });
  }
}

// Export singleton instance
export default new ApiService();
