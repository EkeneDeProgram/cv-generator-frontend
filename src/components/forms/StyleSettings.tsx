import { useCV } from "../../context/useCV";

export default function StyleSettings() {
  const { cv, setCV } = useCV();

  const handleChange = (field: string, value: string) => {
    setCV((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    alert("Style settings saved successfully!");
  };

  // Inline styles
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
    marginBottom: "1rem",
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
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s ease-in-out",
    alignSelf: "flex-start",
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: "#4338ca",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Style Settings</h2>

      {/* Template Selector */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <label style={labelStyle}>Template</label>
        <select
          value={cv.template}
          onChange={(e) => handleChange("template", e.target.value)}
          style={selectStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#4f46e5")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
        >
          <option value="classic">Classic</option>
          <option value="modern">Modern</option>
          <option value="creative">Creative</option>
          <option value="card-based">Card-Based</option>
          <option value="two-column">Two Column</option>
        </select>
      </div>

      {/* Color Scheme */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <label style={labelStyle}>Color Scheme</label>
        <input
          type="color"
          value={cv.colorScheme}
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
      <button
        onClick={handleSave}
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
      >
        Save Settings
      </button>
    </div>
  );
}
