import V4SectionHeader from '@/components/v4/V4SectionHeader';
import { LuxuryGrain, LuxuryHalo } from '@/components/v4/background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { EstimatorJourneyStep } from '@/lib/content/estimator/landing';

export interface EstimatorJourneyPreviewProps {
  id?: string;
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  steps: EstimatorJourneyStep[];
}

/**
 * EstimatorJourneyPreview — screenshot-review fixes: the card previously
 * carried the step number TWICE (a gold badge top-left AND a ghost
 * numeral top-right), which read as clutter, not layering — the ghost
 * numeral is gone; the solid gold badge is the single number, enlarged.
 * A short gold hairline under the badge gives each card a crafted
 * anchor. The fussy line–arrow–line connector is reduced to one clean
 * chevron. Title sizing/leading upgraded so the four cards read at a
 * confident, even rhythm despite different description lengths.
 */
export default function EstimatorJourneyPreview({ id, eyebrow, title, titleItalic, description, steps }: EstimatorJourneyPreviewProps) {
  return (
    <section id={id} className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: '#FDFAF6' }}>
      <LuxuryHalo position="top-right" size="md" opacity={0.05} blur={100} />
      <LuxuryGrain id="estimator-journey-grain" opacity={0.012} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div data-estimator-reveal-heading>
          <V4SectionHeader eyebrow={eyebrow} title={title} titleItalic={titleItalic} description={description} centered />
        </div>

        {/* Desktop / tablet — horizontal flow */}
        <div className="hidden md:flex items-stretch" data-estimator-reveal>
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-stretch flex-1">
              <div
                className="group relative flex-1 flex flex-col rounded-3xl p-9 lg:p-10 transition-all duration-500 hover:-translate-y-1.5"
                style={{
                  background: 'rgba(253,250,246,0.95)',
                  border: '1.5px solid rgba(160,120,80,0.3)',
                  boxShadow: '0 16px 48px rgba(100,60,20,0.10)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,162,39,0.55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(160,120,80,0.3)';
                }}
              >
                <span
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full font-playfair italic text-base font-bold flex-shrink-0"
                  style={{ background: luxoraColors.gold, color: '#1C1005', boxShadow: '0 6px 18px rgba(201,162,39,0.35)' }}
                >
                  {step.number}
                </span>
                <span className="block w-8 h-px my-5" style={{ background: 'rgba(201,162,39,0.45)' }} aria-hidden="true" />
                <h3 className="font-playfair text-[1.35rem] leading-[1.25] mb-3" style={{ color: luxoraColors.espresso }}>
                  {step.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed font-light" style={{ color: luxoraColors.softBrown }}>
                  {step.description}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="flex items-center justify-center px-2.5" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={luxoraColors.gold} strokeWidth={2} className="flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile — vertical flow */}
        <div className="md:hidden flex flex-col" data-estimator-reveal>
          {steps.map((step, i) => (
            <div key={step.number}>
              <div
                className="relative rounded-3xl p-8"
                style={{
                  background: 'rgba(253,250,246,0.95)',
                  border: '1.5px solid rgba(160,120,80,0.3)',
                  boxShadow: '0 16px 48px rgba(100,60,20,0.10)',
                }}
              >
                <span
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full font-playfair italic text-sm font-bold"
                  style={{ background: luxoraColors.gold, color: '#1C1005', boxShadow: '0 6px 18px rgba(201,162,39,0.35)' }}
                >
                  {step.number}
                </span>
                <span className="block w-8 h-px my-4" style={{ background: 'rgba(201,162,39,0.45)' }} aria-hidden="true" />
                <h3 className="font-playfair text-[1.2rem] leading-[1.25] mb-2.5" style={{ color: luxoraColors.espresso }}>
                  {step.title}
                </h3>
                <p className="text-[13px] leading-relaxed font-light" style={{ color: luxoraColors.softBrown }}>
                  {step.description}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="flex items-center justify-center py-3" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={luxoraColors.gold} strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
