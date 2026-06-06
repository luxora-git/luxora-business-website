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

const sceneToastMap: Record<SceneKey, string> = {
  morning: '☀ Good Morning — Natural daylight activated',
  work: '💼 Focus Mode — Privacy & security engaged',
  movie: '🎬 Cinema Experience — Room optimized for viewing',
  sleep: '🌙 Sleep Comfort — Room prepared for rest',
};

const deviceToastMap: Record<keyof State, { on: string; off: string }> = {
  light: { on: '✨ Evening ambience activated', off: '💡 Lights turned off' },
  curtain: { on: '🪟 Privacy mode enabled', off: '🪟 Curtains opened — natural light entering' },
  tv: { on: '🎬 Entertainment mode ready', off: '📺 TV turned off' },
  ac: { on: '❄ Climate control active — Cooling to 24°C', off: '🌡 AC turned off' },
  security: { on: '🔒 Home secured — Perimeter monitoring active', off: '🟢 Security disabled — System disarmed' },
};

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
    icon: 'light',
    onLabel: 'ON',
    offLabel: 'OFF',
  },
  {
    key: 'curtain' as keyof State,
    label: 'Curtain',
    icon: 'curtain',
    onLabel: 'CLOSED',
    offLabel: 'OPEN',
  },
  {
    key: 'tv' as keyof State,
    label: 'TV',
    icon: 'tv',
    onLabel: 'ON',
    offLabel: 'OFF',
  },
  {
    key: 'ac' as keyof State,
    label: 'AC',
    icon: 'ac',
    onLabel: 'ON',
    offLabel: 'OFF',
  },
  {
    key: 'security' as keyof State,
    label: 'Security',
    icon: 'security',
    onLabel: 'ARMED',
    offLabel: 'DISARMED',
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
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastProgress, setToastProgress] = useState(100);
  const [osStatus, setOsStatus] = useState<'connected' | 'updating'>('connected');
  const [coolingTextVisible, setCoolingTextVisible] = useState(false);
  const [hoveredDevice, setHoveredDevice] = useState<keyof State | null>(null);
  const preloadRef = useRef<HTMLImageElement | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const osTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const coolingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastProgressRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  function showToast(msg: string) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    if (toastProgressRef.current) clearInterval(toastProgressRef.current);
    setToastMessage(msg);
    setToastProgress(100);
    setToastVisible(true);

    let elapsed = 0;
    const totalDuration = 2500;
    toastProgressRef.current = setInterval(() => {
      elapsed += 30;
      const remaining = Math.max(0, 100 - (elapsed / totalDuration) * 100);
      setToastProgress(remaining);
      if (remaining <= 0) {
        if (toastProgressRef.current) clearInterval(toastProgressRef.current);
      }
    }, 30);

    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
      if (toastProgressRef.current) clearInterval(toastProgressRef.current);
    }, 2500);
  }

  function triggerOsUpdate() {
    setOsStatus('updating');
    if (osTimerRef.current) clearTimeout(osTimerRef.current);
    osTimerRef.current = setTimeout(() => setOsStatus('connected'), 1200);
  }

  function triggerCoolingText() {
    if (state.ac) {
      setCoolingTextVisible(true);
      if (coolingTimerRef.current) clearTimeout(coolingTimerRef.current);
      coolingTimerRef.current = setTimeout(() => setCoolingTextVisible(false), 3000);
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
          setTimeout(() => { setIsTransitioning(false); }, 450);
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

  function handleToggle(key: keyof State) {
    const nextVal = !state[key];
    const next = { ...state, [key]: nextVal };
    setState(next);
    setActiveScene(null);
    const toast = deviceToastMap[key];
    showToast(nextVal ? toast.on : toast.off);
    triggerOsUpdate();
    crossfade(targetImage(next));

    if (key === 'ac' && nextVal) {
      triggerCoolingText();
    }
  }

  function applyScene(key: SceneKey) {
    const preset = scenePresets[key];
    const next = { ...state, ...preset };
    setState(next);
    setActiveScene(key);
    showToast(sceneToastMap[key]);
    triggerOsUpdate();
    crossfade(targetImage(next));

    if (next.ac) {
      setCoolingTextVisible(true);
      if (coolingTimerRef.current) clearTimeout(coolingTimerRef.current);
      coolingTimerRef.current = setTimeout(() => setCoolingTextVisible(false), 3000);
    }
  }

  useEffect(() => {
    const initial = targetImage(state);
    setTopImage(initial);
    setBottomImage(initial);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (osTimerRef.current) clearTimeout(osTimerRef.current);
      if (coolingTimerRef.current) clearTimeout(coolingTimerRef.current);
      if (toastProgressRef.current) clearInterval(toastProgressRef.current);
    };
  }, []);

  const activeCount = [state.light, state.curtain, state.tv, state.ac, state.security].filter(Boolean).length;

  // ── Device Icon Renderer ──
  function renderDeviceIcon(key: string, active: boolean) {
    const gold = '#D4AF37';
    const inactive = 'rgba(255,255,255,0.35)';
    const c = active ? gold : inactive;

    switch (key) {
      case 'light':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-7 md:h-7" style={{ color: c }}>
            <path d="M12 2C7.03 2 3 6.03 3 11c0 3.17 1.59 5.96 4 7.66V20c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1.34c2.41-1.7 4-4.49 4-7.66 0-4.97-4.03-9-9-9z" fill="currentColor"/>
          </svg>
        );
      case 'curtain':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-7 md:h-7" style={{ color: c }}>
            <rect x="2" y="4" width="20" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        );
      case 'tv':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-7 md:h-7" style={{ color: c }}>
            <rect x="2" y="5" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="8" y1="22" x2="16" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        );
      case 'ac':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-7 md:h-7" style={{ color: c }}>
            <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="12" y1="6" x2="12" y2="18" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M7 12C7 12 8.5 10 12 10C15.5 10 17 12 17 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M7 15C7 15 8.5 17 12 17C15.5 17 17 15 17 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        );
      case 'security':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-7 md:h-7" style={{ color: c }}>
            <path d="M12 2L4 8v7c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V8l-9-4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            {active && <path d="M9 13l2.5 2.5L16 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>}
          </svg>
        );
      default:
        return null;
    }
  }

  // ── Scene Icon Renderer ──
  function renderSceneIcon(icon: string, active: boolean) {
    const activeColor = '#D4AF37';
    const inactiveColor = 'rgba(255,255,255,0.4)';
    const c = active ? activeColor : inactiveColor;

    switch (icon) {
      case 'morning':
        return (
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: c }}>
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-4-4a4 4 0 00-4 4h8a4 4 0 00-4-4z" />
          </svg>
        );
      case 'work':
        return (
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: c }}>
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v2H6V4zm0 4h8v2H6V8zm0 4h8v2H6v-2z" clipRule="evenodd" />
          </svg>
        );
      case 'movie':
        return (
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: c }}>
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        );
      case 'sleep':
        return (
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: c }}>
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        );
      default:
        return null;
    }
  }

  return (
    <section id="smart-living" className="py-16 md:py-24 bg-[#0A1F44] overflow-hidden relative">
      {/* ── Background ambient glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxora-gold/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/3 rounded-full blur-[100px]" />
      </div>

      {/* ── PREMIUM TOAST NOTIFICATION ── */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-[400ms] ease-out pointer-events-none ${
          toastVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-3'
        }`}
      >
        <div className="glass-dark rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4">
            <span className="inline-block text-lg" style={{ animation: toastVisible ? 'glideInLeft 0.35s ease-out' : 'none' }}>
              {toastMessage?.charAt(0) || ''}
            </span>
            <span className="text-white text-sm md:text-base font-medium tracking-tight whitespace-nowrap">
              {toastMessage}
            </span>
          </div>
          <div className="h-[2px] bg-white/5 w-full">
            <div
              className="h-full bg-gradient-to-r from-luxora-gold/60 via-luxora-gold to-luxora-gold/60 transition-all duration-[100ms] ease-linear rounded-full"
              style={{ width: `${toastProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        {/* ── Section Header ── */}
        <div className="text-center mb-8 md:mb-10">
          <span className="text-luxora-gold text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase mb-2 block">
            Smart Living Experience 2.0
          </span>
          <h2 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight leading-[1.1]">
            Control Your Home With A Single Touch
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light">
            Experience intelligent lighting, climate control, entertainment and security integrated
            into one seamless luxury ecosystem.
          </p>
        </div>

        {/* ── HERO IMAGE WITH OVERLAYED DOCK ── */}
        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden">
          {/* ── IMAGE CONTAINER ── */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] min-h-[320px] md:min-h-[420px] lg:min-h-[500px] overflow-hidden">
            {/* Bottom layer */}
            <div
              className="absolute inset-0 transition-opacity duration-[450ms] ease-in-out"
              style={{ opacity: 1 - topOpacity }}
            >
              {bottomImage && (
                <img
                  src={bottomImage}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-[450ms] ease-in-out"
                  style={{ pointerEvents: 'none', transform: `scale(${imageScale})` }}
                />
              )}
            </div>
            {/* Top layer */}
            <div
              className="absolute inset-0 transition-opacity duration-[450ms] ease-in-out"
              style={{ opacity: topOpacity }}
            >
              {topImage && (
                <img
                  src={topImage}
                  alt="Smart Living Room"
                  className="w-full h-full object-cover transition-transform duration-[450ms] ease-in-out"
                  style={{ pointerEvents: 'none', transform: `scale(${imageScale})` }}
                />
              )}
            </div>

            {/* Cinematic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/70 via-transparent to-[#0A1F44]/10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/20 via-transparent to-[#0A1F44]/20 pointer-events-none" />

            {/* ── TV state is communicated by the room images loaded above ── */}
            {/* No artificial overlay divs. The base images naturally show TV ON/OFF. */}

            {/* Security perimeter glow when ARMED */}
            {state.security && (
              <>
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl md:rounded-3xl"
                  style={{ animation: 'securityGlow 2.5s ease-in-out infinite' }}
                />
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl md:rounded-3xl">
                  <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-400/50 to-transparent shadow-[0_0_6px_rgba(239,68,68,0.3)]" style={{ animation: 'scanLine 2.8s ease-in-out infinite' }} />
                </div>
                <div className="absolute top-3 left-3 w-5 h-5 border-t-[2px] border-l-[2px] border-red-400/40 rounded-tl-sm" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-[2px] border-r-[2px] border-red-400/40 rounded-tr-sm" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-[2px] border-l-[2px] border-red-400/40 rounded-bl-sm" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-[2px] border-r-[2px] border-red-400/40 rounded-br-sm" />
              </>
            )}

            {/* AC cool-air effects */}
            {state.ac && (
              <>
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-4/5 h-24 opacity-30">
                    <div className="flex items-center justify-center gap-2">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-gradient-to-t from-blue-400/70 to-blue-300/20 rounded-full"
                          style={{
                            height: `${14 + Math.sin(i * 0.7) * 16}px`,
                            animation: `acWave 1.8s ease-in-out ${i * 0.2}s infinite`,
                            transformOrigin: 'center bottom',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                          left: `${10 + (i * 8) % 80}%`,
                          top: `${5 + (i * 7) % 85}%`,
                          background: i % 2 === 0
                            ? 'rgba(147, 197, 253, 0.4)'
                            : 'rgba(191, 219, 254, 0.5)',
                          boxShadow: i % 3 === 0
                            ? '0 0 4px rgba(147, 197, 253, 0.3)'
                            : 'none',
                          animation: `coolFloat ${2.5 + (i % 5) * 0.4}s ease-in-out ${i * 0.25}s infinite`,
                        }}
                      />
                    ))}
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={`snow-${i}`}
                        className="absolute text-blue-200/30"
                        style={{
                          left: `${15 + i * 22}%`,
                          top: `${8 + (i % 3) * 12}%`,
                          fontSize: '7px',
                          animation: `snowflakeFloat ${3 + i * 0.3}s ease-in-out ${i * 0.5}s infinite`,
                        }}
                      >
                        ❄
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── TOP-LEFT: LUXORA SMART OS BADGE ── */}
            <div className="absolute top-4 left-4 z-20">
              <div className="flex items-center gap-2.5 px-3.5 py-2 bg-black/40 backdrop-blur-[16px] border border-white/8 rounded-xl">
                <div className="relative flex items-center justify-center w-2 h-2">
                  <div
                    className={`absolute inset-0 rounded-full ${
                      osStatus === 'connected' ? 'bg-luxora-gold/30' : 'bg-amber-400/30'
                    }`}
                    style={{ animation: osStatus === 'connected' ? 'statusPulse 2s ease-in-out infinite' : 'none', transform: 'scale(2.2)' }}
                  />
                  <div
                    className={`w-2 h-2 rounded-full relative z-10 ${
                      osStatus === 'connected' ? 'bg-luxora-gold' : 'bg-amber-400'
                    }`}
                    style={{ animation: osStatus === 'connected' ? 'statusPulse 2s ease-in-out infinite' : 'none' }}
                  />
                </div>
                <span className="text-white/60 text-[9px] tracking-[0.15em] uppercase font-semibold hidden sm:inline">
                  Luxora OS
                </span>
                <span className={`text-[8px] font-medium tracking-wide transition-colors duration-[350ms] ${
                  osStatus === 'connected' ? 'text-green-400' : 'text-amber-400'
                }`}>
                  {osStatus === 'connected' ? '● Connected' : '⟳ Updating...'}
                </span>
              </div>
            </div>

            {/* ── TOP-RIGHT: SECURITY / AC BADGES ── */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
              {/* Security ARMED badge */}
              {state.security && (
                <div style={{ animation: 'lockPulse 2.5s ease-in-out infinite' }}>
                  <div className="flex items-center gap-2 px-3.5 py-2 bg-black/50 backdrop-blur-[16px] border border-red-500/30 rounded-xl">
                    <svg className="w-3.5 h-3.5 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                    </svg>
                    <span className="text-red-300 text-[9px] tracking-[0.12em] uppercase font-semibold whitespace-nowrap">Armed</span>
                  </div>
                </div>
              )}
              {/* Security DISARMED badge */}
              {!state.security && (
                <div className="flex items-center gap-2 px-3.5 py-2 bg-black/30 backdrop-blur-[16px] border border-white/8 rounded-xl">
                  <svg className="w-3.5 h-3.5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                  <span className="text-white/30 text-[9px] tracking-[0.12em] uppercase font-medium">Disarmed</span>
                </div>
              )}
              {/* AC badge */}
              {state.ac && (
                <div className="flex items-center gap-2 px-3.5 py-2 bg-black/40 backdrop-blur-[16px] border border-blue-400/30 rounded-xl">
                  <svg className="w-3.5 h-3.5 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="4" y="6" width="16" height="12" rx="2" />
                    <line x1="12" y1="6" x2="12" y2="18" />
                    <path d="M8 12C8 12 9 10 12 10C15 10 16 12 16 12" strokeLinecap="round" />
                    <path d="M8 14C8 14 9 16 12 16C15 16 16 14 16 14" strokeLinecap="round" />
                  </svg>
                  <span className="text-blue-200 text-[9px] font-medium">24°C</span>
                </div>
              )}
              {/* Cooling text */}
              {coolingTextVisible && (
                <div
                  className="px-3 py-1.5 bg-blue-500/20 backdrop-blur-[8px] border border-blue-400/30 rounded-lg"
                  style={{ animation: 'coolingText 3s ease-out forwards' }}
                >
                  <span className="text-blue-200 text-[9px] font-medium whitespace-nowrap">❄ Cooling to 24°C</span>
                </div>
              )}
            </div>

            {/* ── BOTTOM-LEFT: ROOM STATE ── */}
            <div className="absolute bottom-4 left-4 z-20">
              <div className="px-3.5 py-2 bg-black/40 backdrop-blur-[16px] border border-white/8 rounded-xl">
                <span className="text-white/60 text-[9px] tracking-[0.15em] uppercase font-medium">
                  {state.light ? 'LIT' : 'DIM'} · {state.tv ? 'SHOWING' : 'STANDBY'} · {state.curtain ? 'PRIVACY' : 'OPEN'}
                </span>
              </div>
            </div>

            {/* ── BOTTOM-RIGHT: ACTIVE COUNT ── */}
            <div className="absolute bottom-4 right-4 z-20">
              <div className="px-3.5 py-2 bg-black/40 backdrop-blur-[16px] border border-white/8 rounded-xl">
                <span className="text-white/40 text-[9px] font-medium tracking-wide">{activeCount}/5 Active</span>
              </div>
            </div>

            {/* ── FLOATING GLASS CONTROL DOCK ── */}
            <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center pb-4 md:pb-6">
              <div
                className="glass-dock rounded-2xl md:rounded-3xl px-3 md:px-6 py-3 md:py-4 mx-3 md:mx-6 w-auto max-w-[95vw] md:max-w-none"
                style={{ animation: 'dockFloat 4s ease-in-out infinite' }}
              >
                {/* Gold accent top line */}
                <div className="absolute top-0 left-[10%] right-[10%] h-[1px] dock-divider rounded-full" />

                {/* ── DEVICE CONTROLS ROW ── */}
                <div className="flex items-center justify-center gap-1 md:gap-3">
                  {deviceConfig.map((cfg) => {
                    const on = state[cfg.key];
                    const isHovered = hoveredDevice === cfg.key;

                    return (
                      <button
                        key={cfg.key}
                        onClick={() => handleToggle(cfg.key)}
                        onMouseEnter={() => setHoveredDevice(cfg.key)}
                        onMouseLeave={() => setHoveredDevice(null)}
                        className={`device-icon-btn relative flex flex-col items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-2 md:py-3 rounded-xl md:rounded-2xl transition-all duration-[300ms] ${
                          on
                            ? 'device-active-glow bg-white/8 border border-white/10'
                            : 'bg-white/3 border border-transparent hover:bg-white/6'
                        } ${isHovered ? 'scale-[1.05]' : ''}`}
                      >
                        {/* Active indicator dot */}
                        {on && (
                          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-luxora-gold shadow-[0_0_4px_rgba(212,175,55,0.5)]" />
                        )}

                        {/* Icon */}
                        <div className={`relative transition-all duration-[300ms] ${
                          on ? 'scale-110' : 'opacity-80 group-hover:opacity-100'
                        }`}>
                          {renderDeviceIcon(cfg.icon, on)}
                          {on && (
                            <div
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
                                animation: 'devicePulse 2.5s ease-in-out infinite',
                                filter: 'blur(4px)',
                                transform: 'scale(1.5)',
                              }}
                            />
                          )}
                        </div>

                        {/* Label */}
                        <span className={`text-[9px] md:text-[10px] font-semibold tracking-tight transition-colors duration-[300ms] ${
                          on ? 'text-white' : 'text-white/50'
                        }`}>
                          {cfg.label}
                        </span>

                        {/* State indicator */}
                        <span className={`text-[7px] md:text-[8px] font-bold tracking-[0.1em] uppercase transition-all duration-[300ms] ${
                          on
                            ? 'text-luxora-gold'
                            : 'text-white/20'
                        }`}>
                          {on ? cfg.onLabel : cfg.offLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* ── DIVIDER ── */}
                <div className="my-2 md:my-3 h-[1px] dock-divider rounded-full mx-2" />

                {/* ── SCENE PILLS ROW ── */}
                <div className="flex items-center justify-center gap-1.5 md:gap-2.5">
                  {scenes.map((scene) => {
                    const isActive = activeScene === scene.key;
                    return (
                      <button
                        key={scene.key}
                        onClick={() => applyScene(scene.key)}
                        className={`scene-pill-premium relative flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2 rounded-full transition-all duration-[300ms] ${
                          isActive
                            ? 'bg-white/12 border border-luxora-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                            : 'bg-white/5 border border-white/5 hover:bg-white/8'
                        }`}
                      >
                        {renderSceneIcon(scene.icon, isActive)}
                        <span className={`text-[10px] md:text-xs font-semibold tracking-tight transition-colors duration-[300ms] ${
                          isActive ? 'text-white' : 'text-white/50'
                        }`}>
                          {scene.label}
                        </span>
                        {isActive && (
                          <div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{ animation: 'scenePillGlow 2.5s ease-in-out infinite' }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* ── STATUS CHIPS ── */}
                <div className="mt-2.5 md:mt-3 flex items-center justify-center gap-2 md:gap-3 flex-wrap">
                  <div className="status-chip px-2.5 py-1 rounded-md" style={{ animationDelay: '0ms' }}>
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${state.light ? 'bg-luxora-gold shadow-[0_0_4px_rgba(212,175,55,0.5)]' : 'bg-white/15'}`} />
                      <span className={`text-[8px] md:text-[9px] font-medium ${state.light ? 'text-white/80' : 'text-white/30'}`}>
                        Light {state.light ? 'ON' : 'OFF'}
                      </span>
                    </span>
                  </div>
                  <div className="status-chip px-2.5 py-1 rounded-md" style={{ animationDelay: '50ms' }}>
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${state.curtain ? 'bg-luxora-gold shadow-[0_0_4px_rgba(212,175,55,0.5)]' : 'bg-white/15'}`} />
                      <span className={`text-[8px] md:text-[9px] font-medium ${state.curtain ? 'text-white/80' : 'text-white/30'}`}>
                        Curtain {state.curtain ? 'CLOSED' : 'OPEN'}
                      </span>
                    </span>
                  </div>
                  <div className="status-chip px-2.5 py-1 rounded-md" style={{ animationDelay: '100ms' }}>
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${state.tv ? 'bg-luxora-gold shadow-[0_0_4px_rgba(212,175,55,0.5)]' : 'bg-white/15'}`} />
                      <span className={`text-[8px] md:text-[9px] font-medium ${state.tv ? 'text-white/80' : 'text-white/30'}`}>
                        TV {state.tv ? 'ON' : 'OFF'}
                      </span>
                    </span>
                  </div>
                  <div className="status-chip px-2.5 py-1 rounded-md" style={{ animationDelay: '150ms' }}>
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${state.ac ? 'bg-blue-400 shadow-[0_0_4px_rgba(96,165,250,0.5)]' : 'bg-white/15'}`} />
                      <span className={`text-[8px] md:text-[9px] font-medium ${state.ac ? 'text-white/80' : 'text-white/30'}`}>
                        AC {state.ac ? 'ON' : 'OFF'}
                      </span>
                    </span>
                  </div>
                  <div className="status-chip px-2.5 py-1 rounded-md" style={{ animationDelay: '200ms' }}>
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${state.security ? 'bg-red-400 shadow-[0_0_4px_rgba(248,113,113,0.5)]' : 'bg-white/15'}`} />
                      <span className={`text-[8px] md:text-[9px] font-medium ${state.security ? 'text-white/80' : 'text-white/30'}`}>
                        Security {state.security ? 'ARMED' : 'DISARMED'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}