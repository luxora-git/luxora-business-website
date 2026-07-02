'use client';

import { luxoraStats } from '@/lib/content/global/stats';

// ── Concentric ripple arcs from top-right (exact Figma pattern)
function ConcentricArcs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="absolute top-0 right-0 h-full"
        style={{ width: '52%', opacity: 0.18 }}
        viewBox="0 0 700 900"
        preserveAspectRatio="xMaxYMid meet"
        fill="none"
      >
        {Array.from({ length: 22 }).map((_, i) => {
          const r = 100 + i * 36;
          return (
            <path
              key={i}
              d={`M 700 0 A ${r} ${r} 0 0 0 ${Math.max(0, 700 - r)} 900`}
              stroke="#C9A96E"
              strokeWidth="0.85"
              fill="none"
            />
          );
        })}
      </svg>
    </div>
  );
}

// ── 3D Sphere — left side
function Sphere3D() {
  return (
    <div
      className="absolute pointer-events-none hidden lg:block"
      aria-hidden="true"
      style={{ left: '-18px', bottom: '14%', width: '108px', height: '108px', opacity: 0.80 }}
    >
      <svg viewBox="0 0 110 110" fill="none" className="w-full h-full">
        <defs>
          <radialGradient id="sg1" cx="38%" cy="35%" r="60%">
            <stop offset="0%"   stopColor="#F5E8D0" />
            <stop offset="45%"  stopColor="#D4B896" />
            <stop offset="75%"  stopColor="#B89870" />
            <stop offset="100%" stopColor="#8B6840" />
          </radialGradient>
          <radialGradient id="sg2" cx="30%" cy="28%" r="35%">
            <stop offset="0%"   stopColor="#FDFAF6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FDFAF6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="55" cy="55" r="52" fill="url(#sg1)" />
        <circle cx="55" cy="55" r="52" fill="url(#sg2)" />
        <ellipse cx="55" cy="55" rx="52" ry="18" stroke="#C9A96E" strokeWidth="0.5" strokeOpacity="0.28" fill="none" />
        <ellipse cx="55" cy="55" rx="52" ry="35" stroke="#C9A96E" strokeWidth="0.4" strokeOpacity="0.18" fill="none" />
      </svg>
    </div>
  );
}

// ── Botanical leaf — bottom right
function BottomRightLeaf() {
  return (
    <div
      className="absolute pointer-events-none"
      aria-hidden="true"
      style={{ bottom: '-20px', right: '-28px', width: '220px', height: '320px', opacity: 0.09 }}
    >
      <svg viewBox="0 0 300 420" fill="none" className="w-full h-full">
        <path d="M150 420 C90 340,-20 230,15 115 C40 55,110 25,150 0 C190 25,260 55,285 115 C320 230,210 340,150 420Z" stroke="#C9A96E" strokeWidth="1.2" />
        <path d="M150 385 C110 315,20 235,45 145 C65 90,120 65,150 40 C180 65,235 90,255 145 C280 235,190 315,150 385Z" stroke="#C9A96E" strokeWidth="0.9" />
        <line x1="150" y1="0" x2="150" y2="420" stroke="#C9A96E" strokeWidth="0.6" />
        <path d="M150 110 Q95 140 65 190" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
        <path d="M150 170 Q205 200 235 250" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
        <path d="M150 240 Q105 270 85 315" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
      </svg>
    </div>
  );
}

const benefits = [
  { title: 'After-Sales Care',                                      description: 'Continued support beyond project completion.'      },
  { title: `${luxoraStats.warrantyYears}-Year Warranty`,             description: 'Long-term assurance on quality and craftsmanship.' },
  { title: `${luxoraStats.avgDeliveryDays}-Day Move-In`,             description: 'Timely delivery with a guaranteed handover.'       },
  { title: `${luxoraStats.qualityChecks} Quality Checks`,            description: 'Rigorous inspections for flawless execution.'      },
  { title: `${luxoraStats.catalogueChoices} Choices`,                description: 'Extensive catalogue of products and finishes.'     },
];

const LUXORA_YOUTUBE_CHANNEL = 'https://www.youtube.com/@Luxorainteriors';

export default function V4PremiumTrustSection() {

  return (
    <section
      id="v4-about"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, rgba(44,31,20,0.05) 0%, transparent 9%), radial-gradient(ellipse 70% 50% at 92% 0%, rgba(255,255,255,0.45) 0%, transparent 55%), radial-gradient(ellipse 60% 60% at 4% 100%, rgba(201,162,39,0.09) 0%, transparent 55%), #F5EDE0',
      }}
    >
      <ConcentricArcs />
      <Sphere3D />
      <BottomRightLeaf />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Eyebrow with gold lines on both sides */}
        <div className="flex items-center justify-center gap-4 mb-6" data-v4-reveal-heading>
          <div className="h-px flex-1 max-w-[120px]" style={{ background: 'rgba(180,130,60,0.35)' }} />
          <span className="text-[11px] font-semibold tracking-[0.28em] uppercase whitespace-nowrap" style={{ color: '#B07D3A' }}>
            Why Choose Luxora
          </span>
          <div className="h-px flex-1 max-w-[120px]" style={{ background: 'rgba(180,130,60,0.35)' }} />
        </div>

        {/* ── Heading — single line (no italic split), exact Figma */}
        <h2
          className="font-playfair font-normal text-center leading-[1.1] tracking-[-0.02em] mb-5"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3.4rem)', color: '#2C1F14' }}
          data-v4-reveal-heading
        >
          Creating Spaces That Reflect You
        </h2>

        {/* ── Description */}
        <p
          className="text-center text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-14"
          style={{ color: '#6B4C3B' }}
          data-v4-reveal
        >
          From concept and planning to turnkey delivery, we create sophisticated interiors
          that blend luxury, functionality, and personal expression.
        </p>

        {/* ── 5 benefit cards — STRICTLY ONE ROW on desktop (Figma exact) */}
        <div
          className="mb-14 md:mb-16"
          data-v4-reveal
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',  /* always 5 cols — never wraps */
            gap: '16px',
          }}
        >
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group rounded-2xl p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(100,60,20,0.10)]"
              style={{
                background: 'rgba(253,250,246,0.82)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(180,140,95,0.22)',
                boxShadow: '0 4px 18px rgba(100,60,20,0.05)',
              }}
            >
              <h3
                className="font-playfair font-semibold leading-tight mb-2.5"
                style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.2rem)', color: '#2C1F14' }}
              >
                {b.title}
              </h3>
              <p className="text-xs font-light leading-relaxed" style={{ color: '#6B4C3B' }}>
                {b.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Large centered image with play button — opens the real YouTube channel rather than an embedded video we can't verify */}
        <a
          href={LUXORA_YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center"
          data-v4-reveal
        >
          <div
            className="relative w-full max-w-[700px] rounded-3xl overflow-hidden cursor-pointer group"
            style={{
              boxShadow: '0 24px 70px rgba(100,60,20,0.16)',
              border: '1px solid rgba(180,140,95,0.18)',
            }}
          >
            <div style={{ aspectRatio: '16/10' }}>
              <img
                src="/img/PROJECT%20BASED/LIVING%20ROOM%20DESIGN/Krish%20ji%20S.F.%20A01_View140000.webp"
                alt="Why Choose Luxora"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Overlay gradient */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(44,31,20,0.04) 0%, rgba(44,31,20,0.32) 100%)' }}
            />

            {/* ── Play pill — "Watch video / Why Choose Us ?" (Figma exact) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex items-center gap-3.5 px-5 py-3.5 rounded-full transition-all duration-300 group-hover:scale-105"
                style={{
                  background: 'rgba(253,250,246,0.93)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(44,31,20,0.22)',
                  border: '1px solid rgba(180,140,95,0.25)',
                }}
              >
                {/* Gold play circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#C9A227', boxShadow: '0 4px 16px rgba(201,162,39,0.42)' }}
                >
                  <svg className="w-4 h-4 ml-0.5" fill="#1C1005" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                {/* Labels */}
                <div>
                  <div
                    className="text-[10px] font-medium tracking-[0.14em] uppercase leading-none mb-1"
                    style={{ color: '#9C7B68' }}
                  >
                    Watch video
                  </div>
                  <div
                    className="font-playfair text-[1.05rem] font-semibold leading-none"
                    style={{ color: '#2C1F14' }}
                  >
                    Why Choose Us ?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}