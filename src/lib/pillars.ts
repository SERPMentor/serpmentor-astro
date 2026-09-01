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
      "Technical SEO is whether the car starts. Content and links are the engine. But if Google can't crawl, render and index your pages, none of it runs. Here's how to get the foundation right.",
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
<p>Most SEO tasks help one page. Technical SEO usually helps every page built on the same template, so fixing one thing can lift ten thousand URLs at once.</p>
<p>It also gates everything else. You can write the best guide on the internet, but if Googlebot cannot crawl it, render it, or tell it apart from three near-duplicates, it will not rank. Content and links are the engine. Technical SEO is whether the car starts.</p>

<h2>Crawl, render, index: where pages actually get stuck</h2>
<p>Every URL passes through the same three gates. Miss one and the rest never happen.</p>
<ol>
  <li><strong>Crawl.</strong> Googlebot finds the URL through a link or your sitemap and requests it. A <code>Disallow</code> in robots.txt, a page five clicks deep, or a run of 5xx errors, and it stops here.</li>
  <li><strong>Render.</strong> Google loads the page and runs its JavaScript to see the final HTML. If your main content or internal links only appear after a slow client-side fetch, expect them to be missed or seen late.</li>
  <li><strong>Index.</strong> Google decides whether the rendered page is worth storing. A stray <code>noindex</code>, a canonical pointing somewhere else, or content that looks like a copy of another page keeps it out.</li>
</ol>
<p>Run one of your money pages through the URL Inspection tool in Search Console right now. "Crawled, currently not indexed" and "Discovered, currently not indexed" are the two messages that quietly kill traffic, and almost nobody checks for them.</p>

<div class="callout"><p><strong>Pro tip:</strong> open Search Console's Pages report, filter to "Not indexed", and sort by impressions. Any URL with impressions that is not indexed is money on the table, usually a canonical or thin-content issue you can fix in an afternoon.</p></div>

<h2>Site architecture: the three-click rule still holds</h2>
<p>If an important page takes more than three clicks to reach from the homepage, users and crawlers both treat it as less important, because structurally, it is.</p>
<ul>
  <li><strong>Build topic clusters.</strong> One pillar page (like this one) links down to every supporting article, and each article links back up. Google reads that as "this site owns this topic".</li>
  <li><strong>Keep URLs boring.</strong> <code>/seo/tech</code> beats <code>/blog/2026/04/post-4471?ref=nav</code>. Short, lowercase, readable, no dates you will regret.</li>
  <li><strong>Flatten deep sections.</strong> Add hub pages and contextual links so nothing is buried behind pagination.</li>
  <li><strong>Trim the sitemap.</strong> It should list only canonical, indexable, 200-status URLs. No tag pages, no redirects, no <code>noindex</code> pages.</li>
</ul>

<h2>On-page SEO: the fundamentals that still move rankings</h2>

<h3>Title tags</h3>
<p>Google rewrites roughly a third of titles anyway, so write one it will not want to change: primary keyword near the front, a reason to click, under about 60 characters (or ~600 pixels) so it does not truncate. One title per page, one <code>H1</code> that matches it.</p>

<h3>Heading structure</h3>
<p><code>H2</code>s for sections, <code>H3</code>s for subpoints, in order, no skipped levels. This is not pedantry: a clean hierarchy is exactly what an AI answer engine needs to lift one self-contained section of your page as a citation.</p>

<h3>Internal links</h3>
<p>Internal links pass authority and context, and they are the one ranking lever you fully control. Link to a new page from your strongest existing pages on day one, use anchor text that describes the destination, and do it while you publish, not in a cleanup pass six months later that never happens.</p>

<h2>Core Web Vitals in 2026: INP replaced FID, and the targets now</h2>
<p>Interaction to Next Paint (INP) replaced First Input Delay as a Core Web Vital in March 2024. It measures how fast the page responds to every tap, click and key press across the whole visit, not just the first one. It is the metric most sites now fail.</p>

<figure class="chart">
  <figcaption>Core Web Vitals: the "good" threshold at the 75th percentile on mobile</figcaption>
  <div class="bars">
    <div class="bar"><span>LCP, loading</span><span class="bar-track"><span class="bar-fill" style="width:42%"></span></span><span class="bar-val">2.5 s or less</span></div>
    <div class="bar"><span>INP, responsiveness</span><span class="bar-track"><span class="bar-fill" style="width:33%"></span></span><span class="bar-val">200 ms or less</span></div>
    <div class="bar"><span>CLS, visual stability</span><span class="bar-track"><span class="bar-fill" style="width:20%"></span></span><span class="bar-val">0.1 or less</span></div>
  </div>
  <p class="chart-note">Bar lengths show the relative headroom you get, not a shared scale across units.</p>
</figure>

<figure>
  <table>
    <thead><tr><th>Metric</th><th>Most common cause</th><th>Fastest fix</th></tr></thead>
    <tbody>
      <tr><td>LCP</td><td>Large hero image or slow web font</td><td>Compress, serve AVIF or WebP, preload the LCP image, use <code>font-display: swap</code></td></tr>
      <tr><td>INP</td><td>Heavy JavaScript blocking the main thread</td><td>Break up long tasks, defer third-party scripts, delete unused code</td></tr>
      <tr><td>CLS</td><td>Images, ads or embeds with no reserved space</td><td>Set explicit width and height, reserve slots, never insert content above existing content</td></tr>
    </tbody>
  </table>
  <figcaption>The usual cause and the usual fix for each Core Web Vital.</figcaption>
