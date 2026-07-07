'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import V4Navbar from '@/components/v4/V4Navbar';
import V4FooterSection from '@/components/v4/V4FooterSection';
import V4SmoothScroll from '@/components/v4/V4SmoothScroll';
import EstimatorHeader from './EstimatorHeader';
import { useEstimatorFlow, type EstimatorScreen } from './useEstimatorFlow';

export interface EstimatorPageShellProps {
  children: ReactNode;
}

const FULL_CHROME_SCREENS: EstimatorScreen[] = ['landing', 'proposal', 'thankYou'];

/**
 * EstimatorPageShell — screen-aware. Renders the exact, unmodified
 * V4Navbar + V4FooterSection (full site chrome) on Landing and Thank You,
 * so the estimator feels like a natural part of the website at its entry
 * and exit points. Every other screen in the guided flow keeps the
 * minimal EstimatorHeader and no footer, for a distraction-free
 * step-by-step experience.
 *
 * Phase 2.2: also mounts V4SmoothScroll on the full-chrome screens,
 * mirroring exactly how ServicePageShell does it for every other
 * full-chrome page on the site — Landing is a scrolling, editorial page
 * like those, not a task-focused step, so it earns the same scroll feel.
 *
 * Note: this component reads useEstimatorFlow(), so it re-renders on any
 * flow-state change, not just currentScreen (React Context doesn't
 * support selective subscription by default). Harmless at today's state
 * complexity — worth a selector-based optimization later if it ever
 * becomes a measurable hot path.
 */
export default function EstimatorPageShell({ children }: EstimatorPageShellProps) {
  const { currentScreen } = useEstimatorFlow();
  const showFullChrome = FULL_CHROME_SCREENS.includes(currentScreen);

  return (
    <motion.div
      style={{ minHeight: '100vh', backgroundColor: luxoraColors.warmCream }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {showFullChrome && <V4SmoothScroll />}
      {showFullChrome ? <V4Navbar /> : <EstimatorHeader />}
      {children}
      {showFullChrome && <V4FooterSection />}
    </motion.div>
  );
}
