'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ToggleProps {
  on: boolean;
  onToggle: () => void;
  label?: string;
}

export default function Toggle({ on, onToggle, label }: ToggleProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        backgroundColor: on ? '#C9A227' : '#DDD5C5',
        boxShadow: on ? '0 0 0 4px rgba(201,162,39,0.16), inset 0 1px 2px rgba(0,0,0,0.12)' : 'inset 0 1px 2px rgba(0,0,0,0.08)',
        duration: 0.35,
        ease: 'power2.out',
      });
      const tl = gsap.timeline();
      tl.to(knobRef.current, { left: on ? 25 : 3, scaleX: 1.18, duration: 0.22, ease: 'power2.out' }).to(
        knobRef.current,
        { scaleX: 1, duration: 0.22, ease: 'back.out(2.4)' }
      );
    });
    return () => ctx.revert();
  }, [on]);

  return (
    <div
      ref={trackRef}
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      aria-label={label}
      className="v4-toggle-track"
      style={{
        width: 50,
        height: 28,
        borderRadius: 14,
        flexShrink: 0,
        background: on ? '#C9A227' : '#DDD5C5',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <div
        ref={knobRef}
        style={{
          position: 'absolute',
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: 'linear-gradient(160deg, #FFFFFF 0%, #F1EDE5 100%)',
          top: 3,
          left: on ? 25 : 3,
          boxShadow: '0 2px 6px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(0,0,0,0.04)',
        }}
      />
      <style jsx>{`
        .v4-toggle-track:active {
          filter: brightness(0.96);
        }
      `}</style>
    </div>
  );
}