</figure>

<div class="callout"><p><strong>Measure the field, not the lab.</strong> Lighthouse gives you a lab score in a clean room. Google ranks on field data from real Chrome users, the CrUX report in Search Console. A green Lighthouse score with red field data means real visitors are having a worse time than your test.</p></div>

<h2>Structured data strategy: which schema types are worth adding?</h2>
<p>Schema markup does not directly raise rankings. It makes a page eligible for rich results and gives search and AI systems a clean, machine-readable version of what the page says. Add the types that earn a visible result or feed an entity. Skip the rest.</p>

<figure>
  <table>
    <thead><tr><th>Schema type</th><th>What it can earn</th><th>Worth it for</th></tr></thead>
    <tbody>
      <tr><td><code>Organization</code> / <code>Person</code></td><td>Knowledge panel, entity connections</td><td>Every site, once, sitewide</td></tr>
      <tr><td><code>Article</code> / <code>BlogPosting</code></td><td>Author, date and headline in results and AI answers</td><td>Any blog or news content</td></tr>
      <tr><td><code>BreadcrumbList</code></td><td>Breadcrumb trail in the result</td><td>Any site with a hierarchy</td></tr>
      <tr><td><code>Product</code> + <code>AggregateRating</code></td><td>Price, stock and stars in results</td><td>E-commerce, only with real reviews</td></tr>
      <tr><td><code>FAQPage</code></td><td>Expandable Q&amp;A, now limited to some sites</td><td>Sparingly, only genuine FAQs</td></tr>
      <tr><td><code>LocalBusiness</code></td><td>Hours, area and contact in local results</td><td>Any business with a location</td></tr>
      <tr><td><code>VideoObject</code></td><td>Video thumbnail and key moments</td><td>Pages where video is the main content</td></tr>
    </tbody>
  </table>
  <figcaption>Schema types that still earn something visible, and who each one is for.</figcaption>
</figure>

<ul class="check-list">
  <li>Mark up only what is actually visible on the page; hidden or mismatched markup is a manual-action risk</li>
  <li>Use one consistent <code>@id</code> per entity and cross-reference nodes in a <code>@graph</code></li>
  <li>Validate with the Rich Results Test and watch the Enhancements reports in Search Console</li>
  <li>Do not chase deprecated rich results; check Google's current list before investing</li>
</ul>

<h2>Programmatic SEO: scaling pages without building doorway pages</h2>
<p>Programmatic SEO generates many similar pages from a database or template: one per city, product, integration, comparison or use case. It works when every page answers a real, distinct query with genuinely useful, mostly unique content. It fails, and gets filtered or penalised, when the pages are thin templates with a swapped noun.</p>

<figure class="chart">
  <figcaption>Programmatic pages: what Google keeps versus what it filters</figcaption>
  <div class="bars">
    <div class="bar"><span>Unique data per page</span><span class="bar-track"><span class="bar-fill" style="width:88%"></span></span><span class="bar-val">indexed</span></div>
    <div class="bar"><span>Real search demand per page</span><span class="bar-track"><span class="bar-fill" style="width:80%"></span></span><span class="bar-val">indexed</span></div>
    <div class="bar"><span>Template with minor swaps</span><span class="bar-track"><span class="bar-fill is-muted" style="width:22%"></span></span><span class="bar-val">filtered</span></div>
    <div class="bar"><span>No demand, no unique value</span><span class="bar-track"><span class="bar-fill is-muted" style="width:8%"></span></span><span class="bar-val">filtered</span></div>
  </div>
</figure>

<p>Before you generate a single page:</p>
<ul>
  <li><strong>Confirm the demand.</strong> If "[service] in [town]" has no searches for most towns, do not make a page for every town.</li>
  <li><strong>Find the unique value.</strong> Real listings, prices, data, photos, reviews. If you cannot fill the template with something specific, the page should not exist.</li>
  <li><strong>Stage the rollout.</strong> Publish a few hundred, check indexation and engagement, then scale. Do not drop fifty thousand URLs on day one.</li>
  <li><strong>Control index bloat.</strong> Keep thin variants out of the sitemap and <code>noindex</code> them where needed.</li>
</ul>

<h2>Technical SEO checklist</h2>
<ul class="check-list">
  <li>Every money page returns 200 and sits within three clicks of the homepage</li>
  <li>Search Console's "Not indexed" report has no URLs with real impressions</li>
  <li>One canonical version of the site: HTTPS, www / non-www resolved, no trailing-slash duplicates</li>
  <li>robots.txt blocks nothing you want indexed; sitemap lists only canonical 200s</li>
  <li>Schema in place where it applies: Article, FAQ, Product, Breadcrumb</li>
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
      "Links are still one of Google's strongest ranking signals. Here's how to earn authoritative backlinks, audit the ones you have, and find the gaps your competitors are exploiting.",
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
  <li><strong>Relevance.</strong> The linking page is about your topic. Not the site in general, the page.</li>
  <li><strong>Editorial.</strong> A person added it because it helped their reader, not because you paid or swapped.</li>
  <li><strong>Placement.</strong> In the body copy, near the top. Not a footer or a bio block stuffed with links.</li>
  <li><strong>Traffic.</strong> The page has real visitors who might actually click through.</li>
  <li><strong>Anchor text.</strong> It reads naturally. A profile where every link is exact-match anchor is a footprint, not a strategy.</li>
