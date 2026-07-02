import V4SectionHeader from '../V4SectionHeader';
import { LuxuryGrain } from '../background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { ServiceRelatedServicesData } from '@/lib/content/services/types';

export interface ServiceRelatedServicesProps {
  data: ServiceRelatedServicesData;
}

/**
 * ServiceRelatedServices — cross-navigation to other service pages, reusing
 * the unboxed editorial-index pattern (number / title / description /
 * arrow, divider-separated) established on the homepage's redesigned
 * Services section, so it never feels like a generic "related" card grid.
 */
export default function ServiceRelatedServices({ data }: ServiceRelatedServicesProps) {
  return (
    <section
      id="v4-service-related-services"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#F5EFE6' }}
    >
      <LuxuryGrain id="service-related-services-grain" opacity={0.012} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
        <div data-v4-reveal-heading>
          <V4SectionHeader
            eyebrow={data.eyebrow}
            title={data.title}
            titleItalic={data.titleItalic}
            description={data.description}
            centered
          />
        </div>

        <div className="border-t divide-y divide-[rgba(160,120,80,0.18)]" style={{ borderColor: 'rgba(160,120,80,0.18)' }} data-v4-reveal>
          {data.services.map((service) => (
            <a
              key={service.title}
              href={service.href}
              className="group flex items-center gap-5 md:gap-6 py-6 px-2 -mx-2 rounded-xl transition-all duration-300 hover:bg-[rgba(201,162,39,0.05)]"
            >
              <span
                className="font-playfair italic flex-shrink-0 w-9 text-lg transition-colors duration-300 group-hover:text-[#2C1F14]"
                style={{ color: 'rgba(201,162,39,0.65)' }}
              >
                {service.number}
              </span>

              <div className="min-w-0 flex-1">
                <h3
                  className="font-playfair text-[1.15rem] font-normal leading-snug mb-1 transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: luxoraColors.espresso }}
                >
                  {service.title}
                </h3>
                <p className="text-[13px] leading-snug font-light" style={{ color: luxoraColors.softBrown }}>
                  {service.description}
                </p>
              </div>

              <span
                className="flex-shrink-0 text-lg transition-transform duration-300 group-hover:translate-x-1.5"
                style={{ color: luxoraColors.gold }}
                aria-hidden="true"
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
