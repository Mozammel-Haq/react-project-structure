/**
 * src/main.jsx
 * 
 * THE ENTRY POINT (BOOTLOADER)
 * ----------------------------
 * This file is the very first thing that executes when the application starts.
 * It is responsible for:
 * 1. Finding the root DOM element in index.html (<div id="root">).
 * 2. "Hydrating" or rendering the React application into that element.
 * 3. Wrapping the entire application with Global Providers (Contexts).
 */

import React from "react";
import ReactDOM from "react-dom/client"; // React DOM handles interacting with the browser's DOM
import App from "./App"; // The root component of our UI tree
import "./index.css" // Global Tailwind CSS imports

// Importing Context Providers to wrap our app
import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";

// createRoot is the modern API for React 18+ concurrency features
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode helps identify unsafe lifecycles and side effects during development
  // It effectively runs effects twice in dev mode to ensure they are clean
  <React.StrictMode>
      {/* 
         CONTEXT PROVIDER WRAPPERS
         -------------------------
         We wrap global state providers here so that ANY component in the entire
         application can access this data (User, Theme, Notifications).
         This avoids "Prop Drilling" (passing data down 10 levels manually).
      */}
      <UserProvider>
          <ThemeProvider>
            <NotificationProvider>
                {/* 
                   Finally, we render the main App component. 
                   All children inside App will now have access to the Contexts above.
                */}
                <App /> 
            </NotificationProvider>
          </ThemeProvider>
      </UserProvider>
  </React.StrictMode>
);
