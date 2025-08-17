# FloatingHeader Component

A translucent floating header component that overlays content with blur effect, similar to iOS navigation headers.

## Features

- Translucent background with blur effect
- Safe area handling for notched devices
- Customizable back button behavior
- Support for custom right components
- Automatic router integration
- Customizable colors and blur intensity

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | Header title text |
| `showBackButton` | `boolean` | `true` | Whether to show the back button |
| `onBackPress` | `() => void` | `undefined` | Custom back button handler (defaults to router.back()) |
| `rightComponent` | `React.ReactNode` | `undefined` | Custom component to display on the right side |
| `backgroundColor` | `string` | `'rgba(255, 255, 255, 0.9)'` | Background color overlay |
| `textColor` | `string` | `'#000'` | Text and icon color |
| `blurIntensity` | `number` | `80` | Blur effect intensity (0-100) |

## Usage

### Basic Usage
```tsx
import FloatingHeader from '@/components/FloatingHeader';

<FloatingHeader title="Brand Details" />
```

### With Custom Right Component
```tsx
import { Ionicons } from '@expo/vector-icons';

<FloatingHeader
  title="Brand Profile"
  rightComponent={
    <Ionicons name="heart-outline" size={24} color="#000" />
  }
/>
```

### Dark Theme
```tsx
<FloatingHeader
  title="Brand Details"
  backgroundColor="rgba(0, 0, 0, 0.8)"
  textColor="#fff"
  blurIntensity={60}
/>
```

## Implementation Notes

- Position your content with top padding or margin to account for the header height
- The header automatically handles safe area insets
- Uses expo-blur for the translucent effect
- Integrates with expo-router for navigation

## Dependencies

- expo-blur
- @expo/vector-icons
- react-native-safe-area-context
- expo-router