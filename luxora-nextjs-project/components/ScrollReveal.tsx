'use client';

import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  /** ClassName forwarded to the wrapping div */
  className?: string;
  /** Custom stagger delay (default: uses hook default 0.08) */
  stagger?: number;
  /** Unique group name — elements sharing the same `group` will animate together */
  group?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
}

/**
 * ScrollReveal – a thin wrapper that adds `data-reveal` attributes
 * consumed by the `useScrollReveal` hook.
 *
 * Usage:
 *   <ScrollReveal className="grid grid-cols-2">
 *     <div data-reveal>...</div>
 *     <div data-reveal>...</div>
 *   </ScrollReveal>
 *
 * Or as a single element reveal:
 *   <ScrollReveal><h2 data-reveal>Title</h2></ScrollReveal>
 */
export default function ScrollReveal({
  children,
  className = '',
}: ScrollRevealProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}