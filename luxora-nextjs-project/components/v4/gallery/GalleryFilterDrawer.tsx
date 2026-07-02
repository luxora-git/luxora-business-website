'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { GalleryFilterFacets, GalleryFilterState } from '@/lib/content/gallery/types';

export interface GalleryFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  facets: GalleryFilterFacets;
  filters: GalleryFilterState;
  onChange: (next: Partial<GalleryFilterState>) => void;
  onClear: () => void;
}

function FacetGroup({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: string[];
  active: string | null;
  onSelect: (value: string | null) => void;
}) {
  return (
    <div className="mb-7">
      <div className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: '#9C7B68' }}>
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isActive = active === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(isActive ? null : opt)}
              className="px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.06em] transition-all duration-300"
              style={
                isActive
                  ? { background: luxoraColors.gold, color: '#1C1005' }
                  : { background: 'rgba(253,250,246,0.8)', color: '#6B4C3B', border: '1px solid rgba(160,120,80,0.22)' }
              }
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * GalleryFilterDrawer — bottom-sheet-style facet drawer shared by every
 * gallery listing surface, used on all breakpoints (not mobile-only) so
 * advanced facets (style/budget/area/property type/city) stay out of the
 * way of the primary category pills. Reuses the exact AnimatePresence
 * fade+slide recipe established by the global ConsultationModal.
 */
export default function GalleryFilterDrawer({ isOpen, onClose, facets, filters, onChange, onClear }: GalleryFilterDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[280] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(20,14,6,0.55)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filter designs"
            className="relative w-full sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl"
            style={{
              background: 'rgba(253,250,246,0.97)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(201,162,39,0.25)',
              boxShadow: '0 30px 90px rgba(20,14,6,0.35)',
            }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[rgba(44,31,20,0.08)]"
              style={{ color: luxoraColors.espresso }}
              aria-label="Close filters"
            >
              ✕
            </button>

            <div className="p-7 md:p-9">
              <h2 className="font-playfair text-2xl mb-6" style={{ color: luxoraColors.espresso }}>
                Refine Designs
              </h2>

              <FacetGroup label="Style" options={facets.styles} active={filters.style} onSelect={(v) => onChange({ style: v })} />
              <FacetGroup label="Property Type" options={facets.propertyTypes} active={filters.propertyType} onSelect={(v) => onChange({ propertyType: v })} />
              <FacetGroup label="City" options={facets.cities} active={filters.city} onSelect={(v) => onChange({ city: v })} />
              <FacetGroup
                label="Area"
                options={facets.areaBuckets.map((b) => b.label)}
                active={filters.areaBucket}
                onSelect={(v) => onChange({ areaBucket: v })}
              />
              <FacetGroup
                label="Budget"
                options={facets.budgetBuckets.map((b) => b.label)}
                active={filters.budgetBucket}
                onSelect={(v) => onChange({ budgetBucket: v })}
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClear}
                  className="flex-1 px-6 py-3.5 rounded-full font-semibold text-[11px] tracking-[0.08em] uppercase"
                  style={{ border: '1.5px solid rgba(44,31,20,0.18)', color: luxoraColors.espresso }}
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3.5 rounded-full font-bold text-[11px] tracking-[0.08em] uppercase"
                  style={{ background: luxoraColors.gold, color: '#1C1005' }}
                >
                  Show Results
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
