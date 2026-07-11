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
      <LuxuryMesh tone={dark ? 'dark' : 'warm'} opacity={(dark ? 0.1 : 0.09) * m} />
      <LuxuryRidges variant="sweep" position="top-left" rotation={-14} opacity={(dark ? 0.12 : 0.18) * m} />
      {!dark && <LuxurySphere size={112} right="3%" bottom="10%" opacity={0.9 * m} />}
      <LuxuryHalo position="bottom-right" size="lg" opacity={0.08 * m} blur={110} />
      <LuxuryStucco id={`${id}-stucco`} opacity={dark ? 0.032 : 0.033} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
