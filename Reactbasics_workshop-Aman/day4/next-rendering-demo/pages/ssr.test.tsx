import { render, screen } from '@testing-library/react';
import SSRPage from './ssr';

describe('SSR Page', () => {
  const mockFruits = ['Server Apple', 'Server Banana'];

  it('should render the fruits passed as props immediately', () => {
    // We pass the 'fruits' prop directly, simulating what getServerSideProps does
    render(<SSRPage fruits={mockFruits} />);

    // No need to wait, the content should be there from the start
    expect(screen.getByText('Server Apple')).toBeInTheDocument();
    expect(screen.getByText('Server Banana')).toBeInTheDocument();
  });

  it('should not show a loading state', () => {
    render(<SSRPage fruits={mockFruits} />);
    // Check that there are no elements that might indicate loading
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});