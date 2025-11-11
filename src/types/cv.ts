// Personal info is now aligned with backend
export interface PersonalInfo {
  name: string;
  email: string;
  contact: string;
  address: string;       // backend requires it (not optional)
  linkedin?: string;
  github?: string;
  portfolio?: string;
  socialLinks?: string[]; // renamed from socials → backend’s field
}

// Work history
export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string | string[]; // backend allows both
}

// Education history
export interface Education {
  institution: string; // backend uses "institution", not "school"
  degree: string;
  startDate: string;
  endDate?: string;
}

// Projects
export interface Project {
  title: string;
  description: string | string[]; // backend allows both
  link?: string;
}

// Skills with categories
export interface Skill {
  category: string;   // backend requires category
  items: string[];
}

// Extra DOCX parts (for backend rendering)
export interface DocxParts {
  summary: unknown[];
  workExperience: unknown[];
  projects: unknown[];
  achievements: unknown[];
}

// The complete CV structure
export interface CVData {
  personalInfo: PersonalInfo;
  summary?: string;
  workExperience: WorkExperience[];  // backend uses workExperience
  education: Education[];
  projects: Project[];
  skills: Skill[];                   // backend uses structured skills
  achievements: string[];
  template:
    | "classic"
    | "modern"
    | "creative"
    | "card-based"
    | "two-column"
    | "two-column-pro"
    | "modern-pro"
    | "card-based-pro";
  colorScheme: string;  // backend requires (not optional)
  fontStyle: string;    // backend requires (not optional)
  _docxParts?: DocxParts;
}
