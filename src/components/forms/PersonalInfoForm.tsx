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

    const hasChanged =
      JSON.stringify(cv.personalInfo) !== JSON.stringify(watchedFields);
    if (!hasChanged) return;

    setIsSaving(true);

    setCV((prev) => ({
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
    width: "100%",
    maxWidth: "220px",
  };

  return (
    <form style={formWrapperStyle}>
      <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1f2937" }}>
        Personal Information
      </h2>

      {[
        { name: "name", label: "Name" },
        { name: "email", label: "Email" },
        { name: "contact", label: "Contact" },
        { name: "address", label: "Address" },
        { name: "linkedin", label: "LinkedIn (optional)" },
        { name: "github", label: "GitHub (optional)" },
        { name: "portfolio", label: "Portfolio (optional)" },
      ].map(({ name, label }) => (
        <div
          key={name}
          style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}
        >
          <label style={labelStyle}>{label}</label>

          <input
            {...register(name as keyof FormType)}
            placeholder={label}
            style={inputStyle}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#4f46e5";
              e.currentTarget.style.boxShadow =
                "0 0 0 2px rgba(79,70,229,0.15)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />

          {errors[name as keyof FormType] && (
            <span style={errorTextStyle}>
              {errors[name as keyof FormType]?.message}
            </span>
          )}
        </div>
      ))}

      {/* Social Links (Optional) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <label style={labelStyle}>
          Social Links (optional, comma separated)
        </label>

        <input
          placeholder="https://twitter.com/you, https://medium.com/@you"
          style={inputStyle}
          defaultValue={(cv.personalInfo.socialLinks || []).join(", ")}
          onChange={(e) => {
            const links = e.target.value
              .split(",")
              .map((v) => v.trim())
              .filter(Boolean);

            setCV((prev) => ({
              ...prev,
              personalInfo: {
                ...prev.personalInfo,
                socialLinks: links,
              },
            }));
          }}
        />
      </div>

      <button type="button" style={buttonStyle} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Personal Info"}
      </button>
    </form>
  );
}
