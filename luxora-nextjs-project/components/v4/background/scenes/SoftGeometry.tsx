import LuxuryGeometry from '../LuxuryGeometry';
import LuxurySpotlight from '../LuxurySpotlight';
import LuxuryGrain from '../LuxuryGrain';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { sceneMult, type SceneProps } from './types';

/**
 * SoftGeometry — playful restraint: a few outlined squares set on point,
 * tiny gold diamonds, and one large arc slipping off-canvas, lit softly
 * from the top-right. Adds quiet visual interest around the edges while
 * the middle stays clear for content. Ideal: gallery/category showcases,
 * card-grid sections that need life without weight. Avoid: text-heavy
 * sections where the accents read as clutter, or next to Architectural
 * (the two share a geometric vocabulary and blur together).
 */
export default function SoftGeometry({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  const line = dark ? luxoraColors.goldLight : luxoraColors.gold;
  return (
    <>
      <LuxuryGeometry variant="mixed" color={line} opacity={(dark ? 0.2 : 0.14) * m} />
      <LuxurySpotlight
        from="top-right"
        color={dark ? 'rgba(232,196,104,0.45)' : 'rgba(253,250,246,0.8)'}
        opacity={0.35 * m}
      />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
