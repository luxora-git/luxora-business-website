'use client';

import { useState, useEffect, useRef } from 'react';

const IMG = {
  base: 'https://luxora.in/wp-content/uploads/2025/10/luxora-living-new.jpg',
  tv: 'https://luxora.in/wp-content/uploads/2025/10/luxora-living-tv-on.jpg',
  curtain: 'https://luxora.in/wp-content/uploads/2025/10/luxora-living-curtain-close.jpg',
  both: 'https://luxora.in/wp-content/uploads/2025/10/luxora-living-tv-on-curtain-close.jpg',
  lightOff: 'https://luxora.in/wp-content/uploads/2025/10/luxora-living-curtain-open-tv-off-light-off.jpg',
  tvLightOff: 'https://luxora.in/wp-content/uploads/2025/10/Made-with-FlexClip-AI-2025-10-15T131104.jpg',
  curtainLightOff: 'https://luxora.in/wp-content/uploads/2025/10/luxora-living-curtain-close-tv-off-light-off.jpg',
  bothLightOff: 'https://luxora.in/wp-content/uploads/2025/10/Made-with-FlexClip-AI-2025-10-15T171156.jpg',
};

interface State {
  light: boolean;
  curtain: boolean;
  tv: boolean;
  ac: boolean;
  security: boolean;
}

type SceneKey = 'morning' | 'work' | 'movie' | 'sleep';

const scenes: { key: SceneKey; label: string; icon: string }[] = [
  { key: 'morning', label: 'Morning', icon: 'morning' },
  { key: 'work', label: 'Work', icon: 'work' },
  { key: 'movie', label: 'Movie', icon: 'movie' },
  { key: 'sleep', label: 'Sleep', icon: 'sleep' },
];

const scenePresets: Record<SceneKey, Partial<State>> = {
  morning: { light: true, curtain: false, tv: false, ac: false, security: false },
  work:    { light: false, curtain: true, tv: false, ac: false, security: true },
  movie:   { light: false, curtain: true, tv: true, ac: true, security: false },
  sleep:   { light: false, curtain: false, tv: false, ac: true, security: false },
};

