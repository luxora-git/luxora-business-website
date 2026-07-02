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

export const luxoraShadows = {
  card: '0 4px 24px rgba(44,31,20,0.08)',
  floating: '0 20px 60px rgba(44,31,20,0.14)',
  image: '0 20px 60px rgba(100,60,20,0.18)',
  luxury: '0 30px 80px rgba(44,31,20,0.20)',
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

export const luxoraSpacing = {
  section: 'py-24 md:py-32',
  container: 'max-w-7xl mx-auto px-6 md:px-12 lg:px-16',
  grid: 'gap-6 md:gap-8',
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
