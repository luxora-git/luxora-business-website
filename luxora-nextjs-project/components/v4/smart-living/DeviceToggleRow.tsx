'use client';

import type { ReactNode } from 'react';
import Toggle from './Toggle';

interface DeviceToggleRowProps {
  icon: ReactNode;
  label: string;
  statusLabel: string;
  active: boolean;
  isLast?: boolean;
  onToggle: () => void;
}

export default function DeviceToggleRow({ icon, label, statusLabel, active, isLast, onToggle }: DeviceToggleRowProps) {
  return (
    <div
      className="v4-device-row flex items-center gap-3.5 py-3.5 px-2.5 -mx-2.5 rounded-xl cursor-pointer group"
      style={{ borderBottom: isLast ? 'none' : '1px solid rgba(180,140,95,0.10)' }}
      onClick={onToggle}
    >
      <div
        className="v4-device-icon w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          background: active ? 'rgba(201,162,39,0.14)' : 'rgba(44,31,20,0.05)',
          color: active ? '#C9A227' : '#9C7B68',
          boxShadow: active ? '0 0 0 1px rgba(201,162,39,0.22), 0 4px 14px rgba(201,162,39,0.18)' : 'none',
        }}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium leading-tight" style={{ color: '#2C1F14' }}>
          {label}
        </div>
        <div className="text-[11px] font-light mt-0.5" style={{ color: '#9C7B68' }}>
          {statusLabel}
        </div>
      </div>

      <Toggle on={active} onToggle={onToggle} label={label} />

      <style jsx>{`
        .v4-device-row {
          transition: background 0.3s ease, transform 0.25s ease;
        }
        .v4-device-row:hover {
          background: rgba(201, 162, 39, 0.05);
          transform: translateX(2px);
        }
        .v4-device-row:active .v4-device-icon {
          transform: scale(0.92);
        }
      `}</style>
    </div>
  );
}
