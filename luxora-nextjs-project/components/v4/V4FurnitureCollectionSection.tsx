'use client';

import { useState } from 'react';
import { luxoraSpacing } from '@/lib/design/luxoraDesignTokens';

/* ── 3D Sphere (left side, exact Figma) ────────────────────────── */
function Sphere3D() {
  return (
    <div
      className="absolute pointer-events-none hidden lg:block"
      aria-hidden="true"
      style={{ left: '-14px', top: '52%', transform: 'translateY(-50%)', width: '116px', height: '116px', opacity: 0.80, zIndex: 0 }}
    >
      <svg viewBox="0 0 110 110" fill="none" className="w-full h-full">
        <defs>
          <radialGradient id="fs-g1" cx="38%" cy="35%" r="60%">
            <stop offset="0%"   stopColor="#F5E8D0" />
            <stop offset="45%"  stopColor="#D4B896" />
            <stop offset="75%"  stopColor="#B89870" />
            <stop offset="100%" stopColor="#8B6840" />
          </radialGradient>
          <radialGradient id="fs-g2" cx="30%" cy="28%" r="35%">
            <stop offset="0%"   stopColor="#FDFAF6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FDFAF6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="55" cy="55" r="52" fill="url(#fs-g1)" />
        <circle cx="55" cy="55" r="52" fill="url(#fs-g2)" />
        <ellipse cx="55" cy="55" rx="52" ry="18" stroke="#C9A96E" strokeWidth="0.5" strokeOpacity="0.28" fill="none"/>
        <ellipse cx="55" cy="55" rx="52" ry="35" stroke="#C9A96E" strokeWidth="0.4" strokeOpacity="0.18" fill="none"/>
      </svg>
    </div>
  );
}

/* ── Background patterns (top-right circle, dot-grid, arcs) ─────── */
function BgPatterns() {
  return (
    <>
      {/* Tiny circle ring — top right */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{ top: '28px', right: '44px', width: '14px', height: '14px', border: '1.5px solid rgba(201,162,39,0.38)', borderRadius: '50%', zIndex: 0 }}
      />
      {/* Dot grid — right half */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: 0.055, zIndex: 0 }}>
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="fc-dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#C9A96E" />
            </pattern>
            <clipPath id="fc-rh"><rect x="50%" y="0" width="50%" height="100%" /></clipPath>
          </defs>
          <rect width="100%" height="100%" fill="url(#fc-dots)" clipPath="url(#fc-rh)" />
        </svg>
      </div>
      {/* Concentric arcs — top right corner */}
      <div
        className="absolute top-0 right-0 pointer-events-none hidden md:block"
        aria-hidden="true"
        style={{ width: '26%', height: '52%', opacity: 0.09, zIndex: 0 }}
      >
        <svg className="w-full h-full" viewBox="0 0 360 480" fill="none" preserveAspectRatio="xMaxYMin meet">
          {Array.from({ length: 13 }).map((_, i) => {
            const r = 55 + i * 26;
            return (
              <path
                key={i}
                d={`M 360 0 A ${r} ${r} 0 0 0 ${Math.max(0, 360 - r)} 480`}
                stroke="#C9A96E" strokeWidth="0.8" fill="none"
              />
            );
          })}
        </svg>
      </div>
    </>
  );
}

/* ── Category data — exactly 4 items matching Figma ─────────────── */
const categories = [
  {
    name:     'Sofa',
    subtitle: 'Luxury Meets Everyday Comfort',
    image:    '/img/AI%20BASED/LIVING%20BEDROOM%20DESIGNS/lr1.webp',
    mainImg:  '/img/AI%20BASED/LIVING%20BEDROOM%20DESIGNS/lr1.webp',
  },
  {
    name:     'Dining Table',
    subtitle: 'Crafted for Meaningful Gatherings',
    image:    '/img/AI%20BASED/DINING%20ROOM%20DESIGN/dr1.webp',
    mainImg:  '/img/AI%20BASED/DINING%20ROOM%20DESIGN/dr1.webp',
  },
  {
    name:     'Bed',
    subtitle: 'Sleep in Timeless Comfort',
    image:    '/img/AI%20BASED/MASTER%20BEDROOM%20DESIGNS/mb5.webp',
    mainImg:  '/img/AI%20BASED/MASTER%20BEDROOM%20DESIGNS/mb5.webp',
  },
  {
    name:     'Wardrobe',
    subtitle: 'Organised, Elegant, Personalised',
    image:    '/img/AI%20BASED/WARDROBE%20DESIGN/WD1.webp',
    mainImg:  '/img/AI%20BASED/WARDROBE%20DESIGN/WD1.webp',
  },
];

