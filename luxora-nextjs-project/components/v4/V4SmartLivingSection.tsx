'use client';

import { useState, useRef } from 'react';
import { RoomStage, DeviceToggleRow, ScenePresetButton, scenePresets, toastCopy } from './smart-living';
import type { SmartLivingState, DeviceKey, SceneKey } from './smart-living';

const devices: { key: DeviceKey; label: string; onLabel: string; offLabel: string; icon: React.ReactNode }[] = [
  {
    key: 'light', label: 'Ambient Lighting', onLabel: 'ON', offLabel: 'OFF',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  },
  {
    key: 'curtain', label: 'Smart Curtains', onLabel: 'CLOSED', offLabel: 'OPEN',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16M20 4v16M4 12h4m8 0h4M8 4v16M16 4v16" /></svg>,
  },
  {
    key: 'tv', label: 'Television', onLabel: 'ON', offLabel: 'STANDBY',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="13" rx="2" /><path strokeLinecap="round" d="M8 20h8M12 17v3" /><path strokeLinecap="round" d="M7 3l5 4 5-4" /></svg>,
  },
  {
    key: 'ac', label: 'Climate Control', onLabel: 'ON', offLabel: 'OFF',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" /><circle cx="12" cy="12" r="3" /></svg>,
  },
  {
    key: 'security', label: 'Security System', onLabel: 'ARMED', offLabel: 'OFF',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9a12.02 12.02 0 00-.382-3.016z" /></svg>,
  },
];

const scenes: { key: SceneKey; label: string; icon: string; desc: string }[] = [
  { key: 'morning', label: 'Morning', icon: '☀', desc: 'Natural light' },
  { key: 'work', label: 'Work', icon: '💼', desc: 'Focus mode' },
  { key: 'movie', label: 'Movie', icon: '🎬', desc: 'Cinema mode' },
  { key: 'sleep', label: 'Sleep', icon: '🌙', desc: 'Rest mode' },
];

