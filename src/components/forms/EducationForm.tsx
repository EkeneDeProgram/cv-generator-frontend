// import { useFieldArray, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { eduItemSchema } from "../../utils/validation";
// import { z } from "zod";
// import { useCV } from "../../context/useCV";
// import { v4 as uuidv4 } from "uuid";
// import { useEffect, useState, useMemo } from "react";
// import { useDebounce } from "../../hooks/useDebounce";
// import { useSyncFormWithCV } from "../../utils/useSyncFormWithCV";

// const schema = z.object({
//   education: z.array(eduItemSchema),
// });

// type FormType = z.infer<typeof schema>;

// export default function EducationForm() {
//   const { cv, setCV } = useCV();
//   const [isSaving, setIsSaving] = useState(false);

//   const { control, register, watch, reset, formState: { errors, isDirty } } = useForm<FormType>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       education:
//         cv.education?.length > 0
//           ? cv.education
//           : [{ id: uuidv4(), institution: "", degree: "", startDate: "", endDate: "" }],
//     },
//     mode: "onChange",
//   });

//   // Memoize the CV slice to prevent infinite loops
//   const educationSlice = useMemo(() => {
//     return cv.education?.length > 0
//       ? { education: cv.education }
//       : { education: [{ id: uuidv4(), institution: "", degree: "", startDate: "", endDate: "" }] };
//   }, [cv.education]);

//   // Sync form safely
//   useSyncFormWithCV<FormType>(educationSlice, reset);

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "education",
//   });

//   const watchedEducation = watch("education");
//   const debouncedEducation = useDebounce(watchedEducation, 500);

//   // Auto-save debounced changes
//   useEffect(() => {
//     if (!isDirty) return;
//     setIsSaving(true);
//     setCV(prev => ({
//       ...prev,
//       education: debouncedEducation,
//     }));
//     const timer = setTimeout(() => setIsSaving(false), 200);
//     return () => clearTimeout(timer);
//   }, [debouncedEducation, setCV, isDirty]);

//   // Inline Styles
//   const formWrapperStyle: React.CSSProperties = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "1.5rem",
//     padding: "2rem",
//     backgroundColor: "#f9fafb",
//     borderRadius: "1rem",
//     maxWidth: "700px",
//     margin: "0 auto",
//     fontFamily: "Arial, sans-serif",
//   };

//   const cardStyle: React.CSSProperties = {
//     padding: "1rem",
//     border: "1px solid #e5e7eb",
//     borderRadius: "0.75rem",
//     display: "flex",
//     flexDirection: "column",
//     gap: "0.75rem",
//     backgroundColor: "#ffffff",
//     boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
//   };

//   const inputStyle: React.CSSProperties = {
//     padding: "0.75rem 1rem",
//     borderRadius: "0.5rem",
//     border: "1px solid #d1d5db",
//     fontSize: "1rem",
//     transition: "all 0.2s ease-in-out",
//   };

//   const inputFocusStyle: React.CSSProperties = {
//     borderColor: "#4f46e5",
//     boxShadow: "0 0 0 2px rgba(79,70,229,0.2)",
//   };

//   const buttonStyle: React.CSSProperties = {
//     padding: "0.65rem 1.25rem",
//     fontSize: "0.95rem",
//     fontWeight: 600,
//     borderRadius: "0.75rem",
//     cursor: "pointer",
//     border: "none",
//     transition: "all 0.2s ease-in-out",
//   };

//   const primaryButtonStyle: React.CSSProperties = {
//     ...buttonStyle,
//     backgroundColor: "#4f46e5",
//     color: "#ffffff",
//     opacity: isSaving ? 0.6 : 1,
//     cursor: isSaving ? "not-allowed" : "pointer",
//   };

//   const primaryHoverStyle: React.CSSProperties = {
//     backgroundColor: "#4338ca",
//   };

//   const secondaryButtonStyle: React.CSSProperties = {
//     ...buttonStyle,
//     backgroundColor: "#e0e7ff",
//     color: "#4f46e5",
//   };

