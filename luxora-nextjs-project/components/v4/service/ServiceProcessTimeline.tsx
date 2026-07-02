import V4SectionHeader from '../V4SectionHeader';
import { LuxuryHalo, LuxuryGrain, LuxuryDivider } from '../background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { ServiceProcessData } from '@/lib/content/services/types';

export interface ServiceProcessTimelineProps {
  data: ServiceProcessData;
}

/**
 * ServiceProcessTimeline — the "how it works" section shared by every
 * service page. A premium editorial horizontal sequence (not a vertical
 * timeline, not numbered cards, not a zig-zag): six steps connected by a
 * single thin gold rule, with numbers carrying the visual identity instead
 * of icons or illustration. Collapses to a horizontal scroller on mobile.
 * Fully data-driven via `ServiceProcessData` so it is reusable as-is across
 * every future service page.
 */
export default function ServiceProcessTimeline({ data }: ServiceProcessTimelineProps) {
  return (
    <section
      id="v4-service-process"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#FDFAF6' }}
    >
      <LuxuryHalo position="top-right" size="lg" opacity={0.05} blur={100} />
      <LuxuryGrain id="service-process-grain" opacity={0.012} />

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

        {/* ── Desktop — six steps on a single connected rule ───────── */}
        <div className="hidden lg:block relative" data-v4-reveal>
          <div
            className="absolute h-px pointer-events-none"
            style={{ top: '22px', left: '8.33%', right: '8.33%', background: 'rgba(201,162,39,0.22)' }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-6 gap-4">
            {data.steps.map((step) => (
              <div
                key={step.number}
                className="group relative flex flex-col items-center text-center px-2 transition-all duration-500 hover:-translate-y-1"
              >
                <div
                  className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center mb-5 transition-colors duration-300 group-hover:border-[#C9A227]"
                  style={{ background: '#FDFAF6', border: '1.5px solid rgba(201,162,39,0.35)' }}
                >
                  <span className="font-playfair italic text-sm font-semibold" style={{ color: luxoraColors.gold }}>
                    {step.number}
                  </span>
                </div>

                <h3
                  className="font-playfair text-[1.05rem] font-normal leading-snug mb-2"
                  style={{ color: luxoraColors.espresso }}
                >
                  {step.title}
                </h3>
                <p className="text-[13px] leading-relaxed font-light mb-3" style={{ color: luxoraColors.softBrown }}>
                  {step.description}
                </p>
                <span className="text-[10px] font-semibold tracking-[0.14em] uppercase" style={{ color: '#B07D3A' }}>
                  {step.duration}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile / tablet — horizontal scroll ───────────────────── */}
        <div
          className="lg:hidden -mx-6 px-6 overflow-x-auto pb-2"
          data-v4-reveal
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex gap-8 w-max">
            {data.steps.map((step) => (
              <div
                key={step.number}
                className="flex-shrink-0 w-[220px] text-center px-1"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-5 mx-auto"
                  style={{ background: '#FDFAF6', border: '1.5px solid rgba(201,162,39,0.35)' }}
                >
                  <span className="font-playfair italic text-sm font-semibold" style={{ color: luxoraColors.gold }}>
                    {step.number}
                  </span>
                </div>
                <h3
                  className="font-playfair text-[1.05rem] font-normal leading-snug mb-2"
                  style={{ color: luxoraColors.espresso }}
                >
                  {step.title}
                </h3>
                <p className="text-[13px] leading-relaxed font-light mb-3" style={{ color: luxoraColors.softBrown }}>
                  {step.description}
                </p>
                <span className="text-[10px] font-semibold tracking-[0.14em] uppercase" style={{ color: '#B07D3A' }}>
                  {step.duration}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="my-14 md:my-16">
          <LuxuryDivider variant="editorial" />
        </div>

        {/* ── Summary strip — editorial fact sheet, not KPI cards ───── */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-7" data-v4-reveal>
          {data.summary.map((item) => (
            <div key={item.label} className="text-center">
              <div
                className="text-[10px] font-semibold tracking-[0.16em] uppercase mb-2"
                style={{ color: '#9C7B68' }}
              >
                {item.label}
              </div>
              <div className="font-playfair italic text-lg" style={{ color: luxoraColors.espresso }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
