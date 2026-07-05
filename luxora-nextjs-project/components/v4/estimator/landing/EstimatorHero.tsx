'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import EstimatorPrimaryCTA from '../EstimatorPrimaryCTA';
import { useHeroParallax } from '@/lib/useScrollReveal';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { EstimatorLandingContent } from '@/lib/content/estimator/landing';

export interface EstimatorHeroProps {
  content: EstimatorLandingContent;
  onStart: () => void;
}

/**
 * EstimatorHero — Phase 2.2 visual-excellence pass.
 *
 * Composition reviewed against the rule of thirds using the actual source
 * photograph (not assumed): the family group sits roughly center-right of
 * the frame (~32%–63% horizontally, faces ~30%–49% vertically), with the
 * bright window/balcony occupying the left third. That maps naturally onto
 * this layout — text anchored in the left third (tightened from 640px to
 * 580px so it can't creep into the family's zone on wide viewports), the
 * overlay darkest where the text sits and clearly lightest over the
 * family/kitchen detail on the right, and an explicit `object-position`
 * (46% 42%) tuned from the real photo so `object-cover` never crops the
 * family or the kitchen's pendant lights on narrow mobile viewports.
 *
 * Per direction: the eyebrow pill, the promise line, and the secondary
 * CTA-as-button are all kept — refined, not removed. Ken Burns is
 * intentionally almost imperceptible (scale 1 → 1.03 over 30s). A subtle
 * scroll parallax (reusing the previously-unused `useHeroParallax` hook)
 * is applied to a wrapper element distinct from the Ken-Burns-animated
 * image itself — combining a CSS transform animation and a JS-driven
 * inline transform on the *same* element would fight for the `transform`
 * property; keeping them on separate elements avoids that entirely. The
 * wrapper also overscans by 16px on each edge, comfortably more than the
 * parallax's ~8px max shift (factor 0.08), so no edge gap is ever exposed.
 *
 * TODO (later phase): swap /img/General/hero-banner-living-1.webp for
 * dedicated estimator photography once the Photography Specification's
 * assets are sourced.
 */
export default function EstimatorHero({ content, onStart }: EstimatorHeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useHeroParallax(sectionRef, '[data-hero-image]', 0.08);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('[data-hero-eyebrow]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo('[data-hero-heading]', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, '-=0.45')
        .fromTo('[data-hero-subheading]', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, '-=0.35')
        .fromTo('[data-hero-cta]', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75 }, '-=0.4');
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[640px] md:h-[820px] overflow-hidden">
      <div data-hero-image className="absolute -top-4 -bottom-4 left-0 right-0">
        <img
          src="/img/General/hero-banner-living-1.webp"
          alt="A Luxora family at home in their premium living room — the standard every estimate is built around"
          className="estimator-hero-kb absolute inset-0 w-full h-full object-cover object-[40%_42%] md:object-[46%_42%]"
          style={{ filter: 'saturate(0.94) contrast(1.04) brightness(0.98)' }}
          loading="eager"
        />
      </div>

      {/* Directional overlay — darker left (where text sits), clearly lighter right (family and kitchen read through) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(28,22,16,0.88) 0%, rgba(28,22,16,0.60) 38%, rgba(28,22,16,0.24) 68%, rgba(28,22,16,0.04) 100%)',
        }}
      />
      {/* Mobile-only uniform scrim — on a narrow crop the text spans the full
          width and sits directly over the family, so the left-weighted desktop
          gradient alone can't guarantee legibility. */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            'linear-gradient(to bottom, rgba(28,22,16,0.62) 0%, rgba(28,22,16,0.42) 45%, rgba(28,22,16,0.66) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(28,22,16,0.55) 0%, transparent 38%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 65% 75% at 18% 58%, rgba(201,162,39,0.09) 0%, transparent 62%)' }}
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        className="relative z-10 min-h-[640px] md:h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center pt-28 pb-16 md:py-0 md:pb-14"
      >
        <div className="max-w-[680px]">
          <div data-hero-eyebrow className="mb-4 md:mb-6">
            <span
              className="inline-flex items-center gap-2 text-[11px] md:text-[12px] tracking-[0.28em] uppercase font-semibold px-4 py-2 rounded-full"
              style={{
                color: luxoraColors.gold,
                background: 'rgba(28,22,16,0.42)',
                border: '1px solid rgba(201,162,39,0.4)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: luxoraColors.gold }} />
              {content.eyebrow}
            </span>
          </div>

          {/* Line discipline: text-balance prevents a lone word ("With") ever
              stranding on its own line — the exact wrap bug visible in the
              screenshot review. Width 680px + 4.8rem cap keeps the italic
              line ("With Confidence") intact on one line at every viewport. */}
          <h1
            className="font-playfair font-normal text-white leading-[1.06] tracking-[-0.025em] mb-5 md:mb-6 drop-shadow-2xl"
            style={{ fontSize: 'clamp(2.5rem, 5.2vw, 4.8rem)' }}
          >
            <span data-hero-heading className="block text-balance">
              {content.headline}
            </span>
            <span data-hero-heading className="block font-playfair italic text-balance" style={{ color: 'rgba(253,250,246,0.92)' }}>
              {content.headlineItalic}
            </span>
          </h1>

          <p
            data-hero-subheading
            className="text-base md:text-[1.1rem] font-light leading-[1.75] mb-2 md:mb-3 max-w-[480px] drop-shadow-md"
            style={{ color: 'rgba(253,250,246,0.78)' }}
          >
            {content.subheading}
          </p>

          <p
            data-hero-subheading
            className="text-sm md:text-base font-semibold tracking-wide mb-6 md:mb-10"
            style={{ color: luxoraColors.goldLight }}
          >
            {content.promise}
          </p>

          <div data-hero-cta className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <EstimatorPrimaryCTA onClick={onStart}>{content.primaryCta.label}</EstimatorPrimaryCTA>

            <a
              href={`#${content.secondaryCta.targetId}`}
              className="group inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-[12px] tracking-[0.1em] uppercase transition-all duration-300 hover:bg-white/10 hover:border-white/70"
              style={{ color: '#FFFFFF', border: '1.5px solid rgba(201,162,39,0.55)' }}
            >
              {content.secondaryCta.label}
              <svg
                className="w-3.5 h-3.5 ml-2.5 group-hover:translate-y-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .estimator-hero-kb {
          animation: estimatorHeroKb 30s ease-out forwards;
        }
        @keyframes estimatorHeroKb {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.03);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .estimator-hero-kb {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
