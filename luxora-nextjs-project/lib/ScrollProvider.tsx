'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollProviderProps {
  children: ReactNode;
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Check reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenis: any = null;
    let cleanupScrollTrigger: (() => void) | null = null;

    async function init() {
      try {
        const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);

        gsap.registerPlugin(ScrollTrigger);

        // ── Lenis smooth scroll ──
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
        });

        // ── Connect Lenis → ScrollTrigger ──
        lenis.on('scroll', ScrollTrigger.update);

        (gsap as any).ticker.add((time: number) => {
          lenis?.raf(time * 1000);
        });
        (gsap as any).ticker.lagSmoothing(0);

        cleanupScrollTrigger = () => {
          ScrollTrigger.getAll().forEach((st: any) => st.kill());
        };
      } catch (err) {
        console.warn('[Luxora Scroll] Failed to initialise smooth scroll:', err);
      }
    }

    init();

    return () => {
      cleanupScrollTrigger?.();
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
    };
  }, []);

  return <>{children}</>;
}