</ul>
<p>One link that clears all five beats fifty that clear none, and it carries none of the risk.</p>

<h2>Five tactics that still earn links in 2026</h2>
<ol>
  <li><strong>Original data.</strong> Run a survey, analyse a dataset, publish a benchmark. Writers need a statistic to cite, and a good one keeps earning links for years with zero extra outreach.</li>
  <li><strong>The upgrade play.</strong> Find a popular resource in your niche that has gone stale, build a genuinely better version, then email every site still linking to the old one. You are not asking a favour. You are pointing out a near-broken link.</li>
  <li><strong>Guest posts, narrow.</strong> Not "write for us" farms. A handful of real publications your buyers read, pitched an article you would be proud to put your name on.</li>
  <li><strong>Unlinked mentions.</strong> Search your brand name in quotes, minus your own domain. Anywhere you are named without a link is a 30-second email from becoming one.</li>
  <li><strong>Podcasts and journalist requests.</strong> The fastest links to land. One good answer to a source request or one podcast appearance usually comes with a contextual bio link.</li>
</ol>

<h2>Audit what you already have, every quarter</h2>
<p>Before you build anything new, look at the profile you own. A 30-minute audit answers three questions:</p>
<ul>
  <li><strong>What is working?</strong> Sort referring domains by the traffic and rankings they correlate with, and do more of whatever earned them.</li>
  <li><strong>What is toxic?</strong> Almost nothing. Google ignores most spam on its own. Disavow only deliberate manipulation, like a paid-link network or a negative-SEO blast, and even then, sparingly.</li>
  <li><strong>What did you lose?</strong> Links drop when pages get deleted or redesigned. A short "this moved" email or a 301 gets a lot of them back.</li>
</ul>

<h2>Steal your competitors' link sources</h2>
<p>A link gap analysis lists every domain linking to two or more competitors but not to you. Those sites have already decided they link to content like yours. They just have not found yours yet. Export the list, cut the irrelevant ones, sort by relevance and authority, and work top-down. It is the warmest prospect list you will ever build.</p>

<div class="callout"><p><strong>The one question that predicts link success:</strong> would this page have earned the link if you had never done outreach? If yes, outreach just speeds it up. If no, you are pushing water uphill.</p></div>

<h2>Links that are not worth the risk</h2>
<ul>
  <li>Paid placements that pass PageRank without <code>rel="sponsored"</code> or <code>nofollow</code>.</li>
  <li>Reciprocal schemes at scale: "I'll link you if you link me".</li>
  <li>Private blog networks. Google has spent a decade getting good at spotting them.</li>
  <li>Comment, forum and profile spam. Zero upside, real downside.</li>
</ul>

<h2>Digital PR: the link-building method that still scales in 2026</h2>
<p>Digital PR earns editorial links by giving journalists something worth writing about: original data, a survey, an expert reaction, a striking analysis. It is the highest-authority, lowest-risk link method left, because the links are a byproduct of genuine coverage.</p>

<p>The formats that reliably earn coverage:</p>
<ul>
  <li><strong>Original research.</strong> Survey your audience or analyse a public dataset. One good statistic gets cited for years.</li>
  <li><strong>Data journalism.</strong> Rank, map or index something people argue about: prices by city, salaries by role, "best places for X".</li>
  <li><strong>Newsjacking.</strong> A fast, quotable expert comment when a relevant story breaks.</li>
  <li><strong>Definitive free tools.</strong> A calculator or checker other sites link to as the reference.</li>
</ul>

<figure class="chart">
  <figcaption>Link methods by authority earned and risk carried</figcaption>
  <div class="bars">
    <div class="bar"><span>Digital PR and data</span><span class="bar-track"><span class="bar-fill" style="width:92%"></span></span><span class="bar-val">high value, low risk</span></div>
    <div class="bar"><span>Guest posts, selective</span><span class="bar-track"><span class="bar-fill" style="width:55%"></span></span><span class="bar-val">medium, medium</span></div>
    <div class="bar"><span>Niche edits and link inserts</span><span class="bar-track"><span class="bar-fill is-muted" style="width:35%"></span></span><span class="bar-val">low, rising risk</span></div>
    <div class="bar"><span>Link networks and PBNs</span><span class="bar-track"><span class="bar-fill is-muted" style="width:12%"></span></span><span class="bar-val">low, high risk</span></div>
  </div>
</figure>

<div class="callout"><p><strong>The test that predicts a campaign:</strong> would a journalist cover this if you removed the link entirely? If yes, the links will come. If no, you are doing outreach, not PR.</p></div>

