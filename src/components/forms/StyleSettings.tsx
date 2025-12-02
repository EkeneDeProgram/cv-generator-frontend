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

  // Auto save effect with checkmark
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

  // Map frontend template names to backend template values
  const templateMap: Record<string, "modern" | "card" | "twoColumn"> = {
    Moderno: "modern",
    Cardio: "card",
    Bifrost: "twoColumn",
  };

  const handleChange = (field: keyof typeof cv, value: string) => {
    if (field === "template") {
      setCV((prev) => ({ ...prev, template: templateMap[value] }));
    } else {
      setCV((prev) => ({ ...prev, [field]: value }));
    }
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#1f2937",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#4b5563",
    marginBottom: "0.5rem",
  };

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    transition: "all 0.2s ease-in-out",
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
    alignSelf: "flex-start",
    opacity: isSaving ? 0.6 : 1,
  };

  const templateTaglines: Record<string, string> = {
    Moderno: "Sleek, minimalist, and contemporary layout for a clean professional look.",
    Cardio: "Organized card-based layout for clear section separation and easy reading.",
    Bifrost: "Two-column layout for a structured, information-rich CV with elegant flow.",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Style Settings</h2>

      {/* Template */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <label style={labelStyle}>Template</label>
        <select
          value={cv.template}
          onChange={(e) => handleChange("template", e.target.value)}
          style={selectStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#4f46e5")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
        >
          <option value="Moderno">Moderno</option>
          <option value="Cardio">Cardio</option>
          <option value="Bifrost">Bifrost</option>
        </select>
        {/* Tagline for selected template */}
        <span style={{ fontSize: "0.9rem", color: "#6b7280", marginTop: "0.25rem" }}>
          {templateTaglines[cv.template]}
        </span>
      </div>

      {/* Color Scheme */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <label style={labelStyle}>Color Scheme</label>
        <input
          type="color"
          value={getSafeColor(cv.colorScheme)}
          onChange={(e) => handleChange("colorScheme", e.target.value)}
          style={colorInputStyle}
        />
      </div>

      {/* Font Style */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <label style={labelStyle}>Font Style</label>
        <select
          value={cv.fontStyle}
          onChange={(e) => handleChange("fontStyle", e.target.value)}
          style={selectStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#4f46e5")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
        >
          <option value="Arial">Arial</option>
          <option value="Roboto">Roboto</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Open Sans">Open Sans</option>
        </select>
      </div>

      {/* Save Button */}
      <button style={buttonStyle} disabled={isSaving}>
        {isSaving ? "Saving..." : saved ? "✔ Saved" : "Save Settings"}
      </button>
    </div>
  );
}
