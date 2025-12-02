import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workItemSchema } from "../../utils/validation";
import { z } from "zod";
import { useCV } from "../../context/useCV";
import { v4 as uuidv4 } from "uuid";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect, useState, useMemo } from "react";
import { useSyncFormWithCV } from "../../utils/useSyncFormWithCV";

const schema = z.object({
  workExperience: z.array(workItemSchema),
});

type FormType = z.infer<typeof schema>;

export default function WorkExperienceForm() {
  const { cv, setCV } = useCV();
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form
  const { control, register, watch, reset } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      workExperience:
        cv.workExperience.length > 0
          ? cv.workExperience
          : [{ id: uuidv4(), company: "", role: "", startDate: "", description: "" }],
    },
    mode: "onChange",
  });

  // Memoize CV slice to avoid re-renders
  const workExperienceSlice = useMemo(() => {
    return cv.workExperience.length > 0
      ? { workExperience: cv.workExperience }
      : { workExperience: [{ id: uuidv4(), company: "", role: "", startDate: "", description: "" }] };
  }, [cv.workExperience]);

  // Sync form with CV store
  useSyncFormWithCV(workExperienceSlice, reset);

  // Field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience",
  });

  // Watch & debounce changes
  const watchedWork = watch("workExperience");
  const debouncedWork = useDebounce(watchedWork, 500);

  // AUTO-SAVE (smooth, stable)
  useEffect(() => {
    if (!debouncedWork) return;

    setIsSaving(true);

    setCV((prev) => ({ ...prev, workExperience: debouncedWork }));

    const timer = setTimeout(() => {
      setIsSaving(false);
    }, 600); // smoother UX

    return () => clearTimeout(timer);
  }, [debouncedWork, setCV]);

  // Inline styles
  const formWrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    padding: "2rem",
    backgroundColor: "#f9fafb",
    borderRadius: "1rem",
    maxWidth: "700px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    padding: "1rem",
    border: "1px solid #e5e7eb",
    borderRadius: "0.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    backgroundColor: "#ffffff",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  };

  const inputStyle: React.CSSProperties = {
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    transition: "all 0.2s ease-in-out",
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: "80px",
    resize: "vertical",
  };

  const inputFocusStyle: React.CSSProperties = {
    borderColor: "#4f46e5",
    boxShadow: "0 0 0 2px rgba(79,70,229,0.2)",
  };

  const buttonBase: React.CSSProperties = {
    padding: "0.65rem 1.25rem",
    fontSize: "0.95rem",
    fontWeight: 600,
    borderRadius: "0.75rem",
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s ease-in-out",
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonBase,
    backgroundColor: "#4f46e5",
    color: "#ffffff",
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonBase,
    backgroundColor: "#e0e7ff",
    color: "#4f46e5",
  };

  const removeButtonStyle: React.CSSProperties = {
    ...buttonBase,
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
  };

  return (
    <form style={formWrapperStyle}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1f2937" }}>Work Experience</h2>

      {fields.map((f, idx) => (
        <div key={f.id} style={cardStyle}>
          <input
            {...register(`workExperience.${idx}.company`)}
            placeholder="Company"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />

          <input
            {...register(`workExperience.${idx}.role`)}
            placeholder="Role"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />

          <input
            {...register(`workExperience.${idx}.startDate`)}
            placeholder="Start Date"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />

          <textarea
            {...register(`workExperience.${idx}.description`)}
            placeholder="Description"
            style={textareaStyle}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />

          <button type="button" style={removeButtonStyle} onClick={() => remove(idx)}>
            Remove
          </button>
        </div>
      ))}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
        <button
          type="button"
          style={secondaryButtonStyle}
          onClick={() =>
            append({
              id: uuidv4(),
              company: "",
              role: "",
              startDate: "",
              description: "",
            })
          }
        >
          Add Work
        </button>

        {/* Stable button (never flickers) */}
        <button type="button" style={primaryButtonStyle}>
          Save Work
        </button>
      </div>

      {/* Clean Auto-Save Status */}
      <div style={{ marginTop: "0.5rem" }}>
        {isSaving ? (
          <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>Auto-saving...</span>
        ) : (
          <span style={{ fontSize: "0.9rem", color: "#10b981" }}>Saved ✓</span>
        )}
      </div>
    </form>
  );
}
