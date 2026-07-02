/**
 * V4BgPatterns.tsx
 * Reusable Figma-exact background decorative components.
 * All purely visual — aria-hidden, pointer-events-none, z-0.
 */

// ── 1. SWEEPING ARC CURVES ──────────────────────────────────────────
// 4 parallel gentle arcs sweeping full width.
// Used in: Services, Stats, Furniture, Smart Living, Walkthrough top, Real Homes
export function V4ArcLines({ opacity = 0.10 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity }}
      >
        <path d="M-120 820 Q360 520 720 660 T1560 820" stroke="#C9A96E" strokeWidth="1.5" fill="none" />
        <path d="M-120 700 Q360 440 720 570 T1560 700" stroke="#C9A96E" strokeWidth="1.1" fill="none" />
        <path d="M-120 600 Q360 370 720 480 T1560 600" stroke="#C9A96E" strokeWidth="0.8" fill="none" />
        <path d="M-120 480 Q360 300 720 390 T1560 480" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
      </svg>
    </div>
  );
}

// ── 2. LARGE BOTANICAL LEAF — RIGHT SIDE ───────────────────────────
// The large illustrative leaf from Figma. Very prominent in Furniture section.
// Used in: Services (right), Stats (right), Furniture (right, large), Smart Living (right)
export function V4LargeLeafRight({
  opacity = 0.12,
  size = 'lg',
}: {
  opacity?: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const w = size === 'lg' ? 420 : size === 'md' ? 300 : 200;
  const h = size === 'lg' ? 560 : size === 'md' ? 400 : 270;
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
      aria-hidden="true"
      style={{ right: '-60px', width: w, height: h, opacity, zIndex: 0 }}
    >
      <svg viewBox="0 0 400 520" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <path d="M200 520 C120 420,-40 280,20 140 C55 65,140 30,200 0 C260 30,345 65,380 140 C440 280,280 420,200 520Z" stroke="#C9A96E" strokeWidth="1.3" />
        <path d="M200 480 C150 400,30 300,60 180 C85 110,150 80,200 50 C250 80,315 110,340 180 C370 300,250 400,200 480Z" stroke="#C9A96E" strokeWidth="1.0" />
        <path d="M200 430 C165 360,70 280,90 190 C110 135,160 105,200 80 C240 105,290 135,310 190 C330 280,235 360,200 430Z" stroke="#C9A96E" strokeWidth="0.7" />
        <line x1="200" y1="0" x2="200" y2="520" stroke="#C9A96E" strokeWidth="0.6" />
        <path d="M200 140 Q125 175 80 235" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
        <path d="M200 200 Q278 238 320 298" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
        <path d="M200 280 Q138 318 105 378" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
        <path d="M200 340 Q262 378 292 428" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
        <ellipse cx="200" cy="260" rx="22" ry="76" fill="#C9A96E" fillOpacity="0.12" />
      </svg>
    </div>
  );
}

// ── 3. LARGE BOTANICAL LEAF — LEFT SIDE (mirrored) ─────────────────
// Used in: Stats (left), Real Homes (left)
export function V4LargeLeafLeft({
  opacity = 0.10,
  size = 'md',
}: {
  opacity?: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const w = size === 'lg' ? 420 : size === 'md' ? 300 : 200;
  const h = size === 'lg' ? 560 : size === 'md' ? 400 : 270;
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
      aria-hidden="true"
      style={{ left: '-60px', width: w, height: h, opacity, zIndex: 0 }}
    >
      <svg viewBox="0 0 400 520" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid meet" style={{ transform: 'scaleX(-1)' }}>
        <path d="M200 520 C120 420,-40 280,20 140 C55 65,140 30,200 0 C260 30,345 65,380 140 C440 280,280 420,200 520Z" stroke="#C9A96E" strokeWidth="1.3" />
        <path d="M200 480 C150 400,30 300,60 180 C85 110,150 80,200 50 C250 80,315 110,340 180 C370 300,250 400,200 480Z" stroke="#C9A96E" strokeWidth="1.0" />
        <path d="M200 430 C165 360,70 280,90 190 C110 135,160 105,200 80 C240 105,290 135,310 190 C330 280,235 360,200 430Z" stroke="#C9A96E" strokeWidth="0.7" />
        <line x1="200" y1="0" x2="200" y2="520" stroke="#C9A96E" strokeWidth="0.6" />
        <path d="M200 140 Q125 175 80 235" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
        <path d="M200 200 Q278 238 320 298" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
        <path d="M200 280 Q138 318 105 378" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
        <ellipse cx="200" cy="260" rx="22" ry="76" fill="#C9A96E" fillOpacity="0.12" />
      </svg>
    </div>
  );
}

