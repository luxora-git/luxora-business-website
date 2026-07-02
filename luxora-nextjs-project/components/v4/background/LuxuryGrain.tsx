import { luxoraPatternOpacity } from '@/lib/design/luxoraDesignTokens';

export interface LuxuryGrainProps {
  /** Near-invisible by design: keep within 0.005–0.02. */
  opacity?: number;
  /**
   * SVG filter id. Pass a unique value if rendering more than one
   * LuxuryGrain instance on the same page to avoid id collisions.
   */
  id?: string;
  className?: string;
}

/**
 * LuxuryGrain — an almost-invisible paper grain overlay, generated with a
 * pure SVG `feTurbulence` filter (no bitmap assets). Full-bleed, absolute,
 * non-interactive.
 */
export default function LuxuryGrain({ opacity = luxoraPatternOpacity.grain, id = 'luxora-grain', className = '' }: LuxuryGrainProps) {
  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      style={{ opacity, zIndex: 0 }}
      preserveAspectRatio="none"
    >
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" result="noise" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}
