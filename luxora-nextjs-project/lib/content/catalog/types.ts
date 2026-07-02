/**
 * Shared content contract for the Interior Elements and Products catalogs —
 * both are real, editorial "what we design/build" reference pages (not an
 * e-commerce catalog with SKUs or pricing, since we have no real per-item
 * pricing data). Every image is a real Luxora photograph or an approved AI
 * design concept; nothing here is stock or fabricated.
 */
export interface CatalogImage {
  url: string;
  alt: string;
}

export interface CatalogItem {
  slug: string;
  title: string;
  eyebrow: string;
  heroImage: CatalogImage;
  description: string;
  highlights: string[];
  gallery: CatalogImage[];
  /** Gallery category slug this element/product is most associated with, for Related Designs. */
  gallerySlug?: string;
  /** Service page slug this element/product is delivered through, for Related Service. */
  serviceSlug?: string;
  relatedPortfolioSlugs: string[];
}
