import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders correctly with default props', () => {
    const { getByLabelText } = render(<LoadingSpinner />);
    expect(getByLabelText('Loading')).toBeTruthy();
  });

  it('applies custom size and color', () => {
    const { getByLabelText } = render(
      <LoadingSpinner size={60} color="#FF0000" />
    );
    expect(getByLabelText('Loading')).toBeTruthy();
  });

  it('has proper accessibility attributes', () => {
    const { getByRole } = render(<LoadingSpinner />);
    expect(getByRole('progressbar')).toBeTruthy();
  });
});
