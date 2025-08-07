# Advanced React Demo (react-advanced-demo) - Aman Jha

This project is a React application built with TypeScript to demonstrate advanced concepts including performance optimization, lazy loading, testing with React Testing Library, and enforcing code quality with ESLint and Prettier.

This application was created as part of the Day 4 "Advanced React" exercise.

---

## Core Concepts Demonstrated

-   **Performance Optimization**: Using `useMemo` to memoize expensive computations and `React.memo` to prevent unnecessary component re-renders.
-   **Lazy Loading**: Using `React.lazy` and `<Suspense>` to code-split a component and load it on demand.
-   **Testing**: Writing unit and integration tests with React Testing Library (RTL) to ensure component functionality.
-   **Code Quality**: Integrated ESLint and Prettier to enforce consistent coding standards and formatting.

---

## Screenshots

| Page Type | Screenshot |
| :--- | :--- |
| **Counter**| ![Counter Page Preview](screenshots/image-2.png) |
| **Before Lazy Loading**<br/>*It doesn't store the page card* | ![Before Lazy loading](image-3.png)|
| **After Lazy Loading**<br/>*It appears when I click on Settings* | ![After Lazy loading](image-4.png)|
---

## Getting Started

To get the project up and running on your local machine, follow these steps.

1.  **Clone the repository** (or download the source code).

2.  **Navigate to the project directory**:
    ```bash
    cd react-advanced-demo
    ```

3.  **Install dependencies**:
    ```bash
    npm install
    ```

4.  **Run the application**:
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:3000`.

---

## Available Scripts

This project includes several scripts to help with development:

-   `npm start`: Runs the app in development mode.
-   `npm test`: Launches the test runner in interactive watch mode.
-   `npm run build`: Builds the app for production to the `build` folder.
-   `npm run lint`: Lints all `.ts` and `.tsx` files for code quality issues.
-   `npm run format`: Formats all `.ts` and `.tsx` files using Prettier.

---

## Features Implemented

### 1. Performance-Optimized Counter (`src/components/Counter.tsx`)

-   **`useMemo`**: The component calculates a Fibonacci number, which is an intentionally expensive operation. `useMemo` is used to ensure this calculation only re-runs when the `count` state changes, not on every re-render.
-   **`React.memo`**: The `Counter` component is wrapped in `React.memo`. To demonstrate its effectiveness, the parent `App` component has a "Toggle Theme" button. Clicking this button re-renders `App`, but you can see in the browser console that the "Counter component re-rendered" log **does not** appear, proving `React.memo` is successfully preventing the re-render.

### 2. Lazy Loaded Settings Panel (`src/components/LazySettings.tsx`)

-   The `LazySettings` component is not included in the initial JavaScript bundle.
-   In `App.tsx`, it is imported using `React.lazy()`.
-   It is rendered inside a `<Suspense>` component that provides a fallback UI (`Loading Settings...`) while the component's code is being fetched from the server.
-   The component is only loaded and rendered after the "Show Settings" button is clicked.

### 3. Testing with RTL (`src/App.test.tsx`)

Two test cases have been written to verify functionality:

1.  **Counter Increments Correctly**: This test renders the `App`, simulates a user clicking the "Increment" button, and asserts that the displayed count updates from 0 to 1.
2.  **Lazy-Loaded Component Appears**: This test verifies that the `Settings` component is not initially present. It then simulates a click on the "Show Settings" button and uses `await screen.findByText()` to wait for the lazy-loaded component to appear in the DOM.

### 4. Code Quality

-   **`.eslintrc.json`**: Configured to extend the recommended rules for React, TypeScript, and Prettier.
-   **`.prettierrc`**: Configured to enforce a consistent code style (e.g., single quotes, tab width).
-   All files have been formatted and linted using the `npm run format` and `npm run lint` scripts.

---

# Next.js Rendering Strategies Demo

This project is a Next.js application built with TypeScript to demonstrate and compare two primary rendering strategies: **Client-Side Rendering (CSR)** and **Server-Side Rendering (SSR)**.

The application features a clean, modern UI, a backend API route, and a complete testing suite using Jest and React Testing Library to ensure functionality and illustrate best practices.

---

## Core Concepts Demonstrated

-   **Next.js API Routes**: A backend endpoint (`/api/fruits`) created to serve data to the frontend.
-   **Client-Side Rendering (CSR)**: A page that fetches data in the browser, showcasing a "skeleton" loading state.
-   **Server-Side Rendering (SSR)**: A page that pre-renders with data on the server, delivering a complete page to the client.
-   **Modern UI/UX**: A beautiful, responsive interface built with CSS Modules and Google Fonts.
-   **Automated Testing**: A robust testing environment configured with Jest and React Testing Library.

---


## Screenshots

| Page Type | Screenshot |
| :--- | :--- |
| **Client-Side Rendering (CSR)**<br/>*Shows a loading state first* | ![CSR Page Preview](screenshots/image.png) |
| **Server-Side Rendering (SSR)**<br/>*Content is loaded instantly* | ![SSR Page Preview](screenshots/image-1.png) |

---

## Getting Started

To get the project up and running on your local machine, please follow these steps.

1.  **Clone the Repository**
    ```bash
    # Clone or download the source code into your chosen directory
    ```

2.  **Navigate to the Project Directory**
    ```bash
    cd next-rendering-demo
    ```

3.  **Install Dependencies**
    ```bash
    npm install
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

