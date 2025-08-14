import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeGeneratorPage from '../../recipe-generator';

// Mocking the global fetch function to control API responses in our tests
global.fetch = jest.fn();
const mockedFetch = fetch as jest.Mock;

const mockFruits = ['apple', 'banana', 'cherry'];

/**
 * @description Test suite for the RecipeGeneratorPage component.
 * This suite validates the component's rendering, user interactions, and state changes.
 */
describe('RecipeGeneratorPage', () => {
  // Before each test, reset the fetch mock to ensure test isolation.
  beforeEach(() => {
    mockedFetch.mockClear();
  });

  // --- POSITIVE TEST CASES ---
  describe('Positive Cases and User Flow', () => {
    /**
     * @description Checks that the component renders correctly in its initial state.
     */
    it('should render the initial page with title and fruit checkboxes', () => {
      render(<RecipeGeneratorPage availableFruits={mockFruits} />);
      expect(screen.getByRole('heading', { name: /AI Recipe Suggester/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/apple/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Generate Recipe/i })).toBeInTheDocument();
    });
    
    /**
     * @description Tests the complete user "happy path": selecting fruits, clicking generate,
     * seeing a loading state, and finally seeing the recipe.
     */
    it('should handle user selection, show loading, and successfully generate a recipe', async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          title: 'Apple Banana Supreme',
          ingredients: ['1 apple', '1 banana'],
          instructions: ['Mix them.', 'Serve.'],
        }),
      });

      render(<RecipeGeneratorPage availableFruits={mockFruits} />);

      // 1. User selects fruits
      fireEvent.click(screen.getByLabelText(/apple/i));
      fireEvent.click(screen.getByLabelText(/banana/i));

      // 2. User clicks the generate button
      fireEvent.click(screen.getByRole('button', { name: /Generate Recipe/i }));

      // 3. Verify loading state is shown and API call is made
      expect(screen.getByRole('button', { name: /Crafting Recipe.../i })).toBeInTheDocument();
      expect(mockedFetch).toHaveBeenCalledWith('/api/generate-recipe', expect.any(Object));

      // 4. Wait for the UI to update with the recipe
      const titleElement = await screen.findByRole('heading', { name: /Apple Banana Supreme/i });
      expect(titleElement).toBeInTheDocument();
      expect(screen.getByText('1 apple')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Crafting Recipe.../i })).not.toBeInTheDocument();
    });
  });

  // --- NEGATIVE TEST CASES ---
  describe('Negative Cases and Error Handling', () => {
    /**
     * @description Tests client-side validation for when the user clicks generate without selecting anything.
     */
    it('should show a client-side error if generate is clicked with no fruits selected', () => {
      render(<RecipeGeneratorPage availableFruits={mockFruits} />);
      fireEvent.click(screen.getByRole('button', { name: /Generate Recipe/i }));
      expect(screen.getByText('Please select at least one fruit.')).toBeInTheDocument();
      expect(mockedFetch).not.toHaveBeenCalled();
    });

    /**
     * @description Simulates a server error (e.g., 500) where the response is not "ok".
     */
    it('should display a server error message if the API response is not ok', async () => {
      mockedFetch.mockResolvedValueOnce({ ok: false }); // Simulate a server error

      render(<RecipeGeneratorPage availableFruits={mockFruits} />);
      fireEvent.click(screen.getByLabelText(/apple/i));
      fireEvent.click(screen.getByRole('button', { name: /Generate Recipe/i }));

      const errorElement = await screen.findByText('Failed to get a recipe from the server.');
      expect(errorElement).toBeInTheDocument();
    });

    /**
     * @description Simulates a complete network failure where the fetch promise itself rejects.
     */
    it('should display an error message if the fetch call fails entirely', async () => {
      mockedFetch.mockRejectedValueOnce(new Error('Network failure')); // Simulate network error

      render(<RecipeGeneratorPage availableFruits={mockFruits} />);
      fireEvent.click(screen.getByLabelText(/apple/i));
      fireEvent.click(screen.getByRole('button', { name: /Generate Recipe/i }));

      const errorElement = await screen.findByText('Network failure');
      expect(errorElement).toBeInTheDocument();
    });
  });

  // --- EDGE CASES ---
  describe('Edge Cases', () => {
    /**
     * @description Ensures that if a user generates one recipe, then generates a second one,
     * the UI correctly clears the old recipe and displays the new one.
     */
    it('should clear the old recipe when generating a new one', async () => {
      // First successful call
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ title: 'First Recipe', ingredients: [], instructions: [] }),
      });

      render(<RecipeGeneratorPage availableFruits={mockFruits} />);

      // Generate the first recipe
      fireEvent.click(screen.getByLabelText(/apple/i));
      fireEvent.click(screen.getByRole('button', { name: /Generate Recipe/i }));

      // Wait for the first recipe to appear
      await screen.findByRole('heading', { name: /First Recipe/i });
      expect(screen.getByRole('heading', { name: /First Recipe/i })).toBeInTheDocument();

      // --- Start second generation ---
      // Second successful call
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ title: 'Second Recipe', ingredients: [], instructions: [] }),
      });
      
      // Change selection and generate again
      fireEvent.click(screen.getByLabelText(/banana/i));
      fireEvent.click(screen.getByRole('button', { name: /Generate Recipe/i }));

      // Wait for the SECOND recipe to appear
      await screen.findByRole('heading', { name: /Second Recipe/i });

      // Assert that the new recipe is present and the old one is GONE
      expect(screen.getByRole('heading', { name: /Second Recipe/i })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /First Recipe/i })).not.toBeInTheDocument();
    });
  });
});