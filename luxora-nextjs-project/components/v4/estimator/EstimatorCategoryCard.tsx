'use client';

import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { EstimatorCategoryOption } from '@/lib/content/estimator/types';

export interface EstimatorCategoryCardProps {
  option: EstimatorCategoryOption;
  selected: boolean;
  onSelect: (slug: EstimatorCategoryOption['slug']) => void;
}

/**
 * EstimatorCategoryCard — a large photographic selection card with proper
 * radio semantics (role="radio" + aria-checked, per the approved UI Spec's
 * accessibility rules for all card-select patterns). Image-forward: real
 * project photography fills the top ~60%, with label + one-line
 * description beneath. Selected state: gold border, soft glow, and a
 * solid gold check badge.
 */
export default function EstimatorCategoryCard({ option, selected, onSelect }: EstimatorCategoryCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(option.slug)}
      className="group relative flex flex-col w-full text-left rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{
        background: 'rgba(253,250,246,0.95)',
        border: selected ? '2px solid rgba(201,162,39,0.85)' : '2px solid rgba(160,120,80,0.28)',
        boxShadow: selected
          ? '0 0 0 4px rgba(201,162,39,0.14), 0 20px 56px rgba(100,60,20,0.16)'
          : '0 16px 48px rgba(100,60,20,0.10)',
        outlineColor: luxoraColors.gold,
      }}
    >
      {selected && (
        <span
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full"
          style={{ background: luxoraColors.gold, boxShadow: '0 6px 18px rgba(201,162,39,0.45)' }}
          aria-hidden="true"
        >
          <svg className="w-4.5 h-4.5" width="18" height="18" fill="none" stroke="#1C1005" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}

      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={option.image}
          alt={option.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to top, rgba(28,22,16,0.28) 0%, transparent 45%)',
            opacity: selected ? 0.6 : 1,
          }}
          aria-hidden="true"
        />
      </div>

      <div className="flex-1 p-6 md:p-7">
        <h3 className="font-playfair text-[1.3rem] leading-snug mb-2" style={{ color: luxoraColors.espresso }}>
          {option.label}
        </h3>
        <p className="text-[13.5px] leading-relaxed font-light" style={{ color: luxoraColors.softBrown }}>
          {option.description}
        </p>
      </div>
    </button>
  );
}
