/**
 * Author registry, keyed by the WordPress author slug.
 *
 * WordPress only stores a name and a placeholder Gravatar for each author, so
 * the display name, title and bio live here. A post's byline links to
 * /author/{slug}; unknown slugs fall back to the SERP Mentor editorial entry.
 */

export interface AuthorSocials {
  x?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
  email?: string;
}

export interface Author {
  slug: string;
  name: string;
  title: string;
  bio: string;
  /** real headshot URL; omitted → an initials avatar is drawn */
  image?: string;
  socials?: AuthorSocials;
}

/** [key, Font Awesome class, label] in display order */
export const SOCIAL_META: [keyof AuthorSocials, string, string][] = [
  ["x", "fa-brands fa-x-twitter", "X"],
  ["linkedin", "fa-brands fa-linkedin-in", "LinkedIn"],
  ["facebook", "fa-brands fa-facebook-f", "Facebook"],
  ["instagram", "fa-brands fa-instagram", "Instagram"],
  ["youtube", "fa-brands fa-youtube", "YouTube"],
  ["website", "fa-solid fa-globe", "Website"],
  ["email", "fa-solid fa-envelope", "Email"],
];

export function socialItems(
  socials?: AuthorSocials,
): { href: string; icon: string; label: string }[] {
  if (!socials) return [];
  return SOCIAL_META.filter(([key]) => socials[key]).map(([key, icon, label]) => ({
    href: key === "email" ? `mailto:${socials[key]}` : socials[key]!,
    icon,
    label,
  }));
}

const EDITORIAL: Author = {
  slug: "serpmentor",
  name: "The SERP Mentor Team",
  title: "SEO strategists, content architects and technical specialists",
  bio: "SERP Mentor is a small team focused on one thing: helping brands build durable search visibility. Everything we publish comes from hands-on work. Real audits, real tests, real client projects, not recycled marketing copy.",
};

export const AUTHORS: Record<string, Author> = {
  "md-saiful": {
    slug: "md-saiful",
    name: "Saiful",
    title: "Founder & editor, SERP Mentor",
    bio: "Saiful runs SERP Mentor and writes most of what you read here. The focus is practical SEO and AI-search guidance, based on what actually moves rankings rather than what makes a good headline.",
    image:
      "https://cms.serpmentor.com/wp-content/uploads/2026/04/SAIFUL-AI-SEO-EXPERT.webp",
    socials: {
      x: "https://x.com/saifulseomentor",
      linkedin: "https://www.linkedin.com/in/serpmentor/",
      facebook: "https://www.facebook.com/Nosedrivers",
    },
  },
  serpmentor: EDITORIAL,
  jennifer: {
    slug: "jennifer",
    name: "Jennifer Clark",
    title: "Content strategy & editorial direction",
    bio: "Jennifer builds content systems for brands from SaaS startups to large publishers. She turns audience research into scalable editorial operations, topic clusters and frameworks that rank and convert.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
  },
  marcus: {
    slug: "marcus",
    name: "Marcus Reed",
    title: "Technical SEO & site performance",
    bio: "Marcus works on site architecture, crawlability and technical audits for high-traffic properties. It's the unglamorous work that separates mediocre rankings from dominant ones.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80",
  },
};

export function getAuthor(slug?: string | null, fallbackName?: string): Author {
  if (slug && AUTHORS[slug]) return AUTHORS[slug];
  const name = fallbackName?.trim();
  if (!name) return EDITORIAL;
  // Title-case a bare WordPress name like "SAIFUL".
  const display = name
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return { ...EDITORIAL, slug: slug || "serpmentor", name: display };
}

export function listAuthors(): Author[] {
  return Object.values(AUTHORS).filter((a, i, all) => all.indexOf(a) === i);
}

export function authorPath(author: Author): string {
  return `/author/${author.slug}`;
}

export function authorInitials(name: string): string {
  return (
    name
      .replace(/^the\s+/i, "")
      .split(/\s+/)
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "SM"
  );
}
