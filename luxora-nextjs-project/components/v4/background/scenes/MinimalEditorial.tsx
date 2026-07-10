import LuxuryFrame from '../LuxuryFrame';
import LuxuryGrain from '../LuxuryGrain';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { sceneMult, type SceneProps } from './types';

/**
 * MinimalEditorial — almost nothing, on purpose: faint top/bottom rules
 * and a whisper of grain. For surfaces where any decoration would cost
 * trust or focus. Ideal: legal pages, forms, estimator steps, dense
 * comparison sections. Avoid: hero-adjacent or feature moments — it
 * cannot carry emotional weight and isn't meant to.
 */
export default function MinimalEditorial({ id, surface = 'light', intensity = 'standard' }: SceneProps) {
  const m = sceneMult(intensity);
  const dark = surface === 'dark';
  return (
    <>
      <LuxuryFrame variant="rules" inset={0} color={luxoraColors.gold} opacity={(dark ? 0.14 : 0.1) * m} />
      <LuxuryGrain id={`${id}-grain`} opacity={dark ? 0.016 : 0.01} />
    </>
  );
}
