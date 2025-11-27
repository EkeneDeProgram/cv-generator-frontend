import { useEffect } from "react";
import type { UseFormReset, FieldValues } from "react-hook-form";

export function useSyncFormWithCV<T extends FieldValues>(
  cvSlice: T,
  resetForm: UseFormReset<T>
) {
  useEffect(() => {
    resetForm((current) => {
      const currentStr = JSON.stringify(current);
      const sliceStr = JSON.stringify(cvSlice);
      if (currentStr !== sliceStr) {
        return cvSlice;
      }
      return current;
    });
  }, [cvSlice, resetForm]);
}
