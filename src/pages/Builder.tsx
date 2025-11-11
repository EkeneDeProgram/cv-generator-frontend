// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useCV } from "../context/useCV";
// import type { CVData } from "../types/cv";

// import PersonalInfoForm from "../components/forms/PersonalInfoForm";
// import WorkExperienceForm from "../components/forms/WorkExperienceForm";
// import EducationForm from "../components/forms/EducationForm";
// import ProjectsForm from "../components/forms/ProjectsForm";
// import SkillsForm from "../components/forms/SkillsForm";
// import AchievementsForm from "../components/forms/AchievementsForm";
// import SummaryForm from "../components/forms/SummaryForm";
// import StyleSettings from "../components/forms/StyleSettings";

// import { Button } from "../components/ui/Button";
// import { useLocalStorage } from "../hooks/useLocalStorage";

// export default function Builder() {
//   const { loadExample, reset, cv, setCV } = useCV();

//   const [storedIndex, setStoredIndex] = useLocalStorage<number>("builderStep", 0);
//   const [index, setIndex] = useState(storedIndex);

//   useEffect(() => {
//     setStoredIndex(index);
//   }, [index, setStoredIndex]);

//   const [savedCV, setSavedCV] = useLocalStorage<CVData>("builderCV", cv);

//   useEffect(() => {
//     setSavedCV(cv);
//   }, [cv, setSavedCV]);

//   useEffect(() => {
//     if (savedCV && Object.keys(savedCV).length > 0) {
//       setCV(savedCV);
//     }
//   }, [savedCV, setCV]);

//   const steps = [
//     { id: "personal", title: "Personal Info", component: <PersonalInfoForm /> },
//     { id: "work", title: "Work Experience", component: <WorkExperienceForm /> },
//     { id: "education", title: "Education", component: <EducationForm /> },
//     { id: "projects", title: "Projects", component: <ProjectsForm /> },
//     { id: "skills", title: "Skills", component: <SkillsForm /> },
//     { id: "achievements", title: "Achievements", component: <AchievementsForm /> },
//     { id: "summary", title: "Summary", component: <SummaryForm /> },
//     { id: "style", title: "Style Settings", component: <StyleSettings /> },
//   ];

//   // Inline styles
//   const containerStyle: React.CSSProperties = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "1.5rem",
//     padding: "2rem",
//     maxWidth: "800px",
//     margin: "0 auto",
//   };

//   const headerStyle: React.CSSProperties = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   };

//   const buttonGroupStyle: React.CSSProperties = {
//     display: "flex",
//     gap: "0.5rem",
//   };

//   const stepContainerStyle: React.CSSProperties = {
//     marginTop: "1rem",
//   };

//   const navContainerStyle: React.CSSProperties = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: "1.5rem",
//   };

//   const navButtonGroupStyle: React.CSSProperties = {
//     display: "flex",
//     gap: "0.5rem",
//     alignItems: "center",
//   };

//   const buttonStyle: React.CSSProperties = {
//     borderRadius: "1rem",       // Smooth rounded edges
//     backgroundColor: "#3b82f6", // Blue background
//     color: "#ffffff",
//     padding: "0.5rem 1rem",
//     fontWeight: 600,
//     cursor: "pointer",
//     border: "none",
//     transition: "all 0.2s ease-in-out",
//   };

//   const buttonHoverStyle: React.CSSProperties = {
//     backgroundColor: "#2563eb", // Slightly darker blue on hover
//   };

//   return (
//     <div style={containerStyle}>
//       {/* Header */}
//       <div style={headerStyle}>
//         <div style={buttonGroupStyle}>
//           <Button
//             variant="secondary"
//             onClick={loadExample}
//             style={buttonStyle}
//             onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
//             onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
//           >
//             Load Example
//           </Button>
//           <Button
//             variant="outline"
//             onClick={reset}
//             style={buttonStyle}
//             onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
//             onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
//           >
//             Reset
//           </Button>
//         </div>
//       </div>

