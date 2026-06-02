"use client";

import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { buffer, point } from "@turf/turf";
import type { Feature, Point, Polygon, MultiPolygon } from "geojson";

// Client-side geoprocessing: the buffer polygon is computed in the browser with
// Turf.js — no server, no API call. The "static but genuinely GIS" pattern.
const CENTER: [number, number] = [114.06, 22.54]; // Shenzhen

export function BufferMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radiusKm, setRadiusKm] = useState(2);

  // Latest state the map's event handlers read from (avoids stale closures).
  const ptRef = useRef<Feature<Point>>(point(CENTER));
  const radiusRef = useRef(radiusKm);
  // recompute() is created inside the effect once the map exists.
  const recomputeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cleanup = () => {};

    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;

      const map = new maplibregl.Map({
        container,
        center: CENTER,
        zoom: 11,
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

      const recompute = () => {
        const poly = buffer(ptRef.current, radiusRef.current, {
          units: "kilometers",
        }) as Feature<Polygon | MultiPolygon> | undefined;
        (map.getSource("buffer") as maplibregl.GeoJSONSource | undefined)?.setData(
          poly ?? { type: "FeatureCollection", features: [] },
        );
        (map.getSource("center") as maplibregl.GeoJSONSource | undefined)?.setData(
          ptRef.current,
        );
      };
      recomputeRef.current = recompute;

      map.on("load", () => {
        map.addSource("buffer", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });
        map.addLayer({
          id: "buffer-fill",
          type: "fill",
          source: "buffer",
          paint: { "fill-color": "#2563eb", "fill-opacity": 0.18 },
        });
        map.addLayer({
          id: "buffer-line",
          type: "line",
          source: "buffer",
          paint: { "line-color": "#2563eb", "line-width": 2 },
        });
        map.addSource("center", { type: "geojson", data: ptRef.current });
        map.addLayer({
          id: "center-pt",
          type: "circle",
          source: "center",
          paint: {
            "circle-radius": 6,
            "circle-color": "#dc2626",
            "circle-stroke-color": "#fff",
            "circle-stroke-width": 2,
          },
        });
        recompute();
      });

      map.on("click", (e) => {
        ptRef.current = point([e.lngLat.lng, e.lngLat.lat]);
        recompute();
      });

      cleanup = () => map.remove();
    })();

    return () => cleanup();
  }, []);

  // Recompute when the slider moves.
  useEffect(() => {
    radiusRef.current = radiusKm;
    recomputeRef.current?.();
  }, [radiusKm]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
        <label htmlFor="radius" className="font-medium">
          Buffer radius: {radiusKm} km
        </label>
        <input
          id="radius"
          type="range"
          min={0.5}
          max={10}
          step={0.5}
          value={radiusKm}
          onChange={(e) => setRadiusKm(Number(e.target.value))}
          className="w-56"
        />
        <span className="text-zinc-500">Click the map to move the point.</span>
      </div>
      <div
        ref={containerRef}
        className="h-[55vh] w-full overflow-hidden rounded-xl border border-black/10 dark:border-white/15"
      />
    </div>
  );
}
