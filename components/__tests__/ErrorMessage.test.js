import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders correctly with default message', () => {
    const { getByText } = render(<ErrorMessage />);
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('renders custom error message', () => {
    const customMessage = 'Network connection failed';
    const { getByText } = render(<ErrorMessage message={customMessage} />);
    expect(getByText(customMessage)).toBeTruthy();
  });

  it('renders retry button when onRetry is provided', () => {
    const mockRetry = jest.fn();
    const { getByText } = render(<ErrorMessage onRetry={mockRetry} />);
    expect(getByText('Try Again')).toBeTruthy();
  });

  it('calls onRetry when retry button is pressed', () => {
    const mockRetry = jest.fn();
    const { getByText } = render(<ErrorMessage onRetry={mockRetry} />);

    fireEvent.press(getByText('Try Again'));
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it('renders custom retry text', () => {
    const mockRetry = jest.fn();
    const { getByText } = render(
      <ErrorMessage onRetry={mockRetry} retryText="Reload" />
    );
    expect(getByText('Reload')).toBeTruthy();
  });

  it('does not render retry button when onRetry is not provided', () => {
    const { queryByText } = render(<ErrorMessage />);
    expect(queryByText('Try Again')).toBeNull();
  });

  it('has proper accessibility attributes', () => {
    const { getByRole } = render(<ErrorMessage />);
    expect(getByRole('alert')).toBeTruthy();
  });

  it('has proper accessibility attributes for retry button', () => {
    const mockRetry = jest.fn();
    const { getByRole } = render(<ErrorMessage onRetry={mockRetry} />);
    expect(getByRole('button')).toBeTruthy();
  });
});
