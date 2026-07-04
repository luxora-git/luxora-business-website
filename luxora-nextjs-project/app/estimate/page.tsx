'use client';

import type { ComponentType } from 'react';
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

function EstimatorFlowRouter() {
  const { currentScreen } = useEstimatorFlow();
  const Screen = SCREEN_COMPONENTS[currentScreen];
  return <Screen />;
}

/**
 * /estimate — Phase 1 foundation entry point. Renders whichever screen is
 * current in useEstimatorFlow state (defaults to 'landing'). Not yet linked
 * from any nav/CTA — that integration is an explicit later-phase decision
 * (see Implementation Plan §8, Risk 1: luxoraPriceCalculatorUrl cutover).
 *
 * TODO (later phase): real navigation between screens, pricing, forms,
 * proposal, PDF, WhatsApp — all deliberately out of scope in Phase 1.
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
