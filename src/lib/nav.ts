/**
 * Site navigation. Edit this and both the desktop mega menu and the mobile
 * drawer update (src/components/SiteHeader.astro renders it).
 *
 * A NavItem is either a plain link (`href`) or a mega-menu item (`columns`,
 * plus an optional `promo` box).
 */

export interface MegaLink {
  label: string;
  href: string;
  /** one-line description shown under the label in the mega panel */
  desc?: string;
  /** Font Awesome class, e.g. "fa-solid fa-link" */
  icon?: string;
}

export interface MegaColumn {
  heading: string;
  links: MegaLink[];
}

export interface NavPromo {
  eyebrow: string;
  title: string;
  href: string;
  cta: string;
}

export interface NavItem {
  label: string;
  /** plain link target, or the "landing" page a mega item points to on click */
  href?: string;
  columns?: MegaColumn[];
  promo?: NavPromo;
}

/** a mega item has columns; a plain item is just a link */
export const isMega = (item: NavItem): boolean => Array.isArray(item.columns);

export const NAV: NavItem[] = [
  {
    label: "SEO Guides",
    href: "/seo",
    columns: [
      {
        heading: "By topic",
        links: [
          {
            label: "Technical & On-Page SEO",
            href: "/seo/tech",
            icon: "fa-solid fa-screwdriver-wrench",
            desc: "Crawling, indexing, speed and on-page",
          },
          {
            label: "Link Building & Backlinks",
            href: "/seo/backlinks",
            icon: "fa-solid fa-link",
            desc: "Earn links, audit your profile",
          },
          {
            label: "AI Search Optimization",
            href: "/seo/ai-optimization",
            icon: "fa-solid fa-robot",
            desc: "Get cited by ChatGPT, Gemini and AI answers",
          },
          {
            label: "SEO Tools & Reviews",
            href: "/seo/tools",
            icon: "fa-solid fa-toolbox",
            desc: "What we use and recommend",
          },
          {
            label: "SEO News & Updates",
            href: "/seo/news",
            icon: "fa-solid fa-newspaper",
            desc: "Algorithm changes and what they mean",
          },
        ],
      },
      {
        heading: "Browse",
        links: [
          { label: "All SEO guides", href: "/seo", icon: "fa-solid fa-magnifying-glass-chart" },
          { label: "Trending SEO topics", href: "/seo/guides", icon: "fa-solid fa-fire", desc: "AI Overviews, GEO, INP and 17 more" },
          { label: "SEO by industry", href: "/seo/for", icon: "fa-solid fa-store", desc: "Plumbers, dentists, SaaS and 50+ more" },
          { label: "LinkedIn growth", href: "/linkedin", icon: "fa-brands fa-linkedin-in" },
          { label: "SEO case studies", href: "/case-study", icon: "fa-solid fa-chart-line" },
          { label: "The full blog", href: "/blog", icon: "fa-solid fa-book-open" },
        ],
      },
    ],
    promo: {
      eyebrow: "Looking for something specific?",
      title: "Search every SERP Mentor guide",
      href: "/search",
      cta: "Open search",
    },
  },
  {
    label: "Free Tools",
    href: "/resources",
    columns: [
      {
        heading: "Use for free",
        links: [
          {
            label: "Free checkers & frameworks",
            href: "/resources",
            icon: "fa-solid fa-toolbox",
            desc: "On-page checker, SERP preview, keyword density and planning templates",
          },
          {
            label: "SEO tool reviews",
            href: "/reviews",
            icon: "fa-solid fa-star",
            desc: "Honest, ROI-first verdicts on the tools we run on client work",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "Weekly",
      title: "Get new tools and research first",
      href: "/resources#newsletter",
      cta: "Join the newsletter",
    },
  },
  {
    label: "Services",
    href: "/services",
    columns: [
      {
        heading: "Work with us",
        links: [
          {
            label: "SEO services & pricing",
            href: "/services",
            icon: "fa-solid fa-briefcase",
            desc: "Custom plans, no fixed packages",
          },
          {
            label: "Website design & development",
            href: "/website-design",
            icon: "fa-solid fa-laptop-code",
            desc: "Any business, built SEO-first to rank and convert",
          },
          {
            label: "Hire an SEO specialist",
            href: "/hire-seo-specialist",
            icon: "fa-solid fa-user-tie",
            desc: "A senior SEO who owns the outcome",
          },
          {
            label: "Local SEO",
            href: "/local-seo-services",
            icon: "fa-solid fa-map-location-dot",
            desc: "Rank in the map pack and local results",
          },
          {
            label: "SEO coaching",
            href: "/coaching",
            icon: "fa-solid fa-compass",
            desc: "1:1 mentorship with Saiful",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "Not sure which fits?",
      title: "Book a free SEO session",
      href: "/contact",
      cta: "Talk to us",
    },
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** true when the current path sits under this item's link or any mega sub-link */
export function navItemActive(item: NavItem, path: string): boolean {
  const under = (href: string) => {
    const h = href.replace(/[#?].*$/, "").replace(/\/+$/, "") || "/";
    return h !== "/" && (path === h || path.startsWith(h + "/"));
  };
  if (item.href && under(item.href)) return true;
  return (item.columns ?? []).some((col) => col.links.some((l) => under(l.href)));
}
