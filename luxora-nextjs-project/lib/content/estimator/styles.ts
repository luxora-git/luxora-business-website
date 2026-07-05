import { galleryStyles } from '@/lib/content/gallery/styles';
import type { EstimatorStyleOption } from './types';

/**
 * Estimator style options — adapted directly from the Gallery's style
 * taxonomy (lib/content/gallery/styles.ts) rather than authoring a second,
 * potentially inconsistent style list, per the approved Implementation
 * Plan §8 (Risk 5) and Component Reuse Matrix §J. If the Gallery taxonomy
 * gains or loses a style, the estimator follows automatically.
 */
export const estimatorStyles: EstimatorStyleOption[] = galleryStyles.map((style) => ({
  slug: style.slug,
  label: style.label,
  image: style.heroImage,
  imageAlt: style.heroImageAlt,
  description: style.description,
}));

/** Maximum styles a visitor can select — "pick one or two" per the PRD. */
export const MAX_STYLE_SELECTIONS = 2;
