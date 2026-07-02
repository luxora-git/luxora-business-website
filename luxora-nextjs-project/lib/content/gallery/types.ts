/**
 * Luxora Design Gallery — Phase 1 data contract.
 *
 * Frozen architecture: every field marked "reserved for future" exists so
 * later phases (AI Designer, Shop This Room, Saved Designs, editorial
 * Collections) never require a data-shape migration — but no UI for those
 * fields is built in Phase 1.
 */

export interface GalleryImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  /** True for the image used as the project's hero/cover shot. */
  isHero?: boolean;
  room?: string;
}

export interface GalleryProjectMeta {
  location: string;
  city: string;
  area: string;
  /** Numeric sq ft, used for area-range filtering. */
  areaSqFt: number;
  style: string;
  propertyType: string;
  budgetRange: string;
  /** Approx. midpoint budget in lakh INR, used for budget-range filtering. */
  budgetLakh: number;
  completionTime: string;
}

export interface GalleryBeforeAfterPair {
  before: string;
  after: string;
}

export interface GalleryProjectSeo {
  title: string;
  description: string;
  ogImage: string;
}

export interface GalleryColorSwatch {
  name: string;
  hex: string;
}

export interface GalleryProject {
  id: string;
  slug: string;
  title: string;
  /** Primary taxonomy — must match a GalleryCategory slug. */
  category: string;
  secondaryCategories?: string[];
  /** Reserved for future editorial Collections (deferred in Phase 1). */
  collectionSlugs?: string[];
  coverImage: GalleryImage;
  images: GalleryImage[];
  meta: GalleryProjectMeta;
  description: string;
  story: string;
  /** Illustrative materials used in this design concept — editorial detail, not a bill of quantities. */
  materials?: string[];
  colorPalette?: GalleryColorSwatch[];
  furnitureHighlights?: string[];
  featured?: boolean;
  beforeAfter?: GalleryBeforeAfterPair[];
  /** Reserved for future AI Designer integration (deferred in Phase 1). */
  aiDesignerSeed?: { roomType: string; styleTags: string[] };
  /** Reserved for future "Shop This Room" integration (deferred in Phase 1). */
  shoppableItems?: { imageUrl: string; x: number; y: number; productId: string }[];
  publishedAt: string;
  updatedAt: string;
  seo: GalleryProjectSeo;
}

export interface GalleryCategory {
  slug: string;
  label: string;
  eyebrow: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
}

export interface GalleryFilterFacets {
  categories: { slug: string; label: string }[];
  styles: string[];
  propertyTypes: string[];
  cities: string[];
  areaBuckets: { label: string; min: number; max: number }[];
  budgetBuckets: { label: string; min: number; max: number }[];
}

export interface GalleryFilterState {
  category: string | null;
  style: string | null;
  propertyType: string | null;
  city: string | null;
  areaBucket: string | null;
  budgetBucket: string | null;
  query: string;
}
