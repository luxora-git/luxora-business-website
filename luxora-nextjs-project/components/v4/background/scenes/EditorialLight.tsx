import LuxurySpotlight from '../LuxurySpotlight';
import LuxuryFrame from '../LuxuryFrame';
import LuxuryGrain from '../LuxuryGrain';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { sceneMult, type SceneProps } from './types';

/**
 * EditorialLight — calm, airy, magazine-page light. Daylight falls from the
 * top-left; hairline rules quietly bound the section top and bottom; a
 * whisper of grain. The "resting" scene between statement moments.
 * Ideal: clean content sections right after a hero, service overviews.
 * Avoid: sections that need warmth or drama — this scene is deliberately cool.
 */
export default function EditorialLight({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  return (
    <>
      <LuxurySpotlight
        from="top-left"
        color={dark ? 'rgba(232,196,104,0.5)' : 'rgba(253,250,246,0.85)'}
        opacity={0.5 * m}
      />
      <LuxuryFrame variant="rules" inset={0} color={luxoraColors.gold} opacity={(dark ? 0.16 : 0.12) * m} />
      <LuxuryGrain id={`${id}-grain`} opacity={0.012} />
    </>
  );
}
