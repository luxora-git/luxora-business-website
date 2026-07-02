'use client';

import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export interface GallerySearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * GallerySearchBar — plain controlled text input; debouncing and matching
 * logic live in `GalleryBrowser` / `lib/content/gallery/facets.ts` so this
 * component stays a dumb, reusable primitive.
 */
export default function GallerySearchBar({ value, onChange, placeholder = 'Search designs, styles, cities…' }: GallerySearchBarProps) {
  return (
    <div className="relative w-full">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        fill="none"
        stroke={luxoraColors.gold}
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 rounded-full text-[13.5px] font-light bg-[#FDFAF6] border transition-colors duration-200 focus:outline-none"
        style={{ borderColor: 'rgba(160,120,80,0.25)', color: luxoraColors.espresso }}
        aria-label="Search gallery designs"
      />
    </div>
  );
}