/* ── Feature cards — inside ONE connected container ─────────────── */
const features = [
  {
    title:    'Curated Designer\nCollections',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.35} viewBox="0 0 28 28">
        <rect x="3" y="13" width="9" height="7" rx="1.5"/>
        <rect x="3" y="21" width="22" height="3" rx="1.5"/>
        <rect x="12" y="15" width="13" height="5" rx="1.5"/>
        <path d="M5 13V8.5A2.5 2.5 0 0 1 7.5 6h13A2.5 2.5 0 0 1 23 8.5V13"/>
        <circle cx="14" cy="10" r="1.8"/>
      </svg>
    ),
  },
  {
    title:    'Personalized\nDesign Selections',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.35} viewBox="0 0 28 28">
        <rect x="2" y="2" width="10" height="10" rx="1.5"/>
        <rect x="16" y="2" width="10" height="10" rx="1.5"/>
        <rect x="2" y="16" width="10" height="10" rx="1.5"/>
        <rect x="16" y="16" width="10" height="10" rx="1.5"/>
      </svg>
    ),
  },
  {
    title:    'Crafted for Every\nLiving Space',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.35} viewBox="0 0 28 28">
        <path d="M3 14 L14 3 L25 14"/>
        <path d="M5 12.5V24h6v-6h6v6h6V12.5"/>
      </svg>
    ),
  },
];

