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

const scenes: { key: SceneKey; label: string; description: string; icon: string }[] = [
  { key: 'morning', label: 'Morning', description: 'Natural daylight setup', icon: 'morning' },
  { key: 'work', label: 'Work', description: 'Focused productivity', icon: 'work' },
  { key: 'movie', label: 'Movie', description: 'Cinema experience', icon: 'movie' },
  { key: 'sleep', label: 'Sleep', description: 'Night comfort mode', icon: 'sleep' },
];

const scenePresets: Record<SceneKey, Partial<State>> = {
  morning: { light: true, curtain: false, tv: false, ac: false, security: false },
  work:    { light: false, curtain: true, tv: false, ac: false, security: true },
  movie:   { light: false, curtain: true, tv: true, ac: true, security: false },
  sleep:   { light: false, curtain: false, tv: false, ac: true, security: false },
};

const deviceConfig = [
  {
    key: 'light' as keyof State,
    label: 'Light',
    description: 'Lighting ambience and mood',
    onLabel: 'ON',
    offLabel: 'OFF',
    activeClass: 'bg-gradient-to-b from-luxora-gold/15 to-luxora-gold/5 border border-luxora-gold/30 shadow-[0_0_25px_rgba(212,175,55,0.15)]',
    inactiveClass: 'bg-white/40 border border-white/10 hover:bg-white/60 hover:border-white/30',
    activeText: 'text-luxora-gold',
    activeBadge: 'text-luxora-gold',
  },
  {
    key: 'curtain' as keyof State,
    label: 'Curtain',
    description: 'Natural light control',
    onLabel: 'CLOSED',
    offLabel: 'OPEN',
    activeClass: 'bg-gradient-to-b from-luxora-gold/15 to-luxora-gold/5 border border-luxora-gold/30 shadow-[0_0_25px_rgba(212,175,55,0.15)]',
    inactiveClass: 'bg-white/40 border border-white/10 hover:bg-white/60 hover:border-white/30',
    activeText: 'text-luxora-gold',
    activeBadge: 'text-luxora-gold',
  },
  {
    key: 'tv' as keyof State,
    label: 'TV',
    description: 'Entertainment mode',
    onLabel: 'ON',
    offLabel: 'OFF',
    activeClass: 'bg-gradient-to-b from-luxora-gold/15 to-luxora-gold/5 border border-luxora-gold/30 shadow-[0_0_25px_rgba(212,175,55,0.15)]',
    inactiveClass: 'bg-white/40 border border-white/10 hover:bg-white/60 hover:border-white/30',
    activeText: 'text-luxora-gold',
    activeBadge: 'text-luxora-gold',
  },
  {
    key: 'ac' as keyof State,
    label: 'AC',
    description: 'Climate control',
    onLabel: 'ON',
    offLabel: 'OFF',
    activeClass: 'bg-gradient-to-b from-blue-50/80 to-blue-50/40 border border-blue-200/60 shadow-[0_0_25px_rgba(59,130,246,0.12)]',
    inactiveClass: 'bg-white/40 border border-white/10 hover:bg-white/60 hover:border-white/30',
    activeText: 'text-blue-500',
    activeBadge: 'text-blue-500',
  },
  {
    key: 'security' as keyof State,
    label: 'Security',
    description: 'Home protection system',
    onLabel: 'ARMED',
    offLabel: 'DISARMED',
    activeClass: 'bg-gradient-to-b from-green-50/80 to-green-50/40 border border-green-300/50 shadow-[0_0_25px_rgba(34,197,94,0.12)]',
    inactiveClass: 'bg-white/40 border border-white/10 hover:bg-white/60 hover:border-white/30',
    activeText: 'text-green-500',
    activeBadge: 'text-green-500',
  },
];

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
  const [imageScale, setImageScale] = useState(1);
  const preloadRef = useRef<HTMLImageElement | null>(null);

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

  function crossfade(toURL: string) {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const img = new Image();
    preloadRef.current = img;
    img.onload = () => {
      setImageScale(1.05);
      setBottomImage(topImage);
      setTopImage(toURL);
      setTopOpacity(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTopOpacity(1);
          setImageScale(1);
          setTimeout(() => { setIsTransitioning(false); }, 500);
        });
      });
    };
    img.src = toURL;
  }

  function updateState(next: State) {
    setState(next);
    setActiveScene(null);
    crossfade(targetImage(next));
  }

  function toggleLight() { updateState({ ...state, light: !state.light }); }
  function toggleCurtain() { updateState({ ...state, curtain: !state.curtain }); }
  function toggleTV() { updateState({ ...state, tv: !state.tv }); }
  function toggleAC() { setState((prev) => ({ ...prev, ac: !prev.ac })); }
  function toggleSecurity() { setState((prev) => ({ ...prev, security: !prev.security })); }

  function applyScene(key: SceneKey) {
    const preset = scenePresets[key];
    const next = { ...state, ...preset };
    setState(next);
    setActiveScene(key);
    crossfade(targetImage(next));
  }

  useEffect(() => {
    const initial = targetImage(state);
    setTopImage(initial);
    setBottomImage(initial);
  }, []);

  return (
    <section id="smart-living" className="py-20 md:py-28 bg-white overflow-hidden">
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

        {/* Two-Column Layout: 70% Image / 30% Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6 lg:gap-8">
          {/* ───── LEFT: IMAGE ───── */}
          <div className="relative w-full h-[350px] sm:h-[420px] md:h-[500px] lg:h-full min-h-[400px] lg:min-h-[580px] overflow-hidden rounded-3xl">
            {/* Bottom layer */}
            <div
              className="absolute inset-0 transition-opacity duration-500 ease-in-out"
              style={{ opacity: 1 - topOpacity }}
            >
              {bottomImage && (
                <img
                  src={bottomImage}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  style={{ pointerEvents: 'none', transform: `scale(${imageScale})` }}
                />
              )}
            </div>
            {/* Top layer */}
            <div
              className="absolute inset-0 transition-opacity duration-500 ease-in-out"
              style={{ opacity: topOpacity }}
            >
              {topImage && (
                <img
                  src={topImage}
                  alt="Smart Living Room"
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  style={{ pointerEvents: 'none', transform: `scale(${imageScale})` }}
                />
              )}
            </div>

            {/* Luxury dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />

            {/* Security perimeter glow when ARMED */}
            {state.security && (
              <div className="absolute inset-0 pointer-events-none rounded-3xl shadow-[inset_0_0_60px_rgba(220,38,38,0.15),inset_0_0_120px_rgba(220,38,38,0.05)]" />
            )}

            {/* State badge - bottom-left */}
            <div className="absolute bottom-5 left-5 z-10">
              <div className="px-4 py-2 bg-black/40 backdrop-blur-[12px] border border-white/10 rounded-xl">
                <span className="text-white/80 text-[10px] tracking-[0.15em] uppercase font-medium">
                  {state.light ? 'LIT' : 'DIM'} · {state.tv ? 'SHOWING' : 'STANDBY'} · {state.curtain ? 'PRIVACY' : 'OPEN'}
                </span>
              </div>
            </div>

            {/* Security badge — top-right */}
            {state.security && (
              <div className="absolute top-5 right-5 z-10">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-black/50 backdrop-blur-[12px] border border-red-500/30 rounded-xl">
                  <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                  <span className="text-red-300 text-[10px] tracking-[0.12em] uppercase font-semibold whitespace-nowrap">Security Armed</span>
                </div>
              </div>
            )}

            {/* Security DISARMED badge */}
            {!state.security && (
              <div className="absolute top-5 right-5 z-10">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-black/30 backdrop-blur-[12px] border border-white/10 rounded-xl">
                  <svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                  <span className="text-white/40 text-[10px] tracking-[0.12em] uppercase font-medium">Disarmed</span>
                </div>
              </div>
            )}

            {/* AC badge + cool-air wave */}
            {state.ac && (
              <>
                <div className="absolute top-16 right-5 z-10">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-black/40 backdrop-blur-[12px] border border-blue-400/30 rounded-xl">
                    <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="4" y="6" width="16" height="12" rx="2" />
                      <line x1="12" y1="6" x2="12" y2="18" />
                      <path d="M8 12C8 12 9 10 12 10C15 10 16 12 16 12" strokeLinecap="round" />
                      <path d="M8 14C8 14 9 16 12 16C15 16 16 14 16 14" strokeLinecap="round" />
                    </svg>
                    <span className="text-blue-200 text-[10px] font-medium">24°C · Cooling</span>
                  </div>
                </div>
                {/* Animated cool-air wave */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-4/5 h-24 opacity-25">
                    <div className="flex items-center justify-center gap-2">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-gradient-to-t from-blue-400/60 to-blue-300/20 rounded-full"
                          style={{
                            height: `${12 + Math.sin(i * 0.8) * 14}px`,
                            animation: `acWave 2s ease-in-out ${i * 0.25}s infinite`,
                            transformOrigin: 'center bottom',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Floating blue particles */}
                  <div className="absolute inset-0">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                        style={{
                          left: `${30 + i * 12}%`,
                          top: `${15 + (i % 3) * 20}%`,
                          animation: `acFloat ${2.5 + i * 0.3}s ease-in-out ${i * 0.4}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ───── RIGHT: LUXURY CONTROL PANEL ───── */}
          <div className="bg-white/60 backdrop-blur-[20px] border border-white/40 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] p-6 md:p-8 flex flex-col gap-6">

            {/* ── PREMIUM HEADER ── */}
            <div>
              <h3 className="font-playfair text-xl md:text-2xl font-bold text-luxora-navy tracking-tight">
                Luxury Smart Living
              </h3>
              <p className="text-luxora-charcoal/50 text-xs md:text-sm font-light leading-relaxed mt-1.5">
                Control lighting, comfort, entertainment and security with a single touch.
              </p>
            </div>

            {/* ── DEVICE CARDS ── */}
            <div className="grid grid-cols-1 gap-3">
              {deviceConfig.map((cfg) => {
                const on = state[cfg.key];
                const toggleFn = {
                  light: toggleLight,
                  curtain: toggleCurtain,
                  tv: toggleTV,
                  ac: toggleAC,
                  security: toggleSecurity,
                }[cfg.key];

                return (
                  <button
                    key={cfg.key}
                    onClick={toggleFn}
                    className={`group relative flex items-center justify-between w-full px-5 py-4 rounded-2xl transition-all duration-400 ${
                      on ? cfg.activeClass : cfg.inactiveClass
                    }`}
                  >
                    {/* Active glow pulse */}
                    {on && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/5 via-transparent to-transparent pointer-events-none animate-pulse" style={{ animationDuration: '3s' }} />
                    )}

                    {/* Left: icon + label */}
                    <div className="flex items-center gap-3.5 relative z-10">
                      {/* Icon */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-400 ${
                        on ? 'bg-luxora-gold/10' : 'bg-luxora-charcoal/5'
                      }`}>
                        {/* Light */}
                        {cfg.key === 'light' && (
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" style={{ color: on ? '#D4AF37' : 'rgba(17,17,17,0.3)' }}>
                            <path d="M12 2C7.03 2 3 6.03 3 11c0 3.17 1.59 5.96 4 7.66V20c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1.34c2.41-1.7 4-4.49 4-7.66 0-4.97-4.03-9-9-9z" fill="currentColor"/>
                          </svg>
                        )}
                        {/* Curtain */}
                        {cfg.key === 'curtain' && (
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" style={{ color: on ? '#D4AF37' : 'rgba(17,17,17,0.3)' }}>
                            <rect x="2" y="4" width="20" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        )}
                        {/* TV */}
                        {cfg.key === 'tv' && (
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" style={{ color: on ? '#D4AF37' : 'rgba(17,17,17,0.3)' }}>
                            <rect x="2" y="5" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                            <line x1="8" y1="22" x2="16" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        )}
                        {/* AC */}
                        {cfg.key === 'ac' && (
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" style={{ color: on ? '#3B82F6' : 'rgba(17,17,17,0.3)' }}>
                            <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                            <line x1="12" y1="6" x2="12" y2="18" stroke="currentColor" strokeWidth="1.2"/>
                            <path d="M7 12C7 12 8.5 10 12 10C15.5 10 17 12 17 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                            <path d="M7 15C7 15 8.5 17 12 17C15.5 17 17 15 17 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                          </svg>
                        )}
                        {/* Security */}
                        {cfg.key === 'security' && (
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" style={{ color: on ? '#22C55E' : 'rgba(17,17,17,0.3)' }}>
                            <path d="M12 2L4 8v7c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V8l-9-4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            {on && <path d="M9 13l2.5 2.5L16 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>}
                          </svg>
                        )}
                      </div>

                      {/* Label + description */}
                      <div className="text-left">
                        <span className={`block text-[13px] md:text-sm font-semibold tracking-tight transition-colors duration-400 ${
                          on ? 'text-luxora-navy' : 'text-luxora-charcoal/40'
                        }`}>
                          {cfg.label}
                        </span>
                        <span className={`block text-[10px] md:text-[11px] font-light transition-colors duration-400 ${
                          on ? 'text-luxora-charcoal/50' : 'text-luxora-charcoal/25'
                        }`}>
                          {cfg.description}
                        </span>
                      </div>
                    </div>

                    {/* Right: ON/OFF badge */}
                    <div className={`relative z-10 px-3 py-1 rounded-lg text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase transition-all duration-400 ${
                      on
                        ? `${cfg.activeBadge} bg-white/60 border border-white/40 shadow-sm`
                        : 'text-luxora-charcoal/20 bg-transparent border border-transparent'
                    }`}>
                      {on ? cfg.onLabel : cfg.offLabel}
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </button>
                );
              })}
            </div>

            {/* ── SCENES ── */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-luxora-charcoal/40 font-semibold">Quick Scenes</span>
                <div className="flex-1 h-px bg-luxora-charcoal/5" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {scenes.map((scene) => {
                  const isActive = activeScene === scene.key;
                  return (
                    <button
                      key={scene.key}
                      onClick={() => applyScene(scene.key)}
                      className={`relative text-left p-3.5 rounded-2xl transition-all duration-400 border ${
                        isActive
                          ? 'bg-luxora-navy border-luxora-navy shadow-lg shadow-black/10'
                          : 'bg-white/30 border-white/20 hover:bg-white/60 hover:border-luxora-gold/30'
                      }`}
                    >
                      {/* Icon row */}
                      <div className="flex items-center gap-2 mb-1.5">
                        {scene.icon === 'morning' && (
                          <svg viewBox="0 0 20 20" fill="currentColor" className={`w-3.5 h-3.5 ${isActive ? 'text-luxora-gold' : 'text-luxora-charcoal/30'}`}>
                            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-4-4a4 4 0 00-4 4h8a4 4 0 00-4-4z" />
                          </svg>
                        )}
                        {scene.icon === 'work' && (
                          <svg viewBox="0 0 20 20" fill="currentColor" className={`w-3.5 h-3.5 ${isActive ? 'text-luxora-gold' : 'text-luxora-charcoal/30'}`}>
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v2H6V4zm0 4h8v2H6V8zm0 4h8v2H6v-2z" clipRule="evenodd" />
                          </svg>
                        )}
                        {scene.icon === 'movie' && (
                          <svg viewBox="0 0 20 20" fill="currentColor" className={`w-3.5 h-3.5 ${isActive ? 'text-luxora-gold' : 'text-luxora-charcoal/30'}`}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        )}
                        {scene.icon === 'sleep' && (
                          <svg viewBox="0 0 20 20" fill="currentColor" className={`w-3.5 h-3.5 ${isActive ? 'text-luxora-gold' : 'text-luxora-charcoal/30'}`}>
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                          </svg>
                        )}
                        <span className={`text-[11px] font-semibold tracking-tight ${
                          isActive ? 'text-white' : 'text-luxora-charcoal/60'
                        }`}>
                          {scene.label}
                        </span>
                      </div>
                      <span className={`block text-[9px] font-light ${
                        isActive ? 'text-white/50' : 'text-luxora-charcoal/30'
                      }`}>
                        {scene.description}
                      </span>
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