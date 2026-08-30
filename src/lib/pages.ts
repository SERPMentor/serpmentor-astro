/**
 * WordPress "pages" we pull into the Astro site and render in the site's own
 * design (via [page].astro). `wpSlug` is the WordPress page slug; `path` is the
 * clean URL it lives at here.
 *
 * The homepage, blog, news and case-study pages are deliberately excluded — the
 * homepage and category archives are built by hand, and `case-study` collides
 * with the category of the same name.
 */

export interface SitePage {
  wpSlug: string;
  path: string;
  /** short label for nav / breadcrumb */
  label: string;
  /** hero eyebrow */
  eyebrow: string;
  /** <h1> override (WordPress titles are often clumsy) */
  heading: string;
  /** <title> + meta description */
  metaTitle: string;
  description: string;
  /** hide from the auto-built footer "More" list (legal pages) */
  legal?: boolean;
}

export const SITE_PAGES: SitePage[] = [
  {
    wpSlug: "coaching",
    path: "coaching",
    label: "Coaching",
    eyebrow: "SEO mentorship",
    heading: "SEO coaching with Saiful",
    metaTitle: "SEO Coaching & Mentorship — Learn Organic Growth from Practice",
    description:
      "One-to-one SEO mentorship with Saiful — organic growth strategy, content architecture, and the shift to AI search, taught from real client work rather than theory.",
  },
  {
    wpSlug: "seo-specialist-service",
    path: "hire-seo-specialist",
    label: "Hire an SEO specialist",
    eyebrow: "Work with us",
    heading: "Hire an SEO specialist",
    metaTitle: "Hire an SEO Specialist — Senior, Hands-On, Accountable",
    description:
      "Bring in a senior SEO who does the work, not just the deck. Technical fixes, content strategy, link building, and AI-search visibility — owned end to end.",
  },
  {
    wpSlug: "local-seo-services",
    path: "local-seo-services",
    label: "Local SEO",
    eyebrow: "Work with us",
    heading: "Local SEO services",
    metaTitle: "Local SEO Services — Get Found in Your Market",
    description:
      "Local SEO that puts your business in the map pack and the local results your customers actually search — Google Business Profile, citations, reviews, and local content.",
  },
  {
    wpSlug: "career",
    path: "careers",
    label: "Careers",
    eyebrow: "Join the team",
    heading: "Work with SERP Mentor",
    metaTitle: "Careers at SERP Mentor — Join a Team That Ships",
    description:
      "We hire SEO and content people who like doing the work and showing their reasoning. Here's how we work and what we look for.",
  },
  {
    wpSlug: "privacy-policy",
    path: "privacy",
    label: "Privacy Policy",
    eyebrow: "Legal",
    heading: "Privacy Policy",
    metaTitle: "Privacy Policy",
    description: "How SERP Mentor collects, uses and protects your information.",
    legal: true,
  },
  {
    wpSlug: "terms-and-conditions",
    path: "terms",
    label: "Terms & Conditions",
    eyebrow: "Legal",
    heading: "Terms & Conditions",
    metaTitle: "Terms & Conditions",
    description: "The terms that govern your use of the SERP Mentor website and services.",
    legal: true,
  },
];

export function getSitePages(): SitePage[] {
  return SITE_PAGES;
}

export function pagePath(page: SitePage): string {
  return `/${page.path}`;
}
