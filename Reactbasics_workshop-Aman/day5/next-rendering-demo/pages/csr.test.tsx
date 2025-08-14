import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CSRPage from './csr';

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ fruits: ['apple', 'banana', 'cherry'] }),
    })
  ) as jest.Mock;
});

describe('CSRPage', () => {
  it('should render skeletons while loading, then display the fruits', async () => {
    // 1. The component is rendered. It immediately calls the mocked fetch.
    render(<CSRPage />);

    // 2. We check that the initial UI shows the skeletons.
    //    Make sure you have added `data-testid="skeleton-loader"` to your component.
    expect(screen.getAllByTestId('skeleton-loader').length).toBeGreaterThan(0);

    // 3. We WAIT for the mocked fetch to resolve and for React to update the UI.
    //    `findByText` is the key to fixing all "act" warnings.
    const appleElement = await screen.findByText('apple');

    // 4. We assert the final, correct UI state.
    expect(appleElement).toBeInTheDocument();
    expect(screen.getByText('banana')).toBeInTheDocument();

    // 5. We assert the loading state is now gone.
    expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument();
  });
});