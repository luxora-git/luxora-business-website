/**
 * Lean service-page contract for every room-type service page beyond the
 * flagship Full Home page. Deliberately smaller than `ServicePageData`
 * (no comparison tables, pricing packages, materials swatches or
 * testimonials) — those would require either fabricated pricing/testimonial
 * data or real business figures we don't have. This contract covers exactly
 * what's required: Hero, Overview, Process, Gallery, FAQ, and a closing CTA,
 * plus links out to related Design Gallery designs and related Portfolio work.
 */

export interface ServiceLiteImage {
  url: string;
  alt: string;
}

export interface ServiceLiteProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceLiteFaqItem {
  question: string;
  answer: string;
}

export interface ServiceLiteData {
  slug: string;
  categorySlug: string; // matching Gallery category slug, for Related Designs
  title: string;
  titleItalic?: string;
  eyebrow: string;
  heroImage: ServiceLiteImage;
  overview: string;
  overviewBullets: string[];
  process: ServiceLiteProcessStep[];
  gallery: ServiceLiteImage[];
  relatedPortfolioSlugs: string[]; // slugs from lib/content/portfolio/projects
  faq: ServiceLiteFaqItem[];
}
