import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiArrowLeft, FiDownload, FiFileText } from "react-icons/fi";

import { useCV } from "../context/useCV";
import { previewCV, downloadPDF, downloadDOCX } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";
import type { CVData } from "../types/cv";

// Utility Function
function cvHasRealContent(cv: CVData | string | string[] | object): boolean {
  if (!cv) return false;

  if (typeof cv === "string") return cv.trim().length > 0;

  if (Array.isArray(cv)) return cv.some((item) => cvHasRealContent(item));

  if (typeof cv === "object") {
    const obj = cv as Record<string, unknown>;
    const keysToCheck = Object.keys(obj).filter(
      (key) =>
        key !== "template" &&
        key !== "colorScheme" &&
        key !== "fontStyle" &&
        key !== "_docxParts"
    );
    return keysToCheck.some((key) => {
      const value = obj[key];
      if (
        typeof value === "string" ||
        Array.isArray(value) ||
        (typeof value === "object" && value !== null)
      ) {
        return cvHasRealContent(value);
      }
      return false;
    });
  }

  return false;
}

// Preview Component
export default function Preview() {
  const navigate = useNavigate();
  const { cv } = useCV();
  const debouncedCV = useDebounce(cv, 500);

  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");

  const generatePreview = useCallback(async () => {
    if (!debouncedCV) return;

    const hasData = cvHasRealContent(debouncedCV);

    if (!hasData) {
      setMessage("Your CV is empty. Add content to generate a preview.");
      setMessageType("info");
      setHtml("");
      return;
    }

    setLoading(true);
    try {
      const res = (await previewCV(debouncedCV)) as { data?: string } | string;
      const htmlContent = typeof res === "string" ? res : res.data ?? "";
      setHtml(htmlContent);

      setMessage("Preview updated successfully");
      setMessageType("success");
    } catch {
      setMessage("Preview generation failed. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }, [debouncedCV]);

  useEffect(() => {
    generatePreview();
  }, [generatePreview]);

  async function handleDownload(type: "pdf" | "docx") {
    if (!cv) return;

    try {
      const res = type === "pdf" ? await downloadPDF(cv) : await downloadDOCX(cv);
      const blob = new Blob([res.data || res], {
        type:
          res.headers?.["content-type"] ||
          (type === "pdf"
            ? "application/pdf"
            : "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cv.${type}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setMessage(`Your ${type.toUpperCase()} file has been downloaded successfully.`);
      setMessageType("success");
    } catch {
      setMessage("Download failed. Please try again.");
      setMessageType("error");
    }
  }

  // Styles
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    padding: "1rem",
    width: "95%",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "'Inter', Arial, sans-serif",
    boxSizing: "border-box",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "1rem",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "clamp(1.5rem, 4vw, 2rem)",
    fontWeight: 700,
    color: "#111827",
    textAlign: "center",
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    justifyContent: "center",
  };

  const buttonBase: React.CSSProperties = {
    padding: "0.65rem 1rem",
    fontSize: "clamp(0.85rem, 2vw, 1rem)",
    fontWeight: 600,
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    flex: "1 1 140px",
    justifyContent: "center",
    transition: "all 0.2s ease-in-out",
  };

  const primaryButton: React.CSSProperties = {
    ...buttonBase,
    backgroundColor: "#4f46e5",
    color: "#fff",
  };
  const primaryHover = "#4338ca";

  const outlineButton: React.CSSProperties = {
    ...buttonBase,
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
  };
  const outlineHover = "#c7d2fe";

  const messageStyle: React.CSSProperties = {
    padding: "1rem 1.25rem",
    borderRadius: "0.5rem",
    fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
    fontWeight: 500,
    textAlign: "center",
    backgroundColor:
      messageType === "success"
        ? "#d1fae5"
        : messageType === "error"
        ? "#fee2e2"
        : "#e0f2fe",
    color:
      messageType === "success"
        ? "#065f46"
        : messageType === "error"
        ? "#b91c1c"
        : "#0369a1",
    border:
      messageType === "success"
        ? "1px solid #6ee7b7"
        : messageType === "error"
        ? "1px solid #fca5a5"
        : "1px solid #bae6fd",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "0.75rem",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    overflow: "hidden",
    width: "100%",
  };

  const cardHeaderStyle: React.CSSProperties = {
    padding: "1rem",
    fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)",
    fontWeight: 600,
    color: "#1f2937",
    backgroundColor: "#f3f4f6",
  };

  const cardContentStyle: React.CSSProperties = {
    minHeight: "300px",
    padding: "1rem",
    backgroundColor: "#ffffff",
    overflowX: "auto",
  };

  const loadingTextStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "2rem",
    color: "#6b7280",
    fontSize: "clamp(0.9rem, 2vw, 1rem)",
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>CV Preview</h1>
        <div style={buttonGroupStyle}>
          <button
            style={outlineButton}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = outlineHover)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = outlineButton.backgroundColor!)}
            onClick={() => navigate("/")}
          >
            <FiHome /> Home
          </button>

          <button
            style={outlineButton}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = outlineHover)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = outlineButton.backgroundColor!)}
            onClick={() => navigate("/builder", { state: { resetStep: true } })}
          >
            <FiArrowLeft /> Back to Builder
          </button>

          <button
            style={primaryButton}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = primaryHover)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = primaryButton.backgroundColor!)}
            onClick={() => handleDownload("pdf")}
          >
            <FiDownload /> Download PDF
          </button>

          <button
            style={outlineButton}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = outlineHover)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = outlineButton.backgroundColor!)}
            onClick={() => handleDownload("docx")}
          >
            <FiFileText /> Download DOCX
          </button>
        </div>
      </div>

      {message && <div style={messageStyle}>{message}</div>}

      <div style={cardStyle}>
        <div style={cardHeaderStyle}>Live CV Preview</div>
        <div style={cardContentStyle}>
          {loading ? (
            <div style={loadingTextStyle}>Generating preview...</div>
          ) : (
            <div
              style={{
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                overflow: "auto",
                padding: "1rem",
                backgroundColor: "#ffffff",
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