export default function V4SmartLivingSection() {
  const [state, setState] = useState<SmartLivingState>({ light: true, curtain: false, tv: false, ac: false, security: false });
  const [activeScene, setActiveScene] = useState<SceneKey | null>(null);
  const [toast, setToast] = useState({ msg: '', visible: false });
  const [roomReady, setRoomReady] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(msg: string) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ msg, visible: true });
    timerRef.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2600);
  }

  function handleToggle(key: DeviceKey) {
    if ((key === 'curtain' || key === 'tv') && !roomReady) return;
    const next = { ...state, [key]: !state[key] };
    setState(next);
    setActiveScene(null);
    showToast(state[key] ? toastCopy.device[key].off : toastCopy.device[key].on);
  }

  function applyScene(key: SceneKey) {
    if (!roomReady) return;
    const next = { ...state, ...scenePresets[key] };
    setState(next);
    setActiveScene(key);
    showToast(toastCopy.scene[key]);
  }

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
      {/* Background arc lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
          <path d="M-120 820 Q360 520 720 660 T1560 820" stroke="#C9A96E" strokeWidth="1.4" />
          <path d="M-120 680 Q360 420 720 540 T1560 680" stroke="#C9A96E" strokeWidth="1.0" />
          <path d="M-120 540 Q360 320 720 420 T1560 540" stroke="#C9A96E" strokeWidth="0.7" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-12" data-v4-reveal-heading>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px flex-1 max-w-[100px]" style={{ background: 'rgba(180,130,60,0.35)' }} />
            <span className="text-[11px] font-semibold tracking-[0.28em] uppercase" style={{ color: '#B07D3A' }}>
              Smart Home Automation
            </span>
            <div className="h-px flex-1 max-w-[100px]" style={{ background: 'rgba(180,130,60,0.35)' }} />
          </div>
          <h2 className="font-playfair font-normal leading-[1.1] tracking-[-0.02em] mb-3" style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', color: '#2C1F14' }}>
            Live Smarter
          </h2>
          <h2 className="font-playfair italic font-normal leading-[1.1] tracking-[-0.02em] mb-5" style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', color: '#2C1F14' }}>
            With Luxora
          </h2>
          <p className="text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto" style={{ color: '#6B4C3B' }}>
            Control lighting, climate, entertainment and security from one seamless interface.
          </p>
        </div>

        {/* Main card */}
        <div
          className="v4-showcase-card rounded-3xl overflow-hidden"
          style={{
            border: '1px solid rgba(201,162,39,0.22)',
            boxShadow: '0 32px 100px rgba(60,38,10,0.22), 0 2px 0 rgba(255,255,255,0.4) inset',
          }}
          data-v4-reveal
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]">
            {/* LEFT: interactive room stage — fills the full column height, no letterboxing */}
            <div className="relative h-[340px] sm:h-[420px] md:h-[480px] lg:h-auto">
              <RoomStage state={state} onReady={() => setRoomReady(true)} />

              {/* Active devices overlay — top left, frosted glass pills */}
              <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                {devices.map((d) => (
                  <div
                    key={d.key}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: state[d.key] ? 'rgba(201,162,39,0.88)' : 'rgba(253,250,246,0.55)',
                      border: state[d.key] ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.35)',
                      backdropFilter: 'blur(10px) saturate(1.3)',
                      WebkitBackdropFilter: 'blur(10px) saturate(1.3)',
                      boxShadow: state[d.key] ? '0 4px 14px rgba(201,162,39,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: state[d.key] ? '#FFFFFF' : 'rgba(44,31,20,0.3)' }} />
                    <span className="text-[10px] font-semibold tracking-wide" style={{ color: state[d.key] ? '#1C1005' : '#6B4C3B' }}>
                      {d.key.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Active count — bottom left, frosted glass */}
              <div
                className="absolute bottom-5 left-5 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(253,250,246,0.55)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(10px) saturate(1.3)',
                  WebkitBackdropFilter: 'blur(10px) saturate(1.3)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                }}
              >
                <span className="text-[11px] font-semibold" style={{ color: '#2C1F14' }}>
                  <span style={{ color: '#C9A227' }}>{activeCount}</span>
                  <span style={{ color: '#9C7B68' }}>/5 Active</span>
                </span>
              </div>
            </div>

            {/* RIGHT: control panel — frosted glass */}
            <div
              className="flex flex-col"
              style={{
                background: 'rgba(253,250,246,0.82)',
                backdropFilter: 'blur(20px) saturate(1.4)',
                WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
                borderLeft: '1px solid rgba(180,140,95,0.14)',
              }}>
              <div className="flex-1 px-6 pt-7 pb-5">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-5 h-px" style={{ background: '#C9A227' }} />
                  <span className="text-[10px] font-bold tracking-[0.24em] uppercase" style={{ color: '#9C7B68' }}>
                    Devices
                  </span>
                </div>

                <div className="flex flex-col">
                  {devices.map((d, i) => (
                    <DeviceToggleRow
                      key={d.key}
                      icon={d.icon}
                      label={d.label}
                      statusLabel={state[d.key] ? d.onLabel : d.offLabel}
                      active={state[d.key]}
                      isLast={i === devices.length - 1}
                      onToggle={() => handleToggle(d.key)}
                    />
                  ))}
                </div>
              </div>

              <div className="mx-6">
                <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.30), transparent)' }} />
              </div>

              <div className="px-6 pt-5 pb-7">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-5 h-px" style={{ background: '#C9A227' }} />
                  <span className="text-[10px] font-bold tracking-[0.24em] uppercase" style={{ color: '#9C7B68' }}>
                    Scenes
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {scenes.map((scene) => (
                    <ScenePresetButton
                      key={scene.key}
                      icon={scene.icon}
                      label={scene.label}
                      description={scene.desc}
                      active={activeScene === scene.key}
                      onClick={() => applyScene(scene.key)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .v4-showcase-card {
          transition: box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .v4-showcase-card:hover {
          box-shadow: 0 40px 120px rgba(60,38,10,0.28), 0 2px 0 rgba(255,255,255,0.4) inset;
          transform: translateY(-3px);
        }
        @media (prefers-reduced-motion: reduce) {
          .v4-showcase-card { transition: none; }
        }
      `}</style>

      {/* Toast notification */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none transition-all duration-300 ${
          toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
        }`}
      >
        <div
          className="px-6 py-3 rounded-full text-sm font-medium tracking-tight whitespace-nowrap"
          style={{ background: '#2C1F14', color: '#FDFAF6', border: '1px solid rgba(201,162,39,0.25)', boxShadow: '0 12px 40px rgba(44,31,20,0.30)' }}
        >
          {toast.msg}
        </div>
      </div>
    </section>
  );
}
