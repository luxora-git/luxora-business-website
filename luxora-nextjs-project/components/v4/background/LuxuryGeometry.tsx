import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export type LuxuryGeometryVariant = 'squares' | 'arcs' | 'mixed';

export interface LuxuryGeometryProps {
  variant?: LuxuryGeometryVariant;
  color?: string;
  opacity?: number;
  className?: string;
}

interface Shape {
  kind: 'square' | 'diamond' | 'arc';
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: number;
  rotate: number;
}

/** Fixed, art-directed placements — deliberately composed (weight in the
 * corners, breathing room in the middle where content lives), never
 * randomized so every render is identical. */
const LAYOUTS: Record<LuxuryGeometryVariant, Shape[]> = {
  squares: [
    { kind: 'square', top: '9%', left: '5%', size: 56, rotate: 45 },
    { kind: 'diamond', top: '15%', left: '9.5%', size: 7, rotate: 45 },
    { kind: 'square', top: '64%', right: '4%', size: 84, rotate: 45 },
    { kind: 'square', bottom: '8%', left: '12%', size: 34, rotate: 45 },
    { kind: 'diamond', top: '58%', right: '11%', size: 6, rotate: 45 },
  ],
  arcs: [
    { kind: 'arc', top: '-14%', right: '-6%', size: 340, rotate: 0 },
    { kind: 'arc', bottom: '-18%', left: '-8%', size: 420, rotate: 0 },
  ],
  mixed: [
    { kind: 'arc', top: '-14%', right: '-6%', size: 360, rotate: 0 },
    { kind: 'square', top: '14%', left: '5%', size: 52, rotate: 45 },
    { kind: 'diamond', top: '21%', left: '9%', size: 6, rotate: 45 },
    { kind: 'square', bottom: '10%', right: '9%', size: 36, rotate: 45 },
    { kind: 'arc', bottom: '-20%', left: '-7%', size: 300, rotate: 0 },
  ],
};

/**
 * LuxuryGeometry — floating geometric accents: hairline outlined squares
 * set on point, tiny solid diamonds, and large off-canvas circle arcs.
 * The architectural jewelry of a composition — quiet, fixed, and always
 * subordinate to content. Pure CSS borders, no assets.
 */
export default function LuxuryGeometry({
  variant = 'mixed',
  color = luxoraColors.gold,
  opacity = 0.16,
  className = '',
}: LuxuryGeometryProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity, zIndex: 0 }}
    >
      {LAYOUTS[variant].map((s, i) => (
        <span
          key={i}
          className="absolute block"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            bottom: s.bottom,
            width: s.size,
            height: s.size,
            transform: `rotate(${s.rotate}deg)`,
            ...(s.kind === 'diamond'
              ? { background: color }
              : { border: `1px solid ${color}`, borderRadius: s.kind === 'arc' ? '9999px' : 0 }),
          }}
        />
      ))}
    </div>
  );
}
