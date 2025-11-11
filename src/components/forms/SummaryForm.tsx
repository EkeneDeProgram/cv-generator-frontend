import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCV } from "../../context/useCV";

const schema = z.object({
  summary: z.string().min(10, "Summary should be at least 10 characters long"),
});

type FormType = z.infer<typeof schema>;

export default function SummaryForm() {
  const { cv, setCV } = useCV();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { summary: cv.summary || "" },
  });

  const onSubmit = (data: FormType) =>
    setCV((prev) => ({ ...prev, summary: data.summary }));

  // Styles
  const formWrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "70vh",
    padding: "2rem",
    backgroundColor: "#f9fafb",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 15px 25px rgba(0,0,0,0.1)",
  };

  const textareaStyle: React.CSSProperties = {
    width: "100%",
    padding: "1rem",
    borderRadius: "0.75rem",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    resize: "vertical",
    fontFamily: "inherit",
    transition: "all 0.2s ease-in-out",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
  };

  const errorTextStyle: React.CSSProperties = {
    color: "#ef4444",
    fontSize: "0.875rem",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "0.75rem",
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s ease-in-out",
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: "#4338ca",
  };

  return (
    <div style={formWrapperStyle}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={formStyle}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", color: "#1f2937" }}>
          Professional Summary
        </h2>
        <textarea
          {...register("summary")}
          placeholder="Write a short professional summary..."
          rows={5}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#4f46e5")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
        />
        {errors.summary && (
          <p style={errorTextStyle}>{errors.summary.message}</p>
        )}
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
        >
          Save Summary
        </button>
      </form>
    </div>
  );
}
