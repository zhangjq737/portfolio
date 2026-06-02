"use client";

import { useEffect, useRef, useState } from "react";

// Cesium is loaded from a CDN at runtime (not bundled): it keeps the repo lean and
// works on static hosts like GitHub Pages. We use token-free OpenStreetMap imagery,
// so no Cesium Ion account/key is required.
const CESIUM_VERSION = "1.142.0";
const CDN_BASE = `https://cdn.jsdelivr.net/npm/cesium@${CESIUM_VERSION}/Build/Cesium/`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Cesium = any;
declare global {
  interface Window {
    Cesium?: Cesium;
    CESIUM_BASE_URL?: string;
  }
}

let cesiumPromise: Promise<Cesium> | null = null;

// Inject the Cesium script + CSS once, shared across mounts.
function loadCesium(): Promise<Cesium> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.Cesium) return Promise.resolve(window.Cesium);
  if (cesiumPromise) return cesiumPromise;

  // Must be set before Cesium resolves its Workers/Assets URLs.
  window.CESIUM_BASE_URL = CDN_BASE;

  cesiumPromise = new Promise<Cesium>((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `${CDN_BASE}Widgets/widgets.css`;
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.src = `${CDN_BASE}Cesium.js`;
    script.async = true;
    script.onload = () => resolve(window.Cesium);
    script.onerror = () => reject(new Error("Failed to load Cesium from CDN"));
    document.head.appendChild(script);
  });
  return cesiumPromise;
}

// Build a small grid of extruded "buildings" to demonstrate 3D rendering.
function addBuildings(Cesium: Cesium, viewer: Cesium, lon: number, lat: number) {
  const rng = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  const cols = 8;
  const rows = 8;
  const block = 0.0016; // ~150 m
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (rng(i * 31 + j) < 0.25) continue; // leave some gaps (streets/plazas)
      const w = block * 0.34;
      const cx = lon + (i - cols / 2) * block;
      const cy = lat + (j - rows / 2) * block;
      const height = 40 + rng(i * 7 + j * 13) * 320;
      const t = Math.min(height / 360, 1);
      viewer.entities.add({
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray([
            cx - w, cy - w,
            cx + w, cy - w,
            cx + w, cy + w,
            cx - w, cy + w,
          ]),
          extrudedHeight: height,
          material: Cesium.Color.fromHsl(0.58 - t * 0.12, 0.55, 0.45 + t * 0.2),
          outline: true,
          outlineColor: Cesium.Color.WHITE.withAlpha(0.25),
        },
      });
    }
  }
}

export function CesiumGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let viewer: Cesium = null;

    loadCesium()
      .then((Cesium: Cesium) => {
        // Shenzhen downtown.
        const lon = 114.06;
        const lat = 22.54;

        viewer = new Cesium.Viewer(container, {
          // Token-free OSM raster imagery instead of Cesium Ion.
          baseLayer: new Cesium.ImageryLayer(
            new Cesium.UrlTemplateImageryProvider({
              url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
              credit: "© OpenStreetMap contributors",
              maximumLevel: 19,
            }),
          ),
          // Hide widgets that depend on Cesium Ion.
          baseLayerPicker: false,
          geocoder: false,
          animation: false,
          timeline: false,
          navigationHelpButton: false,
          homeButton: false,
          fullscreenButton: true,
          sceneModePicker: true,
        });

        viewer.scene.globe.enableLighting = true;
        viewer.scene.skyAtmosphere.show = true;

        addBuildings(Cesium, viewer, lon, lat);

        // Tilted camera to show the 3D perspective.
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(lon, lat - 0.012, 1200),
          orientation: {
            heading: Cesium.Math.toRadians(20),
            pitch: Cesium.Math.toRadians(-32),
            roll: 0,
          },
          duration: 0,
        });
      })
      .catch((e: Error) => setError(e.message));

    return () => {
      if (viewer && !viewer.isDestroyed?.()) viewer.destroy();
    };
  }, []);

  return (
    <div className="relative h-[65vh] w-full overflow-hidden rounded-xl border border-black/10 dark:border-white/15">
      <div ref={containerRef} className="h-full w-full" />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 p-6 text-center text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
