/**
 * One place that talks to WordPress and one place that decides post URLs.
 *
 * URL shape (matches a WordPress "/%category%/%postname%/" permalink):
 *   /{category-slug}/                 → category archive
 *   /{category-slug}/{post-slug}/     → single post
 *
 * A post can sit in several WordPress categories; we treat the first one as
 * its "primary" category and that is the one its URL is built from, so every
 * post lives at exactly one address.
 */

// WordPress lives on a subdomain; the public site is serpmentor.com.
export const WP_URL = "https://cms.serpmentor.com";
const ENDPOINT = `${WP_URL}/graphql`;

export interface WPCategory {
  name: string;
  slug: string;
}

export interface WPImage {
  sourceUrl: string;
  altText: string;
}

export interface WPAuthor {
  name: string;
  slug: string;
}

export interface WPPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  categories?: { nodes: WPCategory[] };
  featuredImage?: { node: WPImage | null } | null;
  author?: { node: WPAuthor | null } | null;
}

export interface CategorySummary extends WPCategory {
  count: number;
}

/** Used when a post has no category attached in WordPress. */
const FALLBACK_CATEGORY: WPCategory = { name: "Articles", slug: "articles" };

async function graphql<T>(query: string): Promise<T | null> {
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const json = await response.json();
    return (json?.data as T) ?? null;
  } catch (error) {
    console.error("GraphQL request failed", error);
    return null;
  }
}

// Cache the list for the lifetime of one page render so the archive route and
// its getStaticPaths don't hit the API twice.
let postsPromise: Promise<WPPost[]> | null = null;

export function getAllPosts(): Promise<WPPost[]> {
  if (!postsPromise) {
    // WPGraphQL only returns PUBLISHED posts to unauthenticated requests, so a
    // WordPress draft appears here (with the new design, clean URL and 301s)
    // automatically on the next build, the moment it is published. `first: 200`
    // is a safe ceiling well above the current count.
    postsPromise = graphql<{ posts: { nodes: WPPost[] } }>(`
      {
        posts(first: 200) {
          nodes {
            title
            slug
            date
            excerpt
            categories { nodes { name slug } }
            featuredImage { node { sourceUrl altText } }
            author { node { name slug } }
          }
        }
      }
    `).then((data) => {
      const nodes = data?.posts?.nodes ?? [];
      const HIDE = new Set(["sample-post-test", "hello-world", "auto-draft"]);
      return nodes
        .filter((n) => !HIDE.has(n.slug))
        .sort((a, b) => +new Date(b.date) - +new Date(a.date));
    });
  }
  return postsPromise;
}

export function primaryCategory(post: WPPost): WPCategory {
  return post.categories?.nodes?.[0] ?? FALLBACK_CATEGORY;
}

export function featuredImage(post: WPPost): WPImage | null {
  return post.featuredImage?.node ?? null;
}

/**
 * Link-building posts (the "…posting sites" / "…guest posting sites" lists and
 * the backlink guides) live under the backlinks pillar: /seo/backlinks/{slug}.
 * Any of these WordPress category slugs maps there.
 */
export const BACKLINKS_CATEGORY_SLUGS = new Set([
  "seo-backlinks",
  "backlinks",
  "link-building",
]);

export function isBacklinksCategory(slug: string): boolean {
  return BACKLINKS_CATEGORY_SLUGS.has(slug);
}

/**
 * Slugs that have a dedicated hand-built page at /seo/backlinks/{slug}
 * (src/pages/seo/backlinks/{slug}.astro). If a WordPress post exists with the
 * same slug it is not rendered from WP; its listing entry just links here.
 */
export const BACKLINKS_STATIC_SLUGS = new Set([
  "uk-posting-sites",
  "dating-posting-sites",
  "lifestyle-posting-sites",
  "finance-posting-sites",
  "real-estate-posting-sites",
  "gadget-posting-sites",
  "usa-posting-sites",
]);

/** Canonical path for a single post, e.g. "/seo/best-ai-seo-tools". */
export function postPath(post: WPPost): string {
  const cat = primaryCategory(post).slug;
  if (BACKLINKS_STATIC_SLUGS.has(post.slug) || isBacklinksCategory(cat)) {
    return `/seo/backlinks/${post.slug}`;
  }
  return `/${cat}/${post.slug}`;
}

/** Canonical path for a category archive, e.g. "/seo". */
export function categoryPath(slug: string): string {
  if (isBacklinksCategory(slug)) return "/seo/backlinks";
  return `/${slug}`;
}

