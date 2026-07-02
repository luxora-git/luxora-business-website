import type { ReactNode } from 'react';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export type GalleryBadgeTone = 'gold' | 'light' | 'dark';

export interface GalleryBadgeProps {
  children: ReactNode;
  tone?: GalleryBadgeTone;
  className?: string;
}

/**
 * GalleryBadge — a static (non-interactive) label badge: "Collection",
 * "Featured", "New". Distinct from `GalleryTag`, which is always a control.
 */
export default function GalleryBadge({ children, tone = 'gold', className = '' }: GalleryBadgeProps) {
  const style =
    tone === 'gold'
      ? { background: 'rgba(201,162,39,0.12)', color: luxoraColors.gold, border: '1px solid rgba(201,162,39,0.30)' }
      : tone === 'light'
        ? { background: 'rgba(253,250,246,0.16)', color: '#FDFAF6', border: '1px solid rgba(253,250,246,0.30)' }
        : { background: 'rgba(44,31,20,0.06)', color: luxoraColors.espresso, border: '1px solid rgba(44,31,20,0.14)' };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[9.5px] font-semibold tracking-[0.18em] uppercase ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