<h2>Do backlinks still matter in the age of AI search?</h2>
<p>Yes. Links still correlate strongly with position in classic results, and they feed the authority and entity signals the AI assistants use when they choose which pages to retrieve and cite. What has changed is the mix: brand mentions, reviews and being a recognised entity now sit alongside links rather than beneath them.</p>

<figure>
  <table>
    <thead><tr><th>Signal</th><th>Classic rankings</th><th>AI Overviews and assistants</th></tr></thead>
    <tbody>
      <tr><td>Editorial backlinks</td><td>Strong, direct</td><td>Indirect, through authority and retrieval</td></tr>
      <tr><td>Brand mentions, unlinked</td><td>Minor</td><td>Meaningful; models read named entities</td></tr>
      <tr><td>Third-party reviews</td><td>Minor trust signal</td><td>Meaningful for "best" and comparison prompts</td></tr>
      <tr><td>Being in the top 10</td><td>Is the ranking</td><td>Near-prerequisite for a citation</td></tr>
    </tbody>
  </table>
  <figcaption>How each signal carries into classic results versus AI answers.</figcaption>
</figure>

<ul class="check-list">
  <li>Keep earning relevant, editorial links; they still move classic rankings</li>
  <li>Chase unlinked brand mentions on trusted sites, not just links</li>
  <li>Encourage genuine reviews where buyers and models look for them</li>
  <li>Make sure the pages you want cited already rank on page one</li>
</ul>

