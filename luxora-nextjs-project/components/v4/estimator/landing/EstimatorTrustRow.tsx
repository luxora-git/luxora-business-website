import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { EstimatorTrustItem } from '@/lib/content/estimator/landing';

export interface EstimatorTrustRowProps {
  items: EstimatorTrustItem[];
}

/**
 * EstimatorTrustRow — badge stacked ABOVE the label (centered), not
 * inline beside it. The inline layout left each 6-column cell only ~110px
 * of text width, which "PERSONALIZED RECOMMENDATIONS" (one unbreakable
 * 15-character word) physically cannot fit — it overflowed across the
 * divider, and "EXPERT INTERIOR DESIGNERS" broke onto 3 ragged lines.
 * Stacking gives every label the full column width, so the longest word
 * fits and no label needs more than 2 lines.
 */
export default function EstimatorTrustRow({ items }: EstimatorTrustRowProps) {
  return (
    <section className="relative py-9 md:py-10" style={{ backgroundColor: '#FDFAF6' }}>
      <div
        className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 border-t-2 border-b-2 py-8 md:py-7"
        style={{ borderColor: 'rgba(160,120,80,0.28)' }}
        data-estimator-reveal
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-7 gap-x-3 lg:gap-x-0">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col items-center text-center gap-3 px-2 ${i > 0 ? 'lg:border-l' : ''}`}
              style={{ borderColor: 'rgba(160,120,80,0.22)' }}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full flex-shrink-0"
                style={{ background: luxoraColors.gold, boxShadow: '0 4px 12px rgba(201,162,39,0.3)' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="#1C1005" strokeWidth={3} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span
                className="text-[12px] font-bold uppercase tracking-[0.05em] leading-snug whitespace-pre-line"
                style={{ color: luxoraColors.espresso }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
