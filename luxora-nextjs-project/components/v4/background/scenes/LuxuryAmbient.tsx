import LuxuryMesh from '../LuxuryMesh';
import LuxuryHalo from '../LuxuryHalo';
import LuxuryStucco from '../LuxuryStucco';
import LuxuryGrain from '../LuxuryGrain';
import { sceneMult, type SceneProps } from './types';

/**
 * LuxuryAmbient — warm, enveloping ambience: a soft mesh of gold/cream washes
 * with a low glow rising from the bottom-right, like evening lamplight in a
 * finished home. Pure light and colour field, no shapes. Ideal: furniture,
 * materials, lifestyle and trust storytelling. Avoid: dense data or forms —
 * the warmth competes with inputs.
 */
export default function LuxuryAmbient({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  return (
    <>
      <LuxuryMesh tone={dark ? 'dark' : 'warm'} opacity={(dark ? 0.1 : 0.08) * m} />
      <LuxuryHalo position="bottom-right" size="lg" opacity={0.08 * m} blur={120} />
      <LuxuryStucco id={`${id}-stucco`} opacity={dark ? 0.032 : 0.03} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
