'use client';

import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { EstimatorRoomConfig } from '@/lib/content/estimator/questions';

export interface EstimatorRoomCounterProps {
  room: EstimatorRoomConfig;
  count: number;
  onChange: (key: string, next: number) => void;
}

function CounterButton({
  label,
  disabled,
  onClick,
  children,
  emphasized,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
  emphasized?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        background: emphasized ? 'rgba(201,162,39,0.16)' : 'rgba(160,120,80,0.12)',
        color: emphasized ? '#8C6D1A' : luxoraColors.softBrown,
        outlineColor: luxoraColors.gold,
      }}
    >
      {children}
    </button>
  );
}

/**
 * EstimatorRoomCounter — one room row for the Full Home rooms question:
 * label left, − / count / + stepper right. Count changes are announced
 * via the aria-labels; min/max limits disable the relevant button rather
 * than erroring.
 */
export default function EstimatorRoomCounter({ room, count, onChange }: EstimatorRoomCounterProps) {
  return (
    <div
      className="flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: 'rgba(253,250,246,0.95)',
        border: '2px solid rgba(160,120,80,0.26)',
        boxShadow: '0 6px 22px rgba(100,60,20,0.06)',
      }}
    >
      <span className="font-playfair text-[1.05rem]" style={{ color: luxoraColors.espresso }}>
        {room.label}
      </span>

      <div className="flex items-center gap-3">
        <CounterButton
          label={`Decrease ${room.label} count`}
          disabled={count <= room.min}
          onClick={() => onChange(room.key, count - 1)}
        >
          −
        </CounterButton>
        <span
          className="w-7 text-center text-lg font-bold tabular-nums"
          style={{ color: luxoraColors.espresso }}
          aria-live="polite"
          aria-label={`${room.label}: ${count}`}
        >
          {count}
        </span>
        <CounterButton
          label={`Increase ${room.label} count`}
          disabled={count >= room.max}
          onClick={() => onChange(room.key, count + 1)}
          emphasized
        >
          +
        </CounterButton>
      </div>
    </div>
  );
}
