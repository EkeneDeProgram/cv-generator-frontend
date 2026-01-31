import { useCV } from "../../context/useCV";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect, useState } from "react";

export default function StyleSettings() {
  const { cv, setCV } = useCV();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const getSafeColor = (color: string | undefined) => {
    const hexPattern = /^#[0-9A-Fa-f]{6}$/;
    return color && hexPattern.test(color) ? color : "#008080";
  };

  const debouncedCV = useDebounce(cv, 500);

  useEffect(() => {
    setIsSaving(true);
    setSaved(false);

    const timer = setTimeout(() => {
      setIsSaving(false);
      setSaved(true);

      const doneTimer = setTimeout(() => setSaved(false), 1200);
      return () => clearTimeout(doneTimer);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedCV]);

  const handleChange = (field: keyof typeof cv, value: string) => {
    setCV((prev) => ({ ...prev, [field]: value }));
  };

  // Container
  const containerStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "1rem",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
    fontWeight: 700,
    color: "#1f2937",
    textAlign: "left",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.95rem",
    fontWeight: 600,
    marginBottom: "0.35rem",
    color: "#4b5563",
  };

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.55rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    cursor: "pointer",
  };

  const colorInputStyle: React.CSSProperties = {
    width: "3rem",
    height: "2rem",
    border: "none",
    cursor: "pointer",
    borderRadius: "0.25rem",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "0.75rem",
    backgroundColor: saved ? "#10b981" : "#4f46e5",
    color: "#ffffff",
    cursor: isSaving ? "not-allowed" : "pointer",
    border: "none",
    transition: "all 0.25s ease-in-out",
    width: "fit-content",
    opacity: isSaving ? 0.6 : 1,
  };

  const templateTaglines: Record<string, string> = {
    modern: "Sleek, minimalist, and contemporary layout for a clean professional look.",
    card: "Organized card-based layout for clear section separation and easy reading.",
    twoColumn: "Two-column layout for a structured, information-rich CV with elegant flow.",
  };

  return (
    <>
      {/* RESPONSIVE MEDIA QUERIES */}
      <style>
        {`
          @media (max-width: 480px) {
            .style-container {
              padding: 1rem !important;
              border-radius: 0.75rem;
            }

            .style-input,
            .style-select {
              font-size: 0.95rem !important;
              padding: 0.45rem !important;
            }

            .style-button {
              width: 100% !important;
              text-align: center;
            }
          }

          @media (min-width: 768px) {
            .style-container {
              padding: 2rem !important;
            }
          }
        `}
      </style>

      <div className="style-container" style={containerStyle}>
        <h2 style={titleStyle}>Style Settings</h2>

        {/* Template */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Template</label>
          <select
            className="style-select"
            value={cv.template}
            onChange={(e) => handleChange("template", e.target.value)}
            style={selectStyle}
          >
            <option value="modern">Moderno</option>
            <option value="card">Cardio</option>
            <option value="twoColumn">Bifrost</option>
          </select>

          <span style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "0.25rem" }}>
            {templateTaglines[cv.template]}
          </span>
        </div>

        {/* Color Scheme */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Color Scheme</label>
          <input
            className="style-input"
            type="color"
            value={getSafeColor(cv.colorScheme)}
            onChange={(e) => handleChange("colorScheme", e.target.value)}
            style={colorInputStyle}
          />
        </div>

        {/* Font Style */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Font Style</label>
          <select
            className="style-select"
            value={cv.fontStyle}
            onChange={(e) => handleChange("fontStyle", e.target.value)}
            style={selectStyle}
          >
            <option value="Arial">Arial</option>
            <option value="Roboto">Roboto</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Open Sans">Open Sans</option>
          </select>
        </div>

        <button className="style-button" style={buttonStyle} disabled={isSaving}>
          {isSaving ? "Saving..." : saved ? "✔ Saved" : "Save Settings"}
        </button>
      </div>
    </>
  );
}
