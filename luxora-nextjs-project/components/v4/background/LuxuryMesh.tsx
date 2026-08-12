export type LuxuryMeshTone = 'warm' | 'gold' | 'dark';

export interface LuxuryMeshProps {
  /** `warm` — cream/gold ambience for light surfaces; `gold` — a richer
   * golden wash; `dark` — gold/amber glows tuned for espresso surfaces. */
  tone?: LuxuryMeshTone;
  opacity?: number;
  className?: string;
}

const MESHES: Record<LuxuryMeshTone, string> = {
  warm: [
    'radial-gradient(ellipse 55% 45% at 18% 22%, rgba(201,162,39,0.55) 0%, transparent 65%)',
    'radial-gradient(ellipse 50% 42% at 84% 12%, rgba(253,250,246,0.9) 0%, transparent 60%)',
    'radial-gradient(ellipse 60% 50% at 72% 86%, rgba(156,123,104,0.4) 0%, transparent 65%)',
  ].join(', '),
  gold: [
    'radial-gradient(ellipse 60% 50% at 24% 18%, rgba(201,162,39,0.7) 0%, transparent 62%)',
    'radial-gradient(ellipse 45% 40% at 80% 70%, rgba(232,196,104,0.5) 0%, transparent 60%)',
    'radial-gradient(ellipse 50% 45% at 60% 10%, rgba(253,250,246,0.6) 0%, transparent 55%)',
  ].join(', '),
  dark: [
    'radial-gradient(ellipse 55% 45% at 20% 15%, rgba(201,162,39,0.5) 0%, transparent 60%)',
    'radial-gradient(ellipse 50% 55% at 85% 80%, rgba(201,162,39,0.35) 0%, transparent 60%)',
    'radial-gradient(ellipse 65% 50% at 55% 45%, rgba(107,76,59,0.45) 0%, transparent 65%)',
  ].join(', '),
};

/**
 * LuxuryMesh — a soft multi-stop mesh gradient (layered radial washes), the
 * kind of ambient color field a designer would paint in Figma rather than a
 * single flat gradient. Always used at very low opacity — it should be felt
 * as warmth, never seen as a shape. Pure CSS, no assets.
 */
export default function LuxuryMesh({ tone = 'warm', opacity = 0.06, className = '' }: LuxuryMeshProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 ${className}`}
      style={{ background: MESHES[tone], opacity, zIndex: 0 }}
    />
  );
}
