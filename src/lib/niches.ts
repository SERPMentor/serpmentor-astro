/**
 * Per-industry SEO landing pages: /seo/for/{slug} (e.g. /seo/for/plumbers).
 *
 * Each entry carries enough industry-specific detail — the search clusters that
 * niche's customers actually run, the SEO angle that matters most, and the
 * three things that actually move rankings there — that the pages are genuinely
 * useful, not thin doorway pages.
 *
 * The search terms are representative of what people search in each industry
 * (compiled from keyword research, not a live API). `[brackets]` are stand-ins
 * for the specific product / city / competitor a real searcher would type.
 *
 * `kind` switches the framing in the template:
 *   local    — local-service business: map pack, "near me", emergency intent
 *   pro      — professional / legal / medical practice: trust + credentials
 *   content  — publisher / affiliate site: topical authority + AI citations
 *   business — SaaS, e-commerce, B2B, startup: conversion + scalable content
 */

export type NicheKind = "local" | "pro" | "content" | "business";

export interface KeywordCluster {
  name: string;
  terms: string[];
}

export interface Niche {
  slug: string;
  /** plural label, e.g. "Plumbers" */
  label: string;
  /** the keyword the page targets, e.g. "plumber SEO" */
  keyword: string;
  kind: NicheKind;
  /** the one SEO angle that matters most here */
  edge: string;
  /** grouped searches customers in this niche run */
  clusters: KeywordCluster[];
  /** the three things that actually move rankings for this niche */
  moves: string[];
}

