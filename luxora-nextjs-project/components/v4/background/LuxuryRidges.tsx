import {
  getLuxuryPositionStyle,
  composeLuxuryTransform,
  type LuxuryPosition,
} from '@/lib/design/luxoraDesignTokens';

export type LuxuryRidgesVariant = 'sweep' | 'rings';

export interface LuxuryRidgesProps {
  /** `sweep` — a flowing bundle of parallel fabric-like curves;
   * `rings` — concentric circles anchored past the edge (only their arcs
   * show inside the section). */
  variant?: LuxuryRidgesVariant;
  position?: LuxuryPosition;
  rotation?: number;
  scale?: number;
  /** Number of lines in the bundle. */
  lines?: number;
  /** Tone-on-tone tan by default — visible in form, quiet in contrast. */
  color?: string;
  opacity?: number;
  className?: string;
}

/**
 * LuxuryRidges — large sweeping bundles of fine parallel lines, like layered
 * topography or draped fabric ridges — the signature large-scale line work
 * of the Background Design System v2. Deliberately BIG (spanning up to half
 * a section) and tone-on-tone, unlike the small gold accents of the v1
 * primitives. Pure SVG, no assets.
 */
export default function LuxuryRidges({
  variant = 'sweep',
  position = 'top-right',
  rotation = 0,
  scale = 1,
  lines = 13,
  color = '#C9A96E',
  opacity = 0.16,
  className = '',
}: LuxuryRidgesProps) {
  const idx = Array.from({ length: lines }, (_, i) => i);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        ...getLuxuryPositionStyle(position),
        width: 'clamp(480px, 60vw, 1080px)',
        height: 'clamp(380px, 48vw, 860px)',
        opacity,
        transform: composeLuxuryTransform(position, rotation, scale),
        zIndex: 0,
      }}
    >
      <svg viewBox="0 0 900 700" fill="none" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        {variant === 'sweep'
          ? idx.map((i) => (
              <path
                key={i}
                d={`M -60 ${540 - i * 19} C 240 ${370 - i * 19}, 530 ${690 - i * 19}, 960 ${420 - i * 19}`}
                stroke={color}
                strokeWidth="1"
              />
            ))
          : idx.map((i) => (
              <circle key={i} cx="920" cy="330" r={110 + i * 30} stroke={color} strokeWidth="1" />
            ))}
      </svg>
    </div>
  );
}
