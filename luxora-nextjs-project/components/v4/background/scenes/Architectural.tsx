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
      <LuxuryArch right="4%" bottom="0" size={380} height={480} count={3} gap={30} color={line} opacity={(dark ? 0.2 : 0.28) * m} />
      <LuxuryFrame variant="corners" inset={24} arm={48} color={dark ? line : luxoraColors.gold} opacity={(dark ? 0.28 : 0.24) * m} />
      <LuxuryGeometry variant="squares" color={line} opacity={0.16 * m} />
      <LuxuryStucco id={`${id}-stucco`} opacity={dark ? 0.032 : 0.033} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
