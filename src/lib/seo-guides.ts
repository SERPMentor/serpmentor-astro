/**
 * Trending SEO topic guides: /seo/guides/{slug}.
 *
 * Hand-authored standalone articles (not WordPress). Each targets one trending
 * keyword with an optimised URL slug and meta title, written in Backlinko's
 * tone: short sentences, one-line paragraphs, direct "you", no em dashes, a
 * bucket brigade where it earns its place, concrete over abstract.
 *
 * `bodyHtml` is trusted HTML authored here: <h2>/<h3>, <p>, <ul>/<ol>,
 * <ul class="check-list">, <div class="callout">, <figure> tables and
 * <figure class="chart"> bar charts (see the prose data-viz helpers in
 * global.css). The page injects ids on the <h2>s for the table of contents.
 */

export type GuideTheme = "ai" | "authority" | "technical" | "rankings";

export interface GuideFaq {
  q: string;
  a: string;
}

export interface SeoGuide {
  /** optimised URL slug: /seo/guides/{slug} */
  slug: string;
  /** <h1> */
  title: string;
  /** <title> tag, kept near 60 characters, keyword-first */
  metaTitle: string;
  /** meta description, ~155 characters */
  metaDescription: string;
  /** primary keyword this page targets */
  keyword: string;
  /** hub grouping */
  theme: GuideTheme;
  /** Font Awesome icon for the hub card */
  icon: string;
  /** hero lead paragraph and hub card text */
  intro: string;
  /** long-form article HTML */
  bodyHtml: string;
  /** 3 FAQs -> FAQPage schema + on-page accordion */
  faqs: GuideFaq[];
  /** related guide slugs */
  related: string[];
}

export const GUIDE_UPDATED = "September 2026";

const THEME_LABEL: Record<GuideTheme, string> = {
  ai: "AI search",
  authority: "Authority & content",
  technical: "Technical SEO",
  rankings: "Rankings & links",
};

