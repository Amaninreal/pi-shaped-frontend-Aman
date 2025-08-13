import { createMocks } from 'node-mocks-http';
import handler from '../generate-recipe';
import { callLlmApi } from '../../../services/recipeService';

// Mock the entire recipeService module. This is the cleanest way
// to isolate our API handler for testing.
jest.mock('../../../services/recipeService');

// Cast our import to a mock type so we have access to .mockResolvedValue, etc.
const mockedCallLlmApi = callLlmApi as jest.Mock;

/**
 * @description Test suite for the /api/generate-recipe API endpoint.
 * This suite validates the handler's logic for different request types and body contents.
 */
describe('/api/generate-recipe', () => {
  // Before each test, clear the mock's history to ensure tests are isolated.
  beforeEach(() => {
    mockedCallLlmApi.mockClear();
  });

  // --- POSITIVE TEST CASE ---
  /**
   * @description Tests the "happy path" where everything is correct.
   * A valid POST request is made with a valid body, and the service returns data.
   */
  it('should call the recipe service and return its data on a valid request', async () => {
    const testFruits = ['Mango', 'Pineapple'];
    const mockRecipe = { title: 'Mock Recipe', ingredients: [], instructions: [] };
    
    // Setup: Configure our mock to return a successful promise.
    mockedCallLlmApi.mockResolvedValue(mockRecipe);

    const { req, res } = createMocks({
      method: 'POST',
      body: { fruits: testFruits },
    });
    
    // Act: Call the handler.
    await handler(req, res);

    // Assert: Check that the service was called correctly and the response is as expected.
    expect(mockedCallLlmApi).toHaveBeenCalledWith(testFruits);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(mockRecipe);
  });


  // --- NEGATIVE TEST CASES ---
  /**
   * @description A group of tests for handling invalid requests or server-side failures.
   */
  describe('Negative Cases', () => {
    /**
     * @description Ensures the endpoint rejects any method other than POST.
     */
    it('Should return 405 Method Not Allowed if not a POST request', async () => {
      const { req, res } = createMocks({ method: 'GET' }); // Using GET
      await handler(req, res);
      expect(res._getStatusCode()).toBe(405);
      expect(mockedCallLlmApi).not.toHaveBeenCalled();
    });

    /**
     * @description Tests that the API correctly returns a 500 error if the downstream
     * AI service throws an exception. This validates the try/catch block.
     */
    it('Should return 500 Internal Server Error if the recipe service fails', async () => {
      // Setup: Configure the mock to reject the promise, simulating a service failure.
      mockedCallLlmApi.mockRejectedValue(new Error('AI service is down'));

      const { req, res } = createMocks({
        method: 'POST',
        body: { fruits: ['Apple'] },
      });

      // Act: Call the handler.
      await handler(req, res);

      // Assert: Check that the correct error code and message are returned.
      expect(res._getStatusCode()).toBe(500);
      expect(res._getJSONData()).toEqual({ error: 'Failed to generate recipe.' });
    });
  });


  // --- EDGE CASES ---
  /**
   * @description A group of tests for handling malformed but plausible request bodies.
   */
  describe('Edge Cases (Input Validation)', () => {
    /**
     * @description Checks that a request with an empty `fruits` array is rejected.
     */
    it('Should return 400 if the fruits array is empty', async () => {
      const { req, res } = createMocks({ method: 'POST', body: { fruits: [] } });
      await handler(req, res);
      expect(res._getStatusCode()).toBe(400);
      expect(mockedCallLlmApi).not.toHaveBeenCalled();
    });

    /**
     * @description Checks that a request body completely missing the `fruits` key is rejected.
     */
    it('should return 400 if the fruits key is missing from the body', async () => {
      const { req, res } = createMocks({ method: 'POST', body: {} }); // Empty body
      await handler(req, res);
      expect(res._getStatusCode()).toBe(400);
      expect(mockedCallLlmApi).not.toHaveBeenCalled();
    });

    /**
     * @description Checks that `fruits` must be an array, rejecting other types.
     */
    it('Should return 400 if fruits is not an array', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: { fruits: 'this-is-not-an-array' },
      });
      await handler(req, res);
      expect(res._getStatusCode()).toBe(400);
      expect(mockedCallLlmApi).not.toHaveBeenCalled();
    });
  });
});