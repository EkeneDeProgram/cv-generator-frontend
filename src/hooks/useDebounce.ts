import { useEffect, useState } from "react";

// Custom React hook for debouncing a value.

export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the specified delay
    const timer = setTimeout(() => setDebounced(value), delay);

    // Cleanup: clear the timer if value or delay changes before the delay completes
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
