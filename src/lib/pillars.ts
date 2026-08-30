/**
 * Pillar pages — the topic hubs that sit under a category, e.g. /seo/tech/.
 *
 * A pillar is a curated overview of one sub-topic: an intro, a hand-picked set
 * of guides (existing posts), optional tool cards, and an auto "latest" feed.
 * URLs are `/{category}/{pillar-slug}/` — no `/hub/` segment.
 *
 * Post slugs listed here must exist in WordPress; unknown slugs are ignored at
 * build time (see resolvePillarPosts in the page).
 */

export interface PillarTool {
  title: string;
  description: string;
  icon: string; // Font Awesome class, e.g. "fa-solid fa-magnifying-glass-chart"
  href: string;
}

export interface Pillar {
  slug: string;
  category: string;
  /** short label for nav / cards */
  name: string;
  /** H1 */
  title: string;
  /** hero eyebrow */
  eyebrow: string;
  /** hero lead paragraph */
  intro: string;
  /** Font Awesome icon + accent colour for the topic */
  icon: string;
  color: string;
  colorSoft: string;
  /** one-liner for the pillar card on other pages */
  cardText: string;
  /** hand-picked guides for this pillar, in order (WordPress slugs) */
  guideSlugs: string[];
  /** heading above the guide grid */
  guidesHeading: string;
  /** optional free-tool cards */
  tools?: PillarTool[];
  toolsHeading?: string;
  /**
   * Long-form pillar content. Trusted HTML authored here (never user input):
   * <h2>/<h3> section headings, <p>, <ul>/<ol>, <ul class="check-list">,
   * <div class="callout">. The page injects ids on the <h2>s for the TOC.
   */
  bodyHtml: string;
}

