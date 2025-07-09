import { useState, useEffect } from "react";

/**
 * Debounces a value, delaying its update until after a specified delay.
 * Useful for optimizing API calls and preventing rapid successive operations.
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (e.g., 500 for search)
 * @returns {any} The debounced value
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 500);
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
