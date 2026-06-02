import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { HeatmapMap } from "@/components/HeatmapMap";

export const metadata: Metadata = { title: "Heatmap Demo" };

export default function HeatmapDemoPage() {
  return (
    <Container>
      <Link href="/labs" className="text-sm text-zinc-500 hover:text-foreground">
        ← Back to labs
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        Interactive Heatmap
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        A MapLibre GL heatmap rendering ~400 weighted GeoJSON points around
        Shenzhen. Pan and zoom — the heatmap re-bins live with the view. Swap the
        sample data in <code className="text-sm">HeatmapMap.tsx</code> for a real
        feed to visualize O-D matrices, risk surfaces, or event density.
      </p>
      <div className="mt-8">
        <HeatmapMap />
      </div>
    </Container>
  );
}
