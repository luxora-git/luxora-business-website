'use client';

import { useEffect } from 'react';
import EstimatorStepShell from '../EstimatorStepShell';
import { useEstimatorFlow } from '../useEstimatorFlow';
import { luxoraStats } from '@/lib/content/global/stats';
import { ESTIMATE_BREAKDOWN } from '@/lib/content/estimator/pricing';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

/**
 * BudgetScreen — the estimate SUSPENSE moment, not the reveal. Business
 * rule (deliberate, do not "fix"): the personalized figure stays hidden
 * until the lead form is submitted — the price is the incentive that
 * earns the contact info. This screen builds anticipation: a locked,
 * blurred placeholder figure (static text, deliberately NOT the computed
 * value — nothing real ever enters the DOM here, so inspect-element
 * reveals nothing), the inclusions the estimate covers, and a grounding
 * stat. The real count-up reveal (EstimatorBudgetCard + pricing.ts)
 * happens on the post-submission screen.
 */
export default function BudgetScreen() {
  const { category, goToScreen } = useEstimatorFlow();

  useEffect(() => {
    if (!category) goToScreen('category');
  }, [category, goToScreen]);

  if (!category) return null;

  return (
    <EstimatorStepShell
      eyebrow="Step 4 — Your Estimate"
      question="Your estimate"
      questionItalic="is taking shape"
      subtitle="A few finishing touches — choose your package and tell us where to send it, and we'll unlock your personalized investment range."
      onBack={() => goToScreen('questions')}
      backLabel="Back to details"
      onContinue={() => goToScreen('package')}
      continueLabel="Choose My Package"
    >
      <div
        className="relative max-w-2xl mx-auto rounded-3xl overflow-hidden text-center px-7 py-10 md:px-12 md:py-12"
        style={{ background: luxoraColors.espressoDeep, boxShadow: '0 30px 80px rgba(44,31,20,0.24)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 30%, rgba(201,162,39,0.16) 0%, transparent 65%)' }}
          aria-hidden="true"
        />

        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] mb-6" style={{ color: 'rgba(253,250,246,0.6)' }}>
            Your Estimated Investment
          </p>

          {/* Locked figure — static placeholder characters under a blur;
              the real number is never rendered on this screen. */}
          <div className="relative inline-block mb-5" aria-label="Your estimate is prepared and will be revealed at the final step">
            <p
              className="font-playfair select-none"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                color: luxoraColors.goldLight,
                lineHeight: 1.1,
                filter: 'blur(14px)',
                opacity: 0.85,
              }}
              aria-hidden="true"
            >
              ₹88.8L – ₹88.8L
            </p>
            <span
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: luxoraColors.gold, boxShadow: '0 8px 28px rgba(201,162,39,0.5)' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="#1C1005" strokeWidth={2.2} viewBox="0 0 24 24">
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V7a4 4 0 018 0v4" />
                </svg>
              </span>
            </span>
          </div>

          <p className="text-[13.5px] font-light leading-relaxed max-w-md mx-auto mb-7" style={{ color: 'rgba(253,250,246,0.7)' }}>
            Your personalized range is calculated and waiting — it unlocks the moment you complete the final step.
          </p>

          {/* What the estimate covers — labels only, no figures */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 mb-7">
            {ESTIMATE_BREAKDOWN.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-2">
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke={luxoraColors.gold} strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[11.5px] font-medium tracking-[0.04em]" style={{ color: 'rgba(253,250,246,0.72)' }}>
                  {item.label}
                </span>
              </span>
            ))}
          </div>

          <p className="text-[11.5px] font-medium tracking-[0.06em]" style={{ color: 'rgba(201,162,39,0.75)' }}>
            Estimated using data from {luxoraStats.homesDelivered} completed Luxora homes
          </p>
        </div>
      </div>

      <p className="mt-8 text-center text-[12px] font-light max-w-md mx-auto" style={{ color: luxoraColors.mutedBeige }}>
        * Indicative estimate. Your exact quote follows a free, no-obligation site visit.
      </p>
    </EstimatorStepShell>
  );
}
