'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import V4SectionHeader from '../V4SectionHeader';
import { LuxuryContour, LuxuryGrain } from '../background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { ServiceBeforeAfterData } from '@/lib/content/services/types';

export interface ServiceBeforeAfterProps {
  data: ServiceBeforeAfterData;
}

/**
 * ServiceBeforeAfter — the drag-to-compare transformation showcase shared
 * by every service page. Reuses the exact slider mechanism from the
 * homepage's `V4BeforeAfterSection` (clip-path reveal + draggable gold
 * handle), generalised into a data-driven, reusable component.
 */
export default function ServiceBeforeAfter({ data }: ServiceBeforeAfterProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = data.transformations[activeTab];

  const getPercentage = useCallback((clientX: number) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      setSliderPosition(getPercentage(e.clientX));
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      setSliderPosition(getPercentage(e.touches[0].clientX));
    };
    const onDragEnd = () => (isDragging.current = false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onDragEnd);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onDragEnd);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onDragEnd);
    };
  }, [getPercentage]);

  return (
    <section
      id="v4-service-before-after"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, rgba(44,31,20,0.05) 0%, transparent 9%), #FDFAF6',
      }}
    >
      <LuxuryContour position="bottom-left" opacity={0.03} scale={1.2} rotation={180} />
      <LuxuryGrain id="service-before-after-grain" opacity={0.012} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div data-v4-reveal-heading>
          <V4SectionHeader
            eyebrow={data.eyebrow}
            title={data.title}
            titleItalic={data.titleItalic}
            description={data.description}
            centered
          />
        </div>

        {/* Transformation tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-4 mb-12" data-v4-reveal>
          {data.transformations.map((t, i) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(i);
                setSliderPosition(50);
              }}
              className={`relative px-7 md:px-9 py-3 text-[11px] tracking-[0.14em] uppercase font-semibold transition-all duration-300 rounded-full border ${
                activeTab === i
                  ? 'bg-[#2C1F14] text-white border-transparent shadow-[0_4px_16px_rgba(100,60,20,0.15)]'
                  : 'bg-[#F5EFE6] text-[#6B4C3B] border-[rgba(160,120,80,0.18)] hover:border-[#C9A227]/50 hover:bg-[#FDFAF6]'
              }`}
            >
              {t.title}
              {activeTab === i && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[2.5px] rounded-full" style={{ background: luxoraColors.gold }} />
              )}
            </button>
          ))}
        </div>

        {/* Interactive comparison */}
        <div
          className="relative rounded-3xl overflow-hidden bg-[#F5EFE6] border border-[rgba(160,120,80,0.18)] shadow-[0_16px_56px_rgba(100,60,20,0.08)]"
          data-v4-reveal
        >
          <div
            ref={containerRef}
            className="relative w-full h-[360px] sm:h-[440px] md:h-[540px] lg:h-[600px] overflow-hidden cursor-ew-resize select-none"
            onMouseDown={(e) => {
              e.preventDefault();
              isDragging.current = true;
              setSliderPosition(getPercentage(e.clientX));
            }}
            onTouchStart={(e) => {
              isDragging.current = true;
              setSliderPosition(getPercentage(e.touches[0].clientX));
            }}
            onDragStart={(e) => e.preventDefault()}
          >
            <div className="absolute inset-0">
              <img
                src={current.after}
                alt={`${current.title} after renovation`}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 pointer-events-none">
                <div className="px-4 py-2 bg-[#FDFAF6]/90 backdrop-blur-[6px] border border-[rgba(160,120,80,0.25)] rounded-full">
                  <span className="text-[#2C1F14] text-[10px] font-semibold tracking-[0.18em] uppercase">After</span>
                </div>
              </div>
            </div>

            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
              <img
                src={current.before}
                alt={`${current.title} before renovation`}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
              <div className="absolute top-6 left-6 sm:top-8 sm:left-8 pointer-events-none">
                <div className="px-4 py-2 bg-[#2C1F14]/70 backdrop-blur-[6px] border border-white/15 rounded-full">
                  <span className="text-white text-[10px] font-semibold tracking-[0.18em] uppercase">Before</span>
                </div>
              </div>
            </div>

            {/* Premium drag handle */}
            <div
              className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
              style={{
                left: `${sliderPosition}%`,
                background: 'linear-gradient(180deg, rgba(201,162,39,0.2) 0%, rgba(201,162,39,1) 25%, rgba(201,162,39,1) 75%, rgba(201,162,39,0.2) 100%)',
                boxShadow: '0 0 16px rgba(201,162,39,0.45)',
              }}
            >
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-[#FDFAF6] rounded-full flex items-center justify-center"
                style={{ boxShadow: '0 0 0 1px rgba(201,162,39,0.4), 0 6px 28px rgba(100,60,20,0.18)' }}
              >
                <div className="absolute inset-[3px] rounded-full border border-[#C9A227]/20" />
                <div className="flex items-center gap-[6px]">
                  <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
                    <path d="M7 1L1.5 7.5L7 14" stroke="#2C1F14" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
                    <path d="M2 1L7.5 7.5L2 14" stroke="#2C1F14" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div key={activeTab} className="px-8 md:px-12 lg:px-16 py-10 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 mb-10">
              <div>
                <div className="text-[#C9A227] text-[9px] md:text-[10px] tracking-[0.28em] uppercase mb-3 font-semibold">Project</div>
                <h3 className="font-playfair italic text-2xl md:text-3xl font-normal leading-snug" style={{ color: '#2C1F14' }}>
                  {current.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: '#9C7B68' }}>
                  <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1C4.24 1 2 3.24 2 6C2 9.75 7 13 7 13C7 13 12 9.75 12 6C12 3.24 9.76 1 7 1ZM7 7.75C6.04 7.75 5.25 6.96 5.25 6C5.25 5.04 6.04 4.25 7 4.25C7.96 4.25 8.75 5.04 8.75 6C8.75 6.96 7.96 7.75 7 7.75Z" fill="#C9A227" />
                  </svg>
                  <span>{current.location}</span>
                </div>
              </div>
              <div>
                <div className="text-[#C9A227] text-[9px] md:text-[10px] tracking-[0.28em] uppercase mb-3 font-semibold">Transformation Story</div>
                <p className="text-sm md:text-base leading-relaxed font-light" style={{ color: '#6B4C3B' }}>
                  {current.description}
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent mb-10" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 md:gap-10">
              {data.details.map((detail) => (
                <div key={detail.label}>
                  <div className="text-[#C9A227] text-[9px] md:text-[10px] tracking-[0.28em] uppercase mb-2 font-semibold">{detail.label}</div>
                  <div className="font-playfair text-lg md:text-xl lg:text-2xl font-semibold leading-none" style={{ color: '#2C1F14' }}>
                    {detail.value}
                  </div>
                  <div className="mt-3 w-8 h-[1.5px]" style={{ background: luxoraColors.gold }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <span className="inline-flex items-center gap-3 text-[9px] md:text-[10px] tracking-[0.22em] uppercase" style={{ color: '#9C7B68' }}>
            <span className="w-10 h-px" style={{ backgroundColor: 'rgba(160,120,80,0.18)' }} />
            Drag the slider to compare
            <span className="w-10 h-px" style={{ backgroundColor: 'rgba(160,120,80,0.18)' }} />
          </span>
        </div>
      </div>
    </section>
  );
}
