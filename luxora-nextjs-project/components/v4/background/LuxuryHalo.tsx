import {
  luxoraColors,
  luxoraPatternOpacity,
  luxoraBlur,
  getLuxuryPositionStyle,
  getLuxuryPositionTransform,
  type LuxuryPosition,
} from '@/lib/design/luxoraDesignTokens';

export type LuxuryHaloSize = 'sm' | 'md' | 'lg' | 'xl';

export interface LuxuryHaloProps {
  size?: LuxuryHaloSize;
  opacity?: number;
  /** Blur radius in px. Defaults to the shared "glow" blur token. */
  blur?: number;
  color?: string;
  position?: LuxuryPosition;
  className?: string;
}

const SIZE_MAP: Record<LuxuryHaloSize, number> = { sm: 220, md: 360, lg: 520, xl: 720 };

/**
 * LuxuryHalo — a soft, edgeless radial light source for warmth and focus.
 * Pure CSS radial-gradient + blur, no hard edges at any size.
 */
export default function LuxuryHalo({
  size = 'md',
  opacity = luxoraPatternOpacity.halo,
  blur = parseInt(luxoraBlur.glowBlur, 10),
  color = luxoraColors.gold,
  position = 'top-right',
  className = '',
}: LuxuryHaloProps) {
  const px = SIZE_MAP[size];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none rounded-full ${className}`}
      style={{
        ...getLuxuryPositionStyle(position),
        width: px,
        height: px,
        transform: getLuxuryPositionTransform(position),
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: `blur(${blur}px)`,
        zIndex: 0,
      }}
    />
  );
}
