"use client";

import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import type { FeatureCollection, LineString, MultiLineString } from "geojson";

// Real Thunder Bay open data: the public plow-route FeatureServer behind the
// city's snowplow tracker. CORS-enabled (Access-Control-Allow-Origin: *), no key,
// no credits — consumed directly from this static site as GeoJSON.
const SERVICE =
  "https://services5.arcgis.com/h9xShea49ZANgOtx/arcgis/rest/services/copy_data_Thunder_Bay_Plow_Routes_view/FeatureServer/0";
const OUT_FIELDS = "objectid,street,plow_priority,classification,lastserviced";
const PAGE = 1000;
const THUNDER_BAY: [number, number] = [-89.25, 48.42];

// Page through the FeatureServer (maxRecordCount is 1000) and merge GeoJSON.
async function fetchAllRoutes(): Promise<FeatureCollection<LineString | MultiLineString>> {
  const all: FeatureCollection<LineString | MultiLineString> = {
    type: "FeatureCollection",
    features: [],
  };
  for (let offset = 0; offset < 8000; offset += PAGE) {
    const url =
      `${SERVICE}/query?where=1=1&outFields=${OUT_FIELDS}` +
      `&outSR=4326&resultOffset=${offset}&resultRecordCount=${PAGE}&f=geojson`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Service returned ${res.status}`);
    const page = (await res.json()) as FeatureCollection<LineString | MultiLineString>;
    const feats = page.features ?? [];
    all.features.push(...feats);
    if (feats.length < PAGE) break; // last page
  }
  return all;
}

export function PlowMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("Loading Thunder Bay plow routes…");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cleanup = () => {};

    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;

      const map = new maplibregl.Map({
        container,
        center: THUNDER_BAY,
        zoom: 11,
        style: {
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "© OpenStreetMap contributors · Routes: City of Thunder Bay open data",
            },
          },
          layers: [{ id: "osm", type: "raster", source: "osm" }],
        },
      });
      map.addControl(new maplibregl.NavigationControl(), "top-right");
      cleanup = () => map.remove();

      let data: FeatureCollection<LineString | MultiLineString>;
      try {
        data = await fetchAllRoutes();
      } catch (e) {
        setStatus(`Couldn't load the live service: ${(e as Error).message}`);
        return;
      }

      const onReady = () => {
        map.addSource("routes", { type: "geojson", data });
        // Color by plow priority — populated year-round (the operational
        // "last serviced" colouring kicks in during winter).
        map.addLayer({
          id: "routes-line",
          type: "line",
          source: "routes",
          paint: {
            "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1.2, 15, 3.5],
            "line-color": [
              "match",
              ["get", "plow_priority"],
              "Y", "#ea580c", // priority routes
              "#2563eb", // standard
            ],
            "line-opacity": 0.85,
          },
        });

        const popup = new maplibregl.Popup({ closeButton: false });
        map.on("click", "routes-line", (e) => {
          const p = e.features?.[0]?.properties ?? {};
          const serviced = p.lastserviced
            ? new Date(Number(p.lastserviced)).toLocaleString()
            : "not yet this season (off-season)";
          popup
            .setLngLat(e.lngLat)
            .setHTML(
              `<strong>${p.street ?? "Road"}</strong><br/>` +
                `Priority: ${p.plow_priority === "Y" ? "Yes" : "No"}<br/>` +
                `Class: ${p.classification ?? "—"}<br/>` +
                `Last serviced: ${serviced}`,
            )
            .addTo(map);
        });
        map.on("mouseenter", "routes-line", () => (map.getCanvas().style.cursor = "pointer"));
        map.on("mouseleave", "routes-line", () => (map.getCanvas().style.cursor = ""));

        setStatus(`Loaded ${data.features.length.toLocaleString()} real plow-route segments.`);
      };

      if (map.loaded()) onReady();
      else map.on("load", onReady);
    })();

    return () => cleanup();
  }, []);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-4 text-sm">
        <span className="text-zinc-500">{status}</span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-1 w-5 rounded-full" style={{ background: "#ea580c" }} />
          Priority route
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-1 w-5 rounded-full" style={{ background: "#2563eb" }} />
          Standard route
        </span>
      </div>
      <div
        ref={containerRef}
        className="h-[60vh] w-full overflow-hidden rounded-xl border border-black/10 dark:border-white/15"
      />
    </div>
  );
}
