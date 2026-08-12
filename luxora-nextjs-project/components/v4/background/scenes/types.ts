/**
 * Shared contract for every background scene (see
 * docs/background-design-system.md for the full catalog).
 *
 * Scenes are page-agnostic, fixed compositions: absolutely positioned,
 * `pointer-events-none`, `aria-hidden`, z-index 0 under a z-10 content
 * contract. The host section must be `relative overflow-hidden`.
 */
export interface SceneProps {
  /** Unique per rendered instance — namespaces SVG filter/gradient ids so
   * two scenes on one page can never collide. */
  id: string;
  /** Surface the scene sits on — scenes adapt line/glow colors to cream
   * vs espresso rather than assuming one. */
  surface?: 'light' | 'dark';
  /** `whisper` for content-dense surfaces (forms, estimator steps) —
   * roughly 60% of standard strength. */
  intensity?: 'whisper' | 'standard';
}

/** Opacity multiplier for the intensity register. */
export function sceneMult(intensity: SceneProps['intensity']): number {
  return intensity === 'whisper' ? 0.6 : 1;
}
