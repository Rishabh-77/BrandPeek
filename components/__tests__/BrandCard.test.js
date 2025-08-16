import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BrandCard from '../BrandCard';

// Mock expo modules
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
  },
}));

jest.mock('expo-image', () => ({
  Image: 'Image',
}));

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient',
}));

const mockBrand = {
  id: '1',
  name: 'Test Brand',
  logo: 'https://example.com/logo.png',
  description: 'This is a test brand description',
};

describe('BrandCard', () => {
  it('renders correctly with brand data', () => {
    const { getByText, getByTestId } = render(
      <BrandCard brand={mockBrand} testID="test-brand-card" />
    );

    expect(getByText('Test Brand')).toBeTruthy();
    expect(getByText('This is a test brand description')).toBeTruthy();
    expect(getByTestId('test-brand-card')).toBeTruthy();
  });

  it('renders loading skeleton when no brand data', () => {
    const { queryByText } = render(<BrandCard brand={null} />);

    expect(queryByText('Test Brand')).toBeFalsy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <BrandCard
        brand={mockBrand}
        onPress={mockOnPress}
        testID="test-brand-card"
      />
    );

    fireEvent.press(getByTestId('test-brand-card'));
    expect(mockOnPress).toHaveBeenCalledWith(mockBrand);
  });

  it('has proper accessibility labels', () => {
    const { getByLabelText } = render(<BrandCard brand={mockBrand} />);

    expect(getByLabelText('View details for Test Brand')).toBeTruthy();
  });
});