//       {/* Current step */}
//       <div style={stepContainerStyle}>{steps[index].component}</div>

//       {/* Navigation */}
//       <div style={navContainerStyle}>
//         <Button
//           variant="outline"
//           disabled={index === 0}
//           onClick={() => setIndex((i) => i - 1)}
//           style={buttonStyle}
//           onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
//           onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
//         >
//           Back
//         </Button>

//         <div style={navButtonGroupStyle}>
//           {index < steps.length - 1 ? (
//             <Button
//               variant="primary"
//               onClick={() => setIndex((i) => Math.min(i + 1, steps.length - 1))}
//               style={buttonStyle}
//               onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
//               onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
//             >
//               Next
//             </Button>
//           ) : (
//             <Link to="/preview" style={{ textDecoration: "none" }}>
//               <Button
//                 variant="primary"
//                 style={buttonStyle}
//                 onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
//                 onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
//               >
//                 Preview
//               </Button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCV } from "../context/useCV";
import type { CVData } from "../types/cv";

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
  const { loadExample, reset, cv, setCV } = useCV();

  // ✅ Memoized steps definition to prevent unnecessary re-renders
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

  // ✅ Local storage for builder progress
  const [storedIndex, setStoredIndex] = useLocalStorage<number>("builderStep", 0);
  const [index, setIndex] = useState<number>(0);

  // ✅ Load correct step on mount
  useEffect(() => {
    const validIndex =
      typeof storedIndex === "number" &&
      storedIndex >= 0 &&
      storedIndex < steps.length
        ? storedIndex
        : 0;
    setIndex(validIndex);
  }, [storedIndex, steps.length]);

  // ✅ Save index whenever it changes
  useEffect(() => {
    setStoredIndex(index);
  }, [index, setStoredIndex]);

  // ✅ Sync CV data to localStorage
  const [savedCV, setSavedCV] = useLocalStorage<CVData>("builderCV", cv);
  useEffect(() => {
    setSavedCV(cv);
  }, [cv, setSavedCV]);

  // ✅ Restore saved CV data
  useEffect(() => {
    if (savedCV && Object.keys(savedCV).length > 0) {
      setCV(savedCV);
    }
  }, [savedCV, setCV]);

  // === Inline Styles ===
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Inter, Arial, sans-serif",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
  };

  const stepContainerStyle: React.CSSProperties = {
    marginTop: "1rem",
    padding: "1.5rem",
    border: "1px solid #e5e7eb",
    borderRadius: "1rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    backgroundColor: "#ffffff",
  };

  const navContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1.5rem",
  };

  const navButtonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
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

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={buttonGroupStyle}>
          <Button
            variant="secondary"
            onClick={loadExample}
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)
            }
          >
            Load Example
          </Button>

          <Button
            variant="outline"
            onClick={reset}
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)
            }
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Step Title */}
      <div style={stepTitleStyle}>{steps[index].title}</div>

      {/* Current Step Component */}
      <div style={stepContainerStyle}>{steps[index].component}</div>

      {/* Navigation */}
      <div style={navContainerStyle}>
        <Button
          variant="outline"
          disabled={index === 0}
          onClick={() => index > 0 && setIndex((i) => i - 1)}
          style={index === 0 ? disabledButtonStyle : buttonStyle}
          onMouseOver={(e) => {
            if (index !== 0)
              e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!;
          }}
          onMouseOut={(e) => {
            if (index !== 0)
              e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!;
          }}
        >
          Back
        </Button>

        <div style={navButtonGroupStyle}>
          {index < steps.length - 1 ? (
            <Button
              variant="primary"
              onClick={() => setIndex((i) => Math.min(i + 1, steps.length - 1))}
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)
              }
            >
              Next
            </Button>
          ) : (
            <Link to="/preview" style={{ textDecoration: "none" }}>
              <Button
                variant="primary"
                style={buttonStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)
                }
              >
                Preview
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}







