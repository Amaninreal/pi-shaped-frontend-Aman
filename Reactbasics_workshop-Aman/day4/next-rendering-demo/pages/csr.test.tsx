import { render, screen, waitFor } from '@testing-library/react';
import CSRPage from './csr';

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ fruits: ['Apple', 'Banana', 'Test Fruit'] }),
  })
) as jest.Mock;

describe('CSR Page', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should show a loading state initially', () => {
    render(<CSRPage />);
    // Our skeleton creates multiple divs, so we check for the title first
    expect(screen.getByText('Client-Side Rendered Fruits')).toBeInTheDocument();
    // A simple way to check for skeleton is to query for list items - they shouldn't be there
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should fetch and display the list of fruits', async () => {
    render(<CSRPage />);

    // Wait for the fetch call to resolve and the component to re-render
    await waitFor(() => {
      // The list items should now be in the document
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Test Fruit')).toBeInTheDocument();
    });

    // Ensure fetch was called
    expect(fetch).toHaveBeenCalledWith('/api/fruits');
  });
});