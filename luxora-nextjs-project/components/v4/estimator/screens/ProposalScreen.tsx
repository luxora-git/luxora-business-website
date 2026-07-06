'use client';

import { useEffect, useMemo } from 'react';
import EstimatorBudgetCard from '../EstimatorBudgetCard';
import { useEstimatorFlow } from '../useEstimatorFlow';
import { useScrollReveal } from '@/lib/useScrollReveal';
import { LuxuryGrain, LuxuryHalo } from '@/components/v4/background';
import GalleryButton from '@/components/v4/gallery/common/GalleryButton';
import { calculateEstimateRange, formatEstimateINR, type EstimatorPackageTier } from '@/lib/content/estimator/pricing';
import { buildEstimateSummaryItems } from '@/lib/content/estimator/summary';
import { estimatorCategories } from '@/lib/content/estimator/categories';
import { luxoraContact } from '@/lib/content/global/contact';
import { luxoraStats } from '@/lib/content/global/stats';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { EstimatorCategorySlug } from '@/lib/content/estimator/types';

const PROJECT_PHASES = [
  { number: '01', title: 'Design & 3D', duration: '1–2 Weeks' },
  { number: '02', title: 'Materials & Approval', duration: '1 Week' },
  { number: '03', title: 'Execution', duration: '4–5 Weeks' },
  { number: '04', title: 'Handover', duration: `Day ${luxoraStats.avgDeliveryDays}` },
];

const NEXT_STEPS = [
  'A senior Luxora designer reviews your brief today.',
  'You receive a call within 24 hours — no obligation, no pressure.',
  'Your free consultation refines this estimate into an exact quote.',
];

/**
 * ProposalScreen — THE reveal (post-lead-submission only, per the gating
 * rule). Full site chrome restores here: the journey is complete and the
 * visitor returns to being a website guest. Personalized greeting, the
 * EstimatorBudgetCard's count-up debut, the shared "your brief" summary
 * (identical to what the sales team received), a four-phase project
 * timeline, explicit next steps, and a pre-filled WhatsApp handoff.
 */
