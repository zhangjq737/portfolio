import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { BufferMap } from "@/components/BufferMap";

export const metadata: Metadata = { title: "Buffer Analysis" };

export default function BufferDemoPage() {
  return (
    <Container>
      <Link href="/labs" className="text-sm text-zinc-500 hover:text-foreground">
        ← Back to labs
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        Buffer Analysis (Client-Side)
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Click anywhere to place a point and drag the slider to set a radius — the
        buffer polygon is computed live in the browser with Turf.js. No server, no
        geoprocessing service: this is the kind of analysis that runs entirely
        client-side and deploys to a static host.
      </p>
      <div className="mt-8">
        <BufferMap />
      </div>
    </Container>
  );
}
