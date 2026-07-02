/**
 * Luxora Portfolio — completed real-project case studies. Distinct from the
 * Design Gallery: Portfolio exists to prove execution (real client, real
 * address locality, real scope, real story), not to inspire browsing by
 * style/room. Never share schema, taxonomy or URL namespace with Gallery.
 */

export interface PortfolioImage {
  url: string;
  alt: string;
}

export interface PortfolioFacts {
  location: string;
  propertyType: string;
  area: string;
  /** Framed as a typical investment range for this scope, not a disclosed exact contract value. */
  investmentRange: string;
  duration: string;
  rooms: string[];
}

export interface PortfolioProject {
  slug: string;
  title: string;
  /** One-line category tag, e.g. "Full Home", "Office Interior". */
  category: string;
  heroImage: PortfolioImage;
  /** Short standfirst shown directly under the hero title. */
  overview: string;
  facts: PortfolioFacts;
  /** Full editorial case-study narrative. */
  story: string[];
  gallery: PortfolioImage[];
  publishedAt: string;
}
