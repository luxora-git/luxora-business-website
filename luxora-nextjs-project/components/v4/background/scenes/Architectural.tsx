import LuxuryContour from '../LuxuryContour';
import LuxuryFrame from '../LuxuryFrame';
import LuxuryGeometry from '../LuxuryGeometry';
import LuxuryGrain from '../LuxuryGrain';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { sceneMult, type SceneProps } from './types';

/**
 * Architectural — structured, drafted, intentional: contour line work in
 * one corner, hairline corner marks mounting the section, a few outlined
 * squares set on point. Reads like a page from a design drawing set.
 * Ideal: process / how-it-works, capability and consultancy sections.
 * Avoid: photography-dense sections (the line work fights the images) and
 * the estimator's question cards (geometry competes with option borders).
 */
export default function Architectural({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  const line = dark ? luxoraColors.goldLight : luxoraColors.gold;
  return (
    <>
      <LuxuryContour position="top-right" rotation={18} opacity={0.04 * m} color={line} />
      <LuxuryFrame variant="corners" inset={24} arm={44} color={line} opacity={(dark ? 0.26 : 0.2) * m} />
      <LuxuryGeometry variant="squares" color={line} opacity={0.1 * m} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
