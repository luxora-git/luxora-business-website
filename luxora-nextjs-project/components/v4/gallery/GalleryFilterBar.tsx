'use client';

import { useState } from 'react';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import GallerySearchBar from './GallerySearchBar';
import GalleryFilterDrawer from './GalleryFilterDrawer';
import type { GalleryFilterFacets, GalleryFilterState } from '@/lib/content/gallery/types';

export interface GalleryFilterBarProps {
  facets: GalleryFilterFacets;
  filters: GalleryFilterState;
  onChange: (next: Partial<GalleryFilterState>) => void;
  onClear: () => void;
  /** Hide the category pill row (used on Category pages, where the category is fixed by the URL). */
  hideCategoryPills?: boolean;
}

const activeFacetCount = (filters: GalleryFilterState) =>
  [filters.style, filters.propertyType, filters.city, filters.areaBucket, filters.budgetBucket].filter(Boolean).length;

/**
 * GalleryFilterBar — category pills (primary filter) + search + a single
 * "Filters" trigger that opens `GalleryFilterDrawer` for the secondary
 * facets. Shared, unmodified, across Gallery Home, Category and Search.
 */
export default function GalleryFilterBar({ facets, filters, onChange, onClear, hideCategoryPills }: GalleryFilterBarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const count = activeFacetCount(filters);

  return (
    <div className="mb-12" data-v4-reveal>
      {!hideCategoryPills && (
        <div className="flex flex-wrap gap-2.5 mb-5">
          <button
            type="button"
            onClick={() => onChange({ category: null })}
            className="px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.10em] uppercase transition-all duration-300"
            style={
              !filters.category
                ? { background: luxoraColors.gold, color: '#1C1005', boxShadow: '0 10px 24px rgba(201,162,39,0.30)' }
                : { background: 'rgba(253,250,246,0.5)', color: '#9C7B68', border: '1px solid rgba(160,120,80,0.22)' }
            }
          >
            All
          </button>
          {facets.categories.map((c) => {
            const isActive = filters.category === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => onChange({ category: isActive ? null : c.slug })}
                className="px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.10em] uppercase transition-all duration-300"
                style={
                  isActive
                    ? { background: luxoraColors.gold, color: '#1C1005', boxShadow: '0 10px 24px rgba(201,162,39,0.30)' }
                    : { background: 'rgba(253,250,246,0.5)', color: '#9C7B68', border: '1px solid rgba(160,120,80,0.22)' }
                }
              >
                {c.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <GallerySearchBar value={filters.query} onChange={(query) => onChange({ query })} />
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase flex-shrink-0 transition-all duration-300 hover:-translate-y-0.5"
          style={{ border: '1.5px solid rgba(201,162,39,0.35)', color: luxoraColors.espresso, background: '#FDFAF6' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M6 12h12M10 20h4" />
          </svg>
          Filters{count > 0 ? ` (${count})` : ''}
        </button>
      </div>

      <GalleryFilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        facets={facets}
        filters={filters}
        onChange={onChange}
        onClear={onClear}
      />
    </div>
  );
}
