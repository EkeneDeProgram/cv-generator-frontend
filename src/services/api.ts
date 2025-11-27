import axios from "axios";
import type { CVData } from "../types/cv";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/cv",
});

// Preview CV
export function previewCV(cv: CVData) {
  return client.post("/preview", cv, { responseType: "text" });
}

// Download PDF
export function downloadPDF(cv: CVData) {
  return client.post("/download/pdf", cv, { responseType: "blob" });
}

// Download DOCX
export function downloadDOCX(cv: CVData) {
  return client.post("/download/docx", cv, { responseType: "blob" });
}
