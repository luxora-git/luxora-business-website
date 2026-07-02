import { LuxuryHalo } from '../background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import ServiceCtaButton from '../service/ServiceCtaButton';
import { PAGE_HERO_PRIMARY_CTA, PAGE_HERO_SECONDARY_CTA } from './PageHero';

export interface GlobalClosingCTAProps {
  eyebrow?: string;
  title: string;
  titleItalic?: string;
  description: string;
  image: string;
  imageAlt: string;
}

/**
 * GlobalClosingCTA — the official Luxora V4 closing moment (approved from
 * the Full Home Interior Design service page). Every major page —
 * Homepage, Design Gallery, Portfolio, Services, Interior Elements,
 * Products, and any future page — ends with this exact component
 * immediately above the footer. Only the copy (eyebrow/title/description)
 * and background photograph change; layout, overlay, typography and the
 * two fixed CTAs never do.
 */
export default function GlobalClosingCTA({
  eyebrow = 'Start Your Journey',
  title,
  titleItalic,
  description,
  image,
  imageAlt,
}: GlobalClosingCTAProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[560px] md:h-[640px]">
        <img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(20,14,6,0.55) 0%, rgba(20,14,6,0.78) 60%, rgba(20,14,6,0.92) 100%)' }}
        />
        <LuxuryHalo position="center" size="xl" opacity={0.16} blur={130} />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 md:px-12">
          <span className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-5" style={{ color: '#E8C468' }}>
            {eyebrow}
          </span>
          <h2
            className="font-playfair font-normal leading-[1.1] tracking-[-0.02em] mb-6 max-w-3xl"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', color: '#FDFAF6' }}
          >
            <span className="block">{title}</span>
            {titleItalic && <span className="block font-playfair italic">{titleItalic}</span>}
          </h2>
          <p className="text-base md:text-lg leading-relaxed font-light mb-10 max-w-xl" style={{ color: 'rgba(253,250,246,0.78)' }}>
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ServiceCtaButton
              cta={PAGE_HERO_PRIMARY_CTA}
              className="inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-full font-bold text-[12.5px] tracking-[0.10em] uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(201,162,39,0.45)]"
              style={{ background: luxoraColors.gold, color: '#1C1005', boxShadow: '0 12px 36px rgba(201,162,39,0.34)' }}
            >
              {PAGE_HERO_PRIMARY_CTA.label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </ServiceCtaButton>
            <ServiceCtaButton
              cta={PAGE_HERO_SECONDARY_CTA}
              className="inline-flex items-center justify-center px-10 py-5 rounded-full font-semibold text-[12.5px] tracking-[0.10em] uppercase transition-all duration-300 hover:bg-white/10"
              style={{ color: '#FFFFFF', border: '1px solid rgba(201,162,39,0.45)' }}
            >
              {PAGE_HERO_SECONDARY_CTA.label}
            </ServiceCtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
