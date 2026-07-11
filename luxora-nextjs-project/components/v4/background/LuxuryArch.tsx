export interface LuxuryArchProps {
  /** Width of the outermost arch, px. */
  size?: number;
  /** Height of the outermost arch, px (defaults to 1.35 × size). */
  height?: number;
  /** Number of nested arch outlines. */
  count?: number;
  /** Spacing between nested arches, px. */
  gap?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  color?: string;
  opacity?: number;
  className?: string;
}

/**
 * LuxuryArch — nested hairline archways, the architectural motif of the
 * plaster-wall canvas (echoes doorways and vaulted openings from the
 * photography). Open at the bottom so the lines run off the section edge
 * when anchored low. Tone-on-tone tan, pure CSS borders, no assets.
 */
export default function LuxuryArch({
  size = 260,
  height,
  count = 3,
  gap = 24,
  top,
  left,
  right,
  bottom,
  color = '#C9A96E',
  opacity = 0.22,
  className = '',
}: LuxuryArchProps) {
  const h = height ?? size * 1.35;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute ${className}`}
      style={{ top, left, right, bottom, width: size, height: h, opacity, zIndex: 0 }}
    >
      {Array.from({ length: count }, (_, i) => {
        const w = size - i * 2 * gap;
        const ah = h - i * gap;
        return (
          <span
            key={i}
            className="absolute block"
            style={{
              left: i * gap,
              bottom: 0,
              width: w,
              height: ah,
              border: `1px solid ${color}`,
              borderBottom: 'none',
              borderRadius: `${w / 2}px ${w / 2}px 0 0`,
            }}
          />
        );
      })}
    </div>
  );
}
