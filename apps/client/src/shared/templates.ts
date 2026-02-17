/**
 * Default template ID used for new apps
 */
export const DEFAULT_TEMPLATE_ID = "default";

/**
 * Neon template IDs
 */
export const NEON_TEMPLATE_IDS = new Set<string>([]);

/**
 * Template interface
 */
export interface Template {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  isOfficial: boolean;
  isExperimental?: boolean;
  requiresNeon?: boolean;
}

/**
 * API Template interface
 */
export interface ApiTemplate {
  githubOrg: string;
  githubRepo: string;
  title: string;
  description: string;
  imageUrl?: string;
  isExperimental?: boolean;
  requiresNeon?: boolean;
}

/**
 * Local templates data
 */
export const localTemplatesData: Template[] = [
  {
    id: "default",
    title: "Default App",
    description: "A basic React app with TypeScript",
    isOfficial: true,
    isExperimental: false,
    requiresNeon: false,
  },
  {
    id: "react",
    title: "React App",
    description: "A React application with modern tooling",
    isOfficial: true,
    isExperimental: false,
    requiresNeon: false,
  },
];