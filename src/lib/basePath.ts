// Base path the site is served under (e.g. "/portfolio" on GitHub Pages, "" locally).
// Set by next.config.ts. Use `asset()` to build URLs for files in /public, since
// next/image (unoptimized) and raw <img>/href do not auto-prepend basePath.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
