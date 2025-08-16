# API Services Documentation

## Overview

The BrandPeek app uses a layered service architecture to handle API communication with the MockAPI backend. The services provide a clean abstraction layer between the React Native components and the external API, with comprehensive error handling, logging, and retry logic.

## Architecture

```
React Native Components
         ↓
    BrandService
         ↓
     ApiService
         ↓
    MockAPI Backend
```

## Services

### ApiService (`services/apiService.js`)

The base service that provides common HTTP functionality for all API calls.

#### Features

- **Request/Response Logging**: Detailed logging for development debugging
- **Error Handling**: Comprehensive error classification and formatting
- **Timeout Management**: Configurable request timeouts with automatic cancellation
- **Retry Logic**: Automatic retry for network failures and server errors with exponential backoff
- **HTTP Methods**: Support for GET, POST, PUT, DELETE operations

#### Key Methods

```javascript
// Make any HTTP request with full error handling and retry logic
await apiService.makeRequest(url, options);

// Convenience methods
await apiService.get(url, options);
await apiService.post(url, data, options);
await apiService.put(url, data, options);
await apiService.delete(url, options);
```

#### Error Handling

The service automatically handles and formats different types of errors:

- **Network Errors**: "Check your internet connection"
- **Timeout Errors**: "Request timed out, please try again"
- **Server Errors (5xx)**: "Something went wrong, please try again"
- **Not Found (404)**: "Brand not found"
- **Client Errors (4xx)**: Specific error messages based on status code

#### Retry Configuration

```javascript
RETRY_CONFIG: {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  backoffMultiplier: 2, // Exponential backoff
}
```

### BrandService (`services/brandService.js`)

Specialized service for brand-related API operations, built on top of ApiService.

#### Features

- **Data Validation**: Ensures all brand objects have required fields
- **Search Functionality**: Client-side search and filtering
- **Category Management**: Extract and manage brand categories
- **Comprehensive Error Handling**: Brand-specific error messages and handling

#### Key Methods

```javascript
// Get all brands from the API
const brands = await brandService.getBrands();

// Get a specific brand by ID
const brand = await brandService.getBrandById(brandId);

// Search brands by name or description (client-side)
const results = await brandService.searchBrands(searchTerm);

// Get brands by category (client-side filtering)
const categoryBrands = await brandService.getBrandsByCategory(category);

// Get all available categories
const categories = await brandService.getCategories();

// Validate brand data structure
const isValid = brandService.validateBrandData(brand);
```

#### Data Structure

All brand objects are normalized to this structure:

```javascript
{
  id: string,              // Unique identifier
  name: string,            // Brand name
  logo: string,            // URL to brand logo
  description: string,     // One-liner description
  fullDescription: string, // Detailed description
  website: string,         // Brand website URL
  category: string,        // Brand category
  founded: string,         // Year founded
  headquarters: string     // Location
}
```

## Usage Examples

### Basic Usage

```javascript
import { brandService } from '../services';

// In a React component
const [brands, setBrands] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchBrands = async () => {
    try {
      setLoading(true);
      const brandsData = await brandService.getBrands();
      setBrands(brandsData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch brands:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchBrands();
}, []);
```

### Error Handling

```javascript
try {
  const brand = await brandService.getBrandById(brandId);
  // Handle success
} catch (error) {
  // Error object structure:
  // {
  //   message: "User-friendly error message",
  //   code: "ERROR_CODE",
  //   statusCode: 404, // HTTP status if applicable
  //   originalError: Error, // Original error object
  //   timestamp: "2024-01-01T00:00:00.000Z"
  // }

  switch (error.code) {
    case 'BRAND_NOT_FOUND':
      // Handle brand not found
      break;
    case 'NETWORK_ERROR':
      // Handle network issues
      break;
    case 'TIMEOUT_ERROR':
      // Handle timeout
      break;
    default:
      // Handle generic errors
      break;
  }
}
```

### Search and Filtering

```javascript
// Search brands
const searchResults = await brandService.searchBrands('Apple');

// Get brands by category
const techBrands = await brandService.getBrandsByCategory('Technology');

// Get all categories
const categories = await brandService.getCategories();
```

## Configuration

### API Configuration (`constants/api.js`)

```javascript
export const API_CONFIG = {
  BASE_URL: 'https://your-project-id.mockapi.io/api/v1',
  REQUEST_CONFIG: {
    timeout: 10000, // 10 seconds
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
  RETRY_CONFIG: {
    maxRetries: 3,
    retryDelay: 1000,
    backoffMultiplier: 2,
  },
};
```

## Development and Debugging

### Logging

All API requests and responses are logged in development mode (`__DEV__ === true`):

```
[API REQUEST] 2024-01-01T00:00:00.000Z GET https://api.example.com/brands
[API RESPONSE] 2024-01-01T00:00:00.000Z GET https://api.example.com/brands - Status: 200
[API ERROR] 2024-01-01T00:00:00.000Z GET https://api.example.com/brands - Error: Network request failed
```

### Testing

Run the service validation script to ensure everything is properly configured:

```bash
npm run validate-services
```

Test the API endpoints:

```bash
npm run test-api
```

## Best Practices

### Component Integration

1. **Use Loading States**: Always show loading indicators during API calls
2. **Handle Errors Gracefully**: Display user-friendly error messages
3. **Implement Retry Logic**: Allow users to retry failed requests
4. **Cache Data**: Consider caching frequently accessed data

### Error Handling

1. **Specific Error Messages**: Use the error codes to show specific messages
2. **Fallback Content**: Provide fallback content when data fails to load
3. **User Actions**: Offer clear actions users can take (retry, refresh, etc.)

### Performance

1. **Avoid Unnecessary Calls**: Cache data when appropriate
2. **Use Loading States**: Prevent multiple simultaneous requests
3. **Handle Race Conditions**: Cancel outdated requests when needed

## Troubleshooting

### Common Issues

1. **Network Errors**: Check internet connection and API URL
2. **CORS Issues**: Ensure MockAPI is properly configured
3. **Timeout Errors**: Check if the API is responding slowly
4. **404 Errors**: Verify the API endpoints and data exist

### Debug Steps

1. Check the console logs for detailed error information
2. Verify the API configuration in `constants/api.js`
3. Test the API endpoints directly using the test scripts
4. Ensure MockAPI has the required data structure

## Future Enhancements

Potential improvements for production use:

1. **Caching Layer**: Implement Redux or Context for state management
2. **Offline Support**: Cache data locally for offline access
3. **Real-time Updates**: WebSocket support for live data
4. **Pagination**: Handle large datasets with pagination
5. **Authentication**: Add JWT token handling for secured APIs
6. **Request Cancellation**: Cancel in-flight requests on component unmount
