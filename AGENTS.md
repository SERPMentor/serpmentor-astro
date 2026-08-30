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
| `/{category}/{post}/`       | `src/pages/[category]/[slug].astro`  | single post     |
| `/seo/{pillar}/`            | `src/pages/seo/[pillar].astro`       | pillar page (topic hub) |
| `/blog/`                    | `src/pages/blog/index.astro`         | all posts       |
| `/blog/{post}` (old)        | `src/pages/blog/[slug].astro`        | redirect stub → new URL |

`src/lib/posts.ts` is the only file that talks to WordPress for the post list
and the only place that decides a post's URL (`postPath`, `categoryPath`). A
post's category = its first WordPress category. Live categories with posts:
`seo` (most), `linkedin`, `case-study`, `seo-backlinks`. Add a category in
WordPress and its archive + posts appear automatically on the next build.

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

Each pillar also carries a `bodyHtml` field — ~600 words of long-form content
(h2/h3/lists/callout) authored in `pillars.ts`. The page injects ids on the
`<h2>`s and builds a sticky table of contents from them, then follows with the
curated guide grid, tools, and related sections.

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

## Design

The look is modelled on backlinko.com. All of it lives in `src/styles/global.css`:

- Type: Inter (loaded from Google Fonts at the top of global.css), 17px body
- Colour: teal `#00bc98`, near-navy ink `#1d2b35`, grey `#646568`, hairline `#e0e1e9`
- Surfaces: white page, `#f8f9fe` tint bands (`.section-alt`), 1140px container
- Cards: white, 1px border, 10px radius, no shadow at rest
- No gradient text, no glow, no big shadows — flat and quiet

Change a colour or size in the `:root` block at the top and it updates everywhere.

## Site chrome & components

- `src/components/SiteHeader.astro` / `SiteFooter.astro` — nav + footer for the
  whole site. Edit the menu once there, not per page.
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

## Post content sanitising

`src/lib/content.ts` `sanitizePostContent()` runs on every post's `content`
before render. It strips a third-party "Fast Reading Roadmap" TOC widget
(`div.modern-toc-animated`), all inline `<style>`/`<script>`, and orphaned
scroll-helper divs. The site builds its own "On this page" sidebar instead.
`sanitizePageContent()` is the heavier version for page-builder pages.

Note: `best-linkedin-free-ai-tools` still contains a forex-broker comparison
table (`section.account-types-section`) copied in from another site — that is an
editorial fix to make in WordPress, not stripped here.

## Still to do

- Reviews/affiliate hosting collection + pages
- Customer login/signup
- Server-side 301s at deploy (the redirect stubs are meta-refresh only)
- Deploy to production

## Notes

- User is non-technical, learning as we go — explain changes in plain language
- Match styling across new pages to what's already in index.astro