export default function SmartLivingSection() {
  const [state, setState] = useState<State>({
    light: true,
    curtain: false,
    tv: false,
    ac: false,
    security: false,
  });
  const [activeScene, setActiveScene] = useState<SceneKey | null>(null);
  const [topImage, setTopImage] = useState('');
  const [bottomImage, setBottomImage] = useState('');
  const [topOpacity, setTopOpacity] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const preloadRef = useRef<HTMLImageElement | null>(null);

  // ─── Image combination logic ──────────────────
  function targetImage(s: State): string {
    if (s.light) {
      if (s.tv && s.curtain) return IMG.both;
      if (s.tv && !s.curtain) return IMG.tv;
      if (!s.tv && s.curtain) return IMG.curtain;
      return IMG.base;
    } else {
      if (s.tv && s.curtain) return IMG.bothLightOff;
      if (s.tv && !s.curtain) return IMG.tvLightOff;
      if (!s.tv && s.curtain) return IMG.curtainLightOff;
      return IMG.lightOff;
    }
  }

  // ─── Crossfade function ───────────────────────
  function crossfade(toURL: string) {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const img = new Image();
    preloadRef.current = img;
    img.onload = () => {
      setBottomImage(topImage);
      setTopImage(toURL);
      setTopOpacity(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTopOpacity(1);
          setTimeout(() => { setIsTransitioning(false); }, 450);
        });
      });
    };
    img.src = toURL;
  }

  // ─── Update state + image + dash ──────────────
  function updateState(next: State) {
    setState(next);
    setActiveScene(null);
    crossfade(targetImage(next));
  }

  // ─── Individual toggles ───────────────────────
  function toggleLight() { updateState({ ...state, light: !state.light }); }
  function toggleCurtain() { updateState({ ...state, curtain: !state.curtain }); }
  function toggleTV() { updateState({ ...state, tv: !state.tv }); }
  function toggleAC() { setState((prev) => ({ ...prev, ac: !prev.ac })); }
  function toggleSecurity() { setState((prev) => ({ ...prev, security: !prev.security })); }

  // ─── Scene handler ────────────────────────────
  function applyScene(key: SceneKey) {
    const preset = scenePresets[key];
    const next = { ...state, ...preset };
    setState(next);
    setActiveScene(key);
    crossfade(targetImage(next));
  }

  // ─── Initial load ─────────────────────────────
  useEffect(() => {
    const initial = targetImage(state);
    setTopImage(initial);
    setBottomImage(initial);
  }, []);

  // ─── Helper: is a device ON ───────────────────
  function isOn(key: keyof State): boolean {
    return state[key];
  }

  return (
    <section id="smart-living" className="py-20 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-luxora-gold text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-3 block">
            Smart Living Experience
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-luxora-navy mb-3">
            Control Your Home With A Single Touch
          </h2>
          <p className="text-luxora-charcoal/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Experience intelligent lighting, climate control, entertainment and security integrated
            into one seamless luxury ecosystem.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[6fr_4fr] gap-6 lg:gap-8 items-stretch">
          {/* ───── LEFT IMAGE PANEL ───── */}
          <div className="relative w-full h-[350px] sm:h-[420px] md:h-[500px] lg:h-full min-h-[400px] lg:min-h-[580px] overflow-hidden rounded-2xl">
            {/* Bottom layer */}
            <div
              className="absolute inset-0 transition-opacity duration-[450ms] ease-in-out"
              style={{ opacity: 1 - topOpacity }}
            >
              {bottomImage && (
                <img src={bottomImage} alt="" className="w-full h-full object-cover" style={{ pointerEvents: 'none' }} />
              )}
            </div>
            {/* Top layer */}
            <div
              className="absolute inset-0 transition-opacity duration-[450ms] ease-in-out"
              style={{ opacity: topOpacity }}
            >
              {topImage && (
                <img src={topImage} alt="Smart Living Room" className="w-full h-full object-cover" style={{ pointerEvents: 'none' }} />
              )}
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Security overlay when ARMED */}
            {state.security && (
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'rgba(0,180,255,0.08)' }} />
            )}

            {/* Corner decorative accents */}
            <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-white/15 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-white/15 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-white/15 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-white/15 rounded-br-lg pointer-events-none" />

            {/* SECURITY ARMED badge - top-right */}
            {state.security && (
              <div className="absolute top-5 right-5 z-10">
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 backdrop-blur-md border border-blue-400/30 rounded-lg">
                  <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                  <span className="text-blue-200 text-[10px] tracking-[0.15em] uppercase font-semibold whitespace-nowrap">🛡 Security Armed</span>
                </div>
              </div>
            )}

            {/* State badge - bottom-left */}
            <div className="absolute bottom-5 left-5 z-10">
              <div className="px-3 py-1.5 bg-black/30 backdrop-blur-md border border-white/10 rounded-lg">
                <span className="text-white/80 text-[10px] tracking-[0.15em] uppercase font-medium">
                  {state.light ? 'LIT' : 'DIM'} · {state.tv ? 'SHOWING' : 'STANDBY'} · {state.curtain ? 'PRIVACY' : 'OPEN'}
                </span>
              </div>
            </div>

            {/* AC cool-air effect */}
            {state.ac && (
              <div className="absolute top-16 right-5 z-10 flex items-center gap-2 px-3 py-2 bg-blue-500/10 backdrop-blur-md border border-blue-400/20 rounded-lg">
                <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="6" width="16" height="12" rx="2" />
                  <line x1="12" y1="6" x2="12" y2="18" />
                  <path d="M8 12C8 12 9 10 12 10C15 10 16 12 16 12" strokeLinecap="round" />
                  <path d="M8 14C8 14 9 16 12 16C15 16 16 14 16 14" strokeLinecap="round" />
                </svg>
                <span className="text-blue-200 text-[10px] font-medium">24°C · Cooling</span>
              </div>
            )}

            {/* AC airflow wave animation on the image */}
            {state.ac && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-16 opacity-20">
                  <div className="flex items-center justify-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-4 bg-blue-300 rounded-full"
                        style={{
                          animation: `acWave 1.5s ease-in-out ${i * 0.2}s infinite`,
                          transformOrigin: 'center bottom',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ───── RIGHT CONTROL DASHBOARD ───── */}
          <div className="backdrop-blur-[20px] bg-white/70 border border-white/40 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-6 md:p-8 flex flex-col">

            {/* ── LIVE STATUS ── */}
            <div className="mb-6 p-4 md:p-5 rounded-xl bg-white/50 border border-white/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxora-gold animate-pulse" />
                  <span className="text-[11px] tracking-[0.2em] uppercase text-luxora-charcoal/50 font-semibold">Live Status</span>
                </div>
                <span className="text-[11px] tracking-[0.15em] uppercase text-green-500 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Connected
                </span>
              </div>
              <div className="space-y-2.5">
                {([
                  { key: 'light' as keyof State, label: 'Light' },
                  { key: 'tv' as keyof State, label: 'TV' },
                  { key: 'curtain' as keyof State, label: 'Curtain' },
                  { key: 'ac' as keyof State, label: 'AC' },
                  { key: 'security' as keyof State, label: 'Security' },
                ]).map(({ key, label }) => {
                  const on = isOn(key);
                  let displayVal: string;
                  if (key === 'curtain') displayVal = on ? 'CLOSED' : 'OPEN';
                  else if (key === 'security') displayVal = on ? 'ARMED' : 'DISARMED';
                  else displayVal = on ? 'ON' : 'OFF';

                  return (
                    <div key={key} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/40 transition-colors">
                      <span className={`text-[12px] md:text-[13px] tracking-[0.12em] uppercase font-semibold ${
                        on ? 'text-luxora-navy' : 'text-luxora-charcoal/35'
                      }`}>
                        {label}
                      </span>
                      <span className={`text-[12px] md:text-[13px] font-bold ${
                        key === 'security' && on ? 'text-green-500' :
                        key === 'ac' && on ? 'text-blue-500' :
                        on ? 'text-luxora-gold' : 'text-luxora-charcoal/25'
                      }`}>
                        {displayVal}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── DEVICE CARDS ── */}
            <div className="grid grid-cols-5 gap-2.5 md:gap-3 mb-6">
              {/* LIGHT */}
              <button onClick={toggleLight}
                className={`relative flex flex-col items-center justify-center gap-2 py-4 px-1 rounded-xl transition-all duration-500 group ${
                  state.light
                    ? 'bg-gradient-to-b from-luxora-gold/15 to-luxora-gold/5 border border-luxora-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'bg-white/60 border border-white/20 hover:bg-white/80 hover:border-white/40 shadow-sm'
                }`}
              >
                {state.light && (
                  <>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-luxora-gold/10 via-transparent to-transparent pointer-events-none animate-pulse" style={{ animationDuration: '3s' }} />
                    <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5">
                      <span className="absolute inset-0 rounded-full bg-luxora-gold/40 animate-ping" />
                      <span className="absolute inset-[2px] rounded-full bg-luxora-gold" />
                    </div>
                  </>
                )}
                <svg viewBox="0 0 28 28" fill="none" className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] relative z-10" style={{ color: state.light ? '#D4AF37' : 'rgba(17,17,17,0.3)' }}>
                  <path d="M14 2C9.03 2 5 6.03 5 11c0 3.17 1.59 5.96 4 7.66V20c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1.34c2.41-1.7 4-4.49 4-7.66 0-4.97-4.03-9-9-9z" fill="currentColor"/>
                  <path d="M10 25c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2h-8v2z" fill="currentColor" opacity="0.5"/>
                </svg>
                <span className={`relative z-10 text-[10px] md:text-[11px] tracking-[0.12em] uppercase font-semibold ${
                  state.light ? 'text-luxora-navy' : 'text-luxora-charcoal/35'
                }`}>Light</span>
                <span className={`relative z-10 text-[9px] md:text-[10px] font-medium ${
                  state.light ? 'text-luxora-gold' : 'text-luxora-charcoal/20'
                }`}>{state.light ? 'ON' : 'OFF'}</span>
              </button>

              {/* CURTAIN */}
              <button onClick={toggleCurtain}
                className={`relative flex flex-col items-center justify-center gap-2 py-4 px-1 rounded-xl transition-all duration-500 group ${
                  state.curtain
                    ? 'bg-gradient-to-b from-luxora-gold/15 to-luxora-gold/5 border border-luxora-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'bg-white/60 border border-white/20 hover:bg-white/80 hover:border-white/40 shadow-sm'
                }`}
              >
                {state.curtain && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-luxora-gold/10 via-transparent to-transparent pointer-events-none animate-pulse" style={{ animationDuration: '3s' }} />
                )}
                <svg viewBox="0 0 28 28" fill="none" className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] relative z-10" style={{ color: state.curtain ? '#D4AF37' : 'rgba(17,17,17,0.3)' }}>
                  <rect x="3" y="4" width="22" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <line x1="14" y1="4" x2="14" y2="24" stroke="currentColor" strokeWidth="1.5"/>
                  {state.curtain ? (
                    <g opacity="0.25"><line x1="14" y1="8" x2="25" y2="8" stroke="currentColor" strokeWidth="0.8"/><line x1="14" y1="12" x2="25" y2="12" stroke="currentColor" strokeWidth="0.8"/><line x1="14" y1="16" x2="25" y2="16" stroke="currentColor" strokeWidth="0.8"/><line x1="14" y1="20" x2="25" y2="20" stroke="currentColor" strokeWidth="0.8"/></g>
                  ) : (
                    <g opacity="0.25"><line x1="3" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="0.8"/><line x1="3" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="0.8"/><line x1="3" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="0.8"/><line x1="3" y1="20" x2="14" y2="20" stroke="currentColor" strokeWidth="0.8"/></g>
                  )}
                </svg>
                <span className={`relative z-10 text-[10px] md:text-[11px] tracking-[0.12em] uppercase font-semibold ${
                  state.curtain ? 'text-luxora-navy' : 'text-luxora-charcoal/35'
                }`}>Curtain</span>
                <span className={`relative z-10 text-[9px] md:text-[10px] font-medium ${
                  state.curtain ? 'text-luxora-gold' : 'text-luxora-charcoal/20'
                }`}>{state.curtain ? 'CLOSED' : 'OPEN'}</span>
              </button>

              {/* TV */}
              <button onClick={toggleTV}
                className={`relative flex flex-col items-center justify-center gap-2 py-4 px-1 rounded-xl transition-all duration-500 group ${
                  state.tv
                    ? 'bg-gradient-to-b from-luxora-gold/15 to-luxora-gold/5 border border-luxora-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'bg-white/60 border border-white/20 hover:bg-white/80 hover:border-white/40 shadow-sm'
                }`}
              >
                {state.tv && (
                  <>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-luxora-gold/10 via-transparent to-transparent pointer-events-none animate-pulse" style={{ animationDuration: '3s' }} />
                    <div className="absolute -top-0.5 -right-0.5">
                      <span className="block w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    </div>
                  </>
                )}
                <svg viewBox="0 0 28 28" fill="none" className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] relative z-10" style={{ color: state.tv ? '#D4AF37' : 'rgba(17,17,17,0.3)' }}>
                  <rect x="2" y="5" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="9" y1="25" x2="19" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="14" y1="21" x2="14" y2="25" stroke="currentColor" strokeWidth="1.5"/>
                  {state.tv && <circle cx="14" cy="13" r="4" fill="currentColor" opacity="0.5"/>}
                </svg>
                <span className={`relative z-10 text-[10px] md:text-[11px] tracking-[0.12em] uppercase font-semibold ${
                  state.tv ? 'text-luxora-navy' : 'text-luxora-charcoal/35'
                }`}>TV</span>
                <span className={`relative z-10 text-[9px] md:text-[10px] font-medium ${
                  state.tv ? 'text-luxora-gold' : 'text-luxora-charcoal/20'
                }`}>{state.tv ? 'ON' : 'OFF'}</span>
              </button>

              {/* AC */}
              <button onClick={toggleAC}
                className={`relative flex flex-col items-center justify-center gap-2 py-4 px-1 rounded-xl transition-all duration-500 group ${
                  state.ac
                    ? 'bg-gradient-to-b from-blue-50/80 to-blue-50/40 border border-blue-200/60 shadow-[0_0_20px_rgba(59,130,246,0.12)]'
                    : 'bg-white/60 border border-white/20 hover:bg-white/80 hover:border-white/40 shadow-sm'
                }`}
              >
                {state.ac && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-blue-100/20 via-transparent to-transparent pointer-events-none" />
                )}
                <svg viewBox="0 0 28 28" fill="none" className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] relative z-10" style={{ color: state.ac ? '#3B82F6' : 'rgba(17,17,17,0.3)' }}>
                  <rect x="4" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="14" y1="7" x2="14" y2="21" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M9 14C9 14 10.5 12 14 12C17.5 12 19 14 19 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity={state.ac ? 1 : 0.3}/>
                  <path d="M9 16.5C9 16.5 10.5 18.5 14 18.5C17.5 18.5 19 16.5 19 16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity={state.ac ? 1 : 0.3}/>
                </svg>
                <span className={`relative z-10 text-[10px] md:text-[11px] tracking-[0.12em] uppercase font-semibold ${
                  state.ac ? 'text-blue-600' : 'text-luxora-charcoal/35'
                }`}>AC</span>
                <span className={`relative z-10 text-[9px] md:text-[10px] font-medium ${
                  state.ac ? 'text-blue-500' : 'text-luxora-charcoal/20'
                }`}>{state.ac ? 'ON' : 'OFF'}</span>
              </button>

              {/* SECURITY */}
              <button onClick={toggleSecurity}
                className={`relative flex flex-col items-center justify-center gap-2 py-4 px-1 rounded-xl transition-all duration-500 group ${
                  state.security
                    ? 'bg-gradient-to-b from-green-50/80 to-green-50/40 border border-green-300/50 shadow-[0_0_20px_rgba(34,197,94,0.12)]'
                    : 'bg-white/60 border border-white/20 hover:bg-white/80 hover:border-white/40 shadow-sm'
                }`}
              >
                {state.security && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-green-100/20 via-transparent to-transparent pointer-events-none" />
                )}
                <svg viewBox="0 0 28 28" fill="none" className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] relative z-10" style={{ color: state.security ? '#22C55E' : 'rgba(17,17,17,0.3)' }}>
                  <path d="M14 2L4 8v7c0 6.3 4.38 12.2 10 14 5.62-1.8 10-7.7 10-14V8l-10-6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  {state.security && <path d="M10 14.5l2.5 2.5L18 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>}
                </svg>
                <span className={`relative z-10 text-[10px] md:text-[11px] tracking-[0.12em] uppercase font-semibold ${
                  state.security ? 'text-green-600' : 'text-luxora-charcoal/35'
                }`}>Security</span>
                <span className={`relative z-10 text-[9px] md:text-[10px] font-medium ${
                  state.security ? 'text-green-500' : 'text-luxora-charcoal/20'
                }`}>{state.security ? 'ARMED' : 'OFF'}</span>
              </button>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-luxora-gold/15 to-transparent mb-6" />

            {/* ── QUICK SCENES ── */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-luxora-charcoal/40 font-semibold">Quick Scenes</span>
                <div className="flex-1 h-[1px] bg-luxora-charcoal/5" />
              </div>
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {scenes.map((scene) => {
                  const isActive = activeScene === scene.key;
                  return (
                    <button
                      key={scene.key}
                      onClick={() => applyScene(scene.key)}
                      className={`relative py-3 px-2 rounded-xl text-[9px] md:text-[10px] tracking-[0.12em] uppercase font-semibold transition-all duration-500 border ${
                        isActive
                          ? 'bg-luxora-navy border-luxora-navy text-white shadow-lg'
                          : 'bg-white/40 border-white/20 text-luxora-charcoal/50 hover:bg-white/70 hover:border-luxora-gold/30 hover:text-luxora-navy'
                      }`}
                    >
                      <div className="flex justify-center mb-1">
                        {scene.icon === 'morning' && (
                          <svg viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${isActive ? 'text-luxora-gold' : 'text-luxora-charcoal/30'}`}>
                            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-4-4a4 4 0 00-4 4h8a4 4 0 00-4-4z" />
                          </svg>
                        )}
                        {scene.icon === 'work' && (
                          <svg viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${isActive ? 'text-luxora-gold' : 'text-luxora-charcoal/30'}`}>
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v2H6V4zm0 4h8v2H6V8zm0 4h8v2H6v-2z" clipRule="evenodd" />
                          </svg>
                        )}
                        {scene.icon === 'movie' && (
                          <svg viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${isActive ? 'text-luxora-gold' : 'text-luxora-charcoal/30'}`}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        )}
                        {scene.icon === 'sleep' && (
                          <svg viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${isActive ? 'text-luxora-gold' : 'text-luxora-charcoal/30'}`}>
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                          </svg>
                        )}
                      </div>
                      {scene.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}