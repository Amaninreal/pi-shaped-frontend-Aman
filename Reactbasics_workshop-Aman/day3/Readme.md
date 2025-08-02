# React Component Workbench - Day 3

### A Hands-On Lab for Modern React Hooks, Context, and TypeScript

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)

This project is a comprehensive exercise for mastering essential and advanced patterns in modern React. It explores the practical application of React Hooks, the Context API for state management, and the power of TypeScript for building robust, scalable, and type-safe components.

  
*(To add a screenshot: upload your image to a service like Imgur and paste the link here)*

---

## 🏁 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/react-component-workbench.git
    cd react-component-workbench
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser** and navigate to `http://localhost:5173` (or the port specified by Vite).

---

## 🛠️ Technical Deep Dive & Deliverables

This section explains the core technical decisions made during the development of this project, as required by the exercise deliverables.

### 1. Which hooks were used and why?

React Hooks were used to manage state, side effects, and performance within functional components. Here is a breakdown of each hook's role:

| Hook | Component(s) | Why It Was Used |
| :--- | :--- | :--- |
| **`useState`** | `Counter`, `AddItemForm`, `Timer` | **To manage local component state.** It's the most basic hook for adding state to a functional component. In `Counter`, it holds the count value. In `AddItemForm`, it holds the current value of the input field. In `Timer`, it manages the `seconds` and the `isRunning` boolean. |
| **`useEffect`** | `Timer`, `App` | **To handle side effects.** In the `Timer` component, it is used to set up and tear down a `setInterval` function, which updates the timer every second. This is a classic side effect. In `App.tsx`, it's used to update the `className` on the `<html>` element whenever the theme context changes, synchronizing the app's appearance with its state. |
| **`useRef`** | `InputFocus` | **To create a persistent reference to a DOM element.** Its primary purpose here is to get direct access to the `<input>` element without causing a re-render. When the "Focus Input" button is clicked, we use this reference (`inputRef.current.focus()`) to programmatically focus the input field. |
| **`useMemo`** | `ExpensiveCalc` | **To optimize performance by memoizing a value.** The factorial calculation is artificially slow and expensive. `useMemo` ensures this calculation only runs when its dependency (the input number) changes. Without it, the calculation would re-run every time the parent component re-renders for any reason, causing significant performance issues. |
| **`useCallback`** | `AddItemForm` | **To optimize performance by memoizing a function.** When passing a function from a parent (`AddItemForm`) to a memoized child (`ItemList`), a new function reference is created on every render, which would cause the child to re-render unnecessarily. `useCallback` provides a stable function reference, ensuring that `React.memo` on the child component works correctly. |
| **`useContext`** | `App`, `Dropdown` | **To consume shared state from a Context Provider.** This hook allows components to subscribe to context changes without prop drilling. It is used to access the `theme` value and the `toggleTheme` function from our `ThemeContext`, allowing any component in the tree to read or update the application's theme. |

<br/>

### 2. Where generics and utility types were applied?

TypeScript was integral to ensuring the codebase is robust, self-documenting, and scalable.

#### Generic `Dropdown<T>` Component

The most significant application of generics is in the **`<Dropdown<T> />`** component located in `src/components/generic/`.

*   **What it is:** A generic component is one that can work over a variety of types rather than a single one. By defining the component as `Dropdown<T>`, we created a placeholder `T` for the type of data the dropdown will handle.

*   **Why it was used:** This approach promotes reusability and type safety. We needed dropdowns for two different types of data:
    1.  A list of simple **strings** (`'light'`, `'dark'`) for the theme switcher.
    2.  A list of complex **objects** (`UserRole`) for the role selector.

*   **How it works:**
    *   The component's props are typed using `T`: `options: T[]` and `onSelect: (option: T) => void`.
    *   When we use the component, we specify the type.

    ```tsx
    // Usage with 'string'
    <Dropdown<string>
      options={['light', 'dark']}
      // ... onSelect now expects a string
    />

    // Usage with 'UserRole' object
    <Dropdown<UserRole>
      options={userRoles}
      // ... onSelect now expects a UserRole object
    />
    ```
    This prevents bugs by ensuring, for example, that you can't pass a `UserRole` object to a dropdown that expects a `string`, and vice-versa.

#### Utility Types (`UserRole`)

While this project doesn't use advanced utility types like `Partial<T>` or `Pick<T>`, the creation of custom types like `UserRole` in `src/types/index.ts` serves a similar purpose: creating a single source of truth for our data structures.

*   **What it is:** The `UserRole` type defines the shape of a user role object.
    ```typescript
    // in src/types/index.ts
    export type UserRole = {
      label: string;
      value: 'viewer' | 'editor' | 'admin';
    };
    ```

*   **Why it was used:** This ensures that every part of the application that deals with user roles (the `userRoles` array in `App.tsx`, the `Dropdown` component props, and the `handleRoleSelect` function) adheres to the exact same structure. This prevents typos and ensures data consistency throughout the app.