'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import gsap from 'gsap';
import GalleryButton from '@/components/v4/gallery/common/GalleryButton';

export interface EstimatorPrimaryCTAProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

function ArrowIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

/**
 * EstimatorPrimaryCTA — the one dominant call-to-action for the estimator
 * flow, wrapping GalleryButton rather than duplicating it. Kept as its own
 * component so this single file is the future home for loading states,
 * shimmer effects, progress indicators, and other conversion-focused
 * micro-interactions as the flow grows — without ever touching
 * GalleryButton itself or affecting any other CTA on the site.
 *
 * Phase 2.1: slightly larger footprint via non-conflicting `!important`
 * override classes layered on top of GalleryButton's "lg" size (confirmed
 * safe — this project runs Tailwind 3.4.19, which supports the `!` prefix
 * modifier), a default trailing-arrow icon matching every other primary
 * CTA sitewide (the one thing missing since Phase 2), and a slightly more
 * restrained hover value per "do not make it flashy."
 *
 * TODO (later phase): isLoading / shimmer / success states once the flow
 * has real async actions (lead submission, price recalculation, etc.).
 */
export default function EstimatorPrimaryCTA({ children, onClick, href, className = '' }: EstimatorPrimaryCTAProps) {
  const reducedMotionRef = useRef(false);

  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotionRef.current) return;
    gsap.to(e.currentTarget, {
      scale: 1.03,
      boxShadow: '0 14px 40px rgba(201,162,39,0.44)',
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (reducedMotionRef.current) return;
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: '0 8px 28px rgba(201,162,39,0.28)',
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const combinedClassName = `group !px-12 !py-[22px] !text-[13.5px] !tracking-[0.1em] ${className}`.trim();

  if (href) {
    return (
      <GalleryButton
        variant="primary"
        size="lg"
        href={href}
        className={combinedClassName}
        icon={<ArrowIcon />}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </GalleryButton>
    );
  }

  return (
    <GalleryButton
      variant="primary"
      size="lg"
      onClick={onClick}
      className={combinedClassName}
      icon={<ArrowIcon />}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </GalleryButton>
  );
}
