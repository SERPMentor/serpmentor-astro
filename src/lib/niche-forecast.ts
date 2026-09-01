/**
 * Per-industry SEO forecast + phased plan for /seo/for/{slug}.
 *
 * There are 56 industry pages, so the numbers are DERIVED, not hand-written, but
 * they are never identical: each niche's slug seeds a deterministic variation
 * (starting point, growth multiple, conversion rate) inside a band set by its
 * `kind`, and the copy pulls in that niche's own search clusters and ranking
 * moves. The result is a distinct, plausible projection per page.
 *
 * One measure is plotted (monthly visits / sessions / leads). Conversions are a
 * derived figure shown in a tile, never a second axis. The forecast component
 * itself carries the "planning model, not a guarantee" disclaimer.
 */
import type { Niche, NicheKind } from "./niches";

// --- deterministic per-slug variation ---------------------------------
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
/** stable pseudo-random value in [min, max] from slug + salt */
function vary(slug: string, salt: string, min: number, max: number): number {
  const r = (hash(slug + "::" + salt) % 100000) / 100000;
  return min + r * (max - min);
}
/** round to a clean, human number at the right magnitude */
function tidy(v: number): number {
  if (v < 100) return Math.round(v / 5) * 5;
  if (v < 1000) return Math.round(v / 10) * 10;
  if (v < 10000) return Math.round(v / 50) * 50;
  return Math.round(v / 250) * 250;
}

// --- shape of the 12-month curve per kind (fraction of total gain) ----
const CURVE: Record<NicheKind, number[]> = {
  local: [0, 0.03, 0.09, 0.19, 0.31, 0.44, 0.57, 0.69, 0.79, 0.88, 0.95, 1],
  pro: [0, 0.02, 0.07, 0.15, 0.25, 0.36, 0.48, 0.6, 0.72, 0.83, 0.92, 1],
  content: [0, 0.01, 0.04, 0.09, 0.16, 0.25, 0.36, 0.48, 0.61, 0.75, 0.88, 1],
  business: [0, 0.02, 0.06, 0.13, 0.22, 0.33, 0.45, 0.57, 0.69, 0.81, 0.91, 1],
};

interface KindBase {
  unit: string;
  seriesLabel: string;
  startMin: number;
  startMax: number;
  growthMin: number;
  growthMax: number;
  convLabel: string;
  convMin: number;
  convMax: number;
  timing: (L: string) => string;
}

const BASE: Record<NicheKind, KindBase> = {
  local: {
    unit: "leads",
    seriesLabel: "Projected calls, form fills and messages per month",
    startMin: 25,
    startMax: 55,
    growthMin: 6,
    growthMax: 9,
    convLabel: "Booked jobs",
    convMin: 0.4,
    convMax: 0.55,
    timing: () =>
      "Map pack movement usually starts in 4 to 8 weeks. The compounding phase for competitive city terms runs from month four.",
  },
  pro: {
    unit: "visits",
    seriesLabel: "Projected organic visits per month",
    startMin: 220,
    startMax: 480,
    growthMin: 7,
    growthMax: 12,
    convLabel: "Consultations booked",
    convMin: 0.03,
    convMax: 0.05,
    timing: () =>
      "New service pages often move in 6 to 10 weeks. The most competitive terms take four to six months to settle.",
  },
  content: {
    unit: "sessions",
    seriesLabel: "Projected organic sessions per month",
    startMin: 600,
    startMax: 1600,
    growthMin: 9,
    growthMax: 16,
    convLabel: "Email subscribers",
    convMin: 0.015,
    convMax: 0.028,
    timing: () =>
      "A new topic cluster typically takes 8 to 16 weeks to mature. The curve compounds as clusters stack on each other.",
  },
  business: {
    unit: "sessions",
    seriesLabel: "Projected organic sessions per month",
    startMin: 700,
    startMax: 1900,
    growthMin: 7,
    growthMax: 13,
    convLabel: "Leads",
    convMin: 0.022,
    convMax: 0.036,
    timing: () =>
      "Technical fixes can lift existing pages within weeks. New money pages take two to four months to rank.",
  },
};

