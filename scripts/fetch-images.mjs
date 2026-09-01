/**
 * Prebuild step: download every remote image the site references (post
 * featured images, WordPress page images, team / author photos) into
 * public/images/wp, and write src/lib/image-map.json mapping the remote URL to
 * the local path. `localImage()` reads that map at build time.
 *
 * Run automatically by `npm run build`; safe to run again (skips existing).
 */
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";
import crypto from "node:crypto";

const WP_URL = "https://cms.serpmentor.com";
const ENDPOINT = `${WP_URL}/graphql`;
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images", "wp");
const MAP_FILE = path.join(ROOT, "src", "lib", "image-map.json");

const IMG_EXT = /\.(?:png|jpe?g|webp|gif|avif|svg)(?:\?.*)?$/i;
const isImageUrl = (u) =>
  IMG_EXT.test(u) || /images\.unsplash\.com|secure\.gravatar\.com/.test(u);

/** collect remote image URLs from every source */
async function collectUrls() {
  const urls = new Set();

  // 1. hard-coded refs in the data files + hand-built pages that embed an image
  for (const file of [
    "src/lib/team.ts",
    "src/lib/authors.ts",
    "src/pages/about.astro",
    "src/pages/coaching.astro",
  ]) {
    try {
      const text = await readFile(path.join(ROOT, file), "utf8");
      for (const m of text.matchAll(/https?:\/\/[^"'\s)]+/g)) {
        if (isImageUrl(m[0])) urls.add(m[0]);
      }
    } catch {}
  }

  // 2. GraphQL — post featured images + images inside post content
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ posts(first: 100) { nodes { featuredImage { node { sourceUrl } } content } } }`,
      }),
    });
    const json = await res.json();
    for (const n of json?.data?.posts?.nodes ?? []) {
      const u = n?.featuredImage?.node?.sourceUrl;
      if (u && isImageUrl(u)) urls.add(u);
      for (const m of (n?.content ?? "").matchAll(
        /<img\b[^>]*\bsrc=["']([^"']+)["']/gi,
      )) {
        if (
          isImageUrl(m[1]) &&
          m[1].includes("serpmentor.com") &&
          !/api\.themeisle\.com|\/plugins\//.test(m[1])
        ) {
          urls.add(m[1]);
        }
      }
    }
  } catch (e) {
    console.warn("  ! could not fetch post images:", e.message);
  }

  // 3. GraphQL — content images inside the WordPress "pages" we render
  const pageSlugs = [
    "coaching",
    "seo-specialist-service",
    "local-seo-services",
    "career",
    "privacy-policy",
    "terms-and-conditions",
  ];
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ ${pageSlugs
          .map((s, i) => `p${i}: page(id: "${s}", idType: URI) { content }`)
          .join(" ")} }`,
      }),
    });
    const json = await res.json();
    for (const v of Object.values(json?.data ?? {})) {
      for (const m of (v?.content ?? "").matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
        if (
          IMG_EXT.test(m[1]) &&
          m[1].includes("serpmentor.com") &&
          !/api\.themeisle\.com|\/plugins\//.test(m[1])
        ) {
          urls.add(m[1]);
        }
      }
    }
  } catch (e) {
    console.warn("  ! could not fetch page images:", e.message);
  }

  return [...urls];
}

function localName(url) {
  const clean = url.split("?")[0];
  let base = path
    .basename(clean)
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .toLowerCase();
  if (!/\.(png|jpe?g|webp|gif|avif|svg)$/i.test(base)) base += ".jpg";
  const hash = crypto.createHash("sha1").update(url).digest("hex").slice(0, 8);
  return `${hash}-${base}`;
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (SERP Mentor build)" },
  });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const urls = await collectUrls();
  console.log(`fetch-images: ${urls.length} remote images`);

  const map = {};
  let fetched = 0;
  let skipped = 0;

  for (const url of urls) {
    const name = localName(url);
    const dest = path.join(OUT_DIR, name);
    const publicPath = `/images/wp/${name}`;
    map[url] = publicPath;

    if (await exists(dest)) {
      skipped++;
      continue;
    }
    try {
      await download(url, dest);
      fetched++;
    } catch (e) {
      console.warn(`  ! ${url} → ${e.message} (keeping remote URL)`);
      delete map[url];
    }
  }

  await writeFile(MAP_FILE, JSON.stringify(map, null, 2) + "\n");
  console.log(
    `fetch-images: ${fetched} downloaded, ${skipped} cached, ${Object.keys(map).length} mapped`,
  );
}

await main();
