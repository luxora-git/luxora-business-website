'use client';

import type { ReactNode } from 'react';
import GallerySearchBar from '../filters/GallerySearchBar';

export interface GalleryHeroSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  /** Rendered beneath the input — e.g. `GalleryPopularSearches` or `GallerySearchSuggestions`. */
  suggestionsSlot?: ReactNode;
  className?: string;
}

/**
 * GalleryHeroSearch — `GallerySearchBar` pre-configured for placement
 * directly inside `GalleryHero`, over photography (the frosted-glass
 * `size="hero"` treatment). A thin composition, not a fork.
 */
export default function GalleryHeroSearch({ value, onChange, onSubmit, placeholder, suggestionsSlot, className = '' }: GalleryHeroSearchProps) {
  return (
    <div className={className}>
      <GallerySearchBar value={value} onChange={onChange} onSubmit={onSubmit} placeholder={placeholder} size="hero" />
      {suggestionsSlot && <div className="mt-3">{suggestionsSlot}</div>}
    </div>
  );
}
