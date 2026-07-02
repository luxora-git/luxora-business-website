import V4SectionHeader from '../V4SectionHeader';
import { LuxuryGrain, LuxuryDivider } from '../background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { ServiceComparisonData } from '@/lib/content/services/types';

export interface ServiceComparisonTableProps {
  data: ServiceComparisonData;
}

/**
 * ServiceComparisonTable — the "Why Luxora" section. An editorial
 * two-column comparison rather than a SaaS feature-grid: no competitor is
 * named, no red/green icon badges — just a quiet, confident table with the
 * Luxora column picked out by a gold hairline border.
 */
export default function ServiceComparisonTable({ data }: ServiceComparisonTableProps) {
  return (
    <section
      id="v4-service-why-luxora"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#FDFAF6' }}
    >
      <LuxuryGrain id="service-comparison-grain" opacity={0.012} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        <div data-v4-reveal-heading>
          <V4SectionHeader eyebrow={data.eyebrow} title={data.title} description={data.description} centered />
        </div>

        <div
          className="rounded-3xl overflow-hidden border"
          style={{ borderColor: 'rgba(160,120,80,0.16)' }}
          data-v4-reveal
        >
          {/* Column headers */}
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr]">
            <div className="hidden md:block" />
            <div
              className="px-6 py-4 text-center font-playfair italic text-lg"
              style={{ background: 'rgba(201,162,39,0.08)', color: luxoraColors.espresso, borderLeft: `2px solid ${luxoraColors.gold}` }}
            >
              {data.luxoraColumnLabel}
            </div>
            <div className="hidden md:block px-6 py-4 text-center text-[13px] font-semibold tracking-[0.08em] uppercase" style={{ color: '#9C7B68' }}>
              {data.typicalColumnLabel}
            </div>
          </div>

          {data.rows.map((row) => (
            <div key={row.label}>
              <LuxuryDivider variant="line" />
              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr] px-6 md:px-8 py-6 gap-3 md:gap-0">
                <div className="font-playfair text-[15px] font-semibold" style={{ color: luxoraColors.espresso }}>
                  {row.label}
                </div>

                <div className="flex items-start gap-2.5 md:px-4" style={{ borderLeft: `2px solid ${luxoraColors.gold}` }}>
                  <svg className="w-3.5 h-3.5 mt-1 flex-shrink-0" fill="none" stroke={luxoraColors.gold} strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[14px] leading-relaxed font-light" style={{ color: luxoraColors.espresso }}>
                    {row.luxora}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="mt-1 flex-shrink-0" style={{ color: '#C2A98F' }} aria-hidden="true">
                    —
                  </span>
                  <span className="text-[14px] leading-relaxed font-light" style={{ color: '#9C7B68' }}>
                    {row.typical}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
