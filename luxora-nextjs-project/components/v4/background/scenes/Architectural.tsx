import LuxuryArch from '../LuxuryArch';
import LuxuryFrame from '../LuxuryFrame';
import LuxuryGeometry from '../LuxuryGeometry';
import LuxuryStucco from '../LuxuryStucco';
import LuxuryGrain from '../LuxuryGrain';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { sceneMult, type SceneProps } from './types';

/**
 * Architectural (v2 — painted environment) — structured, drafted,
 * intentional: nested archways rising from the lower-right like a vaulted
 * opening, hairline corner marks mounting the section, a few outlined
 * squares set on point, all on a limewash wall. Ideal: process /
 * how-it-works, capability and consultancy sections. Avoid:
 * photography-dense grids (the line work fights the images), estimator
 * question cards (geometry competes with option borders), and adjacent
 * to SoftGeometry (shared vocabulary blurs together).
 */
export default function Architectural({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  const line = dark ? luxoraColors.goldLight : '#C9A96E';
  return (
    <>
      <LuxuryArch right="4%" bottom="0" size={300} height={380} count={3} gap={26} color={line} opacity={(dark ? 0.18 : 0.22) * m} />
      <LuxuryFrame variant="corners" inset={24} arm={44} color={dark ? line : luxoraColors.gold} opacity={(dark ? 0.26 : 0.2) * m} />
      <LuxuryGeometry variant="squares" color={line} opacity={0.12 * m} />
      <LuxuryStucco id={`${id}-stucco`} opacity={dark ? 0.03 : 0.022} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
