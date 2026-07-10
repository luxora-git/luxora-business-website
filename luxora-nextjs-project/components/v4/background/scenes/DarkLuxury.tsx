import LuxuryMesh from '../LuxuryMesh';
import LuxurySpotlight from '../LuxurySpotlight';
import LuxuryFrame from '../LuxuryFrame';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import LuxuryGrain from '../LuxuryGrain';
import { sceneMult, type SceneProps } from './types';

/**
 * DarkLuxury — the espresso feature moment: golden light entering from
 * above onto a dark mesh of amber and deep brown, bounded by faint gold
 * rules. The homepage's dramatic register — everything around it should be
 * quieter. Ideal: full-bleed dark sections (trust, walkthrough, smart
 * living, time-estimate moments). Avoid: light surfaces (it assumes an
 * espresso background) and more than ~two uses per page — drama repeated
 * stops being drama.
 */
export default function DarkLuxury({ id, surface = 'dark', intensity = 'standard' }: SceneProps) {
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
