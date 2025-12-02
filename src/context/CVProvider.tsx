import { useState, useCallback, useMemo } from "react";
import { CVContext } from "./CVContext";
import type { CVData } from "../types/cv";
import exampleData from "../data/example-data.json";

// Default Empty CV Structure
const defaultCV: CVData = {
  personalInfo: {
    name: "",
    email: "",
    contact: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
    socialLinks: [],
  },
  summary: "",
  workExperience: [],
  education: [],
  projects: [],
  skills: [],
  achievements: [],
  template: "modern",
  colorScheme: "blue",
  fontStyle: "sans-serif",

  _docxParts: {
    summary: [],
    workExperience: [],
    projects: [],
    achievements: [],
  },
};

export function CVProvider({ children }: { children: React.ReactNode }) {
  // Load saved CV from localStorage or use default
  const [cv, setCVState] = useState<CVData>(() => {
    const stored = localStorage.getItem("builderCV");
    return stored ? (JSON.parse(stored) as CVData) : defaultCV;
  });

  // Smart State Setter
  const setCV = useCallback(
    (next: Partial<CVData> | ((prev: CVData) => CVData)) => {
      setCVState((prev) => {
        const updated =
          typeof next === "function" ? next(prev) : { ...prev, ...next };

        // Write to localStorage ONCE here
        localStorage.setItem("builderCV", JSON.stringify(updated));

        return updated;
      });
    },
    []
  );

  // Load Example CV
  const loadExample = useCallback(() => {
    localStorage.setItem("builderCV", JSON.stringify(exampleData));
    setCVState(exampleData as CVData);
  }, []);

  // Reset to Default CV
  const reset = useCallback(() => {
    localStorage.setItem("builderCV", JSON.stringify(defaultCV));
    setCVState(defaultCV);
  }, []);

  // Memoized context value so children don't re-render infinitely
  const value = useMemo(
    () => ({
      cv,
      setCV,
      loadExample,
      reset,
    }),
    [cv, setCV, loadExample, reset]
  );

  return (
    <CVContext.Provider value={value}>
      {children}
    </CVContext.Provider>
  );
}
