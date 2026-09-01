import type { APIRoute } from "astro";
import { getAllPosts, getCategories, postPath, categoryPath, isBacklinksCategory } from "../lib/posts";
import { PILLARS, pillarPath } from "../lib/pillars";
import { getSitePages, pagePath } from "../lib/pages";
import { listAuthors, authorPath } from "../lib/authors";
import { NICHES } from "../lib/niches";
import { SEO_GUIDES, guidePath } from "../lib/seo-guides";
import { SITE_URL } from "../lib/site";

/**
 * Dynamic sitemap — rebuilt on every deploy from the same data the pages use,
 * so new posts, categories and pillars appear automatically. `/search` and the
 * JSON/redirect helpers are deliberately left out (noindex / not pages).
 */

const STATIC_PATHS = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/blog", priority: "0.9", changefreq: "daily" },
  { path: "/resources", priority: "0.7", changefreq: "monthly" },
  { path: "/reviews", priority: "0.7", changefreq: "monthly" },
  { path: "/services", priority: "0.8", changefreq: "monthly" },
  { path: "/website-design", priority: "0.8", changefreq: "monthly" },
  { path: "/hire-seo-specialist", priority: "0.8", changefreq: "monthly" },
  { path: "/local-seo-services", priority: "0.8", changefreq: "monthly" },
  { path: "/coaching", priority: "0.8", changefreq: "monthly" },
  { path: "/seo/for", priority: "0.7", changefreq: "monthly" },
  { path: "/seo/guides", priority: "0.8", changefreq: "monthly" },
  { path: "/seo/backlinks/uk-posting-sites", priority: "0.7", changefreq: "monthly" },
  { path: "/seo/backlinks/dating-posting-sites", priority: "0.7", changefreq: "monthly" },
  { path: "/seo/backlinks/lifestyle-posting-sites", priority: "0.7", changefreq: "monthly" },
  { path: "/seo/backlinks/finance-posting-sites", priority: "0.7", changefreq: "monthly" },
  { path: "/seo/backlinks/real-estate-posting-sites", priority: "0.7", changefreq: "monthly" },
  { path: "/about", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "yearly" },
];

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
const esc = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

interface Entry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

export const GET: APIRoute = async () => {
  const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);

  const entries: Entry[] = [];

  for (const s of STATIC_PATHS) {
    entries.push({ loc: abs(s.path), changefreq: s.changefreq, priority: s.priority });
  }

  // WordPress-backed pages still rendered via [page].astro (careers, legal)
  for (const page of getSitePages()) {
    entries.push({ loc: abs(pagePath(page)), changefreq: "yearly", priority: page.legal ? "0.2" : "0.5" });
  }

  for (const cat of categories) {
    // the backlinks category's archive IS the /seo/backlinks pillar, added below
    if (isBacklinksCategory(cat.slug)) continue;
    entries.push({ loc: abs(categoryPath(cat.slug)), changefreq: "weekly", priority: "0.7" });
  }

  for (const pillar of PILLARS) {
    entries.push({ loc: abs(pillarPath(pillar)), changefreq: "weekly", priority: "0.8" });
  }

  for (const author of listAuthors()) {
    entries.push({ loc: abs(authorPath(author)), changefreq: "monthly", priority: "0.4" });
  }

  for (const niche of NICHES) {
    entries.push({ loc: abs(`/seo/for/${niche.slug}`), changefreq: "monthly", priority: "0.7" });
  }

  for (const guide of SEO_GUIDES) {
    entries.push({ loc: abs(guidePath(guide)), changefreq: "monthly", priority: "0.7" });
  }

  for (const post of posts) {
    entries.push({
      loc: abs(postPath(post)),
      lastmod: post.date ? new Date(post.date).toISOString() : undefined,
      changefreq: "monthly",
      priority: "0.6",
    });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url>\n    <loc>${esc(e.loc)}</loc>` +
      (e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : "") +
      (e.changefreq ? `\n    <changefreq>${e.changefreq}</changefreq>` : "") +
      (e.priority ? `\n    <priority>${e.priority}</priority>` : "") +
      `\n  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
