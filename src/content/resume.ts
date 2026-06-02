import type {
  Certification,
  EducationItem,
  ExperienceItem,
  SkillGroup,
} from "@/lib/types";

// Resume content for the About page. Edit here to keep the site in sync with your CV.

export const summary =
  "Results-driven GIS professional with 10+ years of progressive experience spanning GIS engineering, solution architecture, and project management. Proven track record delivering end-to-end geospatial solutions — from spatial data collection and geodatabase design through web service publishing and front-end mapping — for government, transportation, and enterprise clients across China. PMP®-certified and currently completing an M.Sc. in Computer Science, deepening expertise in AI/ML, mobile development, and full-stack engineering.";

export const skillGroups: SkillGroup[] = [
  {
    label: "GIS Platforms",
    skills: [
      "ArcGIS Suite (ArcMap, Server, ArcSDE, ArcObjects, JS/Flex/Java/Python APIs)",
      "QGIS",
      "GeoServer",
      "SuperMap",
      "OpenLayers",
      "Cesium.js",
      "GeoTools (Java)",
    ],
  },
  {
    label: "Spatial Data",
    skills: [
      "ArcSDE on SQL Server & Oracle",
      "PostGIS",
      "Geodatabase design",
      "GCJ-02 / WGS-84",
      "CAD (.dwg) integration",
      "ERDAS IMAGINE (remote sensing)",
    ],
  },
  {
    label: "Programming",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "Kotlin", "Clojure"],
  },
  {
    label: "Web / Full Stack",
    skills: [
      "React",
      "Node.js",
      "REST API design",
      "ArcGIS API for JavaScript",
      "OpenLayers",
      "MapLibre GL",
    ],
  },
  {
    label: "AI / ML",
    skills: ["Machine Learning", "Deep Learning", "Artificial Intelligence"],
  },
  {
    label: "Project Management",
    skills: [
      "PMP® certified",
      "Jira",
      "Stakeholder management",
      "Vendor management",
      "RFP / contract lifecycle",
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    company: "Shenzhen Streamax Technology Co., Ltd.",
    title: "GIS Architect",
    location: "Shenzhen, China",
    period: "Sep 2021 – Jan 2022",
    highlights: [
      "Designed the end-to-end GIS workflow for a Road Defects Detection System (RDDS), integrating geospatial components into a computer-vision inspection platform.",
      "Upgraded and extended GIS functionality to improve data accuracy and usability for field teams.",
      "Gathered stakeholder requirements and produced functional prototypes and technical specifications.",
    ],
  },
  {
    company: "Beijing Feidu Technology Co., Ltd.",
    title: "GIS / CIM Project Manager",
    location: "Shenzhen, China",
    period: "Apr 2021 – May 2021",
    highlights: [
      "Managed delivery of a City Information Modeling (CIM) project for the Guangzhou Urban Planning Bureau, coordinating cross-functional teams to meet planning-data integration milestones.",
    ],
  },
  {
    company: "Shenzhen Beidou Applied Technology Research Institute Co., Ltd.",
    title: "GIS Architect & Project Manager",
    location: "Shenzhen, China",
    period: "Jul 2016 – Mar 2021",
    highlights: [
      "Primary GIS subject-matter expert: directed enterprise GIS strategy, spatial data-exchange standards, technical documentation, on-site infrastructure, and vendor/contract management.",
      "Led migration of all web mapping platforms from ArcGIS API for Flex to ArcGIS API for JavaScript, modernising the front-end stack.",
      "Drove the organisation-wide transition from 2D mapping to 3D GIS using Cesium.js, expanding service offerings to 3D urban modelling.",
      "Delivered the Shenzhen Land Price Calculation System, a planning & zoning app with in-browser CAD editing, an airport asset-management system, a police 3D GIS platform, and enterprise GIS rollouts (Hisense, Shenzhen Bus Group).",
    ],
  },
  {
    company: "Shenzhen Gaozheng Software Co., Ltd.",
    title: "GIS Engineer",
    location: "Shenzhen, China",
    period: "May 2014 – Jun 2016",
    highlights: [
      "Maintained and upgraded core GIS for a grid-based municipal management system across 17 districts in three regions of China.",
      "Managed multi-source spatial datasets, published high-availability services via ArcGIS Server, and processed imagery with ERDAS IMAGINE.",
    ],
  },
  {
    company: "Excel Software Technology (Shenzhen) Co., Ltd.",
    title: "GIS Engineer (On-site Technical Consultant)",
    location: "Shenzhen, China",
    period: "Mar 2013 – May 2014",
    highlights: [
      "Translated client business needs into functional web mapping specifications as an on-site consultant.",
      "Designed and deployed the Shenzhen Public Information Map for the Municipal Bureau of Land and Resources, visualising infrastructure, community assets, and parcel zoning for public use.",
    ],
  },
  {
    company: "Shenzhen Huawei Century Technology Co., Ltd.",
    title: "GIS Engineer",
    location: "Shenzhen, China",
    period: "Jul 2011 – Mar 2013",
    highlights: [
      "Maintained the core enterprise ArcGIS platform: ArcSDE for Oracle, spatial data editing, and RESTful service publishing via ArcGIS Server.",
      "Developed front-end GIS components with ArcGIS API for Flex for the Shenzhen Urban Management Bureau and Futian District Emergency Management Bureau.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    school: "Lakehead University",
    credential: "M.Sc. in Computer Science",
    location: "Thunder Bay, ON",
    period: "Sep 2025 – Aug 2026 (Expected)",
    detail:
      "Advanced Algorithms, Mobile Programming, Artificial Intelligence, Machine Learning, Deep Learning, Functional Programming.",
  },
  {
    school: "Humber Institute of Technology and Advanced Learning",
    credential: "Diploma in Computer Programming",
    location: "Toronto, ON",
    period: "Jan 2024 – May 2025",
    detail:
      "Algorithms, OOP, React, Database Concepts & Design, Python, Full Stack Development (Node.js).",
  },
  {
    school: "Northeast Normal University",
    credential: "B.Sc. in Geographic Information System",
    location: "Changchun, China",
    period: "Sep 2007 – Sep 2011",
    detail:
      "Cartography & Geoprocessing, Remote Sensing, GIS Programming, Data Structures, Database Principles.",
  },
];

export const certifications: Certification[] = [
  {
    name: "Project Management Professional (PMP)®",
    issuer: "PMI",
    detail: "Issued Mar 2023 · Expires Mar 2029 · Credential ID 3524772",
  },
];
