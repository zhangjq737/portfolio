# Portfolio

Personal portfolio built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**.
Designed to grow into a Web GIS showcase.

## Develop

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
npm run lint
```

## Structure

```
src/
  app/                 # routes (App Router)
    page.tsx           #   /          home + featured projects
    about/             #   /about
    projects/          #   /projects  list
      [slug]/          #   /projects/:slug  detail (statically generated)
    labs/              #   /labs      home for interactive demos (future GIS maps)
    layout.tsx         #   shared shell: <Header/> + <Footer/>
  components/          # reusable UI (Container, Header, Footer, ProjectCard)
  content/             # site.ts (personal info) + projects.ts (project data)
  lib/                 # types.ts (content models)
```

## Edit content

- **Your info:** `src/content/site.ts`
- **Projects:** `src/content/projects.ts` — typed by `Project` in `src/lib/types.ts`.
  Set `featured: true` to surface one on the home page.

## Adding a Web GIS demo (future)

The architecture reserves `src/app/labs/` for interactive maps so heavy map
dependencies stay isolated from the rest of the site.

1. Install a map library, e.g. `npm i maplibre-gl` (or `leaflet`).
2. Create the demo page: `src/app/labs/<name>/page.tsx`.
3. Build the map as a **client component** (`"use client"`) and dynamically
   import it with `{ ssr: false }` — map libs touch `window` and can't render
   on the server.
4. Link a project to it by setting `demo: "/labs/<name>"` in `projects.ts`;
   the project detail page renders an **Open live demo** button automatically.
5. Optionally add `/labs` to the nav array in `src/components/Header.tsx`.
