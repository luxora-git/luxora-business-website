'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { LuxuryGrain } from '@/components/v4/background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export interface EstimatorTimeEstimateProps {
  label: string;
  value: string;
  privacyNote: string;
}

/**
 * EstimatorTimeEstimate — now the one deliberate dark, high-contrast
 * "moment" on the Landing page. Every other section sits on warm cream —
 * flipping this one to espresso-deep with a bigger, bolder gold ring gives
 * the page a genuine focal point instead of six sections that all read at
 * the same visual weight. The ring itself is unchanged in concept from the
 * prior pass (two complete concentric rings, fade+scale reveal, no
 * "drawing" arc that would read as a loading indicator) — just larger and
 * more confident.
 */
export default function EstimatorTimeEstimate({ label, value, privacyNote }: EstimatorTimeEstimateProps) {
  const ringRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ring = ringRef.current;
    const section = sectionRef.current;
    if (!ring || !section) return;

    if (prefersReduced) {
      gsap.set(ring, { opacity: 1, scale: 1 });
      return;
    }

    gsap.set(ring, { opacity: 0, scale: 0.9 });

    let cancelled = false;
    let trigger: { kill: () => void } | null = null;

    async function init() {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(ring, { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' });
        },
      });
    }

    init();

    return () => {
      cancelled = true;
      trigger?.kill();
    };
  }, []);

  return (
    <section className="relative py-16 md:py-20 overflow-hidden" style={{ backgroundColor: luxoraColors.espressoDeep }}>
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 65% at 50% 42%, rgba(201,162,39,0.16) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      <LuxuryGrain id="estimator-time-grain" opacity={0.02} />

      <div ref={sectionRef} className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center text-center" data-estimator-reveal>
        <div className="flex items-center gap-5 mb-10 w-full max-w-md" aria-hidden="false">
          <span className="h-px flex-1" style={{ background: 'rgba(201,162,39,0.3)' }} aria-hidden="true" />
          <p className="text-[12px] font-bold uppercase tracking-[0.3em] whitespace-nowrap" style={{ color: 'rgba(253,250,246,0.82)' }}>
            Simple · Private · No Pressure
          </p>
          <span className="h-px flex-1" style={{ background: 'rgba(201,162,39,0.3)' }} aria-hidden="true" />
        </div>

        <div ref={ringRef} className="relative w-[208px] h-[208px] mb-9">
          <svg width="208" height="208" viewBox="0 0 208 208" aria-hidden="true">
            <circle cx="104" cy="104" r="98" fill="none" stroke="rgba(201,162,39,0.28)" strokeWidth="1" />
            <circle cx="104" cy="104" r="82" fill="none" stroke={luxoraColors.gold} strokeWidth="2.5" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase mb-2" style={{ color: 'rgba(253,250,246,0.6)' }}>
              {label}
            </span>
            <span className="font-playfair italic" style={{ fontSize: '2.1rem', color: luxoraColors.goldLight, lineHeight: 1 }}>
              {value}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="rgba(253,250,246,0.55)" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V7a4 4 0 018 0v4" />
          </svg>
          <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(253,250,246,0.55)' }}>
            {privacyNote}
          </p>
        </div>
      </div>
    </section>
  );
}
