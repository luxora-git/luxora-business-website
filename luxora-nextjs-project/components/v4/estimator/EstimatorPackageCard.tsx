'use client';

import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { EstimatorPackageTierContent } from '@/lib/content/estimator/types';

export interface EstimatorPackageCardProps {
  tier: EstimatorPackageTierContent;
  selected: boolean;
  recommended: boolean;
  onSelect: (slug: string) => void;
}

/**
 * EstimatorPackageCard — an interactive, price-free sibling of the
 * service pages' ServicePricingPackages tier card: same editorial
 * structure (tagline eyebrow, Playfair name, hairline, gold-check feature
 * list), plus real project photography on top, radio semantics, a
 * rule-based "Recommended for you" ribbon, and a selected state matching
 * the estimator's established gold-border language. No prices anywhere,
 * by business rule — the personalized figure stays gated behind the lead
 * form, and public tier ranges are withheld too.
 */
export default function EstimatorPackageCard({ tier, selected, recommended, onSelect }: EstimatorPackageCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(tier.slug)}
      className="group relative flex flex-col w-full text-left rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{
        background: 'rgba(253,250,246,0.95)',
        border: selected ? '2px solid rgba(201,162,39,0.85)' : '2px solid rgba(160,120,80,0.28)',
        boxShadow: selected
          ? '0 0 0 4px rgba(201,162,39,0.14), 0 24px 64px rgba(100,60,20,0.18)'
          : '0 16px 48px rgba(100,60,20,0.10)',
        outlineColor: luxoraColors.gold,
      }}
    >
      {recommended && (
        <span
          className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.12em] uppercase"
          style={{ background: luxoraColors.gold, color: '#1C1005', boxShadow: '0 4px 14px rgba(201,162,39,0.4)' }}
        >
          Recommended For You
        </span>
      )}

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

      <div className="relative h-44 md:h-48 overflow-hidden">
        <img
          src={tier.image}
          alt={tier.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(28,22,16,0.3) 0%, transparent 45%)' }}
          aria-hidden="true"
        />
      </div>

      <div className="flex-1 flex flex-col p-7 md:p-8">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-2.5" style={{ color: luxoraColors.mutedBeige }}>
          {tier.tagline}
        </span>
        <h3 className="font-playfair text-[1.55rem] leading-tight mb-3" style={{ color: luxoraColors.espresso }}>
          {tier.name}
        </h3>
        <p className="text-[13px] leading-relaxed font-light mb-5" style={{ color: luxoraColors.softBrown }}>
          {tier.description}
        </p>

        <div className="w-10 h-px mb-5" style={{ background: 'rgba(201,162,39,0.35)' }} aria-hidden="true" />

        <ul className="space-y-3 flex-1">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <svg
                className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                fill="none"
                stroke={luxoraColors.gold}
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[13px] leading-relaxed font-light" style={{ color: luxoraColors.espresso }}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div
          className="mt-6 pt-5 text-center text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-300"
          style={{
            borderTop: '1px solid rgba(160,120,80,0.18)',
            color: selected ? luxoraColors.gold : luxoraColors.mutedBeige,
          }}
        >
          {selected ? 'Selected' : 'Select This Package'}
        </div>
      </div>
    </button>
  );
}
