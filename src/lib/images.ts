/**
 * Map a remote image URL to its locally-hosted copy.
 *
 * `scripts/fetch-images.mjs` runs before the build, downloads every remote
 * image into public/images/wp, and writes image-map.json. If a URL isn't in
 * the map (script not run, or a brand-new image) we fall back to the remote
 * URL so nothing breaks.
 */
import map from "./image-map.json";

const imageMap = map as Record<string, string>;

export function localImage(url?: string | null): string {
  if (!url) return "";
  return imageMap[url] ?? imageMap[url.split("?")[0]] ?? url;
}

/** Rewrite every <img src> in a chunk of HTML to its local copy. */
export function localiseImages(html: string): string {
  if (!html) return html;
  return html.replace(
    /(<img\b[^>]*\bsrc=["'])([^"']+)(["'])/gi,
    (_m, pre, src, post) => `${pre}${localImage(src)}${post}`,
  );
}
