import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Safer alternative to non-null assertion (!)
const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error(
    "Root element not found. Please ensure your index.html contains <div id='root'></div>."
  );
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
