import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCV } from "../../context/useCV";

// ✅ Schema
const skillSchema = z.object({
  category: z.string().min(1, "Category is required"),
  items: z.array(z.string().min(1, "At least one skill is required")),
});

const formSchema = z.object({
  skills: z.array(skillSchema),
});

type FormType = z.infer<typeof formSchema>;

export default function SkillsForm() {
  const { cv, setCV } = useCV();

  const { control, register, handleSubmit, watch, formState: { errors } } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: cv.skills?.length ? cv.skills : [{ category: "", items: [""] }],
    },
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: "skills",
  });

  const watchSkills = watch("skills");

  const onSave = (data: FormType) => setCV((prev) => ({ ...prev, skills: data.skills }));

  // ✅ Inline Styles
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

  const cardStyle: React.CSSProperties = {
    padding: "1rem",
    border: "1px solid #e5e7eb",
    borderRadius: "0.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
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

  const primaryHoverStyle: React.CSSProperties = {
    backgroundColor: "#4338ca",
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#e0e7ff",
    color: "#4f46e5",
  };

  const secondaryHoverStyle: React.CSSProperties = {
    backgroundColor: "#c7d2fe",
  };

  const removeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
  };

  const removeHoverStyle: React.CSSProperties = {
    backgroundColor: "#fca5a5",
  };

  return (
    <form onSubmit={handleSubmit(onSave)} style={formWrapperStyle}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1f2937" }}>Skills</h2>

      {skillFields.map((skill, skillIdx) => (
        <div key={skill.id} style={cardStyle}>
          {/* Category Input */}
          <input
            {...register(`skills.${skillIdx}.category` as const)}
            placeholder="Category (e.g. Programming)"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />
          {errors.skills?.[skillIdx]?.category && (
            <p style={errorTextStyle}>{errors.skills[skillIdx]?.category?.message}</p>
          )}

          {/* Skill Items */}
          {watchSkills[skillIdx].items.map((_, itemIdx) => (
            <div key={itemIdx} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input
                {...register(`skills.${skillIdx}.items.${itemIdx}` as const)}
                placeholder={`Skill ${itemIdx + 1}`}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
              />
              <button
                type="button"
                style={removeButtonStyle}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = removeHoverStyle.backgroundColor!)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = removeButtonStyle.backgroundColor!)}
                onClick={() => {
                  const updatedItems = [...watchSkills[skillIdx].items];
                  updatedItems.splice(itemIdx, 1);
                  setCV((prev) => {
                    const newSkills = [...prev.skills];
                    newSkills[skillIdx].items = updatedItems;
                    return { ...prev, skills: newSkills };
                  });
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Add Skill / Remove Category Buttons */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            <button
              type="button"
              style={secondaryButtonStyle}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = secondaryHoverStyle.backgroundColor!)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = secondaryButtonStyle.backgroundColor!)}
              onClick={() => {
                const updatedItems = [...watchSkills[skillIdx].items, ""];
                setCV((prev) => {
                  const newSkills = [...prev.skills];
                  newSkills[skillIdx].items = updatedItems;
                  return { ...prev, skills: newSkills };
                });
              }}
            >
              Add Skill
            </button>

            <button
              type="button"
              style={removeButtonStyle}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = removeHoverStyle.backgroundColor!)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = removeButtonStyle.backgroundColor!)}
              onClick={() => removeSkill(skillIdx)}
            >
              Remove Category
            </button>
          </div>
        </div>
      ))}

      {/* Add Skill Category / Save */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
        <button
          type="button"
          style={secondaryButtonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = secondaryHoverStyle.backgroundColor!)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = secondaryButtonStyle.backgroundColor!)}
          onClick={() => appendSkill({ category: "", items: [""] })}
        >
          Add Skill Category
        </button>

        <button
          type="submit"
          style={primaryButtonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = primaryHoverStyle.backgroundColor!)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = primaryButtonStyle.backgroundColor!)}
        >
          Save Skills
        </button>
      </div>
    </form>
  );
}
