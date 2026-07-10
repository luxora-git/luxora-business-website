export type LuxurySpotlightFrom = 'top-left' | 'top-right' | 'top';

export interface LuxurySpotlightProps {
  /** Corner or edge the light falls from. */
  from?: LuxurySpotlightFrom;
  /** Light color — defaults to warm ivory (window light). Pass a gold for
   * a more deliberate golden-hour accent. */
  color?: string;
  opacity?: number;
  className?: string;
}

const ORIGINS: Record<LuxurySpotlightFrom, string> = {
  'top-left': 'ellipse 75% 62% at 6% -8%',
  'top-right': 'ellipse 75% 62% at 94% -8%',
  top: 'ellipse 85% 55% at 50% -12%',
};

/**
 * LuxurySpotlight — a directional soft light source, like daylight falling
 * across a wall from a tall window. Distinct from LuxuryHalo (a round,
 * centered glow): the spotlight is elongated and anchored beyond a corner
 * or edge so it reads as light entering the composition, not an object in
 * it. Pure CSS radial gradient, no blur filters, no assets.
 */
export default function LuxurySpotlight({
  from = 'top-left',
  color = 'rgba(253,250,246,0.85)',
  opacity = 0.5,
  className = '',
}: LuxurySpotlightProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 ${className}`}
      style={{
        background: `radial-gradient(${ORIGINS[from]}, ${color} 0%, transparent 62%)`,
        opacity,
        zIndex: 0,
      }}
    />
  );
}
