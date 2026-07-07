import type { EstimatorPackageTierContent } from './types';
import type { EstimatorPackageTier } from './pricing';

/**
 * Package tier content — Phase 7. Taxonomy and feature language match the
 * site's published service-page tiers (Essential / Signature / Bespoke)
 * so a visitor moving between a service page and the estimator sees one
 * consistent offer. Deliberately price-free: by business rule the
 * personalized figure stays gated behind the lead form, and per-tier
 * public ranges are also withheld here to keep the suspense absolute.
 */
export const estimatorPackages: EstimatorPackageTierContent[] = [
  {
    slug: 'essential',
    name: 'Essential',
    tagline: 'Timeless Foundations',
    description: 'A complete, well-finished home using our curated standard material palette.',
    image: '/img/General/minimal-kitchen-1.webp',
    imageAlt: 'A clean, well-finished Luxora interior in the Essential palette',
    features: [
      'Full design & 3D presentation',
      'Curated standard material palette',
      'Single dedicated project manager',
      '10-year structural warranty',
    ],
  },
  {
    slug: 'signature',
    name: 'Signature',
    tagline: 'Our Most Popular',
    description: 'Premium materials, richer detailing, and a faster turnaround — the Luxora most clients choose.',
    image: '/img/PROJECT%20BASED/LIVING%20ROOM%20DESIGN/Rakesh%20ji%20living%20A01_View010000.webp',
    imageAlt: 'A premium Luxora living room from a completed Signature-tier project',
    features: [
      'Full design & 3D presentation',
      'Premium material palette',
      'Richer detailing & designer lighting',
      'Priority execution timeline',
      '10-year structural warranty',
    ],
  },
  {
    slug: 'bespoke',
    name: 'Bespoke',
    tagline: 'Crafted Without Compromise',
    description: 'Fully custom millwork, rare materials, and a dedicated stylist for every room.',
    image: '/img/PROJECT%20BASED/LIVING%20ROOM%20DESIGN/Krish%20ji%20S.F.%20A01_View140000.webp',
    imageAlt: 'An ultra-premium Luxora living space from a Bespoke-tier project',
    features: [
      'Fully custom millwork',
      'Rare & imported material palette',
      'Dedicated stylist for every room',
      'White-glove project management',
      '10-year structural warranty',
    ],
  },
];

/**
 * Rule-based "Recommended for you" mapping (PRD §9 — explicitly config,
 * not inference): expressive/ornate style picks point to Bespoke;
 * everything else anchors on Signature, the site's most-popular tier.
 * Never recommends downward to Essential — the default recommendation is
 * the business's preferred anchor, not the cheapest option.
 */
const STYLE_TIER_AFFINITY: Record<string, EstimatorPackageTier> = {
  luxury: 'bespoke',
  classic: 'bespoke',
};

export function getRecommendedTier(styleSlugs: string[]): EstimatorPackageTier {
  for (const slug of styleSlugs) {
    const tier = STYLE_TIER_AFFINITY[slug];
    if (tier) return tier;
  }
  return 'signature';
}
