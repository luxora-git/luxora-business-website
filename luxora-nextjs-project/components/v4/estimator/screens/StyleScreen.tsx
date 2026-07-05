'use client';

import EstimatorStepShell from '../EstimatorStepShell';
import EstimatorStyleTile from '../EstimatorStyleTile';
import { useEstimatorFlow } from '../useEstimatorFlow';
import { estimatorStyles, MAX_STYLE_SELECTIONS } from '@/lib/content/estimator/styles';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

/**
 * StyleScreen — "Visual Inspiration" (UI Spec Screen 3). A moodboard of
 * real Luxora style photography, multi-select up to two, and explicitly
 * skippable: Continue is always enabled and relabels itself "Skip for
 * now" when nothing is selected, so taste-uncertain visitors are never
 * blocked (a deliberate CRO decision from the PRD — this step builds
 * desire and captures a signal; it must never become a wall).
 *
 * Desktop/tablet: 3/2-column grid. Mobile: horizontal snap scroller with
 * a peeking next tile (same pattern ServiceProcessTimeline already uses),
 * so the moodboard feels swipeable rather than a long vertical wall.
 */
export default function StyleScreen() {
  const { styles, toggleStyle, goToScreen } = useEstimatorFlow();

  const selectionFull = styles.length >= MAX_STYLE_SELECTIONS;
  const handleToggle = (slug: string) => toggleStyle(slug, MAX_STYLE_SELECTIONS);

  return (
    <EstimatorStepShell
      eyebrow="Step 2 — Your Style"
      question="Which of these feels"
      questionItalic="like your home?"
      subtitle={`Pick up to ${MAX_STYLE_SELECTIONS} — or skip if you're not sure yet. Your designer will help you refine this.`}
      onBack={() => goToScreen('category')}
      onContinue={() => goToScreen('questions')}
      continueLabel={styles.length > 0 ? 'Continue' : 'Skip for now'}
    >
      <div role="group" aria-label="Interior styles — select up to two">
        {/* Desktop / tablet grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
          {estimatorStyles.map((option) => (
            <EstimatorStyleTile
              key={option.slug}
              option={option}
              selected={styles.includes(option.slug)}
              selectionFull={selectionFull}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {/* Mobile — horizontal snap scroller with peeking next tile */}
        <div className="sm:hidden -mx-6 px-6 overflow-x-auto pb-2" style={{ scrollSnapType: 'x mandatory' }}>
          <div className="flex gap-4 w-max">
            {estimatorStyles.map((option) => (
              <div key={option.slug} className="w-[78vw] max-w-[320px] flex-shrink-0" style={{ scrollSnapAlign: 'center' }}>
                <EstimatorStyleTile
                  option={option}
                  selected={styles.includes(option.slug)}
                  selectionFull={selectionFull}
                  onToggle={handleToggle}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Selection status — polite live region so the count is announced */}
        <p
          aria-live="polite"
          className="mt-7 text-center text-[12.5px] font-medium tracking-[0.04em]"
          style={{ color: styles.length > 0 ? luxoraColors.gold : luxoraColors.mutedBeige }}
        >
          {styles.length === 0
            ? 'No style selected — that’s completely fine.'
            : `${styles.length} of ${MAX_STYLE_SELECTIONS} selected — you can change these anytime.`}
        </p>
      </div>
    </EstimatorStepShell>
  );
}
