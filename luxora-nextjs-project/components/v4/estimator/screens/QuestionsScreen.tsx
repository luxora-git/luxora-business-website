'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EstimatorStepShell from '../EstimatorStepShell';
import EstimatorOptionCard from '../EstimatorOptionCard';
import EstimatorRoomCounter from '../EstimatorRoomCounter';
import { useEstimatorFlow } from '../useEstimatorFlow';
import { estimatorQuestions, getRoomDefaultsFromBhk, type EstimatorQuestion } from '@/lib/content/estimator/questions';

/**
 * QuestionsScreen — the category-specific personalisation step (UI Spec
 * Screen 4). One generic renderer driven entirely by the question config
 * in lib/content/estimator/questions.ts: Full Home gets BHK → carpet area
 * → room counters; Kitchen gets shape → size → finish; Wardrobe gets type
 * → finish. One question per view, explicit Continue (disabled until
 * answered), crossfade between sub-questions.
 */
export default function QuestionsScreen() {
  const { category, answers, setAnswer, goToScreen } = useEstimatorFlow();
  const [subStep, setSubStep] = useState(0);

  // Guard: this screen requires a chosen category (e.g. direct state edge cases).
  useEffect(() => {
    if (!category) goToScreen('category');
  }, [category, goToScreen]);

  if (!category) return null;

  const questions = estimatorQuestions[category];
  const current: EstimatorQuestion = questions[Math.min(subStep, questions.length - 1)];
  const isLast = subStep === questions.length - 1;

  // Room-counter values: derive defaults from the BHK answer on first visit.
  const roomCounts: Record<string, number> =
    current.type === 'room-counter'
      ? ((answers[current.key] as Record<string, number> | undefined) ?? getRoomDefaultsFromBhk(answers.bhkType))
      : {};

  const answered =
    current.type === 'room-counter'
      ? true // min constraints on living/kitchen guarantee a valid selection
      : typeof answers[current.key] === 'string' && (answers[current.key] as string).length > 0;

  const handleContinue = () => {
    if (current.type === 'room-counter' && answers[current.key] === undefined) {
      // Persist the derived defaults if the visitor accepted them untouched.
      setAnswer(current.key, roomCounts);
    }
    if (isLast) {
      goToScreen('budget');
    } else {
      setSubStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (subStep === 0) {
      goToScreen('style');
    } else {
      setSubStep((s) => s - 1);
    }
  };

  const handleRoomChange = (key: string, next: number) => {
    const config = current.rooms?.find((r) => r.key === key);
    if (!config) return;
    const clamped = Math.max(config.min, Math.min(config.max, next));
    setAnswer(current.key, { ...roomCounts, [key]: clamped });
  };

  return (
    <EstimatorStepShell
      eyebrow={`Step 3 — Your Details · ${subStep + 1} of ${questions.length}`}
      question={current.question}
      questionItalic={current.questionItalic}
      subtitle={current.subtitle}
      onBack={handleBack}
      backLabel={subStep === 0 ? 'Back to style' : 'Previous question'}
      onContinue={handleContinue}
      continueLabel={isLast ? 'See My Estimate' : 'Continue'}
      canContinue={answered}
    >
      {/* Enter-only sub-question transition — same background-tab-freeze
          hardening as the outer flow router (see app/estimate/page.tsx):
          the keyed remount always shows the new question immediately. */}
      <motion.div
        key={`${category}-${current.key}`}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
          {current.type === 'option-select' && (
            <div role="radiogroup" aria-label={`${current.question} ${current.questionItalic ?? ''}`.trim()} className="flex flex-col gap-3.5 max-w-2xl mx-auto">
              {current.options?.map((option) => (
                <EstimatorOptionCard
                  key={option.value}
                  option={option}
                  selected={answers[current.key] === option.value}
                  onSelect={(value) => setAnswer(current.key, value)}
                />
              ))}
            </div>
          )}

          {current.type === 'room-counter' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {current.rooms?.map((room) => (
                <EstimatorRoomCounter
                  key={room.key}
                  room={room}
                  count={roomCounts[room.key] ?? room.min}
                  onChange={handleRoomChange}
                />
              ))}
            </div>
          )}
      </motion.div>
    </EstimatorStepShell>
  );
}