export default function ProposalScreen() {
  const { category, styles, answers, packageTier, lead, goToScreen } = useEstimatorFlow();

  useScrollReveal({ selector: '[data-estimator-reveal]', threshold: 0.1, stagger: 0.08, duration: 0.65, y: 26 });

  // Guard: the reveal is only reachable after a submitted lead.
  useEffect(() => {
    if (!category || !packageTier) {
      goToScreen('category');
    } else if (!lead.fullName) {
      goToScreen('lead');
    }
  }, [category, packageTier, lead.fullName, goToScreen]);

  const range = useMemo(
    () =>
      category && packageTier
        ? calculateEstimateRange(category as EstimatorCategorySlug, answers, packageTier as EstimatorPackageTier)
        : null,
    [category, answers, packageTier],
  );

  const summaryItems = useMemo(
    () =>
      category && packageTier
        ? buildEstimateSummaryItems(category as EstimatorCategorySlug, styles, answers, packageTier)
        : [],
    [category, styles, answers, packageTier],
  );

  if (!category || !packageTier || !lead.fullName || !range) return null;

  const firstName = String(lead.fullName).trim().split(/\s+/)[0];
  const categoryLabel = estimatorCategories.find((c) => c.slug === category)?.label ?? category;

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm ${lead.fullName}. I just completed my ${categoryLabel} estimate on luxora.in — ${formatEstimateINR(range.min)} to ${formatEstimateINR(range.max)}. I'd like to discuss it.`,
  );
  const whatsappHref = `${luxoraContact.whatsapp.href}?text=${whatsappMessage}`;

  return (
    <div className="relative">
      {/* ── The reveal ─────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden" style={{ backgroundColor: luxoraColors.warmCream }}>
        <LuxuryHalo position="top-right" size="md" opacity={0.05} blur={100} />
        <LuxuryGrain id="estimator-reveal-grain" opacity={0.012} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-10 md:mb-12">
            <span className="block text-[11px] font-semibold tracking-[0.28em] uppercase mb-4" style={{ color: luxoraColors.gold }}>
              Your Estimate Is Ready
            </span>
            <h1
              className="font-playfair font-normal leading-[1.12] tracking-[-0.02em] text-balance"
              style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', color: luxoraColors.espresso }}
            >
              Here it is, {firstName} —
              <span className="block font-playfair italic">your investment range</span>
            </h1>
          </div>

          <EstimatorBudgetCard
            range={range}
            qualifier="Your exact quote is refined during a free, no-obligation site visit — this range typically holds within ±10%."
          />
        </div>
      </section>

      {/* ── Your brief ─────────────────────────────────────── */}
      <section className="relative py-14 md:py-16 overflow-hidden" style={{ backgroundColor: '#FDFAF6' }}>
        <LuxuryGrain id="estimator-brief-grain" opacity={0.012} />
        <div className="relative z-10 max-w-2xl mx-auto px-6" data-estimator-reveal>
          <h2 className="font-playfair text-center text-[1.5rem] mb-7" style={{ color: luxoraColors.espresso }}>
            Your <span className="italic">brief</span>
          </h2>
          <dl
            className="rounded-3xl px-7 py-2 md:px-9"
            style={{ background: 'rgba(253,250,246,0.95)', border: '1.5px solid rgba(160,120,80,0.3)', boxShadow: '0 16px 48px rgba(100,60,20,0.08)' }}
          >
            {summaryItems.map((item) => (
              <div
                key={item.label}
                className="flex items-start justify-between gap-6 py-4 last:border-none"
                style={{ borderBottom: '1px solid rgba(160,120,80,0.16)' }}
              >
                <dt className="text-[12px] font-bold uppercase tracking-[0.1em] pt-0.5 whitespace-nowrap" style={{ color: luxoraColors.mutedBeige }}>
                  {item.label}
                </dt>
                <dd className="text-[14px] font-light text-right" style={{ color: luxoraColors.espresso }}>
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-center text-[12px] font-light" style={{ color: luxoraColors.mutedBeige }}>
            This exact brief is already with your designer.
          </p>
        </div>
      </section>

      {/* ── Project timeline ───────────────────────────────── */}
      <section className="relative py-14 md:py-16 overflow-hidden" style={{ backgroundColor: luxoraColors.warmCream }}>
        <LuxuryGrain id="estimator-timeline-grain" opacity={0.012} />
        <div className="relative z-10 max-w-4xl mx-auto px-6" data-estimator-reveal>
          <h2 className="font-playfair text-center text-[1.5rem] mb-9" style={{ color: luxoraColors.espresso }}>
            From here to <span className="italic">handover</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 relative">
            <div
              className="hidden md:block absolute h-px pointer-events-none"
              style={{ top: '22px', left: '12%', right: '12%', background: 'rgba(201,162,39,0.28)' }}
              aria-hidden="true"
            />
            {PROJECT_PHASES.map((phase) => (
              <div key={phase.number} className="relative flex flex-col items-center text-center">
                <span
                  className="relative z-10 flex items-center justify-center w-11 h-11 rounded-full mb-3.5 font-playfair italic text-sm font-bold"
                  style={{ background: luxoraColors.gold, color: '#1C1005', boxShadow: '0 6px 18px rgba(201,162,39,0.35)' }}
                >
                  {phase.number}
                </span>
                <span className="font-playfair text-[1rem] leading-snug mb-1" style={{ color: luxoraColors.espresso }}>
                  {phase.title}
                </span>
                <span className="text-[10.5px] font-semibold tracking-[0.14em] uppercase" style={{ color: '#B07D3A' }}>
                  {phase.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What happens next + CTAs ───────────────────────── */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ backgroundColor: luxoraColors.espressoDeep }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 65% at 50% 35%, rgba(201,162,39,0.14) 0%, transparent 65%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center" data-estimator-reveal>
          <h2 className="font-playfair text-[1.5rem] mb-8" style={{ color: '#FDFAF6' }}>
            What happens <span className="italic">next</span>
          </h2>

          <ol className="space-y-4 mb-10 text-left max-w-md mx-auto">
            {NEXT_STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-3.5">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0 font-playfair italic text-xs font-bold"
                  style={{ border: '1.5px solid rgba(201,162,39,0.5)', color: luxoraColors.gold }}
                >
                  {i + 1}
                </span>
                <span className="text-[14px] font-light leading-relaxed pt-0.5" style={{ color: 'rgba(253,250,246,0.8)' }}>
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GalleryButton variant="primary" size="lg" href={whatsappHref} external>
              Chat On WhatsApp
            </GalleryButton>
            <a
              href="/gallery"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-[12px] tracking-[0.09em] uppercase transition-all duration-300 hover:bg-white/10"
              style={{ color: '#FFFFFF', border: '1.5px solid rgba(201,162,39,0.5)' }}
            >
              Explore Our Designs
            </a>
          </div>

          <p className="mt-8 text-[11.5px] font-light" style={{ color: 'rgba(253,250,246,0.5)' }}>
            * Indicative estimate based on your selections. Final pricing follows a free site visit.
          </p>
        </div>
      </section>
    </div>
  );
}
