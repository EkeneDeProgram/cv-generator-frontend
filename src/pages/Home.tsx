// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();

//   const containerStyle: React.CSSProperties = {
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "linear-gradient(135deg, #4f46e5, #6366f1)", // Gradient background
//     padding: "2rem",
//   };

//   const cardStyle: React.CSSProperties = {
//     width: "100%",
//     maxWidth: "500px",
//     padding: "2rem",
//     borderRadius: "1rem",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//     backgroundColor: "#ffffff",
//     textAlign: "center",
//     marginTop: "2rem", // ✅ Add spacing between logo and card
//   };

//   const titleStyle: React.CSSProperties = {
//     fontSize: "2rem",
//     fontWeight: 700,
//     marginBottom: "1rem",
//     color: "#1f2937",
//   };

//   const paragraphStyle: React.CSSProperties = {
//     fontSize: "1rem",
//     color: "#4b5563",
//     marginBottom: "2rem",
//     lineHeight: 1.6,
//   };

//   const buttonContainerStyle: React.CSSProperties = {
//     display: "flex",
//     justifyContent: "center",
//     gap: "1rem",
//     flexWrap: "wrap",
//   };

//   const primaryButtonStyle: React.CSSProperties = {
//     padding: "0.75rem 1.5rem",
//     fontSize: "1rem",
//     fontWeight: 600,
//     borderRadius: "0.75rem",
//     backgroundColor: "#4f46e5",
//     color: "#ffffff",
//     cursor: "pointer",
//     border: "none",
//     transition: "all 0.2s ease-in-out",
//   };

//   const secondaryButtonStyle: React.CSSProperties = {
//     padding: "0.75rem 1.5rem",
//     fontSize: "1rem",
//     fontWeight: 600,
//     borderRadius: "0.75rem",
//     backgroundColor: "#e0e7ff",
//     color: "#4f46e5",
//     cursor: "pointer",
//     border: "none",
//     transition: "all 0.2s ease-in-out",
//   };

//   return (
//     <div style={containerStyle}>
//       {/* Logo */}
//       <img src="/logo2.png" alt="Nobzo Logo" width={200} height={200} />
//       <div style={cardStyle}>
//         <h1 style={titleStyle}>Welcome to 99 CV Generator</h1>
//         <p style={paragraphStyle}>
//           Create your professional CV quickly with our builder. Save progress, switch templates, and preview instantly.
//         </p>
//         <div style={buttonContainerStyle}>
//           <button
//             style={primaryButtonStyle}
//             onClick={() => navigate("/builder")}
//             onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
//             onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
//           >
//             Start Building
//           </button>
//           <button
//             style={secondaryButtonStyle}
//             onClick={() => navigate("/preview")}
//             onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c7d2fe")}
//             onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e0e7ff")}
//           >
//             Preview Example
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)", // Gradient background
    padding: "2rem",
  };

  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "500px",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    backgroundColor: "#ffffff",
    textAlign: "center",
    marginTop: "2rem", // Space between logo and card
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "1rem",
    color: "#1f2937",
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: "1rem",
    color: "#4b5563",
    marginBottom: "2rem",
    lineHeight: 1.6,
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  };

  const primaryButtonStyle: React.CSSProperties = {
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

  const secondaryButtonStyle: React.CSSProperties = {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "0.75rem",
    backgroundColor: "#e0e7ff",
    color: "#4f46e5",
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <div style={containerStyle}>
      {/* Logo */}
      <img src="/logo2.png" alt="Nobzo Logo" width={200} height={200} />

      {/* Main Card */}
      <div style={cardStyle}>
        <h1 style={titleStyle}>Welcome to 99 CV Generator</h1>
        <p style={paragraphStyle}>
          Create your professional CV quickly with our builder. Save progress, switch templates, and preview instantly.
        </p>

        <div style={buttonContainerStyle}>
          {/* ✅ Start Building button (always starts at step 0) */}
          <button
            style={primaryButtonStyle}
            onClick={() => {
              localStorage.setItem("builderStep", "0"); // Reset to Personal Info step
              navigate("/builder");
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
          >
            Start Building
          </button>

          {/* Preview Example button */}
          <button
            style={secondaryButtonStyle}
            onClick={() => navigate("/preview")}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c7d2fe")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e0e7ff")}
          >
            Preview Example
          </button>
        </div>
      </div>
    </div>
  );
}
