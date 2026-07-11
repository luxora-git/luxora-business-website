export interface LuxurySphereProps {
  /** Diameter in px. */
  size?: number;
  /** Placement offsets on the host section (any subset). */
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  /** Render the soft cast shadow under the orb. */
  shadow?: boolean;
  opacity?: number;
  className?: string;
}

/**
 * LuxurySphere — a matte ceramic orb resting on the page, shaded like a
 * physical object (highlight upper-left, ambient occlusion lower-right,
 * soft cast shadow beneath). Tone-on-tone with the cream surfaces: clearly
 * visible in FORM, nearly silent in contrast — the Background Design
 * System v2 principle. Pure CSS gradients, no assets.
 */
export default function LuxurySphere({
  size = 120,
  top,
  left,
  right,
  bottom,
  shadow = true,
  opacity = 1,
  className = '',
}: LuxurySphereProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute ${className}`}
      style={{ top, left, right, bottom, width: size, height: size * 1.18, opacity, zIndex: 0 }}
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background:
            'radial-gradient(circle at 32% 28%, #FBF5EA 0%, #F1E5CE 48%, #E0CCA9 78%, #D3BC96 100%)',
          boxShadow: 'inset -10px -12px 26px rgba(107,76,59,0.16)',
        }}
      />
      {shadow && (
        <div
          style={{
            position: 'absolute',
            left: '-6%',
            top: size * 0.94,
            width: size * 1.12,
            height: size * 0.22,
            background: 'radial-gradient(ellipse at center, rgba(90,62,45,0.28) 0%, transparent 68%)',
            filter: 'blur(6px)',
          }}
        />
      )}
    </div>
  );
}
