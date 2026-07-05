'use client';

import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { EstimatorQuestionOption } from '@/lib/content/estimator/questions';

export interface EstimatorOptionCardProps {
  option: EstimatorQuestionOption;
  selected: boolean;
  onSelect: (value: string) => void;
}

/**
 * EstimatorOptionCard — the single-select answer row used by every
 * option-type question (BHK, area range, kitchen shape, finish, wardrobe
 * type…). Radio indicator left, label + description center, gold check
 * right when selected. Proper radio semantics; grouped by the screen.
 */
export default function EstimatorOptionCard({ option, selected, onSelect }: EstimatorOptionCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(option.value)}
      className="group flex w-full items-center gap-4 rounded-2xl px-5 py-4 md:px-6 md:py-5 text-left transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        background: selected ? 'rgba(201,162,39,0.08)' : 'rgba(253,250,246,0.95)',
        border: selected ? '2px solid rgba(201,162,39,0.75)' : '2px solid rgba(160,120,80,0.26)',
        boxShadow: selected ? '0 0 0 4px rgba(201,162,39,0.10), 0 10px 30px rgba(100,60,20,0.10)' : '0 6px 22px rgba(100,60,20,0.06)',
        outlineColor: luxoraColors.gold,
      }}
    >
      {/* Radio indicator */}
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300"
        style={{
          border: selected ? `2px solid ${luxoraColors.gold}` : '2px solid rgba(160,120,80,0.45)',
          background: selected ? luxoraColors.gold : 'transparent',
        }}
        aria-hidden="true"
      >
        {selected && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1C1005" strokeWidth={3.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>

      <span className="flex-1 min-w-0">
        <span className="block font-playfair text-[1.1rem] leading-snug" style={{ color: luxoraColors.espresso }}>
          {option.label}
        </span>
        {option.description && (
          <span className="mt-0.5 block text-[12.5px] font-light leading-relaxed" style={{ color: luxoraColors.softBrown }}>
            {option.description}
          </span>
        )}
      </span>
    </button>
  );
}
