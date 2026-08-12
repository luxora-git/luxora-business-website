import LuxuryMesh from '../LuxuryMesh';
import LuxuryHalo from '../LuxuryHalo';
import LuxuryStucco from '../LuxuryStucco';
import LuxuryGrain from '../LuxuryGrain';
import { sceneMult, type SceneProps } from './types';

/**
 * GoldenComposition — the warm statement register: a richer golden mesh with a
 * glow drifting up from the bottom-left, the most present of the light scenes.
 * Pure light and colour, no shapes — the "claim" is made with warmth, not
 * ornament. Ideal: portfolio / completed work, awards, signature offerings.
 * Avoid: next to another warm scene; behind dense photo grids it can over-warm.
 */
export default function GoldenComposition({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  return (
    <>
      <LuxuryMesh tone={dark ? 'dark' : 'gold'} opacity={(dark ? 0.1 : 0.08) * m} />
      <LuxuryHalo position="bottom-left" size="lg" opacity={0.09 * m} blur={120} />
      <LuxuryStucco id={`${id}-stucco`} opacity={dark ? 0.032 : 0.03} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