export interface CategoryMeta {
  /** page <h1> */
  heading: string;
  /** <title> (SERP Mentor is appended) and used for SEO */
  title: string;
  /** meta description + hero intro */
  description: string;
  /** Font Awesome icon + accent for the hero chip */
  icon: string;
  color: string;
  colorSoft: string;
  /** short badges shown under the heading */
  highlights: string[];
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  seo: {
    heading: "SEO Guides & Tutorials",
    title: "SEO Guides, Frameworks & Tutorials for 2026",
    description:
      "Every SEO guide we publish, in one place. Technical SEO, on-page, link building, keyword research, AI search visibility. Tested on real projects. Written without the fluff.",
    icon: "fa-solid fa-magnifying-glass-chart",
    color: "#00a988",
    colorSoft: "rgba(0, 188, 152, 0.16)",
    highlights: ["Technical & on-page", "Link building", "Keyword research", "AI search"],
  },
  "seo-backlinks": {
    heading: "Link Building & Backlink Guides",
    title: "Link Building & Backlink Strategy Guides",
    description:
      "How to earn authoritative backlinks, audit your link profile, and close the gap on competitors. Tactics that still work, plus lists of places to actually get links.",
    icon: "fa-solid fa-link",
    color: "#d8412c",
    colorSoft: "rgba(241, 94, 74, 0.16)",
    highlights: ["Link building tactics", "Backlink audits", "Competitor gap analysis"],
  },
  linkedin: {
    heading: "LinkedIn Growth Guides",
    title: "LinkedIn Marketing & AI Tools Guides",
    description:
      "Growing a LinkedIn presence that actually drives pipeline. Content systems, free AI tools, and the workflows that turn posts into conversations.",
    icon: "fa-brands fa-linkedin-in",
    color: "#0a66c2",
    colorSoft: "rgba(10, 102, 194, 0.14)",
    highlights: ["Content systems", "Free AI tools", "Profile optimization"],
  },
  "case-study": {
    heading: "SEO Case Studies",
    title: "SEO Case Studies: Real Campaigns, Documented Results",
    description:
      "Full write-ups of real SEO campaigns: the starting point, what we changed, and what the traffic did. Numbers included, no cherry-picking.",
    icon: "fa-solid fa-chart-line",
    color: "#8256c5",
    colorSoft: "rgba(130, 86, 197, 0.16)",
    highlights: ["Real projects", "Documented results", "Full methodology"],
  },
};

export function categoryMeta(slug: string, fallbackName: string): CategoryMeta {
  return (
    CATEGORY_META[slug] ?? {
      heading: `${fallbackName} Guides & Resources`,
      title: `${fallbackName} Guides, Tutorials & Resources`,
      description: `Every SERP Mentor guide, framework, and case study on ${fallbackName.toLowerCase()}. Practical and tested.`,
      icon: "fa-solid fa-book-open",
      color: "#00a988",
      colorSoft: "rgba(0, 188, 152, 0.16)",
      highlights: [],
    }
  );
}

export function formatDate(date: string, month: "long" | "short" = "long"): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month,
    day: "numeric",
  });
}

/** Every category that has at least one post, most-populated first. */
export async function getCategories(): Promise<CategorySummary[]> {
  const posts = await getAllPosts();
  const bySlug = new Map<string, CategorySummary>();

  for (const post of posts) {
    const category = primaryCategory(post);
    const existing = bySlug.get(category.slug);
    if (existing) {
      existing.count += 1;
    } else {
      bySlug.set(category.slug, { ...category, count: 1 });
    }
  }

  return [...bySlug.values()].sort((a, b) => b.count - a.count);
}

export async function getPostsInCategory(slug: string): Promise<WPPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => primaryCategory(post).slug === slug);
}

/** Up to `limit` other posts, preferring the same category. */
export async function getRelatedPosts(post: WPPost, limit = 3): Promise<WPPost[]> {
  const posts = await getAllPosts();
  const others = posts.filter((candidate) => candidate.slug !== post.slug);
  const sameCategory = others.filter(
    (candidate) => primaryCategory(candidate).slug === primaryCategory(post).slug,
  );
  const pool = sameCategory.length >= limit ? sameCategory : [...sameCategory, ...others];
  const seen = new Set<string>();
  return pool.filter((p) => !seen.has(p.slug) && seen.add(p.slug)).slice(0, limit);
}
