// API configuration constants for MockAPI endpoints
export const API_CONFIG = {
  // Base URL for MockAPI - Replace with your actual MockAPI project URL
  // Get your URL from https://mockapi.io after creating your project
  BASE_URL: 'https://68a08eb56e38a02c58190aca.mockapi.io/api/v1',

  // API endpoints
  ENDPOINTS: {
    BRANDS: '/brands',
    BRAND_BY_ID: id => `/brands/${id}`,
  },

  // Request configuration
  REQUEST_CONFIG: {
    timeout: 10000, // 10 seconds
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },

  // Error messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Check your internet connection',
    SERVER_ERROR: 'Something went wrong, please try again',
    NOT_FOUND: 'Brand not found',
    TIMEOUT: 'Request timed out, please try again',
    GENERIC: 'An unexpected error occurred',
  },

  // HTTP status codes
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  },

  // Retry configuration
  RETRY_CONFIG: {
    maxRetries: 3,
    retryDelay: 1000, // 1 second
    backoffMultiplier: 2,
  },
};

// Full API URLs for easy access
export const API_URLS = {
  BRANDS: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BRANDS}`,
  BRAND_BY_ID: id =>
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BRAND_BY_ID(id)}`,
};

export default API_CONFIG;
