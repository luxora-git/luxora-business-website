/**
 * Estimator content type contracts — Phase 1 scaffold only.
 *
 * Modeled on the structure/naming discipline of
 * lib/content/services/types.ts (ServicePricingData, ServiceCostEstimatorData,
 * ServiceProcessData, ServiceFAQData) so the estimator's content module reads
 * as a natural sibling of the existing service/gallery content system.
 *
 * No real content is authored yet — see lib/content/estimator/index.ts.
 *
 * TODO (later phase): flesh out per category (full-home/kitchen/wardrobe),
 * cross-reference the style taxonomy with lib/content/gallery/styles.ts
 * rather than duplicating it, and add the package/pricing model per the
 * approved PRD v1.1 and Component Reuse Matrix §J.
 */

export type EstimatorCategorySlug = 'full-home' | 'kitchen' | 'wardrobe';

export interface EstimatorCategoryOption {
  slug: EstimatorCategorySlug;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface EstimatorStyleOption {
  slug: string;
  label: string;
  image: string;
  imageAlt: string;
  /** One-line editorial description shown on the style tile. */
  description?: string;
}

export interface EstimatorPackageTier {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** TODO (later phase): pricing model fields, feature list, highlighted flag — see Reuse Matrix §J. */
}

export interface EstimatorContent {
  categories: EstimatorCategoryOption[];
  styles: EstimatorStyleOption[];
  packageTiers: EstimatorPackageTier[];
}
