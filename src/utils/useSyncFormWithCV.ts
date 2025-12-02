import { useEffect } from "react";
import type { UseFormReset, FieldValues } from "react-hook-form";


// Synchronizes a React Hook Form instance with a given CV slice.

export function useSyncFormWithCV<T extends FieldValues>(
  cvSlice: T,
  resetForm: UseFormReset<T>
) {
  useEffect(() => {
    resetForm((current) => {
      const currentStr = JSON.stringify(current);
      const sliceStr = JSON.stringify(cvSlice);

      // Only reset form if current values differ from the CV slice
      if (currentStr !== sliceStr) {
        return cvSlice;
      }
      return current;
    });
  }, [cvSlice, resetForm]);
}
