/**
 * Hand-authored rewrites of the WordPress blog posts, in Backlinko's tone:
 * short sentences, one-line paragraphs, direct "you", contractions, bucket
 * brigades where they earn their place, concrete over abstract, no em dashes.
 *
 * Keyed by the post's WordPress slug. When a slug appears here,
 * `src/components/PostArticle.astro` renders this `bodyHtml` instead of the
 * live WordPress content (and uses `title` / `metaTitle` / `metaDescription` /
 * `updated` / `faqs` when set). Metadata not set here (author, featured image,
 * publish date, category) still comes from WordPress, so the owner keeps
 * controlling those from the CMS.
 *
 * `bodyHtml` is trusted HTML: <h2>/<h3>, <p>, <ul>/<ol>,
 * <ul class="check-list">, <div class="callout">, <div class="expert-tip">,
 * <div class="case-study">, <figure> tables and <figure class="chart"> bar
 * charts, <div class="stat-grid"> (see the prose helpers in global.css).
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
  /** the rewrite */
  bodyHtml: string;
  /** optional FAQ block -> FAQPage schema + on-page accordion */
  faqs?: BlogFaq[];
}

const UPDATED = "September 2026";

export const BLOG_CONTENT: Record<string, BlogRewrite> = {
  // ================================================================
  "technical-seo": {
    title: "Technical SEO: The Complete Guide",
    metaTitle: "Technical SEO Guide (2026): Fix It and Rank | SERP Mentor",
    metaDescription:
      "Technical SEO decides whether Google can crawl, render and index your pages. Here is the checklist, the common failures, and how to audit your site.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">Here is the uncomfortable truth about technical SEO. Nobody notices when it is done well. They notice when a botched migration wipes out six months of rankings overnight. This guide is about staying in the first group.</p>

<h2>What is technical SEO?</h2>
<p>Technical SEO is the work that lets search engines crawl, render, index and trust your site. Content and links are the engine. Technical SEO is whether the car starts.</p>
<p>Get it right and you rarely think about it. Get it wrong and your best content never ranks, because Googlebot cannot reach it, cannot render it, or cannot tell it apart from three near-duplicates.</p>

<h2>Why it is the highest-leverage work you can do</h2>
<p>Most SEO tasks help one page. Technical SEO usually helps every page built on the same template. Fix one thing and you can lift ten thousand URLs at once.</p>
<p>It also gates everything else. There is no point publishing a brilliant guide if a stray <code>noindex</code> keeps it out of the index.</p>

<h2>Crawl, render, index: the three gates</h2>
<p>Every URL passes through the same three checkpoints. Miss one and the rest never happen.</p>
<figure>
  <table>
    <thead><tr><th>Gate</th><th>What happens</th><th>What stops it</th></tr></thead>
    <tbody>
      <tr><td>Crawl</td><td>Googlebot finds and requests the URL</td><td>A robots.txt <code>Disallow</code>, a page five clicks deep, a run of 5xx errors</td></tr>
      <tr><td>Render</td><td>Google loads the page and runs its JavaScript</td><td>Main content or links that only appear after a slow client-side fetch</td></tr>
      <tr><td>Index</td><td>Google decides the page is worth storing</td><td>A <code>noindex</code>, a canonical pointing elsewhere, content that looks like a copy</td></tr>
    </tbody>
  </table>
  <figcaption>Run a money page through the URL Inspection tool in Search Console. "Crawled, currently not indexed" is the message that quietly kills traffic.</figcaption>
</figure>

<div class="callout"><p><strong>Pro tip:</strong> open Search Console's Pages report, filter to "Not indexed", and sort by impressions. Any URL with impressions that is not indexed is money on the table, usually a canonical or thin-content issue you can fix in an afternoon.</p></div>

<h2>Site architecture: the three-click rule still holds</h2>
<p>If an important page takes more than three clicks to reach from the homepage, users and crawlers both treat it as less important. Structurally, it is.</p>
<ul>
  <li><strong>Build topic clusters.</strong> A pillar page links down to every supporting article, and each article links back up. Google reads that as "this site owns this topic".</li>
  <li><strong>Keep URLs boring.</strong> <code>/seo/technical-seo</code> beats <code>/blog/2026/04/post-4471?ref=nav</code>.</li>
  <li><strong>Flatten deep sections.</strong> Add hub pages so nothing is buried behind pagination.</li>
  <li><strong>Trim the sitemap.</strong> It should list only canonical, indexable, 200-status URLs.</li>
</ul>

<h2>Core Web Vitals without the rabbit hole</h2>
<p>Three metrics, three targets, measured on real mobile visitors:</p>
<figure class="chart">
  <figcaption>The "good" threshold at the 75th percentile, mobile</figcaption>
  <div class="bars">
    <div class="bar"><span>LCP, loading</span><span class="bar-track"><span class="bar-fill" style="width:42%"></span></span><span class="bar-val">2.5 s or less</span></div>
    <div class="bar"><span>INP, responsiveness</span><span class="bar-track"><span class="bar-fill" style="width:33%"></span></span><span class="bar-val">200 ms or less</span></div>
    <div class="bar"><span>CLS, stability</span><span class="bar-track"><span class="bar-fill" style="width:20%"></span></span><span class="bar-val">0.1 or less</span></div>
  </div>
</figure>
<p>The quick wins are almost always the same. Compress and lazy-load images. Serve WebP or AVIF. Set width and height on media. Delete third-party scripts nobody remembers adding.</p>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>HM Towhidul Islam</strong> <span>&middot; Senior Technical SEO Lead</span></p>
  <p>On every audit, the first place I look is the "Not indexed" report, sorted by impressions. It tells you exactly where Google is already interested but something is blocking it. That is your fastest win, every time.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>An e-commerce site with 40,000 URLs</h4>
  <p>Only 9,000 pages were indexed. The crawl was being eaten by faceted-navigation URLs and session parameters. We canonicalised the facets, blocked the parameter crawl, and cleaned the sitemap to real product and category pages.</p>
  <p class="case-study-result">Indexed pages rose to 22,000 in six weeks and organic sessions grew 34% as Google re-allocated crawl budget to pages that convert.</p>
</div>

<h2>Technical SEO audit checklist</h2>
<ul class="check-list">
  <li>Every money page returns 200 and sits within three clicks of the homepage</li>
  <li>Search Console's "Not indexed" report has no URLs with real impressions</li>
  <li>One canonical version of the site: HTTPS, www or non-www resolved, no trailing-slash duplicates</li>
  <li>robots.txt blocks nothing you want indexed; the sitemap lists only canonical 200s</li>
  <li>Schema in place where it applies: Article, FAQ, Product, Breadcrumb</li>
  <li>LCP under 2.5s, INP under 200ms, CLS under 0.1 on mobile</li>
  <li>Redirect chains collapsed to one hop; no internal links pointing at redirects</li>
</ul>
`,
    faqs: [
      {
        q: "How often should I run a technical SEO audit?",
        a: "A full audit once or twice a year, plus a quick monthly check of Search Console's Pages report and Core Web Vitals. Run a full audit any time you migrate, redesign or change your CMS.",
      },
      {
        q: "Do I need a developer for technical SEO?",
        a: "For diagnosis, no. Search Console, a free crawler and PageSpeed Insights get you most of the way. For fixes like redirect maps, rendering issues and Core Web Vitals, a developer usually needs to ship the change.",
      },
      {
        q: "Is technical SEO a one-time job?",
        a: "No. Sites drift: new templates add bloat, plugins add scripts, content gets orphaned. Treat it as ongoing maintenance with a light monthly check and a deeper review each quarter.",
      },
    ],
  },

  // ================================================================
  "seo-crawling-indexing-and-ranking": {
    title: "How Search Engines Work: Crawling, Indexing and Ranking",
    metaTitle: "How Search Engines Work: Crawl, Index, Rank | SERP Mentor",
    metaDescription:
      "Crawling, indexing and ranking explained without the jargon, plus the crawl-budget, canonical and Search Console checks that keep your pages visible.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">Most SEO advice skips the part where you understand what actually happens when Google meets your page. That is a mistake. Once you can picture the pipeline, half of SEO stops being guesswork.</p>

<h2>The three stages, in plain terms</h2>
<ol>
  <li><strong>Crawling.</strong> Googlebot follows links and sitemaps to discover URLs, then downloads them.</li>
  <li><strong>Indexing.</strong> Google processes each page, works out what it is about, picks a canonical version, and stores it.</li>
  <li><strong>Ranking.</strong> When someone searches, Google pulls matching pages from the index and orders them.</li>
</ol>
<p>A page can fail at any stage. Knowing which stage tells you what to fix.</p>

<h2>Crawl budget: does it apply to you?</h2>
<p>Crawl budget is how many URLs Google will fetch from your site in a given window. For sites under a few thousand pages, it is rarely a problem. For large sites, it is central.</p>
<figure>
  <table>
    <thead><tr><th>Wastes crawl budget</th><th>Protects it</th></tr></thead>
    <tbody>
      <tr><td>Faceted-navigation and filter URLs</td><td>Canonical tags and parameter handling</td></tr>
      <tr><td>Infinite calendars, session IDs</td><td><code>noindex</code> or robots.txt on low-value paths</td></tr>
      <tr><td>Redirect chains and soft 404s</td><td>Single-hop redirects, real 404s</td></tr>
      <tr><td>A sitemap full of non-canonical URLs</td><td>A sitemap of canonical 200s only</td></tr>
    </tbody>
  </table>
</figure>

<h2>Canonicalisation: telling Google which version counts</h2>
<p>When several URLs show similar content, Google picks one to index and treats it as the canonical. You want to make that choice, not leave it to Google.</p>
<ul>
  <li>Add a self-referencing <code>rel="canonical"</code> on every page.</li>
  <li>Point variant URLs (tracking parameters, print versions) at the clean version.</li>
  <li>Keep internal links, the sitemap and the canonical all pointing at the same URL. Mixed signals confuse the pick.</li>
</ul>

<div class="callout"><p><strong>Watch for this:</strong> "Duplicate, Google chose different canonical than user" in Search Console means Google overruled your canonical. Usually the "chosen" page has more internal links or better content. Fix the weaker page or consolidate.</p></div>

<h2>What actually drives ranking</h2>
<p>Google uses hundreds of signals, but they cluster into a handful that matter:</p>
<figure class="chart">
  <figcaption>The signal groups that move rankings, by weight</figcaption>
  <div class="bars">
    <div class="bar"><span>Relevance to the query</span><span class="bar-track"><span class="bar-fill" style="width:90%"></span></span><span class="bar-val"></span></div>
    <div class="bar"><span>Content quality and depth</span><span class="bar-track"><span class="bar-fill" style="width:78%"></span></span><span class="bar-val"></span></div>
    <div class="bar"><span>Links and authority</span><span class="bar-track"><span class="bar-fill" style="width:70%"></span></span><span class="bar-val"></span></div>
    <div class="bar"><span>Experience signals (speed, stability)</span><span class="bar-track"><span class="bar-fill" style="width:45%"></span></span><span class="bar-val"></span></div>
    <div class="bar"><span>Freshness (query-dependent)</span><span class="bar-track"><span class="bar-fill is-muted" style="width:30%"></span></span><span class="bar-val"></span></div>
  </div>
  <p class="chart-note">Directional. Weighting shifts by query type: news rewards freshness, "best" queries reward depth and links.</p>
</figure>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>MD Saiful Islam</strong> <span>&middot; Founder &amp; Head of SEO</span></p>
  <p>When a page will not rank, do not start with links. Open Search Console, check it is indexed with the canonical you want, then check it matches the format of the pages already ranking. Nine times out of ten the problem is there.</p>
</div>

<h2>Your monitoring toolkit</h2>
<ul class="check-list">
  <li>Search Console Pages report checked monthly for indexation drops</li>
  <li>URL Inspection run on any important page that is not getting traffic</li>
  <li>Sitemap submitted and showing mostly "Indexed" status</li>
  <li>Coverage of "Crawled, not indexed" and "Discovered, not indexed" kept near zero for pages with impressions</li>
  <li>Core Web Vitals report green on mobile</li>
</ul>
`,
    faqs: [
      {
        q: "How long does it take Google to index a new page?",
        a: "Anywhere from a few hours to a few weeks. A strong internal link from an already-indexed page and a sitemap submission speed it up. Requesting indexing in Search Console helps for one-off pages.",
      },
      {
        q: "What is the difference between 'crawled, not indexed' and 'discovered, not indexed'?",
        a: "'Discovered' means Google knows the URL exists but has not crawled it yet, often a crawl-budget or priority issue. 'Crawled, not indexed' means Google fetched it and decided it was not worth storing, usually a quality or duplication issue.",
      },
      {
        q: "Do I need an XML sitemap if my site is small?",
        a: "It still helps Google discover pages faster and understand your canonical set. Keep it to canonical, indexable 200-status URLs and let your CMS generate it.",
      },
    ],
  },

  // ================================================================
  "starter-seo-guide": {
    title: "SEO Basics: A Beginner's Guide for 2026",
    metaTitle: "SEO Basics: A Simple Beginner's Guide (2026) | SERP Mentor",
    metaDescription:
      "New to SEO? This is the plain-English starting point: how search works, the three types of SEO, search intent, and your first month of work.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">SEO looks complicated from the outside. It is not. It is three ideas done consistently: make pages people want, make them easy for Google to understand, and earn signals that you are trustworthy. Everything else is detail.</p>

<h2>What is SEO?</h2>
<p>SEO (search engine optimization) is the practice of getting more of the right visitors from unpaid search results. You do it by matching what people search for with pages that answer it better than the alternatives.</p>

<h2>SEO vs SEM vs PPC</h2>
<figure>
  <table>
    <thead><tr><th>Term</th><th>What it is</th><th>You pay for</th></tr></thead>
    <tbody>
      <tr><td>SEO</td><td>Ranking in the unpaid results</td><td>Time and content, not clicks</td></tr>
      <tr><td>PPC</td><td>The paid ads at the top of the results</td><td>Every click</td></tr>
      <tr><td>SEM</td><td>The umbrella term for both</td><td>Depends which half</td></tr>
    </tbody>
  </table>
</figure>
<p>SEO is slower to start and cheaper to sustain. PPC is instant and stops the moment you stop paying. Most businesses need both.</p>

<h2>How search engines work</h2>
<p>Three steps. Google <strong>crawls</strong> the web by following links. It <strong>indexes</strong> what it finds, working out what each page is about. Then it <strong>ranks</strong> pages when someone searches.</p>
<p>Your job at the start is simple: make sure Google can crawl and index your pages, and give it clear signals about what each one is for.</p>

<h2>Search intent: the idea that makes SEO click</h2>
<p>Every search has a goal behind it. Match the goal and you can rank. Miss it and the best content on the internet will not save the page.</p>
<figure>
  <table>
    <thead><tr><th>Intent</th><th>Example query</th><th>What to publish</th></tr></thead>
    <tbody>
      <tr><td>Informational</td><td>"how to change a tyre"</td><td>A clear how-to guide</td></tr>
      <tr><td>Commercial</td><td>"best running shoes"</td><td>A comparison or "best" list</td></tr>
      <tr><td>Transactional</td><td>"buy running shoes"</td><td>A product or category page</td></tr>
      <tr><td>Navigational</td><td>"nike store"</td><td>Your homepage or the named page</td></tr>
    </tbody>
  </table>
</figure>
<p>Before you write anything, search the query and look at what already ranks. That is Google telling you what it wants.</p>

<h2>The three types of SEO</h2>
<ul>
  <li><strong>On-page SEO.</strong> The content and its structure: titles, headings, keywords used naturally, internal links.</li>
  <li><strong>Technical SEO.</strong> Whether Google can crawl, render and index the site: speed, mobile, structure, sitemaps.</li>
  <li><strong>Off-page SEO.</strong> Signals from the rest of the web: links, brand mentions, reviews.</li>
</ul>

<div class="callout"><p><strong>Here is the deal:</strong> as a beginner, spend 70% of your effort on on-page (making genuinely useful pages), 20% on technical (fixing what is broken), and 10% on off-page. That ratio changes as you grow, but this is the right start.</p></div>

<h2>Your first month of SEO</h2>
<ol>
  <li><strong>Set up Search Console and Analytics.</strong> Free, and the only accurate data about your own site.</li>
  <li><strong>Fix what is broken.</strong> Run a free crawl. Fix broken links, missing titles, pages that are not indexed.</li>
  <li><strong>Pick 5 to 10 target queries</strong> that your ideal customer searches and that you can realistically compete for.</li>
  <li><strong>Write or rewrite one page per query,</strong> matching the format of what already ranks and adding something better.</li>
  <li><strong>Link the new pages</strong> from your strongest existing pages with descriptive anchor text.</li>
</ol>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Tanbir Habib Riyad</strong> <span>&middot; SEO Trainer &amp; Content Strategist</span></p>
  <p>Beginners burn months chasing high-volume keywords they cannot win. Start with the specific, lower-volume searches your buyers actually type. Win those, build authority, then move up.</p>
</div>

<h2>Beginner checklist</h2>
<ul class="check-list">
  <li>Search Console and Analytics connected</li>
  <li>Every page has one clear title and one H1</li>
  <li>Each page targets one search intent</li>
  <li>Your pages load fast on a phone</li>
  <li>New pages get internal links the day they publish</li>
  <li>You check Search Console once a week</li>
</ul>
`,
    faqs: [
      {
        q: "How long does SEO take to work?",
        a: "Expect the first clear movement in 4 to 6 months, and meaningful results in 12. New sites and competitive terms take longer. Low-competition, specific queries can move in weeks.",
      },
      {
        q: "Can I do SEO myself?",
        a: "Yes, especially for a small site. The fundamentals in this guide are learnable. You bring in help when you need scale, technical fixes, or a second opinion on strategy.",
      },
      {
        q: "Do I need to pay for SEO tools as a beginner?",
        a: "No. Search Console, Google Analytics, a free crawler and free keyword tools cover the basics. You start paying when you need backlink data, rank history and large-site crawls.",
      },
    ],
  },

  // ================================================================
  "onpage-seo-a-detailed-guide-for-beginners": {
    title: "On-Page SEO: The Complete Guide for 2026",
    metaTitle: "On-Page SEO: The Complete Guide (2026) | SERP Mentor",
    metaDescription:
      "On-page SEO is everything you control on the page itself. Here is how to nail intent, titles, headings, internal links and structured data.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">On-page SEO is the part you fully control. No waiting for links, no algorithm luck. If you get the page right, you have done the hardest 80% of ranking. Here is how.</p>

<h2>Start with search intent, not keywords</h2>
<p>Before a single word, search your target query and study the top 10. What format are they? How deep? What subtopics does every one cover? That is the brief.</p>
<p>If the results are all listicles and you write an essay, you will not rank. Match first, then be better.</p>

<h2>Content quality and E-E-A-T</h2>
<p>Google's quality raters look for Experience, Expertise, Authoritativeness and Trust. You cannot fake it, but you can make it obvious:</p>
<ul>
  <li>First-hand detail: your own screenshots, tests, numbers.</li>
  <li>A named author with a real bio.</li>
  <li>Sources linked, statistics dated.</li>
  <li>Claims you would stand behind in front of a customer.</li>
</ul>

<h2>The core on-page elements</h2>
<figure>
  <table>
    <thead><tr><th>Element</th><th>Rule</th></tr></thead>
    <tbody>
      <tr><td>Title tag</td><td>Primary keyword near the front, a reason to click, under ~60 characters</td></tr>
      <tr><td>Meta description</td><td>Not a ranking factor, but write one that earns the click in ~150 characters</td></tr>
      <tr><td>URL slug</td><td>Short, lowercase, readable: <code>/on-page-seo</code> not <code>/post?id=99</code></td></tr>
      <tr><td>H1</td><td>One per page, matches the title's promise</td></tr>
      <tr><td>H2 and H3</td><td>In order, no skipped levels, phrased the way people ask</td></tr>
    </tbody>
  </table>
</figure>

<div class="callout"><p><strong>Pro tip:</strong> Google rewrites roughly a third of titles anyway. Write one it will not want to change: clear, keyword near the front, no clickbait, fits the pixel width.</p></div>

<h2>Internal linking: the lever you own</h2>
<p>Internal links pass authority and context, and they are entirely in your control. When you publish a page:</p>
<ol>
  <li>Link to it from your 3 to 5 strongest related pages.</li>
  <li>Use anchor text that describes the destination, not "click here".</li>
  <li>Link out from it to your other relevant pages, so the cluster ties together.</li>
</ol>

<h2>Images and structured data</h2>
<ul>
  <li><strong>Images:</strong> compress them, serve WebP or AVIF, add real alt text, set width and height.</li>
  <li><strong>Schema:</strong> add Article, Breadcrumb, and FAQ (only for genuine FAQs). It earns rich results and helps AI systems parse the page.</li>
</ul>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Borhan Uddin Alif</strong> <span>&middot; Content Writer &amp; Editor</span></p>
  <p>Read the first sentence under every heading, in order, before you publish. If those sentences alone do not answer the page's main questions, the structure is wrong, however good the detail below.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A B2B blog stuck on page two</h4>
  <p>Twelve articles ranked positions 11 to 18 for months. We changed nothing about the depth. We rewrote every heading as the question users typed, moved the answer to the first two sentences, and added internal links from the top pages.</p>
  <p class="case-study-result">Nine of the twelve reached the top 5 within eight weeks, and four won a featured snippet.</p>
</div>

<h2>On-page checklist</h2>
<ul class="check-list">
  <li>The page matches the format of what already ranks</li>
  <li>Title has the keyword near the front and a reason to click</li>
  <li>One H1, clean heading hierarchy, question-style H2s</li>
  <li>Answer-first: the point is in the first sentence of each section</li>
  <li>3 to 5 internal links in, with descriptive anchors</li>
  <li>Images compressed, alt text written, dimensions set</li>
  <li>Named author, date, sources visible</li>
</ul>
`,
    faqs: [
      {
        q: "How many times should I use my keyword on the page?",
        a: "Enough that the topic is obviously covered, not a target number. Use the keyword in the title, H1, first paragraph and naturally through the body, plus related terms and synonyms. Forced repetition reads badly and does not help.",
      },
      {
        q: "Does word count matter for on-page SEO?",
        a: "Only as a side effect of coverage. If ranking pages are 2,000 words because the topic needs it, a 400-word page will struggle. Aim to cover the topic completely, not to hit a number.",
      },
      {
        q: "Is the meta description a ranking factor?",
        a: "No. But it strongly affects click-through from the results, and Google will write its own if yours is weak or missing. Treat it as ad copy for your page.",
      },
    ],
  },

  // ================================================================
  "internal-linking-guide": {
    title: "Internal Linking for SEO: A Practical Guide",
    metaTitle: "Internal Linking for SEO: The Practical Guide | SERP Mentor",
    metaDescription:
      "Internal links are the most underused ranking lever you fully control. Here is how many to use, where to place them, and how to fix orphan pages.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">Most sites obsess over backlinks and ignore the links they already control. That is backwards. Internal linking is free, fully in your hands, and one of the fastest ways to lift a page.</p>

<h2>What internal linking does</h2>
<p>An internal link is a link from one page on your site to another. Done well, it:</p>
<ul>
  <li>Passes authority from strong pages to the ones that need it.</li>
  <li>Tells Google how pages relate, which builds topical authority.</li>
  <li>Helps crawlers discover new pages faster.</li>
  <li>Keeps readers moving deeper into your site.</li>
</ul>

<h2>How many internal links per page?</h2>
<p>There is no magic number, but a useful range for a normal article is <strong>3 to 10 contextual links</strong> in the body, plus navigation. The test is relevance, not count: every link should genuinely help the reader.</p>

<h2>The hub-and-spoke structure</h2>
<p>Group your content into clusters. One pillar page covers a topic broadly. Supporting pages cover the subtopics in depth.</p>
<ul>
  <li>Every supporting page links up to the pillar.</li>
  <li>The pillar links down to every supporting page.</li>
  <li>Supporting pages link across to two or three siblings.</li>
</ul>
<p>Google reads that shape as "this site is an authority on this topic".</p>

<figure class="chart">
  <figcaption>Internal linking wins, by effort vs impact</figcaption>
  <div class="bars">
    <div class="bar"><span>Link new pages from strong pages</span><span class="bar-track"><span class="bar-fill" style="width:90%"></span></span><span class="bar-val">high impact, low effort</span></div>
    <div class="bar"><span>Fix orphan pages</span><span class="bar-track"><span class="bar-fill" style="width:75%"></span></span><span class="bar-val">high, low</span></div>
    <div class="bar"><span>Improve anchor text</span><span class="bar-track"><span class="bar-fill" style="width:60%"></span></span><span class="bar-val">medium, low</span></div>
    <div class="bar"><span>Full site link audit</span><span class="bar-track"><span class="bar-fill is-muted" style="width:40%"></span></span><span class="bar-val">medium, high</span></div>
  </div>
</figure>

<h2>Anchor text: describe the destination</h2>
<p>The clickable words tell Google what the linked page is about. So:</p>
<ul>
  <li>Use descriptive phrases: "our guide to technical SEO", not "click here" or a bare URL.</li>
  <li>Vary it naturally. A page where every inbound anchor is identical looks engineered.</li>
  <li>Keep it honest. The anchor should match what the reader gets.</li>
</ul>

<div class="callout"><p><strong>Pro tip:</strong> when you publish a new page, search your own site for the target topic (<code>site:yourdomain.com "topic"</code>). Every result is a page that should probably link to the new one. Add those links the same day.</p></div>

<h2>Find and fix orphan pages</h2>
<p>An orphan page has no internal links pointing to it. Crawlers struggle to find it and it inherits no authority. To fix:</p>
<ol>
  <li>Crawl your site and cross-reference against your sitemap or CMS list.</li>
  <li>For each orphan, decide: is it worth keeping?</li>
  <li>If yes, add two or three contextual links from relevant strong pages.</li>
  <li>If no, merge it into a better page and redirect.</li>
</ol>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Tanbir Habib Riyad</strong> <span>&middot; SEO Trainer &amp; Content Strategist</span></p>
  <p>The single cheapest ranking win on most sites is a one-hour internal linking pass on existing content. Connect every page on a topic to every other relevant one. Most teams have never done it once.</p>
</div>

<h2>Internal linking checklist</h2>
<ul class="check-list">
  <li>Content is grouped into pillar-and-cluster topics</li>
  <li>Every page has at least two or three contextual inbound links</li>
  <li>Anchor text describes the destination and varies naturally</li>
  <li>New pages get links from strong pages on publish day</li>
  <li>No orphan pages worth keeping</li>
  <li>Internal links point at final URLs, never at redirects</li>
</ul>
`,
    faqs: [
      {
        q: "Can you have too many internal links?",
        a: "Yes, if they stop being useful. A page stuffed with 40 links dilutes the value each one passes and reads badly. Link where it genuinely helps the reader, and keep navigation separate from contextual links.",
      },
      {
        q: "Do internal links need to be dofollow?",
        a: "Yes, keep them standard dofollow links. There is no reason to nofollow an internal link on your own site. The old 'PageRank sculpting' tactic of nofollowing internal links does not work.",
      },
      {
        q: "Should internal links open in a new tab?",
        a: "No. Keep internal navigation in the same tab so the back button works as users expect. New tabs are for external links or tools you want to stay open.",
      },
    ],
  },

  // ================================================================
  "seo-strategy": {
    title: "SEO Strategy: A 10-Step Plan That Drives Results",
    metaTitle: "SEO Strategy: A 10-Step Plan (2026) | SERP Mentor",
    metaDescription:
      "A repeatable SEO strategy in 10 steps: keyword list, SERP analysis, better content, on-page, intent, links and the update cycle that compounds.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">An SEO strategy is not a 40-page document. It is a repeatable loop: find a query worth winning, build the best page for it, earn signals, then do it again. Here is that loop in 10 steps.</p>

<h2>Step 1: Build a keyword list</h2>
<p>Start with the problems your customers search, not the words you use internally. Pull ideas from Search Console, "People also ask", competitor headings, and customer questions. You want a list of specific, winnable queries with real intent behind them.</p>

<h2>Step 2: Analyse Google's first page</h2>
<p>For each target, search it and study the top 10. Format, angle, depth, freshness, SERP features. This tells you what "good" looks like for this query and whether you can realistically compete.</p>

<h2>Step 3: Identify your real competitors</h2>
<p>Your SEO competitors are whoever ranks for your target queries, not whoever you compete with commercially. A publisher or a forum thread can be your biggest rival.</p>

<h2>Step 4: Create different or better content</h2>
<p>Matching the top results gets you in the game. To win, add something they lack:</p>
<ul>
  <li>Fresher or original data</li>
  <li>A clearer structure or a better table</li>
  <li>First-hand experience and real examples</li>
  <li>A subtopic every competitor skipped</li>
</ul>

<h2>Step 5: Add a hook</h2>
<p>Give other sites a reason to link and readers a reason to stay: a statistic, a free tool, a template, a strong opinion, a visual that gets shared.</p>

<h2>Step 6: On-page and technical foundation</h2>
<p>Title with the keyword near the front. One H1. Clean heading hierarchy. Fast on mobile. Indexable with the right canonical. Schema where it applies.</p>

<h2>Step 7: Optimise for search intent</h2>
<p>Re-check that the page type matches the dominant format in the results. One page, one intent. If the query splits, pick the intent you can serve best.</p>

<h2>Step 8: Design for engagement</h2>
<p>Short intro that confirms the reader is in the right place. Subheads every few paragraphs. Bullets, tables and images that break up the text. A "quick answer" near the top of long pages.</p>

<h2>Step 9: Build links to the page</h2>
<p>Internal links from your strongest pages first. Then targeted outreach: original data, the upgrade play, digital PR, unlinked mentions. Quality over volume, every time.</p>

<h2>Step 10: Update your content</h2>
<p>Pages decay. Every quarter, find the ones losing traffic, update the facts, add what is missing, refresh the intro and date, and re-submit. This step alone often recovers more traffic than new publishing.</p>

<figure class="chart">
  <figcaption>Where the 10 steps pay off over 12 months</figcaption>
  <div class="bars">
    <div class="bar"><span>Months 1 to 2: foundation and first pages</span><span class="bar-track"><span class="bar-fill" style="width:20%"></span></span><span class="bar-val">flat</span></div>
    <div class="bar"><span>Months 3 to 6: pages start ranking</span><span class="bar-track"><span class="bar-fill" style="width:55%"></span></span><span class="bar-val">climbing</span></div>
    <div class="bar"><span>Months 7 to 12: clusters compound</span><span class="bar-track"><span class="bar-fill" style="width:95%"></span></span><span class="bar-val">compounding</span></div>
  </div>
</figure>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>MD Saiful Islam</strong> <span>&middot; Founder &amp; Head of SEO</span></p>
  <p>Do not run all 10 steps once and stop. Run the loop weekly on one page or one cluster at a time. SEO compounds because you keep going, not because any single push was perfect.</p>
</div>

<h2>Strategy checklist</h2>
<ul class="check-list">
  <li>A prioritised list of winnable, high-intent queries</li>
  <li>A SERP analysis before every page is written</li>
  <li>Each page adds something the top results lack</li>
  <li>On-page and technical basics covered on every page</li>
  <li>Internal links added on publish, external links pursued after</li>
  <li>A quarterly refresh cycle running on older content</li>
</ul>
`,
    faqs: [
      {
        q: "How is an SEO strategy different from an SEO plan?",
        a: "The strategy is the approach: which topics you will own, why, and how you will win them. The plan is the schedule: which pages get built or updated, by whom, and when. You need both.",
      },
      {
        q: "How many keywords should an SEO strategy target?",
        a: "Fewer than you think at first. Pick one topic cluster of 10 to 20 related queries, own it completely, then expand. Spreading thin across many topics is the most common reason strategies stall.",
      },
      {
        q: "Should I focus on new content or updating old content?",
        a: "On an established site, updating usually wins: it is faster, lower risk, and the pages already have some authority. New content matters when you are entering a topic you do not yet cover.",
      },
    ],
  },

  // ================================================================
  "ultimate-seo-tutorial": {
    title: "How to Rank Higher on Google: A Step-by-Step Tutorial",
    metaTitle: "How to Rank Higher on Google: Step-by-Step (2026) | SERP Mentor",
    metaDescription:
      "A practical, do-it-in-order tutorial for ranking a page: find the keyword, match intent, make it 10x better, optimise on-page, and earn links.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">This is a tutorial, not a theory lesson. Follow it in order for one page and you will understand how ranking actually works. Then repeat it.</p>

<h2>Step 1: Find a keyword people actually search</h2>
<p>Start with question-based queries ("how", "what", "why", "best") because they map cleanly to content. Use Google autocomplete, "People also ask", and a free keyword tool to check that real search volume exists.</p>

<h2>Step 2: Pick one with the right difficulty</h2>
<p>You want the sweet spot: enough volume to matter, low enough competition to win, and intent that fits your business. As a new site, chase the specific long-tail queries first.</p>
<figure>
  <table>
    <thead><tr><th>Signal</th><th>Good target</th><th>Skip for now</th></tr></thead>
    <tbody>
      <tr><td>Difficulty</td><td>Low to medium</td><td>Dominated by big brands</td></tr>
      <tr><td>Intent</td><td>Matches what you offer</td><td>Pure curiosity, no path to value</td></tr>
      <tr><td>SERP</td><td>Mixed results, some weak pages</td><td>All authoritative, all fresh</td></tr>
    </tbody>
  </table>
</figure>

<h2>Step 3: Work out the search intent</h2>
<p>Search your keyword. Read the top 10 like a detective. Are they guides, lists, product pages, videos? Beginner or advanced? Which subtopics appear on every one? That is your blueprint.</p>

<h2>Step 4: Make your content genuinely better</h2>
<p>"10x better" does not mean 10x longer. It means:</p>
<ul>
  <li>More useful: covers the gaps the others left.</li>
  <li>More current: newer data, updated screenshots.</li>
  <li>More trustworthy: real author, real sources, first-hand detail.</li>
  <li>Easier to use: better structure, a quick answer up top, clean visuals.</li>
</ul>

<h2>Step 5: Optimise the page</h2>
<ul>
  <li>Title tag: keyword near the front, a reason to click, under ~60 characters.</li>
  <li>One H1, question-style H2s in order.</li>
  <li>Answer the core question in the first two sentences.</li>
  <li>Short URL. Compressed images with alt text. Schema where it applies.</li>
</ul>

<div class="callout"><p><strong>Pro tip:</strong> add a two or three sentence summary right under the intro. It often becomes your featured snippet and gets you cited in AI answers, even when the detail is further down.</p></div>

<h2>Step 6: Add internal links</h2>
<p>Link the new page from your three to five strongest related pages, with descriptive anchor text, the day it publishes. This is the highest-return step most people skip.</p>

<h2>Step 7: Earn a few real links</h2>
<p>Once the page is live and indexed, pursue links: pitch your data to journalists, find sites linking to weaker resources on the topic, answer source requests. A handful of relevant editorial links beats fifty low-quality ones.</p>

<h2>Step 8: Track, then improve</h2>
<p>Check Search Console after two to four weeks. If the page is stuck at position 11 to 20, re-check intent match and content depth before you think about more links. Update and re-submit.</p>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Borhan Uddin Alif</strong> <span>&middot; Content Writer &amp; Editor</span></p>
  <p>The pages that jump fastest are usually the ones where we matched the exact format of the top results and then added one clear thing they all missed. Not the longest pages. The most complete ones.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>One page, one process</h4>
  <p>A software company had a thin 500-word post targeting a how-to query, ranking at position 14. We ran these exact steps: matched the top results' step-by-step format, added prerequisites, common errors and a video, and linked it from three strong pages.</p>
  <p class="case-study-result">Position 3 within seven weeks, and it became the blog's top lead-generating post.</p>
</div>

<h2>Ranking checklist</h2>
<ul class="check-list">
  <li>The keyword has real search volume and winnable competition</li>
  <li>Your page type matches the dominant format in the top 10</li>
  <li>The core question is answered in the first two sentences</li>
  <li>The page adds one clear thing the top results lack</li>
  <li>Internal links added on publish</li>
  <li>A few relevant editorial links pursued after indexing</li>
  <li>Tracked in Search Console and updated if it stalls</li>
</ul>
`,
    faqs: [
      {
        q: "How long until a new page ranks?",
        a: "A low-competition page can enter the top 10 in a few weeks. Competitive queries take three to six months and usually need links. If a page is not indexed after two weeks, that is the first thing to fix.",
      },
      {
        q: "What if my page is stuck at position 11 to 15?",
        a: "That is almost never a link problem. Re-check that your page format matches the top results, that you have covered every subtopic they cover, and that the answer is easy to find. Then add internal links.",
      },
      {
        q: "Do I need backlinks to rank?",
        a: "For low-competition, long-tail queries, often not. For anything competitive, yes: links are still one of Google's strongest signals. Earn a few relevant ones rather than chasing volume.",
      },
    ],
  },

  // ================================================================
  "keywords-research": {
    title: "Keyword Research for Profitable Products and Services",
    metaTitle: "Keyword Research for Profitable Products (2026) | SERP Mentor",
    metaDescription:
      "A 7-step keyword research process built around commercial intent: topic buckets, seed keywords, tools, competitor gaps, and how to prioritise.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">Most keyword research finds traffic. Good keyword research finds customers. The difference is starting from what people buy, not just what they search.</p>

<h2>Why keyword research still matters</h2>
<p>Keyword research is how you learn the exact language your market uses and where the money is. Skip it and you write for yourself. Do it well and every page has a job.</p>

<h2>The 7-step process</h2>

<h3>Step 1: Know your niche and audience</h3>
<p>List the problems you solve, the outcomes people want, and the words they use to describe both. This is the foundation. Talk to customers, read reviews, sit in the communities they use.</p>

<h3>Step 2: Build topic buckets</h3>
<p>Group everything into 5 to 10 broad themes. For an accounting firm: "tax returns", "bookkeeping", "payroll", "business advice". Each bucket becomes a content cluster.</p>

<h3>Step 3: Generate seed keywords</h3>
<p>For each bucket, brainstorm the obvious queries, then expand with Google autocomplete, "People also ask", "Searches related to", and the sub-reddits and forums in your space.</p>

<h3>Step 4: Use research tools</h3>
<p>Run your seeds through a keyword tool to get volume, difficulty and related terms. Free tools are directionally accurate, which is enough to prioritise. Paid tools add depth and history.</p>

<h3>Step 5: Explore related and AI suggestions</h3>
<p>Ask an AI assistant "what do people ask before buying [your product]" and "what are the objections". These surface middle-of-funnel queries that convert well and that tools often miss.</p>

<h3>Step 6: Analyse competitors</h3>
<p>Look at what your ranking competitors target. A keyword gap analysis lists the queries two or more competitors rank for and you do not. Those are pre-qualified opportunities.</p>

<h3>Step 7: Refine and prioritise</h3>
<p>Score every keyword on three things: business value, winnability, and search volume, in that order.</p>

<figure>
  <table>
    <thead><tr><th>Keyword type</th><th>Volume</th><th>Intent</th><th>Priority</th></tr></thead>
    <tbody>
      <tr><td>"[product] vs [competitor]"</td><td>Low</td><td>High buying</td><td>Do first</td></tr>
      <tr><td>"best [category] for [use case]"</td><td>Medium</td><td>Commercial</td><td>Do first</td></tr>
      <tr><td>"[category] pricing"</td><td>Low</td><td>High buying</td><td>Do first</td></tr>
      <tr><td>"what is [category]"</td><td>High</td><td>Informational</td><td>Do later, for authority</td></tr>
    </tbody>
  </table>
  <figcaption>High volume is the tie-breaker, not the deciding factor. Commercial intent wins.</figcaption>
</figure>

<div class="callout"><p><strong>Here is the deal:</strong> a "boring" keyword with 90 searches a month and clear buying intent is worth more than an exciting one with 9,000 searches and none. Rank for the boring ones first.</p></div>

<h2>Classifying keywords</h2>
<ul>
  <li><strong>By length:</strong> head terms (broad, competitive), body terms (mid), long-tail (specific, easier, convert better).</li>
  <li><strong>By intent:</strong> informational, commercial, transactional, navigational. Match each to the right page type.</li>
</ul>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Mohammad A Mahmud</strong> <span>&middot; Director of Client Strategy</span></p>
  <p>On every account we start with the bottom-of-funnel keywords: comparisons, alternatives, pricing, "for [industry]". They are lower volume and far less competitive, and they pay for the rest of the programme while the big terms build.</p>
</div>

<h2>Keyword research checklist</h2>
<ul class="check-list">
  <li>Keywords come from customer language, not internal jargon</li>
  <li>Everything is grouped into topic clusters</li>
  <li>Each keyword is mapped to one search intent and page type</li>
  <li>A competitor gap analysis is done</li>
  <li>Priority is set by business value first, winnability second, volume third</li>
  <li>Bottom-of-funnel commercial terms are scheduled first</li>
</ul>
`,
    faqs: [
      {
        q: "What keyword search volume is 'good'?",
        a: "It depends on value per visitor. For a high-ticket B2B service, 50 searches a month with buying intent is excellent. For an ad-funded content site, you need far more volume. Judge volume against what a visitor is worth to you.",
      },
      {
        q: "Can I do keyword research with free tools?",
        a: "Yes, for prioritisation. Free tools give volume and difficulty that are directionally right. You upgrade to paid tools for competitor keyword data, historical trends and large-scale research.",
      },
      {
        q: "How often should I redo keyword research?",
        a: "Refresh your priority list quarterly and do a deeper pass once or twice a year. Search behaviour shifts, new competitors appear, and your own rankings change what is worth targeting next.",
      },
    ],
  },

  // ================================================================
  "seo-keywords-research": {
    title: "Keyword Research for Niche Sites in 2026",
    metaTitle: "Keyword Research for Niche Sites (2026) | SERP Mentor",
    metaDescription:
      "How to find 'golden keywords' for a niche site after the core updates: multi-platform seed research, commercial modifiers, and the pillar-cluster model.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">The core updates changed niche site SEO for good. The sites that survived were not the ones with the most keywords. They were the ones with real depth on a focused topic and content people actually wanted. Here is how to do keyword research for that kind of site.</p>

<h2>What "golden keywords" look like now</h2>
<p>A golden keyword for a niche site in 2026 has:</p>
<ul>
  <li><strong>Genuine demand.</strong> Real people search it, consistently.</li>
  <li><strong>Beatable competition.</strong> The top results include forum threads, thin affiliate pages, or outdated posts.</li>
  <li><strong>A monetisation path.</strong> It leads to a product, an email signup, or ad-worthy engaged time.</li>
  <li><strong>Topical fit.</strong> It belongs to a cluster you can own, not a one-off.</li>
</ul>

<h2>Step 1: Multi-platform seed research</h2>
<p>Do not start in a keyword tool. Start where your audience talks:</p>
<figure>
  <table>
    <thead><tr><th>Source</th><th>What you get</th></tr></thead>
    <tbody>
      <tr><td>Reddit and niche forums</td><td>Real questions, real language, buying objections</td></tr>
      <tr><td>YouTube search and comments</td><td>How-to demand and product interest</td></tr>
      <tr><td>Amazon reviews and Q&amp;A</td><td>Product problems people search solutions for</td></tr>
      <tr><td>Google autocomplete and "People also ask"</td><td>The query tree around each seed</td></tr>
    </tbody>
  </table>
</figure>

<h2>Step 2: Add high-commercial-intent modifiers</h2>
<p>Take your seeds and layer on modifiers that signal a buyer, not a browser: "best", "vs", "alternative", "review", "for [use case]", "worth it", "cheap", "[year]".</p>

<h2>Step 3: Check competition and AI visibility</h2>
<p>For each candidate, look at:</p>
<ul>
  <li>Who ranks. If it is all high-authority sites with fresh content, skip it for now.</li>
  <li>Whether AI Overviews answer it in place. If so, expect lower click-through and prioritise commercial versions.</li>
  <li>Whether the ranking pages are actually good. Weak top-10 results are your opening.</li>
</ul>

<h2>Step 4: Build topical authority with pillars and clusters</h2>
<p>Do not scatter posts. Pick one subtopic, map every question in it, and publish a pillar plus the full cluster before moving on. A half-covered topic ranks for nothing.</p>

<figure class="chart">
  <figcaption>Niche site keyword priority</figcaption>
  <div class="bars">
    <div class="bar"><span>Commercial, weak competition</span><span class="bar-track"><span class="bar-fill" style="width:92%"></span></span><span class="bar-val">first</span></div>
    <div class="bar"><span>Informational, supports a cluster</span><span class="bar-track"><span class="bar-fill" style="width:65%"></span></span><span class="bar-val">next</span></div>
    <div class="bar"><span>High volume, high competition</span><span class="bar-track"><span class="bar-fill is-muted" style="width:25%"></span></span><span class="bar-val">later</span></div>
    <div class="bar"><span>Answered fully by AI Overviews</span><span class="bar-track"><span class="bar-fill is-muted" style="width:15%"></span></span><span class="bar-val">skip or reframe</span></div>
  </div>
</figure>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>MD Saiful Islam</strong> <span>&middot; Founder &amp; Head of SEO</span></p>
  <p>The niche sites that came back after the updates had one thing in common: they picked a lane and went deep. Twenty excellent pages on one subtopic beat two hundred shallow pages across ten.</p>
</div>

<h2>Common mistakes to avoid</h2>
<ul class="check-list">
  <li>Chasing volume over intent and winnability</li>
  <li>Publishing one post per keyword instead of clusters per topic</li>
  <li>Targeting queries AI Overviews now answer completely</li>
  <li>Ignoring what the current top 10 actually look like</li>
  <li>Never updating the keywords that used to work</li>
</ul>
`,
    faqs: [
      {
        q: "Are niche sites still worth building after the core updates?",
        a: "Yes, if they are genuinely useful and focused. The updates hurt sites that mass-produced thin content to game rankings. Sites with real expertise, first-hand testing and depth on a focused topic still rank and earn.",
      },
      {
        q: "How many keywords does a niche site cluster need?",
        a: "Enough to answer every meaningful question in the subtopic, often 10 to 25 pages around one pillar. The number is set by the topic, not a target.",
      },
      {
        q: "Should niche site keyword research target AI search?",
        a: "Yes. Favour comparison, 'best' and buying-intent queries that still earn clicks, and format every page answer-first so it can be cited by AI assistants even when the classic click drops.",
      },
    ],
  },

  // ================================================================
  "seo-for-your-new-website": {
    title: "SEO for a New Website: A 10-Step Setup",
    metaTitle: "SEO for a New Website: 10 Steps to Start Right | SERP Mentor",
    metaDescription:
      "Launching a site? Do SEO in this order: build it right, research, structure, content, on-page, links, promotion, local, tracking and iteration.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">A new site has no history and no trust. That is not a disadvantage if you set it up right from day one. Do these 10 things in order and you skip the mistakes that cost most new sites their first year.</p>

<h2>Step 1: Build the site with SEO in mind</h2>
<p>Before design, decide URL structure, the main navigation, and how content will be organised into topics. Pick a fast, clean platform. Retrofitting SEO into a finished site is far more expensive.</p>

<h2>Step 2: Do the research</h2>
<p>Keyword and competitor research before you write a word. You want a map of the topics you will own, the queries under each, and what the current top results look like.</p>

<h2>Step 3: Build the structure</h2>
<p>Organise pages into pillar-and-cluster topics. Keep every important page within three clicks of the homepage. Short, readable URLs. A logical menu.</p>

<h2>Step 4: Create content that matches demand</h2>
<p>One page per query, matching the format of what ranks and adding something better. Start with the specific, lower-competition terms a new site can actually win.</p>

<h2>Step 5: Nail on-page SEO</h2>
<p>Titles with the keyword near the front. One H1. Question-style H2s. Answer-first sections. Compressed images with alt text. Schema where it applies.</p>

<h2>Step 6: Build credibility and get links</h2>
<p>New sites need trust signals. Get listed in real directories for your industry. Publish something linkable. Pursue a handful of genuine editorial links. Do not buy links.</p>

<h2>Step 7: Share your content</h2>
<p>Promote every new page: your email list, relevant communities, social, outreach to people who cover the topic. Early engagement helps Google evaluate the page.</p>

<h2>Step 8: Set up local SEO (if it applies)</h2>
<p>If you serve a place, create and fully optimise a Google Business Profile, get consistent citations, and build location and service pages.</p>

<h2>Step 9: Set up tracking</h2>
<p>Search Console and Analytics from day one. Verify ownership, submit your sitemap, set up conversion tracking. You cannot improve what you do not measure.</p>

<h2>Step 10: Watch results and adjust</h2>
<p>Check Search Console weekly. See which pages get impressions but no clicks (title or intent issue), which rank on page two (needs depth or links), and which get nothing (indexation issue).</p>

<figure class="chart">
  <figcaption>What a new site's organic traffic tends to do</figcaption>
  <div class="bars">
    <div class="bar"><span>Month 1 to 2: indexing, near zero</span><span class="bar-track"><span class="bar-fill is-muted" style="width:8%"></span></span><span class="bar-val">quiet</span></div>
    <div class="bar"><span>Month 3 to 5: long-tail starts landing</span><span class="bar-track"><span class="bar-fill" style="width:35%"></span></span><span class="bar-val">first traffic</span></div>
    <div class="bar"><span>Month 6 to 12: clusters mature</span><span class="bar-track"><span class="bar-fill" style="width:85%"></span></span><span class="bar-val">compounding</span></div>
  </div>
  <p class="chart-note">A new domain spends its first weeks earning trust. The flat start is normal, not a failure.</p>
</figure>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Mahdi Hassan</strong> <span>&middot; Web Developer &amp; Site Speed</span></p>
  <p>The cheapest SEO win on a new site is building it fast and clean from the start. Green Core Web Vitals, a sensible URL structure and working schema on day one save you a painful retrofit later.</p>
</div>

<h2>New site checklist</h2>
<ul class="check-list">
  <li>URL structure and navigation planned before design</li>
  <li>Keyword and competitor research done first</li>
  <li>Content organised into pillar-and-cluster topics</li>
  <li>On-page basics on every page</li>
  <li>Search Console and Analytics live, sitemap submitted</li>
  <li>A few real directory and editorial links</li>
  <li>Weekly Search Console review</li>
</ul>
`,
    faqs: [
      {
        q: "Is there a 'Google sandbox' for new sites?",
        a: "Not an official one, but new domains do take time to build trust and rankings tend to be volatile for the first few months. Consistent publishing and a few quality links shorten that period.",
      },
      {
        q: "Should I launch with a lot of content or a little?",
        a: "Launch with a focused set of strong pages that fully cover one topic, rather than a large volume of thin pages. Then add clusters steadily. Depth on a narrow topic ranks faster than breadth.",
      },
      {
        q: "How soon should I start link building for a new site?",
        a: "Get foundational citations and directory listings early. Hold off on serious outreach until you have genuinely linkable content live, usually a month or two in.",
      },
    ],
  },

  // ================================================================
  "off-page-seo-guide": {
    title: "Off-Page SEO: The Complete Guide for 2026",
    metaTitle: "Off-Page SEO: The Complete Guide (2026) | SERP Mentor",
    metaDescription:
      "Off-page SEO is every trust signal from outside your site: links, brand mentions, reviews. Here is what a good link looks like and how to earn them.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">On-page SEO makes a page good. Off-page SEO makes the rest of the web vouch for it. Google still leans heavily on that second signal, and the sites in position one almost always have more of it than the pages below.</p>

<h2>What off-page SEO covers</h2>
<ul>
  <li><strong>Backlinks.</strong> Still the strongest off-page signal.</li>
  <li><strong>Brand mentions.</strong> Even without a link, being named on trusted sites builds entity authority.</li>
  <li><strong>Reviews and reputation.</strong> Especially for local and commercial queries.</li>
  <li><strong>Digital PR and social proof.</strong> Coverage, citations, and being talked about.</li>
</ul>

<h2>What a link worth chasing looks like</h2>
<p>Forget domain-rating thresholds for a second. A link is worth the effort when it clears five checks:</p>
<figure>
  <table>
    <thead><tr><th>Check</th><th>Question</th></tr></thead>
    <tbody>
      <tr><td>Relevance</td><td>Is the linking page about your topic? Not the site, the page.</td></tr>
      <tr><td>Editorial</td><td>Did a person add it because it helped their reader?</td></tr>
      <tr><td>Placement</td><td>Is it in the body copy, near the top, not a footer or bio block?</td></tr>
      <tr><td>Traffic</td><td>Does the page have real visitors who might click through?</td></tr>
      <tr><td>Anchor text</td><td>Does it read naturally, not exact-match every time?</td></tr>
    </tbody>
  </table>
</figure>
<p>One link that clears all five beats fifty that clear none, and it carries none of the risk.</p>

<h2>DA, DR and other third-party scores</h2>
<p>Domain Authority and Domain Rating are useful for sorting a prospect list, nothing more. They are estimates made by SEO tools, not numbers Google uses. Relevance and real traffic matter more than a two-digit score.</p>

<h2>Dofollow vs nofollow</h2>
<p>Dofollow links pass ranking signals. Nofollow, sponsored and UGC links generally do not, but they still drive referral traffic, build brand awareness, and often lead to follow links later. A natural profile has a mix.</p>

<h2>Five tactics that still earn links</h2>
<ol>
  <li><strong>Linkable assets.</strong> Original data, a free tool, a definitive guide. Something people cite without being asked.</li>
  <li><strong>The upgrade play.</strong> Find a popular resource that has gone stale, build a better one, email everyone still linking to the old version.</li>
  <li><strong>Digital PR.</strong> Turn a survey or dataset into a story and pitch journalists.</li>
  <li><strong>Guest contributions, selective.</strong> A handful of real publications your buyers read.</li>
  <li><strong>Unlinked mentions.</strong> Search your brand name minus your domain. Every unlinked mention is a 30-second email from becoming a link.</li>
</ol>

<div class="callout"><p><strong>The one question that predicts link success:</strong> would this page have earned the link if you had never done outreach? If yes, outreach just speeds it up. If no, you are pushing water uphill.</p></div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Milon Khan</strong> <span>&middot; Link Building &amp; Digital PR Lead</span></p>
  <p>We audit the existing backlink profile before building anything new. Reclaiming lost links and converting unlinked mentions is faster, cheaper and safer than cold outreach, and most sites have dozens sitting there.</p>
</div>

<h2>Links that are not worth the risk</h2>
<ul>
  <li>Paid links that pass PageRank without <code>rel="sponsored"</code> or <code>nofollow</code></li>
  <li>Reciprocal link schemes at scale</li>
  <li>Private blog networks</li>
  <li>Comment, forum and profile spam</li>
</ul>

<h2>Off-page checklist</h2>
<ul class="check-list">
  <li>One genuine linkable asset shipped per quarter</li>
  <li>A prospect list scored by relevance and traffic, not just DR</li>
  <li>Outreach personalised enough that a real person clearly wrote it</li>
  <li>Backlink profile audited quarterly, lost links reclaimed</li>
  <li>Unlinked brand mentions converted to links</li>
  <li>Reviews encouraged where buyers and AI assistants look</li>
</ul>
`,
    faqs: [
      {
        q: "How many backlinks do I need to rank?",
        a: "There is no number. It depends entirely on the competition for your query. Check the pages ranking in the top 5 and roughly match the quality and relevance of their links, not the raw count.",
      },
      {
        q: "Should I disavow toxic backlinks?",
        a: "Almost never. Google ignores most spammy links automatically. Only disavow deliberate manipulation, like a paid-link network you built or a negative-SEO attack, and even then sparingly.",
      },
      {
        q: "Do brand mentions without links help SEO?",
        a: "Yes, more than they used to. Unlinked mentions on trusted sites build your entity and are read by AI assistants when they decide which sources to trust. Chase them alongside links.",
      },
    ],
  },

  // ================================================================
  "seo-competitor-analysis": {
    title: "SEO Competitor Analysis: A 6-Step Process",
    metaTitle: "SEO Competitor Analysis: A 6-Step Process | SERP Mentor",
    metaDescription:
      "How to reverse-engineer the sites outranking you: find your real rivals, mine their keywords and links, audit their tech, and build an action plan.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">Your competitors have already done a lot of your homework. They have tested keywords, earned links, and learned what content works in your space. A good competitor analysis lets you skip to the answers.</p>

<h2>Why bother</h2>
<p>Competitor analysis tells you what is realistic, where the gaps are, and what "good" looks like for your queries. It turns strategy from guesswork into a checklist.</p>

<h2>Step 1: Find your real SEO rivals</h2>
<p>They are not always your business competitors. Search your top 10 target queries and note who ranks. Publishers, forums, marketplaces and review sites are often your biggest organic rivals.</p>

<h2>Step 2: Mine their keywords</h2>
<p>Look at what queries your rivals rank for that you do not. This "keyword gap" is a pre-qualified opportunity list: they have proven the demand and that content like yours can rank.</p>
<figure>
  <table>
    <thead><tr><th>What to look for</th><th>Why it matters</th></tr></thead>
    <tbody>
      <tr><td>Queries 2+ competitors rank for, you do not</td><td>Proven, winnable demand</td></tr>
      <tr><td>Their top traffic-driving pages</td><td>Shows what works in your space</td></tr>
      <tr><td>Pages ranking in positions 4 to 10</td><td>Beatable with a better page</td></tr>
    </tbody>
  </table>
</figure>

<h2>Step 3: Study their link building</h2>
<p>A link gap analysis lists every domain linking to two or more competitors but not to you. Those sites already link to content like yours. Export the list, cut the irrelevant ones, and work top-down by relevance.</p>

<h2>Step 4: Audit their technical setup</h2>
<p>Check their site speed, structure, schema and how their content is organised. If a competitor outranks you with weaker content, the answer is often technical or structural.</p>

<h2>Step 5: Analyse their content approach</h2>
<p>For your key topics, compare: format, depth, freshness, how they use visuals, their internal linking, their author signals. List what they do that you do not, and what you could do better.</p>

<h2>Step 6: Turn it into an action plan</h2>
<p>You should finish with three lists:</p>
<ul>
  <li><strong>Pages to create:</strong> keyword gaps worth targeting.</li>
  <li><strong>Pages to improve:</strong> where you rank 4 to 15 and a competitor is beatable.</li>
  <li><strong>Links to pursue:</strong> the link gap, sorted by relevance.</li>
</ul>

<div class="callout"><p><strong>Pro tip:</strong> do not try to beat every competitor at everything. Pick the one closest to you in size and authority, and aim to out-execute just them, one topic cluster at a time.</p></div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Mohammad A Mahmud</strong> <span>&middot; Director of Client Strategy</span></p>
  <p>The most useful output of a competitor analysis is not the keyword list. It is the pages where you already rank 6 to 12 and a competitor above you is clearly beatable. Those are your fastest wins.</p>
</div>

<h2>Competitor analysis checklist</h2>
<ul class="check-list">
  <li>Real SEO rivals identified from the actual SERPs</li>
  <li>Keyword gap run against your top 3 rivals</li>
  <li>Link gap exported and filtered for relevance</li>
  <li>Competitor technical and content approach documented</li>
  <li>Output is three lists: create, improve, pursue links</li>
  <li>Focus on one beatable competitor, one cluster at a time</li>
</ul>
`,
    faqs: [
      {
        q: "What tools do I need for competitor analysis?",
        a: "An all-in-one SEO platform makes keyword and link gaps fast. You can do a lighter version free: manually check who ranks for your queries, study their pages, and use Search Console to see where you already rank close.",
      },
      {
        q: "How often should I analyse competitors?",
        a: "A full analysis once or twice a year, plus a quick check whenever you lose rankings on an important query or a new site appears in your results.",
      },
      {
        q: "Should I copy what my competitors do?",
        a: "Match their format and coverage, because that is what the query rewards, then differentiate within it: better data, clearer structure, a subtopic they missed. Copying without improving gets you a worse version of their page.",
      },
    ],
  },

  // ================================================================
  "google-e-e-a-t": {
    title: "Google E-E-A-T: How to Create People-First Content",
    metaTitle: "Google E-E-A-T: A Practical Guide (2026) | SERP Mentor",
    metaDescription:
      "E-E-A-T is not a score, it is a set of signals. Here is what Experience, Expertise, Authoritativeness and Trust mean in practice, and how to show them.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">People talk about E-E-A-T like a dial in the algorithm you can turn up. It is not. It is a framework Google's human raters use and its systems try to approximate. The good news: every part of it is something you can actually build.</p>

<h2>What E-E-A-T stands for</h2>
<ul>
  <li><strong>Experience.</strong> Have you actually done the thing? First-hand use, not a rewrite of other articles.</li>
  <li><strong>Expertise.</strong> Does the author have real knowledge or credentials in the subject?</li>
  <li><strong>Authoritativeness.</strong> Is the site or author a recognised go-to source on the topic?</li>
  <li><strong>Trust.</strong> Can the information, the business and the transaction be trusted? This one carries the most weight.</li>
</ul>

<h2>Why it matters</h2>
<p>E-E-A-T guides Google's quality raters, whose judgements train the ranking systems. It matters most for "Your Money or Your Life" topics: health, finance, legal, safety. After the 2024 and 2025 core updates, sites with weak trust signals were hit hardest.</p>

<h2>Weak vs strong, in practice</h2>
<figure>
  <table>
    <thead><tr><th>Signal</th><th>Weak</th><th>Strong</th></tr></thead>
    <tbody>
      <tr><td>Authorship</td><td>"Admin" or "Editorial Team"</td><td>Named author, real bio, credentials, track record</td></tr>
      <tr><td>Experience</td><td>Rewritten from other articles</td><td>First-hand tests, own screenshots, own data</td></tr>
      <tr><td>Sourcing</td><td>Vague claims, no links</td><td>Primary sources linked, statistics dated</td></tr>
      <tr><td>Business identity</td><td>No about or contact page</td><td>Full about page, real contact details, editorial policy</td></tr>
      <tr><td>Reputation</td><td>No third-party presence</td><td>Reviews and citations on trusted sites</td></tr>
    </tbody>
  </table>
</figure>

<h2>How to apply it</h2>
<ol>
  <li><strong>Show real experience.</strong> Use your own photos, test results and specific details only someone who did the thing would know.</li>
  <li><strong>Establish expertise.</strong> Author bios with credentials, links to their other work, a clear "why this person".</li>
  <li><strong>Build authority off-site.</strong> Get mentioned, cited and reviewed on sites your audience trusts.</li>
  <li><strong>Earn trust.</strong> An about page, contact details, a published editorial and fact-checking process, secure checkout, clear policies.</li>
</ol>

<div class="callout"><p><strong>Here is the deal:</strong> E-E-A-T is what a sceptical stranger can verify in 30 seconds. Who wrote this? What do they know? Who is behind the site? Can I check the claims? Build for that stranger.</p></div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Tanbir Habib Riyad</strong> <span>&middot; SEO Trainer &amp; Content Strategist</span></p>
  <p>The fastest E-E-A-T improvement on most sites is adding real, named authors with proper bios and a visible editorial process. It sounds basic. It moves rankings after core updates.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A health information site</h4>
  <p>Traffic slipped across two core updates. The content was accurate but anonymous, unsourced, with no editorial process shown. We added named authors with credentials, a reviewer line and date on every page, primary-source citations, and a published editorial policy.</p>
  <p class="case-study-result">The site regained about 70% of lost traffic over the next two updates, with the reviewed pages recovering first.</p>
</div>

<h2>E-E-A-T checklist</h2>
<ul class="check-list">
  <li>Every article has a real, named author with a linked bio</li>
  <li>YMYL pages show a reviewer or editor and a last-updated date</li>
  <li>Claims link to primary sources, statistics carry a date</li>
  <li>The site has an about page, contact details and a stated editorial process</li>
  <li>Your brand is mentioned and reviewed on trusted sites</li>
  <li>Content shows first-hand experience, not just research</li>
</ul>
`,
    faqs: [
      {
        q: "Is E-E-A-T a ranking factor?",
        a: "Not a single one. It is a concept Google's raters use, and the systems approximate it through many signals: links, mentions, author information, content quality and site trust.",
      },
      {
        q: "How do I show 'experience' if I am writing about something I research rather than do?",
        a: "Bring in someone who has done it, quote practitioners, run your own small test, or be upfront that it is a research-based overview and cite strong sources. Do not imply first-hand experience you do not have.",
      },
      {
        q: "Does E-E-A-T matter for non-YMYL topics?",
        a: "Yes, less strictly. Every topic benefits from named authors, real experience and trustworthy sourcing, but Google applies the highest bar to health, finance, legal and safety content.",
      },
    ],
  },

  // ================================================================
  "local-seo-guide": {
    title: "Local SEO: The Complete Guide for 2026",
    metaTitle: "Local SEO: The Complete Guide (2026) | SERP Mentor",
    metaDescription:
      "Rank in the map pack and local results: Google Business Profile, reviews, citations, local content and links, for one location or fifty.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">Local SEO is a different game from regular SEO. The map pack has its own rules, reviews do heavy lifting, and a smaller local site can beat a national brand. Here is how the pieces fit.</p>

<h2>Part 1: Google Business Profile</h2>
<p>Your Business Profile is the single biggest lever in local. Get it right:</p>
<ul>
  <li>Correct primary category, plus every relevant secondary category.</li>
  <li>Every service listed, with descriptions.</li>
  <li>Real photos, added regularly.</li>
  <li>Accurate hours, service areas, and contact details that match your site exactly.</li>
  <li>Posts and Q&amp;A kept current.</li>
</ul>

<h2>Part 2: Reviews</h2>
<p>Review count, rating and recency all feed local rankings, and reviews are what convert the click into a call.</p>
<ul>
  <li>Ask every happy customer, with a direct link.</li>
  <li>Respond to all of them, positive and negative.</li>
  <li>Aim for a steady flow, not a burst.</li>
</ul>

<h2>Part 3: Citations and consistency</h2>
<p>A citation is any mention of your name, address and phone number online. They need to be identical everywhere.</p>
<figure>
  <table>
    <thead><tr><th>Do</th><th>Do not</th></tr></thead>
    <tbody>
      <tr><td>Use one exact NAP format everywhere</td><td>"St" here, "Street" there, old phone numbers</td></tr>
      <tr><td>Claim core directories and industry sites</td><td>Buy bulk low-quality citation packages</td></tr>
      <tr><td>Fix or remove duplicate listings</td><td>Leave old listings pointing at wrong data</td></tr>
    </tbody>
  </table>
</figure>

<h2>Part 4: Local content</h2>
<p>Build a page for every service in every area you serve, written to be genuinely useful, not spun. Add local landmarks, real project photos, local reviews. This is where most of the organic (non-map-pack) traffic comes from.</p>

<h2>Part 5: Local links and technical</h2>
<ul>
  <li>Links from local news, chambers of commerce, suppliers, sponsorships, local blogs.</li>
  <li><code>LocalBusiness</code> schema on your site.</li>
  <li>Fast, mobile-first pages with click-to-call above the fold.</li>
</ul>

<div class="callout"><p><strong>Pro tip:</strong> for a service-area business with no storefront, set the Business Profile to hide the address and define your service areas precisely. You can still rank in the map pack.</p></div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>MD Saiful Islam</strong> <span>&middot; Founder &amp; Head of SEO</span></p>
  <p>For genuine emergency searches, "plumber near me" at 2am, the map pack is the whole funnel. A fully optimised profile with recent reviews beats a prettier website every time. Fix the profile first.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A single-location HVAC company</h4>
  <p>Ranked on page two locally, ~45 profile actions a month. We rebuilt the Business Profile, cleaned up 12 inconsistent citations, launched a review routine, and published a page per service per town.</p>
  <p class="case-study-result">Profile actions grew to ~240 a month within a quarter, and the company entered the map pack for its five core service terms.</p>
</div>

<h2>Local SEO checklist</h2>
<ul class="check-list">
  <li>Business Profile fully built: categories, services, photos, hours</li>
  <li>A weekly review-request routine, all reviews answered</li>
  <li>One exact NAP format across the web, duplicates cleaned</li>
  <li>A page per service, per area served</li>
  <li>Local links from real local sources</li>
  <li>LocalBusiness schema and a fast, click-to-call mobile site</li>
</ul>
`,
    faqs: [
      {
        q: "How long does local SEO take to work?",
        a: "Profile and citation fixes often move map-pack rankings in four to eight weeks. Competitive city terms and multi-location work take three to six months to settle.",
      },
      {
        q: "Do I need a physical address for local SEO?",
        a: "No. Service-area businesses can rank in the map pack with the address hidden and service areas defined. You do need a real business presence and consistent NAP data.",
      },
      {
        q: "How many reviews do I need to rank in the map pack?",
        a: "There is no threshold, but you generally need to be competitive with the other businesses in your area on count, rating and recency. A steady flow matters more than a one-time push.",
      },
    ],
  },

  // ================================================================
  "best-ai-seo-tools": {
    title: "The Best AI SEO Tools in 2026",
    metaTitle: "The Best AI SEO Tools in 2026 (Tested) | SERP Mentor",
    metaDescription:
      "The AI SEO tools our team actually runs on client work, what each is best at, honest pricing, and how to build a stack that fits your budget.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">The average SEO team pays for four tools and actively uses maybe 30% of two of them. You do not need a bigger stack. You need four jobs covered, plus the discipline to cancel anything that does not do one of them.</p>

<h2>The four jobs your stack has to cover</h2>
<ol>
  <li><strong>Keyword and topic research.</strong> What people search, how hard it is, the intent behind it.</li>
  <li><strong>Technical crawling.</strong> Broken links, redirect chains, orphan pages, indexation, Core Web Vitals.</li>
  <li><strong>Content optimisation.</strong> What the ranking pages cover that your draft does not.</li>
  <li><strong>Rank and AI-visibility tracking.</strong> Positions in classic results, and whether the assistants mention you.</li>
</ol>

<h2>How we review tools</h2>
<p>Every tool here has been run on live client projects for at least a month, with its numbers cross-checked against Search Console and one other source. We report where it is accurate, where it inflates, and who it is actually for. Affiliate links are disclosed and never change the verdict.</p>

<h2>The tools, by job</h2>
<figure>
  <table>
    <thead><tr><th>Tool</th><th>Best for</th><th>Rough price</th><th>Verdict</th></tr></thead>
    <tbody>
      <tr><td>Semrush</td><td>All-in-one: keywords, tracking, competitor and link data</td><td>From ~$140/mo</td><td>The default if you want one platform</td></tr>
      <tr><td>Ahrefs</td><td>Backlink data and content research</td><td>From ~$130/mo</td><td>Best link index; strong for content gaps</td></tr>
      <tr><td>Surfer SEO</td><td>On-page content optimisation</td><td>From ~$90/mo</td><td>Useful if you publish weekly or more</td></tr>
      <tr><td>Frase / Clearscope</td><td>Content briefs and coverage scoring</td><td>From ~$45/mo</td><td>Good for briefing writers at scale</td></tr>
      <tr><td>Screaming Frog</td><td>Technical crawling</td><td>Free to ~£200/yr</td><td>The standard crawler; free tier covers small sites</td></tr>
      <tr><td>An AI-visibility tracker</td><td>Whether ChatGPT, Gemini, Perplexity cite you</td><td>Varies</td><td>Add once you see AI referral traffic</td></tr>
    </tbody>
  </table>
  <figcaption>Prices move; check current plans. The point is which job each tool does.</figcaption>
</figure>

<h2>How far you get for free</h2>
<p>Further than most people admit:</p>
<ul>
  <li><strong>Measurement:</strong> Search Console and Analytics, free and more accurate than any third-party estimate for your own site.</li>
  <li><strong>Technical:</strong> a free crawler handles a few hundred URLs.</li>
  <li><strong>Keywords:</strong> free tools give volume and difficulty that are directionally right.</li>
</ul>
<p>You start paying when you need scale and history: full backlink indexes, months of rank data, large-site crawls.</p>

<h2>Three stacks, by budget</h2>
<figure class="chart">
  <figcaption>What to buy at each stage</figcaption>
  <div class="bars">
    <div class="bar"><span>Solo, under $50/mo</span><span class="bar-track"><span class="bar-fill" style="width:30%"></span></span><span class="bar-val">GSC + Analytics + one entry-tier all-in-one</span></div>
    <div class="bar"><span>Growing, $50 to $250/mo</span><span class="bar-track"><span class="bar-fill" style="width:60%"></span></span><span class="bar-val">Full all-in-one + a content tool</span></div>
    <div class="bar"><span>Agency / in-house team</span><span class="bar-track"><span class="bar-fill" style="width:95%"></span></span><span class="bar-val">All-in-one + standalone crawler + AI-visibility tracker</span></div>
  </div>
</figure>

<div class="callout"><p><strong>Never buy annual on day one.</strong> Run the trial on a real project. If the data does not match Search Console within a sane margin, the discount does not matter.</p></div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>MD Saiful Islam</strong> <span>&middot; Founder &amp; Head of SEO</span></p>
  <p>Write your current subscriptions next to the four jobs. Anything that does not map to one is a cancellation candidate. Most teams are paying for two tools that do the same thing.</p>
</div>

<h2>Before you enter a card number</h2>
<ul class="check-list">
  <li>You tested it on a real project, not a canned demo</li>
  <li>Its data lines up with Search Console within a reasonable margin</li>
  <li>The plan's limits match your actual usage, not the ceiling</li>
  <li>You are not already paying for another tool that does the same job</li>
  <li>Annual billing only after a month of real use</li>
</ul>
`,
    faqs: [
      {
        q: "Do I need a paid AI SEO tool, or is ChatGPT enough?",
        a: "For research, briefs and first drafts, a general AI assistant plus Search Console goes a long way. You pay for dedicated tools when you need backlink data, rank tracking at scale, or automated AI-citation monitoring.",
      },
      {
        q: "Which single tool should I start with?",
        a: "If you want one platform, an entry-tier all-in-one (Semrush or Ahrefs) plus the free Search Console covers most needs. Add a content-optimisation tool only if you publish frequently.",
      },
      {
        q: "Are AI writing tools bad for SEO?",
        a: "The tool is not the problem. AI-assisted content that adds first-hand experience, data and a real author is fine. Publishing raw AI output at volume with nothing new is what gets filtered.",
      },
    ],
  },

  // ================================================================
  "best-ai-seo-agencies": {
    title: "How to Choose an AI SEO Agency in 2026",
    metaTitle: "How to Choose an AI SEO Agency (2026) | SERP Mentor",
    metaDescription:
      "What an AI SEO agency actually does, the questions that separate good from bad, red flags to avoid, and how to compare proposals.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">"AI SEO agency" means very different things depending on who you ask. Some have genuinely rebuilt how they work. Some added "AI" to the homepage. Here is how to tell them apart before you sign anything.</p>

<h2>What an AI SEO agency should actually do</h2>
<ul>
  <li><strong>Classic SEO, done well.</strong> Technical health, content, links. AI does not replace this; it accelerates it.</li>
  <li><strong>AI-search visibility.</strong> Getting you cited in AI Overviews, ChatGPT, Perplexity and Gemini, and tracking it.</li>
  <li><strong>Faster execution.</strong> AI for research, briefs, first drafts and analysis, so more of the budget goes to strategy and shipping.</li>
  <li><strong>Reporting tied to revenue,</strong> not vanity charts.</li>
</ul>

<h2>The questions that separate good from bad</h2>
<figure>
  <table>
    <thead><tr><th>Ask</th><th>Good answer sounds like</th></tr></thead>
    <tbody>
      <tr><td>How do you use AI in the work?</td><td>Specific: research, briefs, drafts, then human editing and first-hand input</td></tr>
      <tr><td>Who writes the final content?</td><td>Named humans with subject knowledge, editing every piece</td></tr>
      <tr><td>How do you measure AI-search visibility?</td><td>A monthly prompt log or tool, tracked over time</td></tr>
      <tr><td>What happened to a client hit by a core update?</td><td>A real story with segmentation and recovery, not silence</td></tr>
      <tr><td>What does success look like in 6 months?</td><td>Leads or revenue targets, not just "more traffic"</td></tr>
    </tbody>
  </table>
</figure>

<h2>Red flags</h2>
<ul>
  <li>Guaranteed rankings or a guaranteed number of links.</li>
  <li>Content produced at a volume no human could edit.</li>
  <li>No named team, no case studies with numbers.</li>
  <li>"AI" everywhere on the site, nothing specific about the process.</li>
  <li>Long lock-in contracts with no exit.</li>
</ul>

<div class="callout"><p><strong>Here is the deal:</strong> the agencies worth hiring are the ones that could explain their process without the word "AI" in it, and are using AI to do that process faster and at higher quality. If "AI" is the whole pitch, keep looking.</p></div>

<h2>How to compare proposals</h2>
<ol>
  <li>Line up scope: what is actually included each month?</li>
  <li>Check the deliverables are specific: "4 optimised pages", not "content".</li>
  <li>Confirm you own everything produced.</li>
  <li>Ask for two references in your industry or a similar one.</li>
  <li>Start with a paid audit or a short engagement before a long commitment.</li>
</ol>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Sharif Mohammad Ashik</strong> <span>&middot; Director of Operations</span></p>
  <p>Judge an agency on how they handle the first audit call. Do they ask about your business and your customers, or do they talk about their tools? The good ones lead with your problem.</p>
</div>

<h2>Choosing an agency checklist</h2>
<ul class="check-list">
  <li>They can explain the process without leaning on "AI"</li>
  <li>Named humans write and edit the content</li>
  <li>They measure AI-search visibility, not just rankings</li>
  <li>Reporting is tied to leads or revenue</li>
  <li>Case studies include real numbers</li>
  <li>You can start small and exit without penalty</li>
</ul>
`,
    faqs: [
      {
        q: "Is an AI SEO agency different from a normal SEO agency?",
        a: "The best ones do the same core work, faster and with AI-search visibility added. Be wary of any agency where 'AI' is the whole differentiator rather than a way to do proven work better.",
      },
      {
        q: "How much should an AI SEO agency cost?",
        a: "It varies widely by scope and market. Expect a monthly retainer for ongoing work or a fixed fee for a defined project. Get the scope and deliverables in writing so you can compare like for like.",
      },
      {
        q: "Should I hire an agency or an in-house SEO?",
        a: "An agency gives you a team and breadth quickly. In-house gives you focus and institutional knowledge. Many companies use an agency to build momentum, then hire in-house to sustain it.",
      },
    ],
  },

  // ================================================================
  "seo-case-study-on-forex-niche": {
    title: "SEO Case Study: 700% Organic Growth for a Forex Site in 8 Months",
    metaTitle: "SEO Case Study: 700% Growth in 8 Months | SERP Mentor",
    metaDescription:
      "How we grew a forex niche site's organic traffic 700% in eight months: keyword mapping, a silo structure, trained writers, and E-E-A-T assets.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">This is a real project, with the strategy laid out step by step. Forex is one of the hardest niches in SEO: YMYL scrutiny, heavy competition, and a lot of low-quality content to compete against. Here is what worked.</p>

<h2>The starting point</h2>
<div class="stat-grid">
  <div class="stat"><b>~1,900</b><span>organic sessions per month at the start</span></div>
  <div class="stat"><b>8 months</b><span>to the result below</span></div>
  <div class="stat"><b>~15,000</b><span>organic sessions per month at month 8</span></div>
</div>
<p>The site had thin content, no clear structure, weak author signals, and no linkable assets. It was competing on the same terms as everyone else and losing.</p>

<h2>The three problems we had to fix</h2>
<ul>
  <li><strong>The message.</strong> Content was shallow and undifferentiated, with no real expertise shown.</li>
  <li><strong>The engine.</strong> Technical foundation was slow and the architecture was flat.</li>
  <li><strong>The engagement.</strong> Poor user experience meant even ranking pages did not convert.</li>
</ul>

<h2>Step 1: Keyword research and intent mapping</h2>
<p>We mapped every query a forex trader runs, grouped by funnel stage, and matched each to a page type. Broker comparisons and bonuses at the bottom, education in the middle, news and definitions at the top.</p>

<h2>Step 2: Content strategy and writer training</h2>
<p>Forex content fails when writers do not understand trading. We built a training brief covering the concepts, the regulations, and the compliance language, then had every draft reviewed by someone who trades.</p>

<h2>Step 3: Four content silos</h2>
<figure>
  <table>
    <thead><tr><th>Silo</th><th>Job</th></tr></thead>
    <tbody>
      <tr><td>Broker reviews and comparisons</td><td>The conversion engine: bottom-of-funnel, high commercial intent</td></tr>
      <tr><td>Bonuses and promotions</td><td>The transactional funnel: time-sensitive, high-converting</td></tr>
      <tr><td>Foundational guides and education</td><td>E-E-A-T builder: depth that proves expertise</td></tr>
      <tr><td>Original research and data</td><td>Backlink and trust assets: something to cite</td></tr>
    </tbody>
  </table>
</figure>

<h2>Step 4: Technical and E-E-A-T</h2>
<ul>
  <li>Rebuilt the templates for speed and green Core Web Vitals.</li>
  <li>Added named authors with trading credentials and a visible editorial and fact-checking process.</li>
  <li>Cited regulators and primary sources on every claim.</li>
  <li>Tight internal linking within each silo, and between silos where it made sense.</li>
</ul>

<h2>Step 5: Links from the research assets</h2>
<p>The original research silo produced two data studies. We pitched them to finance and trading publications. The links that came back lifted the whole domain, not just the study pages.</p>

<figure class="chart">
  <figcaption>Organic sessions per month over the engagement</figcaption>
  <div class="bars">
    <div class="bar"><span>Month 0</span><span class="bar-track"><span class="bar-fill" style="width:13%"></span></span><span class="bar-val">~1,900</span></div>
    <div class="bar"><span>Month 3</span><span class="bar-track"><span class="bar-fill" style="width:33%"></span></span><span class="bar-val">~4,800</span></div>
    <div class="bar"><span>Month 6</span><span class="bar-track"><span class="bar-fill" style="width:66%"></span></span><span class="bar-val">~10,000</span></div>
    <div class="bar"><span>Month 8</span><span class="bar-track"><span class="bar-fill" style="width:100%"></span></span><span class="bar-val">~15,000</span></div>
  </div>
</figure>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>MD Saiful Islam</strong> <span>&middot; Founder &amp; Head of SEO</span></p>
  <p>The silo structure did the heavy lifting. Once Google saw us cover broker reviews completely, new review pages started ranking in days instead of months. Topical authority is not a buzzword; it is compounding.</p>
</div>

<h2>What we would tell you to copy</h2>
<ul class="check-list">
  <li>Map keywords to funnel stage and page type before writing</li>
  <li>Train writers on the actual subject, then review every draft</li>
  <li>Build tight silos and finish one before starting the next</li>
  <li>Invest in real author and editorial signals, especially in YMYL</li>
  <li>Turn one silo into linkable research assets</li>
</ul>
`,
    faqs: [
      {
        q: "Is 700% growth realistic for any site?",
        a: "The percentage is large partly because the starting point was low. The strategy, silos, trained writers, E-E-A-T and research-led links, is repeatable; the exact multiplier depends on your niche, competition and starting authority.",
      },
      {
        q: "How long before a new site sees results like this?",
        a: "This site had some existing authority. A brand-new domain in a competitive niche would take longer, typically 12 months or more, and the first two months are usually flat while the domain earns trust.",
      },
      {
        q: "Does this work in regulated niches like forex or finance?",
        a: "Yes, but the E-E-A-T bar is higher. Named experts, visible credentials, primary-source citations and a published editorial process are not optional in YMYL niches.",
      },
    ],
  },

  // ================================================================
  "niche-sites-ideas": {
    title: "Niche Site Marketing in 2026: A Beginner's Guide",
    metaTitle: "Niche Site Marketing in 2026: Beginner's Guide | SERP Mentor",
    metaDescription:
      "How to pick a profitable micro-niche, validate demand, build topical authority, and monetise a niche site that survives the core updates.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">Niche sites got a bad name because thousands of thin ones got wiped out in the core updates. But focused sites with real depth still work. The model did not break. Lazy execution did.</p>

<h2>What a niche site is</h2>
<p>A niche site targets one narrow topic and monetises the audience, usually through affiliate commissions, ads, or its own products. The whole model rests on ranking for a cluster of related searches.</p>

<h2>Niche site vs authority site</h2>
<figure>
  <table>
    <thead><tr><th></th><th>Niche site</th><th>Authority site</th></tr></thead>
    <tbody>
      <tr><td>Scope</td><td>One narrow topic</td><td>A broad space with sub-topics</td></tr>
      <tr><td>Speed to rank</td><td>Faster on the niche</td><td>Slower, bigger ceiling</td></tr>
      <tr><td>Risk</td><td>One topic, one algorithm</td><td>Spread across topics</td></tr>
      <tr><td>Best for</td><td>Learning, first income</td><td>Long-term asset</td></tr>
    </tbody>
  </table>
</figure>
<p>Start niche. Once it works, it can grow into an authority site.</p>

<h2>Step 1: Find a profitable micro-niche</h2>
<p>You want a topic that is:</p>
<ul>
  <li><strong>Specific enough</strong> that you can cover it completely.</li>
  <li><strong>Big enough</strong> that people search it consistently.</li>
  <li><strong>Monetisable</strong> through products people buy or content advertisers want.</li>
  <li><strong>Not dominated</strong> by huge, fresh, authoritative sites.</li>
</ul>

<h2>Step 2: Validate the demand</h2>
<p>Do not trust a gut feeling. Check:</p>
<ol>
  <li>Search volume across the main queries in the niche.</li>
  <li>What the top 10 look like: are there weak pages you could beat?</li>
  <li>Whether people spend money: are there products, courses, or advertisers?</li>
  <li>Marketplaces: are similar sites selling, and for what multiple?</li>
</ol>

<h2>Step 3: Build topical authority</h2>
<p>This is where most niche sites fail. Do not publish one post per keyword and hope. Pick one subtopic, map every question in it, and publish the pillar plus the full cluster before moving on.</p>

<figure class="chart">
  <figcaption>Two approaches, same 40 posts</figcaption>
  <div class="bars">
    <div class="bar"><span>40 posts, 1 topic, fully covered</span><span class="bar-track"><span class="bar-fill" style="width:88%"></span></span><span class="bar-val">ranks and compounds</span></div>
    <div class="bar"><span>40 posts, 8 topics, half-covered</span><span class="bar-track"><span class="bar-fill is-muted" style="width:22%"></span></span><span class="bar-val">ranks for little</span></div>
  </div>
</figure>

<h2>Step 4: Monetise</h2>
<ul>
  <li><strong>Affiliate:</strong> comparison and "best" content, honest reviews with real testing.</li>
  <li><strong>Display ads:</strong> once traffic is high enough for a good ad network.</li>
  <li><strong>Own product:</strong> a course, a tool, a template, once you have an audience.</li>
</ul>

<div class="callout"><p><strong>Here is the deal:</strong> the affiliate sites that survived the updates all had first-hand testing, real photos, named authors, and content that named the downsides. The ones that died were spec sheets rewritten from Amazon.</p></div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Tanbir Habib Riyad</strong> <span>&middot; SEO Trainer &amp; Content Strategist</span></p>
  <p>Pick a niche you can genuinely speak to, or are willing to become genuinely good at. The updates now reward first-hand experience so heavily that faking interest in a topic is a losing strategy.</p>
</div>

<h2>Niche site checklist</h2>
<ul class="check-list">
  <li>The niche is specific, has demand, and is monetisable</li>
  <li>The top 10 for your main queries include beatable pages</li>
  <li>Content is built as full clusters, not one post per keyword</li>
  <li>Reviews include first-hand testing, photos and honest downsides</li>
  <li>A named author with a real bio and visible experience</li>
  <li>One topic owned completely before starting the next</li>
</ul>
`,
    faqs: [
      {
        q: "Are niche sites dead after the Google updates?",
        a: "No. Thin, mass-produced niche sites were hit hard. Focused sites with genuine expertise, first-hand testing and full topic coverage still rank and generate income.",
      },
      {
        q: "How long until a niche site makes money?",
        a: "Typically 6 to 12 months to meaningful traffic, longer to significant income. The flat first few months are normal while the domain builds trust and the clusters mature.",
      },
      {
        q: "How much content does a niche site need to start?",
        a: "Enough to cover one subtopic completely, often 15 to 30 strong pages around a pillar. Depth on a narrow topic beats a large volume of shallow posts.",
      },
    ],
  },

  // ================================================================
  "best-linkedin-free-ai-tools": {
    title: "The Best Free AI Tools for LinkedIn Growth",
    metaTitle: "Best Free AI Tools for LinkedIn Growth (2026) | SERP Mentor",
    metaDescription:
      "The free AI tools that actually help you post consistently on LinkedIn: idea generation, drafting, research, scheduling and visuals, plus how to use them.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">LinkedIn growth is a consistency problem, not a talent problem. The people who win post useful things regularly. AI tools do not write your posts for you, but they remove the friction that stops you posting at all. Here are the free ones worth using.</p>

<h2>The workflow these tools support</h2>
<ol>
  <li><strong>Ideas:</strong> turn your expertise and this week's work into post angles.</li>
  <li><strong>Drafting:</strong> get from a blank page to a rough draft fast.</li>
  <li><strong>Research:</strong> check facts, find data, add a stat.</li>
  <li><strong>Visuals:</strong> a simple graphic or carousel.</li>
  <li><strong>Scheduling:</strong> post at a consistent time without being online.</li>
</ol>

<h2>The tools</h2>
<figure>
  <table>
    <thead><tr><th>Tool</th><th>Use it for</th><th>Free tier</th></tr></thead>
    <tbody>
      <tr><td>ChatGPT / Claude</td><td>Idea generation, drafting, editing, repurposing</td><td>Generous free tiers</td></tr>
      <tr><td>Perplexity</td><td>Research, finding a current stat with a source</td><td>Free with limits</td></tr>
      <tr><td>Canva</td><td>Post graphics and carousels</td><td>Free plan covers most needs</td></tr>
      <tr><td>A scheduling tool's free plan</td><td>Consistent posting time</td><td>Usually limited posts per month</td></tr>
    </tbody>
  </table>
</figure>

<h2>How to use them without sounding like a robot</h2>
<ul>
  <li><strong>Start from your own take.</strong> Tell the AI your opinion and the specific thing you saw this week. Ask it to structure, not to source.</li>
  <li><strong>Keep your voice.</strong> Paste three of your old posts and ask it to match the style. Then edit until it sounds like you.</li>
  <li><strong>Add the detail only you have.</strong> The number from your project. The client reaction. The mistake you made. That is what stops the post being generic.</li>
  <li><strong>Cut the AI tells.</strong> Delete "In today's fast-paced world", "It's important to note", and every sentence that could apply to anyone.</li>
</ul>

<div class="callout"><p><strong>Here is the deal:</strong> AI gets you to a draft in five minutes instead of an hour. The value it adds is removing the excuse not to post. The value you add is everything that makes the post worth reading.</p></div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Milon Khan</strong> <span>&middot; Link Building &amp; Digital PR Lead</span></p>
  <p>The posts that land for us are the ones with a specific number or a specific story. AI is great for the frame. It is terrible at inventing the detail that makes people stop scrolling. Bring that yourself.</p>
</div>

<h2>A simple weekly routine</h2>
<ul class="check-list">
  <li>Sunday: brain-dump 5 things you learned or did this week</li>
  <li>Turn each into a post angle with AI, pick the 2 or 3 best</li>
  <li>Draft with AI, then edit hard for voice and specifics</li>
  <li>Add one visual where it helps</li>
  <li>Schedule for the same time each day</li>
  <li>Reply to every comment for the first hour</li>
</ul>
`,
    faqs: [
      {
        q: "Will LinkedIn penalise AI-assisted posts?",
        a: "There is no penalty for using AI to help write. What performs badly is generic, low-effort content that reads like a template. Use AI to draft faster, then make the post specific and useful.",
      },
      {
        q: "Which free AI tool is best for LinkedIn?",
        a: "A general assistant like ChatGPT or Claude for ideas and drafting, plus Perplexity for research and Canva for visuals. That covers the whole workflow at no cost.",
      },
      {
        q: "How often should I post on LinkedIn?",
        a: "Consistency beats frequency. Three genuinely useful posts a week, every week, outperforms daily posting that you burn out on after a month.",
      },
    ],
  },

  // ================================================================
  "dofollow-backlink-sites": {
    title: "Dofollow Backlink Sites: How to Use Them Without Getting Burned",
    metaTitle: "Dofollow Backlink Sites: The Practical Guide (2026) | SERP Mentor",
    metaDescription:
      "What a dofollow backlink actually is, which categories of link sites are still worth your time in 2026, and the outreach approach that works.",
    updated: UPDATED,
    bodyHtml: `
<p class="prose-lede">Lists of "500 free backlink sites" are everywhere, and most of them will do nothing for you. A few categories still work. Here is which ones, why, and how to use them without leaving a footprint.</p>

<h2>What a dofollow backlink is</h2>
<p>A dofollow link is a normal link that passes ranking signals from the linking page to yours. A nofollow link tells Google not to pass those signals, though it can still send traffic and build awareness.</p>
<p>What matters is not the attribute. It is whether a real person on a relevant page chose to link to you because it helped their reader.</p>

<h2>The five checks for any link</h2>
<figure>
  <table>
    <thead><tr><th>Check</th><th>Pass looks like</th></tr></thead>
    <tbody>
      <tr><td>Relevance</td><td>The linking page is about your topic</td></tr>
      <tr><td>Editorial</td><td>A person added it, not a form or a swap</td></tr>
      <tr><td>Placement</td><td>In the body, near the top</td></tr>
      <tr><td>Traffic</td><td>The page has real visitors</td></tr>
      <tr><td>Anchor text</td><td>Reads naturally, not exact-match every time</td></tr>
    </tbody>
  </table>
</figure>

<h2>Link source categories, ranked</h2>
<figure class="chart">
  <figcaption>By value earned and risk carried</figcaption>
  <div class="bars">
    <div class="bar"><span>Editorial links from digital PR</span><span class="bar-track"><span class="bar-fill" style="width:95%"></span></span><span class="bar-val">high value, low risk</span></div>
    <div class="bar"><span>Guest posts on real publications</span><span class="bar-track"><span class="bar-fill" style="width:60%"></span></span><span class="bar-val">medium</span></div>
    <div class="bar"><span>Niche resource pages and directories</span><span class="bar-track"><span class="bar-fill" style="width:45%"></span></span><span class="bar-val">low to medium</span></div>
    <div class="bar"><span>Profile, Web 2.0, article-submission sites</span><span class="bar-track"><span class="bar-fill is-muted" style="width:20%"></span></span><span class="bar-val">low, use sparingly</span></div>
    <div class="bar"><span>Blog comment and forum-signature links</span><span class="bar-track"><span class="bar-fill is-muted" style="width:8%"></span></span><span class="bar-val">near zero</span></div>
  </div>
</figure>

<h2>The categories still worth your time</h2>
<ul>
  <li><strong>Industry directories and association listings.</strong> Real, relevant, and often authoritative.</li>
  <li><strong>Resource pages.</strong> Curated lists of the best content on a topic. Earn a spot with genuinely useful content.</li>
  <li><strong>Guest contributions to publications your buyers read.</strong> A handful, not farms.</li>
  <li><strong>Digital PR.</strong> The best returns: original data pitched to journalists.</li>
  <li><strong>HARO-style source requests.</strong> Fast, contextual links from a good answer.</li>
</ul>

<h2>The outreach approach that works</h2>
<ol>
  <li>Make something worth linking to first. Outreach only speeds up links a page would earn anyway.</li>
  <li>Build a relevance-first prospect list, not a domain-rating list.</li>
  <li>Read the linking page before you email. Reference something specific.</li>
  <li>Make one clear, low-friction ask.</li>
  <li>Follow up once, then move on.</li>
</ol>

<div class="callout"><p><strong>Warning:</strong> mass-submitting to profile and Web 2.0 sites with exact-match anchors is a footprint, not a strategy. A handful of these for brand and diversity is fine. Hundreds is a risk with almost no upside.</p></div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Milon Khan</strong> <span>&middot; Link Building &amp; Digital PR Lead</span></p>
  <p>Before we build a single new link, we reclaim lost ones and convert unlinked brand mentions. It is faster, free, and safer than any list of submission sites, and almost every site has a dozen waiting.</p>
</div>

<h2>Link building checklist</h2>
<ul class="check-list">
  <li>You have a genuinely linkable asset live</li>
  <li>Prospects are scored by relevance and real traffic, not DR</li>
  <li>Outreach is personalised and specific</li>
  <li>Anchor text is varied and natural</li>
  <li>Low-value submission links are used sparingly, if at all</li>
  <li>Lost links reclaimed and unlinked mentions converted first</li>
</ul>
`,
    faqs: [
      {
        q: "Are free backlink sites worth using?",
        a: "A few categories are: real industry directories, resource pages and source-request platforms. Bulk profile, article-submission and comment sites are mostly worthless and can look manipulative at scale.",
      },
      {
        q: "How many backlinks do I need to rank?",
        a: "There is no set number. Look at the pages ranking in the top 5 for your query and roughly match the relevance and quality of their links. Ten strong, relevant links beat a hundred weak ones.",
      },
      {
        q: "Do dofollow links always beat nofollow?",
        a: "Dofollow links pass ranking signals, so they carry more direct SEO weight. But nofollow links from high-traffic, relevant pages still drive visitors, build your brand and often lead to follow links later. A natural profile has both.",
      },
    ],
  },
};
