'use client';

import { useState, useEffect, useRef } from 'react';

/* ─── Image map ──────────────────────────────────────────────────── */
const IMG = {
  base:            'https://luxora.in/wp-content/uploads/2025/10/luxora-living-new.jpg',
  tv:              'https://luxora.in/wp-content/uploads/2025/10/luxora-living-tv-on.jpg',
  curtain:         'https://luxora.in/wp-content/uploads/2025/10/luxora-living-curtain-close.jpg',
  both:            'https://luxora.in/wp-content/uploads/2025/10/luxora-living-tv-on-curtain-close.jpg',
  lightOff:        'https://luxora.in/wp-content/uploads/2025/10/luxora-living-curtain-open-tv-off-light-off.jpg',
  tvLightOff:      'https://luxora.in/wp-content/uploads/2025/10/Made-with-FlexClip-AI-2025-10-15T131104.jpg',
  curtainLightOff: 'https://luxora.in/wp-content/uploads/2025/10/luxora-living-curtain-close-tv-off-light-off.jpg',
  bothLightOff:    'https://luxora.in/wp-content/uploads/2025/10/Made-with-FlexClip-AI-2025-10-15T171156.jpg',
};

interface State { light: boolean; curtain: boolean; tv: boolean; ac: boolean; security: boolean; }
type SceneKey = 'morning' | 'work' | 'movie' | 'sleep';

const scenePresets: Record<SceneKey, Partial<State>> = {
  morning: { light: true,  curtain: false, tv: false, ac: false, security: false },
  work:    { light: false, curtain: true,  tv: false, ac: false, security: true  },
  movie:   { light: false, curtain: true,  tv: true,  ac: true,  security: false },
  sleep:   { light: false, curtain: false, tv: false, ac: true,  security: false },
};

const toastMap = {
  device: {
    light:    { on: '✨ Evening ambience activated',              off: '💡 Lights turned off'                     },
    curtain:  { on: '🪟 Privacy mode enabled',                   off: '🪟 Curtains opened — natural light entering' },
    tv:       { on: '🎬 Entertainment mode ready',               off: '📺 TV turned off'                          },
    ac:       { on: '❄ Climate control active — Cooling to 24°C',off: '🌡 AC turned off'                          },
    security: { on: '🔒 Home secured',                           off: '🟢 Security disabled'                      },
  },
  scene: {
    morning: '☀ Good Morning — Natural daylight activated',
    work:    '💼 Focus Mode — Privacy & security engaged',
    movie:   '🎬 Cinema Experience — Room optimized for viewing',
    sleep:   '🌙 Sleep Comfort — Room prepared for rest',
  },
};

/* ─── Device config with SVG icons ──────────────────────────────── */
const devices: {
  key: keyof State; label: string; sublabel: string; onLabel: string; offLabel: string;
  icon: React.ReactNode;
}[] = [
  {
    key: 'light', label: 'Ambient Lighting', sublabel: 'Ceiling & accent lights', onLabel: 'ON', offLabel: 'OFF',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  },
  {
    key: 'curtain', label: 'Smart Curtains', sublabel: 'Privacy & light control', onLabel: 'CLOSED', offLabel: 'OPEN',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16M20 4v16M4 12h4m8 0h4M8 4v16M16 4v16" /></svg>,
  },
  {
    key: 'tv', label: 'Television', sublabel: 'Entertainment system', onLabel: 'ON', offLabel: 'STANDBY',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="13" rx="2"/><path strokeLinecap="round" d="M8 20h8M12 17v3"/><path strokeLinecap="round" d="M7 3l5 4 5-4"/></svg>,
  },
  {
    key: 'ac', label: 'Climate Control', sublabel: 'Cooling to 24°C', onLabel: 'ON', offLabel: 'OFF',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364"/><circle cx="12" cy="12" r="3"/></svg>,
  },
  {
    key: 'security', label: 'Security System', sublabel: 'Perimeter monitoring', onLabel: 'ARMED', offLabel: 'OFF',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9a12.02 12.02 0 00-.382-3.016z" /></svg>,
  },
];

const scenes: { key: SceneKey; label: string; icon: string; desc: string }[] = [
  { key: 'morning', label: 'Morning', icon: '☀',  desc: 'Natural light'   },
  { key: 'work',    label: 'Work',    icon: '💼',  desc: 'Focus mode'      },
  { key: 'movie',   label: 'Movie',   icon: '🎬',  desc: 'Cinema mode'     },
  { key: 'sleep',   label: 'Sleep',   icon: '🌙',  desc: 'Rest mode'       },
];

/* ─── iOS Toggle ─────────────────────────────────────────────────── */
function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      style={{
        width: 50, height: 28, borderRadius: 14, flexShrink: 0,
        background: on ? '#C9A227' : '#DDD5C5',
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.25s',
        boxShadow: on ? '0 0 0 3px rgba(201,162,39,0.15)' : 'none',
      }}
    >
      <div style={{
        position: 'absolute', width: 22, height: 22, borderRadius: '50%',
        background: '#FFFFFF', top: 3,
        left: on ? 25 : 3,
        transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
      }} />
    </div>
  );
}

