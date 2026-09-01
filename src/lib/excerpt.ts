/**
 * WordPress excerpts come back as HTML, and they end with a
 * `<a class="more-link">Read More »Title</a>` link.
 *
 * Rendering that HTML inside a card that is itself an `<a>` produces nested
 * anchors, which browsers are required to un-nest — that silently breaks the
 * card layout. So every excerpt is flattened to plain text before display.
 */
/**
 * Turn WordPress HTML entities (`&#8217;`, `&#x201c;`, `&amp;` …) back into the
 * real characters. Used anywhere WP text is shown outside `set:html`, e.g. the
 * article table-of-contents built from heading text.
 */
export function decodeEntities(raw?: string | null): string {
  if (!raw) return "";
  return raw
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&hellip;/gi, "…")
    .replace(/&(?:rsquo|apos);/gi, "’")
    .replace(/&lsquo;/gi, "‘")
    .replace(/&ldquo;/gi, "“")
    .replace(/&rdquo;/gi, "”")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/&quot;/gi, '"')
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&"); // must run last so "&amp;lt;" stays literal
}

export function cleanExcerpt(raw?: string | null, maxLength = 200): string {
  if (!raw) return "";

  let text = decodeEntities(
    raw
      .replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, " ") // drop the "Read More »" link
      .replace(/<[^>]+>/g, " "), // drop any remaining tags
  )
    .replace(/\s*—\s*/g, ", ") // the site's copy has no em dashes
    .replace(/,\s*([.;:!?])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length > maxLength) {
    text = text.slice(0, maxLength).replace(/[\s.,;:!?…—–-]+\S*$/, "") + "…";
  }

  return text;
}
