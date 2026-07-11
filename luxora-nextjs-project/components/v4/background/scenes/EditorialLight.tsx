import LuxurySpotlight from '../LuxurySpotlight';
import LuxuryFrame from '../LuxuryFrame';
import LuxuryBotanical from '../LuxuryBotanical';
import LuxuryStucco from '../LuxuryStucco';
import LuxuryGrain from '../LuxuryGrain';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { sceneMult, type SceneProps } from './types';

/**
 * EditorialLight (v2 — painted environment) — calm, airy, magazine-page
 * light: daylight falling from the top-left across a limewash wall,
 * hairline rules bounding the section, a frond quietly embossed into the
 * plaster in the lower-right. The "resting" scene between statement
 * moments. Ideal: clean content sections right after a hero, service
 * overviews. Avoid: sections that need warmth or drama.
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
      <LuxuryFrame variant="rules" inset={0} color={luxoraColors.gold} opacity={(dark ? 0.16 : 0.14) * m} />
      {!dark && <LuxuryBotanical mode="relief" size={290} right="2%" bottom="4%" rotation={14} opacity={0.5 * m} />}
      <LuxuryStucco id={`${id}-stucco`} opacity={dark ? 0.032 : 0.033} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
