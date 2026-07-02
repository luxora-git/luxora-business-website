'use client';

import { useState } from 'react';
import { useConsultationModal } from './modal';

const TOUR_URL =
  'https://luxora.in/virtualtour/viewer/index.php?code=c4ca4238a0b923820dcc509a6f75849b';

/* ── Corner L-bracket decoration (shows on all 4 corners of the frame) */
function CornerBracket({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const style: React.CSSProperties = {
    position: 'absolute',
    width: 32, height: 32,
    top:    pos.startsWith('t') ? -1  : undefined,
    bottom: pos.startsWith('b') ? -1  : undefined,
    left:   pos.endsWith('l')  ? -1  : undefined,
    right:  pos.endsWith('r')  ? -1  : undefined,
    transform: `${pos.endsWith('r') ? 'scaleX(-1)' : ''} ${pos.startsWith('b') ? 'scaleY(-1)' : ''}`,
    zIndex: 2,
    pointerEvents: 'none',
  };
  return (
    <div style={style} aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <path d="M2 18 L2 2 L18 2" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ── Premium loading screen */
function LoadingOverlay() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center z-20 rounded-2xl"
      style={{ background: 'linear-gradient(135deg,#1C1005 0%,#2C1A08 100%)' }}
    >
      <div className="relative mb-6">
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: 'rgba(201,162,39,0.15)' }}
        />
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ border: '1.5px solid rgba(201,162,39,0.5)', position: 'relative' }}
        >
          <svg className="w-7 h-7" fill="none" stroke="#C9A227" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
      </div>
      <p className="font-playfair italic text-base" style={{ color: 'rgba(253,250,246,0.75)' }}>
        Preparing your virtual tour…
      </p>
    </div>
  );
}

