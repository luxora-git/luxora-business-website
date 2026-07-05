import type { EstimatorCategorySlug } from './types';

/**
 * Estimator pricing — pure, centralized, business-tunable.
 *
 * Model cross-check (Phase 6):
 * - The full-home service page (lib/content/services/fullHomeInteriorDesign.ts)
 *   already advertises a pricing model to visitors: base ₹1,800/sq ft with
 *   Essential ×1.0 / Signature ×1.45 / Bespoke ×2.1 multipliers and a
 *   ±(0.9–1.15) band, yielding the published ₹18–32L / ₹32–55L / ₹55L+
 *   package ranges. That model is business-approved and live — the
 *   estimator adopts it verbatim so the two surfaces can never disagree.
 * - Kitchen and wardrobe have no published site pricing; their base rates
 *   are seeded from the previous standalone calculator's rate tables,
 *   restructured into the same base × tier-multiplier model.
 * - The previous calculator collected room counts, kitchen finish, and
 *   wardrobe type but ignored them in pricing (flagged in its audit).
 *   Competitors (Livspace, HomeLane) treat layout, material and room mix
 *   as first-class cost drivers — this model does too, via the modifier
 *   tables below.
 *
 * Every constant here is deliberately a plain number the business team can
 * retune without touching any component code.
 */

// ─── Package tiers (must match the site's service-page taxonomy) ────────

export type EstimatorPackageTier = 'essential' | 'signature' | 'bespoke';

export const TIER_MULTIPLIERS: Record<EstimatorPackageTier, number> = {
  essential: 1.0,
  signature: 1.45,
  bespoke: 2.1,
};

/** Range band applied around the computed point value — same ±(0.9/1.15)
 * band the full-home service page's quick estimator uses. */
const RANGE_LOW = 0.9;
const RANGE_HIGH = 1.15;

// ─── Base rates ──────────────────────────────────────────────────────────

/** ₹ per sq ft, Essential tier — matches fullHomeInteriorDesign.ts. */
const FULL_HOME_BASE_RATE = 1800;
/** ₹ per sq ft, Essential tier — seeded from the previous calculator's
 * kitchen table, restated as a base rate. */
const KITCHEN_BASE_RATE = 2800;
/** ₹ per running ft, Essential tier — seeded from the previous
 * calculator's wardrobe table. */
const WARDROBE_BASE_RATE_PER_FT = 24000;
/** Assumed wardrobe run until the flow asks for length (same assumption
 * the previous calculator made). TODO: replace with a real length
 * question in a later iteration. */
const WARDROBE_ASSUMED_FT = 6;

// ─── Answer-driven quantity/modifier tables ──────────────────────────────

/** Carpet-area range slug → representative sq ft (midpoints). */
const FULL_HOME_AREA_SQFT: Record<string, number> = {
  'below-800': 600,
  '800-1200': 1000,
  '1200-1800': 1500,
  '1800-2500': 2150,
  '2500-plus': 3000,
};

/** Kitchen size slug → representative sq ft (midpoints). */
const KITCHEN_AREA_SQFT: Record<string, number> = {
  'below-60': 50,
  '60-100': 80,
  '100-150': 125,
  '150-plus': 200,
};

/** Kitchen layout drives cabinet/counter run — island and U-shape carry
 * meaningfully more built material than a straight wall. */
const KITCHEN_SHAPE_MULTIPLIER: Record<string, number> = {
  straight: 0.9,
  'l-shape': 1.0,
  parallel: 1.05,
  'u-shape': 1.15,
  island: 1.3,
};

const KITCHEN_FINISH_MULTIPLIER: Record<string, number> = {
  laminate: 1.0,
  membrane: 1.08,
  acrylic: 1.15,
  lacquer: 1.3,
};

const WARDROBE_TYPE_MULTIPLIER: Record<string, number> = {
  openable: 1.0,
  sliding: 1.12,
  'walk-in': 1.7,
};

const WARDROBE_FINISH_MULTIPLIER: Record<string, number> = {
  laminate: 1.0,
  membrane: 1.1,
  lacquer: 1.28,
};

/** Relative design/build weight of each room type — a kitchen costs far
 * more per unit than a balcony. Used to scale the full-home figure by the
 * visitor's actual room mix instead of ignoring it. */
