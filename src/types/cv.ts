// Personal info aligned with backend
export interface PersonalInfo {
  name: string;
  email: string;
  contact: string;
  address: string;        // backend requires it
  linkedin?: string;
  github?: string;
  portfolio?: string;
  socialLinks?: string[];
}

// Work experience
export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string | string[];
}

// Education
export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate?: string;
}

// Projects
export interface Project {
  title: string;
  description: string | string[];
  link?: string;
}

// Skills
export interface Skill {
  category: string;
  items: string[];
}

// DOCX structured parts
export interface DocxParts {
  summary: unknown[];
  workExperience: unknown[];
  projects: unknown[];
  achievements: unknown[];
}

// Template type
export type CVTemplate = "modern" | "twoColumn" | "card";

// Complete CV structure
export interface CVData {
  personalInfo: PersonalInfo;
  summary?: string;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  achievements: string[];
  template: CVTemplate;
  colorScheme: string;
  fontStyle: string;
  _docxParts?: DocxParts;
}
