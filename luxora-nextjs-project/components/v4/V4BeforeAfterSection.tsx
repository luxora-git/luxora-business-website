'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { luxoraSpacing } from '@/lib/design/luxoraDesignTokens';
import Image from 'next/image';
import Link from 'next/link';

interface Transformation {
  id: string;
  /** Slug of the matching full case study in lib/content/portfolio/projects.ts */
  slug: string;
  /** Real photograph of the room before the Luxora renovation. */
  before: string;
  /** Real photograph of the same room after the Luxora renovation. */
  after: string;
  title: string;
  location: string;
  propertyType: string;
  investmentRange: string;
  duration: string;
  description: string;
}

/**
 * Real before/after photographs of the same physical room, pre- and
 * post-renovation. Facts below are pulled straight from the matching case
 * study in lib/content/portfolio.
 */
const transformations: Transformation[] = [
  {
    id: 'living-room',
    slug: 'krish-ji-residence',
    before: '/img/before-after/livingroom_before.webp',
    after: '/img/before-after/livingroom_after.webp',
    title: 'Grand Living Room',
    location: 'Malviya Nagar, Jaipur',
    propertyType: 'Independent House',
    investmentRange: '₹45L – ₹65L (typical for this scope)',
    duration: '10–12 weeks',
    description: 'From a dated, closed-off room to the finished Krish Residence living room — one continuous entrance-to-dining sightline in warm wood tones.',
  },
  {
    id: 'kitchen',
    slug: 'rakesh-ji-residence',
    before: '/img/before-after/kitchen_before.webp',
    after: '/img/before-after/kitchen_after.webp',
    title: 'Modular Kitchen',
    location: 'Mansarovar, Jaipur',
    propertyType: 'Independent House',
    investmentRange: '₹28L – ₹42L (typical for this scope)',
    duration: '8–9 weeks',
    description: 'From a cramped, dated layout to the completed Rakesh Residence kitchen — intelligent storage and a premium countertop planned around daily use.',
  },
  {
    id: 'bedroom',
    slug: 'rishabh-ji-residence',
    before: '/img/before-after/bedroom_before.webp',
    after: '/img/before-after/bedroom_after.webp',
    title: 'Master Bedroom Suite',
    location: 'Vaishali Nagar, Jaipur',
    propertyType: 'Independent House',
    investmentRange: '₹30L – ₹45L (typical for this scope)',
    duration: '8–10 weeks',
    description: 'From a bare, unfinished shell to the completed Rishabh Residence master suite — a distinct material mood carried through on the same joinery language.',
  },
];

