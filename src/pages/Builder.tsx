import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCV } from "../context/useCV";
import { previewCV } from "../services/api";
import type { Location } from "react-router-dom";

import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import WorkExperienceForm from "../components/forms/WorkExperienceForm";
import EducationForm from "../components/forms/EducationForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import SkillsForm from "../components/forms/SkillsForm";
import AchievementsForm from "../components/forms/AchievementsForm";
import SummaryForm from "../components/forms/SummaryForm";
import StyleSettings from "../components/forms/StyleSettings";

import { Button } from "../components/ui/Button";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Builder() {
  const { cv, loadExample, reset } = useCV();
  const navigate = useNavigate();
  const location = useLocation() as Location & { state?: { resetStep?: boolean } };

  // MEMOIZED STEPS (prevents re-rendering)
  const steps = useMemo(
    () => [
      { id: "personal", title: "Personal Info", component: <PersonalInfoForm /> },
      { id: "work", title: "Work Experience", component: <WorkExperienceForm /> },
      { id: "education", title: "Education", component: <EducationForm /> },
      { id: "projects", title: "Projects", component: <ProjectsForm /> },
      { id: "skills", title: "Skills", component: <SkillsForm /> },
      { id: "achievements", title: "Achievements", component: <AchievementsForm /> },
      { id: "summary", title: "Summary", component: <SummaryForm /> },
      { id: "style", title: "Style Settings", component: <StyleSettings /> },
    ],
    []
  );

  // LOAD SAVED STEP FROM LOCAL STORAGE
  const [storedIndex, setStoredIndex] = useLocalStorage("builderStep", 0);
  const [index, setIndex] = useState<number>(0);

  // STABLE FUNCTION: update step index
  const updateStep = useCallback(
    (newIndex: number) => {
      const safeIndex = Math.max(0, Math.min(newIndex, steps.length - 1));
      setIndex(safeIndex);
      setStoredIndex(safeIndex);
    },
    [steps.length, setStoredIndex]
  );

  // Handle reset when returning from Preview
  useEffect(() => {
    if (location.state?.resetStep) {
      updateStep(0);

      // Prevents repeating the reset every render
      navigate(".", { replace: true, state: {} });
      return;
    }

    // Validate index from local storage
    const valid =
      typeof storedIndex === "number" &&
      storedIndex >= 0 &&
      storedIndex < steps.length
        ? storedIndex
        : 0;

    updateStep(valid);
  }, [location.state, storedIndex, steps.length, navigate, updateStep]);

  // LOAD EXAMPLE
  const handleLoadExample = useCallback(async () => {
    await loadExample();
    alert("Example CV loaded! You can now edit it or go to Preview.");
  }, [loadExample]);


  // PREVIEW HANDLER
  const handlePreview = async () => {
    try {
      const html = await previewCV(cv); // cv is guaranteed to match CVData
      console.log("Preview HTML:", html.data);
      navigate("/preview"); // navigate to preview page if needed
    } catch (err) {
      console.error("Failed to preview CV", err);
    }
  };

  // INLINE STYLES
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    padding: "2rem",
    width: "95%",
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "Inter, Arial, sans-serif",
    boxSizing: "border-box",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.75rem",
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    justifyContent: "center",
  };

  const stepContainerStyle: React.CSSProperties = {
    marginTop: "1rem",
    padding: "1.5rem",
    border: "1px solid #e5e7eb",
    borderRadius: "1rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    backgroundColor: "#ffffff",
    width: "100%",
    overflowX: "auto",
  };

  const navContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginTop: "1.5rem",
  };

  const navButtonGroupStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    justifyContent: "center",
    alignItems: "center",
  };

  const buttonStyle: React.CSSProperties = {
    borderRadius: "1rem",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    padding: "0.6rem 1.25rem",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s ease-in-out",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    minWidth: "120px",
    flex: "1 1 auto",
    textAlign: "center",
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: "#2563eb",
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#9ca3af",
    cursor: "not-allowed",
  };

  const stepTitleStyle: React.CSSProperties = {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#1f2937",
    textAlign: "center",
    marginTop: "0.5rem",
  };

  // JSX RENDER
  return (
    <div style={containerStyle}>
      {/* HEADER BUTTONS */}
      <div style={headerStyle}>
        <div style={buttonGroupStyle}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleLoadExample}
            style={buttonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
          >
            Load Example
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={reset}
            style={buttonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* STEP TITLE */}
      <div style={stepTitleStyle}>{steps[index].title}</div>

      {/* STEP CONTENT */}
      <div style={stepContainerStyle}>{steps[index].component}</div>

      {/* NAVIGATION */}
      <div style={navContainerStyle}>
        <Button
          type="button"
          variant="outline"
          disabled={index === 0}
          onClick={() => updateStep(index - 1)}
          style={index === 0 ? disabledButtonStyle : buttonStyle}
          onMouseOver={(e) => index !== 0 && (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
          onMouseOut={(e) => index !== 0 && (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
        >
          Back
        </Button>

        <div style={navButtonGroupStyle}>
          {index < steps.length - 1 ? (
            <Button
              type="button"
              variant="primary"
              onClick={() => updateStep(index + 1)}
              style={buttonStyle}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
            >
              Next
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={handlePreview}
              style={buttonStyle}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
            >
              Preview
            </Button>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={handlePreview}
            style={buttonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
          >
            Go to Preview
          </Button>
        </div>
      </div>
    </div>
  );
}


