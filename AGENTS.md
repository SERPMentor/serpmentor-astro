# SERP Mentor Project

## What this is

Rebuilding an SEO/AI/tech blog (currently WordPress) into a headless setup:
WordPress (backend, content only) + Astro (frontend, what visitors see).

## Stack

- Backend: WordPress at https://serpmentor.com with WPGraphQL plugin installed
- Frontend: Astro project in this folder (serpmentor-astro)
- GraphQL endpoint: https://serpmentor.com/graphql

## Progress so far

- [x] WordPress + WPGraphQL confirmed working
- [x] Astro project created (empty template)
- [x] Homepage (src/pages/index.astro) pulls and displays blog posts from WordPress
- [x] Individual post pages at src/pages/blog/[slug].astro
- [x] Design system rebuilt to follow backlinko.com (src/styles/global.css)
- [x] Shared header/footer components, used by every page
- [x] Category-based URLs: /{category}/ archives and /{category}/{post}/ posts
- [x] Font Awesome icons (was emoji)
- [x] Post cards show WordPress featured images (PostCard component)
- [x] Pillar pages at /seo/{topic}/ (replaced /hub/*)

## URLs / routing

WordPress-style permalinks, `/%category%/%postname%/`:

| URL                         | File                                | What            |
| --------------------------- | ----------------------------------- | --------------- |
| `/{category}/`              | `src/pages/[category]/index.astro`   | category archive + pillar strip |
| `/{category}/{post}/`       | `src/pages/[category]/[slug].astro`  | single post (seo / linkedin / case-study) |
| `/seo/backlinks/{post}/`    | `src/pages/seo/backlinks/[slug].astro` | single link-building post |
| `/seo/{pillar}/`            | `src/pages/seo/[pillar].astro`       | pillar page (topic hub) |
| `/blog/`                    | `src/pages/blog/index.astro`         | all posts       |
| `/blog/{post}` (old)        | `src/pages/blog/[slug].astro`        | redirect stub → new URL |

`src/lib/posts.ts` is the only file that talks to WordPress for the post list
and the only place that decides a post's URL (`postPath`, `categoryPath`). A
post's category = its first WordPress category. Live categories with posts:
`seo` (most), `linkedin`, `case-study`, `seo-backlinks`. Add a category in
WordPress and its archive + posts appear automatically on the next build.

**Link-building posts nest under the backlinks pillar.** Any post in a
WordPress category matching `isBacklinksCategory()` (`seo-backlinks`,
`backlinks`, `link-building`) gets URL `/seo/backlinks/{slug}` from `postPath`,
`categoryPath` returns `/seo/backlinks` for it, and it is served by
`src/pages/seo/backlinks/[slug].astro` (which shares the full article layout,
`src/components/PostArticle.astro`, with `[category]/[slug].astro`). The
`/seo/backlinks` **pillar page is their archive** — `seo/[pillar].astro`
special-cases `pillar.slug === "backlinks"` to list every backlinks-category
post. No separate `/seo-backlinks` archive is built; `gen-redirects.mjs` emits
`/seo-backlinks` → `/seo/backlinks` and `/seo-backlinks/* ` →
`/seo/backlinks/:splat`, plus the usual flat / `/blog/` 301s point at the new
path. So publishing a link-building draft in WordPress (category "SEO
Backlinks") makes it appear at `/seo/backlinks/{slug}` with the new design and
full redirect coverage on the next deploy, no code change.

Each category archive's hero (`<h1>`, `<title>`, description, icon, badge row)
comes from `categoryMeta()` in `posts.ts` — hand-tuned per slug for SEO, with a
generated fallback. Add a `CATEGORY_META` entry when a new category matters.

Old links (`/blog/seo`, `/hub/*` …) are redirected in `astro.config.mjs`.

## Pillar pages (topic hubs)

`src/lib/pillars.ts` defines the pillar pages — curated topic hubs that sit under
a category, **no `/hub/` segment**. Currently 5, all under `seo`:
`/seo/tech/`, `/seo/backlinks/`, `/seo/news/`, `/seo/tools/`, `/seo/ai-optimization/`.

Each pillar has an intro, a hand-picked list of guide slugs (real WordPress
posts — unknown slugs are ignored), optional free-tool cards, and an auto
"latest" feed. `news` has no curated slugs so it auto-fills with recent SEO
posts. `src/pages/seo/[pillar].astro` renders them; the homepage and every
`/{category}/` archive show pillar cards from `getPillars(category)`.

Each pillar also carries a `bodyHtml` field — long-form content
(h2/h3/lists/callout) authored in `pillars.ts`. The page injects ids on the
`<h2>`s and builds a sticky table of contents from them, then follows with the
curated guide grid, tools, and related sections.

The five pillar bodies were expanded (Sept 2026) with ~14 trending SEO + AI
topics, one `<h2>` section each: AI Overviews/AEO, GEO, llms.txt & AI crawlers,
entity SEO (ai-optimization); INP & Core Web Vitals, schema strategy,
programmatic SEO (tech); core-update timeline, zero-click search, content decay,
E-E-A-T 2026 (news); digital PR, "do backlinks still matter" (backlinks); the
2026 stack & AI-visibility tracking (tools). Each uses `<figure>` tables and
CSS bar charts.

## Trending SEO topic guides (`/seo/guides`)

`src/lib/seo-guides.ts` (`SEO_GUIDES`, 20 entries) drives standalone,
hand-authored articles at `/seo/guides/{slug}` plus a hub at `/seo/guides`.
Each guide has an optimised `slug`, a keyword-first `metaTitle` (kept near 60
chars), `metaDescription`, a `theme` (`ai` / `authority` / `technical` /
`rankings`, which sets the hub grouping and hero accent), `bodyHtml` in
Backlinko tone (tables in `<figure>`, charts in `<figure class="chart">`,
callouts, check-lists), 3 `faqs` (→ FAQPage schema + on-page accordion via
`Faq.astro`), and `related` slugs. `src/pages/seo/guides/[slug].astro` renders
the article (pillar-style hero + `<PageByline>` + sticky TOC built from the body
`<h2>`s + FAQ + related grid + CTA); it emits `webPageNode` + `articleNode`
(BlogPosting) + `bylinePersonNodes()` + breadcrumb + `itemListNode`.
`src/pages/seo/guides/index.astro` is the hub. Guides are surfaced in: the sitemap; the search index (`type: "guide"`, full
stripped body as keywords); the SEO Guides mega menu ("Trending SEO topics"); a
chip list on the `/seo` archive; a grouped "Trending SEO topics" section on the
**homepage** (`.trending-groups` chip columns, all 20 by theme); a chip list on
each single post is not added, but every **pillar page** (`seo/[pillar].astro`)
shows a "Trending {name} topics" card section from the `PILLAR_GUIDES` slug map
in that file; and related-guide cards between guides. To add a guide, append a
`SEO_GUIDES` entry (and optionally add its slug to `PILLAR_GUIDES`).

**Prose data-viz helpers** (`global.css`, near `.prose .callout`): wrap authored
tables in `<figure><table>…</table><figcaption>…</figcaption></figure>` — the
figure scrolls a wide table on mobile (`min-width: 30rem`) and styles the
caption. `<figure class="chart">` is a padded card holding `<figcaption>`
(bold), a `.bars` grid, and an optional `<p class="chart-note">`. Each bar is
`<div class="bar"><span>Label</span><span class="bar-track"><span class="bar-fill"
style="width:N%"></span></span><span class="bar-val">value</span></div>`; add
`is-muted` to `bar-fill` for a grey bar; an empty `bar-val` is hidden. There is
also `.prose .stat-grid` / `.prose .stat` (`<b>` number + `<span>` label) for
number tiles, `.prose .expert-tip` (`<p class="expert-tip-head">` with an
`<i>` badge + `<strong>` name + `<span>` role, then the tip) for a named,
attributed pointer from the team, and `.prose .case-study`
(`<p class="case-study-label">` + `<h4>` + `<p>` + `<p class="case-study-result">`)
for a short anonymised case study with a result line. Every trending guide
carries one of each near the end of its body.

To add a pillar: add an entry to `PILLARS` in `pillars.ts` (including `bodyHtml`).
To add pillars for another category, copy `src/pages/seo/[pillar].astro` to
`src/pages/{category}/[pillar].astro` and change the `getPillars("seo")` call.
`[category]/[slug].astro` already refuses to build a post whose slug collides
with a pillar slug.

## Article page (`[category]/[slug].astro`)

Backlinko-style layout: a coloured hero band (purple) with breadcrumb, category
tag, `<h1>`, and the WordPress featured image framed on the right; a `<Byline>`
(avatar + "Written by {author}" + "Last updated {date} · {n} min read"); then a
3-column body — sticky social `<ShareRail>` | `.prose` content | sticky "On this
page" TOC (with scroll-spy + a top reading-progress bar + a back-to-top button).
After the content: `<AuthorCard>` and a full-width "Continue reading" grid.
Emits Article JSON-LD and OpenGraph/Twitter tags. Absolute URLs use
`Astro.site` (`https://serpmentor.com`, set in `astro.config.mjs`).

## Authors

`src/lib/authors.ts` — registry keyed by WordPress author slug (WP only stores a
name + placeholder Gravatar). `getAuthor(wpSlug, wpName)` resolves the profile;
unknown slugs fall back to the SERP Mentor editorial entry with a title-cased
name. `/author/{slug}` pages are generated from `listAuthors()`. Add a real
photo via the `image` field (Saiful's is a WordPress upload URL); no `image` →
`authorInitials()` draws an initials avatar. Social links go in the `socials`
object (`x`, `linkedin`, `facebook`, `instagram`, `youtube`, `website`, `email`);
`<SocialLinks>` renders them as small round icon buttons on the author card and
the author page. The footer "Connect" column also uses Saiful's real URLs.

## Image full view (lightbox)

`src/components/Lightbox.astro` — include once per page. It makes every `<img>`
inside a `.js-zoom` container open full-screen on click (Esc / click-outside to
close). On the article page that's the hero featured image and the whole
article body. Note: `global.css` has a `[hidden]{display:none!important}` rule
so components can rely on the `hidden` attribute regardless of their own
`display` value.

## Prose typography (`.prose`)

Long-form body copy — blog posts (`.post-content.prose`) and pillar bodies
(`.pillar-body.prose`) — share one type system in `global.css` under `.prose`:
`h2` with a hairline top divider, teal-square `<ul>` markers, teal numbered-pill
`<ol>` markers, `<ul class="check-list">` for white-tick circles, and
`<div class="callout">` / `<p class="prose-lede">` helpers.

## Images are self-hosted

`npm run build` runs `scripts/fetch-images.mjs` first (`prebuild`). It downloads
every remote image the site references — post featured images, images inside
post/page content, and the team/author photos — into `public/images/wp/`, and
writes `src/lib/image-map.json`. `src/lib/images.ts` exposes `localImage(url)`
(single URL) and `localiseImages(html)` (rewrites every `<img src>` in a string);
both fall back to the remote URL if it isn't in the map. Every `<img>` that
renders a WordPress URL goes through one of them. To refresh: `npm run
fetch-images` (skips files already downloaded).

## Icons, logo, favicon

- Icons: Font Awesome 6 free, `@import` at the top of `global.css` (CDN, like
  Inter). Use `<i class="fa-solid fa-NAME"></i>`; `.card-icon` styles the chip.
- Logo: `public/logo.png` (873×140). The WordPress source file had ~60%
  transparent padding baked in, so it was trimmed to the artwork bounding box —
  keep any replacement tightly cropped or it will look small. Rendered by
  `SiteHeader.astro` / `SiteFooter.astro` inside `a.brand > img`; sizes set in
  `global.css` (`.brand img` 38px, `.site-footer .brand img` 44px).
- Favicon: `public/favicon.ico` (32) + `icon.png` (192) + `apple-touch-icon.png`
  (180), generated from the official SERP-Mentor-Logo-fav. To refresh, drop new
  source art in and re-run the sips resize chain. `src/components/Favicons.astro`
  holds the `<link>` tags and is included in every page `<head>`.
- Author social links: `authors.ts` `socials{}` → `<SocialLinks>` renders small
  round icon buttons in the article byline (beside the name), the author card,
  and the author page.

## URLs have no trailing slash

`trailingSlash: 'never'` in `astro.config.mjs`. `postPath`, `categoryPath`,
`pillarPath` all return slash-free paths; every hand-written `href` is slash-free
too. Build format stays `directory` (dist/seo/index.html) so hosts still resolve
a stray `/seo/`, but nothing on the site links that way.

## Voice

Hand-written site copy (heroes, section subheads, FAQ answers, CTA panels,
pillar `intro`s, category `description`s) follows **Backlinko's tone**: short
punchy sentences, one-line paragraphs, direct "you", contractions, no hedging or
corporate jargon, an occasional "Here's the deal:" bucket brigade. Don't touch
WordPress post bodies or client testimonials.

**No em dashes** anywhere in copy. Use commas, periods, colons or parens.
WordPress content is auto-cleaned at build by `stripEmDashes()` in
`src/lib/content.ts` and the em-dash replace in `src/lib/excerpt.ts`.

## Design

The look is modelled on backlinko.com. All of it lives in `src/styles/global.css`:

- Type: Inter (loaded from Google Fonts at the top of global.css), 17px body
- Colour: teal `#00bc98`, near-navy ink `#1d2b35`, grey `#646568`, hairline `#e0e1e9`
- Surfaces: white page, `#f8f9fe` tint bands (`.section-alt`), 1140px container
- Cards: white, 1px border, 10px radius, no shadow at rest
- No gradient text, no glow, no big shadows — flat and quiet

Change a colour or size in the `:root` block at the top and it updates everywhere.

## Homepage hero

`index.astro` hero is two columns. Left: headline (no eyebrow), pitch, two CTAs,
then `.hero-trust` — a `★★★★★ 5.0 from client reviews` line plus 5 team avatars
(Saiful first, from `TEAM`) and a `{guideCount}+ guides · {n} specialists · since
2007` line. Right (`.hero-side`): `src/components/TeamSpotlight.astro` (rotates
through the whole team, Saiful first, ~6.5s then 4.2s, pauses on hover/focus,
respects reduced-motion) + `.hero-quote`, a rotating client testimonial (first
sentence of each `TESTIMONIALS` entry, 5s, inline script at the bottom of
`index.astro`). A faint CSS grid wash sits behind the hero (`.hero::before`).
The old "Latest guide" card and the earlier duplicate avatar strip were dropped.

Trust still missing on the homepage: a full testimonials section (only lives on
`/about` today) and any client-results numbers.

## Navigation (mega menu)

`src/lib/nav.ts` (`NAV`) is the single source for the header menu. Items are
either a plain link (`href`) or a mega item (`columns` of `{label, href, icon,
desc}` + an optional `promo` box + an `href` "landing" page). Current top level:
**SEO Guides ▾**, **Free Tools ▾**, **Services ▾**, About, Contact.

`src/components/SiteHeader.astro` renders it and holds the JS. Desktop: hover
opens a centred full-width mega panel; clicking a top-level mega item navigates
to its landing `href`; Esc / click-outside / resize closes. Mobile (≤920px):
the hamburger drawer turns each mega item into a tap-to-expand accordion
(descriptions hidden). All the `.mega-*` / `.nav-*` styles live in `global.css`
right after the `.site-header` block. `navItemActive()` marks the current
section.

## Site chrome & components

- `src/components/SiteHeader.astro` / `SiteFooter.astro` — nav + footer for the
  whole site. Edit the menu in `src/lib/nav.ts`; the footer columns are still
  inline in `SiteFooter.astro`.
- `src/components/PostCard.astro` — the standard post card (featured image on top,
  date / title / excerpt / CTA). Used on the homepage, category archives, blog
  index, author pages, hub pages and "related posts". Props: `post` (required),
  `dateStyle`, `kicker`, `featured`, `cta`. Posts with no WordPress featured
  image get a placeholder icon instead.

## Excerpts

`src/lib/excerpt.ts` flattens WordPress excerpt HTML to plain text. Always use it.
WordPress ends excerpts with a "Read More" `<a>`; rendering that raw inside a card
that is itself an `<a>` creates nested links, which browsers un-nest and that
visibly breaks the card layout.

## WordPress "pages" (About, Services, legal …)

`src/lib/pages.ts` (`SITE_PAGES`) lists the WordPress **pages** rendered here,
each mapping a `wpSlug` → a clean `path` with its own heading/meta. `[page].astro`
fetches all their content in one GraphQL call at build, runs
`sanitizePageContent()` (strips page-builder wrapper divs, theme classes, inline
styles, stock/plugin/icon images, dupes), then renders it in `.prose`
(`.page-prose`) with a hero, the first image as a banner, a lightbox, and a CTA
(non-legal pages). Old WP slugs redirect to the new paths in `astro.config.mjs`.
`about.astro` / `services.astro` were deleted — those URLs are now WP-driven.

## Blog post rewrites (`src/lib/blog-content.ts`)

All 20 published WordPress posts have a hand-authored, Backlinko-tone rewrite in
`BLOG_CONTENT` (keyed by WP slug). When a slug is present, `PostArticle.astro`
renders its `bodyHtml` and skips the WordPress GraphQL fetch entirely (so the
build is much faster); `title` / `metaTitle` / `metaDescription` / `updated` /
`faqs` override when set, everything else (author, featured image, publish date,
category) still comes from WordPress so the owner keeps controlling those.
Bodies use the `.prose` helpers (tables in `<figure>`, `<figure class="chart">`,
`.callout`, `.check-list`, `.expert-tip`, `.case-study`, `.stat-grid`), no em
dashes. A post with **no** entry falls back to the live WordPress body via the
`else` branch (used for future posts and any not-yet-rewritten drafts). To
rewrite another post, add a `BLOG_CONTENT` entry.

## Post content sanitising

`src/lib/content.ts` `sanitizePostContent()` runs on every WordPress-sourced
post's `content` before render (rewrites in `blog-content.ts` skip it). It strips a third-party "Fast Reading Roadmap" TOC widget
(`div.modern-toc-animated`), all inline `<style>`/`<script>`, and orphaned
scroll-helper divs. The site builds its own "On this page" sidebar instead.
`sanitizePageContent()` is the heavier version for page-builder pages.

Note: the WordPress body of `best-linkedin-free-ai-tools` contains a stray
forex-broker table copied in from another site. That no longer shows on the
site because the post is rewritten in `blog-content.ts`, but it should still be
cleaned up in WordPress.

## Forms (contact + newsletter)

`src/lib/site.ts` holds the two Formspree endpoints. They are **placeholders**
until the owner pastes real ones in (`FORMSPREE.contact`, `FORMSPREE.newsletter`).
`src/components/NewsletterForm.astro` is the shared newsletter widget (used on the
homepage, blog index, resources). It posts via `fetch` and redirects to
`/newsletter-success`; if no endpoint is configured it shows a "not connected
yet" note instead of failing. The contact form (`contact.astro`) has its own
inline handler with the same behaviour. `.form-note` styles the status line.

## Service / money pages (hand-built)

`/services`, `/hire-seo-specialist`, `/local-seo-services`, `/coaching` and
`/reviews` are hand-built `.astro` pages, NOT WordPress content.

Service pages and the `/seo/for/*` industry pages use a two-column hero
(`.page-header.page-header-split`): copy + CTAs + `<PageByline />` on the left,
`<HeroTrustCard />` (rating + client quote + team + "meet the team") on the
right. `PageByline.astro` shows the editorial workflow with short names, each
linking to LinkedIn — **Written by Alif · Fact-checked by Towhid · Editorial
lead Saiful** (pulled from `TEAM` by name match) — plus a build-time "Updated
{month year}". The matching schema comes from `bylinePersonNodes()` +
`BYLINE_REFS` in `schema.ts` (WebPage `author` / `reviewedBy` / `editor` → three
`Person` nodes with `sameAs` LinkedIn). Coaching keeps its purple `.article-hero`
with the founder photo instead. `hire-seo-specialist`,
`local-seo-services` and `coaching` used to come from WordPress via `[page].astro`
but the content was an unstructured wall of text, so they were rebuilt in the
site's own design (hero → value cards → coverage → numbered process → FAQ → CTA).
Their old WP slugs still redirect in `astro.config.mjs`. `src/lib/pages.ts` now
only holds `careers`, `privacy`, `terms`.

All five service pages carry a `<SeoForecast>` section (before the FAQ):
`src/components/SeoForecast.astro` renders a projected 12-month organic
trajectory as an inline-SVG teal column chart (one measure only, conversions are
a *derived* figure, never a second axis), four stat tiles, a timing line, an
"assumes" list and a "planning model, not a guarantee" disclaimer. Props:
`heading`, `intro`, `seriesLabel`, `unit`, `points` (number[] months 1..N),
`convRate` (0-1), `convLabel`, `timing`, `assumptions` (string[]). Each page
uses **different** numbers and framing on purpose: `/services` a mid-sized site
1.2k→8.3k sessions, `/hire-seo-specialist` an established site 4k→18.6k,
`/local-seo-services` profile actions 45→365, `/coaching` a DIY student site
400→5.4k, `/website-design` a brand-new domain 40→5.2k. `.forecast-*` styles are
in `global.css` under `/* SEO forecast */`.

`src/components/Faq.astro` is the shared FAQ accordion (`<details>` + FAQPage
JSON-LD). `src/lib/reviews.ts` holds the tool-review data for `/reviews` — put
affiliate URLs in each entry's `link`.

`/website-design` is the web-design/development landing page (SERP Mentor also
builds sites). `src/lib/build-services.ts` holds `BUILD_GROUPS` (group icon +
blurb, one per `NicheKind`) and `BUILD_MARKETS` (country chips with emoji flags).
`.chip-list` / `.market-list` / `.platform-list` styles live in `global.css`
near `.feature-grid-4`.

## SEO-by-industry pages (`/seo/for/{slug}`)

`src/lib/niches.ts` (`NICHES`, 56 entries) drives programmatic industry SEO
landing pages: `src/pages/seo/for/[niche].astro` plus the hub
`src/pages/seo/for/index.astro`. Each niche has a `kind`
(`local` / `pro` / `content` / `business`) that switches the framing, a target
`keyword`, an `edge` sentence, `clusters` (named groups of representative
searches, ~15 per niche), and `moves` (the three things that move rankings for
that niche). Those last three fields are the per-niche unique content that keeps
these from being thin doorway pages. The template's "what we do" and "how it
works" blocks are shared per kind; there's also a per-page byline + "Updated
{month year}", `dateModified` in schema, an FAQ with a niche-specific question,
and `src/components/TrustStrip.astro` (credentials bar + rotating real client
testimonial from `TEAM`). Chips on `/website-design` and the "Related" section
link between them; all 56 are in the sitemap and the SEO Guides mega menu links
the hub. To add an industry, add a `NICHES` entry.

Every industry page also carries a **phased plan + forecast** (after "How it
works", before the FAQ), both derived in `src/lib/niche-forecast.ts` so 56 pages
never share the same numbers: `nichePlan(niche)` returns three `kind`-specific
phases (Foundation → Build → Compound) with that niche's own `moves` injected
into the build phase, and `nicheForecast(niche)` returns `<SeoForecast>` props
where the starting point, growth multiple and conversion rate are a deterministic
per-slug hash inside a band set by `kind` (local = leads → booked jobs, pro =
visits → consultations, content = sessions → subscribers or affiliate clicks,
business = sessions → orders / signups / leads), with per-slug `CONV_OVERRIDE`
entries for the labels and rates that differ (e.g. `ecommerce` → "Online orders"
1.4–2.4%, `restaurants` → "Reservations and calls"). The forecast renders on a
tinted band via the component's `alt` prop. All copy uses "4 to 8 weeks" word
form, never dashes.

## Analytics, Search Console & AdSense

All in `src/components/Favicons.astro` (runs in every `<head>`):
- Search Console + AdSense **verification metas** — always present.
- **GA4** (`G-6NPV9ZVMYM`) gtag.js + **AdSense** (`ca-pub-8144753898909480`)
  loader — only on the built site (`import.meta.env.PROD`), so `astro dev`
  traffic stays out of the reports. To preview them locally, run `astro build`
  + `astro preview`. IDs are constants at the top of the file.

## Structured data (JSON-LD)

`src/lib/schema.ts` builds all schema.org nodes; `src/components/JsonLd.astro`
emits one `<script type="application/ld+json">` per page wrapping an array in a
`@graph`. Nodes link by `@id`.

- **Site-wide** (`Favicons.astro`, every page): `Organization`/`ProfessionalService`
  (sameAs, contactPoint, addresses, areaServed, founder, knowsAbout) + `WebSite`
  with a `SearchAction` pointing at `/search?q=`.
- **Per page**: `WebPage`/`CollectionPage`/`AboutPage`/`ContactPage`/`ProfilePage`
  + `BreadcrumbList` (home has none). Blog posts add `BlogPosting` (+ `speakable`)
  and a `Person` for the author; archives/pillars/blog add `ItemList`; the five
  service pages add `Service`; `/reviews` adds an `ItemList` of `Review` →
  `SoftwareApplication`; author pages add `Person` + `ItemList`.
- `Faq.astro` still emits its own `FAQPage` on the pages that use it.

To add schema to a new page: import the builders + `JsonLd`, assemble a `graph`
array, drop `<JsonLd graph={graph} />` in the `<head>`. Contact details / socials
used in the Organization node come from `src/lib/site.ts` + `src/lib/team.ts`.

## Sitemap & robots

`src/pages/sitemap.xml.ts` and `src/pages/robots.txt.ts` are dynamic endpoints,
rebuilt each deploy. The sitemap pulls posts, categories, pillars, authors and
the hand-built pages from the same helpers the pages use, so new content appears
automatically. `/search` is excluded (noindex). Update `STATIC_PATHS` in
`sitemap.xml.ts` when a new top-level page is added.

## Contact details

`src/lib/site.ts` `CONTACT` is the single source for the public phone / WhatsApp
number (`+880 1912 055505` — same for call and WhatsApp), support email
(`support@serpmentor.com`) and the company LinkedIn URL. `whatsappUrl(msg?)`
builds a `wa.me` link with an optional pre-filled message. The contact page
shows all four as a `.contact-methods` list; every "book / call" CTA on the
service pages has a WhatsApp button beside it; the footer "Connect" column lists
WhatsApp + email. Change the number or email in one place.

## Search (command palette)

`src/components/SearchPalette.astro` is a modal command palette mounted once in
`SiteHeader.astro`. Opens from the header **search box** (`.nav-search`, an
input-styled `[data-sp-open]` link showing "Search" + a `⌘K` / `Ctrl K` hint;
collapses to an icon 920–1120px, becomes a plain drawer row on mobile), Cmd/Ctrl+K,
or `/`. It fetches `/search-index.json` on first open and ranks + groups in the
browser.

`src/pages/search-index.json.ts` builds the index from every content type
(guides, pillars, category archives, all 56 industry pages, service pages, tools,
static pages) each tagged with a `type`. Pillars get their full stripped
`bodyHtml` plus a hand-curated synonym blob (`PILLAR_KW`) so phrasings like "meta
description" or "core web vitals" resolve. Industry pages include their cluster
search terms.

Ranking (`score()` in the component): exact/prefix/substring title bonuses,
per-term title + haystack hits with word-boundary bonuses, an all-terms-in-title
bonus, a fuzzy subsequence fallback for typos, a small per-type weight and a
recency nudge. Result **groups are ordered by their best hit's score**, not a
fixed order. `/search` is a thin page that just auto-opens the palette (with any
`?q=`).

## Still to do

- **Dark mode toggle** — needs a real audit of ~87 hardcoded colours in
  global.css and a `[data-theme]` / `prefers-color-scheme` token layer
- **Real free tools** — the 6 cards on the homepage/resources still don't link
  anywhere. Build the ones that need no paid data (on-page/meta checker, SERP
  snippet preview, robots.txt tester, keyword density, meta-tag generator);
  replace backlink/keyword-volume with those.
- **FAQ blocks + FAQ schema** on pillar pages (service pages + /reviews now have them via `Faq.astro`)
- Reviews page: add tool logos and real affiliate URLs in `src/lib/reviews.ts`
- Programmatic web-design landing pages per niche + country (e.g.
  `/website-design/plumbers-usa`) — big SEO opportunity, own project
- Customer login/signup
- Server-side 301s at deploy (the redirect stubs are meta-refresh only)
- Deploy to production

## Notes

- User is non-technical, learning as we go — explain changes in plain language
- Match styling across new pages to what's already in index.astro
