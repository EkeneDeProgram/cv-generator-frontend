import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Entry point of the React application.

// Get the root DOM element to mount the React app
const rootEl = document.getElementById("root");

// Safety check to ensure the root element exists
if (!rootEl) {
  throw new Error(
    "Root element not found. Please ensure your index.html contains <div id='root'></div>."
  );
}

// Mount the React app into the DOM
createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
