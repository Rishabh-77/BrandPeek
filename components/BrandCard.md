# BrandCard Component

A professional, interactive card component for displaying brand information with optimized image loading, touch feedback, and accessibility support.

## Features

- **Optimized Image Loading**: Uses Expo Image with loading states and fallback handling
- **Touch Feedback**: Provides visual feedback with opacity changes and haptic feedback
- **Loading Skeleton**: Shows animated skeleton while loading brand data
- **Accessibility**: Full accessibility support with proper labels and touch targets
- **Professional Styling**: Gradient backgrounds and consistent typography
- **Error Handling**: Graceful fallbacks for missing or failed images

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `brand` | `Object` | Yes | Brand data object with id, name, logo, description |
| `onPress` | `Function` | No | Callback function called when card is pressed |
| `testID` | `String` | No | Test identifier for testing purposes |

### Brand Object Structure

```javascript
{
  id: string,           // Unique brand identifier
  name: string,         // Brand name
  logo: string,         // URL to brand logo image
  description: string   // Brand description text
}
```

## Usage

### Basic Usage

```javascript
import { BrandCard } from '../components';

const brand = {
  id: '1',
  name: 'Apple',
  logo: 'https://logo.clearbit.com/apple.com',
  description: 'Think different. Innovation at its finest.'
};

<BrandCard 
  brand={brand} 
  onPress={(brand) => console.log('Pressed:', brand.name)}
/>
```

### Loading State

```javascript
// Show loading skeleton when brand data is not available
<BrandCard brand={null} />
```

### With Custom Test ID

```javascript
<BrandCard 
  brand={brand} 
  onPress={handlePress}
  testID="featured-brand-card"
/>
```

## Styling

The component uses:
- **Gradient Background**: Card overlay gradient from constants/gradients
- **Typography**: Brand name and description styles from constants/typography
- **Colors**: Text and background colors from constants/colors
- **Responsive Design**: Adapts to screen width with proper margins

## Accessibility

- **Screen Reader Support**: Proper accessibility labels and hints
- **Touch Targets**: Minimum 44pt touch target size
- **Keyboard Navigation**: Supports keyboard navigation
- **High Contrast**: Works with system accessibility settings

## Performance

- **Image Optimization**: Lazy loading and caching with Expo Image
- **Smooth Animations**: 200ms transition animations
- **Memory Efficient**: Proper cleanup and optimized re-renders

## Error Handling

- **Image Fallback**: Shows brand initial if logo fails to load
- **Loading States**: Skeleton animation while loading
- **Network Errors**: Graceful handling of network issues

## Testing

The component includes comprehensive test coverage:

```bash
npm test components/__tests__/BrandCard.test.js
```

## Dependencies

- `expo-image`: Optimized image loading
- `expo-linear-gradient`: Gradient backgrounds
- `expo-haptics`: Touch feedback
- `react-native`: Core React Native components