export default function V4BeforeAfterSection() {
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
      id="v4-transformations"
      className="relative py-24 md:py-32 3xl:py-40 overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, rgba(44,31,20,0.05) 0%, transparent 9%), radial-gradient(ellipse 70% 50% at 88% 8%, rgba(201,162,39,0.08) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 8% 95%, rgba(44,31,20,0.04) 0%, transparent 55%), #FDFAF6',
      }}
    >
      {/* Architectural line-art motifs */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <path d="M-50 400 Q200 250 450 400 T950 400" stroke="#C9A227" strokeWidth="0.8" fill="none" />
          <path d="M850 100 Q1000 300 1150 100" stroke="#C9A227" strokeWidth="0.6" fill="none" />
          <circle cx="1050" cy="180" r="60" stroke="#C9A227" strokeWidth="0.5" fill="none" />
          <line x1="100" y1="700" x2="300" y2="700" stroke="#C9A227" strokeWidth="0.4" />
          <line x1="100" y1="710" x2="250" y2="710" stroke="#C9A227" strokeWidth="0.4" />
          <line x1="100" y1="720" x2="200" y2="720" stroke="#C9A227" strokeWidth="0.4" />
        </svg>
      </div>
      {/* Decorative sphere */}
      <div className="absolute top-24 -right-24 w-64 h-64 rounded-full border border-[#C9A227]/8 pointer-events-none" />

      <div className={`relative z-10 ${luxoraSpacing.container}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-end mb-12 md:mb-16" data-v4-reveal-heading>
          <div>
            <span className="text-[#C9A227] text-[11px] font-semibold tracking-[0.28em] uppercase mb-5 block">
              Real Transformations
            </span>
            <h2
              className="font-playfair italic font-normal leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.4rem)', color: '#2C1F14' }}
            >
              From Ordinary to Extraordinary
            </h2>
          </div>
          <p className="text-base md:text-[17px] leading-relaxed font-light max-w-md lg:pb-2" style={{ color: '#6B4C3B' }}>
            Compare real spaces before renovation with their final Luxora transformation — drag the slider to see every detail change.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 md:gap-4 mb-12" data-v4-reveal>
          {transformations.map((t, i) => (
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
              {activeTab === i && <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-[#C9A227] rounded-full" />}
            </button>
          ))}
        </div>

        <div className="relative rounded-3xl overflow-hidden bg-[#F5EFE6] border border-[rgba(160,120,80,0.18)] shadow-[0_16px_56px_rgba(100,60,20,0.08)]" data-v4-reveal>
          <div
            ref={containerRef}
            className="relative w-full h-[360px] sm:h-[440px] md:h-[540px] lg:h-[600px] overflow-hidden cursor-ew-resize select-none"
            onMouseDown={(e) => { e.preventDefault(); isDragging.current = true; setSliderPosition(getPercentage(e.clientX)); }}
            onTouchStart={(e) => { isDragging.current = true; setSliderPosition(getPercentage(e.touches[0].clientX)); }}
            onDragStart={(e) => e.preventDefault()}
          >
            <div className="absolute inset-0">
              <Image
                key={`after-${currentTransform.id}`}
                src={currentTransform.after}
                alt={`${currentTransform.title} — after Luxora renovation`}
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
                quality={90}
                draggable={false}
              />
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 pointer-events-none">
                <div className="px-4 py-2 bg-[#FDFAF6]/90 backdrop-blur-[6px] border border-[rgba(160,120,80,0.25)] rounded-full">
                  <span className="text-[#2C1F14] text-[10px] font-bold tracking-[0.22em] uppercase">After</span>
                </div>
              </div>
            </div>

            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
              <Image
                key={`before-${currentTransform.id}`}
                src={currentTransform.before}
                alt={`${currentTransform.title} — before Luxora renovation`}
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
                quality={90}
                draggable={false}
              />
              <div className="absolute top-6 left-6 sm:top-8 sm:left-8 pointer-events-none">
                <div className="px-4 py-2 bg-[#2C1F14]/70 backdrop-blur-[6px] border border-white/15 rounded-full">
                  <span className="text-white text-[10px] font-bold tracking-[0.22em] uppercase">Before</span>
                </div>
              </div>
            </div>

            <div
              className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
              style={{
                left: `${sliderPosition}%`,
                background: 'linear-gradient(180deg, rgba(201,162,39,0.2) 0%, rgba(201,162,39,1) 25%, rgba(201,162,39,1) 75%, rgba(201,162,39,0.2) 100%)',
                boxShadow: '0 0 16px rgba(201,162,39,0.45)',
              }}
            >
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-[#FDFAF6] rounded-full flex items-center justify-center v4-slider-handle-shimmer"
                style={{ boxShadow: '0 0 0 1px rgba(201,162,39,0.4), 0 0 22px rgba(201,162,39,0.35), 0 6px 28px rgba(100,60,20,0.18)' }}
              >
                <div className="absolute inset-[3px] rounded-full border border-[#C9A227]/20" />
                <div className="flex items-center gap-[6px]">
                  <svg width="9" height="15" viewBox="0 0 9 15" fill="none"><path d="M7 1L1.5 7.5L7 14" stroke="#2C1F14" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <svg width="9" height="15" viewBox="0 0 9 15" fill="none"><path d="M2 1L7.5 7.5L2 14" stroke="#2C1F14" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div key={activeTab} className="px-8 md:px-12 lg:px-16 py-10 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 mb-10">
              <div>
                <div className="text-[#C9A227] text-[9px] md:text-[10px] tracking-[0.28em] uppercase mb-3 font-semibold">Project</div>
                <h3 className="font-playfair italic text-2xl md:text-3xl font-normal leading-snug" style={{ color: '#2C1F14' }}>
                  {currentTransform.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: '#9C7B68' }}>
                  <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1C4.24 1 2 3.24 2 6C2 9.75 7 13 7 13C7 13 12 9.75 12 6C12 3.24 9.76 1 7 1ZM7 7.75C6.04 7.75 5.25 6.96 5.25 6C5.25 5.04 6.04 4.25 7 4.25C7.96 4.25 8.75 5.04 8.75 6C8.75 6.96 7.96 7.75 7 7.75Z" fill="#C9A227" />
                  </svg>
                  <span>{currentTransform.location}</span>
                </div>
              </div>
              <div>
                <div className="text-[#C9A227] text-[9px] md:text-[10px] tracking-[0.28em] uppercase mb-3 font-semibold">Transformation Story</div>
                <p className="text-sm md:text-base leading-relaxed font-light mb-4" style={{ color: '#6B4C3B' }}>
                  {currentTransform.description}
                </p>
                <Link
                  href={`/portfolio/${currentTransform.slug}`}
                  className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase pb-0.5 transition-colors duration-300 hover:text-[#C9A227]"
                  style={{ color: '#2C1F14', borderBottom: '1.5px solid rgba(201,162,39,0.4)' }}
                >
                  View Full Case Study
                  <svg className="w-3 h-3" fill="none" stroke="#C9A227" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent mb-10" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 md:gap-10">
              {[
                { label: 'Property Type', value: currentTransform.propertyType },
                { label: 'Investment', value: currentTransform.investmentRange },
                { label: 'Duration', value: currentTransform.duration },
                { label: 'Location', value: currentTransform.location },
              ].map((detail) => (
                <div key={detail.label}>
                  <div className="text-[#C9A227] text-[9px] md:text-[10px] tracking-[0.28em] uppercase mb-2 font-semibold">{detail.label}</div>
                  <div className="font-playfair text-base md:text-lg lg:text-xl font-semibold leading-snug" style={{ color: '#2C1F14' }}>
                    {detail.value}
                  </div>
                  <div className="mt-3 w-8 h-[1.5px] bg-[#C9A227]" />
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

        <div className="text-center mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: '#2C1F14', color: '#FDFAF6', boxShadow: '0 8px 28px rgba(44,31,20,0.22)' }}
          >
            Explore More Transformations
            <svg className="w-3.5 h-3.5" fill="none" stroke="#C9A227" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes v4SliderShimmer {
          0%, 100% { box-shadow: 0 0 0 1px rgba(201,162,39,0.4), 0 0 14px rgba(201,162,39,0.25), 0 6px 28px rgba(100,60,20,0.18); }
          50% { box-shadow: 0 0 0 1px rgba(201,162,39,0.6), 0 0 26px rgba(201,162,39,0.5), 0 6px 28px rgba(100,60,20,0.18); }
        }
        .v4-slider-handle-shimmer {
          animation: v4SliderShimmer 2.4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
