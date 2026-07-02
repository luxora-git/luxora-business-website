import type { ButtonHTMLAttributes } from 'react';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export interface GalleryTagProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  label: string;
  active?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * GalleryTag — a clickable pill chip for tag/material/filter selection
 * (architecture §17 — tags never carry their own page, only ever a chip
 * that pre-fills a filter). Purely a control; it never navigates itself.
 */
export default function GalleryTag({ label, active = false, size = 'md', className = '', ...rest }: GalleryTagProps) {
  const sizing = size === 'sm' ? 'px-3.5 py-1.5 text-[10px]' : 'px-4 py-2 text-[11px]';
  return (
    <button
      type="button"
      className={`rounded-full font-semibold tracking-[0.06em] transition-all duration-300 ${sizing} ${className}`}
      style={
        active
          ? { background: luxoraColors.gold, color: '#1C1005' }
          : { background: 'rgba(253,250,246,0.8)', color: '#6B4C3B', border: '1px solid rgba(160,120,80,0.22)' }
      }
      aria-pressed={active}
      {...rest}
    >
      {label}
    </button>
  );
}
