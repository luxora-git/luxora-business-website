import type { ButtonHTMLAttributes } from 'react';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export type GalleryArrowDirection = 'prev' | 'next';
export type GalleryArrowSize = 'sm' | 'md';
export type GalleryArrowTone = 'light' | 'dark';

export interface GalleryArrowButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  direction: GalleryArrowDirection;
  size?: GalleryArrowSize;
  /** `light` = light glyph on a translucent dark chip (for use over photography); `dark` = the standard espresso-on-cream chip used in rail navigation. */
  tone?: GalleryArrowTone;
  className?: string;
}

const SIZE_PX: Record<GalleryArrowSize, string> = { sm: 'w-9 h-9', md: 'w-11 h-11' };

/**
 * GalleryArrowButton — the one circular prev/next control used by rails,
 * carousels and the lightbox. Two tones cover every context: `dark` for
 * controls sitting on a cream/ivory background, `light` for controls
 * floating directly over a photograph.
 */
export default function GalleryArrowButton({
  direction,
  size = 'md',
  tone = 'dark',
  className = '',
  disabled,
  ...rest
}: GalleryArrowButtonProps) {
  const path = direction === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7';
  const ariaLabel = direction === 'prev' ? 'Previous' : 'Next';

  const style =
    tone === 'light'
      ? { background: 'rgba(253,250,246,0.12)', backdropFilter: 'blur(8px)', color: '#FDFAF6' }
      : { borderColor: 'rgba(160,120,80,0.30)', background: '#FDFAF6', color: luxoraColors.espresso, border: '1px solid' };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      className={`group flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${tone === 'dark' ? 'hover:border-[#1C1005] hover:bg-[#1C1005] hover:text-white' : 'hover:bg-[rgba(253,250,246,0.22)]'} ${SIZE_PX[size]} ${className}`}
      style={style}
      {...rest}
    >
      <svg
        className={`w-4 h-4 transition-transform duration-300 ${direction === 'prev' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    </button>
  );
}
