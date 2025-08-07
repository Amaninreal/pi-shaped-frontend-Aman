import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Advanced React Demo App', () => {
  test('Counter increments correctly on user click', () => {
    render(<App />);

    // Check initial state
    const countDisplay = screen.getByText(/Count: 0/i);
    expect(countDisplay).toBeInTheDocument();

    // Find and click the increment button
    const incrementButton = screen.getByRole('button', { name: /Increment/i });
    fireEvent.click(incrementButton);

    // Check if the count has updated
    const updatedCountDisplay = screen.getByText(/Count: 1/i);
    expect(updatedCountDisplay).toBeInTheDocument();
  });

  test('Lazy-loaded component appears when button is clicked', async () => {
    render(<App />);

    // Initially, the settings panel should not be visible
    expect(screen.queryByText(/Settings Panel/i)).not.toBeInTheDocument();

    // Find and click the button to show settings
    const showSettingsButton = screen.getByRole('button', {
      name: /Show Settings/i,
    });
    userEvent.click(showSettingsButton);

    // Use `findBy` which waits for the element to appear asynchronously.
    // The Suspense fallback will be shown first.
    expect(await screen.findByText(/Loading Settings/i)).toBeInTheDocument();

    // After loading, the actual component should be visible.
    const settingsPanel = await screen.findByText(
      /Settings Panel \(Lazy Loaded\)/i
    );
    expect(settingsPanel).toBeInTheDocument();
  });
});