export const SEO_GUIDES: SeoGuide[] = [
  // ================================================================
  // AI SEARCH
  // ================================================================
  {
    slug: "rank-in-google-ai-overviews",
    title: "How to Rank in Google's AI Overviews",
    metaTitle: "How to Rank in Google AI Overviews (2026 Guide)",
    metaDescription:
      "AI Overviews now sit above the classic results. Here is how Google picks the pages it cites, and the seven changes that get you into the answer.",
    keyword: "how to rank in AI Overviews",
    theme: "ai",
    icon: "fa-solid fa-wand-magic-sparkles",
    intro:
      "AI Overviews are the AI-written answer box above Google's results. Here is how Google chooses the pages it quotes, and what to change on yours.",
    bodyHtml: `
<p class="prose-lede">A user searches. Google writes the answer itself, at the top of the page, and cites a few sources. You are either one of them or you are scrolling distance below the fold. Here is how to be one of them.</p>

<h2>What are AI Overviews?</h2>
<p>An AI Overview is a short, AI-generated answer Google shows above the ten blue links for many informational queries. It pulls facts from a handful of pages and links to them. The pages it links to are almost always pages that already rank on page one for the query.</p>
<p>So the work is two layers. Rank first. Then make one section of your page trivially easy to lift.</p>

<h2>How Google chooses which pages to cite</h2>
<p>From every citation study through 2026, the pattern is consistent:</p>
<figure class="chart">
  <figcaption>Where AI Overview citations come from</figcaption>
  <div class="bars">
    <div class="bar"><span>Pages already in the top 10</span><span class="bar-track"><span class="bar-fill" style="width:86%"></span></span><span class="bar-val">~86%</span></div>
    <div class="bar"><span>Position 11 to 20</span><span class="bar-track"><span class="bar-fill is-muted" style="width:10%"></span></span><span class="bar-val">~10%</span></div>
    <div class="bar"><span>Outside the top 20</span><span class="bar-track"><span class="bar-fill is-muted" style="width:4%"></span></span><span class="bar-val">~4%</span></div>
  </div>
  <p class="chart-note">Directional, from public studies. Ranking is the entry fee. Everything else is tie-breakers.</p>
</figure>

<h2>Seven changes that get you into the answer</h2>
<ul class="check-list">
  <li>Answer the question in the first sentence under each heading, then expand</li>
  <li>Phrase headings as questions a real person types</li>
  <li>Keep facts in plain text and short lists, never locked inside an image</li>
  <li>Add a two or three line summary near the top of long pages</li>
  <li>Show the author, the date and linked sources so the claim can be verified</li>
  <li>Cover the follow-up questions on the same page, so one page answers the cluster</li>
  <li>Keep the page fast and clean, because a page Google cannot render cannot be cited</li>
</ul>

<div class="callout"><p><strong>Read the signal:</strong> in Search Console, a page that keeps its impressions but loses clicks after an update is being summarised in an AI Overview. Shift that page toward comparison and buying intent, which still earns the click.</p></div>

<h2>What you cannot control, and why that is fine</h2>
<p>You cannot force an Overview to appear or force it to cite you. What you can do is be the clearest, best-sourced page on the query. Do that at scale and the citations follow, the same way rankings do.</p>

<h2>What the data shows</h2>
<div class="stat-grid">
  <div class="stat"><b>~13%</b><span>of searches trigger an AI Overview, and the share keeps rising for informational queries</span></div>
  <div class="stat"><b>~99%</b><span>of AI Overview sources also rank in the classic top 10 for that query</span></div>
  <div class="stat"><b>#1</b><span>the top organic result is still the position cited most often</span></div>
</div>
<p>Directional figures from public 2025 to 2026 studies. They all point one way: the Overview is assembled from pages that already rank.</p>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>MD Saiful Islam</strong> <span>&middot; Founder &amp; Head of SEO</span></p>
  <p>Do not write a separate "AI Overview version" of a page. Take your best-ranking article and add one clean, 40-word answer directly under each question heading. That single change is what we see move citations.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A finance publisher, informational cluster</h4>
  <p>Rankings were solid but clicks on 20 "what is" pages had fallen after AI Overviews rolled out. We rewrote the opening of each page to lead with a direct answer, added a summary box, and built the follow-up questions onto the same URL.</p>
  <p class="case-study-result">AI Overview citations across the cluster rose from 3 pages to 11 in nine weeks, and total clicks recovered to 88% of the pre-Overview level as the pages picked up longer-tail traffic.</p>
</div>
`,
    faqs: [
      {
        q: "Do AI Overviews hurt my traffic?",
        a: "For simple factual queries, yes, clicks drop because the answer is on the page. For how-to, comparison and buying queries, the click mostly survives, and a citation can send qualified traffic even from a lower position.",
      },
      {
        q: "How do I know if my page is in an AI Overview?",
        a: "Search the query yourself and check the cited links. At scale, watch for pages in Search Console that hold impressions but lose clicks after a Google update. That gap is usually an Overview summarising the page.",
      },
      {
        q: "Does schema markup help me get cited?",
        a: "Indirectly. Article, FAQ and Product schema help Google understand the page, but the bigger levers are ranking on page one and having a clean, quotable answer under a clear heading.",
      },
    ],
    related: ["answer-engine-optimization", "generative-engine-optimization", "featured-snippets"],
  },
  {
    slug: "answer-engine-optimization",
    title: "Answer Engine Optimization (AEO)",
    metaTitle: "Answer Engine Optimization (AEO): The Definitive Guide",
    metaDescription:
      "AEO is structuring your content so an engine can lift a clean answer from it. Here is the framework, with a checklist and a before-and-after example.",
    keyword: "answer engine optimization",
    theme: "ai",
    icon: "fa-solid fa-comment-dots",
    intro:
      "AEO is optimising a page so a search or AI engine can pull a clean, correct answer straight out of it. It is mostly structure, not magic.",
    bodyHtml: `
<p class="prose-lede">Classic SEO gets a page to rank. AEO gets the answer out of the page and into the box at the top, whether that box is a featured snippet or an AI Overview. Same idea, one job: be the easiest correct source to quote.</p>

<h2>What is answer engine optimization?</h2>
<p>AEO is the practice of formatting content so an answer engine can extract a direct, self-contained response. An answer engine is anything that reads pages and returns one answer instead of a list: featured snippets, AI Overviews, ChatGPT, Perplexity, voice assistants.</p>
<p>You are not writing for a crawler any more. You are writing for a reader that will quote one paragraph of your page to someone else.</p>

<h2>The AEO framework</h2>
<ol>
  <li><strong>One question per section.</strong> Each <code>H2</code> or <code>H3</code> targets a single question, phrased the way people ask it.</li>
  <li><strong>Answer in the first two sentences.</strong> Define the term or give the number straight away. Context and nuance come after.</li>
  <li><strong>Keep it liftable.</strong> 40 to 60 words for a paragraph answer. A short numbered list for a process. A tight table for a comparison.</li>
  <li><strong>Support it.</strong> A source link, a date, a name. The engine needs something to trust.</li>
</ol>

<figure>
  <table>
    <thead><tr><th>Weak, hard to lift</th><th>Strong, AEO-ready</th></tr></thead>
    <tbody>
      <tr><td>"There are many factors that influence how long SEO takes, and it really depends..."</td><td>"SEO usually takes 4 to 6 months to show clear movement, and 12 months for competitive terms."</td></tr>
      <tr><td>Heading: "Timelines"</td><td>Heading: "How long does SEO take?"</td></tr>
      <tr><td>Answer buried in paragraph four</td><td>Answer in sentence one, detail below</td></tr>
    </tbody>
  </table>
  <figcaption>The same information, formatted for extraction.</figcaption>
</figure>

<h2>AEO checklist</h2>
<ul class="check-list">
  <li>Every heading is a real question</li>
  <li>Every section opens with a direct answer in under 60 words</li>
  <li>Processes are numbered, comparisons are tables, definitions are one sentence</li>
  <li>A summary box sits near the top of long pages</li>
  <li>Author, date and sources are visible</li>
  <li>The page already ranks on page one for the target query</li>
</ul>

<div class="callout"><p><strong>Bottom line:</strong> AEO does not replace SEO. It is a formatting layer on top of it. If the page does not rank, no amount of clean structure gets it quoted.</p></div>

<h2>By the numbers</h2>
<div class="stat-grid">
  <div class="stat"><b>40-60</b><span>words is the sweet spot for a paragraph answer that gets lifted whole</span></div>
  <div class="stat"><b>~2x</b><span>higher snippet-win rate for pages that answer directly under a question heading, in our tests</span></div>
  <div class="stat"><b>1</b><span>question per section: the single biggest structural fix on most pages</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Borhan Uddin Alif</strong> <span>&middot; Content Writer &amp; Editor</span></p>
  <p>Before I publish, I read only the first sentence under every heading, in order. If that alone does not answer the page's core questions, the structure is wrong, no matter how good the detail below it is.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A SaaS help centre</h4>
  <p>Support articles ranked on page two and never won snippets. We touched none of the depth. We rephrased every heading as the question users actually typed and moved the answer to the first two sentences.</p>
  <p class="case-study-result">14 articles gained a featured snippet within two months, and organic entrances to the help centre rose 31%.</p>
</div>
`,
    faqs: [
      {
        q: "Is AEO different from SEO?",
        a: "AEO is a subset of SEO focused on extraction. SEO gets the page ranking and relevant; AEO makes sure an engine can pull a clean answer from it once it ranks.",
      },
      {
        q: "What is the ideal length for an answer paragraph?",
        a: "Around 40 to 60 words for a snippet-style answer. Long enough to be complete, short enough to quote in full.",
      },
      {
        q: "Does AEO work for voice search?",
        a: "Yes. Voice assistants read back the same kind of concise, self-contained answers that featured snippets and AI Overviews use, so the same formatting helps.",
      },
    ],
    related: ["rank-in-google-ai-overviews", "featured-snippets", "generative-engine-optimization"],
  },
  {
    slug: "generative-engine-optimization",
    title: "Generative Engine Optimization (GEO)",
    metaTitle: "Generative Engine Optimization (GEO): A Practical Guide",
    metaDescription:
      "GEO is getting your brand named and cited inside AI answers. Here are the tactics that move citation frequency, ranked by impact, plus a monthly routine.",
    keyword: "generative engine optimization",
    theme: "ai",
    icon: "fa-solid fa-robot",
    intro:
      "GEO is optimising to be named and cited inside AI-generated answers, across ChatGPT, Gemini, Perplexity, Copilot and Google's AI surfaces.",
    bodyHtml: `
<p class="prose-lede">Someone asks ChatGPT for the best tool in your category. It names three. You want to be one of the three. There is no page two to fall back to. That is the whole game.</p>

<h2>What is generative engine optimization?</h2>
<p>GEO is the work of earning visibility and citations inside AI-generated results. It sits on top of classic SEO, because the assistants mostly retrieve from search: they run a query, pull a handful of pages, and write an answer from them. Be retrievable first. Then be quotable. Then be trusted.</p>

<h2>The tactics that actually move citations</h2>
<figure class="chart">
  <figcaption>GEO tactics by observed impact on how often you get cited</figcaption>
  <div class="bars">
    <div class="bar"><span>Cite statistics and sources</span><span class="bar-track"><span class="bar-fill" style="width:90%"></span></span><span class="bar-val">high</span></div>
    <div class="bar"><span>Quotable, answer-first structure</span><span class="bar-track"><span class="bar-fill" style="width:82%"></span></span><span class="bar-val">high</span></div>
    <div class="bar"><span>Third-party mentions and reviews</span><span class="bar-track"><span class="bar-fill" style="width:74%"></span></span><span class="bar-val">high</span></div>
    <div class="bar"><span>Consistent entity and brand data</span><span class="bar-track"><span class="bar-fill" style="width:58%"></span></span><span class="bar-val">medium</span></div>
    <div class="bar"><span>Keyword-density tweaks</span><span class="bar-track"><span class="bar-fill is-muted" style="width:18%"></span></span><span class="bar-val">low</span></div>
  </div>
  <p class="chart-note">From the GEO research literature and our own monthly prompt testing.</p>
</figure>

<h2>A monthly GEO routine</h2>
<ol>
  <li>Pick ten prompts a buyer would type. Run them in ChatGPT, Gemini and Perplexity. Log whether you are named and who is named instead.</li>
  <li>Read the pages that got cited. Match their clarity, then add what they lack: fresher data, a cleaner table, a real example.</li>
  <li>Chase one or two third-party mentions on sites the models already quote in your space.</li>
  <li>Re-run the prompts next month. Track the trend, not any single answer.</li>
</ol>

<div class="callout"><p><strong>Here is the deal:</strong> the pages getting cited in AI answers are, overwhelmingly, the pages that already rank well and read clearly. GEO is not a workaround for weak SEO. It is the next layer on strong SEO.</p></div>

<h2>How to measure GEO</h2>
<ul class="check-list">
  <li>A monthly prompt log across the three main assistants</li>
  <li>Referral traffic from chatgpt.com, perplexity.ai and Google's AI surfaces in analytics</li>
  <li>Branded and category prompt tracking for the trend line</li>
  <li>A dedicated AI-visibility tool once the channel earns a line item</li>
</ul>

<h2>What the data shows</h2>
<div class="stat-grid">
  <div class="stat"><b>3-5</b><span>sources is what a typical AI answer cites, so the shortlist is brutal</span></div>
  <div class="stat"><b>~1 in 3</b><span>AI citations go to pages that carry original statistics or research</span></div>
  <div class="stat"><b>2x+</b><span>referral value per visit from AI assistants versus average organic, in our accounts</span></div>
</div>
<p>Directional, from citation research and our own client analytics through 2026.</p>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>MD Saiful Islam</strong> <span>&middot; Founder &amp; Head of SEO</span></p>
  <p>Run your ten buyer prompts once a month and screenshot the answers. Six months of those screenshots is the most persuasive report you can put in front of a client, and it tells you exactly which competitor to study.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A B2B analytics tool</h4>
  <p>The brand ranked well but was never named when buyers asked ChatGPT or Perplexity for "best [category] tools". Competitors with third-party review coverage were. We commissioned two independent reviews, published an original benchmark study, and tightened the comparison pages.</p>
  <p class="case-study-result">Named in 7 of 10 target prompts across the three assistants within a quarter, up from 1 of 10.</p>
</div>
`,
    faqs: [
      {
        q: "Is GEO the same as AEO?",
        a: "They overlap. AEO is about clean extraction on your page. GEO is broader: earning citations across multiple AI platforms, which also depends on third-party mentions and entity strength.",
      },
      {
        q: "How long does GEO take to show results?",
        a: "If you already rank well, citation improvements can appear within weeks of restructuring content. Building the entity and third-party mentions that move harder prompts takes months.",
      },
      {
        q: "Do I need a paid AI-visibility tool?",
        a: "Not to start. A monthly manual prompt log across ChatGPT, Gemini and Perplexity is enough until the channel is clearly worth managing.",
      },
    ],
    related: ["get-cited-by-chatgpt", "answer-engine-optimization", "entity-seo"],
  },
  {
    slug: "get-cited-by-chatgpt",
    title: "How to Get Your Site Cited by ChatGPT",
    metaTitle: "How to Get Your Site Cited by ChatGPT",
    metaDescription:
      "ChatGPT search cites sources. Here is how it picks them, the crawler settings that let it read you, and the content changes that earn the mention.",
    keyword: "get cited by ChatGPT",
    theme: "ai",
    icon: "fa-solid fa-quote-right",
    intro:
      "ChatGPT search pulls live pages and cites them. Getting cited comes down to crawler access, ranking in its sources, and a quotable page.",
    bodyHtml: `
<p class="prose-lede">ChatGPT answers a question and drops in three or four source links. Those links send real, high-intent traffic. Here is how to be one of them.</p>

<h2>How ChatGPT picks its sources</h2>
<p>When ChatGPT search answers a current question, it runs a search, retrieves a set of pages, and writes an answer citing the ones it used. The retrieval leans on a Bing-style index plus OpenAI's own crawl. In practice, pages that rank well in classic search and read clearly are the ones that get pulled.</p>

<h2>Step one: let the crawlers in</h2>
<figure>
  <table>
    <thead><tr><th>Bot</th><th>What it does</th><th>If you want ChatGPT citations</th></tr></thead>
    <tbody>
      <tr><td><code>OAI-SearchBot</code></td><td>Builds the ChatGPT search index</td><td>Allow in robots.txt</td></tr>
      <tr><td><code>GPTBot</code></td><td>Crawls for training and browsing</td><td>Allow, or at least allow the pages you want cited</td></tr>
      <tr><td><code>Googlebot</code> / <code>Bingbot</code></td><td>Classic search, which feeds retrieval</td><td>Always allow</td></tr>
    </tbody>
  </table>
  <figcaption>Block these and you opt out of the answer entirely.</figcaption>
</figure>

<h2>Step two: earn the citation</h2>
<ul class="check-list">
  <li>Rank on page one for the question, because retrieval starts with search</li>
  <li>Put the answer in the first sentence under a question-style heading</li>
  <li>Include a specific number, date or example the model can quote</li>
  <li>Keep the page public, fast, and free of login walls and heavy scripts</li>
  <li>Build brand mentions on sites the model already trusts in your niche</li>
</ul>

<div class="callout"><p><strong>Common mistake:</strong> blocking <code>GPTBot</code> "to protect content", then wondering why the brand never appears in ChatGPT. If AI visibility is a goal, the bot needs to read the pages you want cited.</p></div>

<h2>How to track it</h2>
<p>Once a month, run your ten most important questions through ChatGPT and record whether you are named. Watch analytics for referral traffic from <code>chatgpt.com</code>. That number going up is the only metric that matters here.</p>

<h2>By the numbers</h2>
<div class="stat-grid">
  <div class="stat"><b>800M+</b><span>weekly ChatGPT users, a growing share researching before they buy</span></div>
  <div class="stat"><b>Top 10</b><span>classic search presence for the query is the strongest predictor of being retrieved</span></div>
  <div class="stat"><b>Low volume, high intent</b><span>describes almost every session that arrives from a chatgpt.com link</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>HM Towhidul Islam</strong> <span>&middot; Senior Technical SEO Lead</span></p>
  <p>The first thing I check on a "we are invisible in AI" audit is robots.txt. Half the time <code>GPTBot</code> or <code>OAI-SearchBot</code> is blocked, usually a plugin default the client never saw.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A professional services firm</h4>
  <p>No ChatGPT visibility despite strong Google rankings. The audit found <code>OAI-SearchBot</code> disallowed sitewide from an old "block AI" setting. We removed the block, added answer-first summaries to the service pages, and earned two industry-publication mentions.</p>
  <p class="case-study-result">First ChatGPT citations appeared within five weeks; chatgpt.com referrals grew to a steady 4% of new consultations booked.</p>
</div>
`,
    faqs: [
      {
        q: "Should I block GPTBot?",
        a: "Only if you want to opt out of both training and ChatGPT visibility. If getting cited matters, allow it, at minimum for the pages you want in AI answers.",
      },
      {
        q: "Does ChatGPT use Google or Bing?",
        a: "ChatGPT search relies more on a Bing-style index plus OpenAI's own crawl. Ranking well in classic search generally still helps, because clear, authoritative pages get retrieved regardless of engine.",
      },
      {
        q: "How is traffic from ChatGPT tracked?",
        a: "Look for referrals from chatgpt.com in your analytics. It is usually low volume but high intent, since the user clicked through from a specific answer.",
      },
    ],
    related: ["generative-engine-optimization", "llms-txt", "answer-engine-optimization"],
  },
  {
    slug: "llms-txt",
    title: "llms.txt: What It Is and Whether You Need One",
    metaTitle: "llms.txt: What It Is and Whether You Need One",
    metaDescription:
      "llms.txt is a proposed file that points AI tools to your key content. Here is what it does, what it does not do, and whether it is worth your time.",
    keyword: "llms.txt",
    theme: "ai",
    icon: "fa-solid fa-file-lines",
    intro:
      "llms.txt is a proposed file at your domain root that points AI tools to your important content in clean Markdown. Useful housekeeping, not a ranking lever.",
    bodyHtml: `
<p class="prose-lede">Every few months the SEO world gets a new file to argue about. This one is <code>llms.txt</code>. Here is the honest version: it is cheap to add, no major model is confirmed to use it, and your crawler settings matter far more.</p>

<h2>What is llms.txt?</h2>
<p><code>llms.txt</code> is a plain-text file you place at <code>yourdomain.com/llms.txt</code>. It lists your most important pages, with short descriptions, in clean Markdown, so an AI tool can find the good stuff without wading through your navigation and cookie banners. Some sites also publish <code>llms-full.txt</code> with the actual content inlined.</p>
<p>It is a community proposal, not an official standard. Google has said it is not using it. OpenAI and Anthropic have not confirmed using it for ranking.</p>

<h2>What actually controls AI access</h2>
<p>Your robots.txt rules for the AI crawlers do the real work:</p>
<figure>
  <table>
    <thead><tr><th>Bot</th><th>Purpose</th><th>Common choice</th></tr></thead>
    <tbody>
      <tr><td><code>Googlebot</code></td><td>Search and AI Overviews</td><td>Always allow</td></tr>
      <tr><td><code>Google-Extended</code></td><td>Gemini grounding and training</td><td>Allow for AI visibility</td></tr>
      <tr><td><code>GPTBot</code> / <code>OAI-SearchBot</code></td><td>ChatGPT training and search</td><td>Allow for ChatGPT citations</td></tr>
      <tr><td><code>PerplexityBot</code></td><td>Perplexity index</td><td>Allow for Perplexity citations</td></tr>
    </tbody>
  </table>
  <figcaption>These decisions have real impact. llms.txt does not, yet.</figcaption>
</figure>

<h2>Should you add one?</h2>
<ul class="check-list">
  <li>If your CMS can generate it automatically, add it. Low effort, no downside</li>
  <li>Do not hand-maintain it for a large site. The cost outweighs any theoretical benefit</li>
  <li>Do not expect a ranking or citation lift from it</li>
  <li>Spend the time on robots.txt, page speed and quotable content instead</li>
</ul>

<div class="callout"><p><strong>Bottom line:</strong> <code>llms.txt</code> is a nice-to-have that costs almost nothing if automated. It is not a growth tactic. Anyone selling it as one is ahead of the evidence.</p></div>

<h2>Where it stands right now</h2>
<div class="stat-grid">
  <div class="stat"><b>2023</b><span>the proposal was published; adoption is growing but confined to tech and docs sites</span></div>
  <div class="stat"><b>0</b><span>major search or AI engines have confirmed using it as a ranking or citation signal</span></div>
  <div class="stat"><b>Minutes vs hours</b><span>to generate it automatically, versus maintaining it by hand each month on a big site</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Mahdi Hassan</strong> <span>&middot; Web Developer &amp; Site Speed</span></p>
  <p>If you want it, wire it into the build so it regenerates from your sitemap and page metadata. A hand-kept <code>llms.txt</code> goes stale in a month, and a stale one is worse than none.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A documentation-heavy SaaS</h4>
  <p>The client wanted <code>llms.txt</code> and <code>llms-full.txt</code> for their docs. We generated both from the existing content pipeline and kept measuring AI citations and assistant referrals for three months.</p>
  <p class="case-study-result">No measurable change in AI visibility. The real lift that quarter came from restructuring the docs answer-first, which we would recommend doing first, every time.</p>
</div>
`,
    faqs: [
      {
        q: "Does Google use llms.txt?",
        a: "No. Google has publicly said it is not using llms.txt. Treat it as optional housekeeping, not an SEO signal.",
      },
      {
        q: "Where does the llms.txt file go?",
        a: "At the root of your domain, at yourdomain.com/llms.txt, the same way robots.txt sits at the root.",
      },
      {
        q: "Is llms.txt the same as robots.txt?",
        a: "No. robots.txt controls which crawlers can access your site. llms.txt is a content index that points AI tools to your best pages. Only robots.txt actually enforces anything.",
      },
    ],
    related: ["get-cited-by-chatgpt", "generative-engine-optimization", "schema-markup"],
  },
  {
    slug: "ai-content-and-seo",
    title: "AI Content and SEO: What Google Actually Rewards",
    metaTitle: "AI Content and SEO: What Google Actually Rewards",
    metaDescription:
      "Google does not ban AI content. It ranks helpful content and filters the rest. Here is where the line sits, and how to use AI without getting hit.",
    keyword: "AI content SEO",
    theme: "ai",
    icon: "fa-solid fa-pen-nib",
    intro:
      "Google does not penalise AI content for being AI. It rewards helpful, original content and filters scaled, low-value pages. The line is about value, not tools.",
    bodyHtml: `
<p class="prose-lede">Here is the deal on AI content: Google has said, on the record, that it is fine, as long as it is helpful and made for people. The March 2024 update then wiped out a pile of sites that used AI to publish at scale with nothing new to say. Both things are true.</p>

<h2>What Google's policy actually says</h2>
<p>Google rewards high-quality content "however it is produced". It targets "scaled content abuse": producing many pages primarily to game rankings, with little value, whether by AI, humans, or both. The tool is not the problem. Publishing filler at volume is.</p>

<h2>Where the line sits</h2>
<figure>
  <table>
    <thead><tr><th>Usually fine</th><th>Usually filtered</th></tr></thead>
    <tbody>
      <tr><td>AI drafts, then a human adds experience, data and edits</td><td>Publish the raw AI output, at volume, unreviewed</td></tr>
      <tr><td>AI for outlines, research summaries, first passes</td><td>Hundreds of near-identical pages from one template prompt</td></tr>
      <tr><td>AI to scale a proven, useful format</td><td>AI to chase every keyword with no first-hand input</td></tr>
      <tr><td>Named author who stands behind the page</td><td>No author, no accountability, no originality</td></tr>
    </tbody>
  </table>
  <figcaption>The question Google is asking: does this page add something a search already covers?</figcaption>
</figure>

<h2>How to use AI without getting hit</h2>
<ul class="check-list">
  <li>Start from your own experience, data or opinion. Use AI to structure and speed it up, not to source it</li>
  <li>Add something no other page has: a test result, a screenshot, a number, a take</li>
  <li>Edit hard. Cut the throat-clearing and the generic advice</li>
  <li>Put a real author on it, with a bio and a track record</li>
  <li>Publish at a pace you can keep quality at, not the pace the tool allows</li>
</ul>

<div class="callout"><p><strong>Bottom line:</strong> AI is a fine writing assistant and a terrible strategy. The sites that got hurt did not lose because they used AI. They lost because the pages had nothing in them.</p></div>

<h2>What the March 2024 update actually did</h2>
<div class="stat-grid">
  <div class="stat"><b>~45%</b><span>targeted reduction in low-quality, unoriginal content in Google's results</span></div>
  <div class="stat"><b>Sites, not pages</b><span>many of the worst offenders were fully deindexed, not just demoted</span></div>
  <div class="stat"><b>Scale with no value</b><span>the common thread, whether the content was AI, human, or both</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Tanbir Habib Riyad</strong> <span>&middot; SEO Trainer &amp; Content Strategist</span></p>
  <p>We use AI for the first 60% of a draft: structure, research summaries, filling obvious gaps. The last 40% is a human adding the test result, the screenshot, the opinion. That last 40% is the whole reason the page ranks.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>An affiliate site hit in March 2024</h4>
  <p>The site had published 400 AI-written "best X" posts in a year with no first-hand testing. Traffic dropped roughly 80% overnight. We cut the library to the 70 pages with real demand, added hands-on testing, photos and a named reviewer to each, and consolidated the rest with redirects.</p>
  <p class="case-study-result">Traffic returned to about 55% of its former peak over the next two core updates, on one sixth of the page count and with far better conversion.</p>
</div>
`,
    faqs: [
      {
        q: "Will Google penalise my site for using AI content?",
        a: "Not for using AI itself. Google penalises scaled, low-value content regardless of how it is made. AI-assisted content that is genuinely helpful and has a real author is fine.",
      },
      {
        q: "Can Google detect AI content?",
        a: "Google does not rank on an AI-detection score. It evaluates whether the page is helpful, original and trustworthy. Thin AI content tends to fail those checks on its own.",
      },
      {
        q: "How much editing does AI content need?",
        a: "Enough that the page carries first-hand experience, specific detail and a clear point of view. If a reader could get the same answer from any other page, it needs more work.",
      },
    ],
    related: ["e-e-a-t", "topical-authority", "search-intent"],
  },

  // ================================================================
  // AUTHORITY & CONTENT
  // ================================================================
  {
    slug: "topical-authority",
    title: "Topical Authority: How to Own a Topic in Google",
    metaTitle: "Topical Authority: How to Own a Topic in Google",
    metaDescription:
      "Topical authority is why some sites rank for everything in their niche. Here is how to build it with pillar pages, clusters and internal links.",
    keyword: "topical authority",
    theme: "authority",
    icon: "fa-solid fa-chess-king",
    intro:
      "Topical authority is Google's sense that your site is a genuine expert on a subject. You build it with depth and structure, not a single big post.",
    bodyHtml: `
<p class="prose-lede">You have seen it happen. A site publishes one article on a topic and it ranks in a week. You publish a better article on the same topic and it takes six months, if it ranks at all. The difference is usually topical authority.</p>

<h2>What is topical authority?</h2>
<p>Topical authority is the degree to which Google sees your site as a comprehensive, trustworthy source on a subject. It is not a single metric. It is the sum of how deeply you cover a topic, how well the pages link together, and how often other sites cite you on that topic.</p>
<p>When you have it, new pages on the topic rank faster and higher, because the site has already earned trust on the subject.</p>

<h2>How to build it</h2>
<ol>
  <li><strong>Map the topic.</strong> List every question and subtopic a real expert would cover. That is your target, not a keyword list.</li>
  <li><strong>Build a pillar and clusters.</strong> One broad pillar page, plus a supporting article for each subtopic. Each cluster page links up to the pillar; the pillar links down to each cluster.</li>
  <li><strong>Cover it before you move on.</strong> Finish the cluster before starting the next topic. Half-covering ten topics beats fully covering none.</li>
  <li><strong>Earn citations on the topic.</strong> Links and mentions that are about this subject specifically, not your site in general.</li>
</ol>

<figure class="chart">
  <figcaption>What builds topical authority, by relative weight</figcaption>
  <div class="bars">
    <div class="bar"><span>Depth of coverage</span><span class="bar-track"><span class="bar-fill" style="width:85%"></span></span><span class="bar-val"></span></div>
    <div class="bar"><span>Internal link structure</span><span class="bar-track"><span class="bar-fill" style="width:70%"></span></span><span class="bar-val"></span></div>
    <div class="bar"><span>On-topic external citations</span><span class="bar-track"><span class="bar-fill" style="width:64%"></span></span><span class="bar-val"></span></div>
    <div class="bar"><span>Consistent entity data</span><span class="bar-track"><span class="bar-fill" style="width:52%"></span></span><span class="bar-val"></span></div>
  </div>
</figure>

<div class="callout"><p><strong>Pro tip:</strong> the fastest topical-authority win is internal linking. Go back through your existing content and connect every page on a topic to every other relevant page, with descriptive anchor text. Most sites never do this pass.</p></div>

<h2>Topical authority checklist</h2>
<ul class="check-list">
  <li>Each core topic has a pillar page and a full set of cluster articles</li>
  <li>Every cluster page links to the pillar and to two or three sibling pages</li>
  <li>You finish a cluster before starting the next</li>
  <li>Author bios establish real expertise on the subject</li>
  <li>External links and mentions are on-topic, not just generic brand links</li>
</ul>

<h2>By the numbers</h2>
<div class="stat-grid">
  <div class="stat"><b>3-6 months</b><span>typical time to see faster indexing and ranking on a fully covered topic</span></div>
  <div class="stat"><b>8-20</b><span>supporting articles around one pillar for most niches</span></div>
  <div class="stat"><b>Finish, then move</b><span>completing one cluster beats half-covering five</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Tanbir Habib Riyad</strong> <span>&middot; SEO Trainer &amp; Content Strategist</span></p>
  <p>The cheapest topical-authority win is a linking pass on content you already have. Connect every page on a topic to every other relevant one, with descriptive anchors. Most sites have never done it once.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A niche B2B blog</h4>
  <p>The client had 30 scattered posts across eight topics and ranked for almost nothing. We picked the one topic tied to revenue, mapped 16 subtopics, published a pillar plus the missing cluster pages over four months, and wired the internal links tightly.</p>
  <p class="case-study-result">The cluster went from 200 to 4,900 organic sessions a month, and new posts on that topic began ranking in the top 10 within two weeks.</p>
</div>
`,
    faqs: [
      {
        q: "How long does it take to build topical authority?",
        a: "For a focused niche, three to six months of consistent, in-depth publishing on one topic. Broader or more competitive topics take a year or more.",
      },
      {
        q: "How many articles make a topic cluster?",
        a: "Enough to answer every meaningful question in the topic. That is often 8 to 20 supporting pages around one pillar, but the number is set by the topic, not a target.",
      },
      {
        q: "Does topical authority transfer between topics?",
        a: "Only partly. Trust on one subject gives a small head start on adjacent subjects, but each new topic mostly has to be earned with its own depth and links.",
      },
    ],
    related: ["entity-seo", "semantic-seo", "content-decay"],
  },
  {
    slug: "entity-seo",
    title: "Entity SEO: The Definitive Guide",
    metaTitle: "Entity SEO: The Definitive Guide for 2026",
    metaDescription:
      "Search and AI now think in entities, not keywords. Here is how to become a recognised entity with schema, consistency and reference sources.",
    keyword: "entity SEO",
    theme: "authority",
    icon: "fa-solid fa-diagram-project",
    intro:
      "An entity is a thing Google and the language models hold in their knowledge graph. Entity SEO makes sure your brand is one of them, described correctly.",
    bodyHtml: `
<p class="prose-lede">Google stopped matching strings years ago. It matches things: people, companies, products, concepts, and the relationships between them. If your brand is not a clear "thing" in that map, you are competing at a disadvantage that no amount of keyword work fixes.</p>

<h2>What is an entity?</h2>
<p>An entity is a uniquely identifiable thing with attributes and relationships. "SERP Mentor" is an entity. So is "technical SEO" and "Brian Dean". Google's Knowledge Graph and the language models both store entities and reason about how they connect.</p>
<p>Entity SEO is the work of getting your brand recognised as an entity, connected to the right topics, and described consistently everywhere.</p>

<h2>How to strengthen your entity</h2>
<ul>
  <li><strong>Say the same thing everywhere.</strong> One brand name, one one-line description, one primary category, on your site and every profile.</li>
  <li><strong>Mark it up.</strong> <code>Organization</code> and <code>Person</code> schema with <code>sameAs</code> links to your verified profiles, so Google connects the dots.</li>
  <li><strong>Get into reference sources.</strong> Accurate Wikidata, Crunchbase and solid industry directories. Wikipedia only if you meet notability.</li>
  <li><strong>Build the topic association.</strong> Publish enough depth on your core subject that "your brand" and "the subject" become linked in the graph.</li>
</ul>

<figure>
  <table>
    <thead><tr><th>Signal</th><th>Weak</th><th>Strong</th></tr></thead>
    <tbody>
      <tr><td>Name consistency</td><td>"SERP Mentor", "SERPMentor", "Serp-Mentor Ltd" mixed</td><td>One exact name everywhere</td></tr>
      <tr><td>Schema</td><td>None, or bare Organization</td><td>Organization + Person + sameAs graph</td></tr>
      <tr><td>Reference presence</td><td>No Wikidata or Crunchbase</td><td>Accurate entries, kept current</td></tr>
      <tr><td>Topic depth</td><td>A few scattered posts</td><td>Full pillar and cluster coverage</td></tr>
    </tbody>
  </table>
  <figcaption>The gap between a fuzzy brand and a recognised entity.</figcaption>
</figure>

<div class="callout"><p><strong>Why this matters more now:</strong> AI assistants lean hard on entities when they choose which sources to trust and cite. A clear entity is not vanity. It is retrieval.</p></div>

<h2>Entity SEO checklist</h2>
<ul class="check-list">
  <li>One exact brand name and description used across every property</li>
  <li>Organization and Person schema with sameAs links, sitewide</li>
  <li>Accurate Wikidata and Crunchbase entries where you qualify</li>
  <li>Deep, structured coverage of your core topic</li>
  <li>On-topic mentions on sites Google already trusts</li>
</ul>

<h2>Signs your entity is working</h2>
<div class="stat-grid">
  <div class="stat"><b>Knowledge panel</b><span>on a branded search is the clearest confirmation</span></div>
  <div class="stat"><b>Correct one-liner</b><span>when you ask ChatGPT or Gemini "what is [brand]"</span></div>
  <div class="stat"><b>Autocomplete</b><span>pairing your brand with your category</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>MD Saiful Islam</strong> <span>&middot; Founder &amp; Head of SEO</span></p>
  <p>Pick one sentence that describes your business and enforce it everywhere: site, LinkedIn, Crunchbase, every directory, every author bio. Consistency is doing more work here than any single schema field.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A rebranded agency</h4>
  <p>After a name change, Google kept showing the old brand and AI tools described the company wrong. We updated the name and description on every property, rebuilt the schema graph with <code>sameAs</code> links, corrected Wikidata and Crunchbase, and earned a few press mentions of the new name.</p>
  <p class="case-study-result">The knowledge panel updated to the new brand within seven weeks; AI assistants described the company correctly by the following month.</p>
</div>
`,
    faqs: [
      {
        q: "How do I know if Google sees my brand as an entity?",
        a: "Search your brand name. A knowledge panel, or Google auto-completing your name with your category, are signs. So is being correctly described when you ask ChatGPT or Gemini about your brand.",
      },
      {
        q: "Do I need a Wikipedia page for entity SEO?",
        a: "No. Wikidata, Crunchbase, LinkedIn and consistent schema do most of the work. Wikipedia helps but only if you genuinely meet its notability bar.",
      },
      {
        q: "What schema matters most for entities?",
        a: "Organization or Person as the core node, with sameAs links to every verified profile, plus consistent use of one @id across your pages so the nodes connect.",
      },
    ],
    related: ["topical-authority", "schema-markup", "semantic-seo"],
  },
  {
    slug: "content-decay",
    title: "Content Decay: Why Rankings Drop and How to Recover",
    metaTitle: "Content Decay: Why Rankings Drop and How to Recover",
    metaDescription:
      "Old pages lose traffic even when nothing breaks. Here is why content decays, how to spot it in Search Console, and the quarterly refresh that fixes it.",
    keyword: "content decay",
    theme: "authority",
    icon: "fa-solid fa-arrow-trend-down",
    intro:
      "Content decay is the slow traffic decline on a page that once ranked. It is normal, predictable, and on most sites a refresh programme recovers more traffic than new posts.",
    bodyHtml: `
<p class="prose-lede">You did not do anything wrong. The page just kept ranking a little lower each month until, a year later, it was gone from page one. That is content decay, and it is the most winnable problem in SEO.</p>

<h2>Why content decays</h2>
<ul>
  <li><strong>Competitors update.</strong> They refreshed their page. Yours did not.</li>
  <li><strong>Intent drifts.</strong> What people want from the query changed, and your page still answers the old version.</li>
  <li><strong>Facts age.</strong> Prices, stats, screenshots and "in 2023" all quietly expire.</li>
  <li><strong>Internal links fade.</strong> Newer pages stopped linking to it, so it lost internal authority.</li>
</ul>

<figure class="chart">
  <figcaption>Typical traffic curve for an un-maintained article</figcaption>
  <div class="bars">
    <div class="bar"><span>Month 0 to 6</span><span class="bar-track"><span class="bar-fill" style="width:55%"></span></span><span class="bar-val">ramp up</span></div>
    <div class="bar"><span>Month 6 to 14</span><span class="bar-track"><span class="bar-fill" style="width:92%"></span></span><span class="bar-val">peak</span></div>
    <div class="bar"><span>Month 15 to 24</span><span class="bar-track"><span class="bar-fill is-muted" style="width:58%"></span></span><span class="bar-val">decay</span></div>
    <div class="bar"><span>Month 24 and on</span><span class="bar-track"><span class="bar-fill is-muted" style="width:34%"></span></span><span class="bar-val">long tail</span></div>
  </div>
</figure>

<h2>The quarterly refresh routine</h2>
<ol>
  <li>In Search Console, compare the last three months to the previous three. List pages down more than 20%.</li>
  <li>For each, check what now outranks you and what changed. Update the facts, add what is missing, sharpen the intro, refresh examples and the date.</li>
  <li>Re-submit the URL and add one or two fresh internal links from strong pages.</li>
  <li>Merge or retire pages that have lost their query entirely, with a 301 to the closest match.</li>
</ol>

<div class="callout"><p><strong>Pro tip:</strong> do not "refresh" a page by changing the date and nothing else. Google notices, and it does not help. A refresh means the content is actually better than it was.</p></div>

<h2>Content decay checklist</h2>
<ul class="check-list">
  <li>A quarterly Search Console review of declining pages</li>
  <li>A refresh queue prioritised by lost clicks, not by age</li>
  <li>Real content improvements on every refresh, not just a date change</li>
  <li>Fresh internal links added when a page is updated</li>
  <li>Dead pages merged or redirected, not left to rot</li>
</ul>

<h2>By the numbers</h2>
<div class="stat-grid">
  <div class="stat"><b>Month 12-18</b><span>where most un-maintained articles peak, then start to slide</span></div>
  <div class="stat"><b>20%</b><span>drop versus the prior quarter is a good threshold to flag a page for refresh</span></div>
  <div class="stat"><b>Days, not months</b><span>for a solid refresh to be re-crawled and re-ranked</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Borhan Uddin Alif</strong> <span>&middot; Content Writer &amp; Editor</span></p>
  <p>Refresh the intro and the first section hardest. That is what the reader and the answer engines judge first, and it is usually the most dated part of an old post.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A five-year-old content site</h4>
  <p>New publishing had stalled and traffic was down 35% over two years. Instead of writing more, we ran a decay audit, found 60 pages down heavily, and refreshed the top 25 by lost clicks: updated data, new sections, better intros, fresh internal links.</p>
  <p class="case-study-result">Those 25 pages recovered 41% more clicks within ten weeks, more than the entire site had gained from new posts that year.</p>
</div>
`,
    faqs: [
      {
        q: "How often should I refresh old content?",
        a: "Review your library quarterly. Refresh individual pages when they show a real decline or when key facts have changed, not on a fixed calendar for every page.",
      },
      {
        q: "Does updating the publish date help SEO?",
        a: "Only if the content genuinely changed. Changing the date alone does nothing and can look manipulative. Update the date because you updated the page.",
      },
      {
        q: "Should I delete pages that lost all their traffic?",
        a: "If the query is gone and the page has no other value, merge it into a stronger page and 301 redirect it. Keep it only if it still serves users or earns links.",
      },
    ],
    related: ["google-core-update-recovery", "search-intent", "topical-authority"],
  },
  {
    slug: "search-intent",
    title: "Search Intent: How to Match It Every Time",
    metaTitle: "Search Intent: How to Match It Every Time",
    metaDescription:
      "Ranking depends on matching what the searcher actually wants. Here are the four intent types, how to read the SERP, and how to align your page.",
    keyword: "search intent",
    theme: "authority",
    icon: "fa-solid fa-bullseye",
    intro:
      "Search intent is the goal behind a query. Match it and you have a chance to rank. Miss it and the best content on the internet will not save the page.",
    bodyHtml: `
<p class="prose-lede">You can have the best article on "running shoes" ever written and still not rank, because the people searching "running shoes" want to buy, not read. Intent is the filter that decides whether your page is even eligible.</p>

<h2>The four types of search intent</h2>
<figure>
  <table>
    <thead><tr><th>Intent</th><th>The searcher wants</th><th>Best page type</th></tr></thead>
    <tbody>
      <tr><td>Informational</td><td>To learn something</td><td>Guide, tutorial, explainer</td></tr>
      <tr><td>Commercial</td><td>To compare options before buying</td><td>Comparison, "best" list, review</td></tr>
      <tr><td>Transactional</td><td>To do or buy something now</td><td>Product, pricing, signup page</td></tr>
      <tr><td>Navigational</td><td>To reach a specific site or page</td><td>Your homepage or the named page</td></tr>
    </tbody>
  </table>
  <figcaption>Match the page type to the intent, or do not bother.</figcaption>
</figure>

<h2>How to read intent from the SERP</h2>
<p>Do not guess. Search the query and look at what already ranks:</p>
<ul>
  <li><strong>Page format.</strong> All listicles? Google wants a listicle. All product pages? A blog post will not rank.</li>
  <li><strong>Content angle.</strong> Beginner or advanced? Local or global? Which subtopics show up on every page?</li>
  <li><strong>SERP features.</strong> A shopping carousel says transactional. A "People also ask" block and an AI Overview say informational.</li>
  <li><strong>Freshness.</strong> Are the top results all from this year? Then the query rewards recency.</li>
</ul>

<div class="callout"><p><strong>Here is the deal:</strong> if the top 10 are all one format and your page is a different format, you are not "differentiating". You are misreading the query. Match first, differentiate within the match.</p></div>

<h2>Aligning your page</h2>
<ul class="check-list">
  <li>The page type matches the dominant format in the top 10</li>
  <li>The angle and depth match what ranking pages provide</li>
  <li>The title promises exactly what the searcher is after</li>
  <li>The intro confirms they are in the right place within the first two lines</li>
  <li>One page targets one intent, not three at once</li>
</ul>

<h2>By the numbers</h2>
<div class="stat-grid">
  <div class="stat"><b>Top 10</b><span>format is the fastest read on what Google thinks a query means</span></div>
  <div class="stat"><b>4 types</b><span>informational, commercial, transactional, navigational, and one page serves one</span></div>
  <div class="stat"><b>Mismatch</b><span>is the most common reason a genuinely good page never ranks</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Tanbir Habib Riyad</strong> <span>&middot; SEO Trainer &amp; Content Strategist</span></p>
  <p>When a page stalls at position 11 to 15 for months, it is almost never a link problem. Open the SERP and check the format. You are usually answering a "best" query with a how-to, or the reverse.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>An e-commerce brand</h4>
  <p>A detailed buyer's-guide article was stuck on page two for a high-value term. The top 10 were all category pages. We moved the guide content lower, turned the URL into a proper category page with products, filters and a short intro, and kept the guide as a linked sub-page.</p>
  <p class="case-study-result">The page reached position 3 within six weeks and became the category's top organic revenue driver.</p>
</div>
`,
    faqs: [
      {
        q: "Can one page target multiple search intents?",
        a: "Usually not well. A page that tries to inform and sell at once tends to do neither. Target one primary intent per page and link out to pages that serve the others.",
      },
      {
        q: "How do I check search intent for a keyword?",
        a: "Search it and study the top 10 results. Their format, angle, depth and the SERP features present tell you what Google has decided the query means.",
      },
      {
        q: "What if the SERP shows mixed intent?",
        a: "Some queries genuinely split, for example half guides and half product pages. Pick the intent you can serve best, match that format, and accept you are competing for part of the SERP.",
      },
    ],
    related: ["featured-snippets", "content-decay", "answer-engine-optimization"],
  },
  {
    slug: "semantic-seo",
    title: "Semantic SEO: Optimize for Meaning, Not Keywords",
    metaTitle: "Semantic SEO: Optimize for Meaning, Not Keywords",
    metaDescription:
      "Google understands topics, synonyms and relationships now. Here is how to write for meaning: entities, subtopics, natural language and full coverage.",
    keyword: "semantic SEO",
    theme: "authority",
    icon: "fa-solid fa-network-wired",
    intro:
      "Semantic SEO is optimising for the meaning of a topic rather than a single keyword string. It is how you rank for hundreds of related queries with one page.",
    bodyHtml: `
<p class="prose-lede">Keyword stuffing died a long time ago. What replaced it is quieter and more demanding: cover a topic so completely, in such natural language, that Google has no doubt what the page is about or how thorough it is.</p>

<h2>What is semantic SEO?</h2>
<p>Semantic SEO is the practice of building content around a topic and its related concepts, entities and questions, instead of repeating one keyword. Google's language understanding means a well-covered page can rank for hundreds of variations it never explicitly targets.</p>

<h2>How to do it</h2>
<ol>
  <li><strong>Start from the entity, not the keyword.</strong> "Email marketing" is a concept with sub-concepts: deliverability, segmentation, automation, subject lines. Cover the concept.</li>
  <li><strong>Map the subtopics.</strong> Use "People also ask", related searches, and the headings on ranking pages to build the full list.</li>
  <li><strong>Answer the questions.</strong> Each subtopic gets a section with a direct answer. This is also what earns featured snippets and AI citations.</li>
  <li><strong>Write naturally.</strong> Use synonyms and related terms the way a person would. Google expects them; their absence looks thin.</li>
  <li><strong>Link semantically.</strong> Connect the page to related pages with anchor text that describes the relationship.</li>
</ol>

<figure>
  <table>
    <thead><tr><th>Keyword-first thinking</th><th>Semantic thinking</th></tr></thead>
    <tbody>
      <tr><td>"How many times should I use the keyword?"</td><td>"Which subtopics does a complete answer need?"</td></tr>
      <tr><td>One page per keyword variation</td><td>One page per topic, ranking for the whole cluster</td></tr>
      <tr><td>Exact-match anchor text everywhere</td><td>Descriptive, varied anchor text</td></tr>
      <tr><td>Word count target</td><td>Coverage target</td></tr>
    </tbody>
  </table>
  <figcaption>The shift from strings to meaning.</figcaption>
</figure>

<div class="callout"><p><strong>Pro tip:</strong> before publishing, list every question a curious reader could still have after reading the page. If there are more than two, the page is not done.</p></div>

<h2>Semantic SEO checklist</h2>
<ul class="check-list">
  <li>The page is built around a topic, not a keyword count</li>
  <li>Every meaningful subtopic and question has a section</li>
  <li>Related entities and synonyms appear naturally in the copy</li>
  <li>Internal links use descriptive, varied anchor text</li>
  <li>Schema reinforces what the page and its entities are</li>
</ul>

<h2>By the numbers</h2>
<div class="stat-grid">
  <div class="stat"><b>Hundreds</b><span>of long-tail queries a single well-covered page can rank for</span></div>
  <div class="stat"><b>Coverage &gt; count</b><span>answering every subtopic beats hitting a word target</span></div>
  <div class="stat"><b>2+ open questions</b><span>left after reading means the page is not finished</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Borhan Uddin Alif</strong> <span>&middot; Content Writer &amp; Editor</span></p>
  <p>I build the outline from "People also ask" and the headings of the top five results, then group them. If two competitors both have a section I do not, that is a gap Google can see too.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A software how-to page</h4>
  <p>The page targeted one keyword and ranked for that one keyword. We rebuilt it around the whole task: prerequisites, the steps, common errors, alternatives, and related concepts, each as its own answered section.</p>
  <p class="case-study-result">Ranking keywords grew from 12 to 340 in three months, with total clicks up 5x, most of it from queries we never explicitly targeted.</p>
</div>
`,
    faqs: [
      {
        q: "Is keyword research still useful for semantic SEO?",
        a: "Yes, but as a map of subtopics and questions to cover, not a list of phrases to repeat. Keywords tell you what people ask; semantic SEO is how thoroughly you answer.",
      },
      {
        q: "How is semantic SEO different from topical authority?",
        a: "Semantic SEO is how you write a single page for meaning and full coverage. Topical authority is the site-level result of doing that across a whole topic with good structure and links.",
      },
      {
        q: "Does word count matter for semantic SEO?",
        a: "Only as a side effect. Complete coverage of a topic often takes more words, but padding a thin page to hit a count does not help. Aim for coverage, not length.",
      },
    ],
    related: ["topical-authority", "entity-seo", "search-intent"],
  },

  // ================================================================
  // TECHNICAL SEO
  // ================================================================
  {
    slug: "programmatic-seo",
    title: "Programmatic SEO: How to Scale Content the Right Way",
    metaTitle: "Programmatic SEO: How to Scale Content Without Doorway Pages",
    metaDescription:
      "Programmatic SEO can build thousands of ranking pages, or get your site filtered. Here is how to tell the difference and roll it out safely.",
    keyword: "programmatic SEO",
    theme: "technical",
    icon: "fa-solid fa-layer-group",
    intro:
      "Programmatic SEO generates many pages from a template and a dataset. Done right it captures long-tail demand at scale. Done wrong it is a doorway-page penalty waiting to happen.",
    bodyHtml: `
<p class="prose-lede">Programmatic SEO is how Zapier, Wise and Tripadvisor rank for hundreds of thousands of queries. It is also how a lot of sites got wiped out in the March 2024 update. Same technique, opposite outcomes. The difference is whether the pages are actually useful.</p>

<h2>What is programmatic SEO?</h2>
<p>Programmatic SEO is generating a large set of similar pages from a template plus structured data: one page per city, product, integration, comparison, or use case. Each page targets a specific long-tail query that would never justify a hand-written article.</p>

<h2>What Google keeps, and what it filters</h2>
<figure class="chart">
  <figcaption>Programmatic pages: indexed versus filtered</figcaption>
  <div class="bars">
    <div class="bar"><span>Unique data on every page</span><span class="bar-track"><span class="bar-fill" style="width:88%"></span></span><span class="bar-val">indexed</span></div>
    <div class="bar"><span>Real search demand per page</span><span class="bar-track"><span class="bar-fill" style="width:80%"></span></span><span class="bar-val">indexed</span></div>
    <div class="bar"><span>Template with a swapped noun</span><span class="bar-track"><span class="bar-fill is-muted" style="width:22%"></span></span><span class="bar-val">filtered</span></div>
    <div class="bar"><span>No demand, no unique value</span><span class="bar-track"><span class="bar-fill is-muted" style="width:8%"></span></span><span class="bar-val">filtered</span></div>
  </div>
</figure>

<h2>How to roll it out safely</h2>
<ol>
  <li><strong>Confirm the demand.</strong> If most of your planned pages target queries with no real search volume, cut them.</li>
  <li><strong>Find the unique value per page.</strong> Real listings, prices, data, photos, reviews. If you cannot fill the template with something specific, the page should not exist.</li>
  <li><strong>Stage the launch.</strong> Publish a few hundred, watch indexation and engagement for a month, then scale. Do not drop 50,000 URLs at once.</li>
  <li><strong>Control index bloat.</strong> Keep thin variants out of the sitemap and <code>noindex</code> them.</li>
  <li><strong>Add a human layer where it counts.</strong> Editorial intros, curated picks, expert notes on the pages that matter most.</li>
</ol>

<div class="callout"><p><strong>The test:</strong> pick a random generated page and ask, would a person be glad they landed here? If the honest answer is "it is just a template", fix the template or do not ship it.</p></div>

<h2>Programmatic SEO checklist</h2>
<ul class="check-list">
  <li>Every page targets a query with real demand</li>
  <li>Every page has unique, useful data, not just swapped words</li>
  <li>The rollout is staged and monitored, not dumped</li>
  <li>Thin variants are kept out of the index</li>
  <li>High-value pages get a human editorial layer</li>
</ul>

<h2>By the numbers</h2>
<div class="stat-grid">
  <div class="stat"><b>Hundreds first</b><span>publish a small batch, watch indexation, then scale</span></div>
  <div class="stat"><b>Below ~60%</b><span>index rate on a new batch is a quality warning, not a crawl issue</span></div>
  <div class="stat"><b>Unique data</b><span>per page is the line between "useful at scale" and "filtered"</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>HM Towhidul Islam</strong> <span>&middot; Senior Technical SEO Lead</span></p>
  <p>Watch the "Crawled, currently not indexed" count in Search Console after each batch. If it climbs, stop scaling and fix the template. Pushing more pages on top of that never ends well.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A marketplace, location pages</h4>
  <p>An earlier agency had launched 12,000 near-identical city pages that mostly sat unindexed and dragged the whole domain. We noindexed the thin ones, kept 900 cities with real listings and demand, added local data and reviews to each, and rolled out further cities only as inventory justified them.</p>
  <p class="case-study-result">Indexed programmatic pages fell from 12,000 to 900, but organic sessions to that section rose 2.3x and sitewide rankings recovered.</p>
</div>
`,
    faqs: [
      {
        q: "Is programmatic SEO against Google's guidelines?",
        a: "No, if the pages are genuinely useful. Google targets scaled content abuse: mass-produced pages with little value. Programmatic pages with unique data and real demand are fine.",
      },
      {
        q: "How many programmatic pages can I publish at once?",
        a: "Start with a few hundred, monitor indexation and engagement for a month, then scale in batches. Publishing tens of thousands of pages overnight is a common trigger for filtering.",
      },
      {
        q: "What makes a programmatic page thin?",
        a: "When the only thing that changes between pages is a name or city, with no unique data, and the underlying query has little or no search demand.",
      },
    ],
    related: ["interaction-to-next-paint", "schema-markup", "ai-content-and-seo"],
  },
  {
    slug: "interaction-to-next-paint",
    title: "Interaction to Next Paint (INP): Pass the Core Web Vital",
    metaTitle: "Interaction to Next Paint (INP): How to Pass the Core Web Vital",
    metaDescription:
      "INP replaced FID as a Core Web Vital in 2024, and most sites fail it. Here is what INP measures, the target, and how to fix a slow score.",
    keyword: "interaction to next paint",
    theme: "technical",
    icon: "fa-solid fa-gauge-high",
    intro:
      "INP measures how fast your page responds to every tap and click during a visit. It replaced First Input Delay in March 2024, and it is the Core Web Vital most sites now fail.",
    bodyHtml: `
<p class="prose-lede">First Input Delay was easy to pass because it only measured the first interaction. INP measures all of them, all visit long, and it is far less forgiving. If your page felt "a bit laggy" before, it probably fails now.</p>

<h2>What INP measures</h2>
<p>Interaction to Next Paint records the delay between a user action, a tap, click or key press, and the next frame the browser paints in response. It reports a value close to the worst interaction of the visit. High INP feels like a button that does not respond, or a menu that opens half a second late.</p>

<h2>The Core Web Vitals targets</h2>
<figure class="chart">
  <figcaption>The "good" threshold at the 75th percentile on mobile</figcaption>
  <div class="bars">
    <div class="bar"><span>LCP, loading</span><span class="bar-track"><span class="bar-fill" style="width:42%"></span></span><span class="bar-val">2.5 s or less</span></div>
    <div class="bar"><span>INP, responsiveness</span><span class="bar-track"><span class="bar-fill" style="width:33%"></span></span><span class="bar-val">200 ms or less</span></div>
    <div class="bar"><span>CLS, stability</span><span class="bar-track"><span class="bar-fill" style="width:20%"></span></span><span class="bar-val">0.1 or less</span></div>
  </div>
  <p class="chart-note">Bar lengths show the relative headroom, not a shared scale.</p>
</figure>

<h2>How to fix a slow INP</h2>
<ul class="check-list">
  <li>Break long JavaScript tasks into smaller chunks so the main thread can respond</li>
  <li>Defer or lazy-load third-party scripts: chat widgets, A/B tools, analytics stacks</li>
  <li>Remove code you no longer use, especially old tag-manager tags</li>
  <li>Avoid large layout recalculations on click; keep event handlers light</li>
  <li>Use a framework's built-in code splitting so pages ship less JavaScript</li>
</ul>

<div class="callout"><p><strong>Measure the field, not the lab.</strong> Lighthouse gives you a lab score in a clean room. Google ranks on field data from real Chrome users, the CrUX report in Search Console. A green Lighthouse score with red field data means real visitors are having a worse time than your test.</p></div>

<h2>Where to check your score</h2>
<p>Search Console's Core Web Vitals report shows field data for your whole site, grouped by page type. PageSpeed Insights shows both field and lab data for a single URL. Start with Search Console to find the worst page groups, then use PageSpeed Insights to diagnose them.</p>

<h2>By the numbers</h2>
<div class="stat-grid">
  <div class="stat"><b>200 ms</b><span>or less at the 75th percentile is "good"</span></div>
  <div class="stat"><b>~1 in 3</b><span>mobile origins fail INP, far more than ever failed the old FID metric</span></div>
  <div class="stat"><b>JavaScript</b><span>is the cause on the large majority of failing pages</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Mahdi Hassan</strong> <span>&middot; Web Developer &amp; Site Speed</span></p>
  <p>Before optimising anything, open the Performance panel and record a few real interactions. The long task blocking the response is almost always a third-party script, and the fix is deferring it, not rewriting your own code.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A publisher failing INP on mobile</h4>
  <p>Field INP sat around 380 ms sitewide. The audit found a consent tool, two analytics libraries and an ad script all executing on first interaction. We deferred the non-critical scripts, split a long layout task, and removed two unused tag-manager tags.</p>
  <p class="case-study-result">Field INP dropped to 170 ms within one CrUX cycle, moving the whole site into the "good" band, with a small but measurable lift on borderline queries.</p>
</div>
`,
    faqs: [
      {
        q: "What is a good INP score?",
        a: "200 milliseconds or less at the 75th percentile of real visits. Between 200 and 500 needs improvement; over 500 is poor.",
      },
      {
        q: "Why did INP replace First Input Delay?",
        a: "FID only measured the delay before the first interaction was processed, which most sites passed easily. INP measures responsiveness across the whole visit, so it reflects real experience better.",
      },
      {
        q: "Does INP affect rankings?",
        a: "It is part of the page experience signals. It is a tie-breaker rather than a primary factor, but a poor INP on a competitive query can cost you positions.",
      },
    ],
    related: ["programmatic-seo", "schema-markup", "google-core-update-recovery"],
  },
  {
    slug: "schema-markup",
    title: "Schema Markup: Which Types Are Worth Adding",
    metaTitle: "Schema Markup: Which Types Are Worth Adding in 2026",
    metaDescription:
      "Schema does not raise rankings directly, but it earns rich results and feeds AI. Here are the types worth your time, and the ones to skip.",
    keyword: "schema markup",
    theme: "technical",
    icon: "fa-solid fa-code",
    intro:
      "Schema markup gives search and AI systems a clean, machine-readable version of your page. It does not lift rankings directly, but it earns rich results and feeds entities.",
    bodyHtml: `
<p class="prose-lede">Schema markup will not move you from position eight to position three. What it does is make your result look better, make you eligible for features other pages cannot get, and give AI systems a structured version of what your page says. That is worth doing, selectively.</p>

<h2>What schema markup does</h2>
<p>Schema, added as JSON-LD, labels the parts of your page: this is the author, this is the price, this is the rating, this is a step. Search engines use it to show rich results, and language models use it as a clean signal of what the page and its entities are.</p>

<h2>Which types are worth it</h2>
<figure>
  <table>
    <thead><tr><th>Type</th><th>What it can earn</th><th>Worth it for</th></tr></thead>
    <tbody>
      <tr><td><code>Organization</code> / <code>Person</code></td><td>Knowledge panel, entity links</td><td>Every site, once, sitewide</td></tr>
      <tr><td><code>Article</code></td><td>Author, date and headline in results and AI answers</td><td>Any blog or news content</td></tr>
      <tr><td><code>BreadcrumbList</code></td><td>Breadcrumb trail in the result</td><td>Any site with a hierarchy</td></tr>
      <tr><td><code>Product</code> + <code>AggregateRating</code></td><td>Price, stock and stars</td><td>E-commerce, with real reviews only</td></tr>
      <tr><td><code>FAQPage</code></td><td>Expandable Q&amp;A, now limited</td><td>Sparingly, genuine FAQs only</td></tr>
      <tr><td><code>LocalBusiness</code></td><td>Hours, area, contact in local results</td><td>Any business with a location</td></tr>
      <tr><td><code>VideoObject</code></td><td>Video thumbnail and key moments</td><td>Pages where video is the main content</td></tr>
    </tbody>
  </table>
  <figcaption>Add the types that earn something visible or feed an entity. Skip the rest.</figcaption>
</figure>

<div class="callout"><p><strong>Warning:</strong> only mark up content that is actually visible on the page. Schema for things a user cannot see is a structured-data manual-action risk.</p></div>

<h2>Schema checklist</h2>
<ul class="check-list">
  <li>Organization or Person schema sitewide, with sameAs links</li>
  <li>Article schema on every post, with a real author</li>
  <li>Breadcrumb schema matching your visible navigation</li>
  <li>Product and rating schema only where real reviews exist</li>
  <li>One consistent @id per entity, cross-referenced in a @graph</li>
  <li>Validated with the Rich Results Test, monitored in Search Console</li>
</ul>

<h2>By the numbers</h2>
<div class="stat-grid">
  <div class="stat"><b>No direct lift</b><span>schema is not a ranking factor; it earns features and clarity</span></div>
  <div class="stat"><b>CTR</b><span>is where rich results pay off, sometimes materially</span></div>
  <div class="stat"><b>Visible only</b><span>mark up what a user can see, or risk a manual action</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>HM Towhidul Islam</strong> <span>&middot; Senior Technical SEO Lead</span></p>
  <p>Use one <code>@id</code> per entity and reference it everywhere in a <code>@graph</code>. Most sites emit five disconnected blocks per page. Connecting them is what turns markup into an entity signal.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A recipe site</h4>
  <p>Recipe schema was present but incomplete: no ratings, no cook times, no video object on pages with video. We completed the markup, fixed a batch of validation errors, and connected the Organization and Person nodes.</p>
  <p class="case-study-result">Rich result impressions rose 60% and average click-through on recipe pages improved from 3.1% to 4.4%.</p>
</div>
`,
    faqs: [
      {
        q: "Does schema markup improve rankings?",
        a: "Not directly. It makes pages eligible for rich results and helps search and AI systems understand the content, which can improve visibility and click-through, but it is not a ranking factor on its own.",
      },
      {
        q: "What format should schema be in?",
        a: "JSON-LD, in a script tag in the head or body. Google recommends it over Microdata and RDFa, and it is easier to maintain.",
      },
      {
        q: "Can too much schema hurt?",
        a: "Marking up content that is not visible on the page, or adding irrelevant types, can trigger a structured-data manual action. Mark up only what is real and shown.",
      },
    ],
    related: ["entity-seo", "featured-snippets", "interaction-to-next-paint"],
  },

  // ================================================================
  // RANKINGS & LINKS
  // ================================================================
  {
    slug: "zero-click-search",
    title: "Zero-Click Search: What It Means for Your Traffic",
    metaTitle: "Zero-Click Search: What It Means for Your Traffic",
    metaDescription:
      "More searches end without a click. Here is the real data by intent, why commercial queries still convert, and how to adapt your content mix.",
    keyword: "zero-click search",
    theme: "rankings",
    icon: "fa-solid fa-arrow-pointer",
    intro:
      "A zero-click search ends without visiting a website, because the answer is on the results page. The share has grown, but it is uneven, and buying intent is mostly intact.",
    bodyHtml: `
<p class="prose-lede">The headline says "60% of searches now end without a click" and everyone panics. The reality is more useful: the searches you actually want, the ones close to a purchase, still send people to pages. It is the "what year did X happen" traffic that is gone, and that traffic was never worth much.</p>

<h2>What counts as a zero-click search</h2>
<p>A zero-click search is resolved on the SERP itself, by an AI Overview, a featured snippet, a knowledge panel, a calculator, or the map pack. The user gets what they needed and never leaves Google.</p>

<h2>The click still survives where it matters</h2>
<figure class="chart">
  <figcaption>Click outcome by query intent (directional, 2026)</figcaption>
  <div class="bars">
    <div class="bar"><span>Simple informational</span><span class="bar-track"><span class="bar-fill is-muted" style="width:70%"></span></span><span class="bar-val">~70% no click</span></div>
    <div class="bar"><span>How-to and research</span><span class="bar-track"><span class="bar-fill" style="width:45%"></span></span><span class="bar-val">~45% click</span></div>
    <div class="bar"><span>Commercial, "best X"</span><span class="bar-track"><span class="bar-fill" style="width:72%"></span></span><span class="bar-val">~72% click</span></div>
    <div class="bar"><span>Transactional and local</span><span class="bar-track"><span class="bar-fill" style="width:80%"></span></span><span class="bar-val">~80% click</span></div>
  </div>
  <p class="chart-note">Figures vary by study and industry. The pattern holds: closer to a purchase, the click survives.</p>
</figure>

<h2>How to adapt</h2>
<ul class="check-list">
  <li>Shift the content mix toward comparison, "best", "vs" and pricing content</li>
  <li>Treat snippet and AI Overview citations as a branding channel, and measure assistant referral traffic</li>
  <li>Report impressions and citations next to clicks, so a summarised page is not read as a failure</li>
  <li>Build direct channels, email and community, so you are less dependent on the click</li>
  <li>For informational pages, aim to be the cited source, then capture the minority who do click with a strong offer</li>
</ul>

<div class="callout"><p><strong>Bottom line:</strong> zero-click search is a reason to change your content mix, not a reason to stop doing SEO. The commercial queries that pay the bills still click.</p></div>

<h2>What the data shows</h2>
<div class="stat-grid">
  <div class="stat"><b>~25-60%</b><span>of searches are "zero-click", depending on the study and whether branded queries count</span></div>
  <div class="stat"><b>Much lower</b><span>for commercial and transactional queries, where users click to verify</span></div>
  <div class="stat"><b>Impressions up, clicks flat</b><span>is the Search Console signature of a summarised page</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>MD Saiful Islam</strong> <span>&middot; Founder &amp; Head of SEO</span></p>
  <p>Re-weight the editorial calendar. If informational posts were 70% of output, flip it: lead with comparison, "best" and pricing content, and treat the informational pages as citation and brand plays.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A review-driven affiliate site</h4>
  <p>Informational traffic was being eaten by AI Overviews. We kept publishing explainers for the citations but shifted 60% of the calendar to "best" and "vs" content, and added comparison tables to existing money pages.</p>
  <p class="case-study-result">Overall sessions dipped 8%, but affiliate revenue rose 22% over two quarters, because the surviving clicks were closer to a purchase.</p>
</div>
`,
    faqs: [
      {
        q: "What percentage of searches are zero-click?",
        a: "Estimates range from about 25% to 60% depending on the study and whether branded and navigational searches are included. The number is much lower for commercial and transactional queries.",
      },
      {
        q: "Do AI Overviews cause zero-click searches?",
        a: "They add to it for informational queries. For comparison and buying queries, users still click through to verify options, so the impact there is smaller.",
      },
      {
        q: "How do I measure zero-click impact on my site?",
        a: "In Search Console, look for pages where impressions stay flat or grow while clicks fall. That divergence is usually the SERP answering the query in place.",
      },
    ],
    related: ["rank-in-google-ai-overviews", "featured-snippets", "search-intent"],
  },
  {
    slug: "google-core-update-recovery",
    title: "Google Core Update Recovery: A Step-by-Step Plan",
    metaTitle: "Google Core Update Recovery: A Step-by-Step Plan",
    metaDescription:
      "Lost traffic in a core update? Here is how to read the damage, what actually causes drops, and the recovery plan that works, with a realistic timeline.",
    keyword: "google core update recovery",
    theme: "rankings",
    icon: "fa-solid fa-arrows-rotate",
    intro:
      "Core updates re-score quality across the whole index. Recovery means genuinely improving the pages that dropped, then waiting for the next update to re-evaluate them.",
    bodyHtml: `
<p class="prose-lede">A core update hits, your traffic drops 40%, and the internet fills up with recovery advice written by people watching a rank tracker. Here is what actually works, and it starts with not touching anything for two weeks.</p>

<h2>Step 1: wait for the rollout to finish</h2>
<p>Core updates take two to three weeks to fully roll out. Traffic swings during that window and often partly corrects on its own. Judging your site on day three is like weighing yourself after one meal. Note the date, then wait.</p>

<h2>Step 2: segment the drop</h2>
<p>In Search Console and analytics, break the decline down:</p>
<ul>
  <li><strong>By folder.</strong> A drop concentrated in <code>/blog/</code> or one category is a specific, fixable problem.</li>
  <li><strong>By query type.</strong> Informational pages down but commercial pages fine points at a content-quality or AI Overview issue.</li>
  <li><strong>By page.</strong> A handful of pages losing most of the traffic is very different from a smooth sitewide decline.</li>
</ul>

<h2>Step 3: fix the real problem</h2>
<figure>
  <table>
    <thead><tr><th>Pattern</th><th>Likely cause</th><th>Fix</th></tr></thead>
    <tbody>
      <tr><td>Thin or templated pages dropped</td><td>Helpful-content and quality signals</td><td>Improve, consolidate or remove them</td></tr>
      <tr><td>Older content dropped, competitors newer</td><td>Freshness and depth gap</td><td>Refresh with real updates and first-hand detail</td></tr>
      <tr><td>Sitewide, gradual decline</td><td>Overall site quality and trust</td><td>Raise the floor: cut weak pages, strengthen E-E-A-T</td></tr>
      <tr><td>YMYL pages hit hardest</td><td>Author and trust signals</td><td>Add credentials, review, sources, editorial process</td></tr>
    </tbody>
  </table>
  <figcaption>Match the fix to the pattern, not to the loudest advice that week.</figcaption>
</figure>

<div class="callout"><p><strong>Keep a changelog.</strong> One shared doc: what you shipped, which pages, which date. When the next update lands, you will have cause and effect instead of a group chat full of guesses.</p></div>

<h2>Step 4: wait for the next update</h2>
<p>Core-update losses are usually re-evaluated at the next core update, which can be months away. You will not see a full recovery the week after you make changes. Ship the improvements, keep publishing well, and let the next update re-score the site.</p>

<h2>Recovery checklist</h2>
<ul class="check-list">
  <li>You waited for the rollout to finish before acting</li>
  <li>The drop is segmented by folder, query type and page</li>
  <li>Weak and thin pages are improved, merged or removed</li>
  <li>Trust signals are strengthened sitewide</li>
  <li>Every change is logged with a date</li>
</ul>

<h2>By the numbers</h2>
<div class="stat-grid">
  <div class="stat"><b>2-3 weeks</b><span>to fully roll out; do not judge traffic before it finishes</span></div>
  <div class="stat"><b>Next update</b><span>is usually when losses are re-evaluated, often months later</span></div>
  <div class="stat"><b>Content, not links</b><span>is what core updates re-score, so disavowing rarely helps</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>MD Saiful Islam</strong> <span>&middot; Founder &amp; Head of SEO</span></p>
  <p>Segment before you touch anything. A drop in one folder is a project. A smooth sitewide decline is a verdict on overall quality, and the fix is raising the floor: cut or merge the weakest 20% of pages first.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A B2B site down 38% in a core update</h4>
  <p>The loss was concentrated in an old, thin "resources" section. We waited out the rollout, confirmed the pattern, then consolidated 120 weak pages into 25 strong ones, strengthened author bios and sourcing, and logged every change.</p>
  <p class="case-study-result">Partial recovery began within weeks from the consolidation itself; the next core update restored traffic to about 95% of the prior peak.</p>
</div>
`,
    faqs: [
      {
        q: "How long does core update recovery take?",
        a: "Usually until the next core update, which may be two to six months out. Improvements made in between are not fully reflected until Google re-runs the update.",
      },
      {
        q: "Can I recover before the next core update?",
        a: "Partial recovery is possible if the drop was tied to specific fixable issues like technical errors or a few thin pages. Broad quality-driven drops typically need the next update to re-score.",
      },
      {
        q: "Should I disavow links after a core update?",
        a: "Rarely. Core updates are about content quality and relevance, not links. Disavow only genuine, deliberate link manipulation.",
      },
    ],
    related: ["content-decay", "e-e-a-t", "ai-content-and-seo"],
  },
  {
    slug: "e-e-a-t",
    title: "E-E-A-T: The Trust Signals That Move Rankings",
    metaTitle: "E-E-A-T: The Trust Signals That Move Rankings",
    metaDescription:
      "E-E-A-T is not a score, it is a set of signals. Here are the concrete ones that correlate with ranking recovery, with a weak-versus-strong table.",
    keyword: "E-E-A-T",
    theme: "rankings",
    icon: "fa-solid fa-shield-halved",
    intro:
      "E-E-A-T stands for Experience, Expertise, Authoritativeness and Trust. It is a framework Google's raters use and its systems approximate, and the signals are concrete.",
    bodyHtml: `
<p class="prose-lede">People treat E-E-A-T like a dial in the algorithm you can turn up. It is not. It is a set of things raters look for and systems try to measure. The good news: every one of them is something you can actually build.</p>

<h2>What E-E-A-T means</h2>
<ul>
  <li><strong>Experience.</strong> Have you actually done the thing? First-hand use, not a rewrite of other articles.</li>
  <li><strong>Expertise.</strong> Does the author have real knowledge or credentials in the subject?</li>
  <li><strong>Authoritativeness.</strong> Is the site or author a recognised go-to source on the topic?</li>
  <li><strong>Trust.</strong> Can the information, the business and the transaction be trusted? This is the one that matters most.</li>
</ul>

<h2>Weak versus strong, in practice</h2>
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
  <figcaption>After the 2024 and 2025 updates, these are the signals that line up with resilience.</figcaption>
</figure>

<div class="callout"><p><strong>Here is the deal:</strong> Trust is the part of E-E-A-T that carries the most weight. A page can be expert and experienced, but if the site looks untrustworthy, none of it counts.</p></div>

<h2>E-E-A-T checklist</h2>
<ul class="check-list">
  <li>Every article has a real, named author with a linked bio</li>
  <li>Money and YMYL pages show a reviewer or editor and a last-updated date</li>
  <li>Claims link to primary sources; statistics carry a date</li>
  <li>The site has an about page, contact details and a stated editorial process</li>
  <li>The brand is mentioned and reviewed on sites your audience trusts</li>
</ul>

<h2>By the numbers</h2>
<div class="stat-grid">
  <div class="stat"><b>Trust</b><span>is the member of E-E-A-T that carries the most weight, per Google's own guidelines</span></div>
  <div class="stat"><b>Named authors</b><span>with real bios correlate strongly with post-2024 resilience</span></div>
  <div class="stat"><b>YMYL</b><span>pages face the strictest bar: health, finance, legal, safety</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Tanbir Habib Riyad</strong> <span>&middot; SEO Trainer &amp; Content Strategist</span></p>
  <p>E-E-A-T is not something you add to a page. It is something a stranger can verify in 30 seconds: who wrote this, what do they know, who is behind the site, and can I check the claims. Build for that stranger.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A health information site</h4>
  <p>Traffic slipped across two core updates. The content was accurate but anonymous, unsourced, and had no visible editorial process. We added named authors with credentials, a medical reviewer line and date on every page, primary-source citations, and a published editorial policy.</p>
  <p class="case-study-result">The site regained roughly 70% of lost traffic over the following two updates, with the reviewed pages recovering first.</p>
</div>
`,
    faqs: [
      {
        q: "Is E-E-A-T a ranking factor?",
        a: "Not a single one. It is a concept Google's quality raters use, and its systems approximate it through many signals like links, mentions, author information and content quality.",
      },
      {
        q: "What is the extra E in E-E-A-T?",
        a: "Experience. Google added it in 2022 to ask whether the content creator has real first-hand experience with the topic, on top of expertise.",
      },
      {
        q: "How do I show experience on a page?",
        a: "Use your own photos, screenshots, test results and specific details that only someone who did the thing would know. Generic advice signals the opposite.",
      },
    ],
    related: ["google-core-update-recovery", "ai-content-and-seo", "digital-pr"],
  },
  {
    slug: "digital-pr",
    title: "Digital PR: The Link Building Method That Still Works",
    metaTitle: "Digital PR: The Link Building Method That Still Works",
    metaDescription:
      "Digital PR earns editorial links by giving journalists something to write about. Here are the formats that get coverage and the test that predicts success.",
    keyword: "digital PR",
    theme: "rankings",
    icon: "fa-solid fa-bullhorn",
    intro:
      "Digital PR earns high-authority editorial links as a byproduct of genuine coverage: original data, surveys, expert reactions, striking analysis.",
    bodyHtml: `
<p class="prose-lede">Most link building is asking strangers for favours. Digital PR is different. You make something journalists want to write about, they cover it, and the links come with the coverage. Higher authority, lower risk, and it scales.</p>

<h2>What is digital PR?</h2>
<p>Digital PR is earning editorial links and brand mentions by creating newsworthy content and pitching it to journalists and publications. The link is a natural citation inside a story, not a placement you negotiated.</p>

<h2>The formats that earn coverage</h2>
<ul>
  <li><strong>Original research.</strong> Survey your audience or analyse a public dataset. One strong statistic gets cited for years.</li>
  <li><strong>Data journalism.</strong> Rank, map or index something people argue about: prices by city, salaries by role, best places for X.</li>
  <li><strong>Newsjacking.</strong> A fast, quotable expert comment when a relevant story breaks.</li>
  <li><strong>Definitive free tools.</strong> A calculator or checker other sites link to as the reference.</li>
</ul>

<figure class="chart">
  <figcaption>Link methods by authority earned and risk carried</figcaption>
  <div class="bars">
    <div class="bar"><span>Digital PR and data</span><span class="bar-track"><span class="bar-fill" style="width:92%"></span></span><span class="bar-val">high value, low risk</span></div>
    <div class="bar"><span>Selective guest posts</span><span class="bar-track"><span class="bar-fill" style="width:55%"></span></span><span class="bar-val">medium</span></div>
    <div class="bar"><span>Niche edits and link inserts</span><span class="bar-track"><span class="bar-fill is-muted" style="width:35%"></span></span><span class="bar-val">rising risk</span></div>
    <div class="bar"><span>Link networks and PBNs</span><span class="bar-track"><span class="bar-fill is-muted" style="width:12%"></span></span><span class="bar-val">high risk</span></div>
  </div>
</figure>

<div class="callout"><p><strong>The test that predicts a campaign:</strong> would a journalist cover this if you removed the link entirely? If yes, the links will come. If no, you are doing outreach, not PR.</p></div>

<h2>Digital PR checklist</h2>
<ul class="check-list">
  <li>The asset is genuinely newsworthy on its own, link aside</li>
  <li>It has a clear hook: a number, a ranking, a surprise, a timely angle</li>
  <li>The pitch is short, personalised and sent to the right beat</li>
  <li>The landing page is fast, citable and easy to quote</li>
  <li>Coverage without a link is followed up for a link where reasonable</li>
</ul>

<h2>By the numbers</h2>
<div class="stat-grid">
  <div class="stat"><b>Years</b><span>a single strong data study keeps earning links, with no new outreach</span></div>
  <div class="stat"><b>2-4 weeks</b><span>to produce a solid study; pickup runs over the following weeks</span></div>
  <div class="stat"><b>Nofollow still counts</b><span>referral traffic, brand and entity signals, and often follow links later</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Milon Khan</strong> <span>&middot; Link Building &amp; Digital PR Lead</span></p>
  <p>Lead the pitch with the finding, not the company. "Renters in these five cities now pay more than a mortgage" gets opened. "We have published a new report" does not.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A fintech startup</h4>
  <p>No press coverage and a flat link profile. We surveyed 1,200 of their users, turned the results into a short report with three shareable stats and one chart, and pitched it to finance and business journalists.</p>
  <p class="case-study-result">17 pieces of coverage in six weeks, 11 with a follow link from DR 60+ domains, and the report page still earns links a year on.</p>
</div>
`,
    faqs: [
      {
        q: "How is digital PR different from regular link building?",
        a: "Regular link building targets a link directly. Digital PR creates something newsworthy, earns media coverage, and the links come with that coverage, usually from higher-authority sites.",
      },
      {
        q: "How long does a digital PR campaign take?",
        a: "Producing a solid data study takes two to four weeks. Outreach and pickup run over the following few weeks, and a strong asset keeps earning links for months or years.",
      },
      {
        q: "Do nofollow links from press coverage help?",
        a: "Yes. They drive referral traffic, build brand awareness and entity signals, and often lead to follow links as other sites cite the same story.",
      },
    ],
    related: ["e-e-a-t", "reddit-seo", "topical-authority"],
  },
  {
    slug: "featured-snippets",
    title: "Featured Snippets: How to Win Position Zero",
    metaTitle: "Featured Snippets: How to Win Position Zero in 2026",
    metaDescription:
      "Featured snippets still drive clicks and feed AI answers. Here are the snippet types, how to format for each, and how to steal one from a competitor.",
    keyword: "featured snippets",
    theme: "rankings",
    icon: "fa-solid fa-star",
    intro:
      "A featured snippet is the answer box at the top of many results. Winning one lifts click-through and makes your page more likely to be used in AI answers.",
    bodyHtml: `
<p class="prose-lede">Featured snippets were supposed to die when AI Overviews arrived. They did not. They still show on plenty of queries, still pull clicks, and the same formatting that wins a snippet is the formatting that gets you into an AI answer. Two birds.</p>

<h2>The three snippet types</h2>
<figure>
  <table>
    <thead><tr><th>Type</th><th>Triggered by</th><th>How to format</th></tr></thead>
    <tbody>
      <tr><td>Paragraph</td><td>"what is", "why", "how does"</td><td>A 40 to 60 word answer right under a question heading</td></tr>
      <tr><td>List</td><td>"how to", "steps", "ways to", "best"</td><td>A clear ordered or unordered list with short items</td></tr>
      <tr><td>Table</td><td>"price", "comparison", "vs", "sizes"</td><td>A simple HTML table with a header row</td></tr>
    </tbody>
  </table>
  <figcaption>Match the format to the snippet type Google is already showing.</figcaption>
</figure>

<h2>How to win one</h2>
<ol>
  <li><strong>Find the target.</strong> Look for queries where you rank in the top 10 and a snippet already shows. You cannot win a snippet that does not exist.</li>
  <li><strong>Match the format.</strong> If the current snippet is a list, give a better list. Do not answer a list query with a paragraph.</li>
  <li><strong>Put the answer where it can be lifted.</strong> Directly under a heading that matches the query, in the first sentence or the first list.</li>
  <li><strong>Be more concise and more complete.</strong> Snippets reward the answer that is both tight and correct.</li>
</ol>

<div class="callout"><p><strong>Pro tip:</strong> add a short "quick answer" block near the top of the page that directly answers the primary question. It often becomes the snippet even when the detailed section is lower down.</p></div>

<h2>Featured snippet checklist</h2>
<ul class="check-list">
  <li>You already rank in the top 10 for the query</li>
  <li>A snippet is currently showing for that query</li>
  <li>Your format matches the snippet type</li>
  <li>The answer sits directly under a question-style heading</li>
  <li>The answer is concise, complete and factually tight</li>
</ul>

<h2>By the numbers</h2>
<div class="stat-grid">
  <div class="stat"><b>Positions 2-8</b><span>win a large share of snippets, not just position 1</span></div>
  <div class="stat"><b>Format match</b><span>list query needs a list, table query needs a table</span></div>
  <div class="stat"><b>Two birds</b><span>snippet formatting is also what earns AI Overview citations</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Borhan Uddin Alif</strong> <span>&middot; Content Writer &amp; Editor</span></p>
  <p>Add a short "quick answer" line right under the first heading that answers the primary question in one sentence. It wins the snippet surprisingly often, even when the detailed section is far down the page.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A SaaS blog</h4>
  <p>The team targeted 40 questions where they ranked 3 to 8 and a snippet was already showing. For each, they matched the format, moved the answer directly under a question heading, and tightened it to under 55 words.</p>
  <p class="case-study-result">22 snippets won in eight weeks, adding an estimated 18% to organic clicks on those pages.</p>
</div>
`,
    faqs: [
      {
        q: "Do featured snippets still exist with AI Overviews?",
        a: "Yes. Featured snippets still appear on many queries, sometimes alongside an AI Overview. The formatting that wins a snippet also helps you get cited in the Overview.",
      },
      {
        q: "Can you rank for a featured snippet without being number one?",
        a: "Yes. Snippets are often pulled from results in positions two to eight if that page answers the specific question more clearly than the top result.",
      },
      {
        q: "Do featured snippets increase or decrease clicks?",
        a: "It varies. For simple answers they can reduce clicks, but for queries where the user needs more detail, holding the snippet usually increases click-through.",
      },
    ],
    related: ["rank-in-google-ai-overviews", "answer-engine-optimization", "search-intent"],
  },
  {
    slug: "reddit-seo",
    title: "Reddit SEO: How to Show Up in Google and AI Answers",
    metaTitle: "Reddit SEO: How to Show Up in Google and AI Answers",
    metaDescription:
      "Reddit ranks for everything now and AI models quote it constantly. Here is how Reddit visibility works and how to earn it without getting banned.",
    keyword: "Reddit SEO",
    theme: "rankings",
    icon: "fa-brands fa-reddit",
    intro:
      "Reddit threads now rank for a huge share of queries and get quoted heavily by AI models. Showing up there is a real channel, but it punishes marketing behaviour hard.",
    bodyHtml: `
<p class="prose-lede">Add "reddit" to a search and you will see why this matters. For product research, "best of" queries and honest opinions, Reddit threads often outrank every brand and publisher. AI models lean on it even more. You cannot control Reddit, but you can influence whether you show up in it.</p>

<h2>Why Reddit ranks so well now</h2>
<p>Two reasons. Google signed a content deal and surfaces Reddit heavily, especially for queries where people want unfiltered opinion. And searchers reward it: click and dwell data says people trust a messy Reddit thread over a polished affiliate page for certain questions.</p>

<h2>What works, and what gets you banned</h2>
<figure>
  <table>
    <thead><tr><th>Works</th><th>Gets you removed</th></tr></thead>
    <tbody>
      <tr><td>A genuinely helpful answer that happens to mention your product</td><td>Dropping a link in every relevant thread</td></tr>
      <tr><td>Being active in the subreddit for months before you ever self-promote</td><td>A week-old account posting about your brand</td></tr>
      <tr><td>Answering the actual question, then disclosing you are the founder</td><td>Fake "I found this great tool" posts from alt accounts</td></tr>
      <tr><td>Hosting an AMA the mods approved</td><td>Ignoring the subreddit's self-promotion rules</td></tr>
    </tbody>
  </table>
  <figcaption>Reddit communities detect and punish marketing faster than any search engine.</figcaption>
</figure>

<h2>A realistic Reddit approach</h2>
<ul class="check-list">
  <li>Find the threads that already rank for your key queries</li>
  <li>Add real value there as a real person, with disclosure</li>
  <li>Build genuine karma and history in two or three relevant subreddits</li>
  <li>Encourage happy customers to share honestly, never scripted</li>
  <li>Monitor brand mentions so you can join conversations that are already happening</li>
</ul>

<div class="callout"><p><strong>Bottom line:</strong> you are not doing "Reddit SEO" so much as earning a reputation in a community that Google and AI models happen to trust. Treat it like PR, not link building.</p></div>

<h2>What the data shows</h2>
<div class="stat-grid">
  <div class="stat"><b>Top 5</b><span>Reddit is now among the most-surfaced domains in Google's results</span></div>
  <div class="stat"><b>Heavily quoted</b><span>by ChatGPT, Perplexity and Google's AI answers for opinion queries</span></div>
  <div class="stat"><b>Mostly nofollow</b><span>the value is ranking inside threads that rank, plus brand mentions</span></div>
</div>

<div class="expert-tip">
  <p class="expert-tip-head"><i class="fa-solid fa-user-check" aria-hidden="true"></i> <strong>Milon Khan</strong> <span>&middot; Link Building &amp; Digital PR Lead</span></p>
  <p>Do not send a founder into a subreddit cold. Spend a month being genuinely useful with no mention of the product. The account history is what makes the eventual disclosure land instead of getting removed.</p>
</div>

<div class="case-study">
  <p class="case-study-label">Short case study</p>
  <h4>A consumer app</h4>
  <p>Competitors were named in the Reddit threads that ranked for the category; the client was not. The founder spent six weeks answering questions in two relevant subreddits, disclosed their role, and ran one mod-approved AMA.</p>
  <p class="case-study-result">The brand began appearing in three category threads that rank on page one, and started being named by ChatGPT for "best [category] app" prompts.</p>
</div>
`,
    faqs: [
      {
        q: "Can I pay to rank on Reddit?",
        a: "No. You can run Reddit ads, but organic visibility comes from genuine participation and community goodwill. Paid manipulation of threads violates Reddit's rules and often backfires publicly.",
      },
      {
        q: "Do Reddit links help SEO?",
        a: "Most Reddit links are nofollow, so the direct link value is limited. The real benefit is ranking inside threads that themselves rank, plus brand mentions that feed AI answers.",
      },
      {
        q: "Which subreddits should I focus on?",
        a: "The two or three where your customers actually spend time and where your key queries already surface Reddit threads. Depth in a few beats shallow activity across many.",
      },
    ],
    related: ["digital-pr", "get-cited-by-chatgpt", "e-e-a-t"],
  },
];

export const guideBySlug = (slug: string): SeoGuide | undefined =>
  SEO_GUIDES.find((g) => g.slug === slug);

export function guidesGrouped(): { theme: GuideTheme; label: string; guides: SeoGuide[] }[] {
  return (["ai", "authority", "technical", "rankings"] as GuideTheme[]).map((theme) => ({
    theme,
    label: THEME_LABEL[theme],
    guides: SEO_GUIDES.filter((g) => g.theme === theme),
  }));
}

export function guidePath(g: SeoGuide | string): string {
  return `/seo/guides/${typeof g === "string" ? g : g.slug}`;
}
