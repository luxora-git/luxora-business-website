import {
  luxoraColors,
  luxoraPatternOpacity,
  getLuxuryPositionStyle,
  composeLuxuryTransform,
  type LuxuryPosition,
} from '@/lib/design/luxoraDesignTokens';

export type LuxuryBlueprintVariant = 'a' | 'b' | 'c';
export type LuxuryBlueprintDensity = 'low' | 'medium' | 'high';

export interface LuxuryBlueprintProps {
  opacity?: number;
  rotation?: number;
  scale?: number;
  position?: LuxuryPosition;
  color?: string;
  /** Selects one of three preset floor-plan layouts (deterministic, SSR-safe). */
  variant?: LuxuryBlueprintVariant;
  /** Controls how many of the variant's line groups render. */
  density?: LuxuryBlueprintDensity;
  className?: string;
}

const VARIANTS: Record<LuxuryBlueprintVariant, string[]> = {
  a: [
    'M20 20 H260 V180 H140 V260 H20 Z',
    'M140 20 V180',
    'M20 100 H140',
    'M260 60 H340 V180 H260',
    'M180 260 H340 V340 H180 Z',
  ],
  b: [
    'M20 20 H300 V120 H180 V260 H20 Z',
    'M180 20 V120',
    'M20 170 H180',
    'M300 60 H380 V260 H300',
    'M60 260 H300',
  ],
  c: [
    'M20 40 H220 V220 H120 V300 H20 Z',
    'M120 40 V220',
    'M20 130 H120',
    'M220 80 H340 V220 H220',
    'M160 300 H340 V360 H160 Z',
  ],
};

/**
 * LuxuryBlueprint — thin architectural floor-plan line art for a subtle
 * "design studio" atmosphere. Variant + density are fixed presets rather
 * than `Math.random()` so server and client render identically.
 */
export default function LuxuryBlueprint({
  opacity = luxoraPatternOpacity.blueprint,
  rotation = 0,
  scale = 1,
  position = 'top-right',
  color = luxoraColors.gold,
  variant = 'a',
  density = 'medium',
  className = '',
}: LuxuryBlueprintProps) {
  const paths = VARIANTS[variant];
  const count =
    density === 'low' ? Math.ceil(paths.length * 0.5) : density === 'high' ? paths.length : Math.ceil(paths.length * 0.8);
  const visible = paths.slice(0, count);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        ...getLuxuryPositionStyle(position),
        width: 'clamp(280px, 36vw, 480px)',
        height: 'clamp(280px, 36vw, 480px)',
        opacity,
        transform: composeLuxuryTransform(position, rotation, scale),
        zIndex: 0,
      }}
    >
      <svg viewBox="0 0 400 400" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {visible.map((d, i) => (
          <path key={d} d={d} stroke={color} strokeWidth={i === 0 ? 1 : 0.6} />
        ))}
        <circle cx="300" cy="300" r="3" fill={color} />
      </svg>
    </div>
  );
}
