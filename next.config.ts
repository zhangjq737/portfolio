import type { NextConfig } from "next";

// GitHub Pages serves this project site under https://<user>.github.io/portfolio/
// so production builds need a base path. The deploy workflow sets GITHUB_PAGES=true;
// local `npm run dev` leaves it unset, so the site stays at "/" during development.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repo = "portfolio";
const basePath = isGithubPages ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export", // emit static HTML into ./out (no Node server on Pages)
  basePath,
  // next/image with unoptimized does NOT auto-prepend basePath to a string src,
  // so expose it for manually prefixing static asset URLs (see src/lib/basePath.ts).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true }, // next/image optimizer needs a server; disable for export
  trailingSlash: true, // export /projects/ -> /projects/index.html so Pages resolves routes
};

export default nextConfig;
