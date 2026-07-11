import LuxuryMesh from '../LuxuryMesh';
import LuxuryHalo from '../LuxuryHalo';
import LuxuryRidges from '../LuxuryRidges';
import LuxurySphere from '../LuxurySphere';
import LuxuryStucco from '../LuxuryStucco';
import LuxuryGrain from '../LuxuryGrain';
import { sceneMult, type SceneProps } from './types';

/**
 * LuxuryAmbient (v2 — painted environment) — warm, enveloping ambience:
 * gold/cream mesh washes, a low glow rising bottom-right, a fabric-ridge
 * bundle draped along the left edge, a small ceramic orb resting in the
 * lower-right corner. Evening lamplight in a finished home. Ideal:
 * furniture, materials, lifestyle and trust storytelling. Avoid: dense
 * data or forms — the warmth competes with inputs.
 */
export default function LuxuryAmbient({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  return (
    <>
      <LuxuryMesh tone={dark ? 'dark' : 'warm'} opacity={(dark ? 0.1 : 0.07) * m} />
      <LuxuryRidges variant="sweep" position="top-left" rotation={-14} opacity={(dark ? 0.1 : 0.12) * m} />
      {!dark && <LuxurySphere size={88} right="3%" bottom="10%" opacity={0.85 * m} />}
      <LuxuryHalo position="bottom-right" size="lg" opacity={0.07 * m} blur={110} />
      <LuxuryStucco id={`${id}-stucco`} opacity={dark ? 0.03 : 0.024} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
