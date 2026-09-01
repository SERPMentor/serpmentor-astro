// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://serpmentor.com',

  // Clean URLs, no trailing slash: /seo, /seo/tech, /seo/best-ai-seo-tools.
  // (Output stays as dir/index.html so hosts still resolve a stray trailing
  // slash; every link Astro emits is slash-free.)
  trailingSlash: 'never',

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

    // link-building posts live at /seo/backlinks/{slug}. Old flat and interim
    // /seo-backlinks/{slug} URLs 301 there. (/blog/{slug} is handled by the
    // blog/[slug].astro stub; the full /seo-backlinks/* wildcard is in _redirects.)
    '/dofollow-backlink-sites': '/seo/backlinks/dofollow-backlink-sites',
    '/seo-backlinks': '/seo/backlinks',
    '/seo-backlinks/dofollow-backlink-sites': '/seo/backlinks/dofollow-backlink-sites',

    // old WordPress page slugs → clean paths
    '/about-us': '/about',
    '/seo-specialist-service': '/hire-seo-specialist',
    '/career': '/careers',
    '/privacy-policy': '/privacy',
    '/terms-and-conditions': '/terms',
  },
});
