"use client";

import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import type { FeatureCollection, Point } from "geojson";

// Generate sample weighted points clustered around a center (Shenzhen).
// Replace this with real GeoJSON (e.g. fetched from an API or a PostGIS-backed service).
function sampleData(center: [number, number], count = 400): FeatureCollection<Point> {
  const features = Array.from({ length: count }, () => {
    // Gaussian-ish spread via summed uniforms.
    const jitter = () => (Math.random() + Math.random() + Math.random() - 1.5) * 0.12;
    return {
      type: "Feature" as const,
      properties: { weight: Math.random() },
      geometry: {
        type: "Point" as const,
        coordinates: [center[0] + jitter(), center[1] + jitter()],
      },
    };
  });
  return { type: "FeatureCollection", features };
}

export function HeatmapMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const center: [number, number] = [114.06, 22.55]; // Shenzhen
    // maplibre-gl is imported lazily so it never executes during SSR.
    let cleanup = () => {};

    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;

      const map = new maplibregl.Map({
        container,
        center,
        zoom: 9,
        // Raster OSM basemap — no API key required.
        style: {
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "© OpenStreetMap contributors",
            },
          },
          layers: [{ id: "osm", type: "raster", source: "osm" }],
        },
      });

      map.addControl(new maplibregl.NavigationControl(), "top-right");

      map.on("load", () => {
        map.addSource("points", { type: "geojson", data: sampleData(center) });
        map.addLayer({
          id: "heatmap",
          type: "heatmap",
          source: "points",
          paint: {
            "heatmap-weight": ["get", "weight"],
            "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 12, 3],
            "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 8, 12, 30],
            "heatmap-opacity": 0.85,
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, "rgba(33,102,172,0)",
              0.2, "rgb(103,169,207)",
              0.4, "rgb(209,229,240)",
              0.6, "rgb(253,219,199)",
              0.8, "rgb(239,138,98)",
              1, "rgb(178,24,43)",
            ],
          },
        });
      });

      cleanup = () => map.remove();
    })();

    return () => cleanup();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[60vh] w-full overflow-hidden rounded-xl border border-black/10 dark:border-white/15"
    />
  );
}
