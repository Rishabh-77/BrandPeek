import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FollowButton from '../FollowButton';

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children, ...props }) => {
    const { View } = require('react-native');
    return <View {...props}>{children}</View>;
  },
}));

describe('FollowButton', () => {
  it('renders correctly with default props', () => {
    const { getByTestId, getByText } = render(<FollowButton />);

    expect(getByTestId('follow-button')).toBeTruthy();
    expect(getByText('Follow')).toBeTruthy();
  });

  it('calls onPress when button is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(<FollowButton onPress={mockOnPress} />);

    fireEvent.press(getByTestId('follow-button'));

    expect(mockOnPress).toHaveBeenCalledWith(true);
  });

  it('toggles between Follow and Following states', async () => {
    const { getByTestId, getByText, queryByText } = render(<FollowButton />);

    // Initially shows "Follow"
    expect(getByText('Follow')).toBeTruthy();
    expect(queryByText('Following')).toBeFalsy();

    // Press the button
    fireEvent.press(getByTestId('follow-button'));

    // Should now show "Following"
    await waitFor(() => {
      expect(getByText('Following')).toBeTruthy();
      expect(queryByText('Follow')).toBeFalsy();
    });

    // Press again to toggle back
    fireEvent.press(getByTestId('follow-button'));

    // Should show "Follow" again
    await waitFor(() => {
      expect(getByText('Follow')).toBeTruthy();
      expect(queryByText('Following')).toBeFalsy();
    });
  });

  it('does not respond to press when disabled', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <FollowButton onPress={mockOnPress} disabled={true} />
    );

    fireEvent.press(getByTestId('follow-button'));

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('has proper accessibility properties', () => {
    const { getByTestId } = render(<FollowButton />);
    const button = getByTestId('follow-button');

    expect(button.props.accessibilityRole).toBe('button');
    expect(button.props.accessibilityLabel).toBe('Follow this brand');
    expect(button.props.accessibilityHint).toBe('Tap to follow this brand');
  });

  it('updates accessibility properties when following', async () => {
    const { getByTestId } = render(<FollowButton />);
    const button = getByTestId('follow-button');

    // Press to follow
    fireEvent.press(button);

    await waitFor(() => {
      expect(button.props.accessibilityLabel).toBe('Following this brand');
      expect(button.props.accessibilityHint).toBe('Tap to unfollow this brand');
      expect(button.props.accessibilityState.selected).toBe(true);
    });
  });

  it('handles press in and press out events', () => {
    const { getByTestId } = render(<FollowButton />);
    const button = getByTestId('follow-button');

    // Should not throw errors
    fireEvent(button, 'pressIn');
    fireEvent(button, 'pressOut');
  });

  it('applies custom style prop', () => {
    const customStyle = { marginTop: 20 };
    const { getByTestId } = render(<FollowButton style={customStyle} />);

    // The component should render without errors with custom style
    expect(getByTestId('follow-button')).toBeTruthy();
  });

  it('uses custom testID when provided', () => {
    const customTestID = 'custom-follow-button';
    const { getByTestId } = render(<FollowButton testID={customTestID} />);

    expect(getByTestId(customTestID)).toBeTruthy();
  });
});
