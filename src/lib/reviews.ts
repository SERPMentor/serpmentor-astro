/**
 * Tool reviews shown on /reviews.
 *
 * `link` is where the "Visit site" button points — put your affiliate URL here
 * when you have one, otherwise a plain link to the tool. `readMore` (optional)
 * points at a SERP Mentor article that covers the tool in depth.
 *
 * Keep `rating` honest and to one decimal. Order within a category = our
 * preference, best first.
 */

export interface ToolReview {
  name: string;
  category: string;
  /** one-line take */
  verdict: string;
  bestFor: string;
  rating: number; // out of 5
  price: string;
  strengths: string[];
  watchOuts: string[];
  link: string;
  readMore?: string;
}

export const REVIEW_CATEGORIES = [
  "All-in-one SEO",
  "AI content",
  "Rank tracking",
  "Link building",
  "Hosting",
] as const;

export const TOOL_REVIEWS: ToolReview[] = [
  {
    name: "Semrush",
    category: "All-in-one SEO",
    verdict:
      "The most complete toolkit for teams running large content and link programs. You grow into it rather than out of it.",
    bestFor: "Agencies and in-house teams managing lots of pages",
    rating: 4.6,
    price: "From ~$140/mo",
    strengths: [
      "Deep keyword, competitor and gap analysis",
      "Solid site audit and position tracking",
      "Broad data set for most countries",
    ],
    watchOuts: ["Expensive once you add seats and add-ons", "A lot of UI to learn"],
    link: "https://www.semrush.com/",
    readMore: "/seo/best-ai-seo-tools",
  },
  {
    name: "Ahrefs",
    category: "All-in-one SEO",
    verdict:
      "Still the benchmark for backlink data, and the crawler and keyword tools have caught up. The one we reach for on link work.",
    bestFor: "Link analysis and competitor research",
    rating: 4.6,
    price: "From ~$129/mo",
    strengths: [
      "Best-in-class backlink index",
      "Fast, accurate site crawler",
      "Genuinely useful content-gap tools",
    ],
    watchOuts: ["No free trial", "Credit limits on the lower plans"],
    link: "https://ahrefs.com/",
    readMore: "/seo/best-ai-seo-tools",
  },
  {
    name: "Frase",
    category: "AI content",
    verdict:
      "A practical brief-and-draft tool that keeps writers anchored to what's actually ranking, without over-optimising.",
    bestFor: "Content teams producing briefs at volume",
    rating: 4.2,
    price: "From ~$15/mo",
    strengths: [
      "Fast SERP research and outline building",
      "Clean brief hand-off for writers",
      "Reasonable entry price",
    ],
    watchOuts: ["Draft output still needs a real editor", "Query limits on the starter plan"],
    link: "https://www.frase.io/",
  },
  {
    name: "Surfer SEO",
    category: "AI content",
    verdict:
      "Strong on-page optimisation guidance. Best used as a check at the end, not a rule to write to.",
    bestFor: "Optimising and refreshing existing pages",
    rating: 4.0,
    price: "From ~$99/mo",
    strengths: [
      "Clear content-score workflow",
      "Good internal-linking suggestions",
      "Integrates with Google Docs",
    ],
    watchOuts: ["Easy to over-optimise if you chase the score", "Pricey for occasional use"],
    link: "https://surferseo.com/",
  },
  {
    name: "SE Ranking",
    category: "Rank tracking",
    verdict:
      "Accurate daily tracking with local and device breakdowns at a fraction of the big-suite price.",
    bestFor: "Businesses that mainly need reliable rank data",
    rating: 4.3,
    price: "From ~$65/mo",
    strengths: [
      "Precise location and device tracking",
      "White-label client reports",
      "Now tracks AI-overview presence",
    ],
    watchOuts: ["Keyword research is decent, not deep", "Interface feels dated in places"],
    link: "https://seranking.com/",
  },
  {
    name: "Hostinger",
    category: "Hosting",
    verdict:
      "The sensible starting host for a new site. Fast enough, cheap, and it won't fall over as you grow into real traffic.",
    bestFor: "New blogs and small business sites",
    rating: 4.1,
    price: "From ~$3/mo",
    strengths: [
      "Good Core Web Vitals out of the box",
      "Free CDN and caching included",
      "Simple, fast control panel",
    ],
    watchOuts: ["Renewal prices jump after the intro term", "Support is chat-only"],
    link: "https://www.hostinger.com/",
  },
];

export function reviewsByCategory(): { category: string; tools: ToolReview[] }[] {
  return REVIEW_CATEGORIES.map((category) => ({
    category,
    tools: TOOL_REVIEWS.filter((t) => t.category === category),
  })).filter((group) => group.tools.length > 0);
}

/** e.g. 4.6 -> "★★★★★" plus a half flag for display */
export function stars(rating: number): { full: number; half: boolean; empty: number } {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return { full, half, empty: 5 - full - (half ? 1 : 0) };
}
