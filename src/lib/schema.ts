/**
 * schema.org / JSON-LD builders for the whole site.
 *
 * - The base nodes (Organization + WebSite) are emitted on every page by
 *   `Favicons.astro`.
 * - Each page adds its own nodes (WebPage, BreadcrumbList, Article, Service,
 *   ItemList, FAQPage …) via `<JsonLd graph={[...]} />`.
 * - Nodes are linked by `@id` so Google reads them as one connected graph.
 *
 * Why: rich results (breadcrumbs, article, FAQ, sitelinks search) and stronger
 * entity / E-E-A-T signals for AI Overviews and AI search.
 */
import { SITE_URL, CONTACT } from "./site";
import { TEAM } from "./team";
import { localImage } from "./images";

export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;
const LOGO_URL = `${SITE_URL}/logo.png`;

export const abs = (path = "/"): string =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** canonical URL for a page from its pathname (no trailing slash) */
export const canonicalUrl = (pathname: string): string =>
  `${SITE_URL}${(pathname || "/").replace(/\/+$/, "") || ""}` || SITE_URL;

const SAME_AS = [
  "https://www.linkedin.com/company/serp-mentor/",
  "https://www.facebook.com/serpmentor/",
  "https://www.youtube.com/@serpmentor",
];

const AREA_SERVED = ["US", "CA", "AU", "GB", "NZ", "IE", "SE", "AE", "SG", "DE"];

type Node = Record<string, unknown>;

export function organizationNode(): Node {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: "SERP Mentor",
    alternateName: "SERPMentor",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: LOGO_URL,
      contentUrl: LOGO_URL,
      width: 873,
      height: 140,
      caption: "SERP Mentor",
    },
    image: { "@id": LOGO_ID },
    description:
      "SERP Mentor helps brands grow with smarter SEO, AI search visibility, content systems that convert, and websites built to rank.",
    slogan: "Learn how to win in the future of AI search",
    email: CONTACT.email,
    telephone: CONTACT.tel,
    priceRange: "$$",
    foundingDate: "2007",
    founder: {
      "@type": "Person",
      name: "MD Saiful Islam",
      url: abs("/author/md-saiful"),
    },
    knowsAbout: [
      "Search engine optimization",
      "Technical SEO",
      "Link building",
      "AI search optimization",
      "Generative engine optimization",
      "Local SEO",
      "Content strategy",
      "Website design and development",
    ],
    sameAs: SAME_AS,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.tel,
      email: CONTACT.email,
      contactType: "customer support",
      availableLanguage: ["English"],
    },
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Von Lingens Väg 31",
        postalCode: "213 70",
        addressLocality: "Malmö",
        addressCountry: "SE",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Jamuna Tower, West Shantibag, Demra",
        addressLocality: "Dhaka",
        addressCountry: "BD",
      },
    ],
    areaServed: AREA_SERVED.map((c) => ({ "@type": "Country", identifier: c })),
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: "SERP Mentor",
    description:
      "In-depth SEO, AI-search and growth guides, free tools, and website & SEO services.",
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** emitted site-wide by Favicons.astro */
export function baseGraph(): Node[] {
  return [organizationNode(), websiteNode()];
}

interface WebPageArgs {
  url: string;
  name: string;
  description?: string;
  type?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  hasBreadcrumb?: boolean;
}

export function webPageNode(args: WebPageArgs): Node {
  const {
    url,
    name,
    description,
    type = "WebPage",
    image,
    datePublished,
    dateModified,
    hasBreadcrumb = true,
  } = args;
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    isPartOf: { "@id": SITE_ID },
    inLanguage: "en",
    ...(description ? { description } : {}),
    ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: image } } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(hasBreadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

export interface Crumb {
  name: string;
  /** absolute URL; omit for the current page */
  item?: string;
}

export function breadcrumbNode(url: string, crumbs: Crumb[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.item ? { item: c.item } : {}),
    })),
  };
}

interface ArticleArgs {
  url: string;
  headline: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorUrl: string;
  section?: string;
}

export function articleNode(a: ArticleArgs): Node {
  return {
    "@type": "BlogPosting",
    "@id": `${a.url}#article`,
    isPartOf: { "@id": `${a.url}#webpage` },
    mainEntityOfPage: { "@id": `${a.url}#webpage` },
    headline: a.headline,
    ...(a.description ? { description: a.description } : {}),
    ...(a.image ? { image: { "@type": "ImageObject", url: a.image } } : {}),
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    author: { "@type": "Person", name: a.authorName, url: a.authorUrl },
    publisher: { "@id": ORG_ID },
    ...(a.section ? { articleSection: a.section } : {}),
    inLanguage: "en",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".pillar-intro", ".prose-lede", ".article-hero p"],
    },
  };
}

interface PersonArgs {
  url: string;
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  sameAs?: string[];
}

export function personNode(p: PersonArgs): Node {
  return {
    "@type": "Person",
    "@id": `${p.url}#person`,
    name: p.name,
    url: p.url,
    ...(p.jobTitle ? { jobTitle: p.jobTitle } : {}),
    ...(p.description ? { description: p.description } : {}),
    ...(p.image ? { image: p.image } : {}),
    ...(p.sameAs && p.sameAs.length ? { sameAs: p.sameAs } : {}),
    worksFor: { "@id": ORG_ID },
  };
}

interface ServiceArgs {
  url: string;
  name: string;
  description: string;
  serviceType?: string;
  areaServed?: string[];
}

export function serviceNode(s: ServiceArgs): Node {
  return {
    "@type": "Service",
    "@id": `${s.url}#service`,
    name: s.name,
    description: s.description,
    ...(s.serviceType ? { serviceType: s.serviceType } : {}),
    provider: { "@id": ORG_ID },
    areaServed: (s.areaServed ?? AREA_SERVED).map((c) => ({
      "@type": "Country",
      identifier: c,
    })),
    isPartOf: { "@id": `${s.url}#webpage` },
  };
}

interface ListItem {
  url: string;
  name: string;
}

export function itemListNode(url: string, items: ListItem[], name?: string): Node {
  return {
    "@type": "ItemList",
    "@id": `${url}#list`,
    ...(name ? { name } : {}),
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: it.url,
      name: it.name,
    })),
  };
}

/**
 * The people in `PageByline` (writer / fact-checker / editorial lead) as
 * schema Person nodes, plus `BYLINE_REFS` to attach them to a page's WebPage
 * node as author / reviewedBy / editor. Spread the nodes into the page graph.
 */
const bylineMember = (needle: string) =>
  TEAM.find((m) => m.name.toLowerCase().includes(needle));

const BYLINE_SPEC = [
  { needle: "alif", id: `${SITE_URL}/#writer` },
  { needle: "towhid", id: `${SITE_URL}/#fact-checker` },
  { needle: "saiful", id: `${SITE_URL}/#editor` },
];

export function bylinePersonNodes(): Node[] {
  const out: Node[] = [];
  for (const s of BYLINE_SPEC) {
    const m = bylineMember(s.needle);
    if (!m) continue;
    out.push({
      "@type": "Person",
      "@id": s.id,
      name: m.name,
      ...(m.role ? { jobTitle: m.role } : {}),
      ...(m.image ? { image: abs(localImage(m.image)) } : {}),
      ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
      worksFor: { "@id": ORG_ID },
    });
  }
  return out;
}

export const BYLINE_REFS: Node = {
  author: { "@id": `${SITE_URL}/#writer` },
  reviewedBy: { "@id": `${SITE_URL}/#fact-checker` },
  editor: { "@id": `${SITE_URL}/#editor` },
};

export function faqNode(items: { q: string; a: string }[]): Node {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
