'use client';

interface ScenePresetButtonProps {
  icon: string;
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

export default function ScenePresetButton({ icon, label, description, active, onClick }: ScenePresetButtonProps) {
  return (
    <button
      onClick={onClick}
      className="v4-scene-btn flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left"
      style={{
        background: active ? '#2C1F14' : 'rgba(44,31,20,0.05)',
        border: active ? '1px solid transparent' : '1px solid rgba(180,140,95,0.14)',
        boxShadow: active ? '0 4px 20px rgba(44,31,20,0.24), 0 0 0 1px rgba(201,162,39,0.15)' : 'none',
      }}
    >
      <span className="text-lg flex-shrink-0">{icon}</span>
      <div>
        <div className="text-[11px] font-semibold leading-tight" style={{ color: active ? '#FDFAF6' : '#2C1F14' }}>
          {label}
        </div>
        <div className="text-[10px] mt-0.5" style={{ color: active ? 'rgba(253,250,246,0.55)' : '#9C7B68' }}>
          {description}
        </div>
      </div>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 v4-scene-dot" style={{ background: '#C9A227' }} />}

      <style jsx>{`
        .v4-scene-btn {
          transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, background 0.3s ease;
        }
        .v4-scene-btn:hover {
          transform: translateY(-2px) scale(1.015);
        }
        .v4-scene-btn:active {
          transform: scale(0.97);
        }
        .v4-scene-dot {
          animation: v4SceneDotPulse 1.8s ease-in-out infinite;
        }
        @keyframes v4SceneDotPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(201,162,39,0.5); }
          50% { opacity: 0.7; box-shadow: 0 0 0 4px rgba(201,162,39,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .v4-scene-btn { transition: none; }
          .v4-scene-dot { animation: none; }
        }
      `}</style>
    </button>
  );
}
