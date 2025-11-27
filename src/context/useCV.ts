import { useContext } from "react";
import type { CVData} from "../types/cv";
import { CVContext } from "./CVContext";

// Custom hook to safely access CVContext
export const useCV = () => {
  const ctx = useContext(CVContext);

  if (!ctx) throw new Error("useCV must be used inside CVProvider");

  // Wrap setCV to enforce CVData template type
  const setCV = (updater: Partial<CVData> | ((prev: CVData) => CVData)) => {
    if (typeof updater === "function") {
      ctx.setCV((prev: CVData) => {
        const result = updater(prev);
        // Ensure template is valid
        if (!["modern", "twoColumn", "card"].includes(result.template)) {
          result.template = "modern"; // fallback to valid template
        }
        return result;
      });
    } else {
      if (updater.template && !["modern", "twoColumn", "card"].includes(updater.template)) {
        updater.template = "modern";
      }
      ctx.setCV({ ...ctx.cv, ...updater });
    }
  };

  return {
    ...ctx,
    cv: ctx.cv as CVData,
    setCV,
  };
};
