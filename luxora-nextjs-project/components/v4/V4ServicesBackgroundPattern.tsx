export default function V4ServicesBackgroundPattern() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <svg
        className="w-full h-full min-h-[600px]"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 1 }}
      >
        {/* ── Large Architectural Circle — upper-left corner ── */}
        <circle
          cx="-80" cy="-80" r="320"
          fill="none"
          stroke="#C9A227"
          strokeWidth="1.8"
          opacity="0.12"
        />
        <circle
          cx="-80" cy="-80" r="280"
          fill="none"
          stroke="#C9A227"
          strokeWidth="1"
          opacity="0.08"
        />

        {/* ── Large Architectural Circle — lower-right corner ── */}
        <circle
          cx="1520" cy="880" r="400"
          fill="none"
          stroke="#C9A227"
          strokeWidth="1.8"
          opacity="0.12"
        />
        <circle
          cx="1520" cy="880" r="350"
          fill="none"
          stroke="#C9A227"
          strokeWidth="1"
          opacity="0.08"
        />

        {/* ── Thin Geometric Construction Lines — upper-right ── */}
        <g opacity="0.1">
          <line x1="1100" y1="0" x2="1440" y2="300" stroke="#C9A227" strokeWidth="1.2" />
          <line x1="1200" y1="0" x2="1440" y2="200" stroke="#C9A227" strokeWidth="0.8" />
          <line x1="1300" y1="0" x2="1440" y2="100" stroke="#C9A227" strokeWidth="0.8" />
        </g>

        {/* ── Thin Geometric Construction Lines — lower-left ── */}
        <g opacity="0.1">
          <line x1="0" y1="600" x2="300" y2="800" stroke="#C9A227" strokeWidth="1.2" />
          <line x1="0" y1="650" x2="200" y2="800" stroke="#C9A227" strokeWidth="0.8" />
          <line x1="0" y1="700" x2="100" y2="800" stroke="#C9A227" strokeWidth="0.8" />
        </g>

        {/* ── Subtle Dot Matrix Accent — upper-right edge ── */}
        <g opacity="0.12" fill="#C9A227">
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2, 3, 4, 5].map((col) => (
              <circle
                key={`dot-${row}-${col}`}
                cx={1320 + col * 20}
                cy={40 + row * 20}
                r="2.5"
              />
            ))
          )}
        </g>

        {/* ── Subtle Dot Matrix Accent — lower-left edge ── */}
        <g opacity="0.12" fill="#C9A227">
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <circle
                key={`dot2-${row}-${col}`}
                cx={40 + col * 20}
                cy={680 + row * 20}
                r="2.5"
              />
            ))
          )}
        </g>

        {/* ── Very Soft Blur Sphere — upper-left glow ── */}
        <defs>
          <filter id="glow-blur-ul">
            <feGaussianBlur stdDeviation="60" />
          </filter>
          <filter id="glow-blur-lr">
            <feGaussianBlur stdDeviation="80" />
          </filter>
        </defs>
        <circle
          cx="60" cy="60" r="180"
          fill="#C9A227"
          opacity="0.08"
          filter="url(#glow-blur-ul)"
        />
        <circle
          cx="1380" cy="740" r="220"
          fill="#C9A227"
          opacity="0.08"
          filter="url(#glow-blur-lr)"
        />

        {/* ── Thin Gold Contour Curves — upper-left flow ── */}
        <path
          d="M-40,40 Q120,20 200,100 Q280,180 240,300"
          fill="none"
          stroke="#C9A227"
          strokeWidth="1.5"
          opacity="0.07"
          strokeLinecap="round"
        />
        <path
          d="M-20,60 Q100,40 180,120 Q260,200 220,320"
          fill="none"
          stroke="#C9A227"
          strokeWidth="0.8"
          opacity="0.05"
          strokeLinecap="round"
        />

        {/* ── Thin Gold Contour Curves — lower-right flow ── */}
        <path
          d="M1480,760 Q1320,740 1240,660 Q1160,580 1200,460"
          fill="none"
          stroke="#C9A227"
          strokeWidth="1.5"
          opacity="0.07"
          strokeLinecap="round"
        />
        <path
          d="M1460,740 Q1300,720 1220,640 Q1140,560 1180,440"
          fill="none"
          stroke="#C9A227"
          strokeWidth="0.8"
          opacity="0.05"
          strokeLinecap="round"
        />

        {/* ── Sweeping Arc 1 — upper flow left→right ── */}
        <path
          d="M-120,160 Q400,40 800,200 Q1200,360 1560,180"
          fill="none"
          stroke="#C9A227"
          strokeWidth="2"
          opacity="0.08"
          strokeLinecap="round"
        />

        {/* ── Sweeping Arc 2 — mid flow, through card grid area ── */}
        <path
          d="M-60,440 Q400,560 800,400 Q1160,260 1600,460"
          fill="none"
          stroke="#C9A227"
          strokeWidth="1.5"
          opacity="0.07"
          strokeLinecap="round"
        />

        {/* ── Sweeping Arc 3 — lower flow ── */}
        <path
          d="M-20,640 Q520,500 960,640 Q1320,740 1640,580"
          fill="none"
          stroke="#C9A227"
          strokeWidth="1.2"
          opacity="0.06"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}