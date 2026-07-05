import { LuxuryGrain } from '@/components/v4/background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { ServiceHighlightItem } from '@/lib/content/services/types';

export interface EstimatorBenefitCardsProps {
  items: ServiceHighlightItem[];
}

/** Deeper gold than ServiceHighlights' plain gold value color — computes to
 * ~4.68:1 against the card surface (passes WCAG AA for normal text), vs.
 * the shared component's ~2.33:1 (fails AA even at large-text size). */
const VALUE_ACCENT = '#8C6D1A';

/**
 * EstimatorBenefitCards — an estimator-owned sibling to ServiceHighlights.
 * This pass increases border/shadow contrast so cards read as defined
 * panels against the warm background instead of blending into it (the
 * same "too faint to register" problem fixed elsewhere on this screen).
 */
export default function EstimatorBenefitCards({ items }: EstimatorBenefitCardsProps) {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden" style={{ backgroundColor: '#F5EDE0' }}>
      <LuxuryGrain id="estimator-benefit-grain" opacity={0.012} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5" data-estimator-reveal>
          {items.map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl p-7 text-center transition-all duration-500 bg-[rgba(253,250,246,0.92)] backdrop-blur-[8px] border-[1.5px] border-[rgba(160,120,80,0.32)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_6px_24px_rgba(100,60,20,0.08)] hover:-translate-y-1.5 hover:border-[rgba(201,162,39,0.55)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_18px_42px_rgba(100,60,20,0.14)]"
            >
              <div
                className="font-playfair italic text-2xl mb-3 transition-colors duration-500 group-hover:text-[#a3801f]"
                style={{ color: VALUE_ACCENT }}
              >
                {item.value}
              </div>
              <span className="block w-7 h-px mx-auto mb-3.5" style={{ background: 'rgba(201,162,39,0.45)' }} aria-hidden="true" />
              <h3 className="font-playfair font-bold leading-tight mb-3 text-[1.05rem]" style={{ color: luxoraColors.espresso }}>
                {item.label}
              </h3>
              <p className="text-xs font-light leading-relaxed" style={{ color: luxoraColors.softBrown }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
