# **AI Recipe Suggester - Day 5 Frontend AI Project ( Aman Jha )**

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

This project is an enhancement of a Day 4 Next.js application, fulfilling the requirements for the "Day 5: AI in Frontend – LLMs & Generative Components" assignment. It implements a dynamic, interactive, and intelligent tool that connects to the **live Google Gemini API** to help users create recipes from ingredients they already have.

### **Use Case Description**

Many people struggle with deciding what to cook based on the ingredients available at home, leading to food waste or uninspired meals. The **AI Recipe Suggester** tackles this problem by providing a fun and creative solution. A user selects from a list of available ingredients, and the application calls the **Google Gemini Pro model** to act as a creative chef. The AI generates a unique recipe in real-time, complete with a title, a formatted ingredient list, and step-by-step instructions.

This project implements a powerful and secure architecture for integrating live generative AI in a modern web application.

---

# **AI Recipe Suggester 🧑‍🍳**

Ever stare into your fridge, see a random collection of ingredients, and have absolutely no idea what to make? This project is my answer to that exact problem.

This started as a simple assignment for Day 4 of a frontend workshop, just displaying a list of fruits. For my Day 5 assignment on AI, I decided to give it a major upgrade. Instead of just *showing* ingredients, what if the app could *use* them to create something new?

That was the spark for the **AI Recipe Suggester**: a smart kitchen assistant that connects to Google's live Gemini AI to dream up unique recipes on the fly based on the ingredients you have on hand.

### **The Magic: How It Actually Works**

The user experience is simple, but the architecture underneath is what makes it powerful and secure.

1.  **You Pick Your Ingredients:** On the `/recipe-generator` page, you check off the fruits you want to use.
2.  **A Secure Request is Made:** Your choices are sent to a private API route I built within the Next.js app. **Your browser never talks to the AI directly.**
3.  **The Server Takes Over:** My backend API route securely calls the Google Gemini AI, using a secret API key that stays safely on the server. I've specifically instructed the AI to act like a creative chef and to respond only in a clean, structured JSON format.
4.  **A Recipe is Born:** The AI generates a brand new recipe and sends it back as structured data (a title, an array of ingredients, and an array of instructions).
5.  **Beautifully Displayed:** The frontend receives this clean data and renders it in a user-friendly, easy-to-read format.

### **Checking Off the Assignment Boxes (My Day 5 Goals)**

This project was built to meet specific learning objectives, and I'm proud of how it turned out.

*   **A True Generative Component:** The heart of the app is the `RecipeGeneratorPage`. It’s not just displaying data; it’s an interactive tool that generates new, unique content every time you use it.

*   **A Major Functional Upgrade:** This wasn't just a small addition. I transformed the original, static app into something dynamic, useful, and truly interactive. The biggest enhancement was building the secure, server-side architecture to handle the AI, which is how professional applications are built.

*   **Rock-Solid Testing:** You can't build something this cool without making sure it doesn't break. I wrote a comprehensive test suite for both the frontend and the backend API, covering:
    *   **Happy Paths:** Does it work when the user does everything right?
    *   **Negative Cases:** What happens if the network fails or the user clicks buttons in the wrong order?
    *   **Edge Cases:** Does the app handle weird inputs gracefully?

*   **A Working Codebase:** This repository is the complete, functional result of that work.

### Appropriate Testcases with AI

A major focus of this project was creating a robust testing suite to prove the reliability of the AI integration architecture. We created dedicated test files for both the frontend and the backend, covering a full range of scenarios:

*   **API Route Tests (`/pages/api/__tests__/generate-recipe.test.ts`):**
    *   **Positive Case:** Validates that a correct request successfully calls the backend service and returns a 200 status.
    *   **Negative Cases:** Confirms that the API correctly handles non-POST requests (405) and internal service failures (500).
    *   **Edge Cases:** Ensures the API rejects requests with invalid bodies, such as an empty `fruits` array.

*   **Frontend Component Tests (`/pages/__tests__/recipe-generator.test.tsx`):**
    *   **Positive Case:** Simulates the full user journey from selecting ingredients to clicking "Generate" and seeing the final recipe appear.
    *   **Negative Cases:** Verifies that both client-side and server-side errors are gracefully handled.
    *   **Edge Cases:** Checks complex user behavior, like ensuring an old recipe is correctly replaced when a new one is generated.

---

## **How the AI Integration Works**

The application follows a secure, full-stack architecture to interact with the Google Gemini API.

1.  **Frontend (`RecipeGeneratorPage.tsx`):** The user selects ingredients and clicks "Generate". A `fetch` request is sent to our internal Next.js API route.
2.  **API Route (`/api/generate-recipe.ts`):** This server-side route receives the request and calls the `callLlmApi` function from our dedicated service.
3.  **Service (`services/recipeService.ts`):** This file contains the core logic. It uses the official `@google/generative-ai` SDK to securely connect to the Google API using the secret key from `.env.local`. It prompts the `gemini-1.5-flash-latest` model to generate a recipe in a specific JSON format.
4.  **Response:** The structured JSON is passed back through the API route to the frontend, where it is rendered for the user.

## **Local Setup and Installation**

To run this project with a live AI connection, follow these steps:

**1. Clone the Repository**
```bash
git clone https://github.com/Amaninreal/pi-shaped-frontend-Aman.git
cd pi-shaped-frontend-Aman/Reactbasics_workshop-Aman/day5/next-rendering-demo
```

**2. Install Dependencies**
```bash
npm install
npm install @google/generative-ai
```

**3. Get Your Google AI API Key**
-   Go to **[Google AI Studio](https://aistudio.google.com/)**.
-   Sign in and click **"Get API key"** -> **"Create API key in new project"**.
-   Copy the generated key.

**4. Set Up Environment Variables**
-   In the root of the `next-rendering-demo` directory, create a new file named `.env.local`.
-   Add your Google AI API key to this file:
  ```
  # .env.local
  GEMINI_API_KEY="paste_your_google_ai_key_here"
  ```

**5. Enable the API in Google Cloud Console**
This is a mandatory one-time setup step for Google Cloud.
-   The first time you run the app, you will likely see a `403 Forbidden` error in your terminal with a long URL.
-   **Copy that URL** and paste it into your browser.
-   It will take you to the Google Cloud Console page for the "Generative Language API".
-   Click the blue **"ENABLE"** button.
-   Wait about a minute for the setting to apply.

**6. Run the Development Server**
Restart your server to load the new environment variables.
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser, navigate to `/recipe-generator`, and try it out!

## **Running Tests**

To run the complete test suite (which mocks the AI service to avoid API calls), use the following command:

```bash
npm test
```