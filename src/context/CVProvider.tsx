import React, { useEffect, useState } from "react";
import { cvSchema } from "../utils/validation";       
import example from "../data/example-data.json";      
import { STORAGE_KEY, defaultCV } from "../constants/cv"; 
import type { CVData } from "../types/cv";            
import { CVContext } from "./CVContext";             

// The CVProvider is responsible for managing CV state and making it available via context
export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State holds the current CV data
  const [cv, setCvState] = useState<CVData>(() => {
    // On initialization, try to load CV from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        // Validate the stored data with Zod schema
        return cvSchema.parse(JSON.parse(stored));
      } catch (e) {
        console.error("Invalid stored CV data, falling back to default:", e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    // If nothing is stored or validation fails → use default CV
    return defaultCV;
  });

  // Persist CV to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cv));
  }, [cv]);

  // Function to update CV (supports partial updates or functional updates)
  const setCV = (next: Partial<CVData> | ((prev: CVData) => CVData)) => {
    setCvState((prev) =>
      typeof next === "function"
        ? (next as (prev: CVData) => CVData)(prev)
        : { ...prev, ...next }
    );
  };

  // Reset CV back to default values & clear localStorage
  const reset = () => {
    setCvState(defaultCV);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Load predefined example CV (validates before using)
  const loadExample = () => {
    try {
      const parsed = cvSchema.parse(example);
      setCvState(parsed);
    } catch (e) {
      console.error("Example data is invalid against schema:", e);
      alert("Failed to load example CV. Please check the data format.");
    }
  };

  // Expose CV data & helper functions to all child components
  return (
    <CVContext.Provider value={{ cv, setCV, reset, loadExample }}>
      {children}
    </CVContext.Provider>
  );
};
