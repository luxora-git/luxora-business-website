'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const VIRTUAL_TOUR_URL = 'https://luxora.in/virtualtour/viewer/index.php?code=c4ca4238a0b923820dcc509a6f75849b';

const featureBadges = [
  { label: '360° View', icon: 'view360' },
  { label: 'Real Scale', icon: 'scale' },
  { label: 'Material Preview', icon: 'material' },
  { label: 'Lighting Sim', icon: 'lighting' },
  { label: 'VR Ready', icon: 'vr' },
] as const;

export default function VirtualWalkthroughSection() {
  const [isLaunched, setIsLaunched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const handleLaunch = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLaunched(true);
      setIsLoading(false);
    }, 600);
  }, []);

  // Parallax effect
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Background image subtle zoom on scroll
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const offset = window.innerHeight - rect.top;
        if (offset > 0 && rect.top < window.innerHeight) {
          setScrollY(offset * 0.02);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxX = mousePos.x * 8;
  const parallaxY = mousePos.y * 8;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[85vh] md:min-h-[80vh] overflow-hidden bg-[#050B1A]"
    >
      {/* ── CINEMATIC BACKGROUND ── */}
      <div className="absolute inset-0 overflow-hidden">
        {!isLaunched && (
          <>
            {/* Large luxury interior background */}
            <div
              ref={parallaxRef}
              className="absolute inset-0 transition-transform duration-[1500ms] ease-out"
              style={{
                transform: isHovering
                  ? `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px) scale(${1.08 + scrollY * 0.001})`
                  : `scale(${1.05 + scrollY * 0.001})`,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85"
                alt="Luxury Interior"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Cinematic multi-layer gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B1A] via-[#050B1A]/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050B1A]/70 via-transparent to-[#050B1A]/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050B1A]/50 via-transparent to-[#050B1A]/50 pointer-events-none" />
            
            {/* Subtle vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.5)] pointer-events-none" />

            {/* Gold ambient glow from bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-luxora-gold/3 rounded-full blur-[100px] pointer-events-none" />

            {/* Subtle light ray overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_40%,rgba(212,175,55,0.03)_0%,transparent_60%)] pointer-events-none" />
          </>
        )}

        {/* Launched state - fullscreen iframe with transitions */}
        {isLaunched && (
          <div className="absolute inset-0 transition-all duration-700 ease-in-out bg-black">
            <iframe
              src={VIRTUAL_TOUR_URL}
              className="w-full h-full border-0"
              title="Luxora Virtual Tour"
              allow="accelerometer; gyroscope; xr-spatial-tracking"
              allowFullScreen
            />
            {/* Exit button */}
            <button
              onClick={() => setIsLaunched(false)}
              className="absolute top-6 right-6 z-50 flex items-center gap-2 px-5 py-2.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-white/80 hover:text-white hover:bg-black/70 hover:border-white/20 transition-all duration-300 group"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span className="text-sm font-medium tracking-wide">Exit Tour</span>
            </button>
          </div>
        )}
      </div>

      {/* ── CONTENT LAYER ── */}
      {!isLaunched && (
        <div className="relative z-20 flex items-center justify-center min-h-[85vh] md:min-h-[80vh] py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16">
          <div className="w-full max-w-[1200px] mx-auto">
            <div className="flex flex-col items-center text-center">
              {/* ── EYEBROW BADGE ── */}
              <div className="mb-5 md:mb-6 opacity-0 animate-[fadeIn_0.6s_ease-out_0.2s_forwards]">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxora-gold animate-[statusPulse_2s_ease-in-out_infinite]" />
                  <span className="text-luxora-gold/80 text-[9px] md:text-xs font-semibold tracking-[0.2em] uppercase">
                    Immersive Experience
                  </span>
                </span>
              </div>

              {/* ── HEADLINE ── */}
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-[1.08] tracking-tight max-w-3xl opacity-0 animate-[fadeIn_0.8s_ease-out_0.4s_forwards]">
                Step Inside Your{' '}
                <span className="bg-gradient-to-r from-luxora-gold via-[#E8C84A] to-luxora-gold bg-clip-text text-transparent">
                  Dream Space
                </span>
              </h2>

              {/* ── SUBTITLE ── */}
              <p className="text-white/40 text-sm md:text-base lg:text-lg max-w-xl leading-relaxed font-light tracking-wide opacity-0 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]">
                Every finish, every texture, every ray of light — experienced with
                photorealistic precision before a single stone is laid.
              </p>

              {/* ── FEATURE BADGES ROW ── */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6 md:mt-8 opacity-0 animate-[fadeIn_0.8s_ease-out_0.8s_forwards]">
                {featureBadges.map((badge, i) => (
                  <div
                    key={badge.label}
                    className="group relative flex items-center gap-1.5 px-3 py-1.5 md:px-3.5 md:py-2 bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] rounded-full hover:bg-white/[0.08] hover:border-luxora-gold/20 transition-all duration-400 cursor-default"
                    style={{ animationDelay: `${0.8 + i * 0.1}s` }}
                  >
                    {/* Badge Icon */}
                    <span className="text-luxora-gold/60 group-hover:text-luxora-gold transition-colors duration-300">
                      {badge.icon === 'view360' && (
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 md:w-3.5 md:h-3.5">
                          <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.5c-3.59 0-6.5-2.91-6.5-6.5S6.41 3.5 10 3.5s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z" />
                          <circle cx="10" cy="10" r="2" />
                        </svg>
                      )}
                      {badge.icon === 'scale' && (
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 md:w-3.5 md:h-3.5">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.3a5.002 5.002 0 014.7 4.7H17a1 1 0 110 2h-1.3a5.002 5.002 0 01-4.7 4.7V17a1 1 0 11-2 0v-1.3a5.002 5.002 0 01-4.7-4.7H3a1 1 0 110-2h1.3A5.002 5.002 0 019 4.3V3a1 1 0 011-1zm-1 5a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
                        </svg>
                      )}
                      {badge.icon === 'material' && (
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 md:w-3.5 md:h-3.5">
                          <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v12H4V4z" clipRule="evenodd" />
                          <path d="M7 7h6v6H7z" />
                        </svg>
                      )}
                      {badge.icon === 'lighting' && (
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 md:w-3.5 md:h-3.5">
                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zm4.657 1.343a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 10a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 5a5 5 0 100-10 5 5 0 000 10zm-7-5a1 1 0 100-2H2a1 1 0 100 2h1zm3.05-5.536a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0z" />
                        </svg>
                      )}
                      {badge.icon === 'vr' && (
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 md:w-3.5 md:h-3.5">
                          <path d="M15.5 4h-11A4.5 4.5 0 000 8.5v3A4.5 4.5 0 004.5 16h1.76a2.5 2.5 0 002.21-1.34l.74-1.32h1.58l.74 1.32A2.5 2.5 0 0013.74 16h1.76A4.5 4.5 0 0020 11.5v-3A4.5 4.5 0 0015.5 4zM6.5 11a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                        </svg>
                      )}
                    </span>
                    <span className="text-white/60 text-[9px] md:text-xs font-medium tracking-wide group-hover:text-white/80 transition-colors duration-300">
                      {badge.label}
                    </span>

                    {/* Gold shimmer on hover */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-luxora-gold/[0.04] to-transparent" />
                    </div>
                  </div>
                ))}
              </div>

              {/* ── GLASSMORPHISM CARD + PLAY BUTTON ── */}
              <div className="mt-8 md:mt-10 lg:mt-12 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
                <div className="group cursor-pointer" onClick={handleLaunch}>
                  {/* Main Glass Card - Reduced height by ~30% */}
                  <div className="relative glass-premium-card px-6 py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 rounded-xl md:rounded-2xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(212,175,55,0.08)]">
                    {/* Inner border glow */}
                    <div className="absolute inset-0 rounded-xl md:rounded-2xl pointer-events-none overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-luxora-gold/[0.02]" />
                    </div>

                    {/* Play Button - Centerpiece */}
                    <div className="flex flex-col items-center gap-3 md:gap-4">
                      {/* Animated ring container */}
                      <div className="relative flex items-center justify-center">
                        {/* Outer pulse ring */}
                        <div className="absolute w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border border-luxora-gold/20 animate-[dockFloat_3s_ease-in-out_infinite]" />
                        <div className="absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border border-luxora-gold/10 animate-[dockFloat_3s_ease-in-out_0.5s_infinite]" />

                        {/* Glow behind play button */}
                        <div className="absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-luxora-gold/10 blur-xl group-hover:bg-luxora-gold/20 transition-all duration-500" />

                        {/* Play button */}
                        <div className="relative w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-luxora-gold to-[#C4A030] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.35)] transition-all duration-500 group-hover:scale-105 active:scale-95">
                          {/* Gold shimmer overlay */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {isLoading ? (
                            <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-luxora-navy animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-luxora-navy ml-1 md:ml-1.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Card Text */}
                      <div className="text-center">
                        <h3 className="text-white text-base md:text-lg lg:text-xl font-semibold tracking-tight mb-1">
                          {isLoading ? 'Preparing Your Experience...' : 'Enter Virtual Walkthrough'}
                        </h3>
                        <p className="text-white/40 text-[11px] md:text-sm font-light max-w-md">
                          {isLoading
                            ? 'Loading photorealistic environment...'
                            : 'Full 360° navigation · Real-time rendering · No headset required'
                          }
                        </p>
                      </div>

                      {/* Subtle CTA arrow */}
                      <div className={`flex items-center gap-2 text-luxora-gold/60 group-hover:text-luxora-gold transition-all duration-400 ${isLoading ? 'opacity-0' : ''}`}>
                        <span className="text-[9px] md:text-xs font-medium tracking-[0.15em] uppercase">
                          {isLoading ? 'Loading' : 'Begin Experience'}
                        </span>
                        <svg className={`w-3 h-3 transition-transform duration-400 group-hover:translate-x-1 ${isLoading ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {isLoading ? (
                            <circle cx="12" cy="12" r="10" />
                          ) : (
                            <>
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </>
                          )}
                        </svg>
                      </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 w-6 h-6 md:w-8 md:h-8 border-t border-l border-white/[0.06] rounded-tl-lg pointer-events-none" />
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 border-t border-r border-white/[0.06] rounded-tr-lg pointer-events-none" />
                    <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 w-6 h-6 md:w-8 md:h-8 border-b border-l border-white/[0.06] rounded-bl-lg pointer-events-none" />
                    <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-6 h-6 md:w-8 md:h-8 border-b border-r border-white/[0.06] rounded-br-lg pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* ── BOTTOM TRUST INDICATORS ── */}
              <div className="mt-8 md:mt-10 flex items-center justify-center gap-6 md:gap-10 opacity-0 animate-[fadeIn_0.8s_ease-out_1.4s_forwards]">
                <div className="flex items-center gap-2 text-white/30">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[9px] md:text-xs font-medium tracking-wide">Real-time</span>
                </div>
                <div className="w-px h-3 bg-white/[0.08]" />
                <div className="flex items-center gap-2 text-white/30">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[9px] md:text-xs font-medium tracking-wide">Secure</span>
                </div>
                <div className="w-px h-3 bg-white/[0.08]" />
                <div className="flex items-center gap-2 text-white/30">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[9px] md:text-xs font-medium tracking-wide">No App Required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ADDITIONAL CSS ANIMATIONS ── */}
      <style jsx>{`
        .glass-premium-card {
          background: linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.06) 0%,
            rgba(255, 255, 255, 0.03) 50%,
            rgba(255, 255, 255, 0.02) 100%
          );
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 8px 24px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .glass-premium-card:hover {
          background: linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.09) 0%,
            rgba(255, 255, 255, 0.04) 50%,
            rgba(255, 255, 255, 0.03) 100%
          );
          border-color: rgba(212, 175, 55, 0.15);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.4),
            0 12px 32px rgba(0, 0, 0, 0.2),
            0 0 60px rgba(212, 175, 55, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        @keyframes dockFloat {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-6px); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}