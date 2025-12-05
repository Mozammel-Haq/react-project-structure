/**
 * useForm.js
 *
 * A custom hook to manage form state and validation.
 *
 * WHY USE THIS?
 * 1. Boilerplate Reduction: Managing 'onChange' for every input is tedious. This handles it generically.
 * 2. Validation: It provides a structured way to handle errors.
 * 3. Submission: It wraps the handleSubmit to handle preventDefault automatically.
 */

import { useState } from "react";

const useForm = (initialValues = {}, validate = null) => {
  // Store all form field values in a single object
  const [values, setValues] = useState(initialValues);
  // Store validation errors
  const [errors, setErrors] = useState({});

  /**
   * Handle Change:
   * Updates a specific field in the state object.
   * Can be passed directly to input's `onChange`.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setValues((prev) => ({
      ...prev,
      // Handle checkboxes specifically, otherwise use the standard value
      [name]: type === "checkbox" ? checked : value,
    }));

    // Optional: clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  /**
   * Reset Form:
   * Returns form to initial state.
   */
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  /**
   * Handle Submit:
   * Wraps the form submission logic.
   * @param {Function} onSubmit - The function to call if validation passes.
   */
  const handleSubmit = (onSubmit) => async (e) => {
    if (e) e.preventDefault(); // Prevent browser reload

    // If a validation function was provided, run it
    if (validate) {
      const validationErrors = validate(values);
      // If object, check keys. If checks pass, validationErrors should be empty object.
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return; // STOP submission
      }
    }

    // No errors? Proceed with the actual submit logic provided by the component
    await onSubmit(values);
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setValues, // Exposed in case we need to set values programmatically
    setErrors,
  };
};

export default useForm;
