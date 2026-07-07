'use client';

import V4SectionHeader from '@/components/v4/V4SectionHeader';
import { LuxuryGrain } from '@/components/v4/background';
import { useScrollReveal } from '@/lib/useScrollReveal';
import { estimatorLandingContent } from '@/lib/content/estimator/landing';
import { useEstimatorFlow } from '../useEstimatorFlow';
import {
  EstimatorHero,
  EstimatorTrustRow,
  EstimatorJourneyPreview,
  EstimatorTimeEstimate,
  EstimatorBenefitCards,
  EstimatorConversionCta,
} from '../landing';

/**
 * LandingScreen — Phase 2.1 polish pass.
 *
 * Deliberately does NOT use EstimatorLayout — that component is the boxed
 * single-card wrapper built for question/step screens (Phase 3+). Landing
 * is a full-bleed, multi-section marketing-style screen, composed the same
 * way every ServicePageShell-based page composes its own sections
 * directly, rather than being forced into a boxed card.
 *
 * "Why Use This Estimator" now renders through EstimatorBenefitCards
 * instead of the shared ServiceHighlights component — see that file's own
 * doc comment for why (ServiceHighlights stays untouched, per direction).
 *
 * TODO (later phase): wire the remaining screens (Category, Style,
 * Questions, Budget, Package, Proposal, Lead, Thank You, Resume) — all
 * still Phase 1 placeholders. "Start Your Estimate" already advances the
 * flow to the Category screen using the existing useEstimatorFlow hook, so
 * the end-to-end navigation is real even though Category itself is not
 * built yet.
 */
export default function LandingScreen() {
  const { goToScreen } = useEstimatorFlow();

  useScrollReveal({ selector: '[data-estimator-reveal]', threshold: 0.1, stagger: 0.08, duration: 0.65, y: 26 });
  useScrollReveal({ selector: '[data-estimator-reveal-heading]', threshold: 0.1, stagger: 0.05, duration: 0.55, y: 22 });

  return (
    <div className="relative">
      <EstimatorHero content={estimatorLandingContent} onStart={() => goToScreen('category')} />

      <EstimatorTrustRow items={estimatorLandingContent.trustItems} />

      <EstimatorJourneyPreview
        id={estimatorLandingContent.secondaryCta.targetId}
        eyebrow={estimatorLandingContent.journey.eyebrow}
        title={estimatorLandingContent.journey.title}
        titleItalic={estimatorLandingContent.journey.titleItalic}
        description={estimatorLandingContent.journey.description}
        steps={estimatorLandingContent.journey.steps}
      />

      <EstimatorConversionCta
        content={estimatorLandingContent.midConversionCta}
        onStart={() => goToScreen('category')}
      />

      <EstimatorTimeEstimate
        label={estimatorLandingContent.timeEstimateLabel}
        value={estimatorLandingContent.timeEstimateValue}
        privacyNote={estimatorLandingContent.privacyNote}
      />

      <section className="relative pt-16 md:pt-20 pb-2 overflow-hidden" style={{ backgroundColor: '#F5EDE0' }}>
        <LuxuryGrain id="estimator-why-use-grain" opacity={0.012} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16" data-estimator-reveal-heading>
          <V4SectionHeader
            eyebrow={estimatorLandingContent.whyUseThis.eyebrow}
            title={estimatorLandingContent.whyUseThis.title}
            titleItalic={estimatorLandingContent.whyUseThis.titleItalic}
            description={estimatorLandingContent.whyUseThis.description}
            centered
          />
        </div>
      </section>
      <EstimatorBenefitCards items={estimatorLandingContent.whyUseThis.items} />

      <EstimatorConversionCta
        content={estimatorLandingContent.closingConversionCta}
        onStart={() => goToScreen('category')}
      />
    </div>
  );
}
