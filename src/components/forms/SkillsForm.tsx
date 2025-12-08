import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCV } from "../../context/useCV";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect, useState, useMemo } from "react";
import { useSyncFormWithCV } from "../../utils/useSyncFormWithCV";

// Schema
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
  const [isSaving, setIsSaving] = useState(false);

  const skillsSlice = useMemo(() => {
    return cv.skills?.length
      ? { skills: cv.skills }
      : { skills: [{ category: "", items: [""] }] };
  }, [cv.skills]);

  const { control, register, watch, reset } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: skillsSlice,
    mode: "onChange",
  });

  useSyncFormWithCV<FormType>(skillsSlice, reset);

  const { fields: skillFields, append: appendSkill, remove: removeSkill } =
    useFieldArray({
      control,
      name: "skills",
    });

  const watchSkills = watch("skills");
  const debouncedSkills = useDebounce(watchSkills, 500);

  useEffect(() => {
    setIsSaving(true);
    setCV((prev) => ({ ...prev, skills: debouncedSkills }));

    const timer = setTimeout(() => setIsSaving(false), 200);
    return () => clearTimeout(timer);
  }, [debouncedSkills, setCV]);

  /* -------------------- Responsive Styles -------------------- */

  const formWrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    padding: "1.5rem",
    width: "100%",
    maxWidth: "760px",
    margin: "0 auto",
    backgroundColor: "#f9fafb",
    borderRadius: "1rem",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  };

  const cardStyle: React.CSSProperties = {
    padding: "1rem",
    border: "1px solid #e5e7eb",
    borderRadius: "0.75rem",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    width: "100%",
    boxSizing: "border-box",
  };

  const inputStyle: React.CSSProperties = {
    padding: "0.65rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    width: "100%",
    transition: "0.2s ease",
    boxSizing: "border-box",
  };

  const inputFocusStyle: React.CSSProperties = {
    borderColor: "#4f46e5",
    boxShadow: "0 0 0 2px rgba(79,70,229,0.2)",
  };

  const rowResponsiveStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",          // <--- Makes rows responsive on mobile
    alignItems: "center",
    width: "100%",
  };

  const buttonBase: React.CSSProperties = {
    padding: "0.6rem 1rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    transition: "0.2s ease",
    boxSizing: "border-box",
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonBase,
    backgroundColor: "#4f46e5",
    color: "#fff",
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
      <h2 style={{ fontSize: "1.6rem", fontWeight: 700 }}>Skills</h2>

      {skillFields.map((skill, skillIdx) => (
        <div key={skill.id} style={cardStyle}>
          {/* Category */}
          <input
            {...register(`skills.${skillIdx}.category` as const)}
            placeholder="Category"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />

          {/* Items */}
          {watchSkills[skillIdx].items.map((_, itemIdx) => (
            <div key={itemIdx} style={rowResponsiveStyle}>
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

          {/* Add Item / Remove Category */}
          <div style={rowResponsiveStyle}>
            <button
              type="button"
              style={secondaryButtonStyle}
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
              onClick={() => removeSkill(skillIdx)}
            >
              Remove Category
            </button>
          </div>
        </div>
      ))}

      {/* Bottom Buttons */}
      <div
        style={{
          display: "flex",
          gap: "0.6rem",
          flexWrap: "wrap",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <button
          type="button"
          style={secondaryButtonStyle}
          onClick={() => appendSkill({ category: "", items: [""] })}
        >
          Add Skill Category
        </button>

        <button type="button" style={primaryButtonStyle}>
          Save Skills
        </button>

        {isSaving && (
          <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>
            Saving…
          </span>
        )}
      </div>
    </form>
  );
}
