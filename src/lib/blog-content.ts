/**
 * Optional per-post overrides for blog articles, keyed by WordPress slug.
 *
 * When a slug appears in BLOG_CONTENT with a `bodyHtml`, PostArticle.astro
 * renders that instead of the live WordPress body. This is DELIBERATELY EMPTY:
 * the site renders every post's real WordPress content.
 *
 * Wholesale rewrites were reverted because they dropped original substance
 * (e.g. the full list in "Top 300+ Dofollow Backlink Sites"). Content work
 * should instead be done as targeted freshness updates and gap-filling on the
 * real content, applied in WordPress. If in future a single section needs to be
 * injected or refreshed from code, add a narrow entry here rather than a full
 * body replacement.
 */

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogRewrite {
  /** override the <h1> / article title */
  title?: string;
  /** override the <title> tag (include " | SERP Mentor") */
  metaTitle?: string;
  /** override the meta description (~155 chars) */
  metaDescription?: string;
  /** override the card / OG excerpt */
  excerpt?: string;
  /** "Updated {month year}" freshness date */
  updated?: string;
  /** full body replacement — avoid; prefer editing the real content in WordPress */
  bodyHtml?: string;
  /** optional FAQ block -> FAQPage schema + on-page accordion */
  faqs?: BlogFaq[];
}

export const BLOG_CONTENT: Record<string, BlogRewrite> = {};
