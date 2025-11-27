import type { CVData } from "../types/cv";

export const STORAGE_KEY = "cv:draft";

export const defaultCV: CVData = {
  personalInfo: {
    name: "",
    email: "",
    contact: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
    socialLinks: [],
  },
  summary: "",
  workExperience: [],
  education: [],
  projects: [],
  skills: [],
  achievements: [],
  template: "modern",
  colorScheme: "blue",
  fontStyle: "sans-serif",
  _docxParts: {
    summary: [],
    workExperience: [],
    projects: [],
    achievements: [],
  },
};

