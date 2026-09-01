/**
 * Site-wide settings that aren't content.
 *
 * FORMS — the contact and newsletter forms post to Formspree (https://formspree.io).
 * It's free for low volume and needs no server. To make them live:
 *   1. Create a free Formspree account.
 *   2. Make two forms — one for "Contact", one for "Newsletter".
 *   3. Copy each form's endpoint (looks like https://formspree.io/f/abcdwxyz)
 *      and paste it below, replacing the placeholder.
 * Until you do that, the forms show a friendly "not configured yet" message
 * instead of failing silently.
 */

export const FORMSPREE = {
  contact: "https://formspree.io/f/REPLACE_WITH_CONTACT_FORM_ID",
  newsletter: "https://formspree.io/f/REPLACE_WITH_NEWSLETTER_FORM_ID",
};

/** True once a real Formspree endpoint has been pasted in above. */
export const formspreeReady = (endpoint: string) =>
  endpoint.includes("formspree.io/f/") && !endpoint.includes("REPLACE_WITH");

export const SITE_URL = "https://serpmentor.com";

/**
 * One place for the public contact details. Change them here and every page,
 * button and the footer update. The phone number is also the WhatsApp number.
 */
export const CONTACT = {
  phoneDisplay: "+880 1912 055505",
  tel: "+8801912055505",
  whatsapp: "8801912055505",
  email: "support@serpmentor.com",
  linkedin: "https://www.linkedin.com/company/serp-mentor/",
};

/** wa.me link, optionally pre-filled with a message */
export const whatsappUrl = (message?: string) =>
  `https://wa.me/${CONTACT.whatsapp}` +
  (message ? `?text=${encodeURIComponent(message)}` : "");
