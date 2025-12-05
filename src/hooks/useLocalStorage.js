/**
 * useLocalStorage.js
 *
 * A custom hook to sync state with the browser's localStorage.
 *
 * WHY USE THIS?
 * 1. Persistence: Data survives page refreshes (like Theme, Auth Token, formatted preferences).
 * 2. Synchronization: It keeps the React state and the LocalStorage in sync automatically.
 * 3. Lazy Initialization: It reads from storage only once on mount, saving performance.
 */

import { useState, useCallback } from "react";

function useLocalStorage(key, initialValue) {
  // LAZY INITIAL STATE:
  // We pass a function to useState so this logic only runs ONCE (on mount).
  // Reading from localStorage is synchronous and slow, so we don't want to do it on every render.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error (e.g. storage full or privacy mode), return initialValue
      console.error(error);
      return initialValue;
    }
  });

  /**
   * setValue:
   * A wrapper around setStoredValue that also writes to localStorage.
   *
   * CRITICAL FIX: Wrapped in useCallback to prevent "Maximum update depth exceeded"
   * loops when this hook is used in dependency arrays (like in UserContext).
   */
  const setValue = useCallback(
    (value) => {
      try {
        // Use functional update pattern so we don't need 'storedValue' as dependency
        setStoredValue((prevStoredValue) => {
          // Allow value to be a function so we have same API as useState
          const valueToStore =
            value instanceof Function ? value(prevStoredValue) : value;

          // Save to local storage
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }

          return valueToStore;
        });
      } catch (error) {
        console.error(error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
}

export default useLocalStorage;
