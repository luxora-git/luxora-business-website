'use client';

import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { useEstimatorFlow, type EstimatorScreen } from './useEstimatorFlow';

/**
 * Milestone map — named phases rather than raw screen counts, per the
 * approved PRD ("perceived progress matters more than literal progress").
 * 'proposal' and 'lead' share the final milestone; landing/resume/thankYou
 * render no progress at all.
 */
const MILESTONES: { label: string; screens: EstimatorScreen[] }[] = [
  { label: 'Project', screens: ['category'] },
  { label: 'Style', screens: ['style'] },
  { label: 'Details', screens: ['questions'] },
  { label: 'Estimate', screens: ['budget'] },
  { label: 'Package', screens: ['package'] },
  { label: 'Proposal', screens: ['proposal', 'lead'] },
];

/**
 * EstimatorProgressBar — compact milestone indicator that lives inside the
 * EstimatorHeader capsule during the guided flow: current milestone name,
 * "X of 6", and a slim gold fill track. Deliberately small — the header
 * capsule is a 58px wayfinding element, not a full-width stepper.
 */
export default function EstimatorProgressBar() {
  const { currentScreen } = useEstimatorFlow();

  const index = MILESTONES.findIndex((m) => m.screens.includes(currentScreen));
  if (index === -1) return null;

  const progress = ((index + 1) / MILESTONES.length) * 100;
  const milestone = MILESTONES[index];

  return (
    <div className="flex items-center gap-3" aria-label={`Step ${index + 1} of ${MILESTONES.length}: ${milestone.label}`}>
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] whitespace-nowrap" style={{ color: luxoraColors.espresso }}>
        {milestone.label}
      </span>
      <div
        className="relative h-[3px] w-24 sm:w-36 rounded-full overflow-hidden"
        style={{ background: 'rgba(160,120,80,0.22)' }}
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={MILESTONES.length}
        aria-valuenow={index + 1}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%`, background: luxoraColors.gold }}
        />
      </div>
      <span className="text-[11px] font-semibold whitespace-nowrap tabular-nums" style={{ color: luxoraColors.mutedBeige }}>
        {index + 1} of {MILESTONES.length}
      </span>
    </div>
  );
}
