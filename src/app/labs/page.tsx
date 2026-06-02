import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata: Metadata = { title: "Labs" };

// Landing page for interactive demos. Each demo lives at src/app/labs/<name>/page.tsx.
// Map demos use MapLibre GL via a client component (see HeatmapMap.tsx): the map
// library is imported lazily inside useEffect so it never runs during SSR.
const demos = [
  {
    href: "/labs/cesium",
    title: "Cesium 3D Globe",
    description:
      "CesiumJS scene with extruded 3D buildings over a real-world globe — token-free, CDN-loaded, static-hostable.",
  },
  {
    href: "/labs/buffer",
    title: "Buffer Analysis (Client-Side)",
    description:
      "Turf.js computes a buffer polygon live in the browser — geoprocessing with no server.",
  },
  {
    href: "/labs/heatmap",
    title: "Interactive Heatmap",
    description:
      "MapLibre GL heatmap over weighted GeoJSON points — pan and zoom to re-bin live.",
  },
];

export default function LabsPage() {
  return (
    <Container>
      <h1 className="text-3xl font-semibold tracking-tight">Labs</h1>
      <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
        Interactive Web GIS experiments and live demos.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {demos.map((demo) => (
          <Link
            key={demo.href}
            href={demo.href}
            className="group rounded-xl border border-black/5 p-5 transition-colors hover:border-black/20 dark:border-white/10 dark:hover:border-white/30"
          >
            <h2 className="font-medium tracking-tight group-hover:underline">
              {demo.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {demo.description}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
