'use client';

import { useEffect, useMemo, useRef } from 'react';
import EstimatorStepShell from '../EstimatorStepShell';
import EstimatorPackageCard from '../EstimatorPackageCard';
import { useEstimatorFlow } from '../useEstimatorFlow';
import { estimatorPackages, getRecommendedTier } from '@/lib/content/estimator/packages';
import { getPackageImage } from '@/lib/content/estimator/imagery';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

/**
 * PackageScreen — package selection (UI Spec Screen 7), price-free by
 * business rule. Three editorial tier cards matching the service pages'
 * published taxonomy; one carries a rule-based "Recommended for you"
 * ribbon derived from the visitor's style picks (config mapping, PRD §9).
 * Explicit Continue (this is the biggest decision of the flow — no
 * auto-advance) leading to the lead form, after which the estimate is
 * revealed.
 *
 * TODO (later phase): optional collapsed "compare all details" table and
 * per-tier FAQ accordion per PRD §9.
 */
export default function PackageScreen() {
  const { category, styles, packageTier, setPackageTier, goToScreen } = useEstimatorFlow();
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!category) goToScreen('category');
  }, [category, goToScreen]);

  const recommendedTier = useMemo(() => getRecommendedTier(styles), [styles]);

  // Context-aware imagery: each tier card shows the chosen room type only.
  const displayPackages = useMemo(
    () =>
      estimatorPackages.map((tier) => {
        const image = getPackageImage(category, tier.slug, { src: tier.image, alt: tier.imageAlt });
        return { ...tier, image: image.src, imageAlt: image.alt };
      }),
    [category],
  );

  if (!category) return null;

  const handleGroupKeyDown = (e: React.KeyboardEvent) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) return;
    e.preventDefault();
    const radios = Array.from(groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]') ?? []);
    if (radios.length === 0) return;
    const currentIndex = radios.findIndex((r) => r === document.activeElement);
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    radios[(currentIndex + delta + radios.length) % radios.length].focus();
  };

  return (
    <EstimatorStepShell
      eyebrow="Step 5 — Your Package"
      question="Choose how"
      questionItalic="Luxora builds it"
      subtitle="Each package is a complete, warrantied Luxora home — they differ in materials, detailing, and how far the customization goes."
      onBack={() => goToScreen('budget')}
      backLabel="Back to estimate"
      onContinue={() => goToScreen('lead')}
      continueLabel="Unlock My Estimate"
      canContinue={packageTier !== null}
    >
      <div
        ref={groupRef}
        role="radiogroup"
        aria-label="Package tier"
        onKeyDown={handleGroupKeyDown}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 max-w-6xl mx-auto items-stretch"
      >
        {displayPackages.map((tier) => (
          <EstimatorPackageCard
            key={tier.slug}
            tier={tier}
            selected={packageTier === tier.slug}
            recommended={recommendedTier === tier.slug}
            onSelect={setPackageTier}
          />
        ))}
      </div>

      <p className="mt-8 text-center text-[12px] font-light max-w-lg mx-auto" style={{ color: luxoraColors.mutedBeige }}>
        Not sure? Most Luxora clients choose Signature — and your designer will walk you through the differences on your free consultation.
      </p>
    </EstimatorStepShell>
  );
}
