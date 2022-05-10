import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import Comments from './comments';

describe('Comments', () => {
  test('is preloading text present', async () => {
    render(<Comments postId="5" />);

    const loading = screen.getByText('Loading comments...');
    expect(loading).toBeTruthy();
  });

  test('get comments for post 5', async () => {
    render(<Comments postId="5" />);

    const loading = screen.getByText('Loading comments...');
    expect(loading).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText('Khalil@emile.co.uk')).toBeInTheDocument();
    });
  });
});
