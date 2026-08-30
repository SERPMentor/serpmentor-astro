# Running SERP Mentor

Plain-language guide to how this site works and how you control it.

---

## The mental model

There are **two systems**, and they do different jobs:

| | WordPress (`serpmentor.com/wp-admin`) | This Astro project (GitHub repo) |
|---|---|---|
| **What it is** | Your content database + editor | The actual website visitors see |
| **You use it for** | Writing posts, editing page text, images | Design, navigation, page structure, tools pages, pricing, redirects |
| **Who edits it** | You, in the WP dashboard | A developer, in the code |

WordPress is now **headless** — it holds the words and pictures, but it no longer
renders the public website. Astro reads from WordPress and builds the site.

---

## How a new blog post reaches the live site

Astro builds a **static site** — it reads everything from WordPress **once, at
build time**, and turns it into plain HTML files. It does *not* check WordPress
on every visit.

So the flow is:

```
You publish a post in WP  →  the site is rebuilt  →  the new post is live
```

The only question is what triggers the rebuild. Three options, best to worst:

### 1. Automatic (recommended) — "publish in WP, live in ~2 minutes"

1. **Host the site** on Cloudflare Pages, Netlify, or Vercel (all have a free
   tier). Connect it to the GitHub repo `SERPMentor/serpmentor-astro`.
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: 22
2. The host gives you a **Build Hook URL** (a secret link — Netlify: *Site
   settings → Build & deploy → Build hooks*; Cloudflare Pages: *Settings →
   Builds → Deploy hooks*; Vercel: *Settings → Git → Deploy Hooks*).
3. In WordPress, make WP call that URL whenever a post changes. Easiest:
   install the **"WP Webhooks"** plugin (free), add a webhook that fires on
   *Post published* and *Post updated*, and paste the build-hook URL.
   *(Or a one-line `wp_after_insert_post` snippet in a small custom plugin —
   your developer can add this.)*

Now: **hit Publish in WordPress → the host rebuilds automatically → the post is
live a couple of minutes later.** No code, no terminal.

### 2. Manual button

Skip the WP webhook. When you've published something and want it live, open the
host dashboard and click **"Trigger deploy" / "Retry deploy"**. Same result,
one extra click.

### 3. Scheduled

Set the host (or a free cron service like cron-job.org) to hit the build hook
every night. New posts go live within 24 hours with zero effort. Good as a
safety net even if you also use option 1.

---

## What happens automatically vs. what needs a developer

### Automatic on the next build — no code needed

- **New blog post** → appears on the homepage, the blog index, its category
  archive, and "related posts". Draft posts stay hidden until published.
- **Editing a post** (text, images, title, featured image) → updates everywhere.
- **New category** in WP that has at least one post → gets its own archive page
  at `/{category-slug}` automatically, and shows up in category lists.
- **Post images** → downloaded and self-hosted on the next build (see
  `RUNNING` note below).
- **Author** → the byline links to `/author/{slug}`.

### Needs a developer (edit the code in this repo)

- Site **navigation** (the top menu) — `src/components/SiteHeader.astro`
- **Footer** links and columns — `src/components/SiteFooter.astro`
- **Pillar pages** (`/seo/tech`, `/seo/backlinks`, …) — their content and which
  guides they feature live in `src/lib/pillars.ts`
- **Category page** headings, SEO titles, hero badges — `src/lib/pages.ts` /
  `categoryMeta()` in `src/lib/posts.ts`
- **Static pages** pulled from WP (About, Coaching, Local SEO, legal, …) — the
  list is `src/lib/pages.ts`. Add a `wpSlug` there and the page appears.
- **Design, colours, typography** — `src/styles/global.css`
- **Homepage layout**, Services/pricing, Resources, Contact — their own files in
  `src/pages/`
- **Redirects** (old URLs → new) — `astro.config.mjs`
- **Author bios, photos, social links** — `src/lib/authors.ts`
- **Team on the About page** — `src/lib/team.ts`

A new author or team member profile does **not** appear automatically — their
name, title, bio and photo are set in code (`authors.ts` / `team.ts`) because
WordPress only stores a name and a placeholder avatar.

`AGENTS.md` in this repo is the developer's reference for all of the above.

---

## Doing a build yourself (developer)

```bash
npm install          # first time only
npm run build        # downloads images from WP, then builds into dist/
npm run preview      # view the built site locally at http://localhost:4321
```

`npm run build` always runs `scripts/fetch-images.mjs` first — that pulls every
image from WordPress into `public/images/wp/` so the live site never hotlinks
`serpmentor.com`. New images are picked up automatically; already-downloaded
ones are skipped.

---

## Quick answers

**"I published a post but I don't see it on the site."**
The site hasn't been rebuilt yet. With option 1 set up, wait ~2 minutes. Without
it, trigger a deploy in the host dashboard.

**"I want to change the menu / add a page to the nav."**
That's a code change — send it to your developer, or edit
`src/components/SiteHeader.astro`.

**"I changed a post's category in WP."**
Its URL changes too (posts live at `/{category}/{post}`). The old URL keeps
working via an automatic redirect.

**"Where do I change the logo / colours / homepage?"**
In this repo — `public/logo.png`, `src/styles/global.css`, `src/pages/index.astro`.

**"Is WordPress still needed?"**
Yes — it's your content store and editor. Keep it running. Just don't expect
`serpmentor.com` to serve the public site once this is deployed; that's Astro's job.
