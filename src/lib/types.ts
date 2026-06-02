// Core content models for the portfolio.
// Keep these UI-agnostic so content can be sourced from files now and a CMS/MDX later.

export type ProjectCategory = "web" | "gis" | "data" | "other";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  /** URL-safe identifier, used for /projects/[slug]. */
  slug: string;
  title: string;
  /** One-line summary shown on cards. */
  summary: string;
  /** Longer description shown on the detail page. Markdown-free for now. */
  description?: string;
  category: ProjectCategory;
  /** Tech/skills tags, e.g. "MapLibre GL", "PostGIS". */
  tags: string[];
  /** Year or range, e.g. "2025" or "2023–2024". */
  period?: string;
  /** External links: repo, live site, write-up. */
  links?: ProjectLink[];
  /**
   * Optional in-app interactive demo route, e.g. "/labs/heatmap".
   * Reserved for future Web GIS demos rendered inside this site.
   */
  demo?: string;
  /** Card/cover image under /public. */
  cover?: string;
  /** Surface on the home page. */
  featured?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  email: string;
  phone?: string;
  location?: string;
  socials: SocialLink[];
}

export interface ExperienceItem {
  company: string;
  title: string;
  location?: string;
  period: string;
  /** Bullet points describing the role / achievements. */
  highlights: string[];
}

export interface EducationItem {
  school: string;
  credential: string;
  location?: string;
  period: string;
  detail?: string;
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  detail?: string;
}
