import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PlowMap } from "@/components/PlowMap";

export const metadata: Metadata = { title: "Thunder Bay Plow Routes" };

export default function PlowsDemoPage() {
  return (
    <Container>
      <Link href="/labs" className="text-sm text-zinc-500 hover:text-foreground">
        ← Back to labs
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        Thunder Bay Plow Routes (Real Open Data)
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        This map consumes the City of Thunder Bay&apos;s public plow-route
        FeatureServer — the same authoritative dataset behind the city&apos;s
        snowplow tracker — straight from a static page. It&apos;s an ArcGIS REST
        service queried as GeoJSON: CORS-enabled, no API key, no credits. Roads are
        coloured by plow priority; click any segment for its servicing details.
        During winter operations the service also carries each route&apos;s
        <em> last-serviced </em> time and servicing vehicle.
      </p>
      <div className="mt-8">
        <PlowMap />
      </div>
    </Container>
  );
}
