import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CesiumGlobe } from "@/components/CesiumGlobe";

export const metadata: Metadata = { title: "Cesium 3D Globe" };

export default function CesiumDemoPage() {
  return (
    <Container>
      <Link href="/labs" className="text-sm text-zinc-500 hover:text-foreground">
        ← Back to labs
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        Cesium 3D Globe
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        A CesiumJS scene with extruded 3D buildings over a real-world globe. Drag to
        orbit, right-drag (or scroll) to zoom, middle-drag to tilt. Imagery is
        token-free OpenStreetMap and Cesium itself loads from a CDN — so the whole
        thing runs on a static host with no server and no Cesium Ion key.
      </p>
      <div className="mt-8">
        <CesiumGlobe />
      </div>
    </Container>
  );
}
