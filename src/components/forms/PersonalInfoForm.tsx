import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../../utils/validation";
import { z } from "zod";
import { useCV } from "../../context/useCV";
import type { PersonalInfo } from "../../types/cv";

type FormType = z.infer<typeof personalInfoSchema> & PersonalInfo;

export default function PersonalInfoForm() {
  const { cv, setCV } = useCV();

  const { register, handleSubmit, formState: { errors } } = useForm<FormType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: cv.personalInfo,
  });

  const onSubmit = (data: FormType) =>
    setCV(prev => ({ ...prev, personalInfo: data }));

  // ===== Inline Styles =====
  const formWrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f9fafb",
    borderRadius: "1rem",
    fontFamily: "Arial, sans-serif",
  };

  const inputStyle: React.CSSProperties = {
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    width: "100%",
    transition: "all 0.2s ease-in-out",
  };

  const inputFocusStyle: React.CSSProperties = {
    borderColor: "#4f46e5",
    boxShadow: "0 0 0 2px rgba(79,70,229,0.2)",
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 600,
    marginBottom: "0.25rem",
    color: "#1f2937",
  };

  const errorTextStyle: React.CSSProperties = {
    color: "#b91c1c",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "0.75rem",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    transition: "all 0.2s ease-in-out",
    marginTop: "1rem",
    alignSelf: "flex-start",
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: "#4338ca",
  };

  return (
    <form onBlur={handleSubmit(onSubmit)} style={formWrapperStyle}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1f2937", marginBottom: "1rem" }}>
        Personal Information
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={labelStyle}>Full Name</label>
        <input
          {...register("name")}
          placeholder="Full name"
          style={inputStyle}
          onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
        />
        {errors.name && <span style={errorTextStyle}>{errors.name.message}</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={labelStyle}>Email</label>
        <input
          {...register("email")}
          placeholder="Email"
          style={inputStyle}
          onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
        />
        {errors.email && <span style={errorTextStyle}>{errors.email.message}</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={labelStyle}>Contact Number</label>
        <input
          {...register("contact")}
          placeholder="Contact"
          style={inputStyle}
          onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
        />
        {errors.contact && <span style={errorTextStyle}>{errors.contact.message}</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={labelStyle}>LinkedIn</label>
        <input
          {...register("linkedin")}
          placeholder="LinkedIn (url)"
          style={inputStyle}
          onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
        />
        {errors.linkedin && <span style={errorTextStyle}>{errors.linkedin.message}</span>}
      </div>

      <button
        type="button"
        style={buttonStyle}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)
        }
        onClick={handleSubmit(onSubmit)}
      >
        Save Personal Info
      </button>
    </form>
  );
}


