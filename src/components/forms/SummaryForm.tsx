import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCV } from "../../context/useCV";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect, useState, useMemo } from "react";
import { useSyncFormWithCV } from "../../utils/useSyncFormWithCV";

const schema = z.object({
  summary: z.string().min(10, "Summary should be at least 10 characters long"),
});

type FormType = z.infer<typeof schema>;

export default function SummaryForm() {
  const { cv, setCV } = useCV();
  const [isSaving, setIsSaving] = useState(false);

  const { register, watch, reset } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { summary: cv.summary || "" },
    mode: "onChange",
  });

  // Memoize the slice to avoid infinite loop
  const summarySlice = useMemo(() => ({ summary: cv.summary || "" }), [cv.summary]);

  // Sync form safely
  useSyncFormWithCV(summarySlice, reset);

  const watchedSummary = watch("summary");
  const debouncedSummary = useDebounce(watchedSummary, 500);

  // Auto-save whenever debounced summary changes
  useEffect(() => {
    if (debouncedSummary === cv.summary) return; // ❗ Prevent saving same value

    setIsSaving(true);

    const saveTimer = setTimeout(() => {
      setCV((prev) => ({ ...prev, summary: debouncedSummary }));
      setIsSaving(false);
    }, 200);

    return () => clearTimeout(saveTimer);
  }, [debouncedSummary, cv.summary, setCV]);

  // Styles (same as yours)
  const formWrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "70vh",
    padding: "2rem",
    backgroundColor: "#f9fafb",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 15px 25px rgba(0,0,0,0.1)",
  };

  const textareaStyle: React.CSSProperties = {
    width: "100%",
    padding: "1rem",
    borderRadius: "0.75rem",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    resize: "vertical",
    fontFamily: "inherit",
    transition: "all 0.2s ease-in-out",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "0.75rem",
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    cursor: isSaving ? "not-allowed" : "pointer",
    border: "none",
    transition: "all 0.2s ease-in-out",
    opacity: isSaving ? 0.6 : 1,
  };

  const buttonHoverStyle: React.CSSProperties = { backgroundColor: "#4338ca" };

  return (
    <div style={formWrapperStyle}>
      <form style={formStyle}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "1rem",
            color: "#1f2937",
          }}
        >
          Professional Summary
        </h2>
        <textarea
          {...register("summary")}
          placeholder="Write a short professional summary..."
          rows={5}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#4f46e5")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
        />

        <button
          type="button"
          style={buttonStyle}
          disabled={isSaving}
          onMouseOver={(e) =>
            !isSaving && (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)
          }
          onMouseOut={(e) => !isSaving && (e.currentTarget.style.backgroundColor = "#4f46e5")}
        >
          {isSaving ? "Saving..." : "Save Summary"}
        </button>
      </form>
    </div>
  );
}
