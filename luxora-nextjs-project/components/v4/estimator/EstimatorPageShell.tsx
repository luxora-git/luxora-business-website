'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import EstimatorHeader from './EstimatorHeader';

export interface EstimatorPageShellProps {
  children: ReactNode;
}

/**
 * EstimatorPageShell — the reduced-chrome page wrapper for the guided
 * estimator flow. Mirrors ServicePageShell's page-mount fade-in exactly
 * (components/v4/service/ServicePageShell.tsx), but swaps the full
 * marketing Navbar/Footer for the minimal EstimatorHeader and no footer,
 * per the approved UI & Interaction Specification's content-to-chrome rule
 * for task-focused flows. No Lenis smooth scroll either — this is a short,
 * step-by-step flow, not a long scrolling page.
 *
 * TODO (later phase): mount full V4FooterSection (and possibly V4Navbar)
 * on the Proposal and Thank You screens only, per the approved spec.
 */
export default function EstimatorPageShell({ children }: EstimatorPageShellProps) {
  return (
    <motion.div
      style={{ minHeight: '100vh', backgroundColor: luxoraColors.warmCream }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <EstimatorHeader />
      {children}
    </motion.div>
  );
}
