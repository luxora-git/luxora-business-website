export type LuxuryBotanicalMode = 'shadow' | 'relief';

export interface LuxuryBotanicalProps {
  /** `shadow` — a soft blurred frond silhouette, like sunlight through a
   * palm; `relief` — the same frond as a bas-relief pressed into plaster
   * (light edge upper-left, dark edge lower-right). */
  mode?: LuxuryBotanicalMode;
  /** Rendered width in px. */
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotation?: number;
  opacity?: number;
  className?: string;
}

/** Palm frond as stroke paths — central stem plus curved leaflets, longer
 * toward the middle. Fixed geometry so every render is identical. */
function frondPaths(): string[] {
  const paths: string[] = ['M200,16 C 206,180 210,340 198,504'];
  for (let i = 0; i < 11; i++) {
    const y = 64 + i * 40;
    const len = 158 - Math.abs(i - 5) * 16;
    paths.push(`M200,${y} Q ${200 - len} ${y - 34}, ${200 - len - 22} ${y + 8}`);
    paths.push(`M200,${y + 18} Q ${200 + len} ${y - 14}, ${200 + len + 22} ${y + 26}`);
  }
  return paths;
}

const FROND = frondPaths();

/**
 * LuxuryBotanical — organic warmth for the plaster-wall canvas: either the
 * blurred shadow of a palm frond falling across the section, or the frond
 * embossed into the surface as a bas-relief. Both tone-on-tone; the shadow
 * mode is the softest large element in the system, the relief the most
 * tactile. Pure SVG + CSS blur, no assets.
 */
export default function LuxuryBotanical({
  mode = 'shadow',
  size = 380,
  top,
  left,
  right,
  bottom,
  rotation = 0,
  opacity,
  className = '',
}: LuxuryBotanicalProps) {
  const resolvedOpacity = opacity ?? (mode === 'shadow' ? 0.07 : 0.45);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute ${className}`}
      style={{
        top,
        left,
        right,
        bottom,
        width: size,
        height: size * 1.3,
        opacity: resolvedOpacity,
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        filter: mode === 'shadow' ? 'blur(12px)' : undefined,
        zIndex: 0,
      }}
    >
      <svg viewBox="0 0 400 520" fill="none" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        {mode === 'shadow' ? (
          <g stroke="#6B4C3B" strokeWidth="10" strokeLinecap="round">
            {FROND.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
        ) : (
          <>
            <g stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" transform="translate(-1.2,-1.2)">
              {FROND.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
            <g stroke="rgba(107,76,59,0.4)" strokeWidth="1.4" transform="translate(1.2,1.2)">
              {FROND.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
