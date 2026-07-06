import type { EstimatorContent } from './types';
import { estimatorCategories } from './categories';
import { estimatorStyles } from './styles';
import { estimatorPackages } from './packages';

export * from './types';
export * from './landing';
export * from './categories';
export * from './styles';
export * from './questions';
export * from './pricing';
export * from './packages';
export * from './summary';
export * from './imagery';

/**
 * All estimator content, fully authored: landing (Phase 2), categories
 * (Phase 3), styles (Phase 4, adapted from the Gallery taxonomy),
 * questions (Phase 5), pricing (Phase 6), packages (Phase 7).
 */
export const estimatorContent: EstimatorContent = {
  categories: estimatorCategories,
  styles: estimatorStyles,
  packageTiers: estimatorPackages,
};
