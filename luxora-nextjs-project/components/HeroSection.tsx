'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface Slide {
  image: string;
  imageAlt: string;
  eyebrow: string;
  heading: string;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
}

const slides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=90',
    imageAlt: 'Elegant luxury living room with designer furniture and warm lighting',
    eyebrow: 'Interior Design Consultancy',
    heading: 'Your Home, Reimagined By Experts',
    description: 'Full-service interior design from concept to completion. Every detail curated to reflect your taste.',
    primaryCta: 'Book Free Consultation',
    primaryHref: '#contact',
    secondaryCta: 'View Our Work',
    secondaryHref: '#gallery',
  },
  {
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=90',
    imageAlt: 'Modern modular kitchen with premium finishes and island counter',
    eyebrow: 'Modular Kitchen Design',
    heading: 'Kitchens Engineered For Perfection',
    description: 'Custom modular kitchens with German-engineered fittings, premium finishes and intelligent storage.',
    primaryCta: 'Design Your Kitchen',
    primaryHref: '#contact',
    secondaryCta: 'Explore Products',
    secondaryHref: '#products',
  },
  {
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=90',
    imageAlt: 'Luxurious master bedroom with custom headboard and soft textures',
    eyebrow: 'Bedroom Design Studio',
    heading: 'Retreats That Restore & Inspire',
    description: 'Transform your bedroom into a sanctuary of comfort with bespoke furniture, layered lighting and premium textiles.',
    primaryCta: 'Start Your Project',
    primaryHref: '#contact',
    secondaryCta: 'See Bedroom Designs',
    secondaryHref: '#gallery',
  },
  {
    image: 'https://images.unsplash.com/photo-1597006335772-25b0e72c1e1a?w=1920&q=90',
    imageAlt: 'Custom luxury wardrobe with glass doors and ambient lighting',
    eyebrow: 'Custom Wardrobe Solutions',
    heading: 'Storage That Makes A Statement',
    description: 'Bespoke wardrobes designed around your wardrobe — with premium materials, smart organisation and flawless finishes.',
    primaryCta: 'Book a Consultation',
    primaryHref: '#contact',
    secondaryCta: 'View Collections',
    secondaryHref: '#products',
  },
];

const trustBarItems = [
  { value: '500+', label: 'Homes Delivered' },
  { value: '15', label: 'Years Experience' },
  { value: '50+', label: 'Expert Designers' },
  { value: '100%', label: 'Transparency Guaranteed' },
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
    }, 5000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isHovered) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isHovered, startAutoPlay, stopAutoPlay]);

  const slide = slides[currentSlide];

  return (
    <section
      id="home"
      className="relative h-screen min-h-[700px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images with Fade Transition */}
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
            className="w-full h-full object-cover scale-105"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      ))}

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-8 md:px-12 lg:px-16">
          <div className="max-w-[600px]">
            {/* Eyebrow */}
            <div key={`eyebrow-${currentSlide}`} className="animate-fadeIn">
              <span className="block text-luxora-gold text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-semibold mb-5">
                {slide.eyebrow}
              </span>
            </div>

            {/* Heading - max 2 lines */}
            <h1
              key={`heading-${currentSlide}`}
              className="font-playfair text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-bold text-white leading-[1.08] tracking-[-0.01em] mb-5 max-w-[600px] animate-slideUp line-clamp-2"
            >
              {slide.heading}
            </h1>

            {/* Description - max 2 lines */}
            <p
              key={`desc-${currentSlide}`}
              className="text-sm md:text-base text-white/70 leading-relaxed font-light max-w-[460px] mb-8 animate-fadeIn line-clamp-2"
            >
              {slide.description}
            </p>

            {/* CTA Buttons */}
            <div
              key={`cta-${currentSlide}`}
              className="flex flex-col sm:flex-row gap-3 mb-4 md:mb-6 animate-slideUp"
            >
              <a
                href={slide.primaryHref}
                className="inline-flex items-center justify-center px-10 py-4 bg-luxora-gold hover:bg-white text-luxora-navy font-semibold text-[13px] tracking-[0.08em] uppercase transition-all duration-300 group"
              >
                {slide.primaryCta}
                <svg className="w-[13px] h-[13px] ml-2.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href={slide.secondaryHref}
                className="inline-flex items-center justify-center px-10 py-4 bg-transparent hover:bg-white/[0.08] text-white font-semibold text-[13px] tracking-[0.08em] uppercase transition-all duration-300 border border-white/25 hover:border-white/50 group"
              >
                {slide.secondaryCta}
                <svg className="w-[13px] h-[13px] ml-2.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Premium Search Bar */}
            <div key={`search-${currentSlide}`} className="animate-fadeIn max-w-[520px]">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search designs, rooms, styles or ideas"
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/40 pl-12 pr-5 py-4 text-sm tracking-wide transition-all duration-300 focus:outline-none focus:border-luxora-gold/60 focus:bg-white/15 group-hover:border-white/30"
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                  <span className="hidden sm:inline-block px-3 py-1.5 bg-luxora-gold/20 text-luxora-gold text-[10px] tracking-[0.1em] uppercase font-semibold border border-luxora-gold/30">
                    Search
                  </span>
                </div>
              </div>
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
      <div className="absolute bottom-32 md:bottom-36 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
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

      {/* Trust Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-luxora-navy/85 backdrop-blur-md border-t border-white/[0.06]">
        <div className="max-w-[90rem] mx-auto px-8 md:px-12 lg:px-16 py-6">
          <div className="flex items-center justify-center md:justify-start gap-8 md:gap-16">
            {trustBarItems.map((item, index) => (
              <div key={item.label} className="flex items-center gap-8 md:gap-16">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xl md:text-2xl font-bold font-playfair text-luxora-gold leading-none mb-1">
                    {item.value}
                  </span>
                  <span className="text-[10px] md:text-[11px] text-white/50 tracking-[0.08em] uppercase font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
                {index < trustBarItems.length - 1 && (
                  <div className="w-px h-8 bg-white/[0.1]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}