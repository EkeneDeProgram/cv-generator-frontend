import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workItemSchema } from "../../utils/validation";
import { z } from "zod";
import { useCV } from "../../context/useCV";
import { v4 as uuidv4 } from "uuid";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect, useState, useRef } from "react";

// Schema
const schema = z.object({
  workExperience: z.array(workItemSchema),
});
type FormType = z.infer<typeof schema>;

export default function WorkExperienceForm() {
  const { cv, setCV } = useCV();
  const [isSaving, setIsSaving] = useState(false);

  const hasMountedRef = useRef(false);

  // Form setup
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience",
  });

  const watched = watch("workExperience");
  const debounced = useDebounce(watched, 500);

  // Sync CV → Form ONLY when CV changes externally
  // We intentionally do NOT include `watched` in deps.
 // This effect must only run when CV changes externally.
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const formStr = JSON.stringify(watched);
    const cvStr = JSON.stringify(cv.workExperience);

    if (formStr !== cvStr) {
      reset({
        workExperience:
          cv.workExperience.length > 0
            ? cv.workExperience
            : [{ id: uuidv4(), company: "", role: "", startDate: "", description: "" }],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cv.workExperience, reset]); // intentionally NOT watching `watched`

  // Auto-save Form → CV (guarded)
  useEffect(() => {
    const hasChanged =
      JSON.stringify(cv.workExperience) !== JSON.stringify(debounced);

    if (!hasChanged) return;

    setIsSaving(true);

    setCV((prev) => ({
      ...prev,
      workExperience: debounced,
    }));

    const timer = setTimeout(() => setIsSaving(false), 500);
    return () => clearTimeout(timer);
  }, [debounced, cv.workExperience, setCV]);

  // Styles
  const wrapper: React.CSSProperties = {
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

  const card: React.CSSProperties = {
    padding: "1rem",
    border: "1px solid #e5e7eb",
    borderRadius: "0.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    backgroundColor: "#ffffff",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  };

  const input: React.CSSProperties = {
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    transition: "all 0.2s ease-in-out",
  };

  const textarea: React.CSSProperties = {
    ...input,
    minHeight: "80px",
    resize: "vertical",
  };

  const focusStyle = {
    borderColor: "#4f46e5",
    boxShadow: "0 0 0 2px rgba(79,70,229,0.2)",
  };

  const btnBase: React.CSSProperties = {
    padding: "0.65rem 1.25rem",
    fontSize: "0.95rem",
    fontWeight: 600,
    borderRadius: "0.75rem",
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s ease-in-out",
  };

  const addBtn = { ...btnBase, backgroundColor: "#e0e7ff", color: "#4f46e5" };
  const saveBtn = { ...btnBase, backgroundColor: "#4f46e5", color: "#ffffff" };
  const removeBtn = { ...btnBase, backgroundColor: "#fee2e2", color: "#b91c1c" };

  return (
    <form className="work-wrapper" style={wrapper}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1f2937" }}>
        Work Experience
      </h2>

      {fields.map((f, idx) => (
        <div key={f.id} className="work-card" style={card}>
          <input
            {...register(`workExperience.${idx}.company`)}
            placeholder="Company"
            style={input}
            onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />

          <input
            {...register(`workExperience.${idx}.role`)}
            placeholder="Role"
            style={input}
            onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />

          <input
            {...register(`workExperience.${idx}.startDate`)}
            placeholder="Start Date"
            style={input}
            onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />

          <textarea
            {...register(`workExperience.${idx}.description`)}
            placeholder="Description"
            style={textarea}
            onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />

          <button type="button" style={removeBtn} onClick={() => remove(idx)}>
            Remove
          </button>
        </div>
      ))}

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <button
          type="button"
          style={addBtn}
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

        <button type="button" style={saveBtn}>
          Save Work
        </button>
      </div>

      <div style={{ marginTop: "0.5rem" }}>
        {isSaving ? (
          <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
            Auto-saving...
          </span>
        ) : (
          <span style={{ fontSize: "0.9rem", color: "#10b981" }}>
            Saved ✓
          </span>
        )}
      </div>
    </form>
  );
}
