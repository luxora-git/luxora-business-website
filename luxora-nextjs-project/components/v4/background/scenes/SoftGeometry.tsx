import LuxurySpotlight from '../LuxurySpotlight';
import LuxuryMesh from '../LuxuryMesh';
import LuxuryStucco from '../LuxuryStucco';
import LuxuryGrain from '../LuxuryGrain';
import { sceneMult, type SceneProps } from './types';

/**
 * SoftGeometry — a soft, quiet light wash for image-led showcases: gentle
 * daylight from the top-right over the faintest warm mesh, keeping the middle
 * clear so the cards and photography are unmistakably the focus. Named for its
 * softness; contains no literal geometry (shapes were removed in the restraint
 * pass). Ideal: gallery/category showcases, card grids. Avoid: text-heavy
 * sections that need no atmosphere at all — use MinimalEditorial there.
 */
export default function SoftGeometry({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  return (
    <>
      <LuxurySpotlight
        from="top-right"
        color={dark ? 'rgba(232,196,104,0.45)' : 'rgba(253,250,246,0.85)'}
        opacity={0.45 * m}
      />
      <LuxuryMesh tone={dark ? 'dark' : 'warm'} opacity={(dark ? 0.08 : 0.05) * m} />
      <LuxuryStucco id={`${id}-stucco`} opacity={dark ? 0.032 : 0.03} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
