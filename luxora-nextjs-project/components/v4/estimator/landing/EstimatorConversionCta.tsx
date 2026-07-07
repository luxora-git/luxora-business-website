import { LuxuryHalo } from '@/components/v4/background';
import EstimatorPrimaryCTA from '../EstimatorPrimaryCTA';
import type { EstimatorConversionCtaContent } from '@/lib/content/estimator/landing';

export interface EstimatorConversionCtaProps {
  content: EstimatorConversionCtaContent;
  onStart: () => void;
}

/**
 * EstimatorConversionCta — a full-bleed image conversion checkpoint built on
 * the exact same recipe as GlobalClosingCTA (the shared closing section
 * every other V4 page ends with above its footer): background photograph,
 * dark gradient scrim, centered LuxuryHalo glow, eyebrow/title/description.
 * The one deliberate difference is the button — EstimatorPrimaryCTA calling
 * back into the in-flow `goToScreen` state instead of ServiceCtaButton's
 * href navigation, since this stays inside the estimator flow rather than
 * linking to it.
 */
export default function EstimatorConversionCta({ content, onStart }: EstimatorConversionCtaProps) {
  return (
    <section className="relative overflow-hidden" data-estimator-reveal>
      <div className="relative h-[480px] md:h-[560px]">
        <img src={content.image} alt={content.imageAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(20,14,6,0.55) 0%, rgba(20,14,6,0.78) 60%, rgba(20,14,6,0.92) 100%)' }}
        />
        <LuxuryHalo position="center" size="lg" opacity={0.16} blur={130} />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 md:px-12">
          {content.eyebrow && (
            <span className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-5" style={{ color: '#E8C468' }}>
              {content.eyebrow}
            </span>
          )}

          <h2
            className="font-playfair font-normal leading-[1.1] tracking-[-0.02em] mb-6 max-w-2xl"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: '#FDFAF6' }}
          >
            <span className="block">{content.title}</span>
            {content.titleItalic && <span className="block font-playfair italic">{content.titleItalic}</span>}
          </h2>

          <p className="text-base leading-relaxed font-light mb-9 max-w-lg" style={{ color: 'rgba(253,250,246,0.78)' }}>
            {content.description}
          </p>

          <EstimatorPrimaryCTA onClick={onStart} className="w-full sm:w-auto justify-center">
            {content.ctaLabel}
          </EstimatorPrimaryCTA>
        </div>
      </div>
    </section>
  );
}
