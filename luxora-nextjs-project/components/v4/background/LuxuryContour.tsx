import {
  luxoraColors,
  luxoraPatternOpacity,
  getLuxuryPositionStyle,
  composeLuxuryTransform,
  type LuxuryPosition,
} from '@/lib/design/luxoraDesignTokens';

export interface LuxuryContourProps {
  /** Stroke opacity. Defaults to the shared contour token (very subtle). */
  opacity?: number;
  /** Rotation in degrees. */
  rotation?: number;
  /** Uniform scale multiplier. */
  scale?: number;
  /** Corner / center anchor for the pattern. */
  position?: LuxuryPosition;
  /** Stroke color, defaults to Luxora gold. */
  color?: string;
  className?: string;
}

/**
 * LuxuryContour — organic architectural contour lines (topography-inspired).
 * Purely decorative: absolutely positioned, pointer-events disabled, never
 * affects layout or interferes with content above it.
 */
export default function LuxuryContour({
  opacity = luxoraPatternOpacity.contour,
  rotation = 0,
  scale = 1,
  position = 'top-left',
  color = luxoraColors.gold,
  className = '',
}: LuxuryContourProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        ...getLuxuryPositionStyle(position),
        width: 'clamp(320px, 42vw, 640px)',
        height: 'clamp(320px, 42vw, 640px)',
        opacity,
        transform: composeLuxuryTransform(position, rotation, scale),
        zIndex: 0,
      }}
    >
      <svg viewBox="0 0 600 600" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Outer contours — wrap around both peaks, like a twin-summit topographic survey */}
        <g transform="rotate(36 295 280)">
          <path
            d="M585 280 C585 385 455 470 295 470 C135 470 5 385 5 280 C5 175 135 90 295 90 C455 90 585 175 585 280 Z"
            stroke={color}
            strokeWidth="1.1"
          />
          <path
            d="M550 280 C550 368 436 440 295 440 C154 440 40 368 40 280 C40 192 154 120 295 120 C436 120 550 192 550 280 Z"
            stroke={color}
            strokeWidth="0.85"
          />
          <path
            d="M510 280 C510 352 414 410 295 410 C176 410 80 352 80 280 C80 208 176 150 295 150 C414 150 510 208 510 280 Z"
            stroke={color}
            strokeWidth="0.6"
          />
          <path
            d="M470 280 C470 335 392 380 295 380 C198 380 120 335 120 280 C120 225 198 180 295 180 C392 180 470 225 470 280 Z"
            stroke={color}
            strokeWidth="0.45"
          />
        </g>

        {/* Peak A — tightly nested inner contours */}
        <path
          d="M290 190 C290 242 247 285 195 285 C143 285 100 242 100 190 C100 138 143 95 195 95 C247 95 290 138 290 190 Z"
          stroke={color}
          strokeWidth="0.55"
        />
        <path
          d="M263 190 C263 228 233 258 195 258 C157 258 127 228 127 190 C127 152 157 122 195 122 C233 122 263 152 263 190 Z"
          stroke={color}
          strokeWidth="0.4"
        />
        <path
          d="M237 190 C237 213 218 232 195 232 C172 232 153 213 153 190 C153 167 172 148 195 148 C218 148 237 167 237 190 Z"
          stroke={color}
          strokeWidth="0.3"
        />
        <path
          d="M215 190 C215 201 206 210 195 210 C184 210 175 201 175 190 C175 179 184 170 195 170 C206 170 215 179 215 190 Z"
          stroke={color}
          strokeWidth="0.25"
        />
        <circle cx="195" cy="190" r="3" fill={color} />

        {/* Peak B — secondary summit, smaller and slightly lower */}
        <path
          d="M470 365 C470 409 434 445 390 445 C346 445 310 409 310 365 C310 321 346 285 390 285 C434 285 470 321 470 365 Z"
          stroke={color}
          strokeWidth="0.5"
        />
        <path
          d="M446 365 C446 396 421 421 390 421 C359 421 334 396 334 365 C334 334 359 309 390 309 C421 309 446 334 446 365 Z"
          stroke={color}
          strokeWidth="0.38"
        />
        <path
          d="M424 365 C424 384 409 399 390 399 C371 399 356 384 356 365 C356 346 371 331 390 331 C409 331 424 346 424 365 Z"
          stroke={color}
          strokeWidth="0.28"
        />
        <circle cx="390" cy="365" r="2.5" fill={color} />
      </svg>
    </div>
  );
}
