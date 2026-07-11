import LuxuryHalo from '../LuxuryHalo';
import LuxuryStucco from '../LuxuryStucco';
import LuxuryGrain from '../LuxuryGrain';
import { sceneMult, type SceneProps } from './types';

/**
 * PremiumHalo (v2 — painted environment) — a single large centered glow on
 * a limewash wall, and nothing else. Total focus: the composition points
 * every eye at whatever sits in the middle of the section. Ideal:
 * testimonials, a centered stat or claim, award moments. Avoid:
 * left-aligned editorial layouts — the centered light fights an off-center
 * composition.
 */
export default function PremiumHalo({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  return (
    <>
      <LuxuryHalo position="center" size="xl" opacity={(dark ? 0.12 : 0.11) * m} blur={140} />
      <LuxuryStucco id={`${id}-stucco`} opacity={dark ? 0.032 : 0.03} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
