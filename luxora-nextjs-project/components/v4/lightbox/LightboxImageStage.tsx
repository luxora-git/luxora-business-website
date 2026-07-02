'use client';

import { useEffect, useRef, useState } from 'react';
import type { LightboxImage } from './types';

export interface LightboxImageStageProps {
  images: LightboxImage[];
  activeIndex: number;
  onNavigate: (index: number) => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 3;
const ZOOMED_SCALE = 2.2;

/**
 * LightboxImageStage — the dark, immersive left pane. Owns all image
 * interaction: wheel zoom, double-click zoom, pinch zoom, swipe navigation
 * (when not zoomed), the counter, prev/next, and the thumbnail strip.
 * Escape/Arrow-key handling lives one level up in `PremiumLightbox` since
 * Escape must close the whole viewer, not just this pane.
 */
export default function LightboxImageStage({ images, activeIndex, onNavigate }: LightboxImageStageProps) {
  const total = images.length;
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const pinchStartDist = useRef<number | null>(null);
  const pinchStartScale = useRef(1);

  useEffect(() => {
    setScale(1);
    setOrigin({ x: 50, y: 50 });
  }, [activeIndex]);

  // Preload the neighbouring photos so Prev/Next feels instant.
  useEffect(() => {
    [activeIndex - 1, activeIndex + 1].forEach((i) => {
      const idx = (i + total) % total;
      const next = images[idx];
      if (next) {
        const preload = new window.Image();
        preload.src = next.src;
      }
    });
  }, [activeIndex, images, total]);

  const goPrev = () => onNavigate((activeIndex - 1 + total) % total);
  const goNext = () => onNavigate((activeIndex + 1) % total);

  const setOriginFromPoint = (clientX: number, clientY: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    setOrigin({
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setOriginFromPoint(e.clientX, e.clientY);
    setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s - e.deltaY * 0.0018)));
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    setOriginFromPoint(e.clientX, e.clientY);
    setScale((s) => (s > 1 ? 1 : ZOOMED_SCALE));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const [a, b] = [e.touches[0], e.touches[1]];
      pinchStartDist.current = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      pinchStartScale.current = scale;
    } else if (e.touches.length === 1 && scale === 1) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDist.current) {
      const [a, b] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const next = pinchStartScale.current * (dist / pinchStartDist.current);
      setScale(Math.min(MAX_SCALE, Math.max(MIN_SCALE, next)));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    pinchStartDist.current = null;
    if (touchStartX.current !== null && scale === 1) {
      const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
      const delta = endX - touchStartX.current;
      if (Math.abs(delta) > 60) {
        if (delta > 0) goPrev();
        else goNext();
      }
    }
    touchStartX.current = null;
  };

  const image = images[activeIndex];
  if (!image) return null;

  return (
    <div className="relative h-full w-full overflow-hidden select-none" style={{ background: '#0F0B06' }}>
      <div
        ref={stageRef}
        className="relative h-full w-full flex items-center justify-center overflow-hidden"
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- immersive stage image, intrinsic size varies per photo, next/image's fixed layout modes fight the zoom transform */}
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className="max-h-full max-w-full object-contain transition-transform duration-200 ease-out"
          style={{ transform: `scale(${scale})`, transformOrigin: `${origin.x}% ${origin.y}%`, cursor: scale > 1 ? 'zoom-out' : 'zoom-in' }}
          draggable={false}
        />
      </div>

      {total > 1 && (
        <div
          className="absolute top-6 left-6 text-[11px] font-semibold tracking-[0.14em] uppercase px-3.5 py-1.5 rounded-full"
          style={{ background: 'rgba(253,250,246,0.1)', color: 'rgba(253,250,246,0.85)', backdropFilter: 'blur(8px)' }}
        >
          {activeIndex + 1} / {total}
        </div>
      )}

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
            style={{ background: 'rgba(253,250,246,0.1)', color: '#FDFAF6', backdropFilter: 'blur(8px)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
            style={{ background: 'rgba(253,250,246,0.1)', color: '#FDFAF6', backdropFilter: 'blur(8px)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {total > 1 && (
        <div
          className="absolute bottom-0 inset-x-0 pb-4 pt-10 px-4 md:px-6"
          style={{ background: 'linear-gradient(to top, rgba(15,11,6,0.85) 0%, transparent 100%)' }}
        >
          <div className="flex gap-2.5 overflow-x-auto justify-center">
            {images.map((img, i) => (
              <button
                key={img.src + i}
                type="button"
                onClick={() => onNavigate(i)}
                className="relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden transition-all duration-300"
                style={{
                  border: i === activeIndex ? '2px solid #C9A227' : '2px solid rgba(253,250,246,0.2)',
                  opacity: i === activeIndex ? 1 : 0.6,
                }}
                aria-label={`View image ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- tiny thumbnail, next/image overhead unnecessary */}
                <img src={img.src} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
