
# Use case 2: **Advanced AI Task Planner**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)

This project is the second part of my Day 5 assignment on "AI in Frontend." I've taken a component showcase app from Day 3 and transformed its simple form into an **intelligent planning assistant**. It connects directly to the live **Google Gemini API** to break down complex goals into structured, prioritized, and actionable plans.

### **The Use Case: From Overwhelmed to Organized**

We've all been there: facing a big project and staring at a blank to-do list, not knowing where to start. This tool is my solution to that exact problem. Instead of just adding a single, overwhelming task like "Launch a new podcast," I can now leverage the power of AI to instantly generate a clear, step-by-step plan.

The goal was to create a tool that acts like an expert project manager, reducing the mental load of planning and helping me get started right away.

---

### **Live Demo in Action**

The best way to see the power of this tool is to see how it handles different kinds of requests. I ran three prompts in a single session to test its intelligence and robustness. The app is designed to **append** new plans to the list, which lets me plan multiple projects at once.

Here's the final output from my live test session:

```
// --- 1. First, I entered a complex, contextual goal: "make my project deadline deliverables" ---
Define project scope and objectives
Category: Planning | Priority: High
Identify key deliverables and milestones
Category: Planning | Priority: High
Create a detailed project schedule
Category: Planning | Priority: High
Allocate resources (personnel, budget, tools)
Category: Planning | Priority: High
Develop a communication plan
Category: Planning | Priority: Medium
Identify potential risks and develop mitigation strategies
Category: Planning | Priority: Medium
Establish a quality assurance plan
Category: Planning | Priority: Medium
Determine project success metrics
Category: Planning | Priority: Medium
Document all planning decisions and assumptions
Category: Planning | Priority: Low
Obtain necessary approvals for the project plan
Category: Planning | Priority: High

// --- 2. Next, I tried a simple, everyday task: "Email my manager about the report" ---
Compose the email body, including key findings and next steps.
Category: Execution | Priority: High
Attach the report to the email.
Category: Execution | Priority: High
Review the email for clarity, grammar, and professionalism.
Category: Execution | Priority: Medium
Send the email to the manager.
Category: Execution | Priority: High
Confirm email delivery.
Category: Execution | Priority: Low

// --- 3. Finally, I gave it an off-topic question: "What is the weather today?" ---
Identify the user's location
Category: Planning | Priority: High
Access a reliable weather API or website
Category: Research | Priority: High
Query the selected data source for current weather information in Kanpur.
Category: Execution | Priority: High
...and so on...
```
This single session proves the AI is not just a dumb machine. It understands context, handles simple and complex tasks differently, and follows my instructions to stay on topic, making it a truly useful and reliable assistant.

---

### **Meeting the Goals**

*   **A True Generative Component:** The `AddItemForm.tsx` component was successfully transformed into an intelligent, generative tool that creates new, structured content based on user input.

*   **A Major Functional Enhancement:** The upgrade from the original app is massive:
    *   **Live AI Integration:** The app is now powered by the live Google Gemini API.
    *   **Structured Data Generation:** The AI returns structured JSON (`{text, category, priority}`), not just plain text. This is a huge leap in functionality that allows the UI to be truly intelligent.
    *   **Dynamic UI:** The frontend uses this structured data to create a rich user experience, with task colors changing based on the AI-assigned priority.

*   **Appropriate Test Cases:** I built a full suite of unit tests using **Vitest** and **React Testing Library** to mock the AI service and verify all positive, negative, and edge cases. The live demo above also serves as a real-world, end-to-end test.

*   **A Working Codebase:** This repository contains the complete, functional code for the enhanced application, including the new testing setup.

### **Technical Architecture**

As a client-side React application built with Vite, the architecture is straightforward but effective:

1.  **UI (`AddItemForm.tsx`):** The user enters a goal and clicks the button.
2.  **Service (`services/llmService.ts`):** The click handler calls our dedicated service function, which runs **in the browser**.
3.  **Live API Call:** The service uses the `@google/generative-ai` SDK to make a direct call to the Gemini API, authenticating with a key from the `.env` file.
4.  **State Update (`App.tsx`):** The structured JSON response is passed back to the main `App.tsx` component, which updates its state and renders the new list of tasks.

### **Getting It Running On Your Machine**

Here’s how to set up and run the project yourself.

**1. Clone the Repository**
```bash
git clone https://github.com/Amaninreal/pi-shaped-frontend-Aman.git
cd pi-shaped-frontend-Aman/Reactbasics_workshop-Aman/day5/my-app
```

**2. Install Dependencies**
```bash
npm install
```

**3. Get Your Google AI API Key**
-   Go to **[Google AI Studio](https://aistudio.google.com/)**, sign in, and create a new API key.

**4. Set Up Environment Variables**
-   In the `day3/my-app/` directory, create a file named `.env`.
-   Add your key to this file, making sure to use the `VITE_` prefix, which is required by Vite:
  ```
  # .env
  VITE_GEMINI_API_KEY="paste_your_google_ai_key_here"
  ```

**5. Enable the API (A One-Time Step)**
-   Run the app (`npm run dev`). The first time you try to generate a plan, you will likely see a `403 Forbidden` error in your browser's developer console.
-   This error message will contain a long URL. Copy it, paste it into your browser, and click the blue **"ENABLE"** button.

**6. Run the App**
-   Restart your development server to load the new environment variable:
  ```bash
  # Stop with Ctrl + C, then restart
  npm run dev
  ```
The application will be running on `http://localhost:5173`.

### **Running Tests**

I have configured the project with **Vitest**, the modern testing framework for Vite. To run the tests:

```bash
npm test
```