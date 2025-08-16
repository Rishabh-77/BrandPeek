import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import BrandList from '../BrandList';

// Mock the BrandCard component
jest.mock('../BrandCard', () => {
  const { View, Text, Pressable } = require('react-native');
  return ({ brand, onPress, testID }) => (
    <Pressable testID={testID} onPress={() => onPress && onPress(brand)}>
      <View>
        <Text testID={`${testID}-name`}>{brand?.name || 'Loading...'}</Text>
        <Text testID={`${testID}-description`}>{brand?.description || ''}</Text>
      </View>
    </Pressable>
  );
});

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children, ...props }) => {
    const { View } = require('react-native');
    return <View {...props}>{children}</View>;
  },
}));

const mockBrands = [
  {
    id: '1',
    name: 'Apple',
    description: 'Think Different',
    logo: 'https://example.com/apple-logo.png',
  },
  {
    id: '2',
    name: 'Google',
    description: "Don't be evil",
    logo: 'https://example.com/google-logo.png',
  },
];

describe('BrandList', () => {
  it('renders loading state correctly', () => {
    const { getByTestId } = render(
      <BrandList loading={true} testID="test-brand-list" />
    );

    expect(getByTestId('test-brand-list')).toBeTruthy();
    // Should render skeleton items
    expect(getByTestId('test-brand-list-item-0-name')).toBeTruthy();
  });

  it('renders brands correctly', () => {
    const { getByTestId } = render(
      <BrandList brands={mockBrands} testID="test-brand-list" />
    );

    expect(getByTestId('test-brand-list')).toBeTruthy();
    expect(getByTestId('test-brand-list-item-0-name')).toHaveTextContent(
      'Apple'
    );
    expect(getByTestId('test-brand-list-item-1-name')).toHaveTextContent(
      'Google'
    );
  });

  it('renders empty state when no brands', () => {
    const { getByText } = render(
      <BrandList brands={[]} testID="test-brand-list" />
    );

    expect(getByText('No Brands Found')).toBeTruthy();
    expect(
      getByText("We couldn't find any brands to display right now.")
    ).toBeTruthy();
  });

  it('renders error state correctly', () => {
    const mockOnRefresh = jest.fn();
    const { getByText, getByTestId } = render(
      <BrandList
        brands={[]}
        error="Network error"
        onRefresh={mockOnRefresh}
        testID="test-brand-list"
      />
    );

    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText('Network error')).toBeTruthy();
    expect(getByTestId('test-brand-list-error-retry')).toBeTruthy();
  });

  it('calls onBrandPress when brand is pressed', () => {
    const mockOnBrandPress = jest.fn();
    const { getByTestId } = render(
      <BrandList
        brands={mockBrands}
        onBrandPress={mockOnBrandPress}
        testID="test-brand-list"
      />
    );

    fireEvent.press(getByTestId('test-brand-list-item-0'));
    expect(mockOnBrandPress).toHaveBeenCalledWith(mockBrands[0]);
  });

  it('handles brand press functionality correctly', () => {
    const mockOnBrandPress = jest.fn();
    const { getByTestId } = render(
      <BrandList
        brands={mockBrands}
        onBrandPress={mockOnBrandPress}
        testID="test-brand-list"
      />
    );

    // Test pressing different brands
    fireEvent.press(getByTestId('test-brand-list-item-0'));
    expect(mockOnBrandPress).toHaveBeenCalledWith(mockBrands[0]);

    fireEvent.press(getByTestId('test-brand-list-item-1'));
    expect(mockOnBrandPress).toHaveBeenCalledWith(mockBrands[1]);

    expect(mockOnBrandPress).toHaveBeenCalledTimes(2);
  });

  it('calls onRefresh when retry button is pressed in error state', () => {
    const mockOnRefresh = jest.fn();
    const { getByTestId } = render(
      <BrandList
        brands={[]}
        error="Network error"
        onRefresh={mockOnRefresh}
        testID="test-brand-list"
      />
    );

    fireEvent.press(getByTestId('test-brand-list-error-retry'));
    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('calls onRefresh when try again button is pressed in empty state', () => {
    const mockOnRefresh = jest.fn();
    const { getByTestId } = render(
      <BrandList
        brands={[]}
        onRefresh={mockOnRefresh}
        testID="test-brand-list"
      />
    );

    fireEvent.press(getByTestId('test-brand-list-empty-refresh'));
    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('handles pull-to-refresh correctly', async () => {
    const mockOnRefresh = jest.fn().mockResolvedValue();
    const { getByTestId } = render(
      <BrandList
        brands={mockBrands}
        onRefresh={mockOnRefresh}
        testID="test-brand-list"
      />
    );

    const refreshControl = getByTestId('test-brand-list-refresh-control');
    fireEvent(refreshControl, 'refresh');

    await waitFor(() => {
      expect(mockOnRefresh).toHaveBeenCalled();
    });
  });

  it('handles refresh functionality with error recovery', async () => {
    const mockOnRefresh = jest.fn().mockResolvedValue();
    const { getByTestId, rerender } = render(
      <BrandList
        brands={[]}
        error="Network error"
        onRefresh={mockOnRefresh}
        testID="test-brand-list"
      />
    );

    // Test retry from error state
    fireEvent.press(getByTestId('test-brand-list-error-retry'));
    expect(mockOnRefresh).toHaveBeenCalled();

    // Test refresh from empty state
    rerender(
      <BrandList
        brands={[]}
        onRefresh={mockOnRefresh}
        testID="test-brand-list"
      />
    );

    fireEvent.press(getByTestId('test-brand-list-empty-refresh'));
    expect(mockOnRefresh).toHaveBeenCalledTimes(2);
  });

  it('renders without onRefresh prop', () => {
    const { getByTestId } = render(
      <BrandList brands={mockBrands} testID="test-brand-list" />
    );

    expect(getByTestId('test-brand-list')).toBeTruthy();
    // Should not have refresh control
    expect(() => getByTestId('test-brand-list-refresh-control')).toThrow();
  });

  it('has proper accessibility labels', () => {
    const { getByTestId } = render(
      <BrandList brands={mockBrands} testID="test-brand-list" />
    );

    const list = getByTestId('test-brand-list');
    expect(list.props.accessibilityLabel).toBe('List of brands');
    expect(list.props.accessibilityHint).toBe(
      'Scroll to browse brands, pull down to refresh'
    );
  });
});
