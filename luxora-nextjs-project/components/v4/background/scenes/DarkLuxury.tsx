import LuxuryMesh from '../LuxuryMesh';
import LuxurySpotlight from '../LuxurySpotlight';
import LuxuryFrame from '../LuxuryFrame';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import LuxuryGrain from '../LuxuryGrain';
import { sceneMult, type SceneProps } from './types';

/**
 * DarkLuxury — the espresso feature moment: golden light entering from above
 * onto a dark amber/brown mesh, bounded by faint gold rules. Pure light on a
 * dark surface, no shapes. The dramatic register — everything around it should
 * be quieter. Ideal: genuinely dark full-bleed surfaces (the estimator's
 * time-estimate band, future dark features). Avoid: light surfaces (it assumes
 * espresso); at most two dark sections per page.
 */
export default function DarkLuxury({ id, intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  return (
    <>
      <LuxuryMesh tone="dark" opacity={0.1 * m} />
      <LuxurySpotlight from="top" color="rgba(201,162,39,0.5)" opacity={0.35 * m} />
      <LuxuryFrame variant="rules" inset={0} color={luxoraColors.gold} opacity={0.14 * m} />
      <LuxuryGrain id={`${id}-grain`} opacity={0.02} />
    </>
  );
}