---

## Available Scripts

-   `npm run dev`: Starts the application in development mode.
-   `npm run build`: Creates an optimized production build.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Lints the code for potential errors.
-   `npm run test`: Runs the complete test suite using Jest.

---

## CSR vs. SSR: The Difference

### 1. Client-Side Rendering (CSR) - The "Build-It-Yourself" Kit

-   **Page**: [`/csr`](http://localhost:3000/csr)
-   **Think of it like this**: The server sends your browser an empty box (the HTML) and a set of instructions (the JavaScript). Your browser then has to do the work: it reads the instructions, sees that it needs a list of fruits, makes a separate trip to the API to get them, and finally puts them on the page.
-   **What you see**: You see a **loading skeleton** first because the browser is busy fetching the data.
-   **The Good**: The initial page (the empty box) loads very fast.
-   **The Bad**: The user has to wait for the content to appear, and it's not great for Google SEO because Google might see the empty box before you've filled it.

### 2. Server-Side Rendering (SSR) - The "Pre-Built" Package

-   **Page**: [`/ssr`](http://localhost:3000/ssr)
-   **Think of it like this**: The server does all the work upfront. Before it sends anything, it builds the page, makes the trip to the API itself, gets the fruits, and puts them into the HTML. It then sends the complete, fully-assembled package directly to your browser.
-   **What you see**: The page appears **instantly with all the content**. There is no loading state.
-   **The Good**: It's great for the user because everything is there at once, and it's perfect for Google SEO because the content is in the initial HTML.
-   **The Bad**: It can feel slightly slower to load at the very beginning because the user has to wait for the server to finish building everything before it can send the page.

---

### How to Verify the Difference Yourself

You can use your browser's DevTools to see these concepts in action:

| Test Method            | On the CSR Page (`/csr`)                                         | On the SSR Page (`/ssr`)                                    |
| :--------------------- | :--------------------------------------------------------------- | :---------------------------------------------------------- |
| **Network Tab**        | Reload the page. You will see a `fruits` API call from the browser. | Reload the page. You will **NOT** see a client-side `fruits` API call. |
| **"View Page Source"** | The initial HTML source code will **not** contain the fruit list. | The initial HTML source code will contain the **fully rendered** list of fruits. |

---

## Automated Testing Strategy

The project is configured with Jest and React Testing Library.

-   **Test Setup**: Configuration is handled in `jest.config.js` and `jest.setup.js`. The setup file correctly imports `@testing-library/jest-dom` to provide custom matchers like `.toBeInTheDocument()`.
-   **Testing the CSR Page (`pages/csr.test.tsx`)**:
    -   The test **mocks the global `fetch` function** to return a predefined list of fruits.
    -   It first asserts that a loading state is shown.
    -   It then uses `await waitFor()` to assert that the list appears after the mocked fetch completes.
-   **Testing the SSR Page (`pages/ssr.test.tsx`)**:
    -   This test is simpler. It directly **passes a `fruits` prop** to the component, simulating the behavior of `getServerSideProps`.
    -   It asserts that the content is rendered immediately without any waiting or loading states.