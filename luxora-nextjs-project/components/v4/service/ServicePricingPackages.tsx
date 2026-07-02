import V4SectionHeader from '../V4SectionHeader';
import { LuxuryHalo, LuxuryGrain } from '../background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { ServicePricingData } from '@/lib/content/services/types';
import ServiceCtaButton from './ServiceCtaButton';

export interface ServicePricingPackagesProps {
  data: ServicePricingData;
}

/**
 * ServicePricingPackages — three quiet, editorial pricing cards (Essential
 * / Signature / Bespoke). Deliberately not a SaaS comparison table: no
 * "Most Popular" ribbons, no clashing colours — the highlighted tier reads
 * through a gold hairline border and a slightly raised shadow only.
 */
export default function ServicePricingPackages({ data }: ServicePricingPackagesProps) {
  return (
    <section
      id="v4-service-pricing"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#F5EFE6' }}
    >
      <LuxuryHalo position="top-left" size="md" opacity={0.05} blur={100} />
      <LuxuryGrain id="service-pricing-grain" opacity={0.012} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div data-v4-reveal-heading>
          <V4SectionHeader
            eyebrow={data.eyebrow}
            title={data.title}
            titleItalic={data.titleItalic}
            description={data.description}
            centered
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" data-v4-reveal>
          {data.tiers.map((tier) => (
            <div
              key={tier.name}
              className="relative flex flex-col rounded-3xl p-8 md:p-9 border transition-all duration-500 hover:-translate-y-1.5"
              style={{
                background: tier.highlighted ? '#FDFAF6' : 'rgba(253,250,246,0.6)',
                borderColor: tier.highlighted ? 'rgba(201,162,39,0.45)' : 'rgba(160,120,80,0.18)',
                boxShadow: tier.highlighted ? '0 28px 70px rgba(100,60,20,0.16)' : '0 6px 24px rgba(100,60,20,0.06)',
              }}
            >
              {tier.highlighted && (
                <span
                  className="absolute -top-3 left-8 px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.14em] uppercase"
                  style={{ background: luxoraColors.gold, color: '#1C1005' }}
                >
                  Signature Choice
                </span>
              )}

              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#9C7B68' }}>
                {tier.tagline}
              </span>
              <h3 className="font-playfair text-[1.7rem] leading-tight mb-3" style={{ color: luxoraColors.espresso }}>
                {tier.name}
              </h3>
              <div className="font-playfair italic text-xl mb-4" style={{ color: luxoraColors.gold }}>
                {tier.priceRange}
              </div>
              <p className="text-[13.5px] leading-relaxed font-light mb-6" style={{ color: '#6B4C3B' }}>
                {tier.description}
              </p>

              <div className="w-10 h-px mb-6" style={{ background: 'rgba(201,162,39,0.3)' }} />

              <ul className="space-y-3.5 mb-9 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature.label} className="flex items-start gap-2.5">
                    <span className="mt-1 flex-shrink-0" style={{ color: feature.included ? luxoraColors.gold : '#C2A98F' }} aria-hidden="true">
                      {feature.included ? '✓' : '—'}
                    </span>
                    <span
                      className="text-[13.5px] leading-relaxed font-light"
                      style={{ color: feature.included ? luxoraColors.espresso : '#B3A290' }}
                    >
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>

              <ServiceCtaButton
                cta={{ label: tier.ctaLabel, href: tier.ctaHref }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-[11px] tracking-[0.10em] uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={
                  tier.highlighted
                    ? { background: luxoraColors.gold, color: '#1C1005', boxShadow: '0 8px 28px rgba(201,162,39,0.28)' }
                    : { background: 'transparent', color: luxoraColors.espresso, border: '1.5px solid rgba(44,31,20,0.18)' }
                }
              >
                {tier.ctaLabel}
              </ServiceCtaButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
