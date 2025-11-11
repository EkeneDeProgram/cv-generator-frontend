import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCV } from "../../context/useCV";

// ✅ Schema
const schema = z.object({
  achievements: z.array(
    z.object({
      value: z.string().min(1, "Achievement cannot be empty"),
    })
  ),
});

type FormType = z.infer<typeof schema>;

export default function AchievementsForm() {
  const { cv, setCV } = useCV();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      achievements: cv.achievements?.length
        ? cv.achievements.map((a) => ({ value: a }))
        : [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray<FormType>({
    control,
    name: "achievements",
  });

  const onSave = (data: FormType) =>
    setCV((prev) => ({
      ...prev,
      achievements: data.achievements.map((a) => a.value),
    }));

  // Inline styles
  const formWrapperStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    maxWidth: "700px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    transition: "all 0.2s ease-in-out",
  };

  const inputFocusStyle: React.CSSProperties = {
    borderColor: "#4f46e5",
    boxShadow: "0 0 0 2px rgba(79,70,229,0.2)",
  };

  const errorTextStyle: React.CSSProperties = {
    color: "#ef4444",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "0.65rem 1.25rem",
    fontSize: "0.95rem",
    fontWeight: 600,
    borderRadius: "0.75rem",
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s ease-in-out",
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#4f46e5",
    color: "#ffffff",
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#e0e7ff",
    color: "#4f46e5",
  };

  const removeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
  };

  const removeButtonHoverStyle: React.CSSProperties = {
    backgroundColor: "#fca5a5",
  };

  return (
    <form onSubmit={handleSubmit(onSave)} style={formWrapperStyle}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1f2937" }}>
        Achievements
      </h2>

      {fields.map((f, idx) => (
        <div key={f.id} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input
              {...register(`achievements.${idx}.value` as const)}
              placeholder={`Achievement ${idx + 1}`}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
            />
            <button
              type="button"
              style={removeButtonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = removeButtonHoverStyle.backgroundColor!)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = removeButtonStyle.backgroundColor!)
              }
              onClick={() => remove(idx)}
            >
              Remove
            </button>
          </div>
          {errors.achievements?.[idx]?.value && (
            <span style={errorTextStyle}>{errors.achievements[idx]?.value?.message}</span>
          )}
        </div>
      ))}

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
        <button
          type="button"
          style={secondaryButtonStyle}
          onClick={() => append({ value: "" })}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c7d2fe")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = secondaryButtonStyle.backgroundColor!)}
        >
          Add Achievement
        </button>

        <button
          type="submit"
          style={primaryButtonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = primaryButtonStyle.backgroundColor!)}
        >
          Save Achievements
        </button>
      </div>
    </form>
  );
}
