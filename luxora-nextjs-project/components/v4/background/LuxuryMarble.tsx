import {
  luxoraColors,
  luxoraPatternOpacity,
  getLuxuryPositionStyle,
  composeLuxuryTransform,
  type LuxuryPosition,
} from '@/lib/design/luxoraDesignTokens';

export interface LuxuryMarbleProps {
  opacity?: number;
  rotation?: number;
  scale?: number;
  position?: LuxuryPosition;
  color?: string;
  className?: string;
}

/**
 * LuxuryMarble — organic, branching vein lines inspired by Italian marble.
 * SVG-only (no bitmap textures), rendered at very low opacity so it reads
 * as stone-like depth rather than a literal pattern.
 */
export default function LuxuryMarble({
  opacity = luxoraPatternOpacity.marble,
  rotation = 0,
  scale = 1,
  position = 'center',
  color = luxoraColors.gold,
  className = '',
}: LuxuryMarbleProps) {
  const isFullBleed = position === 'center';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        ...getLuxuryPositionStyle(position),
        width: isFullBleed ? '100%' : 'clamp(360px, 46vw, 720px)',
        height: isFullBleed ? '100%' : 'clamp(360px, 46vw, 720px)',
        opacity,
        transform: composeLuxuryTransform(position, rotation, scale),
        zIndex: 0,
      }}
    >
      <svg viewBox="0 0 800 800" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <path
          d="M-40 600 Q160 520 220 420 Q260 350 180 280 Q120 230 180 150 Q220 100 320 60"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M40 700 Q220 600 260 480 Q290 400 220 330 Q170 280 230 200"
          stroke={color}
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M300 60 Q340 140 300 220 Q270 280 340 320 Q400 360 380 440"
          stroke={color}
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        <path
          d="M500 80 Q560 180 520 260 Q480 330 560 380 Q630 420 600 500"
          stroke={color}
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <path d="M620 120 Q680 220 720 320" stroke={color} strokeWidth="0.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
