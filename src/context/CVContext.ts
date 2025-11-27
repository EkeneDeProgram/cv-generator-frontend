import { createContext } from "react";
import type { CVData } from "../types/cv";

// Defines the shape of data & functions that will live in the CV context
type CVContextType = {
  // The actual CV data object
  cv: CVData;

  // Function to update the CV (can take a partial update or a function)
  setCV: (next: Partial<CVData> | ((prev: CVData) => CVData)) => void;

  // Function to reset CV back to default values
  reset: () => void;

  // Function to load predefined example CV data
  loadExample: () => void;
};

// Create the React Context with the defined type
// Default value is `null` until provided by a <CVProvider>
export const CVContext = createContext<CVContextType | null>(null);
