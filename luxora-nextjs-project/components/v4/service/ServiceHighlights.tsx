import { LuxuryGrain } from '../background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { ServiceHighlightItem } from '@/lib/content/services/types';

export interface ServiceHighlightsProps {
  items: ServiceHighlightItem[];
}

/**
 * ServiceHighlights — quick-scan trust strip. Reuses the exact stat-tile
 * styling from V4PremiumTrustSection's benefit cards, without the
 * accompanying heading/video (that deeper trust story belongs to the
 * Why Luxora comparison section that follows).
 */
export default function ServiceHighlights({ items }: ServiceHighlightsProps) {
  return (
    <section
      id="v4-service-highlights"
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor: '#F5EDE0' }}
    >
      <LuxuryGrain id="service-highlights-grain" opacity={0.012} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          data-v4-reveal
        >
          {items.map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(100,60,20,0.10)]"
              style={{
                background: 'rgba(253,250,246,0.82)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(180,140,95,0.22)',
                boxShadow: '0 4px 18px rgba(100,60,20,0.05)',
              }}
            >
              <div className="font-playfair italic text-2xl mb-1" style={{ color: luxoraColors.gold }}>
                {item.value}
              </div>
              <h3 className="font-playfair font-semibold leading-tight mb-2 text-[1rem]" style={{ color: luxoraColors.espresso }}>
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
