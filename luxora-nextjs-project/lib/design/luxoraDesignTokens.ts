/**
 * Luxora V4 Design Tokens
 *
 * Single source of truth for the colors, shadows, radii, blur, spacing,
 * pattern opacity and motion values used by the Luxora V4 background
 * pattern library (components/v4/background). Built from the values
 * already established across the V4 homepage so new sections stay
 * visually consistent with it.
 */

export const luxoraColors = {
  gold: '#C9A227',
  goldMuted: '#C9A96E',
  goldLight: '#E8C468',
  espresso: '#2C1F14',
  espressoDeep: '#1C1005',
  softBrown: '#6B4C3B',
  mutedBeige: '#9C7B68',
  warmCream: '#F5EFE6',
  warmCreamAlt: '#F5EDE0',
  ivory: '#FDFAF6',
  sand: '#F9F3EA',
} as const;

export type LuxoraColor = keyof typeof luxoraColors;

export const luxoraBackgroundLayers = {
  base: luxoraColors.warmCream,
  baseAlt: luxoraColors.warmCreamAlt,
  panel: luxoraColors.ivory,
  dark: luxoraColors.espressoDeep,
} as const;

/** Two-layer soft shadows (a tight contact layer + a wide ambient layer) —
 * objects read as physically resting on the wall instead of outlined.
 * Every card surface should come from these rather than inventing values. */
export const luxoraShadows = {
  card: '0 2px 6px rgba(44,31,20,0.05), 0 14px 34px rgba(44,31,20,0.10)',
  cardHover: '0 4px 10px rgba(44,31,20,0.06), 0 26px 56px rgba(44,31,20,0.16)',
  floating: '0 4px 12px rgba(44,31,20,0.06), 0 24px 64px rgba(44,31,20,0.14)',
  image: '0 4px 12px rgba(100,60,20,0.08), 0 24px 60px rgba(100,60,20,0.16)',
  luxury: '0 6px 16px rgba(44,31,20,0.07), 0 34px 84px rgba(44,31,20,0.18)',
} as const;

export const luxoraRadius = {
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  editorial: '2.5rem',
} as const;

export const luxoraBlur = {
  glowBlur: '60px',
  glassBlur: '14px',
  softBlur: '24px',
} as const;

/**
 * Design System V2 — fluid type scale.
 *
 * The `display`/`h1`/`h2`/`h3` entries are CSS custom properties defined in
 * app/globals.css (fluid clamp() values, identical to the legacy hand-tuned
 * clamps below ~1550px, scaling further to a cap at 1920px) — use them as
 * inline `fontSize` values. The remaining entries are Tailwind class
 * recipes for UI text; they match today's responsive classes exactly and
 * add the 3xl/4xl tiers on top.
 */
export const luxoraType = {
  /** Hero-level H1 — `style={{ fontSize: luxoraType.display }}` */
  display: 'var(--lux-type-display)',
  /** Page/closing-CTA H1 */
  h1: 'var(--lux-type-h1)',
  /** Section headings (V4SectionHeader) */
  h2: 'var(--lux-type-h2)',
  /** Card / sub-block titles */
  h3: 'var(--lux-type-h3)',
  /** Uppercase gold eyebrow above headings — className recipe */
  eyebrow: 'text-[11px] 3xl:text-[13px] font-semibold tracking-[0.28em] uppercase',
  /** Section descriptions / leads — className recipe */
  lead: 'text-base md:text-lg 3xl:text-xl',
  /** Standard body copy — className recipe */
  body: 'text-sm md:text-base 3xl:text-lg',
} as const;

/**
 * Design System V2 — layout & rhythm recipes (Tailwind class strings).
 *
 * `container` is THE section content wrapper for the whole site: the
 * classic 1280px column through 1919px (the generous side margins ARE the
 * luxury framing — the container must never consume more than ~85% of the
 * viewport), then conservative named tiers: 3xl 1560 (81% of 1920) and
 * 4xl 1760 (69% of 2560) so large displays get a designed composition
 * without ever feeling stretched. Prefer the `SectionContainer` component
 * (components/v4/common) in new code; consume this string directly only
 * when a component needs to merge it into an existing element.
 *
 * The three `section*` recipes are the only allowed vertical paddings for
 * full sections — pick the one matching the section's current density.
 */
export const luxoraSpacing = {
  section: 'py-24 md:py-32 3xl:py-40',
  sectionRelaxed: 'py-28 md:py-36 3xl:py-44',
  sectionTight: 'py-16 md:py-20 3xl:py-28',
  container:
    'max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 3xl:max-w-[1560px] 3xl:px-20 4xl:max-w-[1760px]',
  grid: 'gap-6 md:gap-8 3xl:gap-10',
  card: 'p-6 md:p-8',
} as const;

export const luxoraPatternOpacity = {
  contour: 0.04,
  blueprint: 0.035,
  marble: 0.045,
  halo: 0.08,
  grain: 0.012,
} as const;

export const luxoraMotion = {
  default: 'transition-all duration-500 ease-out',
  hover: 'transition-all duration-300 ease-out',
  fade: 'transition-opacity duration-700 ease-out',
  lift: 'transition-transform duration-500 ease-out hover:-translate-y-1',
} as const;

/** Shared corner/center anchors used by every background pattern component. */
export type LuxuryPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

type PositionStyle = {
  position: 'absolute';
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
};

/** Resolves a `LuxuryPosition` into absolute-positioning CSS (no transform). */
export function getLuxuryPositionStyle(position: LuxuryPosition): PositionStyle {
  switch (position) {
    case 'top-left':
      return { position: 'absolute', top: 0, left: 0 };
    case 'top-right':
      return { position: 'absolute', top: 0, right: 0 };
    case 'bottom-left':
      return { position: 'absolute', bottom: 0, left: 0 };
    case 'bottom-right':
      return { position: 'absolute', bottom: 0, right: 0 };
    case 'center':
      return { position: 'absolute', top: '50%', left: '50%' };
  }
}

/** Centering transform required only by the `center` anchor. */
export function getLuxuryPositionTransform(position: LuxuryPosition): string {
  return position === 'center' ? 'translate(-50%, -50%)' : '';
}

/** Combines centering, rotation and scale into a single transform string. */
export function composeLuxuryTransform(position: LuxuryPosition, rotation = 0, scale = 1): string {
  return [
    getLuxuryPositionTransform(position),
    rotation ? `rotate(${rotation}deg)` : '',
    scale !== 1 ? `scale(${scale})` : '',
  ]
    .filter(Boolean)
    .join(' ');
}