// ── 4. FINE DOT GRID ────────────────────────────────────────────────
// Used in: Gallery, Furniture, Testimonials, Process (dark)
// IMPORTANT: pass a unique `id` each time to avoid SVG pattern collision.
export function V4DotGrid({ id, opacity = 0.06 }: { id: string; opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity, zIndex: 0 }}>
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#C9A96E" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}

// ── 5. CONCENTRIC CIRCLE RINGS ──────────────────────────────────────
// Used in: Testimonials top-right, Stats, Footer
export function V4CircleRing({
  position = 'top-right',
  size = 'lg',
}: {
  position?: 'top-right' | 'top-left' | 'bottom-right';
  size?: 'sm' | 'md' | 'lg';
}) {
  const s = size === 'lg' ? 420 : size === 'md' ? 280 : 160;
  const half = s / 2;
  const posStyle: React.CSSProperties =
    position === 'top-right'
      ? { top: 0, right: 0, transform: 'translate(33%,-33%)' }
      : position === 'top-left'
      ? { top: 0, left: 0, transform: 'translate(-33%,-33%)' }
      : { bottom: 0, right: 0, transform: 'translate(33%,33%)' };

  return (
    <div
      className="absolute pointer-events-none"
      aria-hidden="true"
      style={{ width: s, height: s, zIndex: 0, ...posStyle }}
    >
      <svg viewBox={`0 0 ${s} ${s}`} fill="none" className="w-full h-full">
        <circle cx={half} cy={half} r={half - 2} stroke="#C9A96E" strokeWidth="0.9" opacity="0.14" />
        <circle cx={half} cy={half} r={half * 0.72} stroke="#C9A96E" strokeWidth="0.6" opacity="0.09" />
        <circle cx={half} cy={half} r={half * 0.44} stroke="#C9A96E" strokeWidth="0.4" opacity="0.06" />
      </svg>
    </div>
  );
}

// ── 6. CORNER LEAF MOTIF ────────────────────────────────────────────
// Small starburst leaf shape for section corners.
// Used in: Smart Living top-left, Walkthrough top-left
export function V4CornerLeaf({
  corner = 'top-left',
  opacity = 0.07,
}: {
  corner?: 'top-left' | 'top-right';
  opacity?: number;
}) {
  const isLeft = corner === 'top-left';
  return (
    <div
      className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} w-40 h-40 pointer-events-none`}
      aria-hidden="true"
      style={{ opacity, zIndex: 0 }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ transform: isLeft ? 'none' : 'scaleX(-1)' }}
      >
        <path
          d="M20 180 Q80 160 100 100 Q120 160 180 180 Q140 120 100 100 Q140 80 180 20 Q120 40 100 100 Q80 40 20 20 Q60 80 100 100 Q60 120 20 180"
          stroke="#C9A96E" strokeWidth="0.9" fill="none"
        />
        <path
          d="M10 190 Q70 165 95 100 Q125 165 190 188 Q148 112 95 100 Q152 72 190 12"
          stroke="#C9A96E" strokeWidth="0.5" fill="none"
        />
      </svg>
    </div>
  );
}

// ── 7. FOOTER LEAF (large bottom-right) ────────────────────────────
// Used in Footer only. Positioned bottom-right, partly outside viewport.
export function V4FooterLeaf() {
  return (
    <div
      className="absolute bottom-0 right-0 pointer-events-none"
      aria-hidden="true"
      style={{
        width: 'clamp(260px, 30vw, 460px)',
        height: 'clamp(340px, 40vw, 600px)',
        opacity: 0.10,
        transform: 'translate(28%, 28%)',
        zIndex: 0,
      }}
    >
      <svg viewBox="0 0 400 520" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <path d="M200 520 C120 420,-40 280,20 140 C55 65,140 30,200 0 C260 30,345 65,380 140 C440 280,280 420,200 520Z" stroke="#C9A96E" strokeWidth="1.3" />
        <path d="M200 480 C150 400,30 300,60 180 C85 110,150 80,200 50 C250 80,315 110,340 180 C370 300,250 400,200 480Z" stroke="#C9A96E" strokeWidth="1.0" />
        <line x1="200" y1="0" x2="200" y2="520" stroke="#C9A96E" strokeWidth="0.7" />
        <path d="M200 130 Q125 170 80 230" stroke="#C9A96E" strokeWidth="0.6" fill="none" />
        <path d="M200 200 Q275 240 320 300" stroke="#C9A96E" strokeWidth="0.6" fill="none" />
        <path d="M200 290 Q135 330 100 390" stroke="#C9A96E" strokeWidth="0.6" fill="none" />
      </svg>
    </div>
  );
}
