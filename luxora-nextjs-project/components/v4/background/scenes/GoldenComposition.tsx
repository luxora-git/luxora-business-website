import LuxuryRidges from '../LuxuryRidges';
import LuxuryBotanical from '../LuxuryBotanical';
import LuxurySphere from '../LuxurySphere';
import LuxuryHalo from '../LuxuryHalo';
import LuxuryFrame from '../LuxuryFrame';
import LuxuryStucco from '../LuxuryStucco';
import LuxuryGrain from '../LuxuryGrain';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { sceneMult, type SceneProps } from './types';

/**
 * GoldenComposition (v2 — painted environment) — the statement canvas for
 * completed work: concentric golden rings breaking in from the right edge,
 * a palm shadow across the lower-left, a ceramic orb beside the heading,
 * gold corner marks mounting the section, and a warm glow from the left —
 * all on a limewash wall. The most present light-surface scene; everything
 * around it should be quieter. Ideal: portfolio, awards, signature
 * offerings. Avoid: adjacent to another gold-forward scene.
 */
export default function GoldenComposition({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  const line = dark ? luxoraColors.goldLight : luxoraColors.gold;

  return (
    <>
      <LuxuryRidges variant="rings" position="top-right" opacity={(dark ? 0.12 : 0.14) * m} color={dark ? line : '#C9A96E'} />
      {!dark && (
        <>
          <LuxuryBotanical mode="shadow" size={460} bottom="-6%" left="-4%" rotation={-18} opacity={0.065 * m} />
          {/* Orb rests in the open lower-left, clear of the heading block */}
          <LuxurySphere size={104} left="3%" bottom="9%" opacity={0.9 * m} />
        </>
      )}
      <LuxuryHalo position="bottom-left" size="lg" opacity={0.07 * m} blur={120} />
      <LuxuryFrame variant="corners" inset={26} arm={52} color={line} opacity={(dark ? 0.28 : 0.22) * m} />
      <LuxuryStucco id={`${id}-stucco`} opacity={dark ? 0.03 : 0.024} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
