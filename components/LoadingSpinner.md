# LoadingSpinner Component

A reusable loading spinner component with smooth animations and brand colors.

## Features

- Smooth rotation animation using native driver for optimal performance
- Customizable size and color
- Accessibility support with proper ARIA labels
- Consistent styling with the app's design system
- Automatic cleanup of animations on unmount

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | number | `40` | The diameter of the spinner in pixels |
| `color` | string | `colors.primary.deepBlue` | The color of the spinner |
| `style` | ViewStyle | `undefined` | Additional styles to apply to the container |

## Usage

```javascript
import LoadingSpinner from '../components/LoadingSpinner';
import { colors } from '../constants/colors';

// Basic usage
<LoadingSpinner />

// Custom size and color
<LoadingSpinner 
  size={60} 
  color={colors.interactive.success} 
/>

// With custom styling
<LoadingSpinner 
  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
/>
```

## Accessibility

- Uses `accessibilityRole="progressbar"` to indicate loading state
- Includes `accessibilityLabel="Loading"` for screen readers
- Follows React Native accessibility best practices

## Animation Details

- Uses `Animated.loop` with `Animated.timing` for smooth rotation
- 1000ms duration for complete rotation
- Uses native driver for optimal performance
- Automatically starts animation on mount and stops on unmount

## Styling

The component follows the app's design system:
- Uses brand colors from `constants/colors.js`
- Consistent spacing and sizing
- Semi-transparent border with solid top border for spinner effect