export default function V4VirtualWalkthroughSection() {
  const { open: openConsultationModal } = useConsultationModal();
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      id="v4-walkthrough"
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, rgba(44,31,20,0.05) 0%, transparent 9%), radial-gradient(ellipse 70% 50% at 92% 6%, rgba(255,255,255,0.4) 0%, transparent 55%), radial-gradient(ellipse 60% 60% at 4% 96%, rgba(201,162,39,0.08) 0%, transparent 55%), #F5EDE0',
      }}
    >

      {/* ── Subtle arc lines background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
          <path d="M-120 820 Q360 520 720 660 T1560 820" stroke="#C9A96E" strokeWidth="1.4" />
          <path d="M-120 680 Q360 420 720 540 T1560 680" stroke="#C9A96E" strokeWidth="1.0" />
          <path d="M-120 540 Q360 320 720 420 T1560 540" stroke="#C9A96E" strokeWidth="0.7" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">

        {/* ══ HEADING ══════════════════════════════════════════════ */}
        <div className="text-center mb-12" data-v4-reveal-heading>
          {/* Eyebrow with lines */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px flex-1 max-w-[100px]" style={{ background: 'rgba(180,130,60,0.35)' }} />
            <span className="text-[11px] font-semibold tracking-[0.28em] uppercase" style={{ color: '#B07D3A' }}>
              Virtual Walkthrough
            </span>
            <div className="h-px flex-1 max-w-[100px]" style={{ background: 'rgba(180,130,60,0.35)' }} />
          </div>
          <h2
            className="font-playfair font-normal leading-[1.1] tracking-[-0.02em] mb-2"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', color: '#2C1F14' }}
          >
            Explore Every Corner
          </h2>
          <h2
            className="font-playfair italic font-normal leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', color: '#2C1F14' }}
          >
            Before It Comes Alive
          </h2>
          <p className="text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto" style={{ color: '#6B4C3B' }}>
            Navigate every room, every angle in stunning 360° photorealism —
            before a single wall is built.
          </p>
        </div>

        {/* ══ FEATURE PILLS ROW ════════════════════════════════════ */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8" data-v4-reveal>
          {[
            { icon: '⟳', label: '360° Panoramic' },
            { icon: '◈', label: 'VR Headset Ready' },
            { icon: '⬡', label: '4K Photorealistic' },
            { icon: '⌂', label: '12+ Rooms' },
          ].map((pill) => (
            <div
              key={pill.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(253,250,246,0.80)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(201,162,39,0.30)',
                boxShadow: '0 2px 10px rgba(100,60,20,0.06)',
              }}
            >
              <span style={{ color: '#C9A227', fontSize: '13px' }}>{pill.icon}</span>
              <span className="text-[11px] font-semibold tracking-[0.10em]" style={{ color: '#2C1F14' }}>
                {pill.label}
              </span>
            </div>
          ))}
        </div>

        {/* ══ IFRAME FRAME ═════════════════════════════════════════ */}
        <div data-v4-reveal>
          {/*
            The frame: white card on cream background.
            Like a luxury TV / cinema screen on a table.
            The dark 3D content inside contrasts beautifully with the light frame.
          */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(201,162,39,0.35)',
              boxShadow: '0 24px 80px rgba(100,60,20,0.16), 0 0 0 1px rgba(201,162,39,0.08)',
              padding: '6px',
            }}
          >
            {/* L-bracket corners */}
            <CornerBracket pos="tl" />
            <CornerBracket pos="tr" />
            <CornerBracket pos="bl" />
            <CornerBracket pos="br" />

            {/* ── TOP CHROME BAR */}
            <div
              className="flex items-center justify-between px-4 py-2.5 rounded-t-xl mb-0"
              style={{
                background: 'rgba(44,31,20,0.04)',
                borderBottom: '1px solid rgba(201,162,39,0.15)',
              }}
            >
              {/* Left: Live badge */}
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.28)' }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#C9A227', boxShadow: '0 0 5px #C9A227', animation: 'pulse 2s infinite' }}
                  />
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: '#B07D3A' }}>
                    Live Tour
                  </span>
                </div>
                <span className="text-[11px] hidden md:block" style={{ color: 'rgba(44,31,20,0.40)' }}>
                  Luxora Virtual Experience
                </span>
              </div>

              {/* Center */}
              <span
                className="font-playfair italic text-sm hidden md:block"
                style={{ color: 'rgba(176,125,58,0.75)' }}
              >
                360° Panoramic View
              </span>

              {/* Right: actions */}
              <div className="flex items-center gap-2">
                {/* Share — copy link */}
                <button
                  onClick={() => navigator.clipboard?.writeText(TOUR_URL)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'rgba(44,31,20,0.06)',
                    border: '1px solid rgba(201,162,39,0.20)',
                    color: '#6B4C3B',
                  }}
                  aria-label="Copy tour link"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                {/* Fullscreen */}
                <a
                  href={TOUR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.10em] uppercase transition-all duration-200 hover:scale-105"
                  style={{
                    background: '#C9A227',
                    color: '#1C1005',
                    boxShadow: '0 4px 14px rgba(201,162,39,0.35)',
                  }}
                  aria-label="Open fullscreen"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  Fullscreen
                </a>
              </div>
            </div>

            {/* ── IFRAME */}
            <div
              className="relative rounded-b-xl overflow-hidden"
              style={{ aspectRatio: '21/9' }}
            >
              {!loaded && <LoadingOverlay />}
              <iframe
                src={TOUR_URL}
                className="absolute inset-0 w-full h-full border-0"
                allow="fullscreen; vr; xr-spatial-tracking; gyroscope; accelerometer"
                allowFullScreen
                onLoad={() => setLoaded(true)}
                title="Luxora Virtual Walkthrough"
              />
            </div>

            {/* ── BOTTOM HINT BAR */}
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{ borderTop: '1px solid rgba(201,162,39,0.12)' }}
            >
              <p className="text-[10px] font-light hidden md:block" style={{ color: 'rgba(44,31,20,0.40)' }}>
                Drag to navigate · Scroll to zoom · Double-tap to enter room
              </p>
              <div className="flex items-center gap-2 ml-auto">
                {['VR Ready', '4K Quality', 'Photorealistic'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-[0.12em] uppercase"
                    style={{
                      background: 'rgba(201,162,39,0.10)',
                      color: '#B07D3A',
                      border: '1px solid rgba(201,162,39,0.22)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ STATS — White cards on cream ════════════════════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10" data-v4-reveal>
          {[
            { value: '12', unit: '+', label: 'Rooms Covered'   },
            { value: '360', unit: '°', label: 'Panoramic View' },
            { value: '4K',  unit: '',  label: 'Ultra HD Quality' },
            { value: 'VR',  unit: '',  label: 'Headset Ready'  },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-6 rounded-2xl text-center"
              style={{
                background: 'rgba(253,250,246,0.80)',
                border: '1px solid rgba(201,162,39,0.20)',
                boxShadow: '0 4px 18px rgba(100,60,20,0.05)',
              }}
            >
              <div
                className="font-playfair font-normal leading-none mb-1.5"
                style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)', color: '#2C1F14' }}
              >
                {stat.value}
                <span style={{ color: '#C9A227', fontSize: '0.65em' }}>{stat.unit}</span>
              </div>
              <div
                className="text-[10px] font-semibold tracking-[0.20em] uppercase"
                style={{ color: '#9C7B68' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ══ CTA ═════════════════════════════════════════════════ */}
        <div className="text-center mt-10" data-v4-reveal>
          <p
            className="font-playfair italic mb-4"
            style={{ fontSize: '1.1rem', color: '#6B4C3B' }}
          >
            Want a personalised walkthrough of your dream home?
          </p>
          <button
            type="button"
            onClick={openConsultationModal}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-[11px] tracking-[0.10em] uppercase transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: '#C9A227',
              color: '#1C1005',
              boxShadow: '0 8px 28px rgba(201,162,39,0.30)',
            }}
          >
            Book Free Consultation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}