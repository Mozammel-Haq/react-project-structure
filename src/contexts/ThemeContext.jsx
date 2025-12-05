/**
 * src/contexts/ThemeContext.jsx
 * 
 * THEME MANIPULATION
 * ------------------
 * Manages Light/Dark mode.
 * Persists the preference in LocalStorage.
 */

import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Use custom hook to handle persistence
  // Default to 'light' if nothing in storage
  const [theme, setTheme] = useLocalStorage("ss-theme", "light");

  // Effect to actually apply the CSS class to the HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    // Remove both to be safe
    root.classList.remove("light", "dark");
    // Add the current one
    root.classList.add(theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
