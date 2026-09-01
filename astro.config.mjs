// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://serpmentor.com',

  // Clean URLs, no trailing slash: /seo, /seo/tech, /seo/best-ai-seo-tools.
  // Every link Astro emits is slash-free, and `build.format: 'file'` writes
  // each page as `path.html` (not `path/index.html`) so Cloudflare Pages
  // serves it at `/path` and 301-redirects any stray `/path/` back to it.
  // With the default 'directory' format Cloudflare canonicalises the other
  // way (adds the trailing slash), which is the bug this fixes.
  trailingSlash: 'never',
  build: { format: 'file' },

  redirects: {
    // old blog category URLs → real category archives
    '/blog/seo': '/seo',
    '/blog/seo-backlinks': '/seo/backlinks',
    '/blog/linkedin': '/linkedin',
    '/blog/case-study': '/case-study',
    '/blog/ai-search': '/blog',
    '/blog/content-marketing': '/blog',
    // note: no "/blog/technical-seo" — a real post uses that slug, so the
    // /blog/[slug] stub redirects it to /seo/technical-seo instead.

    // old /hub/ pages → the new SEO pillar pages
    '/hub/seo': '/seo',
    '/hub/technical-seo': '/seo/tech',
    '/hub/link-building': '/seo/backlinks',
    '/hub/ai-search': '/seo/ai-optimization',

    // (flat old post URLs like /dofollow-backlink-sites are handled by
    // src/pages/[...oldpost].astro; /seo-backlinks and /seo-backlinks/* are in
    // public/_redirects.)

    // old WordPress page slugs → clean paths
    '/about-us': '/about',
    '/seo-specialist-service': '/hire-seo-specialist',
    '/career': '/careers',
    '/privacy-policy': '/privacy',
    '/terms-and-conditions': '/terms',
  },
});
