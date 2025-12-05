/**
 * useToggle.js
 *
 * A simple but extremely common hook for boolean states.
 *
 * WHY USE THIS?
 * 1. Clarity: Reduces "setIsModalOpen(!isModalOpen)" boilerplate.
 * 2. Convenience: Provides explicit `toggle`, `setTrue`, and `setFalse` helpers.
 */

import { useState, useCallback } from "react";

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  // Toggle function: switches current value to opposite
  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  // Set explicit true
  const setTrue = useCallback(() => setValue(true), []);

  // Set explicit false
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse];
};

export default useToggle;
