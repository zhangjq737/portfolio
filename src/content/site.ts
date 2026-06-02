import type { SiteConfig } from "@/lib/types";

// Single source of truth for personal info. Edit this to update the whole site.
export const site: SiteConfig = {
  name: "Jianqiu Zhang",
  role: "GIS Architect & Geospatial Solutions Engineer",
  tagline:
    "GIS architect with 10+ years delivering end-to-end geospatial solutions — from geodatabase design and web service publishing to interactive front-end mapping. PMP®-certified, currently completing an M.Sc. in Computer Science with a focus on AI/ML and full-stack engineering.",
  email: "zjqrich@gmail.com",
  phone: "437-858-6239",
  location: "Thunder Bay, ON",
  // Avatar shown in the hero and About page.
  avatar: "/headshot.jpeg",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jianqiuzhang" },
    { label: "Email", href: "mailto:zjqrich@gmail.com" },
  ],
};
