'use client';

import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  /** CSS selector for elements to reveal (default: '[data-reveal]') */
  selector?: string;
  /** How far from the element's top should the trigger fire (0–1) */
  threshold?: number;
  /** Stagger delay between each matched element (seconds) */
  stagger?: number;
  /** Duration of each animation (seconds) */
  duration?: number;
  /** Initial y-offset (px) */
  y?: number;
  /** Cleanup callback */
  onCleanup?: () => void;
}

/**
 * useScrollReveal – GSAP ScrollTrigger based reveal hook.
 * Targets `selector` elements and animates them from a hidden → visible state.
 * Automatically respects prefers-reduced-motion.
 */
export function useScrollReveal({
  selector = '[data-reveal]',
  threshold = 0.1,
  stagger = 0.08,
  duration = 0.65,
  y = 28,
}: ScrollRevealOptions = {}) {
  const ctx = useRef<{ revert: () => void } | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let cancelled = false;

    async function init() {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;

      gsap.registerPlugin(ScrollTrigger);

      if (cancelled) return;

      const els = document.querySelectorAll(selector);
      if (!els.length) return;

      // Set initial hidden state
      gsap.set(els, {
        opacity: 0,
        y,
        willChange: 'opacity, transform',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: els[0].parentElement || els[0],
          start: `top+=${Math.round(threshold * 100)}% bottom`,
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(els, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      ctx.current = { revert: () => tl.kill() };
    }

    init();

    return () => {
      cancelled = true;
      ctx.current?.revert();
    };
  }, [selector, threshold, stagger, duration, y]);
}

/**
 * useHeroParallax – subtle parallax translation on the hero background.
 * Applies a Y-offset proportional to scroll progress.
 * Respects prefers-reduced-motion.
 */
export function useHeroParallax(
  containerRef: React.RefObject<HTMLElement | null>,
  imageSelector = '[data-hero-image]',
  factor = 0.15
) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    let cancelled = false;
    let kill: (() => void) | null = null;

    async function init() {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;

      gsap.registerPlugin(ScrollTrigger);

      if (cancelled || !containerRef.current) return;

      const images = containerRef.current.querySelectorAll(imageSelector);
      if (!images.length) return;

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const offset = self.progress * factor * 100 * (factor > 0 ? 1 : -1);
          images.forEach((img) => {
            (img as HTMLElement).style.transform = `translateY(${offset}px)`;
          });
        },
      });

      kill = () => st.kill();
    }

    init();

    return () => {
      cancelled = true;
      kill?.();
    };
  }, [containerRef, imageSelector, factor]);
}