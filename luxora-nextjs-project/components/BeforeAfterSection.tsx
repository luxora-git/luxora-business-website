'use client';

import { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';
import Image from 'next/image';

interface ProjectDetail {
  label: string;
  value: string;
}

interface Transformation {
  id: string;
  before: string;
  after: string;
  title: string;
  location: string;
  description: string;
  details: ProjectDetail[];
}

const transformations: Transformation[] = [
  {
    id: 'living-room',
    before: '/before-after/living-room-before.jpg',
    after: '/before-after/living-room-after.jpg',
    title: 'Grand Living Room',
    location: 'Worli, Mumbai',
    description:
      'A dated apartment living room reimagined into a sophisticated contemporary space with Italian marble, custom millwork, and curated furnishings.',
    details: [
      { label: 'Area', value: '650 sq ft' },
      { label: 'Budget', value: '₹28,00,000' },
      { label: 'Timeline', value: '6 Weeks' },
      { label: 'Style', value: 'Contemporary' },
    ],
  },
  {
    id: 'kitchen',
    before: '/before-after/kitchen-before.jpg',
    after: '/before-after/kitchen-after.jpg',
    title: 'Modular Kitchen',
    location: 'Indiranagar, Bangalore',
    description:
      'A cramped kitchen redesigned into a sprawling modular masterpiece with intelligent storage, waterfall island, and premium quartz countertops.',
    details: [
      { label: 'Area', value: '220 sq ft' },
      { label: 'Budget', value: '₹14,50,000' },
      { label: 'Timeline', value: '5 Weeks' },
      { label: 'Style', value: 'Modern Minimal' },
    ],
  },
  {
    id: 'bedroom',
    before: '/before-after/bedroom-before.jpg',
    after: '/before-after/bedroom-after.jpg',
    title: 'Master Bedroom Suite',
    location: 'Vasant Vihar, Delhi',
    description:
      'An ordinary bedroom elevated into a luxury suite with a bespoke walk-in wardrobe, walnut veneer paneling, and layered ambient lighting.',
    details: [
      { label: 'Area', value: '480 sq ft' },
      { label: 'Budget', value: '₹22,00,000' },
      { label: 'Timeline', value: '7 Weeks' },
      { label: 'Style', value: 'Transitional' },
    ],
  },
];

export default function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentTransform = transformations[activeTab];

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

    const onDragEnd = () => {
      isDragging.current = false;
    };

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

  const imageDragStyle = {
    WebkitUserDrag: 'none',
    userSelect: 'none',
  } as React.CSSProperties;

  return (
    <>
      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .detail-enter {
          animation: fadeSlideUp 0.5s ease forwards;
        }
      `}</style>

      <section
        id="transformations"
        className="py-20 md:py-28 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #faf9f7 0%, #ffffff 60%, #faf9f7 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-luxora-gold text-[11px] font-semibold tracking-[0.28em] uppercase mb-5 block">
              Our Work Speaks
            </span>

            <h2 className="font-playfair italic text-[2.2rem] sm:text-[2.8rem] md:text-[3.4rem] font-normal text-luxora-navy mb-5 leading-[1.12] tracking-[-0.01em]">
              Premium Transformations
            </h2>

            <div className="w-10 h-px bg-luxora-gold/50 mx-auto mb-5" />

            <p className="text-luxora-charcoal/55 text-base md:text-[17px] max-w-xl mx-auto leading-relaxed font-light">
              Every project is a narrative of meticulous craftsmanship. Witness the
              metamorphosis from the ordinary to the extraordinary.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
            {transformations.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(i);
                  setSliderPosition(50);
                }}
                className={`relative px-6 md:px-8 py-2.5 text-[11px] md:text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-400 ${
                  activeTab === i
                    ? 'bg-luxora-navy text-white shadow-[0_4px_16px_rgba(10,31,68,0.2)]'
                    : 'bg-transparent text-luxora-charcoal/45 hover:text-luxora-navy border border-luxora-charcoal/15 hover:border-luxora-gold/50'
                }`}
              >
                {t.title}
                {activeTab === i && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-luxora-gold" />
                )}
              </button>
            ))}
          </div>

          {/* Card */}
          <div className="relative overflow-visible">
            {/* Accent borders */}
            <div
              className="absolute -top-2.5 -left-2.5 pointer-events-none border border-luxora-gold/12"
              style={{ width: 'calc(100% + 10px)', height: 'calc(100% + 10px)' }}
            />
            <div
              className="absolute -top-[5px] -left-[5px] pointer-events-none border border-luxora-gold/6"
              style={{ width: 'calc(100% + 10px)', height: 'calc(100% + 10px)' }}
            />

            <div className="relative bg-white border border-[#e8e4de] shadow-[0_12px_48px_rgba(0,0,0,0.07)]">
              {/* Slider */}
              <div
                ref={containerRef}
                className="relative w-full h-[340px] sm:h-[420px] md:h-[520px] lg:h-[600px] overflow-hidden cursor-ew-resize select-none"
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
                {/* After image */}
                <div className="absolute inset-0">
                  <Image
                    src={currentTransform.after}
                    alt={`${currentTransform.title} after renovation`}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority
                    quality={90}
                    draggable={false}
                    style={imageDragStyle}
                  />
                  <div className="absolute top-5 right-5 sm:top-7 sm:right-7 pointer-events-none">
                    <div className="px-3.5 py-1.5 bg-black/25 backdrop-blur-[6px] border border-white/20">
                      <span className="text-white text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase">
                        After
                      </span>
                    </div>
                  </div>
                </div>

                {/* Before image */}
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <Image
                    src={currentTransform.before}
                    alt={`${currentTransform.title} before renovation`}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority
                    quality={90}
                    draggable={false}
                    style={imageDragStyle}
                  />
                  <div className="absolute top-5 left-5 sm:top-7 sm:left-7 pointer-events-none">
                    <div className="px-3.5 py-1.5 bg-black/35 backdrop-blur-[6px] border border-white/15">
                      <span className="text-white text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase">
                        Before
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider + handle */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
                  style={{
                    left: `${sliderPosition}%`,
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.95) 80%, rgba(255,255,255,0.3) 100%)',
                    boxShadow: '0 0 12px rgba(255,255,255,0.4)',
                  }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white/8 blur-2xl" />

                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center"
                    style={{
                      boxShadow:
                        '0 0 0 1px rgba(201,162,39,0.4), 0 4px 24px rgba(0,0,0,0.18)',
                    }}
                  >
                    <div className="absolute inset-[3px] rounded-full border border-[#C9A227]/20" />

                    <div className="flex items-center gap-[5px]">
                      <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
                        <path
                          d="M7 1L1.5 7.5L7 14"
                          stroke="#0A1F44"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
                        <path
                          d="M2 1L7.5 7.5L2 14"
                          stroke="#0A1F44"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-white/25 pointer-events-none" />
                <div className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-white/25 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-white/25 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-white/25 pointer-events-none" />
              </div>

              {/* Details */}
              <div
                key={activeTab}
                className="px-6 md:px-10 lg:px-14 py-8 md:py-10 detail-enter"
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-10 mb-8">
                  <div>
                    <div className="text-luxora-gold text-[9px] md:text-[10px] tracking-[0.28em] uppercase mb-2 font-semibold">
                      Project
                    </div>
                    <h3 className="font-playfair italic text-xl md:text-2xl font-normal text-luxora-navy leading-snug">
                      {currentTransform.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2 text-luxora-charcoal/45 text-xs">
                      <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 1C4.24 1 2 3.24 2 6C2 9.75 7 13 7 13C7 13 12 9.75 12 6C12 3.24 9.76 1 7 1ZM7 7.75C6.04 7.75 5.25 6.96 5.25 6C5.25 5.04 6.04 4.25 7 4.25C7.96 4.25 8.75 5.04 8.75 6C8.75 6.96 7.96 7.75 7 7.75Z"
                          fill="#C9A227"
                        />
                      </svg>
                      <span>{currentTransform.location}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-luxora-gold text-[9px] md:text-[10px] tracking-[0.28em] uppercase mb-2 font-semibold">
                      Transformation Story
                    </div>
                    <p className="text-luxora-charcoal/60 text-sm md:text-[15px] leading-relaxed font-light">
                      {currentTransform.description}
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-luxora-gold/25 to-transparent mb-8" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:gap-8">
                  {currentTransform.details.map((detail) => (
                    <div key={detail.label}>
                      <div className="text-luxora-gold text-[9px] md:text-[10px] tracking-[0.28em] uppercase mb-1.5 font-semibold">
                        {detail.label}
                      </div>
                      <div className="font-playfair text-lg md:text-xl lg:text-2xl font-semibold text-luxora-navy leading-none">
                        {detail.value}
                      </div>
                      <div className="mt-2 w-6 h-[1px] bg-luxora-gold/35" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Drag hint */}
          <div className="text-center mt-5">
            <span className="inline-flex items-center gap-2.5 text-luxora-charcoal/30 text-[9px] md:text-[10px] tracking-[0.22em] uppercase">
              <span className="w-8 h-px bg-luxora-charcoal/15" />
              Drag the slider to compare
              <span className="w-8 h-px bg-luxora-charcoal/15" />
            </span>
          </div>
        </div>
      </section>
    </>
  );
}