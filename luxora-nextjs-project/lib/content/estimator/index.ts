import type { EstimatorContent } from './types';
import { estimatorCategories } from './categories';

export * from './types';
export * from './landing';
export * from './categories';

/**
 * Style / package-tier content — still an intentional scaffold; real
 * content lands in later phases per the approved Implementation Plan §6
 * and Component Reuse Matrix §J. Landing content is real as of Phase 2
 * (./landing.ts); categories are real as of Phase 3 (./categories.ts).
 */
export const estimatorContent: EstimatorContent = {
  categories: estimatorCategories,
  styles: [],
  packageTiers: [],
};
