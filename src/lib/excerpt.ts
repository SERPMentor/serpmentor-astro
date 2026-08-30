/**
 * WordPress excerpts come back as HTML, and they end with a
 * `<a class="more-link">Read More »Title</a>` link.
 *
 * Rendering that HTML inside a card that is itself an `<a>` produces nested
 * anchors, which browsers are required to un-nest — that silently breaks the
 * card layout. So every excerpt is flattened to plain text before display.
 */
export function cleanExcerpt(raw?: string | null, maxLength = 200): string {
  if (!raw) return "";

  let text = raw
    .replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, " ") // drop the "Read More »" link
    .replace(/<[^>]+>/g, " ") // drop any remaining tags
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
    .replace(/&amp;/gi, "&") // must run last so "&amp;lt;" stays literal
    .replace(/\s+/g, " ")
    .trim();

  if (text.length > maxLength) {
    text = text.slice(0, maxLength).replace(/[\s.,;:!?…—–-]+\S*$/, "") + "…";
  }

  return text;
}
