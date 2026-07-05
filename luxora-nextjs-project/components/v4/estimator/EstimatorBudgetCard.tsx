'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { luxoraStats } from '@/lib/content/global/stats';
import { formatEstimateINR, ESTIMATE_BREAKDOWN, type EstimateRange } from '@/lib/content/estimator/pricing';

export interface EstimatorBudgetCardProps {
  range: EstimateRange;
  /** One-line qualifier under the figure. */
  qualifier: string;
}

/**
 * EstimatorBudgetCard — the "Your Estimated Investment" reveal.
 *
 * GATED: business rule — the personalized figure is only ever shown AFTER
 * the lead form is submitted (the price is the incentive that earns the
 * contact info). This component must only render on post-submission
 * screens (estimate reveal / proposal), never on any pre-lead step. The
 * pre-lead Budget step uses its own blurred static placeholder instead.
 *
 * The range counts up with a GSAP tween (tabular numerals via DOM writes,
 * no per-frame React re-renders), grounded by a real completed-projects
 * stat and an optional plain-language "what's included" breakdown (fixed
 * proportional split, per PRD §8). Instant value under reduced motion.
 * The final figures live in an aria-label so screen readers hear one
 * settled announcement, never the counting frames.
 */
export default function EstimatorBudgetCard({ range, qualifier }: EstimatorBudgetCardProps) {
  const minRef = useRef<HTMLSpanElement>(null);
  const maxRef = useRef<HTMLSpanElement>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const finalLabel = `${formatEstimateINR(range.min)} to ${formatEstimateINR(range.max)}`;

  useEffect(() => {
    const minEl = minRef.current;
    const maxEl = maxRef.current;
    if (!minEl || !maxEl) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      minEl.textContent = formatEstimateINR(range.min);
      maxEl.textContent = formatEstimateINR(range.max);
      return;
    }

    const counter = { min: 0, max: 0 };
    const tween = gsap.to(counter, {
      min: range.min,
      max: range.max,
      duration: 0.9,
      ease: 'power2.out',
      onUpdate: () => {
        minEl.textContent = formatEstimateINR(counter.min);
        maxEl.textContent = formatEstimateINR(counter.max);
      },
    });

    return () => {
      tween.kill();
    };
  }, [range.min, range.max]);

  const midpoint = (range.min + range.max) / 2;

  return (
    <div
      className="relative max-w-2xl mx-auto rounded-3xl overflow-hidden text-center px-7 py-10 md:px-12 md:py-12"
      style={{
        background: luxoraColors.espressoDeep,
        boxShadow: '0 30px 80px rgba(44,31,20,0.24)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 30%, rgba(201,162,39,0.16) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] mb-5" style={{ color: 'rgba(253,250,246,0.6)' }}>
          Your Estimated Investment
        </p>

        <p
          className="font-playfair mb-4"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: luxoraColors.goldLight, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}
          aria-label={finalLabel}
        >
          <span ref={minRef} aria-hidden="true">
            {formatEstimateINR(range.min)}
          </span>
          <span aria-hidden="true" style={{ color: 'rgba(253,250,246,0.45)' }}>
            {' '}
            –{' '}
          </span>
          <span ref={maxRef} aria-hidden="true">
            {formatEstimateINR(range.max)}
          </span>
        </p>

        <p className="text-[13px] font-light leading-relaxed max-w-md mx-auto mb-6" style={{ color: 'rgba(253,250,246,0.65)' }}>
          {qualifier}
        </p>

        <p className="text-[11.5px] font-medium tracking-[0.06em] mb-7" style={{ color: 'rgba(201,162,39,0.75)' }}>
          Estimated using data from {luxoraStats.homesDelivered} completed Luxora homes
        </p>

        {/* What's included — plain-language allocation */}
        <button
          type="button"
          onClick={() => setShowBreakdown((v) => !v)}
          aria-expanded={showBreakdown}
          className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 hover:text-white"
          style={{ color: 'rgba(253,250,246,0.7)' }}
        >
          {showBreakdown ? 'Hide' : 'See'} what&rsquo;s included
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${showBreakdown ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{ maxHeight: showBreakdown ? '220px' : '0px', opacity: showBreakdown ? 1 : 0 }}
        >
          <dl className="mt-6 space-y-3 max-w-sm mx-auto text-left">
            {ESTIMATE_BREAKDOWN.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 pb-3" style={{ borderBottom: '1px solid rgba(201,162,39,0.18)' }}>
                <dt className="text-[12.5px] font-light" style={{ color: 'rgba(253,250,246,0.75)' }}>
                  {item.label}
                </dt>
                <dd className="text-[12.5px] font-semibold tabular-nums" style={{ color: luxoraColors.goldLight }}>
                  ~{formatEstimateINR(midpoint * item.share)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
