/**
 * Central SEO configuration — the single source of truth for the site's
 * canonical origin, brand identity and default metadata. Every page and
 * every JSON-LD node reads from here so the entity Luxora / Luxora Interiors
 * is represented identically everywhere.
 *
 * Business facts (phone, email, socials) are pulled from the existing
 * source-of-truth file lib/content/global/contact.ts — never duplicated.
 */
import { luxoraContact, luxoraSocialLinks } from '@/lib/content/global/contact';

/**
 * Canonical production origin.
 *
 * Verified 2026-08 against production: https://luxora.in returns HTTP 308 →
 * https://www.luxora.in (200). The www host is the canonical origin; every
 * absolute URL (metadataBase, canonicals, sitemap, robots, OG) uses it. The
 * 308 redirect itself is enforced at the hosting layer (Vercel), not in this
 * repository.
 */
export const SITE_ORIGIN = 'https://www.luxora.in';

/**
 * Brand architecture (staged transition — see the approved audit).
 *
 * "Luxora" is the master brand and the PREFERRED SITE NAME for luxora.in.
 * "Luxora Interiors" is the established business name — kept as the alternate
 * site name, as the Organization/GBP entity name, and in visible copy so its
 * existing search recognition is preserved.
 *
 * The two are ONE entity with two names, never two competing entities.
 */

/** Preferred site name for luxora.in (WebSite.name, og:site_name, title suffix). */
export const SITE_NAME = 'Luxora';
/** Established alternate site name (WebSite.alternateName). */
export const SITE_ALTERNATE_NAME = 'Luxora Interiors';

/** Business entity name — matches the current Google Business Profile.
 *  Deliberately NOT changed during this staged transition; flip only when
 *  real-world branding / GBP move to "Luxora". */
export const ORG_NAME = 'Luxora Interiors';
/** Master brand as the entity's alternate name. */
export const ORG_ALTERNATE_NAME = 'Luxora';

/** Locale used for html lang / OpenGraph / schema inLanguage. */
export const SITE_LOCALE = 'en_IN';
export const SITE_LANG = 'en-IN';

/** Default sitewide description (root fallback). */
export const SITE_DESCRIPTION =
  'Luxora Interiors (Luxora) is a Jaipur interior design studio crafting premium residential and commercial spaces — full-home interiors, modular kitchens, wardrobes, home automation and turnkey execution. Book a free design consultation.';

/** A real existing Luxora image used as the default social-share image. */
export const DEFAULT_OG_IMAGE = '/img/General/hero-banner-living-1.webp';
export const SITE_LOGO = '/logo.png';

/** Verified contact facts, derived from the site's source-of-truth file. */
export const BUSINESS = {
  telephone: luxoraContact.phone.href.replace('tel:', ''), // +917339993930
  email: luxoraContact.email.display, // hello@luxora.in
  whatsapp: luxoraContact.whatsapp.href,
  /** City-level only — no street address, postal code or geo coordinates
   *  exist for the business, so none are fabricated. */
  addressLocality: 'Jaipur',
  addressRegion: 'Rajasthan',
  addressCountry: 'IN',
  /** Official profiles, from luxoraSocialLinks (source of truth). */
  sameAs: luxoraSocialLinks.map((s) => s.href),
} as const;

/** Stable JSON-LD @id anchors for cross-referencing the same entity. */
export const ORG_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

/** Resolve a site-relative path to an absolute canonical URL. */
export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path;
  return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}