//   const secondaryHoverStyle: React.CSSProperties = {
//     backgroundColor: "#c7d2fe",
//   };

//   const removeButtonStyle: React.CSSProperties = {
//     ...buttonStyle,
//     backgroundColor: "#fee2e2",
//     color: "#b91c1c",
//   };

//   const removeHoverStyle: React.CSSProperties = {
//     backgroundColor: "#fca5a5",
//   };

//   return (
//     <form style={formWrapperStyle}>
//       <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1f2937" }}>Education</h2>

//       {fields.map((f, idx) => (
//         <div key={f.id} style={cardStyle}>
//           <input
//             {...register(`education.${idx}.institution`)}
//             placeholder="Institution"
//             style={inputStyle}
//             onFocus={e => Object.assign(e.currentTarget.style, inputFocusStyle)}
//             onBlur={e => (e.currentTarget.style.borderColor = "#d1d5db")}
//           />
//           {errors.education?.[idx]?.institution && (
//             <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>
//               {errors.education[idx]?.institution?.message}
//             </p>
//           )}

//           <input
//             {...register(`education.${idx}.degree`)}
//             placeholder="Degree"
//             style={inputStyle}
//             onFocus={e => Object.assign(e.currentTarget.style, inputFocusStyle)}
//             onBlur={e => (e.currentTarget.style.borderColor = "#d1d5db")}
//           />
//           {errors.education?.[idx]?.degree && (
//             <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>
//               {errors.education[idx]?.degree?.message}
//             </p>
//           )}

//           <div style={{ display: "flex", gap: "0.5rem" }}>
//             <input
//               {...register(`education.${idx}.startDate`)}
//               placeholder="Start Date"
//               style={{ ...inputStyle, flex: 1 }}
//               onFocus={e => Object.assign(e.currentTarget.style, inputFocusStyle)}
//               onBlur={e => (e.currentTarget.style.borderColor = "#d1d5db")}
//             />
//             <input
//               {...register(`education.${idx}.endDate`)}
//               placeholder="End Date"
//               style={{ ...inputStyle, flex: 1 }}
//               onFocus={e => Object.assign(e.currentTarget.style, inputFocusStyle)}
//               onBlur={e => (e.currentTarget.style.borderColor = "#d1d5db")}
//             />
//           </div>

//           <button
//             type="button"
//             style={removeButtonStyle}
//             onMouseOver={e => (e.currentTarget.style.backgroundColor = removeHoverStyle.backgroundColor!)}
//             onMouseOut={e => (e.currentTarget.style.backgroundColor = removeButtonStyle.backgroundColor!)}
//             onClick={() => remove(idx)}
//           >
//             Remove
//           </button>
//         </div>
//       ))}

//       <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
//         <button
//           type="button"
//           style={secondaryButtonStyle}
//           onMouseOver={e => (e.currentTarget.style.backgroundColor = secondaryHoverStyle.backgroundColor!)}
//           onMouseOut={e => (e.currentTarget.style.backgroundColor = secondaryButtonStyle.backgroundColor!)}
//           onClick={() =>
//             append({ id: uuidv4(), institution: "", degree: "", startDate: "", endDate: "" })
//           }
//         >
//           Add Education
//         </button>

//         <button
//           type="button"
//           disabled={isSaving}
//           style={primaryButtonStyle}
//           onMouseOver={e => !isSaving && (e.currentTarget.style.backgroundColor = primaryHoverStyle.backgroundColor!)}
//           onMouseOut={e => (e.currentTarget.style.backgroundColor = primaryButtonStyle.backgroundColor!)}
//         >
//           {isSaving ? "Saving..." : "Save Education"}
//         </button>
//       </div>
//     </form>
//   );
// }




import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eduItemSchema } from "../../utils/validation";
import { z } from "zod";
import { useCV } from "../../context/useCV";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useMemo } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useSyncFormWithCV } from "../../utils/useSyncFormWithCV";