<h2>Link building checklist</h2>
<ul class="check-list">
  <li>One genuine linkable asset (data, tool or definitive guide) shipped per quarter</li>
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
      "Search is changing fast. Algorithm updates, E-E-A-T, and the shift from ten blue links to AI answers. Here's what actually matters, and what to do about it.",
    icon: "fa-solid fa-newspaper",
    color: "#8256c5",
    colorSoft: "rgba(130, 86, 197, 0.16)",
    cardText:
      "Algorithm updates, E-E-A-T guidance, and the move toward AI-generated answers.",
    guidesHeading: "Latest from the SEO desk",
    // empty → auto-fill with the most recent posts in the category
    guideSlugs: [],
    bodyHtml: `
<p class="prose-lede">Most SEO news does not matter. The trick is not reading more of it. It is knowing which slice changes what you do on Monday. Right now that slice all points the same direction: search is turning into an answer.</p>

<h2>How to read an algorithm update without panicking</h2>
<p>Google confirms a core update, SEO Twitter melts down, and half the advice that week is written by people watching a rank tracker refresh. Do this instead:</p>
<ul>
  <li><strong>Wait for the rollout to finish.</strong> Core updates take two to three weeks. Judging your traffic on day three is like weighing yourself after one meal.</li>
  <li><strong>Segment before you conclude.</strong> A drop concentrated in one folder or one query type is a specific, fixable problem. A smooth sitewide decline is usually a bigger, slower one.</li>
  <li><strong>Change nothing mid-rollout.</strong> Ship five fixes during the update and you will never know which one mattered, or whether it corrected on its own.</li>
</ul>
<p>Core updates rarely "penalise" a site. They re-score what Google already believed about quality across the whole index. Recovery means genuinely improving the pages that dropped, then waiting for the next update to re-evaluate them.</p>

<h2>Search is becoming an answer, and that changes the job</h2>
<p>AI Overviews, ChatGPT search, Perplexity, Google's AI Mode: different products, same behaviour. They read several pages and write one answer, and the user often never clicks. Three consequences you can plan around:</p>
<ul>
  <li><strong>Being cited now matters as much as ranking.</strong> A link inside the AI answer can send qualified traffic even from position eight.</li>
  <li><strong>Informational queries bleed clicks; commercial ones hold.</strong> "What is X" gets answered in place. "Best X for Y" and "X vs Y" still send people to pages, because buyers want to verify.</li>
  <li><strong>Brand recognition is a ranking factor now.</strong> Models lean toward names they already associate with a topic. Being a known entity is not vanity. It is retrieval.</li>
</ul>

<h2>E-E-A-T, translated into things you can actually do</h2>
<p>Experience, Expertise, Authoritativeness, Trust is not a dial you can turn. It is a set of signals raters look for and systems approximate. Make them obvious:</p>
<ul>
  <li>Real, named authors with a bio and a track record, not "Admin" or "Editorial Team".</li>
  <li>First-hand proof: your own screenshots, your own test results, your own numbers.</li>
  <li>Primary sources linked, statistics dated, claims you can stand behind.</li>
  <li>A findable business behind the site: an about page, real contact details, a stated editorial process.</li>
</ul>

<div class="callout"><p><strong>Keep a changelog.</strong> One shared doc: what you shipped, which pages, which date. When traffic moves, you will have cause and effect instead of a group chat full of guesses.</p></div>

<h2>What we're watching in 2026</h2>
<ul>
  <li>How far AI Overviews cut into informational traffic, and which content formats survive the cut.</li>
  <li>Whether <code>llms.txt</code> becomes a real standard or another <code>humans.txt</code>.</li>
  <li>Reddit, YouTube and other UGC platforms taking more of both classic and AI results.</li>
  <li>The SEO tool market consolidating hard around AI-visibility tracking.</li>
</ul>

<h2>Google algorithm updates: a short 2024 to 2026 timeline</h2>
<p>You do not need to memorise update names. You need the pattern: Google now ships large core updates several times a year, each rolling out over two to three weeks, each re-scoring quality across the whole index.</p>

<figure>
  <table>
    <thead><tr><th>Update</th><th>When</th><th>What it targeted</th></tr></thead>
    <tbody>
      <tr><td>March 2024 core and spam</td><td>Mar 2024</td><td>Scaled content abuse, expired-domain abuse, parasite SEO; a large reduction in low-quality content</td></tr>
      <tr><td>Aug, Nov, Dec 2024 core</td><td>2024</td><td>Rewarding smaller independent sites, adjusting earlier over-corrections</td></tr>
      <tr><td>March 2025 core</td><td>Mar 2025</td><td>Continued quality re-scoring; helpful-content signals folded into core</td></tr>
      <tr><td>June to Nov 2025 core</td><td>2025</td><td>Ongoing, with visible volatility for review and affiliate content</td></tr>
      <tr><td>2026 core updates</td><td>ongoing</td><td>Same direction: originality, first-hand experience, brand trust</td></tr>
    </tbody>
  </table>
  <figcaption>The recent core updates and the through-line connecting them.</figcaption>
</figure>

<div class="callout"><p><strong>The recovery playbook has not changed:</strong> wait for the rollout to finish, segment the drop by folder and query type, genuinely improve the pages that fell, then wait for the next core update to re-evaluate them. There is no button.</p></div>

<h2>Zero-click search: how much traffic is really disappearing?</h2>
<p>A zero-click search ends without the user visiting any website, because the answer is on the results page: an AI Overview, a featured snippet, a knowledge panel or the map pack. The share has climbed, but it is uneven, and commercial intent is largely intact.</p>

<figure class="chart">
  <figcaption>Click outcome by query intent (directional, 2026)</figcaption>
  <div class="bars">
    <div class="bar"><span>Simple informational</span><span class="bar-track"><span class="bar-fill is-muted" style="width:70%"></span></span><span class="bar-val">~70% no click</span></div>
    <div class="bar"><span>How-to and research</span><span class="bar-track"><span class="bar-fill" style="width:45%"></span></span><span class="bar-val">~45% click</span></div>
    <div class="bar"><span>Commercial, "best X"</span><span class="bar-track"><span class="bar-fill" style="width:72%"></span></span><span class="bar-val">~72% click</span></div>
    <div class="bar"><span>Transactional and local</span><span class="bar-track"><span class="bar-fill" style="width:80%"></span></span><span class="bar-val">~80% click</span></div>
  </div>
  <p class="chart-note">Figures vary by study and industry. The pattern is stable: the closer to a purchase, the more the click survives.</p>
</figure>

<p>What to do about it:</p>
<ul>
  <li>Shift the content mix toward comparison, "best", "vs" and pricing content, which still earns the visit</li>
  <li>Treat AI Overview and snippet citations as a branding channel, and measure assistant referral traffic</li>
  <li>Build direct channels, email and community, so you are not fully dependent on the click</li>
  <li>Report impressions and citations next to clicks, so a summarised page does not read as a failure</li>
</ul>

<h2>Content decay: why traffic falls, and the refresh cadence that fixes it</h2>
<p>Content decay is the slow decline in traffic to a page that once ranked, as competitors update, intent drifts and the information ages. It is normal. On most established sites, a planned refresh programme recovers more traffic than new publishing does.</p>

<figure class="chart">
  <figcaption>Typical organic traffic curve for an un-maintained article</figcaption>
  <div class="bars">
    <div class="bar"><span>Month 0 to 6</span><span class="bar-track"><span class="bar-fill" style="width:55%"></span></span><span class="bar-val">ramp up</span></div>
    <div class="bar"><span>Month 6 to 14</span><span class="bar-track"><span class="bar-fill" style="width:92%"></span></span><span class="bar-val">peak</span></div>
    <div class="bar"><span>Month 15 to 24</span><span class="bar-track"><span class="bar-fill is-muted" style="width:58%"></span></span><span class="bar-val">decay</span></div>
    <div class="bar"><span>Month 24 and on</span><span class="bar-track"><span class="bar-fill is-muted" style="width:34%"></span></span><span class="bar-val">long tail</span></div>
  </div>
</figure>

<p>A simple quarterly routine:</p>
<ol>
  <li>In Search Console, compare the last three months to the previous three. List pages down more than 20%.</li>
  <li>For each, check what now ranks above you and what changed. Update the facts, add what is missing, sharpen the intro, refresh examples and the date.</li>
  <li>Re-submit the URL and add one or two fresh internal links from strong pages.</li>
  <li>Retire or merge pages that have lost their query entirely, with a 301 to the closest match.</li>
</ol>

<h2>E-E-A-T in 2026: which trust signals correlate with rankings?</h2>
<p>E-E-A-T, for Experience, Expertise, Authoritativeness and Trust, is not a score in the algorithm. It is a framework Google's raters use and its systems approximate. After the 2024 and 2025 updates, the signals that consistently line up with recovery and resilience are concrete.</p>

<figure>
  <table>
    <thead><tr><th>Signal</th><th>Weak version</th><th>Strong version</th></tr></thead>
    <tbody>
      <tr><td>Authorship</td><td>"Admin" or "Editorial Team"</td><td>Named author, real bio, credentials, track record</td></tr>
      <tr><td>Experience</td><td>Rewritten from other articles</td><td>First-hand tests, own screenshots, own data</td></tr>
      <tr><td>Sourcing</td><td>Vague claims, no links</td><td>Primary sources linked, statistics dated</td></tr>
      <tr><td>Business identity</td><td>No about or contact page</td><td>Full about page, real contact details, editorial policy</td></tr>
      <tr><td>Reputation</td><td>No third-party presence</td><td>Reviews, mentions and citations on trusted sites</td></tr>
    </tbody>
  </table>
  <figcaption>The gap between a weak and a strong trust signal, in practice.</figcaption>
</figure>

<ul class="check-list">
  <li>Every article has a real, named author with a linked bio</li>
  <li>Money and YMYL pages show a reviewer or editor and a last-updated date</li>
  <li>Claims link to primary sources; statistics carry a date</li>
  <li>The site has an about page, contact details and a stated editorial process</li>
  <li>Your brand is mentioned and reviewed on sites your audience already trusts</li>
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
      "The SEO and AI tools our team actually uses on client work, plus honest reviews of the big platforms and free checkers you can run right now.",
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
<p class="prose-lede">The average SEO team pays for four tools and actively uses maybe 30% of two of them. You do not need a bigger stack. You need four jobs covered, plus the discipline to cancel anything that does not do one of them.</p>

<h2>The four jobs your stack has to cover</h2>
<ol>
  <li><strong>Keyword and topic research.</strong> What people search, how hard it is to rank, and the intent behind the query.</li>
  <li><strong>Technical crawling.</strong> Broken links, redirect chains, orphan pages, indexation gaps, Core Web Vitals.</li>
  <li><strong>Content optimisation.</strong> What the pages already ranking cover that your draft does not.</li>
  <li><strong>Rank and AI-visibility tracking.</strong> Positions in classic results, and increasingly, whether the assistants mention you.</li>
</ol>
<p>Write your current subscriptions next to this list. Anything that does not map to a job is a cancellation candidate.</p>

<h2>How we review tools here</h2>
<p>Every review on this site works the same way. We run the tool on live projects for at least a month, cross-check its numbers against Google Search Console and one other source, and report where it is accurate, where it inflates, and who it is actually built for. Affiliate links are disclosed and never change the verdict. If a tool is not worth it, we say so.</p>

<h2>How far you can get for free</h2>
<p>Further than most people admit:</p>
<ul>
  <li><strong>Measurement:</strong> Search Console and Analytics are free, and more accurate than any third-party estimate for your own site.</li>
  <li><strong>Technical:</strong> a free crawler handles a few hundred URLs without complaint.</li>
  <li><strong>Keywords:</strong> free tools give volume and difficulty that are directionally right, which is enough to prioritise.</li>
</ul>
<p>You start paying when you need scale and history: full backlink indexes, months of rank data, large-site crawls, content scoring. That is the moment one all-in-one platform earns its price.</p>

<h2>Three stacks, by budget</h2>
<h3>Solo: under $50 a month</h3>
<ul>
  <li>Search Console + Analytics (free)</li>
  <li>One entry-tier all-in-one for keywords, tracking and basic backlinks</li>
  <li>A free crawler for audits</li>
</ul>
<h3>Growing: $50 to $250 a month</h3>
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

<h2>The 2026 SEO stack: where AI-visibility tracking fits</h2>
<p>The classic four jobs, keywords, crawling, content and rank tracking, have not gone away. A fifth has been added: tracking whether the AI assistants mention you, and for which prompts. Most all-in-one platforms now bundle a basic version; dedicated tools go deeper.</p>

<figure>
  <table>
    <thead><tr><th>Job</th><th>What it answers</th><th>Tool category</th></tr></thead>
    <tbody>
      <tr><td>Keyword and topic research</td><td>What people search, how hard, what intent</td><td>All-in-one platform, free keyword tools</td></tr>
      <tr><td>Technical crawling</td><td>Broken links, indexation, Core Web Vitals</td><td>Dedicated crawler, Search Console</td></tr>
      <tr><td>Content optimisation</td><td>What ranking pages cover that your draft misses</td><td>Content-scoring tool</td></tr>
      <tr><td>Rank tracking</td><td>Position in classic results over time</td><td>All-in-one or standalone tracker</td></tr>
      <tr><td>AI-visibility tracking</td><td>Are ChatGPT, Gemini and Perplexity naming you, for which prompts</td><td>AI-visibility tracker, a new category</td></tr>
    </tbody>
  </table>
  <figcaption>The five jobs a modern SEO stack has to cover, and where each one lives.</figcaption>
</figure>

<figure class="chart">
  <figcaption>When to add a paid AI-visibility tool</figcaption>
  <div class="bars">
    <div class="bar"><span>Assistant referral traffic in analytics</span><span class="bar-track"><span class="bar-fill" style="width:80%"></span></span><span class="bar-val">add it</span></div>
    <div class="bar"><span>Buyers say "I found you via ChatGPT"</span><span class="bar-track"><span class="bar-fill" style="width:74%"></span></span><span class="bar-val">add it</span></div>
    <div class="bar"><span>No sign of AI traffic yet</span><span class="bar-track"><span class="bar-fill is-muted" style="width:26%"></span></span><span class="bar-val">manual checks are enough</span></div>
  </div>
  <p class="chart-note">Until then, a monthly manual prompt log across the three main assistants does the job for free.</p>
</figure>

<div class="callout"><p><strong>Start manual.</strong> Once a month, run your ten most important prompts through ChatGPT, Gemini and Perplexity and record whether you are named. Only pay for a tool once that log shows a trend worth managing.</p></div>

<h2>Before you enter a card number</h2>
<ul class="check-list">
  <li>You tested it on a real project, not a canned demo account</li>
  <li>Its data lines up with Search Console within a reasonable margin</li>
  <li>The plan's keyword, project and crawl limits match your actual usage, not the ceiling</li>
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
      "Classic SEO gets you into Google. This gets you cited by ChatGPT, Perplexity and Google's AI answers. It's called AEO and GEO, the new layer sitting on top of everything you already do.",
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

<h2>AEO, GEO, LLMO, and why the acronyms barely matter</h2>
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
  <li>Phrase headings the way people ask. "How much does X cost?" beats "Pricing".</li>
  <li>Put the facts in plain sentences and short lists. Anything locked inside an image or a sprawling table is invisible to the model.</li>
  <li>Add a two- or three-line summary near the top of long pages.</li>
  <li>Show the date, the sources, and who wrote it, so the model has something to verify against.</li>
</ul>

<h2>Become an entity, not just a website</h2>
<p>Models build a map of who is an authority on each topic from signals across the whole web. Strengthen your place on that map:</p>
<ul>
  <li>Describe your brand the same way everywhere: same name, same one-liner, same category.</li>
  <li>Earn mentions on sites the models already trust, even ones with no link.</li>
  <li>Keep any reference-site presence accurate: Wikipedia, Wikidata, Crunchbase, solid industry directories.</li>
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

<h2>What are AI Overviews, and how do you earn a place in them?</h2>
<p>AI Overviews are the AI-generated answer block Google shows above the classic results. Google pulls from a handful of pages, writes a summary, and cites those pages with links. You earn a spot by ranking in the top results for the query and by making one section of your page trivially easy to quote.</p>

<figure class="chart">
  <figcaption>Where AI Overview citations come from</figcaption>
  <div class="bars">
    <div class="bar"><span>Pages in the top 10 organic</span><span class="bar-track"><span class="bar-fill" style="width:86%"></span></span><span class="bar-val">~86%</span></div>
    <div class="bar"><span>Position 11 to 20</span><span class="bar-track"><span class="bar-fill is-muted" style="width:10%"></span></span><span class="bar-val">~10%</span></div>
    <div class="bar"><span>Outside the top 20</span><span class="bar-track"><span class="bar-fill is-muted" style="width:4%"></span></span><span class="bar-val">~4%</span></div>
  </div>
  <p class="chart-note">Directional, from public citation studies through 2026. The takeaway is blunt: page-one rankings are the entry fee.</p>
</figure>

<p>What consistently gets a page cited:</p>
<ul>
  <li>A direct answer in the first sentence or two under a clear heading</li>
  <li>Headings phrased as the question a real person would ask</li>
  <li>Facts in plain text and short lists, not trapped inside an image or a sprawling table</li>
  <li>A visible author, date and linked sources, so the claim can be verified</li>
</ul>

<figure>
  <table>
    <thead><tr><th>Query type</th><th>Example</th><th>AI Overview behaviour</th><th>What to do</th></tr></thead>
    <tbody>
      <tr><td>Simple factual</td><td>"what is a canonical tag"</td><td>Answered in place, low click-through</td><td>Own it for brand and citation, do not expect the click</td></tr>
      <tr><td>How-to</td><td>"how to submit a sitemap"</td><td>Overview plus steps, moderate clicks</td><td>Number the steps, answer-first on each one</td></tr>
      <tr><td>Commercial research</td><td>"best crm for small business"</td><td>Overview lists options, high click-through</td><td>Comparison tables, honest pros and cons, pricing</td></tr>
      <tr><td>Local or transactional</td><td>"plumber near me"</td><td>Usually no Overview, map pack instead</td><td>Focus on Business Profile and local pages</td></tr>
    </tbody>
  </table>
  <figcaption>How AI Overviews treat different query types, and where the click survives.</figcaption>
</figure>

<div class="callout"><p><strong>Track it:</strong> in Search Console, a page that holds its impressions but loses clicks after an update is usually being summarised in an AI Overview. That is your signal to push the page toward commercial and comparison intent, which still earns the visit.</p></div>

<h2>Generative Engine Optimization (GEO): the moves that shift AI citations</h2>
<p>GEO is optimising to be named and cited inside AI-generated answers across Google's AI surfaces, ChatGPT, Perplexity, Gemini and Copilot. It builds on classic SEO rather than replacing it: the assistants retrieve from search, so you have to be retrievable first, then quotable, then trusted.</p>

<figure class="chart">
  <figcaption>GEO tactics ranked by observed impact on citation frequency</figcaption>
  <div class="bars">
    <div class="bar"><span>Cite statistics and sources</span><span class="bar-track"><span class="bar-fill" style="width:90%"></span></span><span class="bar-val">high</span></div>
    <div class="bar"><span>Quotable, answer-first structure</span><span class="bar-track"><span class="bar-fill" style="width:82%"></span></span><span class="bar-val">high</span></div>
    <div class="bar"><span>Third-party mentions and reviews</span><span class="bar-track"><span class="bar-fill" style="width:74%"></span></span><span class="bar-val">high</span></div>
    <div class="bar"><span>Consistent entity and brand data</span><span class="bar-track"><span class="bar-fill" style="width:58%"></span></span><span class="bar-val">medium</span></div>
    <div class="bar"><span>Keyword-density tweaks</span><span class="bar-track"><span class="bar-fill is-muted" style="width:18%"></span></span><span class="bar-val">low</span></div>
  </div>
  <p class="chart-note">Based on the GEO research literature and our own monthly prompt testing through 2026.</p>
</figure>

<p>A monthly GEO routine that works:</p>
<ol>
  <li>Pick ten prompts a buyer would actually type. Run them in ChatGPT, Gemini and Perplexity. Log whether you are named and who is named instead.</li>
  <li>Read the pages that got cited. Match their clarity, then add what they lack: fresher data, a cleaner table, a real example.</li>
  <li>Chase one or two third-party mentions on sites the models already quote in your space.</li>
  <li>Re-run the prompts next month. Watch the trend, not any single answer.</li>
</ol>

<h2>Should you add an llms.txt file, and how do you handle AI crawlers?</h2>
<p><code>llms.txt</code> is a proposed file at your domain root that points AI tools to your most important content in clean Markdown. It is not an official standard and no major model is confirmed to use it for ranking, so treat it as cheap housekeeping, not a growth lever. The AI-crawler access decisions matter far more.</p>

<figure>
  <table>
    <thead><tr><th>Bot</th><th>Purpose</th><th>Common choice</th></tr></thead>
    <tbody>
      <tr><td><code>Googlebot</code></td><td>Search and AI Overviews</td><td>Always allow. Blocking it removes you from Google</td></tr>
      <tr><td><code>Google-Extended</code></td><td>Gemini grounding and training</td><td>Allow for AI visibility; block only to opt out of training</td></tr>
      <tr><td><code>GPTBot</code></td><td>OpenAI training and browsing</td><td>Allow for ChatGPT search visibility</td></tr>
      <tr><td><code>OAI-SearchBot</code></td><td>ChatGPT search index</td><td>Allow to appear in ChatGPT answers</td></tr>
      <tr><td><code>PerplexityBot</code></td><td>Perplexity index</td><td>Allow for Perplexity citations</td></tr>
      <tr><td><code>CCBot</code></td><td>Common Crawl open dataset</td><td>Your call; blocking has little SEO cost</td></tr>
    </tbody>
  </table>
  <figcaption>The AI crawlers worth a deliberate decision in robots.txt.</figcaption>
</figure>

<div class="callout"><p><strong>Common mistake:</strong> blocking <code>Google-Extended</code> or <code>GPTBot</code> "to protect content", then wondering why the brand never shows up in AI answers. If AI visibility is a goal, those bots need read access to the pages you want cited.</p></div>

<h2>Entity SEO: becoming something Google and LLMs actually recognise</h2>
<p>An entity is a thing the search and language models hold in their knowledge graph: a person, a company, a product, a concept, with attributes and relationships. Rankings and AI citations both lean on entities now, because models retrieve and reason about things, not strings of characters. Topical authority is the same idea from the content side: publish enough depth on one topic that the association becomes automatic.</p>

<p>How to strengthen your entity:</p>
<ul>
  <li><strong>Say the same thing everywhere.</strong> One brand name, one one-line description, one primary category, on your site, your profiles and every directory.</li>
  <li><strong>Mark it up.</strong> <code>Organization</code> and <code>Person</code> schema with <code>sameAs</code> links to your verified profiles, so Google can connect the dots.</li>
  <li><strong>Get into reference sources.</strong> Accurate Wikidata, Crunchbase and solid industry directory entries. Wikipedia only if you genuinely meet notability.</li>
  <li><strong>Build the topic cluster.</strong> A pillar page plus supporting articles that link to each other and cover the topic end to end.</li>
</ul>

<figure class="chart">
  <figcaption>What builds topical authority (relative weight)</figcaption>
  <div class="bars">
    <div class="bar"><span>Depth of coverage</span><span class="bar-track"><span class="bar-fill" style="width:85%"></span></span><span class="bar-val"></span></div>
    <div class="bar"><span>Internal link structure</span><span class="bar-track"><span class="bar-fill" style="width:70%"></span></span><span class="bar-val"></span></div>
    <div class="bar"><span>External citations on the topic</span><span class="bar-track"><span class="bar-fill" style="width:64%"></span></span><span class="bar-val"></span></div>
    <div class="bar"><span>Consistent entity data</span><span class="bar-track"><span class="bar-fill" style="width:54%"></span></span><span class="bar-val"></span></div>
  </div>
</figure>

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
