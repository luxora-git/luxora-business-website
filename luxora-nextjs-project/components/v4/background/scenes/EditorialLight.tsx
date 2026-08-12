import LuxurySpotlight from '../LuxurySpotlight';
import LuxuryFrame from '../LuxuryFrame';
import LuxuryStucco from '../LuxuryStucco';
import LuxuryGrain from '../LuxuryGrain';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { sceneMult, type SceneProps } from './types';

/**
 * EditorialLight — calm, airy, magazine-page light. Daylight enters from the
 * top-left across a limewash wall, bounded by hairline editorial rules. No
 * decorative shapes — the premium comes from restraint, material and light.
 * Ideal: clean content sections right after a hero, service overviews.
 * Avoid: sections that want overt warmth or drama.
 */
export default function EditorialLight({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  return (
    <>
      <LuxurySpotlight
        from="top-left"
        color={dark ? 'rgba(232,196,104,0.5)' : 'rgba(253,250,246,0.9)'}
        opacity={0.55 * m}
      />
      <LuxuryFrame variant="rules" inset={0} color={luxoraColors.gold} opacity={(dark ? 0.16 : 0.12) * m} />
      <LuxuryStucco id={`${id}-stucco`} opacity={dark ? 0.032 : 0.03} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
