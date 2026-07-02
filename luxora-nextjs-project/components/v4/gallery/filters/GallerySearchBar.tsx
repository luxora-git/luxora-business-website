'use client';

import type { KeyboardEvent } from 'react';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export type GallerySearchBarSize = 'default' | 'hero';

export interface GallerySearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  size?: GallerySearchBarSize;
  autoFocus?: boolean;
  className?: string;
}

/**
 * GallerySearchBar — the controlled search input used everywhere the
 * Gallery offers search (the Hero, the Full Gallery Browser's filter bar,
 * any future Collection/Style page). `size="hero"` renders the larger,
 * frosted-glass treatment used when this sits directly over photography.
 */
export default function GallerySearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search designs, styles, cities…',
  size = 'default',
  autoFocus = false,
  className = '',
}: GallerySearchBarProps) {
  const isHero = size === 'hero';

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit?.(value);
  };

  return (
    <div className={`relative w-full ${className}`} role="search">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        fill="none"
        stroke={isHero ? '#FDFAF6' : luxoraColors.gold}
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={
          isHero
            ? 'w-full pl-12 pr-5 py-4 rounded-full text-[15px] font-light focus:outline-none transition-colors duration-200'
            : 'w-full pl-11 pr-4 py-3 rounded-full text-[13.5px] font-light bg-[#FDFAF6] border focus:outline-none transition-colors duration-200'
        }
        style={
          isHero
            ? { background: 'rgba(253,250,246,0.14)', border: '1px solid rgba(253,250,246,0.35)', color: '#FDFAF6', backdropFilter: 'blur(14px)' }
            : { borderColor: 'rgba(160,120,80,0.25)', color: luxoraColors.espresso }
        }
        aria-label="Search gallery designs"
      />
    </div>
  );
}
