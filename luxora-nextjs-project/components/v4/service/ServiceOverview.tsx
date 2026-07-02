import V4SectionHeader from '../V4SectionHeader';
import { LuxuryHalo, LuxuryGrain } from '../background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { ServiceOverviewData } from '@/lib/content/services/types';

export interface ServiceOverviewProps {
  data: ServiceOverviewData;
}

/**
 * ServiceOverview — editorial "what this service is" section. Also carries
 * the Hero → Overview transition (soft dark-to-cream fade + gold seam),
 * the same handoff language used between V4HeroSection and
 * V4ServicesSection on the homepage.
 */
export default function ServiceOverview({ data }: ServiceOverviewProps) {
  return (
    <section
      id="v4-service-overview"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, rgba(28,22,16,0.16) 0%, rgba(28,22,16,0.04) 7%, transparent 16%), #F5EFE6',
      }}
    >
      {/* Soft gold seam — eases the eye from the dark Hero into this section */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.45), transparent)' }}
      />
      <LuxuryHalo position="top-left" size="lg" opacity={0.06} blur={100} />
      <LuxuryGrain id="service-overview-grain" opacity={0.012} />

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

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center" data-v4-reveal>
          <div
            className="relative rounded-3xl overflow-hidden h-[360px] md:h-[460px] border border-[rgba(201,162,39,0.16)] shadow-[0_20px_60px_rgba(100,60,20,0.14)]"
          >
            <img src={data.image} alt={data.imageAlt} className="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div>
            <ul className="space-y-4 mb-8">
              {data.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 mt-1 flex-shrink-0"
                    fill="none"
                    stroke={luxoraColors.gold}
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[15px] leading-relaxed font-light" style={{ color: luxoraColors.softBrown }}>
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            <div className="inline-flex flex-col border-l-2 pl-5" style={{ borderColor: 'rgba(201,162,39,0.35)' }}>
              <span className="font-playfair italic text-3xl leading-none" style={{ color: luxoraColors.espresso }}>
                {data.statValue}
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase mt-2" style={{ color: '#B07D3A' }}>
                {data.statLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
