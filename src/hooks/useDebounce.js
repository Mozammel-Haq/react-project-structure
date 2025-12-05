/**
 * useDebounce.js
 *
 * A hook to delay the update of a value until a user stops typing.
 *
 * WHY USE THIS?
 * 1. Performance: Prevents firing API calls for every single keystroke in a search bar.
 * 2. UX: Waits until the user pauses before running expensive operations.
 */

import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export default useDebounce;
