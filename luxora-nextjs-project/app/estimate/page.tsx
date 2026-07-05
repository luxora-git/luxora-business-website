'use client';

import type { ComponentType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  EstimatorFlowProvider,
  useEstimatorFlow,
  EstimatorPageShell,
  type EstimatorScreen,
} from '@/components/v4/estimator';
import {
  LandingScreen,
  CategoryScreen,
  StyleScreen,
  QuestionsScreen,
  BudgetScreen,
  PackageScreen,
  ProposalScreen,
  LeadScreen,
  ThankYouScreen,
  ResumeScreen,
} from '@/components/v4/estimator/screens';

const SCREEN_COMPONENTS: Record<EstimatorScreen, ComponentType> = {
  landing: LandingScreen,
  category: CategoryScreen,
  style: StyleScreen,
  questions: QuestionsScreen,
  budget: BudgetScreen,
  package: PackageScreen,
  proposal: ProposalScreen,
  lead: LeadScreen,
  thankYou: ThankYouScreen,
  resume: ResumeScreen,
};

/**
 * Screen-to-screen transition: outgoing fades+lifts out, incoming
 * fades+rises in (mode="wait" so they never animate simultaneously),
 * using the sitewide expo-out curve. Scroll resets to top on every
 * screen change so a new step never starts mid-page.
 */
function EstimatorFlowRouter() {
  const { currentScreen } = useEstimatorFlow();
  const Screen = SCREEN_COMPONENTS[currentScreen];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onAnimationStart={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
      >
        <Screen />
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * /estimate — the guided estimator flow. Landing and Thank You carry full
 * site chrome; every step in between is distraction-free (see
 * EstimatorPageShell).
 *
 * TODO (later phase): Style, Questions, Budget, Package, Proposal, Lead,
 * Thank You, Resume are still placeholders; pricing, forms, PDF and
 * WhatsApp are deliberately out of scope until their phases.
 */
export default function EstimatePage() {
  return (
    <EstimatorFlowProvider>
      <EstimatorPageShell>
        <EstimatorFlowRouter />
      </EstimatorPageShell>
    </EstimatorFlowProvider>
  );
}
