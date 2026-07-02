/**
 * Master Service Page content contract — Phase 1.
 *
 * Every service page (Full Home Interiors, Modular Kitchens, Architectural
 * Design, …) is rendered by the same template components in
 * components/v4/service. Only this data changes between pages. Later phases
 * (Process, Gallery, Pricing, FAQ, …) will extend this interface — Phase 1
 * covers Hero through Why Luxora only.
 */

/**
 * A CTA's `href`. Use the literal `'#consultation'` sentinel to make a CTA
 * open the shared global consultation modal (see
 * `components/v4/service/ServiceCtaButton.tsx`) instead of navigating —
 * every "Book Consultation" / "Book Free Consultation" / "Talk To A
 * Designer" / "Start Your Project" CTA across the site should use this.
 * Any other value (tel:, mailto:, https://, internal anchor) renders as a
 * normal link.
 */
export interface ServiceCta {
  label: string;
  href: string;
}

export interface ServiceBreadcrumbItem {
  label: string;
  href?: string;
}

export interface ServiceHeroData {
  /** Label shown as the final breadcrumb crumb. */
  breadcrumbLabel: string;
  heading: string;
  headingItalic?: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ServiceOverviewData {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  image: string;
  imageAlt: string;
  bullets: string[];
  statValue: string;
  statLabel: string;
}

export interface ServiceHighlightItem {
  value: string;
  label: string;
  description: string;
}

export interface ServiceComparisonRow {
  label: string;
  luxora: string;
  typical: string;
}

export interface ServiceComparisonData {
  eyebrow: string;
  title: string;
  description: string;
  /** Column headers for the "ours" vs "typical vendor" columns. */
  luxoraColumnLabel: string;
  typicalColumnLabel: string;
  rows: ServiceComparisonRow[];
}

export interface ServiceProcessStep {
  /** Editorial step number, e.g. "01". */
  number: string;
  title: string;
  description: string;
  /** Estimated duration for this step, e.g. "2–3 Days". */
  duration: string;
}

export interface ServiceProcessSummaryItem {
  label: string;
  value: string;
}

export interface ServiceProcessData {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  steps: ServiceProcessStep[];
  summary: ServiceProcessSummaryItem[];
}

export interface ServiceGalleryProject {
  title: string;
  image: string;
  imageAlt: string;
  style: string;
  area: string;
  location: string;
  completionTime: string;
}

export interface ServiceGalleryFeaturedProject {
  title: string;
  image: string;
  imageAlt: string;
  location: string;
  area: string;
  style: string;
  budgetRange: string;
  completionTime: string;
  description: string;
}

/**
 * One curated collection (e.g. "Living Rooms", "Luxury Villas") — a
 * complete editorial layout (featured project + supporting projects) that
 * becomes a single carousel slide. Every collection should supply the same
 * number of supporting projects so every slide renders at an identical
 * height (no layout shift when paging between slides).
 */
export interface ServiceGalleryCollection {
  label: string;
  featured: ServiceGalleryFeaturedProject;
  /** 5–6 supporting projects, drawn on for both the side stack and the strip. */
  projects: ServiceGalleryProject[];
}

export interface ServiceGalleryData {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  /** Visual-only filter pills — filtering is not wired up yet. */
  filters: string[];
  /** Each collection renders as one full-layout carousel slide. */
  collections: ServiceGalleryCollection[];
  ctaLabel: string;
  ctaHref: string;
}

export interface ServiceTransformation {
  id: string;
  title: string;
  location: string;
  description: string;
  before: string;
  after: string;
}

export interface ServiceBeforeAfterDetail {
  label: string;
  value: string;
}

export interface ServiceBeforeAfterData {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  transformations: ServiceTransformation[];
  details: ServiceBeforeAfterDetail[];
}

export interface ServiceMaterialItem {
  name: string;
  image: string;
  imageAlt: string;
  description: string;
}

export interface ServiceMaterialCategory {
  label: string;
  items: ServiceMaterialItem[];
}

export interface ServiceMaterialsData {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  categories: ServiceMaterialCategory[];
}

export interface ServiceCostEstimatorOption {
  label: string;
  value: string;
  /** Multiplier applied to the base per-sq-ft rate for this package tier. */
  multiplier: number;
}

export interface ServiceCostEstimatorData {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  areaOptions: ServiceCostEstimatorOption[];
  packageOptions: ServiceCostEstimatorOption[];
  /** Base rate per sq ft (in ₹) used with the area + package multiplier to compute the estimate range. */
  baseRatePerSqFt: number;
  disclaimer: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ServicePricingFeature {
  label: string;
  included: boolean;
}

export interface ServicePricingTier {
  name: string;
  tagline: string;
  priceRange: string;
  description: string;
  features: ServicePricingFeature[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
}

export interface ServicePricingData {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  tiers: ServicePricingTier[];
}

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

export interface ServiceFAQData {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  items: ServiceFAQItem[];
}

export interface ServiceRelatedProject {
  title: string;
  location: string;
  image: string;
  imageAlt: string;
  area: string;
  duration: string;
}

export interface ServiceRelatedProjectsData {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  projects: ServiceRelatedProject[];
  ctaLabel: string;
  ctaHref: string;
}

export interface ServiceTestimonial {
  name: string;
  location: string;
  quote: string;
  image: string;
  imageAlt: string;
  /** YouTube video id — if present the card becomes video-ready (play button + modal). */
  videoId?: string;
}

export interface ServiceTestimonialsData {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  testimonials: ServiceTestimonial[];
}

export interface ServiceRelatedServiceItem {
  number: string;
  title: string;
  description: string;
  href: string;
}

export interface ServiceRelatedServicesData {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  services: ServiceRelatedServiceItem[];
}

export interface ServiceFinalCtaData {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ServicePageData {
  slug: string;
  hero: ServiceHeroData;
  overview: ServiceOverviewData;
  highlights: ServiceHighlightItem[];
  comparison: ServiceComparisonData;
  process: ServiceProcessData;
  gallery: ServiceGalleryData;
  /** Optional — only include when genuine before/after photography of the same space exists. Never fabricate a "before" shot. */
  beforeAfter?: ServiceBeforeAfterData;
  materials: ServiceMaterialsData;
  costEstimator: ServiceCostEstimatorData;
  pricing: ServicePricingData;
  faq: ServiceFAQData;
  relatedProjects: ServiceRelatedProjectsData;
  testimonials: ServiceTestimonialsData;
  relatedServices: ServiceRelatedServicesData;
  finalCta: ServiceFinalCtaData;
}