export const NICHES: Niche[] = [
  // =================================================================
  // Home & local services
  // =================================================================
  {
    slug: "plumbers",
    label: "Plumbers",
    keyword: "plumber SEO",
    kind: "local",
    edge: "Most plumbing revenue comes from urgent, high-intent searches. If you are not in the map pack when a pipe bursts, the call goes to whoever is.",
    clusters: [
      { name: "Emergency", terms: ["emergency plumber near me", "24 hour plumber", "burst pipe repair", "blocked drain emergency", "no hot water plumber"] },
      { name: "Cost & quotes", terms: ["how much does a plumber cost", "boiler installation cost", "plumber call out charge", "cost to fix a leaking pipe"] },
      { name: "Service + area", terms: ["plumber [city]", "bathroom plumbing [city]", "commercial plumber near me", "gas safe plumber near me"] },
      { name: "Comparison", terms: ["best plumbers near me", "plumber reviews [city]", "licensed plumber vs handyman"] },
    ],
    moves: [
      "A page for every service and every town you cover, not one homepage trying to rank for all of them",
      "Google Business Profile fully built out with services, photos and a steady flow of reviews",
      "Click-to-call and a quote form above the fold, on a site that loads in under two seconds on mobile",
    ],
  },
  {
    slug: "electricians",
    label: "Electricians",
    keyword: "electrician SEO",
    kind: "local",
    edge: "Buyers compare two or three local electricians before they call. Reviews, licensing and clear service pages decide which one.",
    clusters: [
      { name: "Emergency", terms: ["emergency electrician near me", "electrician no power", "fuse box tripping", "24 hour electrician"] },
      { name: "Projects", terms: ["EV charger installation cost", "consumer unit replacement", "rewiring a house cost", "fuse box upgrade", "outdoor lighting installation"] },
      { name: "Service + area", terms: ["electrician [city]", "commercial electrician near me", "NICEIC electrician near me", "landlord electrical safety certificate"] },
      { name: "Comparison", terms: ["best electrician near me", "electrician reviews [city]", "how to find a good electrician"] },
    ],
    moves: [
      "Dedicated pages for the money jobs: EV chargers, rewires, fuse boards, EICR certificates",
      "Certifications and licence numbers shown on every page, not buried on an about page",
      "Reviews pulled onto service and location pages, not just left on Google",
    ],
  },
  {
    slug: "hvac-air-duct-cleaning",
    label: "HVAC & Air-Duct Cleaning",
    keyword: "HVAC SEO",
    kind: "local",
    edge: "HVAC demand swings with the season. The sites that win rank before the heatwave, not during it, and rank for both repair and install intent.",
    clusters: [
      { name: "Repair & emergency", terms: ["AC repair near me", "furnace not working", "AC not blowing cold air", "emergency HVAC repair", "heat pump not heating"] },
      { name: "Install & replace", terms: ["new AC unit cost", "furnace replacement cost", "heat pump installation", "ductless mini split cost"] },
      { name: "Maintenance", terms: ["air duct cleaning cost", "AC tune up near me", "HVAC maintenance plan", "how often to clean air ducts"] },
      { name: "Local", terms: ["HVAC company [city]", "air duct cleaning [city]", "best HVAC contractor near me"] },
    ],
    moves: [
      "Separate pages for repair, replacement and duct cleaning, each with its own pricing guidance",
      "Content published ahead of the season, so you rank when demand spikes rather than after",
      "Financing and maintenance-plan pages to capture the higher-value install searches",
    ],
  },
  {
    slug: "roofing",
    label: "Roofers",
    keyword: "roofing SEO",
    kind: "local",
    edge: "Roofing jobs are large and researched. Location pages, financing info and real project photos move roofing leads more than anything else.",
    clusters: [
      { name: "Repair & storm", terms: ["roof repair near me", "roof leak repair", "storm damage roof inspection", "emergency roof tarp", "missing shingles repair"] },
      { name: "Replacement", terms: ["roof replacement cost", "new roof cost [city]", "metal roof vs shingles", "how long does a roof last"] },
      { name: "Insurance & finance", terms: ["roof insurance claim help", "roofing financing", "does insurance cover roof replacement"] },
      { name: "Local", terms: ["roofing company [city]", "best roofers near me", "commercial roofing contractor"] },
    ],
    moves: [
      "A location page for every town, each with local project photos and reviews",
      "Storm-response content ready to publish the day after severe weather hits your area",
      "Clear pages on cost, financing and the insurance-claim process, which is where the lead decides",
    ],
  },
  {
    slug: "bathroom-fitters",
    label: "Bathroom & Sanitary Fitters",
    keyword: "bathroom fitter SEO",
    kind: "local",
    edge: "This is a considered purchase. Portfolio pages, before-and-after galleries and pricing guidance are what convert the visit into an enquiry.",
    clusters: [
      { name: "Projects", terms: ["bathroom renovation near me", "walk-in shower installation", "wet room installation", "small bathroom remodel", "disabled bathroom adaptation"] },
      { name: "Cost", terms: ["bathroom renovation cost", "cost to fit a new bathroom", "wet room cost", "how much to retile a bathroom"] },
      { name: "Ideas & inspiration", terms: ["small bathroom ideas", "modern bathroom designs", "bathroom layout ideas"] },
      { name: "Local", terms: ["bathroom fitters [city]", "bathroom installers near me", "best bathroom company near me"] },
    ],
    moves: [
      "A project gallery with real before-and-after photos, one page per completed job",
      "Honest price ranges by bathroom size, so visitors self-qualify before they enquire",
      "Design-idea content that pulls in early-stage searchers and links through to your portfolio",
    ],
  },
  {
    slug: "appliance-repair",
    label: "Appliance Repair",
    keyword: "appliance repair SEO",
    kind: "local",
    edge: "Brand plus appliance plus city is a huge cluster of low-competition searches. Most repair sites never build the pages to catch them.",
    clusters: [
      { name: "By fault", terms: ["washing machine not spinning", "fridge not cooling", "dishwasher not draining", "oven not heating up", "dryer not drying"] },
      { name: "By brand", terms: ["[brand] repair near me", "Samsung fridge repair", "Bosch dishwasher repair", "LG washer repair"] },
      { name: "Urgency & cost", terms: ["same day appliance repair", "appliance repair cost", "is it worth repairing a fridge"] },
      { name: "Local", terms: ["appliance repair [city]", "appliance repair man near me", "home appliance service near me"] },
    ],
    moves: [
      "A page per appliance and per common fault, since that is exactly how people search",
      "Brand-specific pages for the manufacturers you are authorised to service",
      "Same-day and pricing information front and centre, because the decision is fast",
    ],
  },
  {
    slug: "garage-door-repair",
    label: "Garage Door Repair",
    keyword: "garage door repair SEO",
    kind: "local",
    edge: "Almost all of it is emergency and same-day. Map pack position and a phone number above the fold are the whole funnel.",
    clusters: [
      { name: "Emergency", terms: ["garage door won't open", "garage door off track", "broken garage door spring", "garage door stuck open"] },
      { name: "Repair & parts", terms: ["garage door spring repair cost", "garage door opener repair", "garage door cable replacement", "garage door remote not working"] },
      { name: "Install", terms: ["new garage door cost", "garage door installation near me", "insulated garage door"] },
      { name: "Local", terms: ["garage door repair [city]", "garage door company near me", "24 hour garage door repair"] },
    ],
    moves: [
      "Own the map pack: a fully optimised profile beats a prettier website every time here",
      "Fault-based pages (spring, opener, cable, track) that match panicked, specific searches",
      "A phone number and a fast-loading mobile page, because nobody fills in a form for this",
    ],
  },
  {
    slug: "locksmiths",
    label: "Locksmiths",
    keyword: "locksmith SEO",
    kind: "local",
    edge: "Locksmith results are noisy with lead-gen middlemen. A real local site with reviews and a physical address outranks them on trust.",
    clusters: [
      { name: "Lockout", terms: ["locksmith near me", "car lockout service", "locked out of house", "24 hour locksmith", "emergency locksmith"] },
      { name: "Security", terms: ["change locks after moving", "upgrade door locks", "smart lock installation", "burglary repair"] },
      { name: "Auto", terms: ["car key replacement", "car key programming", "transponder key cut"] },
      { name: "Local & trust", terms: ["locksmith [city]", "approved locksmith near me", "cheap locksmith near me", "locksmith reviews"] },
    ],
    moves: [
      "A verified physical address and real reviews, which is how you outrank the national lead-gen brands",
      "Separate pages for home, auto and commercial, each with its own pricing guidance",
      "Fast mobile load and click-to-call, since this is almost always an emergency",
    ],
  },
  {
    slug: "painters",
    label: "Painters & Decorators",
    keyword: "painter SEO",
    kind: "local",
    edge: "Painting is chosen on portfolio and reviews. Service-area pages plus a strong gallery is the fastest route to more quote requests.",
    clusters: [
      { name: "Interior", terms: ["interior painters near me", "cost to paint a room", "house painting cost", "ceiling painting"] },
      { name: "Exterior", terms: ["exterior house painting", "exterior painting cost", "fence painting service", "render painting"] },
      { name: "Commercial & specialist", terms: ["commercial painters near me", "spray painting kitchen cabinets", "wallpaper hanging service"] },
      { name: "Local", terms: ["painters and decorators [city]", "best painters near me", "local painter reviews"] },
    ],
    moves: [
      "A photo-led portfolio, organised by project type, that does the selling before the quote",
      "A service-area page for every town, with local jobs and local reviews",
      "Interior, exterior and specialist finishes as separate pages, since they are different searches",
    ],
  },
  {
    slug: "landscaping",
    label: "Landscaping & Lawn Care",
    keyword: "landscaping SEO",
    kind: "local",
    edge: "Recurring lawn care and one-off design have different intent. The site should rank for both and route each to the right form.",
    clusters: [
      { name: "Lawn care", terms: ["lawn care service near me", "lawn mowing service cost", "lawn treatment company", "weed control service"] },
      { name: "Design & build", terms: ["landscapers near me", "garden design cost", "patio installation", "artificial grass installation", "retaining wall builder"] },
      { name: "Seasonal", terms: ["fall cleanup service", "leaf removal near me", "spring garden clearance"] },
      { name: "Local", terms: ["landscaping company [city]", "garden landscaping near me", "best landscapers reviews"] },
    ],
    moves: [
      "Split the site: recurring maintenance in one section, design-and-build projects in another",
      "Project pages with photos for the high-value work, service pages for the recurring work",
      "Seasonal content published before each season so you rank at the moment demand starts",
    ],
  },
  {
    slug: "pest-control",
    label: "Pest Control",
    keyword: "pest control SEO",
    kind: "local",
    edge: "Pest plus city pages are a large, winnable cluster. Seasonal pests each deserve their own page.",
    clusters: [
      { name: "By pest", terms: ["how to get rid of bed bugs", "wasp nest removal", "rodent control near me", "cockroach exterminator", "ant infestation treatment"] },
      { name: "Inspection & prevention", terms: ["termite inspection cost", "pest control contract", "rodent proofing service"] },
      { name: "Urgency & cost", terms: ["same day pest control", "pest control cost", "emergency wasp removal"] },
      { name: "Local", terms: ["pest control [city]", "exterminator near me", "best pest control company reviews"] },
    ],
    moves: [
      "A page per pest, and a page per pest per major town, since that is the exact search",
      "Seasonal pest content timed to when each problem peaks in your area",
      "Recurring-contract pages to turn one-off treatments into ongoing revenue",
    ],
  },
  {
    slug: "cleaning-services",
    label: "Cleaning & Maid Services",
    keyword: "cleaning company SEO",
    kind: "local",
    edge: "Recurring cleaning contracts are worth chasing. Rank for the one-off searches, then convert those customers to a plan.",
    clusters: [
      { name: "Domestic", terms: ["house cleaning services near me", "weekly cleaner cost", "deep cleaning service", "one off house clean"] },
      { name: "Move & tenancy", terms: ["end of tenancy cleaning", "move out cleaning cost", "after builders cleaning"] },
      { name: "Commercial", terms: ["office cleaning services near me", "commercial cleaning contract", "gym cleaning company"] },
      { name: "Local", terms: ["cleaning company [city]", "maid service near me", "best cleaners reviews"] },
    ],
    moves: [
      "Separate pages for domestic, end-of-tenancy and commercial, which are three different buyers",
      "Transparent pricing so visitors self-qualify before they book",
      "A clear path from one-off booking to a recurring plan on every service page",
    ],
  },
  {
    slug: "handyman",
    label: "Handyman Services",
    keyword: "handyman SEO",
    kind: "local",
    edge: "Handyman search is broad and cheap to rank for. A page per task type captures intent competitors ignore.",
    clusters: [
      { name: "By task", terms: ["furniture assembly service", "TV wall mounting service", "picture hanging service", "flat pack assembly near me", "small home repairs"] },
      { name: "Odd jobs", terms: ["handyman near me", "odd job man near me", "gutter cleaning service", "door repair service"] },
      { name: "Cost", terms: ["handyman hourly rate", "handyman cost per hour", "minimum callout handyman"] },
      { name: "Local", terms: ["handyman [city]", "local handyman reviews", "reliable handyman near me"] },
    ],
    moves: [
      "A page for every common task, since low-competition task searches are the whole opportunity",
      "Clear hourly and half-day pricing, which is the first thing people want to know",
      "Reviews and a real name and face, because trust is the barrier for letting someone into your home",
    ],
  },
  {
    slug: "pool-services",
    label: "Pool Installation & Care",
    keyword: "pool company SEO",
    kind: "local",
    edge: "Install is a big-ticket, long-research purchase; maintenance is recurring. The site needs to speak to both without diluting either.",
    clusters: [
      { name: "Installation", terms: ["pool installation cost", "inground pool cost", "fiberglass vs concrete pool", "small pool ideas"] },
      { name: "Maintenance", terms: ["pool cleaning service near me", "weekly pool service cost", "pool opening service", "green pool cleanup"] },
      { name: "Repair", terms: ["pool leak detection", "pool pump repair", "pool resurfacing cost", "pool heater repair"] },
      { name: "Local", terms: ["pool company [city]", "pool builders near me", "pool service reviews"] },
    ],
    moves: [
      "A design-and-cost section for installs, a service section for maintenance, kept separate",
      "Project galleries with real builds, since a pool is bought on how it looks and who built it",
      "Recurring-service pages and seasonal open/close content for the maintenance revenue",
    ],
  },
  {
    slug: "solar-installers",
    label: "Solar & EV Charger Installers",
    keyword: "solar installer SEO",
    kind: "local",
    edge: "Buyers spend weeks researching. Transparent pricing, incentives by region, and real install data are what earn the consultation.",
    clusters: [
      { name: "Cost & payback", terms: ["solar panel installation cost", "are solar panels worth it", "solar payback period", "solar panel savings calculator"] },
      { name: "Incentives", terms: ["solar tax credit [year]", "solar grants [region]", "solar rebate eligibility"] },
      { name: "Products & add-ons", terms: ["home battery storage cost", "home EV charger installation", "solar plus battery"] },
      { name: "Local", terms: ["solar companies near me", "solar installer [city]", "best solar company reviews"] },
    ],
    moves: [
      "Region-specific pages on incentives and payback, since the numbers decide the sale",
      "A savings or quote calculator that captures the lead mid-research",
      "Real install case studies with system size, cost and output, not stock photos",
    ],
  },
  {
    slug: "flooring",
    label: "Flooring & Tiling",
    keyword: "flooring SEO",
    kind: "local",
    edge: "Material plus room plus city searches are endless and low-competition. Most flooring sites publish a homepage and stop.",
    clusters: [
      { name: "By material", terms: ["hardwood flooring installation", "luxury vinyl plank cost", "laminate vs vinyl", "carpet fitting near me", "engineered wood flooring"] },
      { name: "Tiling", terms: ["bathroom tiling cost", "kitchen floor tiling", "tile installation near me", "underfloor heating with tiles"] },
      { name: "Cost", terms: ["cost to install flooring", "flooring installation cost per square foot", "carpet vs hardwood cost"] },
      { name: "Local", terms: ["flooring installers [city]", "flooring company near me", "tile shop with fitting"] },
    ],
    moves: [
      "A page per material and per room type, which is a huge, mostly untapped keyword set",
      "Comparison content (this vs that) that catches people still deciding",
      "Cost-per-square-foot guidance so visitors can price their own job",
    ],
  },
  {
    slug: "movers",
    label: "Movers & Removals",
    keyword: "moving company SEO",
    kind: "local",
    edge: "Moving is planned weeks ahead, so buyers compare quotes. Route-specific pages and an instant quote tool win the shortlist.",
    clusters: [
      { name: "Local moves", terms: ["movers near me", "local moving company", "man and van [city]", "apartment movers"] },
      { name: "Long distance", terms: ["long distance moving cost", "interstate movers", "moving from [city A] to [city B]"] },
      { name: "Add-ons", terms: ["packing services", "furniture disassembly service", "piano movers", "storage during move"] },
      { name: "Cost & trust", terms: ["how much do movers cost", "moving company reviews", "licensed and insured movers"] },
    ],
    moves: [
      "Route pages for the common moves you handle, plus local pages for each service area",
      "An instant or same-day quote tool, since people are collecting three or four estimates",
      "Licence, insurance and review proof on every page, because this is a trust purchase",
    ],
  },
  {
    slug: "fencing-decking",
    label: "Fencing & Decking",
    keyword: "fencing contractor SEO",
    kind: "local",
    edge: "Material and style pages each rank on their own and each pulls a qualified lead.",
    clusters: [
      { name: "Fencing", terms: ["fence installation cost", "privacy fence installation", "garden fence replacement", "chain link fence cost", "fence panel replacement"] },
      { name: "Decking", terms: ["deck builders near me", "composite decking cost", "raised deck installation", "deck vs patio"] },
      { name: "Materials", terms: ["composite vs wood fence", "best fence for privacy", "how long does composite decking last"] },
      { name: "Local", terms: ["fencing contractor [city]", "deck builder near me", "fencing company reviews"] },
    ],
    moves: [
      "A page per material and per style: privacy fence, composite deck, chain link, and so on",
      "Cost guidance by linear foot or square metre so people can budget their project",
      "Photo galleries organised by style, since this is a look-at-it-first purchase",
    ],
  },
  {
    slug: "window-door-replacement",
    label: "Window & Door Replacement",
    keyword: "window replacement SEO",
    kind: "local",
    edge: "High ticket, high research. Financing, energy-efficiency data and a clear quote path are the difference between a visit and a booking.",
    clusters: [
      { name: "Windows", terms: ["window replacement cost", "double glazing quotes", "cost to replace all windows in house", "energy efficient windows"] },
      { name: "Doors", terms: ["front door installation cost", "patio door replacement", "composite door prices", "bifold doors cost"] },
      { name: "Buying factors", terms: ["best replacement windows", "uPVC vs aluminium windows", "window financing options"] },
      { name: "Local", terms: ["window company [city]", "window fitters near me", "double glazing company reviews"] },
    ],
    moves: [
      "Clear price ranges and financing options, since the number is the whole decision",
      "Energy-efficiency and material comparison content for people still researching",
      "A no-pressure quote path, because the industry has a reputation for the opposite",
    ],
  },
  {
    slug: "water-damage-restoration",
    label: "Water Damage & Restoration",
    keyword: "restoration company SEO",
    kind: "local",
    edge: "This is pure emergency intent, often at 2am. 24/7 messaging, map pack position and fast load time are the entire strategy.",
    clusters: [
      { name: "Emergency", terms: ["water damage restoration near me", "flood cleanup", "emergency water extraction", "sewage backup cleanup", "basement flooding"] },
      { name: "Damage types", terms: ["mold remediation cost", "fire and smoke damage restoration", "storm damage repair", "drying out a flooded house"] },
      { name: "Insurance", terms: ["does insurance cover water damage", "water damage insurance claim help", "restoration company that bills insurance"] },
      { name: "Local", terms: ["restoration company [city]", "24 hour water damage company", "water damage repair reviews"] },
    ],
    moves: [
      "24/7 availability messaging and a phone number on every page, since forms do not get filled at 2am",
      "Map pack position, which is the whole game for genuine emergency searches",
      "Insurance-claim content, because the customer's next worry after the water is who pays",
    ],
  },

  // =================================================================
  // Professional, legal & medical
  // =================================================================
  {
    slug: "law-firms",
    label: "Law Firms & Attorneys",
    keyword: "law firm SEO",
    kind: "pro",
    edge: "Legal keywords are the most expensive in search. Practice-area pages, attorney bios and genuine case results are what rank and convert.",
    clusters: [
      { name: "Practice area + location", terms: ["personal injury lawyer [city]", "divorce attorney near me", "criminal defense lawyer [city]", "employment lawyer near me", "estate planning attorney"] },
      { name: "Situation-based", terms: ["what to do after a car accident", "how much is my injury claim worth", "grounds for divorce", "wrongful termination claim"] },
      { name: "Cost & consultation", terms: ["free consultation lawyer", "how much does a divorce cost", "contingency fee lawyer", "attorney fees explained"] },
      { name: "Comparison", terms: ["best personal injury lawyer [city]", "law firm reviews", "how to choose a lawyer"] },
    ],
    moves: [
      "A deep page for every practice area in every location you serve, not a services list",
      "Attorney bios with real credentials, bar admissions, and specific case results",
      "Situation-based content that meets people before they know they need a lawyer",
    ],
  },
  {
    slug: "accountants",
    label: "Accountants & Bookkeepers",
    keyword: "accountant SEO",
    kind: "pro",
    edge: "Trust and specificity win. Pages for each service and each client type outperform a generic site.",
    clusters: [
      { name: "By service", terms: ["accountant for self employed", "small business bookkeeping", "tax return help", "payroll services near me", "VAT return service"] },
      { name: "By client type", terms: ["accountant for contractors", "ecommerce accountant", "accountant for dentists", "startup accountant", "landlord accountant"] },
      { name: "Cost", terms: ["how much does an accountant cost", "accountant fees for small business", "fixed fee accountant"] },
      { name: "Local", terms: ["accountant [city]", "chartered accountant near me", "best accountant reviews"] },
    ],
    moves: [
      "A page per service and a page per client niche you specialise in",
      "Clear, fixed-fee pricing, since ambiguity is the reason people put off switching",
      "Content that answers the tax and compliance questions your ideal client is already searching",
    ],
  },
  {
    slug: "dentists",
    label: "Dentists & Orthodontists",
    keyword: "dental SEO",
    kind: "pro",
    edge: "Dental is local, competitive and review-driven. Treatment pages plus Google Business Profile optimisation are where the new patients come from.",
    clusters: [
      { name: "Routine & emergency", terms: ["dentist near me", "emergency dentist", "dentist accepting new patients", "same day dental appointment"] },
      { name: "Treatments", terms: ["invisalign cost", "dental implants cost", "teeth whitening near me", "veneers price", "root canal cost"] },
      { name: "Anxiety & family", terms: ["dentist for nervous patients", "sedation dentistry", "family dentist near me", "pediatric dentist"] },
      { name: "Comparison", terms: ["best dentist [city]", "dentist reviews near me", "how to find a good dentist"] },
    ],
    moves: [
      "A page for every treatment with real pricing and before-and-after photos",
      "Google Business Profile optimisation and a review workflow, which drives most new-patient calls",
      "Pages for nervous patients and families, which are high-intent and under-served",
    ],
  },
  {
    slug: "med-spas",
    label: "Med Spas & Aesthetic Clinics",
    keyword: "med spa SEO",
    kind: "pro",
    edge: "Treatment plus city searches are high-intent and high-value. Before-and-after content and pricing transparency drive the consultation booking.",
    clusters: [
      { name: "Injectables", terms: ["botox near me", "lip filler cost", "botox price per unit", "dermal fillers [city]"] },
      { name: "Devices & skin", terms: ["laser hair removal cost", "microneedling near me", "chemical peel", "coolsculpting cost", "IPL photofacial"] },
      { name: "Body & wellness", terms: ["body contouring near me", "medical weight loss clinic", "IV therapy near me"] },
      { name: "Comparison", terms: ["best med spa [city]", "med spa reviews", "how to choose an injector"] },
    ],
    moves: [
      "A page per treatment with transparent pricing and real before-and-after galleries",
      "Practitioner credentials and safety information, which is what separates a med spa from a salon",
      "City-level pages for each core treatment, since that is exactly how people search",
    ],
  },
  {
    slug: "chiropractors",
    label: "Chiropractors & Physiotherapists",
    keyword: "chiropractor SEO",
    kind: "pro",
    edge: "Condition-based pages rank better than a services list and match how patients actually search.",
    clusters: [
      { name: "By condition", terms: ["lower back pain treatment", "sciatica relief near me", "whiplash treatment", "sports injury physio", "neck pain chiropractor"] },
      { name: "By service", terms: ["chiropractor near me", "sports massage near me", "physiotherapy clinic", "dry needling"] },
      { name: "Cost & booking", terms: ["how much does a chiropractor cost", "chiropractor first visit", "physio covered by insurance"] },
      { name: "Comparison", terms: ["best chiropractor [city]", "chiropractor reviews", "chiropractor vs physio for back pain"] },
    ],
    moves: [
      "A page for each condition you treat, written the way a patient describes their pain",
      "Clear first-visit and pricing information to remove the booking hesitation",
      "Practitioner profiles with qualifications and areas of focus",
    ],
  },
  {
    slug: "real-estate-agents",
    label: "Real Estate Agents",
    keyword: "real estate agent SEO",
    kind: "pro",
    edge: "Neighbourhood pages and a home-valuation tool are the two assets that turn a real estate site into a lead source.",
    clusters: [
      { name: "Buying & selling", terms: ["realtors near me", "homes for sale in [area]", "sell my house fast", "how to sell a house"] },
      { name: "Valuation", terms: ["how much is my house worth", "home valuation [area]", "what's my home worth calculator"] },
      { name: "Neighbourhood", terms: ["living in [neighbourhood]", "best neighbourhoods in [city]", "[area] housing market"] },
      { name: "Agent choice", terms: ["best real estate agent [city]", "top realtor reviews", "listing agent vs buyer agent"] },
    ],
    moves: [
      "A page for every neighbourhood you work, with local market data and listings",
      "A home-valuation tool that captures the seller lead at the research stage",
      "Market-update content published monthly, which keeps the site fresh and ranking",
    ],
  },
  {
    slug: "insurance-agencies",
    label: "Insurance Agencies",
    keyword: "insurance agency SEO",
    kind: "pro",
    edge: "Coverage plus location pages and a fast quote request form. Independent agencies win on local trust the national brands can't fake.",
    clusters: [
      { name: "By coverage", terms: ["business insurance quote", "home and auto bundle", "general liability insurance", "workers comp insurance", "landlord insurance"] },
      { name: "By industry", terms: ["contractor insurance", "restaurant insurance", "trucking insurance", "insurance for [profession]"] },
      { name: "Local & advice", terms: ["insurance agent near me", "independent insurance agent [city]", "how much liability insurance do I need"] },
      { name: "Comparison", terms: ["independent agent vs direct", "best insurance agency reviews"] },
    ],
    moves: [
      "A page per coverage type and per industry you write policies for",
      "A short quote-request form, since people are shopping several agencies at once",
      "Advice content that answers the coverage questions business owners actually have",
    ],
  },
  {
    slug: "financial-advisors",
    label: "Financial Advisors & Planners",
    keyword: "financial advisor SEO",
    kind: "pro",
    edge: "This is an authority sale. Clear fee structure, credentials, and content that answers real planning questions build the trust to book a call.",
    clusters: [
      { name: "By need", terms: ["retirement planning help", "financial advisor for small business owners", "estate planning advice", "investment advice near me"] },
      { name: "Advisor type", terms: ["fee-only financial planner", "fiduciary financial advisor near me", "CFP near me"] },
      { name: "Cost & trust", terms: ["how much does a financial advisor cost", "financial advisor fees explained", "do I need a financial advisor"] },
      { name: "Local", terms: ["financial advisor [city]", "wealth management [city]", "financial planner reviews"] },
    ],
    moves: [
      "A transparent fee page and clear credentials, since trust is the entire barrier",
      "Content that answers the specific planning questions your ideal client is searching",
      "Pages for each client type you serve: business owners, retirees, professionals, and so on",
    ],
  },
  {
    slug: "mortgage-brokers",
    label: "Mortgage Brokers",
    keyword: "mortgage broker SEO",
    kind: "pro",
    edge: "Rate-driven and time-sensitive. Calculators, up-to-date rate content and reviews are what get the enquiry over a bank.",
    clusters: [
      { name: "By buyer", terms: ["first time buyer mortgage", "self employed mortgage", "buy to let mortgage", "bad credit mortgage broker"] },
      { name: "Rates & remortgage", terms: ["remortgage rates", "best mortgage rates today", "when to remortgage", "fixed vs variable mortgage"] },
      { name: "Tools", terms: ["mortgage affordability calculator", "how much can I borrow", "stamp duty calculator"] },
      { name: "Local & trust", terms: ["mortgage broker near me", "mortgage advisor [city]", "mortgage broker reviews"] },
    ],
    moves: [
      "Calculators and tools that capture the enquiry while rates are being compared",
      "Rate and market content kept genuinely current, since stale numbers lose trust instantly",
      "Pages for each buyer type: first-timers, self-employed, movers, landlords",
    ],
  },
  {
    slug: "recruitment-agencies",
    label: "Recruitment & Staffing Agencies",
    keyword: "recruitment agency SEO",
    kind: "pro",
    edge: "Two audiences, two funnels: employers searching for agencies, candidates searching for jobs. The site has to rank and convert for both.",
    clusters: [
      { name: "Employer intent", terms: ["recruitment agency near me", "IT staffing agency", "hospitality recruitment agency", "how much do recruitment agencies charge"] },
      { name: "Candidate intent", terms: ["temp agency jobs", "[role] jobs near me", "staffing agencies hiring now"] },
      { name: "Sector pages", terms: ["engineering recruitment agency", "healthcare staffing agency", "finance recruitment [city]"] },
      { name: "Comparison", terms: ["best recruitment agencies [city]", "recruitment agency reviews", "agency vs in-house hiring"] },
    ],
    moves: [
      "A clear split between the employer journey and the candidate journey on the site",
      "Sector pages that rank for both 'agency for [sector]' and '[sector] jobs'",
      "Fee transparency and case studies on the employer side, live roles on the candidate side",
    ],
  },
  {
    slug: "architects",
    label: "Architects & Surveyors",
    keyword: "architect SEO",
    kind: "pro",
    edge: "Portfolio-led. Project-type pages with real photography and clear process and fee information turn browsers into consultations.",
    clusters: [
      { name: "Project type", terms: ["house extension design", "loft conversion architect", "new build architect", "commercial architect [city]", "listed building architect"] },
      { name: "Process & permissions", terms: ["do I need an architect for an extension", "planning permission drawings", "architect fees for extension", "RIBA stages explained"] },
      { name: "Surveys", terms: ["measured building survey", "party wall surveyor near me", "structural survey cost"] },
      { name: "Local", terms: ["architect near me", "architects in [city]", "residential architect reviews"] },
    ],
    moves: [
      "A page per project type with real photography and the story of the build",
      "Clear guidance on process, timelines and fees, since uncertainty stops the enquiry",
      "Content on planning permission and the design process that catches people early",
    ],
  },
  {
    slug: "veterinary-clinics",
    label: "Veterinary Clinics",
    keyword: "veterinary SEO",
    kind: "pro",
    edge: "Local and emergency intent, plus a lot of informational search. Ranking for pet-health questions builds the trust that wins the registration.",
    clusters: [
      { name: "Routine & emergency", terms: ["vet near me", "emergency vet", "vet open now", "24 hour vet [city]", "vet accepting new patients"] },
      { name: "Services & cost", terms: ["puppy vaccinations cost", "cat neutering price", "dog dental cleaning cost", "pet health plan"] },
      { name: "Pet health questions", terms: ["why is my dog vomiting", "cat not eating", "how often to worm a dog", "signs of arthritis in dogs"] },
      { name: "Comparison", terms: ["best vet [city]", "vet clinic reviews", "how to choose a vet"] },
    ],
    moves: [
      "Service pages with clear pricing and a simple registration flow",
      "Pet-health content that answers owner questions and builds trust before they need you",
      "Google Business Profile and emergency-hours information, since urgent searches convert fast",
    ],
  },
  {
    slug: "private-clinics",
    label: "Private Clinics & Therapists",
    keyword: "private clinic SEO",
    kind: "pro",
    edge: "Condition and service pages, clinician profiles, and a frictionless booking flow. Discretion and credibility carry the decision.",
    clusters: [
      { name: "By service", terms: ["private GP near me", "therapist near me", "private health screening", "counselling near me", "private blood test"] },
      { name: "By concern", terms: ["anxiety therapist near me", "couples counselling", "private dermatologist", "menopause clinic"] },
      { name: "Access & cost", terms: ["private GP appointment cost", "how much is private therapy", "same day private appointment"] },
      { name: "Comparison", terms: ["best private clinic [city]", "private clinic reviews", "NHS vs private [service]"] },
    ],
    moves: [
      "A page per service and per concern, matching the words patients use, not clinical terms",
      "Clinician profiles with qualifications, registration numbers and areas of focus",
      "A two-click booking flow and clear pricing, since friction here loses the patient",
    ],
  },

  // =================================================================
  // Content, niche & affiliate sites
  // =================================================================
  {
    slug: "games",
    label: "Games & Gaming Sites",
    keyword: "gaming website SEO",
    kind: "content",
    edge: "Gaming search spikes on release day and decays fast. Content velocity, update discipline and internal linking decide who owns a title.",
    clusters: [
      { name: "Guides & walkthroughs", terms: ["how to beat [boss]", "[game] walkthrough", "[quest] guide", "[game] all collectibles locations"] },
      { name: "Builds & meta", terms: ["best [class] build [game]", "[game] tier list", "[game] best weapons", "meta [game] [patch]"] },
      { name: "Settings & performance", terms: ["best settings for [game]", "[game] fps boost", "[game] controller settings", "is [game] steam deck compatible"] },
      { name: "News & release", terms: ["[game] release date", "[game] review", "[game] patch notes", "is [game] worth it"] },
    ],
    moves: [
      "Publish the day-one guides before or at launch, then update them with every patch",
      "A tight hub-and-spoke structure per game so the site reads as an authority on that title",
      "Original screenshots, tested builds and real playtime, which AI summaries cannot replace",
    ],
  },
  {
    slug: "tech-reviews",
    label: "Tech & Gadget Review Sites",
    keyword: "tech review site SEO",
    kind: "content",
    edge: "Review sites live or die on trust signals: real testing, named authors, first-hand photos. Thin roundups get filtered out.",
    clusters: [
      { name: "Best-of roundups", terms: ["best [product] [year]", "best budget [product]", "best [product] for [use case]"] },
      { name: "Comparison", terms: ["[product A] vs [product B]", "[brand] vs [brand]", "[product] alternatives"] },
      { name: "Single reviews", terms: ["[product] review", "is [product] worth it", "[product] long term review", "[product] problems"] },
      { name: "Buying help", terms: ["[product] buying guide", "what to look for in a [product]", "[product] specs explained"] },
    ],
    moves: [
      "Real hands-on testing with your own photos, benchmark data and a stated methodology",
      "Named reviewers with a track record, plus an about page and a clear editorial policy",
      "Keep roundups genuinely current, since a stale 'best of' loses rankings fast",
    ],
  },
  {
    slug: "personal-finance",
    label: "Personal Finance Sites",
    keyword: "personal finance SEO",
    kind: "content",
    edge: "YMYL scrutiny is heavy. Credentials, sourcing, and cautious, accurate claims are the price of ranking in money topics.",
    clusters: [
      { name: "Products", terms: ["best high yield savings account", "best rewards credit card", "[broker] review", "best budgeting app"] },
      { name: "How-to", terms: ["how to start investing", "how to build credit", "how to pay off debt fast", "how to make a budget"] },
      { name: "Concepts", terms: ["what is a Roth IRA", "compound interest explained", "index funds vs ETFs", "how does a HYSA work"] },
      { name: "Situational", terms: ["saving for a house", "investing in your 20s", "what to do with an inheritance"] },
    ],
    moves: [
      "Author credentials, primary-source citations and dated data on every money page",
      "A clear editorial and fact-checking process, published, since raters look for it",
      "Product pages kept current with rates and terms, because accuracy is the ranking signal here",
    ],
  },
  {
    slug: "crypto",
    label: "Crypto & Fintech Sites",
    keyword: "crypto website SEO",
    kind: "content",
    edge: "Volatile demand and heavy competition. Speed, entity authority and staying current with regulation separate the survivors.",
    clusters: [
      { name: "Exchanges & wallets", terms: ["best crypto exchange", "[exchange] review", "[wallet] review", "safest crypto wallet"] },
      { name: "How-to", terms: ["how to buy [coin]", "how to stake [coin]", "how to move crypto to cold storage"] },
      { name: "Explainers", terms: ["what is [coin]", "[coin] vs [coin]", "is [coin] a good investment", "how do crypto taxes work"] },
      { name: "News & regulation", terms: ["[coin] price prediction", "crypto regulation [country]", "[coin] halving date"] },
    ],
    moves: [
      "Fast, clean pages and a strong content hierarchy, since competition here is relentless",
      "Regulation and tax content kept current per country, because that is where trust is won",
      "Clear author identity and disclosure, given how much scam content the models filter out",
    ],
  },
  {
    slug: "health-wellness",
    label: "Health & Wellness Sites",
    keyword: "health website SEO",
    kind: "content",
    edge: "The strictest YMYL category. Medical review, clear sourcing and author expertise are non-negotiable for visibility.",
    clusters: [
      { name: "Conditions & symptoms", terms: ["symptoms of [condition]", "[condition] treatment options", "is [symptom] serious", "how long does [illness] last"] },
      { name: "Nutrition & supplements", terms: ["best supplements for [goal]", "benefits of [nutrient]", "[diet] meal plan", "how much [nutrient] per day"] },
      { name: "Fitness & sleep", terms: ["how to improve sleep", "beginner workout plan", "how to lower [marker] naturally"] },
      { name: "Comparison", terms: ["[supplement A] vs [supplement B]", "best [product] for [condition]"] },
    ],
    moves: [
      "Medical review by a qualified professional, shown on the page, with citations to studies",
      "Author bios that establish real expertise, plus a visible editorial process",
      "Cautious, accurate claims, since overreach is the fastest way to lose health rankings",
    ],
  },
  {
    slug: "travel",
    label: "Travel & Destination Sites",
    keyword: "travel blog SEO",
    kind: "content",
    edge: "Destination clusters and seasonal timing. Original photos and genuine first-hand detail are what hold rankings against AI summaries.",
    clusters: [
      { name: "Destination guides", terms: ["things to do in [city]", "[destination] itinerary", "[city] 3 day itinerary", "hidden gems in [place]"] },
      { name: "Planning", terms: ["best time to visit [place]", "is [destination] safe", "[country] visa requirements", "how many days in [city]"] },
      { name: "Logistics", terms: ["where to stay in [city]", "[city] airport to city centre", "getting around [destination]"] },
      { name: "Comparison", terms: ["[destination A] vs [destination B]", "best [region] beaches", "[city] vs [city] for [traveller type]"] },
    ],
    moves: [
      "First-hand guides with your own photos and specific, current detail (prices, times, closures)",
      "Destination hubs that link tightly, so the site owns a place rather than scattering posts",
      "Seasonal updates before each travel season, which is when the searches happen",
    ],
  },
  {
    slug: "food-recipes",
    label: "Food & Recipe Sites",
    keyword: "recipe website SEO",
    kind: "content",
    edge: "Recipe schema, fast image-heavy pages and a tight content hierarchy. Core Web Vitals matter more here than almost anywhere.",
    clusters: [
      { name: "Recipes", terms: ["[dish] recipe", "easy [ingredient] dinner", "how to make [thing] from scratch", "[dish] recipe no [allergen]"] },
      { name: "Technique", terms: ["how to cook [ingredient]", "how long to bake [thing]", "how to store [food]"] },
      { name: "Diet & occasion", terms: ["high protein [meal]", "[diet] dinner ideas", "[holiday] recipes", "meal prep [goal]"] },
      { name: "Substitutions", terms: ["[ingredient] substitute", "can I use [X] instead of [Y]", "egg replacement in baking"] },
    ],
    moves: [
      "Recipe schema on every recipe, and a fast, well-compressed image pipeline",
      "A clean category and cuisine structure so Google sees a real food authority",
      "Jump-to-recipe and lean templates, because Core Web Vitals decide a lot of these rankings",
    ],
  },
  {
    slug: "home-diy",
    label: "Home & DIY Sites",
    keyword: "DIY website SEO",
    kind: "content",
    edge: "How-to intent with strong affiliate overlap. Step-by-step structure and real project photos earn both rankings and AI citations.",
    clusters: [
      { name: "How-to", terms: ["how to [repair task]", "how to install [thing]", "how to fix a [problem]", "step by step [project]"] },
      { name: "Tools & materials", terms: ["best [tool] for beginners", "[tool] vs [tool]", "what [material] to use for [job]"] },
      { name: "Cost & planning", terms: ["[project] cost", "how long does [project] take", "is [project] worth doing yourself"] },
      { name: "Troubleshooting", terms: ["why is my [thing] [problem]", "[appliance] not working", "how to remove [stain / material]"] },
    ],
    moves: [
      "Genuine step-by-step content with your own photos at each stage",
      "Tool and material comparison pages, which carry both rankings and affiliate revenue",
      "Answer-first formatting under clear headings, so steps get lifted into AI answers",
    ],
  },
  {
    slug: "outdoor-fitness",
    label: "Outdoor, Fitness & Sport Sites",
    keyword: "fitness website SEO",
    kind: "content",
    edge: "Gear reviews plus training content. First-hand testing and coach credentials are what lift you above the content farms.",
    clusters: [
      { name: "Gear", terms: ["best [gear] for [activity]", "best budget [gear]", "[product] review", "[product A] vs [product B]"] },
      { name: "Training", terms: ["[exercise] form guide", "beginner [sport] plan", "how to train for [event]", "[goal] workout plan"] },
      { name: "How-to & skills", terms: ["how to [skill]", "how to fix [technique problem]", "[activity] for beginners"] },
      { name: "Comparison", terms: ["[activity A] vs [activity B]", "is [gear] worth it", "best [activity] apps"] },
    ],
    moves: [
      "Real testing: miles run, routes hiked, sessions done, with your own photos and data",
      "Coach or athlete credentials on training content, since expertise is the differentiator",
      "Structured, scannable guides that both rank and get cited in AI answers",
    ],
  },
  {
    slug: "parenting",
    label: "Parenting & Family Sites",
    keyword: "parenting blog SEO",
    kind: "content",
    edge: "Trust-sensitive and product-heavy. Named parent authors, safety sourcing and honest reviews build the authority to rank.",
    clusters: [
      { name: "Products", terms: ["best [product] for babies", "best car seat [year]", "[product] review", "safest [product]"] },
      { name: "Development", terms: ["[milestone] age", "when do babies [milestone]", "is [behaviour] normal for a [age]"] },
      { name: "How-to", terms: ["how to handle [parenting issue]", "sleep training methods", "how to wean off [thing]"] },
      { name: "Comparison", terms: ["[product A] vs [product B]", "[brand] vs [brand] [product]", "best [product] for [situation]"] },
    ],
    moves: [
      "Real parent authors with bios, plus safety-standard citations on product content",
      "Honest reviews that name downsides, since parents can smell an affiliate puff piece",
      "Development and how-to hubs that build topical trust across the whole parenting journey",
    ],
  },
  {
    slug: "pets",
    label: "Pet & Animal Sites",
    keyword: "pet website SEO",
    kind: "content",
    edge: "Breed and behaviour clusters are huge and under-served. Vet review and first-hand experience are the differentiators.",
    clusters: [
      { name: "Breed", terms: ["is a [breed] a good family dog", "[breed] temperament", "[breed] health problems", "how much does a [breed] cost"] },
      { name: "Behaviour & health", terms: ["why is my cat [behaviour]", "why does my dog [behaviour]", "signs of [condition] in [pet]", "how to stop [pet] from [behaviour]"] },
      { name: "Products & food", terms: ["best dog food for [breed]", "[pet product] review", "best [product] for [pet issue]"] },
      { name: "Care how-to", terms: ["how to [care task] a [pet]", "how often to [care task]", "[pet] first aid"] },
    ],
    moves: [
      "Deep breed and behaviour hubs, since that keyword set is enormous and poorly served",
      "Vet review on health content, and disclosed first-hand experience on care and products",
      "Honest product reviews with real use, not spec sheets",
    ],
  },
  {
    slug: "beauty-fashion",
    label: "Beauty & Fashion Sites",
    keyword: "beauty blog SEO",
    kind: "content",
    edge: "Fast-moving trends and heavy affiliate competition. Original swatches, real testing and publishing cadence carry the site.",
    clusters: [
      { name: "Product finding", terms: ["best [product] for [skin type]", "best drugstore [product]", "[product] for [concern]", "[brand] dupe"] },
      { name: "How-to", terms: ["how to apply [product]", "[technique] tutorial", "how to make [look]", "skincare routine order"] },
      { name: "Reviews & comparison", terms: ["[product] review", "[product A] vs [product B]", "is [product] worth it"] },
      { name: "Trends", terms: ["[season] [year] trends", "[colour] outfit ideas", "how to style [item]"] },
    ],
    moves: [
      "Original swatches and worn-it testing photos, which AI summaries and text-only sites cannot match",
      "A consistent publishing cadence, since this niche rewards freshness heavily",
      "Dupe and comparison content, which is high-intent and converts on affiliate",
    ],
  },
  {
    slug: "education",
    label: "Education & How-To Sites",
    keyword: "education website SEO",
    kind: "content",
    edge: "Explainer and comparison intent. Clear structure, accurate information and genuine expertise get lifted into AI answers.",
    clusters: [
      { name: "Learn a skill", terms: ["how to learn [skill]", "best way to learn [subject]", "[skill] for beginners", "how long to learn [skill]"] },
      { name: "Explainers", terms: ["[topic] explained", "what is [concept]", "[concept] examples", "difference between [X] and [Y]"] },
      { name: "Courses & tools", terms: ["best course for [subject]", "[platform] review", "free vs paid [subject] course"] },
      { name: "Exam & career", terms: ["how to pass [exam]", "[certification] worth it", "[career] roadmap"] },
    ],
    moves: [
      "Answer-first, well-structured explainers, since these get pulled into AI answers directly",
      "Author expertise shown clearly, and accurate, sourced information",
      "Course-comparison content, which is where the affiliate or lead value sits",
    ],
  },

  // =================================================================
  // Business & online stores
  // =================================================================
  {
    slug: "ecommerce",
    label: "E-commerce & Shopify Stores",
    keyword: "e-commerce SEO",
    kind: "business",
    edge: "Category and product pages are the engine. Technical health, faceted-navigation control and content on collection pages decide organic revenue.",
    clusters: [
      { name: "Category & product", terms: ["[product] for sale", "buy [product] online", "[adjective] [product]", "[product] [attribute]"] },
      { name: "Comparison", terms: ["best [product] for [use]", "[product A] vs [product B]", "[product] alternatives"] },
      { name: "Buying help", terms: ["[product] buying guide", "how to choose a [product]", "[product] size guide"] },
      { name: "Brand & support", terms: ["[brand] [product]", "[product] care instructions", "how to [use / assemble] [product]"] },
    ],
    moves: [
      "Category pages built to rank: unique copy, internal links, and controlled faceted navigation",
      "Technical health at scale (crawl budget, canonicals, index bloat), which caps or unlocks growth",
      "Buying-guide and comparison content that feeds shoppers into the right collection pages",
    ],
  },
  {
    slug: "saas",
    label: "SaaS & Software Products",
    keyword: "SaaS SEO",
    kind: "business",
    edge: "Bottom-of-funnel comparison and alternative pages convert. Programmatic pages and a real content engine compound over quarters.",
    clusters: [
      { name: "Bottom of funnel", terms: ["best [category] software", "[competitor] alternative", "[tool] pricing", "[tool] vs [tool]"] },
      { name: "Jobs to be done", terms: ["how to [task] software", "[category] tool for [team size]", "[category] software for [industry]"] },
      { name: "Integrations & use cases", terms: ["[tool] [integration]", "[tool] for [use case]", "[category] with [feature]"] },
      { name: "Education", terms: ["what is [category] software", "[concept] explained", "[category] best practices"] },
    ],
    moves: [
      "Comparison, alternative and pricing pages, which are where SaaS search actually converts",
      "Programmatic pages for integrations, use cases and industries, each with real value",
      "A content engine tied to product-qualified signups, not just traffic",
    ],
  },
  {
    slug: "b2b-lead-gen",
    label: "B2B Lead Generation Sites",
    keyword: "B2B SEO",
    kind: "business",
    edge: "Long sales cycles, high deal value. Service plus industry pages plus problem-aware content feed the pipeline for months.",
    clusters: [
      { name: "Service + industry", terms: ["[service] for [industry]", "[solution] provider", "outsourced [function] company"] },
      { name: "Pricing & vendor choice", terms: ["[service] pricing", "how much does [service] cost", "[service] company vs in-house"] },
      { name: "Problem-aware", terms: ["how to [business problem]", "signs you need [service]", "[metric] benchmark [industry]"] },
      { name: "Comparison", terms: ["best [service] companies", "[vendor] alternatives", "[service] RFP checklist"] },
    ],
    moves: [
      "A page for every service crossed with every industry you sell into",
      "Middle-of-funnel content (cost, comparison, how-to) that nurtures the long cycle",
      "Case studies and proof on the money pages, since B2B buyers need evidence",
    ],
  },
  {
    slug: "startups",
    label: "Startups & MVP Landing Pages",
    keyword: "startup SEO",
    kind: "business",
    edge: "You are building topical authority from zero. Pick one cluster, own it, then expand. Speed and focus beat breadth early.",
    clusters: [
      { name: "Problem search", terms: ["[problem] solution", "how to [job to be done]", "why is [problem] hard", "tools for [job]"] },
      { name: "Category", terms: ["[category] tool", "best [category] app", "[category] software for [audience]"] },
      { name: "Alternatives", terms: ["[incumbent] alternative", "cheaper [incumbent]", "[incumbent] vs [category]"] },
      { name: "Education", terms: ["what is [new concept]", "[concept] guide", "[concept] examples"] },
    ],
    moves: [
      "One tight topic cluster owned completely before expanding to the next",
      "Alternative and comparison pages against the incumbents, which convert from day one",
      "Fast pages and a clear information architecture, so early authority is not wasted",
    ],
  },
  {
    slug: "agencies",
    label: "Agencies & Consultancies",
    keyword: "agency SEO",
    kind: "business",
    edge: "Positioning is the SEO strategy. Sharp service pages, real case studies and a narrow niche outrank generalist agencies.",
    clusters: [
      { name: "Service + niche", terms: ["[service] agency", "[service] agency for [industry]", "[niche] consultants", "[service] specialist"] },
      { name: "Location", terms: ["[service] agency [city]", "best [service] agencies [country]"] },
      { name: "Vendor choice", terms: ["how to choose a [service] agency", "[service] agency pricing", "in-house vs agency [function]"] },
      { name: "Comparison", terms: ["best [service] agencies", "[agency] alternatives", "top [niche] agencies [year]"] },
    ],
    moves: [
      "A sharp niche and service pages that say exactly who you are for",
      "Real, specific case studies with numbers, since that is what agency buyers filter on",
      "Location and 'agency for [industry]' pages to catch qualified, ready-to-buy search",
    ],
  },
  {
    slug: "restaurants",
    label: "Restaurants & Hospitality",
    keyword: "restaurant SEO",
    kind: "business",
    edge: "Google Business Profile, menu markup and reservation links do most of the work. A fast mobile site closes the gap.",
    clusters: [
      { name: "Discovery", terms: ["restaurants near me", "[cuisine] near me", "best [dish] in [city]", "restaurants open now"] },
      { name: "Occasion", terms: ["date night restaurants [city]", "private dining [city]", "restaurants for large groups", "birthday dinner [area]"] },
      { name: "Booking", terms: ["book a table [restaurant]", "[restaurant] reservations", "[restaurant] menu"] },
      { name: "Dietary", terms: ["vegan restaurants [city]", "gluten free [cuisine] near me", "halal restaurants [area]"] },
    ],
    moves: [
      "Google Business Profile fully optimised, with photos, menu, hours and reservation links",
      "Structured data for menu, opening hours and reservations",
      "Occasion and dietary pages (date night, private dining, vegan), which are high-intent searches",
    ],
  },
  {
    slug: "real-estate-developments",
    label: "Real Estate Developments",
    keyword: "property development SEO",
    kind: "business",
    edge: "Development and location pages with strong visuals and clear availability. Local intent plus brand search is the whole funnel.",
    clusters: [
      { name: "New homes search", terms: ["new homes in [area]", "new build apartments [city]", "off-plan property [city]", "new developments near me"] },
      { name: "Development brand", terms: ["[development name]", "[development name] prices", "[development name] reviews", "[developer] developments"] },
      { name: "Buyer questions", terms: ["is off-plan a good investment", "help to buy [development]", "new build vs old house", "shared ownership [area]"] },
      { name: "Comparison", terms: ["best new build developments [city]", "[area A] vs [area B] to buy"] },
    ],
    moves: [
      "A page per development and per target area, with high-quality visuals and live availability",
      "Buyer-guidance content on schemes, off-plan and the buying process",
      "Local-area pages that rank for 'new homes in [area]' and route to the nearest development",
    ],
  },
  {
    slug: "non-profits",
    label: "Non-Profits & Charities",
    keyword: "nonprofit SEO",
    kind: "business",
    edge: "Cause-based content and clear ways to act. Ranking for the issue, not just the org name, is how you reach new supporters.",
    clusters: [
      { name: "The cause", terms: ["how to help with [issue]", "[cause] statistics", "what is [issue]", "how does [issue] affect [group]"] },
      { name: "Ways to give", terms: ["donate to [cause]", "[cause] charity", "volunteer [cause] near me", "leave a gift in your will to charity"] },
      { name: "Support seeking", terms: ["[service] support near me", "help with [problem]", "[cause] helpline"] },
      { name: "Comparison & trust", terms: ["best [cause] charities to donate to", "is [charity] legit", "where does my donation go"] },
    ],
    moves: [
      "Content that ranks for the issue itself, which is how you reach people who do not know you yet",
      "Clear, low-friction paths to donate, volunteer or get help on every relevant page",
      "Transparency content (impact, finances) that builds the trust to convert a first-time donor",
    ],
  },
  {
    slug: "course-membership",
    label: "Course & Membership Sites",
    keyword: "course website SEO",
    kind: "business",
    edge: "Free content is the funnel. Topic clusters that demonstrate expertise pull the searches that turn into enrolments.",
    clusters: [
      { name: "Learn the skill", terms: ["how to [skill]", "learn [skill] online", "[skill] tutorial", "[skill] for beginners"] },
      { name: "Course search", terms: ["best [topic] course", "[topic] certification", "is [course type] worth it", "free [topic] course"] },
      { name: "Comparison", terms: ["[course A] vs [course B]", "[platform] review", "[course] alternatives"] },
      { name: "Outcome", terms: ["how to become a [role]", "[skill] jobs", "[skill] salary", "[skill] portfolio examples"] },
    ],
    moves: [
      "A free content cluster deep enough to prove you can teach the thing",
      "Comparison and 'is it worth it' pages, which catch people ready to enrol",
      "Outcome content (careers, salaries, portfolios) that connects the skill to a reason to pay",
    ],
  },
  {
    slug: "directories",
    label: "Directories & Marketplaces",
    keyword: "directory site SEO",
    kind: "business",
    edge: "Scale with quality control. Programmatic location and category pages work only if each one carries real, unique value.",
    clusters: [
      { name: "Category + location", terms: ["[service] in [city]", "[profession] near me", "best [category] in [area]", "[category] directory"] },
      { name: "Listing intent", terms: ["[business type] [city] reviews", "compare [category] [city]", "top rated [service] [area]"] },
      { name: "Long tail", terms: ["[niche service] [small town]", "[category] that offer [feature]", "cheap [service] [area]"] },
      { name: "For providers", terms: ["list my business on [directory]", "[directory] for [profession]", "add business to directory"] },
    ],
    moves: [
      "Every programmatic page carrying genuinely unique value: real listings, data, reviews, not a template shell",
      "Tight control of index bloat, so thin pages do not drag the whole domain down",
      "Location and category pages structured as the useful answer to '[service] in [place]'",
    ],
  },
];

export const nicheBySlug = (slug: string): Niche | undefined =>
  NICHES.find((n) => n.slug === slug);

const KIND_GROUPS: { kind: NicheKind; title: string }[] = [
  { kind: "local", title: "Home & local services" },
  { kind: "pro", title: "Professional, legal & medical" },
  { kind: "content", title: "Content, niche & affiliate sites" },
  { kind: "business", title: "Business & online stores" },
];

export function nichesGrouped(): { title: string; niches: Niche[] }[] {
  return KIND_GROUPS.map((g) => ({
    title: g.title,
    niches: NICHES.filter((n) => n.kind === g.kind),
  }));
}
