/**
 * Clean the raw HTML that comes back from WordPress before it is rendered.
 *
 * The posts carry a third-party "Fast Reading Roadmap" table-of-contents
 * widget (`<div class="modern-toc-animated …">`) plus its own `<style>` and
 * `<script>`. The site builds its own "On this page" sidebar, so that widget is
 * redundant, and its assets point at another domain. Strip all of it.
 */
/**
 * The site copy avoids em dashes, so WordPress content is normalised to match:
 * an em dash (spaced or not) becomes a comma, then any comma left stranded
 * before a period or a closing tag is tidied away. Used by both sanitisers and
 * by the excerpt cleaner.
 */
export function stripEmDashes(text: string): string {
  return text
    .replace(/\s*—\s*/g, ", ")
    .replace(/,\s*([.;:!?])/g, "$1")
    .replace(/,\s*(<\/(?:p|li|h[1-6]|td|th|blockquote|figcaption|strong|em|a)>)/gi, "$1")
    .replace(/([(“"])\s*,\s*/g, "$1");
}

export function sanitizePostContent(html: string): string {
  if (!html) return "";

  return (
    html
      // the TOC widget — desktop and mobile copies; each ends with </ul></div>
      .replace(
        /<div[^>]*class="[^"]*modern-toc-animated[^"]*"[^>]*>[\s\S]*?<\/ul>\s*<\/div>/gi,
        "",
      )
      // any inline styles or scripts embedded in the post body
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi, "")
      // decorative scroll helpers whose JS we just removed (leaves a stray arrow)
      .replace(
        /<div[^>]*class="[^"]*(?:glass-scroll-indicator|right-fade-indicator)[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
        "",
      )
      // responsive-image variants point at the WP server; we self-host one src
      .replace(/\s(?:srcset|sizes|data-src|data-srcset)=("[^"]*"|'[^']*')/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      // other common WordPress TOC plugin wrappers, just in case
      .replace(
        /<div[^>]*(?:id|class)="[^"]*(?:ez-toc-container|lwptoc|toc-container)[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi,
        "",
      )
      // collapse the blank space the removals leave behind
      .replace(/(?:\s*\n){3,}/g, "\n\n")
      // the site's copy has no em dashes; normalise WP content to match
      .replace(/\s*—\s*/g, ", ")
      .replace(/,\s*([.;:!?])/g, "$1")
      .replace(/,\s*(<\/(?:p|li|h[1-6]|td|th|blockquote|figcaption|strong|em|a)>)/gi, "$1")
      .trim()
  );
}

/**
 * WordPress "pages" (About, Services, Coaching, legal pages …) are built with a
 * page-builder — deeply nested wrapper divs, theme-specific classes, inline
 * styles, spacer blocks, and stock demo images from api.themeisle.com. None of
 * that survives outside the WordPress theme, so we strip it down to plain
 * semantic HTML (headings, paragraphs, lists, real images, links) and let the
 * `.prose` styles take over.
 */
export function sanitizePageContent(html: string): string {
  if (!html) return "";

  let out = html
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    // stock / placeholder / decorative / plugin / icon images
    .replace(
      /<img\b[^>]*\bsrc=["'][^"']*(?:api\.themeisle\.com|\/plugins\/|neve-marketing-agency|placeholder|spacer|blank\.gif|1x1|-utc(?:-|\.|[0-9])|submit-spin|\/linkedin\d*\.|\/(?:facebook|twitter|instagram|youtube|arrow|icon|logo-new|audit|presentation|contract-agreement|check|star|badge)[\w-]*\.(?:png|svg|webp|jpe?g))[^"']*["'][^>]*>/gi,
      "",
    )
    // WordPress form markup left in page content
    .replace(/<form\b[\s\S]*?<\/form>/gi, "")
    // page-builder spacers and empty overlay layers
    .replace(/<div[^>]*class="[^"]*wp-block-spacer[^"]*"[^>]*>\s*<\/div>/gi, "")
    .replace(
      /<div[^>]*class="[^"]*(?:columns-overlay|column-overlay|separator)[^"]*"[^>]*>\s*<\/div>/gi,
      "",
    )
    // strip presentational attributes — we want semantics, not the WP theme
    .replace(/\s(?:class|id|style|data-[\w-]+|decoding|loading|srcset|sizes|width|height)=("[^"]*"|'[^']*')/gi, "")
    // svg logos and icon sprites pasted into the content
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, "")
    // unwrap now-bare wrapper divs/sections/spans that only nest other blocks
    .replace(/<\/?(?:div|section|span|header|footer|figure|figcaption)\b[^>]*>/gi, "")
    // drop empty block elements left behind
    .replace(/<(p|h[1-6]|li|ul|ol|a|strong|em)\b[^>]*>\s*(?:&nbsp;|\s)*<\/\1>/gi, "")
    .replace(/<(ul|ol)>\s*<\/\1>/gi, "")
    // tidy whitespace
    .replace(/[ \t]+\n/g, "\n")
    .replace(/(?:\s*\n){3,}/g, "\n\n")
    .trim();

  // second pass for empties revealed by the first
  out = out
    .replace(/<(p|h[1-6]|li)\b[^>]*>\s*<\/\1>/gi, "")
    .replace(/(?:\s*\n){3,}/g, "\n\n")
    .trim();

  // de-duplicate images — the builder repeats the same photo across breakpoints
  const seenImg = new Set<string>();
  out = out.replace(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi, (m, src) => {
    if (seenImg.has(src)) return "";
    seenImg.add(src);
    return m;
  });

  // collapse consecutive identical headings / paragraphs (builder leftovers)
  out = out.replace(
    /(<(h[1-6]|p)>([\s\S]*?)<\/\2>)\s*(?=<\2>\3<\/\2>)/gi,
    "",
  );

  return stripEmDashes(
    out
      .replace(/<(p|h[1-6]|li)\b[^>]*>\s*<\/\1>/gi, "")
      .replace(/(?:\s*\n){3,}/g, "\n\n")
      .trim(),
  );
}

/** First real content image in a chunk of HTML, if any. */
export function firstImage(html: string): { src: string; alt: string } | null {
  const m = html.match(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/i);
  if (!m) return null;
  const altMatch = m[0].match(/\balt=["']([^"']*)["']/i);
  return { src: m[1], alt: altMatch?.[1] ?? "" };
}
