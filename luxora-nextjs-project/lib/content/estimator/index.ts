import type { EstimatorContent } from './types';
import { estimatorCategories } from './categories';
import { estimatorStyles } from './styles';

export * from './types';
export * from './landing';
export * from './categories';
export * from './styles';
export * from './questions';

/**
 * Package-tier content — still an intentional scaffold; real content
 * lands in a later phase per the approved Implementation Plan §6 and
 * Component Reuse Matrix §J. Landing content is real as of Phase 2
 * (./landing.ts); categories as of Phase 3 (./categories.ts); styles as
 * of Phase 4 (./styles.ts, adapted from the Gallery taxonomy).
 */
export const estimatorContent: EstimatorContent = {
  categories: estimatorCategories,
  styles: estimatorStyles,
  packageTiers: [],
};
