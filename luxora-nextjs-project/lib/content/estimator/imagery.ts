import type { EstimatorCategorySlug } from './types';

/**
 * Context-aware imagery — the ONE mapping that keeps every visual after
 * category selection locked to the chosen room type (kitchen users never
 * see bedrooms; wardrobe users never see kitchens). Screens resolve
 * images through the helpers below; anything without a category-specific
 * entry gracefully falls back to the generic default the caller already
 * has, so a missing image can never break a screen.
 *
 * Full Home deliberately has no style overrides: a full home IS living +
 * bedroom + kitchen + dining, so the default mixed-room style imagery is
 * already the correct context for it.
 *
 * Adding a future category = adding entries here; no component changes.
 *
 * TODO: the AI-render style images are mapped per room type but not yet
 * visually curated per style aesthetic — worth a human curation pass when
 * dedicated estimator photography lands.
 */

export interface EstimatorImage {
  src: string;
  alt: string;
}

function encodePath(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
const ai = (p: string) => encodePath(`/img/AI BASED/${p}`);
const project = (p: string) => encodePath(`/img/PROJECT BASED/${p}`);

/** Style-tile imagery overrides, keyed by category → style slug. */
const STYLE_IMAGES: Partial<Record<EstimatorCategorySlug, Partial<Record<string, EstimatorImage>>>> = {
  kitchen: {
    contemporary: { src: ai('MODULAR KITCHEN/mk1.webp'), alt: 'Contemporary modular kitchen concept with warm wood and clean geometry' },
    modern: { src: ai('MODULAR KITCHEN/mk6.webp'), alt: 'Modern modular kitchen concept with quartz countertops' },
    luxury: { src: '/img/General/luxury-kitchen-1.webp', alt: 'Luxury modular kitchen with premium finishes and statement lighting' },
    classic: { src: ai('MODULAR KITCHEN/mk3.webp'), alt: 'Classic kitchen concept with heritage-inspired cabinetry' },
    minimal: { src: '/img/General/minimal-kitchen-1.webp', alt: 'Minimal kitchen with restrained palette and handleless cabinetry' },
    scandinavian: { src: ai('MODULAR KITCHEN/mk10.webp'), alt: 'Light, airy Scandinavian-style kitchen concept' },
  },
  wardrobe: {
    contemporary: { src: ai('WARDROBE DESIGN/wd2.webp'), alt: 'Contemporary wardrobe concept with warm materials' },
    modern: { src: ai('WARDROBE DESIGN/wd3.webp'), alt: 'Modern wardrobe concept with clean lines and integrated lighting' },
    luxury: { src: ai('WARDROBE DESIGN/wd4.webp'), alt: 'Luxury walk-in wardrobe concept with premium detailing' },
    classic: { src: ai('WARDROBE DESIGN/wd5.webp'), alt: 'Classic wardrobe concept with timeless craftsmanship' },
    minimal: { src: ai('WARDROBE DESIGN/wd6.webp'), alt: 'Minimal floor-to-ceiling wardrobe concept with ambient lighting' },
    scandinavian: { src: ai('WARDROBE DESIGN/wd7.webp'), alt: 'Light Scandinavian-style wardrobe concept' },
  },
};

/** Package-card imagery, keyed by category → tier slug. */
const PACKAGE_IMAGES: Partial<Record<EstimatorCategorySlug, Partial<Record<string, EstimatorImage>>>> = {
  'full-home': {
    essential: { src: project('LIVING ROOM DESIGN/Paritosh ji Living A01_View050000.webp'), alt: 'A complete, well-finished Luxora living room in the Essential palette' },
    signature: { src: project('LIVING ROOM DESIGN/Rakesh ji living A01_View010000.webp'), alt: 'A premium Luxora living room from a completed Signature-tier home' },
    bespoke: { src: project('LIVING ROOM DESIGN/Krish ji S.F. A01_View140000.webp'), alt: 'An ultra-premium Luxora living space from a Bespoke-tier home' },
  },
  kitchen: {
    essential: { src: '/img/General/minimal-kitchen-1.webp', alt: 'A clean, well-finished Luxora kitchen in the Essential palette' },
    signature: { src: project('MODULAR KITCHEN/DD khandelwal kitchen A01.webp'), alt: 'A premium Luxora modular kitchen from a completed Signature-tier project' },
    bespoke: { src: '/img/General/luxury-kitchen-2.webp', alt: 'An ultra-premium Luxora kitchen with Bespoke-tier finishes' },
  },
  wardrobe: {
    essential: { src: ai('WARDROBE DESIGN/WD1.webp'), alt: 'A well-crafted Luxora wardrobe in the Essential palette' },
    signature: { src: project('WARDROBE DESIGN/Krish ji Dressing A01_View020000.webp'), alt: 'A premium Luxora dressing area from a completed Signature-tier project' },
    bespoke: { src: project('WARDROBE DESIGN/GAUTMA JI M. BEDROOM DRESSING A01.webp'), alt: 'An ultra-premium Luxora walk-in dressing suite, Bespoke tier' },
  },
};

/**
 * Resolves the style-tile image for a category. Falls back to the
 * caller-supplied generic default when no category-specific entry exists.
 */
export function getStyleImage(
  category: EstimatorCategorySlug | null,
  styleSlug: string,
  fallback: EstimatorImage,
): EstimatorImage {
  if (!category) return fallback;
  return STYLE_IMAGES[category]?.[styleSlug] ?? fallback;
}

/**
 * Resolves the package-card image for a category. Falls back to the
 * caller-supplied generic default when no category-specific entry exists.
 */
export function getPackageImage(
  category: EstimatorCategorySlug | null,
  tierSlug: string,
  fallback: EstimatorImage,
): EstimatorImage {
  if (!category) return fallback;
  return PACKAGE_IMAGES[category]?.[tierSlug] ?? fallback;
}
