import LuxurySpotlight from '../LuxurySpotlight';
import LuxuryFrame from '../LuxuryFrame';
import LuxuryStucco from '../LuxuryStucco';
import LuxuryGrain from '../LuxuryGrain';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { sceneMult, type SceneProps } from './types';

/**
 * Architectural — structured and composed, expressed through framing rather
 * than ornament: daylight from the top-right, bounded top and bottom by
 * editorial hairline rules that "mount" the section like a plate in a
 * monograph. No line-art shapes. Ideal: process / how-it-works, capability
 * and systems sections. Avoid: warm lifestyle moments (this reads cool).
 */
export default function Architectural({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  return (
    <>
      <LuxurySpotlight
        from="top-right"
        color={dark ? 'rgba(232,196,104,0.5)' : 'rgba(253,250,246,0.88)'}
        opacity={0.5 * m}
      />
      <LuxuryFrame variant="rules" inset={0} color={luxoraColors.gold} opacity={(dark ? 0.18 : 0.14) * m} />
      <LuxuryStucco id={`${id}-stucco`} opacity={dark ? 0.032 : 0.03} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
