import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export type LuxuryDividerVariant = 'line' | 'diamond' | 'curve' | 'editorial';

export interface LuxuryDividerProps {
  variant?: LuxuryDividerVariant;
  color?: string;
  className?: string;
}

/**
 * LuxuryDivider — reusable section separators shared across sections, CTAs,
 * footers and cards. Four variants:
 *  - `line`      a plain gold hairline
 *  - `diamond`   short line / rotated-diamond ornament / short line
 *  - `curve`     a thin luxury curve (SVG)
 *  - `editorial` full-width line / diamond / line, for CTAs and headers
 */
export default function LuxuryDivider({ variant = 'line', color = luxoraColors.gold, className = '' }: LuxuryDividerProps) {
  if (variant === 'diamond') {
    return (
      <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
        <span className="h-px w-16" style={{ background: `${color}4D` }} />
        <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: color }} />
        <span className="h-px w-16" style={{ background: `${color}4D` }} />
      </div>
    );
  }

  if (variant === 'curve') {
    return (
      <svg viewBox="0 0 200 24" className={`w-40 h-6 mx-auto ${className}`} aria-hidden="true" fill="none">
        <path d="M2 12 Q50 -6 100 12 T198 12" stroke={color} strokeWidth="1" />
      </svg>
    );
  }

  if (variant === 'editorial') {
    return (
      <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
        <span className="h-px flex-1" style={{ background: `${color}4D` }} />
        <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: color }} />
        <span className="h-px flex-1" style={{ background: `${color}4D` }} />
      </div>
    );
  }

  return <span aria-hidden="true" className={`block h-px w-full ${className}`} style={{ background: `${color}33` }} />;
}