const ROOM_WEIGHTS: Record<string, number> = {
  livingRoom: 1.2,
  kitchen: 1.5,
  bedroom: 1.0,
  bathroom: 0.6,
  dining: 0.5,
  balcony: 0.3,
};

/** The room mix the area-based rate implicitly assumes (a typical 2–3 BHK
 * selection). The modifier is the visitor's mix weighted against this,
 * clamped so extreme selections shift, not distort, the estimate. */
const BASELINE_ROOM_WEIGHT = 1.2 + 1.5 + 2 * 1.0 + 2 * 0.6; // living + kitchen + 2 bed + 2 bath = 5.9
const ROOM_MODIFIER_MIN = 0.75;
const ROOM_MODIFIER_MAX = 1.35;

function roomMixModifier(rooms: Record<string, number> | undefined): number {
  if (!rooms) return 1;
  const weight = Object.entries(rooms).reduce(
    (total, [key, count]) => total + (ROOM_WEIGHTS[key] ?? 0) * count,
    0,
  );
  if (weight <= 0) return 1;
  return Math.min(ROOM_MODIFIER_MAX, Math.max(ROOM_MODIFIER_MIN, weight / BASELINE_ROOM_WEIGHT));
}

// ─── Calculation ─────────────────────────────────────────────────────────

export interface EstimateRange {
  min: number;
  max: number;
}

/** Round to the nearest ₹10,000 so displayed figures read as considered
 * estimates, not spurious precision. */
function roundEstimate(value: number): number {
  return Math.round(value / 10000) * 10000;
}

/**
 * The one pricing function. Pure — same inputs, same output — so it is
 * trivially unit-testable and reusable across Budget, Package, Proposal
 * and the eventual lead payload. `tier` defaults to 'signature' (the
 * site's "most popular" tier) for the indicative pre-package reveal.
 */
export function calculateEstimateRange(
  category: EstimatorCategorySlug,
  answers: Record<string, unknown>,
  tier: EstimatorPackageTier = 'signature',
): EstimateRange {
  const tierMultiplier = TIER_MULTIPLIERS[tier];
  let point: number;

  switch (category) {
    case 'full-home': {
      const sqft = FULL_HOME_AREA_SQFT[String(answers.carpetAreaRange)] ?? 1500;
      const rooms = answers.rooms as Record<string, number> | undefined;
      point = sqft * FULL_HOME_BASE_RATE * tierMultiplier * roomMixModifier(rooms);
      break;
    }
    case 'kitchen': {
      const sqft = KITCHEN_AREA_SQFT[String(answers.kitchenSizeRange)] ?? 80;
      const shape = KITCHEN_SHAPE_MULTIPLIER[String(answers.kitchenShape)] ?? 1;
      const finish = KITCHEN_FINISH_MULTIPLIER[String(answers.kitchenFinish)] ?? 1;
      point = sqft * KITCHEN_BASE_RATE * tierMultiplier * shape * finish;
      break;
    }
    case 'wardrobe': {
      const type = WARDROBE_TYPE_MULTIPLIER[String(answers.wardrobeType)] ?? 1;
      const finish = WARDROBE_FINISH_MULTIPLIER[String(answers.wardrobeFinish)] ?? 1;
      point = WARDROBE_ASSUMED_FT * WARDROBE_BASE_RATE_PER_FT * tierMultiplier * type * finish;
      break;
    }
  }

  return {
    min: roundEstimate(point * RANGE_LOW),
    max: roundEstimate(point * RANGE_HIGH),
  };
}

// ─── Presentation helpers ────────────────────────────────────────────────

/**
 * Formats a rupee amount in the Indian lakh/crore convention used across
 * the site ("₹27.5L", "₹1.2Cr") — same convention as the service pages'
 * quick estimator.
 */
export function formatEstimateINR(value: number): string {
  const lakh = value / 100000;
  if (lakh >= 100) {
    const crore = lakh / 100;
    return `₹${crore.toFixed(crore % 1 === 0 ? 0 : 1)}Cr`;
  }
  return `₹${lakh.toFixed(lakh % 1 === 0 ? 0 : 1)}L`;
}

/** Plain-language allocation shown by the "what's included" toggle —
 * fixed proportional split per PRD v1.1 §8, purely arithmetic. */
export const ESTIMATE_BREAKDOWN = [
  { label: 'Design & Materials', share: 0.45 },
  { label: 'Execution & Project Management', share: 0.4 },
  { label: 'Finishing & Styling', share: 0.15 },
] as const;
