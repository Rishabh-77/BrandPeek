# GradientBackground Component

A reusable gradient background component that provides consistent gradient styling across the BrandPeek application.

## Features

- **Primary Variant**: Radial-like gradient effect with deep blue (#1E3A8A) center fading to near-black (#0F172A) edges
- **Subtle Variant**: Linear gradient for detail screens with opacity control
- **TypeScript Support**: Full TypeScript interfaces and type safety
- **Customizable**: Supports custom styling through the style prop
- **Performance Optimized**: Uses expo-linear-gradient for smooth rendering

## Usage

### Basic Usage

```tsx
import GradientBackground from './components/GradientBackground';

// Primary gradient (default)
<GradientBackground>
  <YourContent />
</GradientBackground>

// Subtle gradient
<GradientBackground variant="subtle">
  <YourContent />
</GradientBackground>
```

### With Custom Styling

```tsx
<GradientBackground variant="primary" style={{ borderRadius: 10 }}>
  <YourContent />
</GradientBackground>
```

## Props

| Prop       | Type                    | Default     | Description                                 |
| ---------- | ----------------------- | ----------- | ------------------------------------------- |
| `variant`  | `'primary' \| 'subtle'` | `'primary'` | The gradient variant to use                 |
| `children` | `React.ReactNode`       | `undefined` | Content to render over the gradient         |
| `style`    | `ViewStyle`             | `undefined` | Additional styles to apply to the container |

## Variants

### Primary

- **Use Case**: Home screen background
- **Effect**: Radial-like gradient with bright blue center
- **Colors**: Deep blue (#1E3A8A) to near-black (#0F172A)
- **Implementation**: Multiple LinearGradients to simulate radial effect

### Subtle

- **Use Case**: Detail screen background
- **Effect**: Linear gradient with opacity
- **Colors**: Blue (#1E40AF) to black with 80% opacity
- **Implementation**: Single LinearGradient with transparency

## Technical Details

The component uses `expo-linear-gradient` to create gradient effects. Since React Native doesn't natively support radial gradients, the primary variant uses multiple overlapping LinearGradients to simulate a radial effect that matches the design specifications.

## Requirements Satisfied

- ✅ Uses expo-linear-gradient with RadialGradient-like effect
- ✅ Matches exact gradient specifications: deep blue (#1E3A8A) center to near-black (#0F172A) edges
- ✅ Supports variant prop for different gradient styles (primary/subtle)
- ✅ Includes proper TypeScript interfaces for type safety
- ✅ Requirements: 1.1, 1.2, 1.3, 8.4
