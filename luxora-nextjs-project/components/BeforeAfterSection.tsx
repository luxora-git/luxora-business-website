'use client';

import { useState } from 'react';
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
    description: 'A dated apartment living room reimagined into a sophisticated contemporary space with Italian marble, custom millwork, and curated furnishings.',
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
    description: 'A cramped kitchen redesigned into a sprawling modular masterpiece with intelligent storage, waterfall island, and premium quartz countertops.',
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
    description: 'An ordinary bedroom elevated into a luxury suite with a bespoke walk-in wardrobe, walnut veneer paneling, and layered ambient lighting.',
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
  const [isDragging, setIsDragging] = useState(false);
  const currentTransform = transformations[activeTab];

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section id="transformations" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-luxora-gold text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4 block">
            Our Work Speaks
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-luxora-navy mb-4">
            Premium Transformations
          </h2>
          <p className="text-luxora-charcoal/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Every project is a narrative of meticulous craftsmanship. Witness the metamorphosis from
            the ordinary to the extraordinary.
          </p>
        </div>

        {/* Room Type Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {transformations.map((t, i) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(i);
                setSliderPosition(50);
              }}
              className={`relative px-5 md:px-7 py-2.5 text-xs md:text-sm tracking-[0.12em] uppercase font-medium transition-all duration-500 ${
                activeTab === i
                  ? 'text-white'
                  : 'text-luxora-charcoal/50 hover:text-luxora-navy border border-luxora-gray/60 hover:border-luxora-gold/40'
              }`}
            >
              {activeTab === i && (
                <span className="absolute inset-0 bg-luxora-navy transition-all duration-500" />
              )}
              <span className="relative z-10">{t.title}</span>
              {activeTab === i && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-luxora-gold" />
              )}
            </button>
          ))}
        </div>

        {/* Luxury Card Container */}
        <div className="relative">
          {/* Decorative accent lines */}
          <div className="absolute -top-3 -left-3 w-full h-full border border-luxora-gold/10 pointer-events-none" />
          <div className="absolute -top-1.5 -left-1.5 w-full h-full border border-luxora-gold/5 pointer-events-none" />

          <div className="relative bg-white border border-luxora-gray/40 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            {/* Comparison Slider */}
            <div
              className="relative w-full h-[350px] sm:h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden cursor-ew-resize select-none"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (full width behind) */}
              <div className="absolute inset-0">
                <Image
                  src={currentTransform.after}
                  alt="After renovation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                  quality={90}
                />
                {/* Glassmorphism After Label */}
                <div className="absolute top-5 right-5 sm:top-7 sm:right-7">
                  <div className="px-4 py-2 bg-white/15 backdrop-blur-[8px] border border-white/25 rounded-sm shadow-lg">
                    <span className="text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase drop-shadow-sm">
                      After
                    </span>
                  </div>
                </div>
              </div>

              {/* Before Image (clipped from right) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="absolute inset-0 w-[100vw]">
                  <Image
                    src={currentTransform.before}
                    alt="Before renovation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority
                    quality={90}
                  />
                  {/* Glassmorphism Before Label */}
                  <div className="absolute top-5 left-5 sm:top-7 sm:left-7">
                    <div className="px-4 py-2 bg-black/30 backdrop-blur-[8px] border border-white/15 rounded-sm shadow-lg">
                      <span className="text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase drop-shadow-sm">
                        Before
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Line with Premium Handle */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white/90 shadow-lg pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Glow effect behind handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white/10 blur-xl" />

                {/* Handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-white rounded-full shadow-[0_0_0_3px_rgba(255,255,255,0.3),0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center transition-all duration-150 hover:shadow-[0_0_0_5px_rgba(255,255,255,0.3),0_4px_25px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                      <path d="M9 1L4 7L9 13" stroke="#0A1F44" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 1L1 7L5 13" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 pointer-events-none" />
            </div>

            {/* Project Details Section */}
            <div className="px-6 md:px-10 lg:px-14 py-8 md:py-10">
              {/* Top Row: Title, Location, Description */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10">
                <div>
                  <div className="text-luxora-gold text-[10px] md:text-xs tracking-[0.25em] uppercase mb-1.5 font-medium">
                    Project
                  </div>
                  <h3 className="font-playfair text-xl md:text-2xl font-bold text-luxora-navy">
                    {currentTransform.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1.5 text-luxora-charcoal/50 text-xs md:text-sm">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1C4.24 1 2 3.24 2 6C2 9.75 7 13 7 13C7 13 12 9.75 12 6C12 3.24 9.76 1 7 1ZM7 7.75C6.04 7.75 5.25 6.96 5.25 6C5.25 5.04 6.04 4.25 7 4.25C7.96 4.25 8.75 5.04 8.75 6C8.75 6.96 7.96 7.75 7 7.75Z" fill="#D4AF37"/>
                    </svg>
                    {currentTransform.location}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-luxora-gold text-[10px] md:text-xs tracking-[0.25em] uppercase mb-1.5 font-medium">
                    Transformation Story
                  </div>
                  <p className="text-luxora-charcoal/60 text-sm md:text-base leading-relaxed">
                    {currentTransform.description}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-luxora-gold/20 to-transparent mb-8" />

              {/* Project Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {currentTransform.details.map((detail) => (
                  <div key={detail.label} className="text-center md:text-left">
                    <div className="text-luxora-gold text-[10px] md:text-xs tracking-[0.25em] uppercase mb-2 font-medium">
                      {detail.label}
                    </div>
                    <div className="font-playfair text-lg md:text-xl lg:text-2xl font-bold text-luxora-navy">
                      {detail.value}
                    </div>
                    {/* Underline accent */}
                    <div className="mt-2 w-8 h-[1px] bg-luxora-gold/30 mx-auto md:mx-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Drag hint */}
        <div className="text-center mt-6">
          <span className="inline-flex items-center gap-2 text-luxora-charcoal/35 text-[10px] md:text-xs tracking-[0.2em] uppercase">
            <span className="w-6 h-[1px] bg-luxora-charcoal/20" />
            Drag the slider to compare
            <span className="w-6 h-[1px] bg-luxora-charcoal/20" />
          </span>
        </div>
      </div>
    </section>
  );
}