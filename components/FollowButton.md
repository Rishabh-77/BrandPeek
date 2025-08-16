# FollowButton Component

A reusable follow button component with interactive feedback, animations, and accessibility support.

## Features

- **Interactive States**: Follow/Following toggle with visual feedback
- **Animations**: Smooth scale animation on press with 200ms duration
- **Accessibility**: Full screen reader support with proper labels and hints
- **Visual Feedback**: Gradient background changes based on follow state
- **Touch Feedback**: Scale animation and opacity changes on press
- **Disabled State**: Proper handling of disabled state with visual indicators

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onPress` | `function` | `undefined` | Callback function called when button is pressed. Receives `isFollowing` boolean as parameter |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `style` | `object` | `undefined` | Custom style object to apply to the button container |
| `testID` | `string` | `'follow-button'` | Test identifier for testing purposes |

## Usage

### Basic Usage

```javascript
import FollowButton from '../components/FollowButton';

const MyScreen = () => {
  const handleFollow = (isFollowing) => {
    console.log(`Brand ${isFollowing ? 'followed' : 'unfollowed'}`);
  };

  return (
    <FollowButton onPress={handleFollow} />
  );
};
```

### Disabled Button

```javascript
<FollowButton disabled={true} />
```

### Custom Styling

```javascript
<FollowButton 
  onPress={handleFollow}
  style={{ marginTop: 20 }}
/>
```

## Visual States

### Default State
- Blue gradient background (deepBlue to darkBlue)
- "Follow" text
- Full opacity and interactivity

### Following State
- Green to blue gradient background
- "Following" text
- Indicates the brand is being followed

### Pressed State
- 0.95 scale animation
- 0.7 opacity
- Provides immediate visual feedback

### Disabled State
- Gray gradient background
- Reduced opacity (0.5)
- No interaction possible
- Muted text color

## Accessibility

The component includes comprehensive accessibility support:

- **Role**: Button role for screen readers
- **Labels**: Dynamic labels based on follow state
- **Hints**: Contextual hints for user actions
- **State**: Proper selected state indication
- **Disabled**: Proper disabled state handling

## Animation Details

- **Scale Animation**: 0.95 scale on press with 100ms duration
- **Gradient Transition**: Smooth color changes between states
- **Touch Feedback**: Immediate visual response to user interaction

## Dependencies

- `expo-linear-gradient`: For gradient backgrounds
- `react-native`: Core React Native components
- `../constants/colors`: App color palette
- `../constants/typography`: Typography constants

## Testing

The component includes comprehensive tests covering:
- Rendering with default props
- Press event handling
- State toggling
- Disabled state behavior
- Accessibility properties
- Custom props handling

Run tests with:
```bash
npm test -- FollowButton.test.js
```

## Design System Integration

The component follows the app's design system:
- Uses brand colors from `constants/colors`
- Follows typography standards from `constants/typography`
- Implements consistent spacing and sizing
- Matches the overall app aesthetic with gradient backgrounds

## Requirements Fulfilled

- ✅ **5.1**: Follow button displays on Brand Detail Screen
- ✅ **5.2**: Visual feedback on button press with animations and state changes
- ✅ **5.3**: No actual follow logic implementation required - component provides UI feedback only