export default function V4SmartLivingSection() {
  const [state, setState]             = useState<State>({ light: true, curtain: false, tv: false, ac: false, security: false });
  const [activeScene, setActiveScene] = useState<SceneKey | null>(null);
  const [topImage, setTopImage]       = useState('');
  const [bottomImage, setBottomImage] = useState('');
  const [topOpacity, setTopOpacity]   = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [toast, setToast]             = useState({ msg: '', visible: false });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function targetImage(s: State) {
    if (s.light) {
      if (s.tv && s.curtain) return IMG.both;
      if (s.tv)              return IMG.tv;
      if (s.curtain)         return IMG.curtain;
      return IMG.base;
    }
    if (s.tv && s.curtain) return IMG.bothLightOff;
    if (s.tv)              return IMG.tvLightOff;
    if (s.curtain)         return IMG.curtainLightOff;
    return IMG.lightOff;
  }

  function showToast(msg: string) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ msg, visible: true });
    timerRef.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2600);
  }

  function crossfade(toURL: string) {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const img = new window.Image();
    img.onload = () => {
      setBottomImage(topImage || toURL);
      setTopImage(toURL);
      setTopOpacity(0);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setTopOpacity(1);
        setTimeout(() => setIsTransitioning(false), 480);
      }));
    };
    img.src = toURL;
  }

  function handleToggle(key: keyof State) {
    const next = { ...state, [key]: !state[key] };
    setState(next); setActiveScene(null);
    showToast(state[key] ? toastMap.device[key].off : toastMap.device[key].on);
    crossfade(targetImage(next));
  }

  function applyScene(key: SceneKey) {
    const next = { ...state, ...scenePresets[key] };
    setState(next); setActiveScene(key);
    showToast(toastMap.scene[key]);
    crossfade(targetImage(next));
  }

  useEffect(() => {
    const init = targetImage(state);
    setTopImage(init); setBottomImage(init);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const activeCount = Object.values(state).filter(Boolean).length;

  return (
    <section
      id="v4-smart-living"
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          'linear-gradient(to bottom, rgba(44,31,20,0.05) 0%, transparent 9%), radial-gradient(ellipse 70% 50% at 94% 4%, rgba(255,255,255,0.45) 0%, transparent 55%), radial-gradient(ellipse 60% 60% at 2% 98%, rgba(201,162,39,0.09) 0%, transparent 55%), #F5EDE0',
      }}
    >
      {/* ── Background arc lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
          <path d="M-120 820 Q360 520 720 660 T1560 820" stroke="#C9A96E" strokeWidth="1.4" />
          <path d="M-120 680 Q360 420 720 540 T1560 680" stroke="#C9A96E" strokeWidth="1.0" />
          <path d="M-120 540 Q360 320 720 420 T1560 540" stroke="#C9A96E" strokeWidth="0.7" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Heading */}
        <div className="text-center mb-12" data-v4-reveal-heading>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px flex-1 max-w-[100px]" style={{ background: 'rgba(180,130,60,0.35)' }} />
            <span className="text-[11px] font-semibold tracking-[0.28em] uppercase" style={{ color: '#B07D3A' }}>
              Smart Home Automation
            </span>
            <div className="h-px flex-1 max-w-[100px]" style={{ background: 'rgba(180,130,60,0.35)' }} />
          </div>
          <h2
            className="font-playfair font-normal leading-[1.1] tracking-[-0.02em] mb-3"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', color: '#2C1F14' }}
          >
            Live Smarter
          </h2>
          <h2
            className="font-playfair italic font-normal leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', color: '#2C1F14' }}
          >
            With Luxora
          </h2>
          <p className="text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto" style={{ color: '#6B4C3B' }}>
            Control lighting, climate, entertainment and security from one seamless interface.
          </p>
        </div>

        {/* ── Main card */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            border: '1px solid rgba(180,140,95,0.20)',
            boxShadow: '0 24px 80px rgba(100,60,20,0.14)',
          }}
          data-v4-reveal
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]" style={{ minHeight: '620px' }}>

            {/* ── LEFT: Full image — no crop ── */}
            <div className="relative overflow-hidden" style={{ minHeight: '460px' }}>
              {/* Crossfade layers */}
              <div
                className="absolute inset-0 transition-opacity duration-[480ms]"
                style={{ opacity: 1 - topOpacity }}
              >
                {bottomImage && (
                  <img src={bottomImage} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div
                className="absolute inset-0 transition-opacity duration-[480ms]"
                style={{ opacity: topOpacity }}
              >
                {topImage && (
                  <img src={topImage} alt="Smart Living Room" className="w-full h-full object-cover" />
                )}
              </div>

              {/* Active devices overlay — top left */}
              <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                {devices.map((d) => (
                  <div
                    key={d.key}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300"
                    style={{
                      background: state[d.key] ? 'rgba(201,162,39,0.90)' : 'rgba(253,250,246,0.75)',
                      border: state[d.key] ? 'none' : '1px solid rgba(160,120,80,0.20)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: state[d.key] ? '#FFFFFF' : 'rgba(44,31,20,0.25)' }}
                    />
                    <span
                      className="text-[10px] font-semibold tracking-wide"
                      style={{ color: state[d.key] ? '#1C1005' : '#6B4C3B' }}
                    >
                      {d.key.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Active count — bottom left */}
              <div
                className="absolute bottom-5 left-5 px-4 py-2 rounded-full backdrop-blur-sm"
                style={{
                  background: 'rgba(253,250,246,0.92)',
                  border: '1px solid rgba(160,120,80,0.18)',
                  boxShadow: '0 4px 16px rgba(100,60,20,0.10)',
                }}
              >
                <span className="text-[11px] font-semibold" style={{ color: '#2C1F14' }}>
                  <span style={{ color: '#C9A227' }}>{activeCount}</span>
                  <span style={{ color: '#9C7B68' }}>/5 Active</span>
                </span>
              </div>

              {/* Gradient for panel edge */}
              <div
                className="absolute inset-y-0 right-0 w-16 hidden lg:block"
                style={{ background: 'linear-gradient(to right, transparent, rgba(253,250,246,0.08))' }}
              />
            </div>

            {/* ── RIGHT: Premium control panel ── */}
            <div
              className="flex flex-col"
              style={{
                background: '#FDFAF6',
                borderLeft: '1px solid rgba(180,140,95,0.14)',
              }}
            >
              {/* DEVICES section */}
              <div className="flex-1 px-6 pt-7 pb-5">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-5 h-px" style={{ background: '#C9A227' }} />
                  <span
                    className="text-[10px] font-bold tracking-[0.24em] uppercase"
                    style={{ color: '#9C7B68' }}
                  >
                    Devices
                  </span>
                </div>

                {/* iOS-style toggle list */}
                <div className="flex flex-col">
                  {devices.map((d, i) => (
                    <div
                      key={d.key}
                      className="flex items-center gap-3.5 py-3.5 cursor-pointer group"
                      style={{ borderBottom: i < devices.length - 1 ? '1px solid rgba(180,140,95,0.10)' : 'none' }}
                      onClick={() => handleToggle(d.key)}
                    >
                      {/* Icon circle */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{
                          background: state[d.key]
                            ? 'rgba(201,162,39,0.14)'
                            : 'rgba(44,31,20,0.05)',
                          color: state[d.key] ? '#C9A227' : '#9C7B68',
                        }}
                      >
                        {d.icon}
                      </div>

                      {/* Label */}
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm font-medium leading-tight"
                          style={{ color: '#2C1F14' }}
                        >
                          {d.label}
                        </div>
                        <div
                          className="text-[11px] font-light mt-0.5"
                          style={{ color: '#9C7B68' }}
                        >
                          {state[d.key] ? d.onLabel : d.offLabel}
                        </div>
                      </div>

                      {/* iOS Toggle */}
                      <Toggle on={state[d.key]} onToggle={() => handleToggle(d.key)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="mx-6">
                <div
                  className="h-px"
                  style={{ background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.30), transparent)' }}
                />
              </div>

              {/* SCENES section */}
              <div className="px-6 pt-5 pb-7">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-5 h-px" style={{ background: '#C9A227' }} />
                  <span
                    className="text-[10px] font-bold tracking-[0.24em] uppercase"
                    style={{ color: '#9C7B68' }}
                  >
                    Scenes
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {scenes.map((scene) => {
                    const isActive = activeScene === scene.key;
                    return (
                      <button
                        key={scene.key}
                        onClick={() => applyScene(scene.key)}
                        className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl transition-all duration-300 text-left"
                        style={{
                          background: isActive ? '#2C1F14' : 'rgba(44,31,20,0.05)',
                          border: isActive
                            ? '1px solid transparent'
                            : '1px solid rgba(180,140,95,0.14)',
                          boxShadow: isActive ? '0 4px 16px rgba(44,31,20,0.20)' : 'none',
                        }}
                      >
                        <span className="text-lg flex-shrink-0">{scene.icon}</span>
                        <div>
                          <div
                            className="text-[11px] font-semibold leading-tight"
                            style={{ color: isActive ? '#FDFAF6' : '#2C1F14' }}
                          >
                            {scene.label}
                          </div>
                          <div
                            className="text-[10px] mt-0.5"
                            style={{ color: isActive ? 'rgba(253,250,246,0.55)' : '#9C7B68' }}
                          >
                            {scene.desc}
                          </div>
                        </div>
                        {isActive && (
                          <div
                            className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: '#C9A227' }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Toast notification */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none transition-all duration-300 ${
          toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
        }`}
      >
        <div
          className="px-6 py-3 rounded-full text-sm font-medium tracking-tight whitespace-nowrap"
          style={{
            background: '#2C1F14',
            color: '#FDFAF6',
            border: '1px solid rgba(201,162,39,0.25)',
            boxShadow: '0 12px 40px rgba(44,31,20,0.30)',
          }}
        >
          {toast.msg}
        </div>
      </div>
    </section>
  );
}