/** per-slug overrides for what a conversion is called and its rate band */
const CONV_OVERRIDE: Record<string, [string, number, number]> = {
  // local
  movers: ["Booked moves", 0.3, 0.45],
  "water-damage-restoration": ["Dispatched jobs", 0.5, 0.65],
  locksmiths: ["Callouts", 0.5, 0.65],
  "garage-door-repair": ["Booked jobs", 0.45, 0.6],
  "solar-installers": ["Site surveys booked", 0.25, 0.4],
  "window-door-replacement": ["Quote visits booked", 0.28, 0.42],
  // pro
  "law-firms": ["Case enquiries", 0.03, 0.05],
  dentists: ["New patient bookings", 0.035, 0.06],
  chiropractors: ["New patient bookings", 0.035, 0.06],
  "med-spas": ["Consultation bookings", 0.03, 0.05],
  "real-estate-agents": ["Valuation requests", 0.03, 0.05],
  "insurance-agencies": ["Quote requests", 0.035, 0.06],
  "financial-advisors": ["Discovery calls", 0.025, 0.045],
  "mortgage-brokers": ["Enquiries", 0.035, 0.06],
  architects: ["Project enquiries", 0.025, 0.045],
  "veterinary-clinics": ["New client registrations", 0.035, 0.06],
  "private-clinics": ["Appointment bookings", 0.035, 0.06],
  "recruitment-agencies": ["Employer and candidate enquiries", 0.03, 0.05],
  // content (affiliate-monetised sites convert to a click, not a signup)
  "tech-reviews": ["Affiliate link clicks", 0.08, 0.14],
  "personal-finance": ["Affiliate link clicks", 0.07, 0.13],
  crypto: ["Affiliate link clicks", 0.07, 0.12],
  "beauty-fashion": ["Affiliate link clicks", 0.09, 0.15],
  "home-diy": ["Affiliate link clicks", 0.08, 0.14],
  "outdoor-fitness": ["Affiliate link clicks", 0.08, 0.14],
  pets: ["Affiliate link clicks", 0.07, 0.12],
  parenting: ["Affiliate link clicks", 0.08, 0.13],
  // business
  ecommerce: ["Online orders", 0.014, 0.024],
  saas: ["Free trial signups", 0.025, 0.04],
  startups: ["Signups", 0.02, 0.035],
  "course-membership": ["Course enrolments", 0.015, 0.03],
  "b2b-lead-gen": ["Qualified leads", 0.02, 0.035],
  agencies: ["Qualified leads", 0.02, 0.032],
  directories: ["Listing clicks", 0.06, 0.12],
  restaurants: ["Reservations and calls", 0.04, 0.07],
  "real-estate-developments": ["Enquiries", 0.025, 0.045],
  "non-profits": ["Donations and signups", 0.018, 0.03],
};

const HEADING: Record<NicheKind, (L: string) => string> = {
  local: (L) => `What SEO can realistically do for ${L} in 12 months`,
  pro: (L) => `A 12-month organic growth projection for ${L}`,
  content: (L) => `What consistent publishing can do for ${L}`,
  business: (L) => `A 12-month organic projection for ${L}`,
};

const INTRO: Record<NicheKind, (L: string) => string> = {
  local: (L) =>
    `A projection for a single-location ${L} business starting outside the map pack. The first two months go on the profile, tracking and technical fixes, so the line is flat before it climbs.`,
  pro: (L) =>
    `A projection for an established ${L} practice with a thin website. Months one and two are structure, credibility and tracking, then the service pages start to rank.`,
  content: (L) =>
    `A projection for a ${L} site starting with a small archive and real topical focus. Authority takes time to build, so the first quarter is deliberately slow.`,
  business: (L) =>
    `A projection for a ${L} site with product-market fit and an underbuilt organic channel. Technical fixes come first, then the pages that actually convert.`,
};

export interface NicheForecast {
  heading: string;
  intro: string;
  seriesLabel: string;
  unit: string;
  points: number[];
  convRate: number;
  convLabel: string;
  timing: string;
  assumptions: string[];
}

export function nicheForecast(n: Niche): NicheForecast {
  const b = BASE[n.kind];
  const L = n.label.toLowerCase();
  const c0 = n.clusters[0]?.name.toLowerCase() ?? "high-intent";
  const c1 = n.clusters[1]?.name.toLowerCase() ?? "comparison";

  const start = tidy(vary(n.slug, "start", b.startMin, b.startMax));
  const growth = vary(n.slug, "growth", b.growthMin, b.growthMax);
  const end = tidy(start * growth);

  const [convLabel, cMin, cMax] = CONV_OVERRIDE[n.slug] ?? [
    b.convLabel,
    b.convMin,
    b.convMax,
  ];
  const convRate = Number(vary(n.slug, "conv", cMin, cMax).toFixed(3));
  const convPct = (convRate * 100).toFixed(convRate * 100 >= 10 ? 0 : 1);
  const convLower = convLabel.toLowerCase();

  const points = CURVE[n.kind].map((f, i) =>
    i === 0 ? start : tidy(start + (end - start) * f),
  );

  const assumptions: Record<NicheKind, string[]> = {
    local: [
      `A single location starting at about ${start.toLocaleString()} tracked leads a month and page-two local rankings`,
      "Google Business Profile fully optimised in month one, with a weekly review-request routine",
      `A page for each core service in each town served, built across the first quarter, ${c0} and ${c1} intent first`,
      `Roughly ${convPct}% of tracked leads turn into ${convLower}, held flat across the year`,
    ],
    pro: [
      `An established practice starting near ${start.toLocaleString()} organic visits a month`,
      "Service, condition and clinician pages built over the first four months",
      `Content prioritised by intent: ${c0} searches first, then ${c1}`,
      `A ${convPct}% visit-to-enquiry rate on that traffic, unchanged over the year`,
    ],
    content: [
      `A focused site starting around ${start.toLocaleString()} organic sessions a month`,
      "Four to eight well-researched pages published per month, in tight clusters",
      `The first clusters chosen for winnability: ${c0}, then ${c1} topics`,
      `A ${convPct}% conversion to ${convLower} on that traffic`,
    ],
    business: [
      `A site starting near ${start.toLocaleString()} organic sessions a month on an established domain`,
      "Technical debt cleared in the first six weeks, then money pages and content in parallel",
      `Pages built where search converts first: ${c0}, then ${c1} queries`,
      `A ${convPct}% conversion to ${convLower}, held flat across the year`,
    ],
  };

  return {
    heading: HEADING[n.kind](n.label),
    intro: INTRO[n.kind](L),
    seriesLabel: b.seriesLabel,
    unit: b.unit,
    points,
    convRate,
    convLabel,
    timing: b.timing(L),
    assumptions: assumptions[n.kind],
  };
}

