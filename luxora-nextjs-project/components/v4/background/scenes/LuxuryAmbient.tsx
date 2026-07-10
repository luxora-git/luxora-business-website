import LuxuryMesh from '../LuxuryMesh';
import LuxuryHalo from '../LuxuryHalo';
import LuxuryGrain from '../LuxuryGrain';
import { sceneMult, type SceneProps } from './types';

/**
 * LuxuryAmbient — warm, enveloping ambience: a soft mesh of gold/cream
 * washes with a low glow rising from the bottom-right. Feels like evening
 * lamplight in a finished home. Ideal: furniture, materials, lifestyle
 * sections. Avoid: dense data/forms — the warmth competes with inputs.
 */
export default function LuxuryAmbient({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  return (
    <>
      <LuxuryMesh tone={dark ? 'dark' : 'warm'} opacity={(dark ? 0.1 : 0.07) * m} />
      <LuxuryHalo position="bottom-right" size="lg" opacity={0.07 * m} blur={110} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