const schema = z.object({
  education: z.array(eduItemSchema),
});

type FormType = z.infer<typeof schema>;

export default function EducationForm() {
  const { cv, setCV } = useCV();
  const [isSaving, setIsSaving] = useState(false);

  const { control, register, watch, reset, formState: { errors, isDirty } } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      education:
        cv.education?.length > 0
          ? cv.education
          : [{ id: uuidv4(), institution: "", degree: "", startDate: "", endDate: "" }],
    },
    mode: "onChange",
  });

  const educationSlice = useMemo(() => {
    return cv.education?.length > 0
      ? { education: cv.education }
      : { education: [{ id: uuidv4(), institution: "", degree: "", startDate: "", endDate: "" }] };
  }, [cv.education]);

  useSyncFormWithCV<FormType>(educationSlice, reset);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const watchedEducation = watch("education");
  const debounceEducation = useDebounce(watchedEducation, 500);

  useEffect(() => {
    if (!isDirty) return;
    setIsSaving(true);
    setCV(prev => ({
      ...prev,
      education: debounceEducation,
    }));
    const timer = setTimeout(() => setIsSaving(false), 200);
    return () => clearTimeout(timer);
  }, [debounceEducation, isDirty, setCV]);

  return (
    <>
      {/* Responsive CSS */}
      <style>
        {`
          .edu-form-wrapper {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding: 1.25rem;
            background: #f9fafb;
            border-radius: 1rem;
            max-width: 700px;
            margin: 0 auto;
            width: 100%;
          }

          @media (min-width: 640px) {
            .edu-form-wrapper {
              padding: 2rem;
            }
          }

          .edu-card {
            padding: 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 0.75rem;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          }

          .edu-input {
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            border: 1px solid #d1d5db;
            font-size: 1rem;
            width: 100%;
          }

          .edu-row {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          @media (min-width: 600px) {
            .edu-row {
              flex-direction: row;
            }
          }

          .btn {
            padding: 0.75rem 1.2rem;
            border-radius: 0.75rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: 0.2s;
            width: 100%;
          }

          @media (min-width: 600px) {
            .btn {
              width: auto;
            }
          }

          .btn-primary {
            background: #4f46e5;
            color: white;
          }

          .btn-primary:hover {
            background: #4338ca;
          }

          .btn-secondary {
            background: #e0e7ff;
            color: #4f46e5;
          }

          .btn-secondary:hover {
            background: #c7d2fe;
          }

          .btn-remove {
            background: #fee2e2;
            color: #b91c1c;
          }

          .btn-remove:hover {
            background: #fca5a5;
          }
        `}
      </style>

      <form className="edu-form-wrapper">
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1f2937" }}>
          Education
        </h2>

        {fields.map((f, idx) => (
          <div key={f.id} className="edu-card">
            <input
              {...register(`education.${idx}.institution`)}
              className="edu-input"
              placeholder="Institution"
            />
            {errors.education?.[idx]?.institution && (
              <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>
                {errors.education[idx].institution?.message}
              </p>
            )}

            <input
              {...register(`education.${idx}.degree`)}
              className="edu-input"
              placeholder="Degree"
            />

            {errors.education?.[idx]?.degree && (
              <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>
                {errors.education[idx].degree?.message}
              </p>
            )}

            <div className="edu-row">
              <input
                {...register(`education.${idx}.startDate`)}
                className="edu-input"
                placeholder="Start Date"
              />

              <input
                {...register(`education.${idx}.endDate`)}
                className="edu-input"
                placeholder="End Date"
              />
            </div>

            <button className="btn btn-remove" type="button" onClick={() => remove(idx)}>
              Remove
            </button>
          </div>
        ))}

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              append({ id: uuidv4(), institution: "", degree: "", startDate: "", endDate: "" })
            }
          >
            Add Education
          </button>

          <button className="btn btn-primary" disabled={isSaving}>
            {isSaving ? "Saving…" : "Save Education"}
          </button>
        </div>
      </form>
    </>
  );
}
