import type { EstimatorCategoryOption } from './types';

/**
 * The three estimator categories — Phase 3. Images are real Luxora project
 * photography already shipped with the site (same assets the Gallery and
 * homepage use), per the approved plan to reuse existing imagery until
 * dedicated estimator photography is sourced.
 */
export const estimatorCategories: EstimatorCategoryOption[] = [
  {
    slug: 'full-home',
    label: 'Full Home Interior',
    description: 'Complete home transformation — living, bedrooms, kitchen and more, designed as one.',
    image: '/img/PROJECT%20BASED/LIVING%20ROOM%20DESIGN/Paritosh%20ji%20Living%20A01_View040000.webp',
    imageAlt: 'A complete Luxora-designed living room from a full home interior project',
  },
  {
    slug: 'kitchen',
    label: 'Modular Kitchen',
    description: 'A kitchen built around how you cook — premium finishes, intelligent storage.',
    image: '/img/General/luxury-kitchen-1.webp',
    imageAlt: 'A premium Luxora modular kitchen with luxury finishes',
  },
  {
    slug: 'wardrobe',
    label: 'Wardrobe',
    description: 'Bespoke storage that fits your space, your wardrobe, and your routine.',
    image: '/img/PROJECT%20BASED/WARDROBE%20DESIGN/Krish%20ji%20Dressing%20A01_View010000.webp',
    imageAlt: 'A custom Luxora wardrobe and dressing area from a completed project',
  },
];
