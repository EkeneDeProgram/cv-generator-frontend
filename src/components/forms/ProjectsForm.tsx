import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../../utils/validation";
import { z } from "zod";
import { useCV } from "../../context/useCV";
import { v4 as uuidv4 } from "uuid";

const schema = z.object({
  projects: z.array(projectSchema),
});

type FormType = z.infer<typeof schema>;

export default function ProjectsForm() {
  const { cv, setCV } = useCV();

  const { control, register, handleSubmit, } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      projects:
        cv.projects?.length > 0
          ? cv.projects
          : [{ id: uuidv4(), title: "", description: "", link: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const onSave = (data: FormType) =>
    setCV((prev) => ({ ...prev, projects: data.projects }));

  
  // ✅ Inline Styles
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
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1f2937" }}>
        Projects
      </h2>

      {fields.map((f, idx) => (
        <div key={f.id} style={cardStyle}>
          <input
            {...register(`projects.${idx}.title`)}
            placeholder="Project Title"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />
          <textarea
            {...register(`projects.${idx}.description`)}
            placeholder="Description"
            style={textareaStyle}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />
          <input
            {...register(`projects.${idx}.link`)}
            placeholder="Project Link"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />

          <button
            type="button"
            style={removeButtonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = removeHoverStyle.backgroundColor!)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = removeButtonStyle.backgroundColor!)
            }
            onClick={() => remove(idx)}
          >
            Remove
          </button>
        </div>
      ))}

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
        <button
          type="button"
          style={secondaryButtonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = secondaryHoverStyle.backgroundColor!)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = secondaryButtonStyle.backgroundColor!)
          }
          onClick={() =>
            append({ id: uuidv4(), title: "", description: "", link: "" })
          }
        >
          Add Project
        </button>

        <button
          type="submit"
          style={primaryButtonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = primaryHoverStyle.backgroundColor!)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = primaryButtonStyle.backgroundColor!)
          }
        >
          Save Projects
        </button>
      </div>
    </form>
  );
}
