import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export type LuxuryFrameVariant = 'corners' | 'rules' | 'full';

export interface LuxuryFrameProps {
  /** `corners` — four corner L-marks; `rules` — top + bottom hairlines;
   * `full` — both. */
  variant?: LuxuryFrameVariant;
  /** Distance from the section edges, px. */
  inset?: number;
  /** Corner arm length, px. */
  arm?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

/**
 * LuxuryFrame — editorial line work: hairline corner marks and horizontal
 * rules that quietly "mount" a section like a plate in a printed monograph.
 * Purely decorative: absolutely positioned, pointer-events disabled, never
 * affects layout or interferes with content above it.
 */
export default function LuxuryFrame({
  variant = 'corners',
  inset = 28,
  arm = 48,
  color = luxoraColors.gold,
  opacity = 0.22,
  className = '',
}: LuxuryFrameProps) {
  const corner = { width: arm, height: arm, borderColor: color } as const;
  const showCorners = variant === 'corners' || variant === 'full';
  const showRules = variant === 'rules' || variant === 'full';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute ${className}`}
      style={{ inset, opacity, zIndex: 0 }}
    >
      {showCorners && (
        <>
          <span className="absolute top-0 left-0 border-t border-l" style={corner} />
          <span className="absolute top-0 right-0 border-t border-r" style={corner} />
          <span className="absolute bottom-0 left-0 border-b border-l" style={corner} />
          <span className="absolute bottom-0 right-0 border-b border-r" style={corner} />
        </>
      )}
      {showRules && (
        <>
          <span className="absolute top-0 left-0 right-0 h-px" style={{ background: color }} />
          <span className="absolute bottom-0 left-0 right-0 h-px" style={{ background: color }} />
        </>
      )}
    </div>
  );
}
