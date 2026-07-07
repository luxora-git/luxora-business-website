'use client';

import { useEffect, type ComponentType } from 'react';
import { motion } from 'framer-motion';
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
 * Screen-to-screen transition — ENTER-ONLY by design. The keyed motion.div
 * remounts instantly on screen change and fades/rises in; there is
 * deliberately no AnimatePresence exit animation. Exit-gated transitions
 * (mode="wait") depend on the exit animation actually completing, and
 * Chrome throttles requestAnimationFrame in background tabs — a visitor
 * who clicks Continue and switches tabs mid-transition would return to a
 * flow frozen between screens (heading from the new step, content from
 * the old, progress bar ahead of both — observed live in QA). Enter-only
 * transitions can never strand the flow: the new screen exists the moment
 * state changes, animated or not.
 */
function EstimatorFlowRouter() {
  const { currentScreen } = useEstimatorFlow();
  const Screen = SCREEN_COMPONENTS[currentScreen];

  // Every step starts at the top of the page, never mid-scroll.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentScreen]);

  return (
    <motion.div
      key={currentScreen}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Screen />
    </motion.div>
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
