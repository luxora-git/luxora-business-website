import LuxuryContour from '../LuxuryContour';
import LuxuryHalo from '../LuxuryHalo';
import LuxuryFrame from '../LuxuryFrame';
import LuxuryGrain from '../LuxuryGrain';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { sceneMult, type SceneProps } from './types';

/**
 * GoldenComposition — the statement scene: large golden contour work
 * sweeping the top-right, a warm glow drifting in from the left, gold
 * corner marks framing the moment. The most present light-surface scene —
 * use it where the brand is making a claim. Ideal: portfolio / completed
 * work, awards, signature offerings. Avoid: adjacent to another
 * gold-forward scene, or behind dense photography grids where the contour
 * competes with the images' own warmth.
 */
export default function GoldenComposition({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  const line = dark ? luxoraColors.goldLight : luxoraColors.gold;
  return (
    <>
      <LuxuryContour position="top-right" rotation={-12} scale={1.15} opacity={0.05 * m} color={line} />
      <LuxuryHalo position="bottom-left" size="lg" opacity={0.07 * m} blur={120} />
      <LuxuryFrame variant="corners" inset={26} arm={52} color={line} opacity={(dark ? 0.28 : 0.22) * m} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