export default function V4FurnitureCollectionSection() {
  /* active = which dot/category is selected (0-3); we always show 3 cards:
     [active, (active+1)%4, (active+2)%4]  — carousel of 4 total */
  const [active, setActive] = useState(0);
  const total = categories.length; // 4

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  // 3 visible cards: starting from active
  const visible = [0, 1, 2].map((offset) => categories[(active + offset) % total]);
  const mainImage = categories[active].mainImg;

  return (
    <section
      id="v4-furniture"
      className="relative py-24 md:py-32 3xl:py-40 overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, rgba(44,31,20,0.05) 0%, transparent 9%), radial-gradient(ellipse 70% 50% at 6% 0%, rgba(255,255,255,0.45) 0%, transparent 55%), radial-gradient(ellipse 60% 60% at 96% 100%, rgba(201,162,39,0.09) 0%, transparent 55%), #F5EDE0',
      }}
    >
      <Sphere3D />
      <BgPatterns />

      <div className={`relative z-10 ${luxoraSpacing.container}`}>

        {/* ── Eyebrow with gold lines */}
        <div className="flex items-center justify-center gap-4 mb-5" data-v4-reveal-heading>
          <div className="h-px flex-1 max-w-[120px]" style={{ background: 'rgba(180,130,60,0.35)' }} />
          <span className="text-[11px] font-semibold tracking-[0.28em] uppercase whitespace-nowrap" style={{ color: '#B07D3A' }}>
            Furniture Collection
          </span>
          <div className="h-px flex-1 max-w-[120px]" style={{ background: 'rgba(180,130,60,0.35)' }} />
        </div>

        {/* ── Heading */}
        <h2
          className="font-playfair font-normal text-center leading-[1.1] tracking-[-0.02em] mb-5"
          style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', color: '#2C1F14' }}
          data-v4-reveal-heading
        >
          Wide Collection Of Designer Furniture For Every Space
        </h2>

        {/* ── Description */}
        <p
          className="text-center text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-14"
          style={{ color: '#6B4C3B' }}
          data-v4-reveal
        >
          Discover beautifully crafted furniture collections that combine comfort, functionality,
          and timeless aesthetics to elevate every corner of your home.
        </p>

        {/* ── Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-8 items-stretch" data-v4-reveal>

          {/* ─── LEFT PANEL ─── */}
          <div className="relative h-full">

            {/* ← Arrow — left of panel */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute hidden lg:flex items-center justify-center"
              style={{
                left: '-22px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '42px', height: '42px',
                borderRadius: '50%',
                background: '#FDFAF6',
                border: '1.5px solid rgba(201,162,39,0.45)',
                boxShadow: '0 4px 16px rgba(100,60,20,0.10)',
                color: '#C9A227',
                zIndex: 10,
                cursor: 'pointer',
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* → Arrow — right of panel */}
            <button
              onClick={next}
              aria-label="Next"
              className="absolute hidden lg:flex items-center justify-center"
              style={{
                right: '-22px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '42px', height: '42px',
                borderRadius: '50%',
                background: '#FDFAF6',
                border: '1.5px solid rgba(201,162,39,0.45)',
                boxShadow: '0 4px 16px rgba(100,60,20,0.10)',
                color: '#C9A227',
                zIndex: 10,
                cursor: 'pointer',
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Panel card */}
            <div
              className="rounded-3xl p-7 h-full flex flex-col"
              style={{
                background: 'rgba(253,250,246,0.88)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(180,140,95,0.18)',
                boxShadow: '0 8px 36px rgba(100,60,20,0.08)',
              }}
            >
              {/* Panel title — gold italic */}
              <h3
                className="font-playfair italic text-[1.45rem] font-normal mb-6 leading-snug"
                style={{ color: '#B07D3A' }}
              >
                Explore Our Furniture Range
              </h3>

              {/* Category cards — flex-1 fills remaining height */}
              <div className="flex flex-col gap-3 flex-1">
                {visible.map((cat, i) => (
                  <a
                    key={`${active}-${i}`}
                    href="https://luxoralifestyles.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(100,60,20,0.10)] flex-1"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(180,140,95,0.14)',
                      boxShadow: '0 2px 10px rgba(100,60,20,0.04)',
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="flex-shrink-0 rounded-xl overflow-hidden"
                      style={{ width: '76px', height: '76px' }}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="font-playfair text-[1.1rem] font-normal leading-tight mb-1" style={{ color: '#2C1F14' }}>
                        {cat.name}
                      </div>
                      <div className="text-[0.78rem] font-light leading-snug" style={{ color: '#9C7B68' }}>
                        {cat.subtitle}
                      </div>
                    </div>

                    {/* Gold arrow circle */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2C1F14]"
                      style={{ background: '#C9A227', boxShadow: '0 4px 14px rgba(201,162,39,0.35)' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="#FFFFFF" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>

              {/* ── Pagination dots — Figma exact:
                  active = wide gold PILL, inactive = small hollow circles */}
              <div className="flex items-center justify-center gap-2.5 mt-6">
                {categories.map((_, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Go to ${categories[i].name}`}
                      style={{
                        width:        isActive ? '28px' : '10px',
                        height:       '10px',
                        borderRadius: isActive ? '5px' : '50%',
                        background:   isActive ? '#C9A227' : 'transparent',
                        border:       isActive ? 'none' : '1.5px solid rgba(201,162,39,0.50)',
                        transition:   'all 0.3s ease',
                        cursor:       'pointer',
                        padding:      0,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── RIGHT SIDE ─── */}
          <div className="flex flex-col gap-5 h-full">

            {/* Large main image — flex-1 fills available height */}
            <div
              className="relative rounded-2xl overflow-hidden flex-1 min-h-[280px]"
              style={{
                border: '1px solid rgba(180,140,95,0.16)',
                boxShadow: '0 16px 56px rgba(100,60,20,0.12)',
              }}
            >
              <img
                key={mainImage}
                src={mainImage}
                alt="Luxury furniture room"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              />
            </div>

            {/* ── 3 feature cards — SEPARATE cards with gaps (Figma exact) */}
            <div className="grid grid-cols-3 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex flex-col items-center text-center px-4 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(100,60,20,0.09)]"
                  style={{
                    background: '#FDFAF6',
                    border: '1px solid rgba(180,140,95,0.16)',
                    boxShadow: '0 4px 18px rgba(100,60,20,0.05)',
                  }}
                >
                  {/* Circular icon — smaller */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{
                      border: '1.5px solid rgba(201,162,39,0.40)',
                      color: '#C9A227',
                    }}
                  >
                    {f.icon}
                  </div>
                  <h4
                    className="font-playfair text-[0.88rem] font-semibold leading-snug text-center"
                    style={{ color: '#2C1F14', whiteSpace: 'pre-line' }}
                  >
                    {f.title}
                  </h4>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Explore Luxora Lifestyles CTA ── */}
        <div className="flex justify-center mt-12 md:mt-14" data-v4-reveal>
          <a
            href="https://luxoralifestyles.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-[12px] tracking-[0.10em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_46px_rgba(201,162,39,0.35)]"
            style={{ background: '#C9A227', color: '#1C1005', boxShadow: '0 10px 30px rgba(201,162,39,0.30)' }}
          >
            Explore Luxora Lifestyles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}