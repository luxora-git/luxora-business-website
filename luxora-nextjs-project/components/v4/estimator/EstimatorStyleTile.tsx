'use client';

import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { EstimatorStyleOption } from '@/lib/content/estimator/types';

export interface EstimatorStyleTileProps {
  option: EstimatorStyleOption;
  selected: boolean;
  /** True when the max number of styles is already selected and this tile isn't one of them. */
  selectionFull: boolean;
  onToggle: (slug: string) => void;
}

/**
 * EstimatorStyleTile — full-bleed photographic moodboard tile with
 * checkbox semantics (multi-select, per the approved UI Spec for the
 * Visual Inspiration step). Style name + one-line description sit over a
 * bottom scrim; selection shows a gold border, glow, and a solid gold
 * check badge. When the selection cap is reached, unselected tiles dim
 * slightly and expose aria-disabled — still focusable so screen-reader
 * users hear why they can't add more.
 */
export default function EstimatorStyleTile({ option, selected, selectionFull, onToggle }: EstimatorStyleTileProps) {
  const blocked = selectionFull && !selected;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      aria-disabled={blocked || undefined}
      aria-label={blocked ? `${option.label} — deselect another style first` : option.label}
      onClick={() => onToggle(option.slug)}
      className="group relative w-full overflow-hidden rounded-3xl text-left transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 hover:-translate-y-1"
      style={{
        border: selected ? '2px solid rgba(201,162,39,0.85)' : '2px solid rgba(160,120,80,0.28)',
        boxShadow: selected
          ? '0 0 0 4px rgba(201,162,39,0.14), 0 20px 56px rgba(100,60,20,0.16)'
          : '0 12px 40px rgba(100,60,20,0.09)',
        opacity: blocked ? 0.55 : 1,
        outlineColor: luxoraColors.gold,
      }}
    >
      {selected && (
        <span
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full"
          style={{ background: luxoraColors.gold, boxShadow: '0 6px 18px rgba(201,162,39,0.45)' }}
          aria-hidden="true"
        >
          <svg width="18" height="18" fill="none" stroke="#1C1005" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}

      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={option.image}
          alt={option.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(28,22,16,0.78) 0%, rgba(28,22,16,0.28) 40%, transparent 65%)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <h3 className="font-playfair text-[1.25rem] leading-snug text-white mb-1 drop-shadow-md">{option.label}</h3>
          {option.description && (
            <p className="text-[12px] font-light leading-relaxed line-clamp-2" style={{ color: 'rgba(253,250,246,0.75)' }}>
              {option.description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
