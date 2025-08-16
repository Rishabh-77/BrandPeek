# BrandList Component

A high-performance React Native component for displaying a list of brands with loading states, error handling, and pull-to-refresh functionality.

## Features

- **Performance Optimized**: Uses FlatList with `getItemLayout`, `keyExtractor`, and other performance optimizations
- **Pull-to-Refresh**: Built-in refresh functionality with loading indicators
- **Error Handling**: Comprehensive error states with retry functionality
- **Empty State**: User-friendly empty state with optional retry button
- **Loading State**: Skeleton loading with shimmer effect
- **Accessibility**: Full accessibility support with proper labels and hints
- **Responsive**: Adapts to different screen sizes

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brands` | `Array` | `[]` | Array of brand objects to display |
| `loading` | `boolean` | `false` | Whether the list is in loading state |
| `error` | `string \| null` | `null` | Error message to display |
| `onRefresh` | `function` | `undefined` | Callback for pull-to-refresh and retry actions |
| `onBrandPress` | `function` | `undefined` | Callback when a brand is pressed |
| `testID` | `string` | `'brand-list'` | Test identifier for testing |

## Brand Object Structure

```javascript
{
  id: string,           // Unique identifier
  name: string,         // Brand name
  description: string,  // Brand description
  logo: string,         // URL to brand logo
  // ... other optional properties
}
```

## Usage

### Basic Usage

```javascript
import BrandList from '../components/BrandList';

const MyScreen = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBrandPress = (brand) => {
    navigation.navigate('BrandDetail', { brandId: brand.id });
  };

  const handleRefresh = async () => {
    // Fetch brands logic
  };

  return (
    <BrandList
      brands={brands}
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
      onBrandPress={handleBrandPress}
    />
  );
};
```

### With GradientBackground

```javascript
import BrandList from '../components/BrandList';
import GradientBackground from '../components/GradientBackground';

const HomeScreen = () => {
  return (
    <GradientBackground variant="primary">
      <BrandList
        brands={brands}
        loading={loading}
        error={error}
        onRefresh={handleRefresh}
        onBrandPress={handleBrandPress}
      />
    </GradientBackground>
  );
};
```

## States

### Loading State
- Displays skeleton cards with shimmer effect
- Shows configurable number of skeleton items (default: 6)
- Maintains proper spacing and layout

### Success State
- Displays actual brand data using BrandCard components
- Supports pull-to-refresh if `onRefresh` is provided
- Optimized rendering for large lists

### Empty State
- Shows when no brands are available and not loading
- Displays friendly message and optional retry button
- Includes proper accessibility support

### Error State
- Shows when there's an error and no data to display
- Displays error message and retry button
- Supports custom error messages

## Performance Optimizations

- **FlatList Configuration**: Uses `getItemLayout` for known item heights
- **Key Extraction**: Optimized `keyExtractor` for efficient re-rendering
- **Batch Rendering**: Configured `maxToRenderPerBatch` and `updateCellsBatchingPeriod`
- **Window Size**: Optimized `windowSize` and `initialNumToRender`
- **Clipped Views**: Uses `removeClippedSubviews` for memory efficiency

## Accessibility

- **Screen Reader Support**: Proper accessibility labels and hints
- **Touch Targets**: Adequate touch target sizes
- **Navigation**: Keyboard navigation support
- **Announcements**: State changes are announced to screen readers

## Testing

The component includes comprehensive tests covering:
- Loading state rendering
- Brand data display
- Empty state handling
- Error state handling
- User interactions (press, refresh)
- Accessibility features

Run tests with:
```bash
npm test BrandList.test.js
```

## Styling

The component uses the app's design system:
- **Colors**: From `../constants/colors`
- **Typography**: From `../constants/typography`
- **Gradients**: From `../constants/gradients`

### Customizable Styles
- Empty state card styling
- Error state card styling
- Button gradients and colors
- Spacing and margins

## Dependencies

- `react-native`: Core React Native components
- `expo-linear-gradient`: For gradient backgrounds
- `../components/BrandCard`: Individual brand card component
- `../constants/*`: Design system constants

## Performance Metrics

- **Initial Render**: ~8 items rendered initially
- **Batch Size**: 10 items per batch
- **Update Period**: 50ms batching period
- **Memory**: Efficient with `removeClippedSubviews`

## Best Practices

1. **Data Management**: Always provide proper loading and error states
2. **Refresh Logic**: Implement proper error handling in `onRefresh`
3. **Navigation**: Use `onBrandPress` for navigation to detail screens
4. **Testing**: Include testID for automated testing
5. **Accessibility**: Test with screen readers and keyboard navigation

## Troubleshooting

### Common Issues

1. **Slow Scrolling**: Ensure `getItemLayout` is properly configured
2. **Memory Issues**: Check if `removeClippedSubviews` is enabled
3. **Refresh Not Working**: Verify `onRefresh` returns a Promise
4. **Empty State Not Showing**: Check that `brands` array is empty and `loading` is false

### Debug Tips

- Use `testID` props for debugging specific states
- Check console logs for error messages
- Verify brand object structure matches expected format
- Test on different screen sizes and orientations