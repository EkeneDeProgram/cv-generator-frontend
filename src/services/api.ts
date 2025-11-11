import axios from "axios";
import type { CVData } from "../types/cv";

// Create a reusable Axios client with a base API URL
// Uses env variable (VITE_API_BASE) or falls back to localhost
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api"
});

// Send CV data to backend for preview (returns rendered HTML)
export function previewCV(data: CVData) {
  return client.post("/cv/preview", data, { responseType: "text" });
}

// Send CV data to backend and get a PDF file back
export function downloadPDF(data: CVData) {
  return client.post("/cv/download/pdf", data, { responseType: "blob" });
}

// Send CV data to backend and get a DOCX file back
export function downloadDOCX(data: CVData) {
  return client.post("/cv/download/docx", data, { responseType: "blob" });
}
