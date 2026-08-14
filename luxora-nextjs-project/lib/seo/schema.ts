/**
 * Reusable JSON-LD builders. Every schema node references the same business
 * entity (ORG_ID) so search engines see one organization, not several.
 *
 * Rules honoured here:
 *  - Only factual data (from siteConfig / repo content) is emitted.
 *  - No invented address, geo, hours, ratings, reviews, prices or awards.
 *  - FAQ nodes must be built from FAQ content that is actually visible on
 *    the page (callers pass the same items they render).
 */
import {
  SITE_ORIGIN,
  SITE_NAME,
  SITE_ALTERNATE_NAME,
  ORG_NAME,
  ORG_ALTERNATE_NAME,
  BUSINESS,
  ORG_ID,
  WEBSITE_ID,
  SITE_LANG,
  SITE_DESCRIPTION,
  SITE_LOGO,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
} from './siteConfig';

/**
 * The business entity. Typed ProfessionalService (a LocalBusiness subtype)
 * so it doubles as the local-business node without duplicating entities.
 * name "Luxora Interiors" matches the Google Business Profile;
 * alternateName "Luxora" makes Luxora ↔ Luxora Interiors one entity.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: ORG_NAME,
    alternateName: ORG_ALTERNATE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_ORIGIN,
    logo: absoluteUrl(SITE_LOGO),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      addressCountry: BUSINESS.addressCountry,
    },
    areaServed: [
      { '@type': 'City', name: 'Jaipur' },
      { '@type': 'State', name: 'Rajasthan' },
      { '@type': 'Country', name: 'India' },
    ],
    knowsAbout: [
      'Interior design',
      'Full home interior design',
      'Modular kitchen design',
      'Wardrobe design',
      'Home automation',
      'Commercial and office interior design',
      'Turnkey interior design',
    ],
    sameAs: BUSINESS.sameAs,
  };
}

/**
 * WebSite node — carries the preferred SITE NAME. name "Luxora" (master brand)
 * with alternateName "Luxora Interiors" (established name). publisher points to
 * the same Organization @id, so it stays one entity graph.
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_ORIGIN,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    inLanguage: SITE_LANG,
    publisher: { '@id': ORG_ID },
  };
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
  image?: string;
}

/** Service node, provider-linked to the organization entity. */
export function serviceSchema({ name, description, path, image }: ServiceSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType: name,
    description,
    url: absoluteUrl(path),
    ...(image ? { image: absoluteUrl(image) } : {}),
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'City', name: 'Jaipur' },
      { '@type': 'State', name: 'Rajasthan' },
    ],
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage node — pass ONLY items that are visibly rendered on the page. */
export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export interface BreadcrumbItem {
  label: string;
  /** Absolute or site-relative URL. */
  href: string;
}

/** BreadcrumbList node — pass items matching the visible breadcrumb trail. */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href.startsWith('http') ? item.href : absoluteUrl(item.href),
    })),
  };
}
