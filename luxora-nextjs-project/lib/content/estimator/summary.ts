import { estimatorCategories } from './categories';
import { estimatorStyles } from './styles';
import { estimatorPackages } from './packages';
import { estimatorQuestions, FULL_HOME_ROOMS } from './questions';
import type { EstimatorCategorySlug } from './types';

/**
 * Shared "your brief" summary builder — one slug→label mapping used by
 * both the reveal screen's on-page summary and the CRM note in
 * app/api/estimator-lead/route.ts, so the visitor and the sales team
 * always read the identical brief.
 */

export interface EstimateSummaryItem {
  label: string;
  value: string;
}

export function buildEstimateSummaryItems(
  category: EstimatorCategorySlug,
  styles: string[],
  answers: Record<string, unknown>,
  packageTier: string,
): EstimateSummaryItem[] {
  const items: EstimateSummaryItem[] = [];

  const categoryLabel = estimatorCategories.find((c) => c.slug === category)?.label ?? category;
  items.push({ label: 'Project', value: categoryLabel });

  if (styles.length > 0) {
    const styleLabels = styles.map((slug) => estimatorStyles.find((s) => s.slug === slug)?.label ?? slug);
    items.push({ label: 'Preferred Styles', value: styleLabels.join(', ') });
  }

  for (const question of estimatorQuestions[category]) {
    const answer = answers[question.key];
    if (answer === undefined || answer === null) continue;

    if (question.type === 'room-counter' && typeof answer === 'object') {
      const rooms = Object.entries(answer as Record<string, number>)
        .filter(([, count]) => count > 0)
        .map(([key, count]) => `${FULL_HOME_ROOMS.find((r) => r.key === key)?.label ?? key} × ${count}`);
      if (rooms.length > 0) items.push({ label: 'Rooms', value: rooms.join(', ') });
    } else {
      const optionLabel = question.options?.find((o) => o.value === answer)?.label ?? String(answer);
      const questionLabel = question.questionItalic
        ? `${question.question} ${question.questionItalic}`.replace(/\?$/, '')
        : question.question;
      items.push({ label: questionLabel, value: optionLabel });
    }
  }

  const tierName = estimatorPackages.find((p) => p.slug === packageTier)?.name ?? packageTier;
  items.push({ label: 'Package', value: tierName });

  return items;
}
