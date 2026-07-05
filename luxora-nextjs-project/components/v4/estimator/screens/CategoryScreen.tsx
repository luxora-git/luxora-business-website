'use client';

import { useEffect, useRef, useState } from 'react';
import EstimatorStepShell from '../EstimatorStepShell';
import EstimatorCategoryCard from '../EstimatorCategoryCard';
import { useEstimatorFlow, type EstimatorCategory } from '../useEstimatorFlow';
import { estimatorCategories } from '@/lib/content/estimator/categories';

/** Settle delay before auto-advancing — long enough to see the selected
 * state land, short enough to feel responsive. Skipped entirely under
 * prefers-reduced-motion. */
const ADVANCE_DELAY_MS = 450;

/**
 * CategoryScreen — "What are you designing?" Three photographic cards,
 * tap-to-select auto-advances to the Style screen (per the approved UI
 * Spec: this single decision needs no separate Continue button). Cards
 * form a proper radiogroup with arrow-key navigation between them.
 */
export default function CategoryScreen() {
  const { category, setCategory, goToScreen } = useEstimatorFlow();
  const [pendingAdvance, setPendingAdvance] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleSelect = (slug: EstimatorCategory) => {
    if (pendingAdvance) return;
    setCategory(slug);
    setPendingAdvance(true);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timerRef.current = setTimeout(() => goToScreen('style'), prefersReduced ? 0 : ADVANCE_DELAY_MS);
  };

  /** Roving arrow-key navigation within the radiogroup. */
  const handleGroupKeyDown = (e: React.KeyboardEvent) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) return;
    e.preventDefault();
    const radios = Array.from(groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]') ?? []);
    if (radios.length === 0) return;
    const currentIndex = radios.findIndex((r) => r === document.activeElement);
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    const nextIndex = (currentIndex + delta + radios.length) % radios.length;
    radios[nextIndex].focus();
  };

  return (
    <EstimatorStepShell
      eyebrow="Step 1 — Your Project"
      question="What are you"
      questionItalic="designing today?"
      subtitle="Choose one to begin. You can always come back and change it."
      onBack={() => goToScreen('landing')}
      backLabel="Back to overview"
    >
      <div
        ref={groupRef}
        role="radiogroup"
        aria-label="Project type"
        onKeyDown={handleGroupKeyDown}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        data-estimator-reveal
      >
        {estimatorCategories.map((option) => (
          <EstimatorCategoryCard
            key={option.slug}
            option={option}
            selected={category === option.slug}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </EstimatorStepShell>
  );
}
