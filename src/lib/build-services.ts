/**
 * Data for the /website-design page — the industries SERP Mentor builds
 * websites for and the markets they're optimised for. Add or reorder freely;
 * the page renders whatever is here.
 */

export interface BuildGroup {
  title: string;
  icon: string;
  blurb: string;
  items: string[];
}

export const BUILD_GROUPS: BuildGroup[] = [
  {
    title: "Home & local services",
    icon: "fa-solid fa-house-chimney",
    blurb: "Built to win the map pack and the “near me” searches, with quote forms that actually convert.",
    items: [
      "Plumbers",
      "Electricians",
      "HVAC & air-duct cleaning",
      "Roofing & gutters",
      "Sanitary & bathroom fitters",
      "Home appliance repair",
      "Garage door repair",
      "Locksmiths",
      "Painters & decorators",
      "Landscaping & lawn care",
      "Pest control",
      "Cleaning & maid services",
      "Handyman services",
      "Pool installation & care",
      "Solar & EV charger installers",
      "Flooring & tiling",
      "Movers & removals",
      "Fencing & decking",
      "Window & door replacement",
      "Water damage & restoration",
    ],
  },
  {
    title: "Professional, legal & medical",
    icon: "fa-solid fa-briefcase",
    blurb: "Authority-first sites that build trust before the first call, with reviews, credentials and clear service pages.",
    items: [
      "Law firms & attorneys",
      "Accountants & bookkeepers",
      "Dentists & orthodontists",
      "Med spas & aesthetic clinics",
      "Chiropractors & physiotherapists",
      "Real estate agents & brokers",
      "Insurance agencies",
      "Financial advisors & planners",
      "Mortgage brokers",
      "Recruitment & staffing agencies",
      "Architects & surveyors",
      "Veterinary clinics",
      "Private clinics & therapists",
    ],
  },
  {
    title: "Content, niche & affiliate sites",
    icon: "fa-solid fa-newspaper",
    blurb: "Fast, clean publishing sites with a content architecture designed to rank and to be cited by AI answers.",
    items: [
      "Games & gaming guides",
      "Tech & gadget reviews",
      "Personal finance & investing",
      "Crypto & fintech",
      "Health & wellness",
      "Travel & destinations",
      "Food & recipes",
      "Home & DIY",
      "Outdoor, fitness & sport",
      "Parenting & family",
      "Pets & animals",
      "Beauty & fashion",
      "Education & how-to",
    ],
  },
  {
    title: "Business & online stores",
    icon: "fa-solid fa-store",
    blurb: "Conversion-focused sites and stores, wired for analytics and ready to scale content.",
    items: [
      "E-commerce & Shopify stores",
      "SaaS & software products",
      "B2B lead generation",
      "Startups & MVP landing pages",
      "Agencies & consultancies",
      "Restaurants & hospitality",
      "Real estate developments",
      "Non-profits & charities",
      "Course & membership sites",
      "Directories & marketplaces",
    ],
  },
];

export interface BuildMarket {
  flag: string;
  name: string;
}

export const BUILD_MARKETS: BuildMarket[] = [
  { flag: "🇺🇸", name: "United States" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇳🇿", name: "New Zealand" },
  { flag: "🇮🇪", name: "Ireland" },
  { flag: "🇸🇪", name: "Sweden" },
  { flag: "🇦🇪", name: "United Arab Emirates" },
  { flag: "🇸🇬", name: "Singapore" },
  { flag: "🇩🇪", name: "Germany" },
];
