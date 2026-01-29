import { useEffect, useRef } from "react";

export function useSyncFormWithCV<T>(
  slice: T,
  reset: (values: T) => void
) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    reset(slice);
    initialized.current = true;
  }, [slice, reset]);
}
