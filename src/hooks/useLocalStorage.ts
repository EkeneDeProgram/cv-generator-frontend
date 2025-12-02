import { useState, useEffect } from "react";

// Custom React hook for synchronizing state with localStorage.

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Attempt to read from localStorage; fallback to initialValue if missing
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    // Store the updated value in localStorage whenever it changes
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  // Return a tuple like useState
  return [storedValue, setStoredValue] as const;
}
