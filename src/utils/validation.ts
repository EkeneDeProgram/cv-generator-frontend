import { z, type ZodType } from "zod";
import type { CVData } from "../types/cv";

// ✅ Personal Info
export const personalInfoSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  contact: z.string().min(7),
  address: z.string(), // required (backend requires it)
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  portfolio: z.string().url().optional(),
  socialLinks: z.array(z.string().url()).optional(), // renamed from socials
});

// ✅ Work Experience
export const workItemSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1),
  role: z.string().min(1),
  startDate: z.string().min(4),
  endDate: z.string().optional(),
  description: z.union([z.string().min(1), z.array(z.string().min(1))]), // string | string[]
});

// ✅ Education
export const eduItemSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1), // backend uses institution
  degree: z.string().min(1),
  startDate: z.string().min(4),
  endDate: z.string().optional(),
});

// ✅ Projects
export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.union([z.string().min(1), z.array(z.string().min(1))]), // string | string[]
  link: z.string().url().optional(),
});

// ✅ Skills with categories
export const skillSchema = z.object({
  category: z.string().min(1),
  items: z.array(z.string().min(1)),
});

// ✅ DocxParts (optional for backend rendering)
export const docxPartsSchema = z.object({
  summary: z.array(z.unknown()),
  workExperience: z.array(z.unknown()),
  projects: z.array(z.unknown()),
  achievements: z.array(z.unknown()),
});

// ✅ Full CV Schema
export const cvSchema = z.object({
  personalInfo: personalInfoSchema,
  summary: z.string().optional(),
  workExperience: z.array(workItemSchema), // renamed from "work"
  education: z.array(eduItemSchema),
  projects: z.array(projectSchema),
  skills: z.array(skillSchema), // structured skills, not just string[]
  achievements: z.array(z.string()),
  template: z.enum([
    "classic",
    "modern",
    "creative",
    "card-based",
    "two-column",
    "two-column-pro",
    "modern-pro",
    "card-based-pro",
  ]),
  colorScheme: z.string(), // required (backend requires it)
  fontStyle: z.string(),   // required (backend requires it)
  _docxParts: docxPartsSchema.optional(),
}) satisfies ZodType<CVData>; // ✅ ensures schema matches CVData

// ✅ Helpful TypeScript type inferred from Zod
export type CVFormSchema = z.infer<typeof cvSchema>;
