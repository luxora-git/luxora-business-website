import LuxuryMesh from '../LuxuryMesh';
import LuxurySpotlight from '../LuxurySpotlight';
import LuxuryRidges from '../LuxuryRidges';
import LuxuryFrame from '../LuxuryFrame';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import LuxuryGrain from '../LuxuryGrain';
import { sceneMult, type SceneProps } from './types';

/**
 * DarkLuxury (v2 — painted environment) — the espresso feature moment:
 * golden light entering from above onto a dark mesh of amber and deep
 * brown, faint golden rings breaking in from the right edge, bounded by
 * gold rules. The dramatic register — everything around it should be
 * quieter. Ideal: genuinely dark full-bleed surfaces (the estimator's
 * time-estimate band, future dark features). Avoid: light surfaces (it
 * assumes espresso), and remember the page-wide rule — at most two dark
 * sections per page.
 */
export default function DarkLuxury({ id, surface = 'dark', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  return (
    <>
      <LuxuryMesh tone="dark" opacity={0.1 * m} />
      <LuxurySpotlight from="top" color="rgba(201,162,39,0.5)" opacity={0.35 * m} />
      <LuxuryRidges variant="rings" position="top-right" color={luxoraColors.goldLight} opacity={0.08 * m} />
      <LuxuryFrame variant="rules" inset={0} color={luxoraColors.gold} opacity={0.14 * m} />
      <LuxuryGrain id={`${id}-grain`} opacity={0.02} />
    </>
  );
}
