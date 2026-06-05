'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface Slide {
  image: string;
  imageAlt: string;
  eyebrow: string;
  heading: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=95',
    imageAlt: 'Minimal luxury living room with floor-to-ceiling windows and natural daylight',
    eyebrow: 'Full Home Interiors',
    heading: 'Where Every Detail Tells Your Story',
    description: 'Full-service interior design from concept to completion. Every detail curated to reflect your taste and elevate your everyday living.',
  },
  {
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=95',
    imageAlt: 'Modern modular kitchen with premium finishes and waterfall island',
    eyebrow: 'Modular Kitchens',
    heading: 'Kitchens Crafted For Life & Luxury',
    description: 'Custom modular kitchens with German-engineered fittings, premium quartz countertops, and intelligent storage that makes every square foot count.',
  },
  {
    image: '/services/wardrobe.jpg',
    imageAlt: 'Premium custom wardrobe with glass doors and ambient lighting',
    eyebrow: 'Wardrobe Solutions',
    heading: 'Storage That Elevates Your Space',
    description: 'Bespoke wardrobe solutions designed around your lifestyle — with premium materials, smart organisation and flawless finishes.',
  },
];

const trustItems = [
  'Free Site Visit',
  '3D Design Preview',
  'Transparent Pricing',
  '10 Year Warranty',
];

const statCards = [
  { value: '500+', label: 'Homes Delivered' },
  { value: '4.9', label: 'Client Rating' },
  { value: '₹0', label: 'Hidden Costs' },
  { value: '45', label: 'Day Avg. Delivery' },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isHovered) startAutoPlay();
    else stopAutoPlay();
    return () => stopAutoPlay();
  }, [isHovered, startAutoPlay, stopAutoPlay]);

  const slide = slides[currentSlide];

  return (
    <section
      id="home"
      className="relative h-[90vh] min-h-[680px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images with fallback */}
      {slides.map((s, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={s.image}
            alt={s.imageAlt}
            className="w-full h-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallback) {
                target.dataset.fallback = 'true';
                target.src = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80';
              }
            }}
          />
        </div>
      ))}

      {/* Strong left-to-right gradient — dark left for text, fades to lighter right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

      {/* Floating Stat Cards (right side, desktop only) — dark luxury glassmorphism */}
      <div className="absolute right-8 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3">
        {statCards.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-[rgba(8,15,28,0.75)] backdrop-blur-[18px] border border-white/10 rounded-lg px-5 py-3.5 transition-all duration-300 hover:bg-[rgba(8,15,28,0.85)] hover:border-[#C9A227]/40"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-white font-playfair text-xl font-bold leading-none mb-0.5">
              {stat.value}
            </div>
            <div className="text-white/70 text-[10px] tracking-[0.12em] uppercase font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-8 md:px-12 lg:px-16">
          <div className="max-w-[650px]">
            {/* Eyebrow */}
            <div key={`eyebrow-${currentSlide}`} className="animate-fadeIn">
              <span className="block text-luxora-gold text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold mb-6 drop-shadow-sm">
                {slide.eyebrow}
              </span>
            </div>

            {/* Heading — no truncation, max-width 650px */}
            <h1
              key={`heading-${currentSlide}`}
              className="font-playfair text-[2.75rem] sm:text-[4rem] lg:text-[5rem] font-bold text-white leading-[1.08] tracking-[-0.015em] mb-6 drop-shadow-lg animate-slideUp max-w-[650px]"
            >
              {slide.heading}
            </h1>

            {/* Description — no truncation */}
            <p
              key={`desc-${currentSlide}`}
              className="text-sm md:text-base text-white/80 leading-relaxed font-light max-w-[520px] mb-10 drop-shadow-md animate-fadeIn"
            >
              {slide.description}
            </p>

            {/* CTA Buttons */}
            <div
              key={`cta-${currentSlide}`}
              className="flex flex-col sm:flex-row gap-4 animate-slideUp"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-luxora-gold hover:bg-white text-luxora-navy font-semibold text-[13px] tracking-[0.08em] uppercase transition-all duration-300 group shadow-lg shadow-luxora-gold/20"
              >
                Book Free Consultation
                <svg className="w-[13px] h-[13px] ml-2.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center justify-center px-10 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold text-[13px] tracking-[0.08em] uppercase transition-all duration-300 border border-white/30 hover:border-white/60 group shadow-lg"
              >
                Explore Designs
                <svg className="w-[13px] h-[13px] ml-2.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Trust Row */}
            <div
              key={`trust-${currentSlide}`}
              className="flex flex-wrap gap-x-6 gap-y-2 mt-10 animate-fadeIn"
            >
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-luxora-gold flex-shrink-0 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/70 text-xs tracking-wide font-medium drop-shadow-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/15 text-white transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/15 text-white transition-all duration-300 group"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-400 rounded-full ${
              index === currentSlide
                ? 'w-8 h-[6px] bg-luxora-gold'
                : 'w-[6px] h-[6px] bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}