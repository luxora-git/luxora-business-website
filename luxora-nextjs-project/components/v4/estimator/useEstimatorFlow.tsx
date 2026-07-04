'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

/**
 * Estimator flow state — Phase 1 scaffold only.
 *
 * This defines the *shape* of the guided-estimator state and navigation
 * only. No pricing, no validation, no lead submission, no business logic —
 * those land in later phases per the approved Implementation Plan and
 * Component Reuse Matrix. The Context/Provider/hook pattern is modeled
 * directly on components/v4/modal/ConsultationModalContext.tsx.
 */

export type EstimatorScreen =
  | 'landing'
  | 'category'
  | 'style'
  | 'questions'
  | 'budget'
  | 'package'
  | 'proposal'
  | 'lead'
  | 'thankYou'
  | 'resume';

/** Linear order of the guided flow. 'resume' is an alternate entry point, not part of the sequence. */
export const ESTIMATOR_SCREEN_ORDER: EstimatorScreen[] = [
  'landing',
  'category',
  'style',
  'questions',
  'budget',
  'package',
  'proposal',
  'lead',
  'thankYou',
];

/** TODO (later phase): replace with the real category slugs sourced from lib/content/estimator. */
export type EstimatorCategory = 'full-home' | 'kitchen' | 'wardrobe' | null;

export interface EstimatorState {
  currentScreen: EstimatorScreen;
  category: EstimatorCategory;
  /** TODO (later phase): typed per-question answers (BHK, carpet area, rooms, finish, etc.). */
  answers: Record<string, unknown>;
  /** TODO (later phase): real package tier slug once package content exists. */
  packageTier: string | null;
  /** TODO (later phase): typed lead-capture fields once the Lead screen is built. */
  lead: Record<string, unknown>;
}

interface EstimatorFlowContextValue extends EstimatorState {
  goToScreen: (screen: EstimatorScreen) => void;
  reset: () => void;
}

const initialState: EstimatorState = {
  currentScreen: 'landing',
  category: null,
  answers: {},
  packageTier: null,
  lead: {},
};

const EstimatorFlowContext = createContext<EstimatorFlowContextValue | null>(null);

/**
 * EstimatorFlowProvider — mounted once per estimator session. Currently
 * scoped to app/estimate/page.tsx (not the root layout), so flow state only
 * exists while the estimator is mounted.
 */
export function EstimatorFlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EstimatorState>(initialState);

  const goToScreen = useCallback((screen: EstimatorScreen) => {
    setState((prev) => ({ ...prev, currentScreen: screen }));
  }, []);

  const reset = useCallback(() => setState(initialState), []);

  const value = useMemo<EstimatorFlowContextValue>(
    () => ({ ...state, goToScreen, reset }),
    [state, goToScreen, reset],
  );

  return <EstimatorFlowContext.Provider value={value}>{children}</EstimatorFlowContext.Provider>;
}

export function useEstimatorFlow(): EstimatorFlowContextValue {
  const ctx = useContext(EstimatorFlowContext);
  if (!ctx) {
    throw new Error('useEstimatorFlow must be used within an EstimatorFlowProvider');
  }
  return ctx;
}