export const PILLARS: Pillar[] = [
  {
    slug: "tech",
    category: "seo",
    name: "Technical SEO",
    title: "Technical & On-Page SEO",
    eyebrow: "SEO Pillar",
    intro:
      "The foundation every ranking sits on: how search engines crawl, render and index your site, plus the on-page work that tells them what each page is about.",
    icon: "fa-solid fa-screwdriver-wrench",
    color: "#1799ad",
    colorSoft: "rgba(46, 196, 216, 0.16)",
    cardText:
      "Crawlability, indexing, site architecture, structured data, and on-page optimization.",
    guidesHeading: "Technical & on-page guides",
    guideSlugs: [
      "technical-seo",
      "seo-crawling-indexing-and-ranking",
      "onpage-seo-a-detailed-guide-for-beginners",
      "internal-linking-guide",
      "seo-for-your-new-website",
      "local-seo-guide",
    ],
    bodyHtml: `
<p class="prose-lede">Here is the uncomfortable thing about technical SEO: nobody notices when it is done well. They notice when a botched migration wipes out six months of rankings overnight. This guide is about staying in the first group.</p>

<h2>Why technical SEO is the highest-leverage work you can do</h2>
<p>Most SEO tasks help one page. Technical SEO usually helps every page built on the same template — so fixing one thing can lift ten thousand URLs at once.</p>
<p>It also gates everything else. You can write the best guide on the internet, but if Googlebot cannot crawl it, render it, or tell it apart from three near-duplicates, it will not rank. Content and links are the engine. Technical SEO is whether the car starts.</p>

<h2>Crawl, render, index: where pages actually get stuck</h2>
<p>Every URL passes through the same three gates. Miss one and the rest never happen.</p>
<ol>
  <li><strong>Crawl.</strong> Googlebot finds the URL through a link or your sitemap and requests it. A <code>Disallow</code> in robots.txt, a page five clicks deep, or a run of 5xx errors, and it stops here.</li>
  <li><strong>Render.</strong> Google loads the page and runs its JavaScript to see the final HTML. If your main content or internal links only appear after a slow client-side fetch, expect them to be missed or seen late.</li>
  <li><strong>Index.</strong> Google decides whether the rendered page is worth storing. A stray <code>noindex</code>, a canonical pointing somewhere else, or content that looks like a copy of another page keeps it out.</li>
</ol>
<p>Run one of your money pages through the URL Inspection tool in Search Console right now. "Crawled — currently not indexed" and "Discovered — currently not indexed" are the two messages that quietly kill traffic, and almost nobody checks for them.</p>

<div class="callout"><p><strong>Pro tip:</strong> open Search Console's Pages report, filter to "Not indexed", and sort by impressions. Any URL with impressions that is not indexed is money on the table — usually a canonical or thin-content issue you can fix in an afternoon.</p></div>

<h2>Site architecture: the three-click rule still holds</h2>
<p>If an important page takes more than three clicks to reach from the homepage, users and crawlers both treat it as less important — because structurally, it is.</p>
<ul>
  <li><strong>Build topic clusters.</strong> One pillar page (like this one) links down to every supporting article, and each article links back up. Google reads that as "this site owns this topic".</li>
  <li><strong>Keep URLs boring.</strong> <code>/seo/tech</code> beats <code>/blog/2026/04/post-4471?ref=nav</code>. Short, lowercase, readable, no dates you will regret.</li>
  <li><strong>Flatten deep sections.</strong> Add hub pages and contextual links so nothing is buried behind pagination.</li>
  <li><strong>Trim the sitemap.</strong> It should list only canonical, indexable, 200-status URLs — not tag pages, not redirects, not <code>noindex</code> pages.</li>
</ul>

<h2>On-page SEO: the fundamentals that still move rankings</h2>

<h3>Title tags</h3>
<p>Google rewrites roughly a third of titles anyway, so write one it will not want to change: primary keyword near the front, a reason to click, under about 60 characters (or ~600 pixels) so it does not truncate. One title per page, one <code>H1</code> that matches it.</p>

<h3>Heading structure</h3>
<p><code>H2</code>s for sections, <code>H3</code>s for subpoints, in order, no skipped levels. This is not pedantry: a clean hierarchy is exactly what an AI answer engine needs to lift one self-contained section of your page as a citation.</p>

<h3>Internal links</h3>
<p>Internal links pass authority and context, and they are the one ranking lever you fully control. Link to a new page from your strongest existing pages on day one, use anchor text that describes the destination, and do it while you publish — not in a cleanup pass six months later that never happens.</p>

<h2>Core Web Vitals without the rabbit hole</h2>
<p>Three metrics, three targets, measured on real mobile visitors:</p>
<ul>
  <li><strong>LCP</strong> — the largest element paints in under <strong>2.5 seconds</strong>. Usually a hero image or a web font.</li>
  <li><strong>INP</strong> — the page responds to a tap in under <strong>200 milliseconds</strong>. Usually heavy JavaScript.</li>
  <li><strong>CLS</strong> — the layout stops shifting below <strong>0.1</strong>. Usually images and ads with no reserved space.</li>
</ul>
<p>The quick wins are almost always the same: compress and lazy-load images, serve WebP or AVIF, set explicit width and height on media, and delete third-party scripts nobody remembers adding.</p>

<h2>Technical SEO checklist</h2>
<ul class="check-list">
  <li>Every money page returns 200 and sits within three clicks of the homepage</li>
  <li>Search Console's "Not indexed" report has no URLs with real impressions</li>
  <li>One canonical version of the site — HTTPS, www / non-www resolved, no trailing-slash duplicates</li>
  <li>robots.txt blocks nothing you want indexed; sitemap lists only canonical 200s</li>
  <li>Schema in place where it applies — Article, FAQ, Product, Breadcrumb</li>
  <li>LCP under 2.5s, INP under 200ms, CLS under 0.1 on mobile</li>
  <li>Redirect chains collapsed to a single hop; no internal links pointing at redirects</li>
</ul>
`,
  },
  {
    slug: "backlinks",
    category: "seo",
    name: "Link Building",
    title: "Link Building & Backlinks",
    eyebrow: "SEO Pillar",
    intro:
      "Links are still one of Google's strongest signals. Learn how to earn authoritative backlinks, run a backlink audit, and find the gaps your competitors are exploiting.",
    icon: "fa-solid fa-link",
    color: "#d8412c",
    colorSoft: "rgba(241, 94, 74, 0.16)",
    cardText:
      "Earning authoritative links, off-page signals, backlink audits, and competitor gap analysis.",
    guidesHeading: "Link building guides",
    guideSlugs: [
      "off-page-seo-guide",
      "dofollow-backlink-sites",
      "seo-competitor-analysis",
    ],
    bodyHtml: `
<p class="prose-lede">Every year someone announces that links are dead. Every year the pages sitting in position one have more of them than the pages ranking below. Until that stops being true, link building is worth doing properly.</p>

<h2>What a link worth chasing actually looks like</h2>
<p>Forget domain-rating thresholds for a second. A link is worth the effort when it clears five checks:</p>
<ul>
  <li><strong>Relevance.</strong> The linking page is about your topic — not the site in general, the page.</li>
  <li><strong>Editorial.</strong> A person added it because it helped their reader, not because you paid or swapped.</li>
  <li><strong>Placement.</strong> In the body copy, near the top — not a footer or a bio block stuffed with links.</li>
  <li><strong>Traffic.</strong> The page has real visitors who might actually click through.</li>
  <li><strong>Anchor text.</strong> It reads naturally. A profile where every link is exact-match anchor is a footprint, not a strategy.</li>
</ul>
<p>One link that clears all five beats fifty that clear none — and it carries none of the risk.</p>

<h2>Five tactics that still earn links in 2026</h2>
<ol>
  <li><strong>Original data.</strong> Run a survey, analyse a dataset, publish a benchmark. Writers need a statistic to cite, and a good one keeps earning links for years with zero extra outreach.</li>
  <li><strong>The upgrade play.</strong> Find a popular resource in your niche that has gone stale, build a genuinely better version, then email every site still linking to the old one. You are not asking a favour — you are pointing out a near-broken link.</li>
  <li><strong>Guest posts, narrow.</strong> Not "write for us" farms. A handful of real publications your buyers read, pitched an article you would be proud to put your name on.</li>
  <li><strong>Unlinked mentions.</strong> Search your brand name in quotes, minus your own domain. Anywhere you are named without a link is a 30-second email from becoming one.</li>
  <li><strong>Podcasts and journalist requests.</strong> The fastest links to land. One good answer to a source request or one podcast appearance usually comes with a contextual bio link.</li>
</ol>

<h2>Audit what you already have, every quarter</h2>
<p>Before you build anything new, look at the profile you own. A 30-minute audit answers three questions:</p>
<ul>
  <li><strong>What is working?</strong> Sort referring domains by the traffic and rankings they correlate with, and do more of whatever earned them.</li>
  <li><strong>What is toxic?</strong> Almost nothing. Google ignores most spam on its own. Disavow only deliberate manipulation — a paid-link network, a negative-SEO blast — and even then, sparingly.</li>
  <li><strong>What did you lose?</strong> Links drop when pages get deleted or redesigned. A short "this moved" email or a 301 gets a lot of them back.</li>
</ul>

<h2>Steal your competitors' link sources</h2>
<p>A link gap analysis lists every domain linking to two or more competitors but not to you. Those sites have already decided they link to content like yours — they just have not found yours yet. Export the list, cut the irrelevant ones, sort by relevance and authority, and work top-down. It is the warmest prospect list you will ever build.</p>

<div class="callout"><p><strong>The one question that predicts link success:</strong> would this page have earned the link if you had never done outreach? If yes, outreach just speeds it up. If no, you are pushing water uphill.</p></div>

<h2>Links that are not worth the risk</h2>
<ul>
  <li>Paid placements that pass PageRank without <code>rel="sponsored"</code> or <code>nofollow</code>.</li>
  <li>Reciprocal schemes at scale — "I'll link you if you link me".</li>
  <li>Private blog networks. Google has spent a decade getting good at spotting them.</li>
  <li>Comment, forum and profile spam. Zero upside, real downside.</li>
</ul>

<h2>Link building checklist</h2>
<ul class="check-list">
  <li>One genuine linkable asset — data, tool or definitive guide — shipped per quarter</li>
  <li>A prospect list scored by relevance and authority, not just DR</li>
  <li>Outreach personalised enough that a real person clearly wrote it</li>
  <li>Backlink profile audited quarterly; lost links reclaimed</li>
  <li>Link gap run against your top three competitors</li>
  <li>Every page that earns an external link also gets a fresh internal one</li>
</ul>
`,
  },
  {
    slug: "news",
    category: "seo",
    name: "SEO News",
    title: "SEO News & Algorithm Updates",
    eyebrow: "SEO Pillar",
    intro:
      "What's actually changing in search — algorithm updates, Google's E-E-A-T guidance, and the shift from ten blue links to AI-generated answers.",
    icon: "fa-solid fa-newspaper",
    color: "#8256c5",
    colorSoft: "rgba(130, 86, 197, 0.16)",
    cardText:
      "Algorithm updates, E-E-A-T guidance, and the move toward AI-generated answers.",
    guidesHeading: "Latest from the SEO desk",
    // empty → auto-fill with the most recent posts in the category
    guideSlugs: [],
    bodyHtml: `
<p class="prose-lede">Most SEO news does not matter. The trick is not reading more of it — it is knowing which slice changes what you do on Monday. Right now that slice all points the same direction: search is turning into an answer.</p>

<h2>How to read an algorithm update without panicking</h2>
<p>Google confirms a core update, SEO Twitter melts down, and half the advice that week is written by people watching a rank tracker refresh. Do this instead:</p>
<ul>
  <li><strong>Wait for the rollout to finish.</strong> Core updates take two to three weeks. Judging your traffic on day three is like weighing yourself after one meal.</li>
  <li><strong>Segment before you conclude.</strong> A drop concentrated in one folder or one query type is a specific, fixable problem. A smooth sitewide decline is usually a bigger, slower one.</li>
  <li><strong>Change nothing mid-rollout.</strong> Ship five fixes during the update and you will never know which one mattered — or whether it corrected on its own.</li>
</ul>
<p>Core updates rarely "penalise" a site. They re-score what Google already believed about quality across the whole index. Recovery means genuinely improving the pages that dropped, then waiting for the next update to re-evaluate them.</p>

<h2>Search is becoming an answer, and that changes the job</h2>
<p>AI Overviews, ChatGPT search, Perplexity, Google's AI Mode — different products, same behaviour. They read several pages and write one answer, and the user often never clicks. Three consequences you can plan around:</p>
<ul>
  <li><strong>Being cited now matters as much as ranking.</strong> A link inside the AI answer can send qualified traffic even from position eight.</li>
  <li><strong>Informational queries bleed clicks; commercial ones hold.</strong> "What is X" gets answered in place. "Best X for Y" and "X vs Y" still send people to pages, because buyers want to verify.</li>
  <li><strong>Brand recognition is a ranking factor now.</strong> Models lean toward names they already associate with a topic. Being a known entity is not vanity — it is retrieval.</li>
</ul>

<h2>E-E-A-T, translated into things you can actually do</h2>
<p>Experience, Expertise, Authoritativeness, Trust is not a dial you can turn. It is a set of signals raters look for and systems approximate. Make them obvious:</p>
<ul>
  <li>Real, named authors with a bio and a track record — not "Admin" or "Editorial Team".</li>
  <li>First-hand proof: your own screenshots, your own test results, your own numbers.</li>
  <li>Primary sources linked, statistics dated, claims you can stand behind.</li>
  <li>A findable business behind the site — about page, real contact details, a stated editorial process.</li>
</ul>

<div class="callout"><p><strong>Keep a changelog.</strong> One shared doc: what you shipped, which pages, which date. When traffic moves, you will have cause and effect instead of a group chat full of guesses.</p></div>

<h2>What we're watching in 2026</h2>
<ul>
  <li>How far AI Overviews cut into informational traffic — and which content formats survive the cut.</li>
  <li>Whether <code>llms.txt</code> becomes a real standard or another <code>humans.txt</code>.</li>
  <li>Reddit, YouTube and other UGC platforms taking more of both classic and AI results.</li>
  <li>The SEO tool market consolidating hard around AI-visibility tracking.</li>
</ul>

<h2>How to stay current in 20 minutes a week</h2>
<p>Pick three or four practitioners who publish tests, not takes. Check Google's Search Status Dashboard only when you actually see movement. Skim one weekly roundup. Ignore the rest. The people who obsess over daily volatility are rarely the ones with the best rankings.</p>
`,
  },
  {
    slug: "tools",
    category: "seo",
    name: "SEO Tools",
    title: "SEO Tools & Reviews",
    eyebrow: "SEO Pillar",
    intro:
      "The SEO and AI tools our team actually uses, honest reviews of the big platforms, and free checkers you can run right now.",
    icon: "fa-solid fa-toolbox",
    color: "#00a988",
    colorSoft: "rgba(0, 188, 152, 0.16)",
    cardText:
      "Tool reviews, platform comparisons, and free checkers you can run right now.",
    guidesHeading: "Tool guides & reviews",
    guideSlugs: [
      "best-ai-seo-tools",
      "best-ai-seo-agencies",
      "best-linkedin-free-ai-tools",
    ],
    bodyHtml: `
<p class="prose-lede">The average SEO team pays for four tools and actively uses maybe 30% of two of them. You do not need a bigger stack. You need four jobs covered — and the discipline to cancel anything that does not do one of them.</p>

<h2>The four jobs your stack has to cover</h2>
<ol>
  <li><strong>Keyword and topic research.</strong> What people search, how hard it is to rank, and the intent behind the query.</li>
  <li><strong>Technical crawling.</strong> Broken links, redirect chains, orphan pages, indexation gaps, Core Web Vitals.</li>
  <li><strong>Content optimisation.</strong> What the pages already ranking cover that your draft does not.</li>
  <li><strong>Rank and AI-visibility tracking.</strong> Positions in classic results, and — increasingly — whether the assistants mention you.</li>
</ol>
<p>Write your current subscriptions next to this list. Anything that does not map to a job is a cancellation candidate.</p>

<h2>How we review tools here</h2>
<p>Every review on this site works the same way. We run the tool on live projects for at least a month, cross-check its numbers against Google Search Console and one other source, and report where it is accurate, where it inflates, and who it is actually built for. Affiliate links are disclosed and never change the verdict — if a tool is not worth it, we say so.</p>

<h2>How far you can get for free</h2>
<p>Further than most people admit:</p>
<ul>
  <li><strong>Measurement:</strong> Search Console and Analytics — free, and more accurate than any third-party estimate for your own site.</li>
  <li><strong>Technical:</strong> a free crawler handles a few hundred URLs without complaint.</li>
  <li><strong>Keywords:</strong> free tools give volume and difficulty that are directionally right — enough to prioritise.</li>
</ul>
<p>You start paying when you need scale and history: full backlink indexes, months of rank data, large-site crawls, content scoring. That is the moment one all-in-one platform earns its price.</p>

<h2>Three stacks, by budget</h2>
<h3>Solo — under $50 a month</h3>
<ul>
  <li>Search Console + Analytics (free)</li>
  <li>One entry-tier all-in-one for keywords, tracking and basic backlinks</li>
  <li>A free crawler for audits</li>
</ul>
<h3>Growing — $50 to $250 a month</h3>
<ul>
  <li>A full all-in-one on a plan that fits your keyword and project limits</li>
  <li>A dedicated content-optimisation tool if you publish weekly or more</li>
</ul>
<h3>Agency or in-house team</h3>
<ul>
  <li>All-in-one with extra seats</li>
  <li>A standalone crawler built for large sites</li>
  <li>An AI-visibility tracker as the assistants take more share</li>
</ul>

<div class="callout"><p><strong>Never buy annual on day one.</strong> Run the trial on a real project. If the data does not match Search Console within a sane margin, the discount does not matter.</p></div>

<h2>Before you enter a card number</h2>
<ul class="check-list">
  <li>You tested it on a real project, not a canned demo account</li>
  <li>Its data lines up with Search Console within a reasonable margin</li>
  <li>The plan's keyword, project and crawl limits match your actual usage — not the ceiling</li>
  <li>You are not already paying for another tool that does the same job</li>
  <li>Annual billing only after a month of real use</li>
</ul>
`,
    toolsHeading: "Free tools",
    tools: [
      {
        title: "SEO Audit Checker",
        description: "Check on-page signals and ranking factors",
        icon: "fa-solid fa-magnifying-glass-chart",
        href: "/resources",
      },
      {
        title: "Keyword Research Tool",
        description: "Volume, difficulty and intent for any keyword",
        icon: "fa-solid fa-chart-column",
        href: "/resources",
      },
      {
        title: "Backlink Checker",
        description: "Analyze backlink profiles and competitor links",
        icon: "fa-solid fa-link",
        href: "/resources",
      },
      {
        title: "AI Visibility Checker",
        description: "See if ChatGPT and Gemini recommend you",
        icon: "fa-solid fa-robot",
        href: "/resources",
      },
      {
        title: "Authority Score Checker",
        description: "Domain authority and link quality at a glance",
        icon: "fa-solid fa-star",
        href: "/resources",
      },
      {
        title: "Rank Tracker",
        description: "Monitor keyword rankings across search engines",
        icon: "fa-solid fa-arrow-trend-up",
        href: "/resources",
      },
    ],
  },
  {
    slug: "ai-optimization",
    category: "seo",
    name: "AI Search",
    title: "AI Search Optimization",
    eyebrow: "SEO Pillar",
    intro:
      "Getting your brand cited by ChatGPT, Perplexity and Google's AI answers. This is answer engine optimization (AEO) and generative engine optimization (GEO) — the layer sitting on top of classic SEO.",
    icon: "fa-solid fa-robot",
    color: "#5d2aad",
    colorSoft: "rgba(130, 86, 197, 0.16)",
    cardText:
      "AEO and GEO: earning citations from ChatGPT, Perplexity and Google's AI answers.",
    guidesHeading: "AI search guides",
    guideSlugs: [
      "best-ai-seo-tools",
      "best-ai-seo-agencies",
      "starter-seo-guide",
      "seo-case-study-on-forex-niche",
    ],
    bodyHtml: `
<p class="prose-lede">A user asks ChatGPT for the best tool in your category. Two things can happen: it names you, or it names a competitor. There is no page two to fall back to. That is the whole game.</p>

<h2>AEO, GEO, LLMO — and why the acronyms barely matter</h2>
<ul>
  <li><strong>AEO</strong> (Answer Engine Optimisation): structuring a page so an engine can lift a clean, correct answer from it.</li>
  <li><strong>GEO</strong> (Generative Engine Optimisation): earning visibility and citations inside AI-generated results, across platforms.</li>
  <li><strong>LLMO</strong> (Large Language Model Optimisation): shaping how models describe your brand and topic.</li>
</ul>
<p>They are the same work seen from three angles: be the clearest, most trustworthy, most quotable source a model can find on your topic.</p>

<h2>How the assistants actually choose sources</h2>
<p>Most consumer AI search does retrieval first: it runs a normal-ish search, pulls a handful of pages, and writes an answer from them. So the rules are less mystical than they sound:</p>
<ul>
  <li><strong>You still have to rank.</strong> No top-10 presence for the query, no place in the retrieval set, no citation. Classic SEO is the entry fee.</li>
  <li><strong>The answer has to be easy to lift.</strong> Models favour pages that state the point in the first sentence under a heading, not pages that bury it under 400 words of throat-clearing.</li>
  <li><strong>Consensus wins ties.</strong> If five trusted sources say the same thing and you are the sixth, you are more likely to be quoted than a lone contrarian.</li>
</ul>

<h2>Make your page quotable</h2>
<ul>
  <li>Answer the question in sentence one under each heading. Expand after.</li>
  <li>Phrase headings the way people ask — "How much does X cost?" not "Pricing".</li>
  <li>Put the facts in plain sentences and short lists. Anything locked inside an image or a sprawling table is invisible to the model.</li>
  <li>Add a two- or three-line summary near the top of long pages.</li>
  <li>Show the date, the sources, and who wrote it, so the model has something to verify against.</li>
</ul>

<h2>Become an entity, not just a website</h2>
<p>Models build a map of who is an authority on each topic from signals across the whole web. Strengthen your place on that map:</p>
<ul>
  <li>Describe your brand the same way everywhere — same name, same one-liner, same category.</li>
  <li>Earn mentions on sites the models already trust, even ones with no link.</li>
  <li>Keep any reference-site presence accurate — Wikipedia, Wikidata, Crunchbase, solid industry directories.</li>
  <li>Publish enough depth on your core topic that the association becomes automatic.</li>
</ul>

<div class="callout"><p><strong>AI visibility is downstream of SEO.</strong> The pages getting cited in AI answers are, overwhelmingly, the pages that already rank well and read clearly. Fix the fundamentals first.</p></div>

<h2>Measure it, because rank trackers will not</h2>
<ul>
  <li>Once a month, prompt ChatGPT, Gemini and Perplexity with your ten most important questions. Log whether you are named.</li>
  <li>Track branded and category prompts for the trend, not for a perfect score.</li>
  <li>Watch referral traffic from <code>chatgpt.com</code>, <code>perplexity.ai</code> and Google's AI surfaces in analytics.</li>
  <li>Add a dedicated AI-visibility tool once the channel is worth a line item.</li>
</ul>

<h2>AI search checklist</h2>
<ul class="check-list">
  <li>You rank on page one for the queries you want to be cited on</li>
  <li>Every section opens with a direct, self-contained answer</li>
  <li>Headings are phrased as real questions</li>
  <li>A short summary sits near the top of every long page</li>
  <li>Author, date and sources are visible on every article</li>
  <li>Your brand name and description are identical across the web</li>
  <li>AI citations and assistant referral traffic are checked monthly</li>
</ul>
`,
  },
];

export function getPillars(category?: string): Pillar[] {
  return category ? PILLARS.filter((p) => p.category === category) : PILLARS;
}

export function getPillar(category: string, slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.category === category && p.slug === slug);
}

/** slugs that must NOT be treated as post slugs under a category */
export function pillarSlugs(category: string): Set<string> {
  return new Set(getPillars(category).map((p) => p.slug));
}

export function pillarPath(pillar: Pillar): string {
  return `/${pillar.category}/${pillar.slug}`;
}
