'use client';

import { useState } from 'react';

const transformations = [
  {
    id: 'living-room',
    before: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    title: 'Luxury Living Room',
    location: 'Worli, Mumbai',
    description: 'A dated apartment living room transformed into a sophisticated contemporary space with Italian marble, custom millwork, and curated furnishings.',
  },
  {
    id: 'kitchen',
    before: 'https://images.unsplash.com/photo-1556909114-44e3e9a7c4b4?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
    title: 'Modular Kitchen',
    location: 'Indiranagar, Bangalore',
    description: 'A cramped kitchen redesigned into a spacious modular masterpiece with intelligent storage and premium quartz countertops.',
  },
  {
    id: 'bedroom',
    before: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&q=80',
    title: 'Master Bedroom Suite',
    location: 'Vasant Vihar, Delhi',
    description: 'An ordinary bedroom elevated into a luxury suite with a bespoke walk-in wardrobe, veneer paneling, and ambient lighting.',
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
        <div className="text-center mb-16">
          <span className="text-luxora-gold text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4 block">
            Our Work Speaks
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-luxora-navy mb-4">
            Before & After Transformations
          </h2>
          <p className="text-luxora-charcoal/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Witness the dramatic transformations we create. Every project is a testament to our design expertise and attention to detail.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {transformations.map((t, i) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(i);
                setSliderPosition(50);
              }}
              className={`px-6 py-2.5 text-sm tracking-[0.1em] uppercase font-medium transition-all duration-500 border ${
                activeTab === i
                  ? 'bg-luxora-navy border-luxora-navy text-white'
                  : 'bg-transparent border-luxora-gray text-luxora-charcoal/60 hover:border-luxora-gold hover:text-luxora-navy'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Comparison Slider */}
        <div
          className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden cursor-ew-resize select-none"
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
            <img
              src={currentTransform.after}
              alt="After renovation"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-luxora-gold text-luxora-navy px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase">
              After
            </div>
          </div>

          {/* Before Image (clipped from right) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="absolute inset-0 w-[100vw]">
              <img
                src={currentTransform.before}
                alt="Before renovation"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase">
                Before
              </div>
            </div>
          </div>

          {/* Slider Line */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white shadow-lg pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Slider Handle */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-2xl flex items-center justify-center">
              <div className="flex gap-1 sm:gap-1.5">
                <div className="w-[2px] h-3 sm:h-4 bg-luxora-navy rounded-full" />
                <div className="w-[2px] h-3 sm:h-4 bg-luxora-gold rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Drag hint */}
        <div className="text-center mt-4">
          <span className="text-luxora-charcoal/40 text-xs tracking-[0.15em] uppercase">
            ← Drag the slider to compare →
          </span>
        </div>

        {/* Project details */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="text-luxora-gold text-xs tracking-[0.2em] uppercase mb-1">Project</div>
            <div className="text-luxora-navy font-semibold text-lg">{currentTransform.title}</div>
          </div>
          <div className="text-center">
            <div className="text-luxora-gold text-xs tracking-[0.2em] uppercase mb-1">Location</div>
            <div className="text-luxora-navy font-semibold text-lg">{currentTransform.location}</div>
          </div>
          <div className="text-center md:text-right">
            <div className="text-luxora-gold text-xs tracking-[0.2em] uppercase mb-1">Transformation</div>
            <p className="text-luxora-charcoal/60 text-sm leading-relaxed max-w-xs mx-auto md:ml-auto">
              {currentTransform.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}