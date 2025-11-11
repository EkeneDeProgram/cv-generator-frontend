import { useContext } from "react";
import { CVContext } from "./CVContext";

// 🔹 Custom hook to safely access CVContext
export const useCV = () => {
  // Get the current context value (cv, setCV, reset, loadExample)
  const ctx = useContext(CVContext);

  // If not inside <CVProvider>, context will be null → throw error for safety
  if (!ctx) throw new Error("useCV must be used inside CVProvider");

  // Return the context so components can use CV state and helpers
  return ctx;
};

