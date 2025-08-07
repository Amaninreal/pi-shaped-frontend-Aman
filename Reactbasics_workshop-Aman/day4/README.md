# 🚀 Advanced React Demo (react-advanced-demo)

This project is a React application built with TypeScript to demonstrate advanced concepts including performance optimization, lazy loading, testing with React Testing Library, and enforcing code quality with ESLint and Prettier.

This application was created as part of the Day 4 "Advanced React" exercise.

---

## ✨ Core Concepts Demonstrated

-   **Performance Optimization**: Using `useMemo` to memoize expensive computations and `React.memo` to prevent unnecessary component re-renders.
-   **Lazy Loading**: Using `React.lazy` and `<Suspense>` to code-split a component and load it on demand.
-   **Testing**: Writing unit and integration tests with React Testing Library (RTL) to ensure component functionality.
-   **Code Quality**: Integrated ESLint and Prettier to enforce consistent coding standards and formatting.

---

## 🏁 Getting Started

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

## 🛠️ Available Scripts

This project includes several scripts to help with development:

-   `npm start`: Runs the app in development mode.
-   `npm test`: Launches the test runner in interactive watch mode.
-   `npm run build`: Builds the app for production to the `build` folder.
-   `npm run lint`: Lints all `.ts` and `.tsx` files for code quality issues.
-   `npm run format`: Formats all `.ts` and `.tsx` files using Prettier.

---

## 📋 Features Implemented

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


# 🚀 Next.js Rendering Demo (next-rendering-demo)

This project is a Next.js application built with TypeScript to demonstrate and compare two primary rendering strategies: **Client-Side Rendering (CSR)** and **Server-Side Rendering (SSR)**.

This application was created as part of the Day 4 "Advanced React" exercise.

---

## ✨ Core Concepts Demonstrated

-   **Next.js API Routes**: Creating a backend endpoint (`/api/fruits`) to serve data.
-   **Client-Side Rendering (CSR)**: Fetching data on the client using React's `useEffect` hook.
-   **Server-Side Rendering (SSR)**: Pre-rendering a page on the server at request time using `getServerSideProps`.
-   **Comparison**: A clear, documented explanation of the pros and cons of each rendering method.

---

## 🏁 Getting Started

To get the project up and running on your local machine, follow these steps.

1.  **Clone the repository** (or download the source code).

2.  **Navigate to the project directory**:
    ```bash
    cd next-rendering-demo
    ```

3.  **Install dependencies**:
    ```bash
    npm install
    ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

---

## 📂 Project Structure

-   `/pages/index.tsx`: The home page that links to the CSR and SSR examples.
-   `/pages/api/fruits.ts`: An API endpoint that returns a list of fruits.
-   `/pages/csr.tsx`: The page demonstrating **Client-Side Rendering**.
-   `/pages/ssr.tsx`: The page demonstrating **Server-Side Rendering**.

---

## 📋 CSR vs. SSR Comparison

This project contains two pages to illustrate the difference between the rendering methods. Both pages fetch data from the same `/api/fruits` endpoint.

### 1. Client-Side Rendering (CSR)

-   **Page**: [`/csr`](http://localhost:3000/csr)
-   **How it Works**:
    1.  The browser receives a minimal HTML shell from the server.
    2.  The browser downloads and executes the JavaScript bundle.
    3.  The `useEffect` hook runs, triggering an API call to `/api/fruits`.
    4.  A **loading state** is shown while the data is being fetched.
    5.  Once the data arrives, the component re-renders to display the list of fruits.
-   **Pros**:
    -   **Fast Initial Page Load**: The time to get an interactive page is very fast.
    -   **Less Server Load**: The server's only job is to send a static shell and the JS bundle.
-   **Cons**:
    -   **Poor for SEO**: Search engine crawlers may not see the final content, as they often don't wait for API calls to complete.
    -   **Content Flash**: Users will see a "flash" of a loading state before the real content appears, which can feel slow.

### 2. Server-Side Rendering (SSR)

-   **Page**: [`/ssr`](http://localhost:3000/ssr)
-   **How it Works**:
    1.  A user requests the `/ssr` page.
    2.  The Next.js server runs the `getServerSideProps` function **before** sending a response.
    3.  This function fetches data from the `/api/fruits` endpoint on the server.
    4.  The server uses the fetched data to render the complete HTML of the page.
    5.  The fully-formed, content-rich HTML is sent directly to the browser.
-   **Pros**:
    -   **Excellent for SEO**: Search engines see the complete content on the first crawl, leading to better indexing.
    -   **No Content Flash**: The user sees the final page immediately upon loading; there is no loading state for the initial data.
-   **Cons**:
    -   **Slower Time to First Byte (TTFB)**: The server must complete the data fetching and rendering *before* it can send anything to the browser, which can make the initial response slower.
    -   **Higher Server Load**: The server does more work for every incoming request.

### How to Observe the Difference

1.  **Network Tab**: Open your browser's DevTools. On the CSR page, you will see a `fruits` API call initiated from the browser. On the SSR page, you will not see this call, as it happened on the server.
2.  **View Page Source**: Right-click on each page and select "View Page Source".
    -   On the CSR page, the source code will be minimal, and you won't see the list of fruits.
    -   On the SSR page, the source code will contain the fully rendered HTML, including the `<li>` elements for each fruit.```