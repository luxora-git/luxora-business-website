import type { EstimatorContent } from './types';

export * from './types';
export * from './landing';

/**
 * Category / style / package-tier content — still an intentional Phase 1
 * scaffold. Real content lands in a later phase per the approved
 * Implementation Plan §6 and Component Reuse Matrix §J. Landing screen
 * content, by contrast, is real as of Phase 2 — see ./landing.ts.
 */
export const estimatorContent: EstimatorContent = {
  categories: [],
  styles: [],
  packageTiers: [],
};
