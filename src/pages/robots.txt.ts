import type { APIRoute } from "astro";
import { SITE_URL } from "../lib/site";

/**
 * Dynamic robots.txt. Allows everything except the in-browser search results
 * page and the JSON index it uses, and points crawlers at the sitemap.
 */
export const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /search",
    "Disallow: /search-index.json",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
