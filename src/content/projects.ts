import type { Project } from "@/lib/types";

// Add new projects here. To add a future Web GIS demo:
//   1. build the interactive map page under src/app/labs/<name>/page.tsx
//   2. set `demo: "/labs/<name>"` on the matching project below
export const projects: Project[] = [
  {
    slug: "cesium-3d-demo",
    title: "Cesium 3D Globe (Live Demo)",
    summary:
      "An interactive 3D globe with extruded buildings — built with CesiumJS, the engine I used to move enterprise platforms from 2D to 3D.",
    description:
      "A live CesiumJS demo rendering extruded 3D building footprints over a real-world globe with lighting and OpenStreetMap imagery. It echoes the 2D-to-3D GIS transition I led in production with Cesium.js (metro-station models, 3D urban scenes). Cesium is loaded from a CDN with token-free imagery, so the whole 3D experience runs on a static host — no server, no Cesium Ion key.",
    category: "gis",
    tags: ["Cesium.js", "3D GIS", "WebGL", "TypeScript"],
    period: "2026",
    featured: true,
    demo: "/labs/cesium",
  },
  {
    slug: "buffer-demo",
    title: "Client-Side Buffer Analysis (Live Demo)",
    summary:
      "Geoprocessing in the browser — Turf.js computes buffer polygons live, with no server.",
    description:
      "A live demo of in-browser geoprocessing: click to place a point, set a radius, and Turf.js computes the buffer polygon on the client. It demonstrates how real spatial analysis can ship on a fully static host, with heavier server-side geoprocessing (PostGIS, WPS, ArcGIS GP) reserved for separately-hosted services.",
    category: "gis",
    tags: ["Turf.js", "MapLibre GL", "Geoprocessing", "GeoJSON"],
    period: "2026",
    demo: "/labs/buffer",
  },
  {
    slug: "heatmap-demo",
    title: "Interactive Heatmap (Live Demo)",
    summary:
      "A MapLibre GL heatmap rendering spatial point density in the browser — the kind of dynamic visualization I built for O-D matrix and risk-mapping work.",
    description:
      "A live, in-browser demo using MapLibre GL JS to render a weighted heatmap from GeoJSON points. It mirrors the dynamic spatial visualizations I engineered in production — Origin-Destination matrix mapping, transit-route vectorisation, and public-safety risk heatmaps. Open the demo to pan, zoom, and watch the heatmap re-bin as the view changes.",
    category: "gis",
    tags: ["MapLibre GL", "GeoJSON", "Heatmap", "TypeScript", "Next.js"],
    period: "2026",
    featured: true,
    demo: "/labs/heatmap",
  },
  {
    slug: "land-price-system",
    title: "Shenzhen Land Price Calculation System",
    summary:
      "Automated municipal land-pricing platform integrating spatial land-valuation algorithms with interactive web maps.",
    description:
      "For the Shenzhen Municipal Planning and Natural Resources Bureau, engineered a system that automates online land-pricing and baseline assessments. Conducted on-site client liaison, gathered requirements, processed spatial datasets to specification, and collaborated with the back-end team to implement a fully automated price-calculation pipeline driven by interactive web maps.",
    category: "gis",
    tags: ["ArcGIS Server", "ArcGIS API for JS", "Geodatabase", "Spatial Algorithms"],
    period: "2016–2021",
    featured: true,
  },
  {
    slug: "planning-zoning-app",
    title: "Planning & Zoning Application",
    summary:
      "Web app letting planners upload CAD (.dwg) files to dynamically cut, overlay, and modify parcel boundaries in the browser.",
    description:
      "Built for the Shenzhen Master Planning Division using the ArcGIS Suite, ArcGIS API for JavaScript, and ArcObjects (Java). Developed a custom geoprocessing module for in-browser CAD upload and dynamic parcel-boundary editing. Constructed the full GIS environment from scratch — geodatabase design, Map and Feature service publishing, and all front-end web GIS functionality.",
    category: "gis",
    tags: ["ArcObjects", "Geoprocessing", "CAD / DWG", "ArcGIS API for JS"],
    period: "2016–2021",
    featured: true,
  },
  {
    slug: "airport-asset-management",
    title: "Airport Enterprise Asset Management",
    summary:
      "Enterprise asset-management system for Haikou Meilan International Airport, built on SuperMap and OpenLayers.",
    description:
      "Served as Project Manager and Technical Lead. Authored the Project Charter and PID from scratch, managed the documentation pipeline through final sign-off, and delivered executive stakeholder presentations. Gathered requirements across airport departments, managed the SuperMap platform vendor, and led a 3-person front-end team implementing the web mapping functionality.",
    category: "gis",
    tags: ["SuperMap", "OpenLayers", "Project Management", "PMP®"],
    period: "2016–2021",
  },
  {
    slug: "police-gis-3d",
    title: "Police GIS (PGIS) 3D Platform",
    summary:
      "Metro-station 3D models and intranet geospatial services for the Shenzhen Public Security Bureau Rail Transit Branch.",
    description:
      "Composed .mxd files and published geospatial services on the police intranet via PGIS. Drove the organisation's transition from 2D mapping to 3D GIS with Cesium.js, managed a 3D-map vendor delivering five metro-station models on schedule, supported acceptance testing, and led client-side budget negotiations for the 3D mapping sub-project.",
    category: "gis",
    tags: ["Cesium.js", "3D GIS", "PGIS", "Vendor Management"],
    period: "2016–2021",
  },
  {
    slug: "road-defects-detection",
    title: "Road Defects Detection System (RDDS)",
    summary:
      "GIS workflow design for a computer-vision road-inspection platform.",
    description:
      "At Shenzhen Streamax, designed the end-to-end GIS workflow for a Road Defects Detection System, integrating geospatial components into a computer-vision inspection platform. Upgraded existing GIS functionality to improve data accuracy for field teams, and produced functional prototypes and technical specifications from stakeholder requirements.",
    category: "gis",
    tags: ["GIS Architecture", "Computer Vision", "Requirements", "Prototyping"],
    period: "2021–2022",
  },
  {
    slug: "grid-municipal-management",
    title: "Grid-Based Municipal Management System",
    summary:
      "Core GIS for a municipal management system deployed across 17 districts in three regions of China.",
    description:
      "Maintained, optimised, and upgraded core GIS functionality for a grid-based municipal management system spanning 10 districts in Shenzhen, 1 in Anhui, and 6 in Guiyang. Managed and converted complex multi-source spatial datasets, published high-availability map layers via ArcGIS Server, and processed remote-sensing imagery with ERDAS IMAGINE.",
    category: "gis",
    tags: ["ArcGIS Server", "ArcSDE", "ERDAS IMAGINE", "Remote Sensing"],
    period: "2014–2016",
  },
  {
    slug: "portfolio-site",
    title: "This Portfolio",
    summary:
      "A Next.js + Tailwind site built to scale into a Web GIS showcase, with live in-browser map demos.",
    category: "web",
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "MapLibre GL"],
    period: "2026",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeatured(): Project[] {
  return projects.filter((p) => p.featured);
}
