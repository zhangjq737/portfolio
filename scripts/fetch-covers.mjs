// One-off helper: fetch freely-licensed cover images from Wikimedia Commons.
// Saves <slug>.jpg into public/projects/ and writes CREDITS.md with attribution.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const OUT = path.join(process.cwd(), "public", "projects");
fs.mkdirSync(OUT, { recursive: true });

// slug -> Commons search query (theme of the project)
const queries = {
  "plow-routes-demo": "snowplow truck winter street",
  "cesium-3d-demo": "Shenzhen skyline night",
  "buffer-demo": "topographic contour map",
  "heatmap-demo": "city lights aerial night",
  "land-price-system": "Shenzhen city aerial",
  "planning-zoning-app": "urban planning city aerial",
  "airport-asset-management": "airport terminal aerial view",
  "police-gis-3d": "metro subway station interior",
  "road-defects-detection": "highway asphalt road aerial",
  "grid-municipal-management": "city street grid aerial",
  "portfolio-site": "source code screen programming",
};

// Wikimedia requires a descriptive User-Agent.
const UA = "portfolio-cover-fetch/1.0 (https://zhangjq737.github.io/portfolio; zjqrich@gmail.com)";
const fetchOpts = { headers: { "User-Agent": UA, Accept: "application/json" } };

async function pick(query) {
  const api =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json" +
    "&generator=search&gsrnamespace=6&gsrlimit=12" +
    `&gsrsearch=${encodeURIComponent("filetype:bitmap " + query)}` +
    "&prop=imageinfo&iiprop=url|extmetadata|mime|size&iiurlwidth=800";
  const data = await (await fetch(api, fetchOpts)).json();
  const pages = Object.values(data?.query?.pages ?? {});
  // Prefer landscape JP/PNG at decent resolution.
  const candidates = pages
    .map((p) => p.imageinfo?.[0])
    .filter(Boolean)
    .filter((ii) => /image\/(jpeg|png)/.test(ii.mime))
    .filter((ii) => ii.width >= ii.height) // landscape
    .sort((a, b) => b.width - a.width);
  return candidates[0];
}

const credits = ["# Cover image credits", "", "Source: Wikimedia Commons.", ""];

for (const [slug, query] of Object.entries(queries)) {
  try {
    const ii = await pick(query);
    if (!ii) {
      console.log(`✗ ${slug}: no candidate for "${query}"`);
      continue;
    }
    const res = await fetch(ii.thumburl, { headers: { "User-Agent": UA } });
    const buf = Buffer.from(await res.arrayBuffer());
    const tmp = path.join(OUT, `_tmp_${slug}`);
    fs.writeFileSync(tmp, buf);
    const finalPath = path.join(OUT, `${slug}.jpg`);
    if (ii.mime === "image/png") {
      execFileSync("sips", ["-s", "format", "jpeg", tmp, "--out", finalPath]);
      fs.unlinkSync(tmp);
    } else {
      fs.renameSync(tmp, finalPath);
    }
    const artist = (ii.extmetadata?.Artist?.value ?? "Unknown")
      .replace(/<[^>]+>/g, "")
      .trim();
    const license = ii.extmetadata?.LicenseShortName?.value ?? "see source";
    const title = ii.extmetadata?.ObjectName?.value ?? "";
    credits.push(`- **${slug}.jpg** — "${title}" by ${artist} (${license}). ${ii.descriptionurl}`);
    console.log(`✓ ${slug}: ${ii.width}x${ii.height} ${ii.mime} — ${title}`);
  } catch (e) {
    console.log(`✗ ${slug}: ${e.message}`);
  }
}

fs.writeFileSync(path.join(OUT, "CREDITS.md"), credits.join("\n") + "\n");
console.log("\nWrote", path.join(OUT, "CREDITS.md"));
