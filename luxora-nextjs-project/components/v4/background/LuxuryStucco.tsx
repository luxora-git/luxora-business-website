export interface LuxuryStuccoProps {
  /** SVG filter id — pass a unique value per instance. */
  id?: string;
  /** Broad, plaster-like mottling — keep within 0.015–0.04. */
  opacity?: number;
  className?: string;
}

/**
 * LuxuryStucco — a broad plaster/limewash mottle, the coarse companion to
 * LuxuryGrain's fine paper tooth. Together they give the cream surfaces the
 * physical "painted wall" materiality of the Background Design System v2.
 * Pure SVG feTurbulence at a much lower frequency than the grain — large
 * soft blotches instead of speckle. No assets.
 */
export default function LuxuryStucco({ id = 'luxora-stucco', opacity = 0.025, className = '' }: LuxuryStuccoProps) {
  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full pointer-events-none select-none ${className}`}
      style={{ opacity, zIndex: 0 }}
      preserveAspectRatio="none"
    >
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves={3} stitchTiles="stitch" result="noise" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.42  0 0 0 0 0.30  0 0 0 0 0.23  0 0 0 0.55 0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}
