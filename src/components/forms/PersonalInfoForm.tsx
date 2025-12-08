// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { personalInfoSchema } from "../../utils/validation";
// import { z } from "zod";
// import { useCV } from "../../context/useCV";
// import { useState, useEffect } from "react";
// import { useSyncFormWithCV } from "../../utils/useSyncFormWithCV";

// type FormType = z.infer<typeof personalInfoSchema>;

// export default function PersonalInfoForm() {
//   const { cv, setCV } = useCV();
//   const [isSaving, setIsSaving] = useState(false);

//   const {
//     register,
//     watch,
//     reset,
//     formState: { errors, isDirty },
//   } = useForm<FormType>({
//     resolver: zodResolver(personalInfoSchema),
//     defaultValues: cv.personalInfo,
//     mode: "onChange",
//   });

//   // Sync form with CV slice safely
//   useSyncFormWithCV<FormType>(cv.personalInfo, reset);

//   const watchedFields = watch();

//   // Auto-save safely only if values really changed
//   useEffect(() => {
//     if (!isDirty) return;

//     const hasChanged = JSON.stringify(cv.personalInfo) !== JSON.stringify(watchedFields);
//     if (!hasChanged) return;

//     setIsSaving(true);

//     setCV(prev => ({
//       ...prev,
//       personalInfo: watchedFields,
//     }));

//     setIsSaving(false);
//   }, [watchedFields, cv.personalInfo, setCV, isDirty]);

//   // Inline styles
//   const formWrapperStyle: React.CSSProperties = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "1rem",
//     padding: "2rem",
//     maxWidth: "600px",
//     margin: "0 auto",
//     backgroundColor: "#f9fafb",
//     borderRadius: "1rem",
//     fontFamily: "Arial, sans-serif",
//   };

//   const inputStyle: React.CSSProperties = {
//     padding: "0.75rem 1rem",
//     borderRadius: "0.5rem",
//     border: "1px solid #d1d5db",
//     fontSize: "1rem",
//     width: "100%",
//     transition: "all 0.2s ease-in-out",
//   };

//   const inputFocusStyle: React.CSSProperties = {
//     borderColor: "#4f46e5",
//     boxShadow: "0 0 0 2px rgba(79,70,229,0.2)",
//   };

//   const labelStyle: React.CSSProperties = {
//     fontWeight: 600,
//     marginBottom: "0.25rem",
//     color: "#1f2937",
//   };

//   const errorTextStyle: React.CSSProperties = {
//     color: "#b91c1c",
//     fontSize: "0.875rem",
//     marginTop: "0.25rem",
//   };

//   const buttonStyle: React.CSSProperties = {
//     padding: "0.75rem 1.5rem",
//     fontSize: "1rem",
//     fontWeight: 600,
//     borderRadius: "0.75rem",
//     border: "none",
//     cursor: isSaving ? "not-allowed" : "pointer",
//     backgroundColor: "#4f46e5",
//     color: "#ffffff",
//     transition: "all 0.2s ease-in-out",
//     marginTop: "1rem",
//     alignSelf: "flex-start",
//     opacity: isSaving ? 0.6 : 1,
//   };

//   const buttonHoverStyle: React.CSSProperties = {
//     backgroundColor: "#4338ca",
//   };

//   return (
//     <form style={formWrapperStyle}>
//       <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1f2937", marginBottom: "1rem" }}>
//         Personal Information
//       </h2>

//       {["name", "email", "contact", "linkedin"].map(field => (
//         <div key={field} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
//           <label style={labelStyle}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//           <input
//             {...register(field as keyof FormType)}
//             placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//             style={inputStyle}
//             onFocus={e => Object.assign(e.currentTarget.style, inputFocusStyle)}
//             onBlur={e => (e.currentTarget.style.borderColor = "#d1d5db")}
//           />
//           {errors[field as keyof FormType] && (
//             <span style={errorTextStyle}>{errors[field as keyof FormType]?.message}</span>
//           )}
//         </div>
//       ))}

//       <button
//         type="button"
//         style={buttonStyle}
//         onMouseOver={e => !isSaving && (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
//         onMouseOut={e => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
//       >
//         {isSaving ? "Saving..." : "Save Personal Info"}
//       </button>
//     </form>
//   );
// }



import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../../utils/validation";
import { z } from "zod";
import { useCV } from "../../context/useCV";
import { useState, useEffect } from "react";
import { useSyncFormWithCV } from "../../utils/useSyncFormWithCV";

type FormType = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoForm() {
  const { cv, setCV } = useCV();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: cv.personalInfo,
    mode: "onChange",
  });

  // Sync form with CV
  useSyncFormWithCV<FormType>(cv.personalInfo, reset);

  const watchedFields = watch();

  useEffect(() => {
    if (!isDirty) return;

    const hasChanged = JSON.stringify(cv.personalInfo) !== JSON.stringify(watchedFields);
    if (!hasChanged) return;

    setIsSaving(true);

    setCV(prev => ({
      ...prev,
      personalInfo: watchedFields,
    }));

    setTimeout(() => setIsSaving(false), 300);
  }, [watchedFields, cv.personalInfo, setCV, isDirty]);


  /* ---------- Responsive Styles ---------- */

  const formWrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1.5rem",
    width: "100%",
    maxWidth: "700px",
    margin: "0 auto",
    backgroundColor: "#f9fafb",
    borderRadius: "1rem",
    fontFamily: "Arial, sans-serif",

    // Mobile-friendly spacing
    boxSizing: "border-box",
  };

  const inputStyle: React.CSSProperties = {
    padding: "0.85rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    width: "100%",
    outline: "none",
    transition: "0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 600,
    color: "#1f2937",
  };

  const errorTextStyle: React.CSSProperties = {
    color: "#b91c1c",
    fontSize: "0.85rem",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "0.9rem 1.5rem",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "0.75rem",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    cursor: isSaving ? "not-allowed" : "pointer",
    transition: "0.2s ease",
    marginTop: "1rem",

    // Full width on mobile, auto on desktop
    width: "100%",
    maxWidth: "220px",
  };

  return (
    <form style={formWrapperStyle}>
      <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1f2937" }}>
        Personal Information
      </h2>

      {["name", "email", "contact", "linkedin"].map(field => (
        <div key={field} style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          <label style={labelStyle}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>

          <input
            {...register(field as keyof FormType)}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            style={inputStyle}
            onFocus={e => {
              e.currentTarget.style.borderColor = "#4f46e5";
              e.currentTarget.style.boxShadow = "0 0 0 2px rgba(79,70,229,0.15)";
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />

          {errors[field as keyof FormType] && (
            <span style={errorTextStyle}>
              {errors[field as keyof FormType]?.message}
            </span>
          )}
        </div>
      ))}

      <button
        type="button"
        style={buttonStyle}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save Personal Info"}
      </button>
    </form>
  );
}