// --- the phased plan -------------------------------------------------
export interface PlanPhase {
  when: string;
  title: string;
  summary: string;
  items: string[];
}

export function nichePlan(n: Niche): PlanPhase[] {
  const m = n.moves;
  const build = (extra: string[]): string[] => [...m.slice(0, 2), ...extra];

  switch (n.kind) {
    case "local":
      return [
        {
          when: "Weeks 1 to 6",
          title: "Foundation",
          summary: "Fix what is quietly costing you calls.",
          items: [
            "Google Business Profile rebuilt: correct categories, every service listed, real photos",
            "Name, address and phone made consistent across the web, duplicate listings removed",
            "Call tracking and form tracking installed, so every lead is attributed",
            "Site speed and mobile fixed, with click-to-call and a quote form above the fold",
          ],
        },
        {
          when: "Months 2 to 4",
          title: "Build the pages that catch demand",
          summary: "One page per service, per town you cover.",
          items: build([
            "A review-request workflow so new reviews arrive every week",
            "Local schema and internal links wired across the new pages",
          ]),
        },
        {
          when: "Months 5 to 12",
          title: "Compound",
          summary: "Widen the gap every month.",
          items: [
            "Local link building and digital PR in your service area",
            "Fresh Google Business Profile posts and photos on a schedule",
            "More service and location pages as the early ones hold their rankings",
            "A monthly report tied to calls, leads and booked jobs, not rankings alone",
          ],
        },
      ];
    case "pro":
      return [
        {
          when: "Weeks 1 to 6",
          title: "Foundation",
          summary: "Structure the trust signals and fix the funnel.",
          items: [
            "Every practice area or service mapped to how clients actually search",
            "Team bios rebuilt with real credentials, registrations and case results",
            "The booking and enquiry flow cut to two clicks on mobile and desktop",
            "Analytics, call tracking and conversion goals installed",
          ],
        },
        {
          when: "Months 2 to 4",
          title: "Build the service and situation pages",
          summary: "The pages that rank, and the pages that reassure.",
          items: build([
            "Situation and cost content that meets clients before the first call",
            "Reviews and case results pulled onto the money pages",
          ]),
        },
        {
          when: "Months 5 to 12",
          title: "Compound",
          summary: "Authority and consistency.",
          items: [
            "Authority links from relevant, credible sources",
            "New situation-based content every month",
            "Google Business Profile and local pages for each location",
            "A monthly report tied to consultations and new clients",
          ],
        },
      ];
    case "content":
      return [
        {
          when: "Weeks 1 to 4",
          title: "Architecture",
          summary: "Design the site so every post makes the others stronger.",
          items: [
            "A pillar and cluster map built around the topics you can realistically win",
            "The technical template audited: speed, crawl, Core Web Vitals",
            "Author bios, an about page and the entity signals that build topical trust",
            "The first cluster chosen and briefed",
          ],
        },
        {
          when: "Months 2 to 5",
          title: "Build the first clusters",
          summary: "Publish with structure, not volume for its own sake.",
          items: build([
            "Internal linking wired as each piece goes live",
            "Answer-first formatting so pages get cited in AI answers",
          ]),
        },
        {
          when: "Months 6 to 12",
          title: "Compound",
          summary: "Cluster after cluster.",
          items: [
            "A new cluster started as each earlier one matures",
            "Refreshes on posts that start to decay",
            "Links and digital PR pointed at the pillar pages",
            "Reporting on sessions, revenue per visit and AI citations",
          ],
        },
      ];
    case "business":
      return [
        {
          when: "Weeks 1 to 6",
          title: "Technical foundation",
          summary: "Remove the ceiling on growth.",
          items: [
            "Crawl, index and rendering health fixed, and schema added",
            "A keyword and competitor map built, the money pages identified",
            "Faceted navigation and index bloat brought under control",
            "Analytics tied to signups, leads or revenue, not just traffic",
          ],
        },
        {
          when: "Months 2 to 5",
          title: "Build the money pages",
          summary: "The pages where organic search actually converts.",
          items: build([
            "Comparison, alternative and pricing pages built out",
            "Programmatic templates shipped where each page carries real value",
          ]),
        },
        {
          when: "Months 6 to 12",
          title: "Compound",
          summary: "Engine running.",
          items: [
            "A repeatable publishing process tied to pipeline",
            "Links pointed at the money pages, not just the blog",
            "Conversion testing on the top landing pages",
            "A monthly report on qualified pipeline and revenue",
          ],
        },
      ];
  }
}
