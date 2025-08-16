# ErrorMessage Component

A reusable error message component with retry functionality and proper error messaging.

## Features

- Customizable error messages
- Optional retry button with callback functionality
- Accessibility support with proper ARIA labels and roles
- Consistent styling with the app's design system
- Proper error color coding and visual hierarchy

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | string | `'Something went wrong'` | The error message to display |
| `onRetry` | function | `undefined` | Callback function for retry button. If not provided, retry button won't be shown |
| `retryText` | string | `'Try Again'` | Text to display on the retry button |
| `style` | ViewStyle | `undefined` | Additional styles to apply to the container |

## Usage

```javascript
import ErrorMessage from '../components/ErrorMessage';

// Basic error message
<ErrorMessage message="Unable to load data" />

// Error message with retry functionality
<ErrorMessage 
  message="Network connection failed"
  onRetry={() => refetchData()}
  retryText="Retry"
/>

// Custom styling
<ErrorMessage 
  message="Failed to load brands"
  onRetry={handleRetry}
  style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
/>
```

## Accessibility

- Uses `accessibilityRole="alert"` to announce errors to screen readers
- Includes descriptive `accessibilityLabel` with error message
- Retry button has proper `accessibilityRole="button"`
- Includes `accessibilityHint` for retry button functionality
- Error text uses `accessibilityRole="text"` for proper reading

## Error Types

The component can handle various error scenarios:

```javascript
// Network errors
<ErrorMessage 
  message="Check your internet connection"
  onRetry={retryNetworkCall}
/>

// Server errors
<ErrorMessage 
  message="Something went wrong, please try again"
  onRetry={retryRequest}
/>

// Not found errors
<ErrorMessage 
  message="Brand not found"
  // No retry for 404 errors
/>

// Timeout errors
<ErrorMessage 
  message="Request timed out, please try again"
  onRetry={retryWithTimeout}
/>
```

## Styling

The component follows the app's design system:
- Uses error color (`colors.interactive.error`) for error text
- Uses brand colors for retry button
- Consistent typography from `constants/typography.js`
- Proper spacing and padding for readability
- Centered layout with minimum height for consistent appearance