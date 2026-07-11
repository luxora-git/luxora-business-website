import LuxuryRidges from '../LuxuryRidges';
import LuxuryArch from '../LuxuryArch';
import LuxurySphere from '../LuxurySphere';
import LuxuryBotanical from '../LuxuryBotanical';
import LuxurySpotlight from '../LuxurySpotlight';
import LuxuryStucco from '../LuxuryStucco';
import LuxuryGrain from '../LuxuryGrain';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { sceneMult, type SceneProps } from './types';

/**
 * SoftGeometry (v2 — painted environment) — the gallery/showcase canvas:
 * a fabric-ridge bundle sweeping the lower-left, nested archways on the
 * upper-right, a small ceramic orb resting at the left edge, a palm shadow
 * falling across the top, all lit softly from the top-right on a limewash
 * wall. Large tone-on-tone forms — visible in form, silent in contrast —
 * with the middle clear for content. Ideal: gallery/category showcases,
 * card-grid sections. Avoid: text-heavy sections; adjacent to
 * Architectural (shared geometric vocabulary blurs together).
 */
export default function SoftGeometry({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  const line = dark ? luxoraColors.goldLight : '#C9A96E';

  return (
    <>
      <LuxuryRidges variant="sweep" position="bottom-left" rotation={8} opacity={(dark ? 0.14 : 0.22) * m} color={line} />
      <LuxuryArch right="-3%" top="6%" size={300} count={3} gap={28} color={line} opacity={(dark ? 0.18 : 0.26) * m} />
      {!dark && (
        <>
          <LuxurySphere size={120} left="2.5%" top="38%" opacity={0.9 * m} />
          <LuxuryBotanical mode="shadow" size={500} top="-5%" left="10%" rotation={24} opacity={0.09 * m} />
        </>
      )}
      <LuxurySpotlight
        from="top-right"
        color={dark ? 'rgba(232,196,104,0.45)' : 'rgba(253,250,246,0.8)'}
        opacity={0.4 * m}
      />
      <LuxuryStucco id={`${id}-stucco`} opacity={dark ? 0.032 : 0.035} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.02 : 0.012} />
    </>
  );
}
