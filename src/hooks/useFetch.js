/**
 * useFetch.js
 *
 * A custom hook to handle API data fetching logic.
 *
 * WHY USE THIS?
 * 1. Abstraction: Instead of writing `useEffect`, `fetch`, `isLoading`, `error` logic in every component, we do it once here.
 * 2. Cleanup: It uses an `AbortController` to cancel requests if the component unmounts before the request finishes.
 * 3. Reusability: Can be used for any GET request across the app.
 */

import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useCallback to ensure this function reference doesn't change on every render
  // unless dependencies change. This allows us to call 'refetch' from components.
  const fetchData = useCallback(
    async (signal) => {
      setLoading(true);
      setError(null);
      try {
        // Pass the signal to axios to allow cancellation
        const response = await api.get(url, { ...options, signal });
        setData(response.data);
      } catch (err) {
        // If the error is due to cancellation, we don't want to set an error state
        if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
          setError(
            err.response?.data?.message || err.message || "Something went wrong"
          );
        }
      } finally {
        // Only turn off loading if not canceled (technically safe either way in modern React, but good practice)
        setLoading(false);
      }
    },
    [url]
  ); // Re-create fetcher if URL changes

  useEffect(() => {
    // Create an AbortController for this specific effect run
    const controller = new AbortController();

    // Call the async function
    fetchData(controller.signal);

    // CLEANUP FUNCTION: Runs when component unmounts or dependencies change (url changes)
    return () => {
      controller.abort(); // Cancel the in-flight request
    };
  }, [fetchData]);

  // Return values needed by the UI
  return { data, loading, error, refetch: () => fetchData() };
};

export default useFetch;
