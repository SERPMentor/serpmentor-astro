import type { APIRoute } from "astro";
import {
  getAllPosts,
  getCategories,
  postPath,
  categoryPath,
  primaryCategory,
  categoryMeta,
  formatDate,
} from "../lib/posts";
import { PILLARS, pillarPath } from "../lib/pillars";
import { SEO_GUIDES, guidePath } from "../lib/seo-guides";
import { NICHES } from "../lib/niches";
import { getSitePages, pagePath } from "../lib/pages";
import { cleanExcerpt } from "../lib/excerpt";

/**
 * The search index the command palette fetches once and ranks in the browser.
 * Covers everything a visitor might look for: guides, SEO pillars, category
 * archives, industry pages, service pages, tools and static pages.
 * Rebuilt on every deploy.
 */

interface Item {
  type: "guide" | "pillar" | "category" | "industry" | "service" | "tool" | "page";
  title: string;
  url: string;
  desc: string;
  /** extra words to match on, space-joined */
  keywords: string;
  date?: string;
  /** unix ms, for recency tie-breaks */
  ts?: number;
}

export const GET: APIRoute = async () => {
  const items: Item[] = [];

  // --- blog guides ------------------------------------------------
  const posts = await getAllPosts();
  for (const post of posts) {
    const cat = primaryCategory(post);
    items.push({
      type: "guide",
      title: post.title,
      url: postPath(post),
      desc: cleanExcerpt(post.excerpt, 150),
      keywords: `${cat.name} guide article ${post.slug.replace(/-/g, " ")}`,
      date: formatDate(post.date, "short"),
      ts: post.date ? +new Date(post.date) : undefined,
    });
  }

  // --- SEO pillars ----------------------------------------------
  const stripTags = (html: string) =>
    html.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
  // hand-added synonyms so common phrasings still find the right pillar
  const PILLAR_KW: Record<string, string> = {
    tech: "meta description title tag heading structure h1 h2 canonical tag schema markup structured data hreflang crawl budget crawlability indexation robots txt xml sitemap page speed site speed core web vitals lcp inp cls first input delay fid redirect chain 404 noindex site architecture url structure mobile first programmatic seo doorway pages json-ld rich results",
    backlinks: "link building backlinks off-page anchor text guest post digital pr data journalism newsjacking link gap analysis disavow toxic links nofollow dofollow domain rating referring domains outreach broken link building unlinked mentions brand mentions do links still matter",
    news: "algorithm update core update google update march 2024 spam update e-e-a-t eeat helpful content ranking drop recovery serp volatility ai overviews ai mode sge zero click search click decline content decay content refresh update timeline",
    tools: "seo tools best seo software semrush ahrefs moz screaming frog surfer frase rank tracker keyword tool free seo checker ai visibility tracker llm tracking seo stack",
    "ai-optimization": "aeo geo llmo answer engine optimization generative engine optimization chatgpt perplexity gemini copilot ai overviews get cited by ai llm optimization llms.txt gptbot google-extended ai crawlers entity seo topical authority knowledge graph",
  };
  for (const p of PILLARS) {
    items.push({
      type: "pillar",
      title: p.title,
      url: pillarPath(p),
      desc: p.intro,
      keywords: `${p.name} pillar hub ${p.cardText} ${p.guidesHeading} ${PILLAR_KW[p.slug] ?? ""} ${stripTags(p.bodyHtml)}`,
    });
  }

  // --- trending SEO topic guides -------------------------------
  for (const g of SEO_GUIDES) {
    items.push({
      type: "guide",
      title: g.title,
      url: guidePath(g),
      desc: g.metaDescription,
      keywords: `${g.keyword} trending seo topic ${g.theme} ${stripTags(g.bodyHtml)} ${g.faqs
        .map((f) => f.q)
        .join(" ")}`,
      ts: Date.parse("2026-09-01"),
    });
  }

  // --- hand-built link-building posts --------------------------
  items.push({
    type: "guide",
    title: "UK Posting Sites: 100 Places to Publish",
    url: "/seo/backlinks/uk-posting-sites",
    desc: "100 UK sites for guest posts and contributions, with Domain Rating, Domain Authority and traffic, plus how to shortlist and pitch them.",
    keywords:
      "uk posting sites uk guest posting sites uk guest post opportunities backlink sites domain rating domain authority link building outreach guest blogging",
    ts: Date.parse("2026-09-01"),
  });

  // --- category archives ---------------------------------------
  for (const c of await getCategories()) {
    const meta = categoryMeta(c.slug, c.name);
    items.push({
      type: "category",
      title: meta.heading,
      url: categoryPath(c.slug),
      desc: meta.description,
      keywords: `${c.name} archive all guides ${meta.highlights.join(" ")}`,
    });
  }

  // --- industry SEO pages ------------------------------------
  for (const n of NICHES) {
    items.push({
      type: "industry",
      title: `SEO for ${n.label}`,
      url: `/seo/for/${n.slug}`,
      desc: n.edge,
      keywords: `${n.keyword} ${n.label} website design industry local ${n.clusters
        .flatMap((cl) => cl.terms)
        .join(" ")}`,
    });
  }
  items.push({
    type: "industry",
    title: "SEO by industry",
    url: "/seo/for",
    desc: "SEO built around your industry: trades, practices, content sites and online stores.",
    keywords: "industry niche vertical by industry",
  });

  // --- service pages -----------------------------------------
  const services: Item[] = [
    { type: "service", title: "SEO services & pricing", url: "/services", desc: "Custom SEO plans, no fixed packages. Audit first, then a plan priced to pay for itself.", keywords: "seo services pricing packages retainer hire agency" },
    { type: "service", title: "Website design & development", url: "/website-design", desc: "Any business, built SEO-first to rank and convert. Fast, mobile, conversion-focused.", keywords: "website design development build web design agency wordpress shopify astro" },
    { type: "service", title: "Hire an SEO specialist", url: "/hire-seo-specialist", desc: "A senior SEO who does the work, not just the strategy deck.", keywords: "hire seo specialist consultant freelance senior" },
    { type: "service", title: "Local SEO services", url: "/local-seo-services", desc: "Rank in the map pack and local results. Google Business Profile, citations, reviews.", keywords: "local seo map pack google business profile citations near me multi location" },
    { type: "service", title: "SEO coaching with Saiful", url: "/coaching", desc: "One-to-one SEO mentorship taught from real client work.", keywords: "seo coaching mentorship training 1:1 learn" },
    { type: "service", title: "Contact SERP Mentor", url: "/contact", desc: "Tell us what you're working on and we'll tell you the honest next step.", keywords: "contact get in touch enquiry quote audit whatsapp email" },
  ];
  items.push(...services);

  // --- tools & resources ------------------------------------
  items.push(
    { type: "tool", title: "Free SEO tools & frameworks", url: "/resources", desc: "The checkers, checklists and planning frameworks we use on client work.", keywords: "free tools checker audit keyword density serp preview robots txt framework checklist" },
    { type: "tool", title: "SEO tool reviews", url: "/reviews", desc: "ROI-first reviews of the SEO and content tools we actually use.", keywords: "reviews tools semrush ahrefs frase surfer se ranking hostinger comparison" },
  );

  // --- static pages ---------------------------------------
  items.push(
    { type: "page", title: "SEO Blog", url: "/blog", desc: "Every guide we publish on SEO, AI search and growth.", keywords: "blog articles all posts latest" },
    { type: "page", title: "About SERP Mentor", url: "/about", desc: "Saiful and a small team of search strategists, in SEO since 2007.", keywords: "about team story founder saiful company" },
  );
  for (const sp of getSitePages()) {
    items.push({
      type: "page",
      title: sp.heading,
      url: pagePath(sp),
      desc: sp.description,
      keywords: `${sp.label} ${sp.eyebrow}`,
    });
  }

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
  });
};
