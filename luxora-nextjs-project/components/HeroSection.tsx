'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { luxoraStats } from '@/lib/content/global/stats';

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
    description:
      'Full-service interior design from concept to completion. Every detail curated to reflect your taste and elevate your everyday living.',
  },
  {
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=95',
    imageAlt: 'Modern modular kitchen with premium finishes and waterfall island',
    eyebrow: 'Modular Kitchens',
    heading: 'Kitchens Crafted For Life & Luxury',
    description:
      'Custom modular kitchens with German-engineered fittings, premium quartz countertops, and intelligent storage that makes every square foot count.',
  },
  {
    image: '/services/wardrobe.jpg',
    imageAlt: 'Premium custom wardrobe with glass doors and ambient lighting',
    eyebrow: 'Wardrobe Solutions',
    heading: 'Storage That Elevates Your Space',
    description:
      'Bespoke wardrobe solutions designed around your lifestyle — with premium materials, smart organisation and flawless finishes.',
  },
];

const trustItems = [luxoraStats.freeSiteVisitLabel, '3D Design Preview', 'Transparent Pricing', `${luxoraStats.warrantyYears} Year Warranty`];

const statCards = [
  { value: luxoraStats.homesDelivered, label: 'Homes Delivered' },
  { value: `${luxoraStats.clientRating}`, label: 'Client Rating' },
  { value: 'ZERO', label: 'Hidden Costs' },
  { value: luxoraStats.avgDeliveryDays, label: 'Day Avg. Delivery' },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

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
    <>
      <style jsx>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-fade-in  { animation: heroFadeIn  0.65s ease forwards; }
        .hero-slide-up { animation: heroSlideUp 0.7s ease forwards; }

        /* Ken-Burns subtle zoom on active slide image */
        .slide-img-active {
          animation: kenBurns 8s ease-in-out forwards;
        }
        @keyframes kenBurns {
          from { transform: scale(1.04); }
          to   { transform: scale(1.0); }
        }

        /* Stat card entrance stagger */
        .stat-card-enter {
          animation: heroFadeIn 0.6s ease forwards;
        }
      `}</style>

      <section
        id="home"
        className="relative h-screen min-h-[700px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ─── Background Images ─── */}
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
              className={`w-full h-full object-cover ${index === currentSlide ? 'slide-img-active' : ''}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallback) {
                  target.dataset.fallback = 'true';
                  target.src =
                    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80';
                }
              }}
            />
          </div>
        ))}

        {/* ─── Overlay: lighter than before, images breathe more ─── */}
        {/* Primary directional gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,16,30,0.75)] via-[rgba(8,16,30,0.35)] to-[rgba(8,16,30,0.05)]" />
        {/* Subtle bottom vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,16,30,0.35)] via-transparent to-transparent" />

        {/* ─── Floating Stat Cards — desktop only ─── */}
        <div className="absolute right-8 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3">
          {statCards.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card-enter bg-[rgba(13,27,42,0.70)] backdrop-blur-[20px] border border-[#C9A227]/20 border-l-2 border-l-[#C9A227]/60 rounded-none px-6 py-4 transition-all duration-300 hover:bg-[rgba(8,15,28,0.85)] hover:border-[#C9A227]/40 group"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div
                className="text-[#C9A227] font-playfair text-2xl font-semibold leading-none mb-1 transition-all duration-300"
                style={{ textShadow: '0 2px 12px rgba(201,162,39,0.35)' }}
              >
                {stat.value}
              </div>
              <div className="text-white/65 text-[10px] tracking-[0.14em] uppercase font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Hero Content ─── */}
        <div className="relative z-10 h-full flex items-center">
          {/*
            pt-[152px] on mobile ensures the eyebrow clears the
            utility strip (36px) + nav (72px) + some breathing room.
            On desktop (md+) the nav is taller, so we push more.
          */}
          <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="max-w-[640px]">

              {/* Eyebrow — animated per slide */}
              <div key={`eyebrow-${currentSlide}`} className="hero-fade-in">
                <span className="block text-luxora-gold text-[11px] md:text-xs tracking-[0.24em] uppercase font-semibold mb-5 drop-shadow-sm">
                  {slide.eyebrow}
                </span>
              </div>

              {/* Heading — clamped so it never exceeds 2 lines */}
              <h1
                key={`heading-${currentSlide}`}
                className="font-playfair italic font-normal text-white leading-[1.08] tracking-[-0.02em] mb-6 drop-shadow-lg hero-slide-up"
                style={{
                  fontSize: 'clamp(2.1rem, 4.2vw, 4.6rem)',
                  maxWidth: '13ch',          /* forces 2-line wrap at most sizes */
                  wordBreak: 'break-word',
                }}
              >
                {slide.heading}
              </h1>

              {/* Description */}
              <p
                key={`desc-${currentSlide}`}
                className="text-sm md:text-[15px] text-white/80 leading-relaxed font-light max-w-[500px] mb-10 drop-shadow-md hero-fade-in"
              >
                {slide.description}
              </p>

              {/* CTA Buttons */}
              <div
                key={`cta-${currentSlide}`}
                className="flex flex-col sm:flex-row gap-4 hero-slide-up mb-8"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-9 py-4 bg-luxora-gold hover:bg-white text-luxora-navy font-semibold text-[13px] tracking-[0.08em] uppercase transition-all duration-300 group shadow-[0_0_30px_rgba(201,162,39,0.28)]"
                >
                  Book Free Consultation
                  <svg
                    className="w-[13px] h-[13px] ml-2.5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#gallery"
                  className="inline-flex items-center justify-center px-9 py-4 bg-transparent hover:bg-white/10 text-white font-semibold text-[13px] tracking-[0.08em] uppercase transition-all duration-300 border border-[#C9A227]/50 hover:border-[#C9A227] group"
                >
                  Explore Designs
                  <svg
                    className="w-[13px] h-[13px] ml-2.5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Gold divider */}
              <div className="w-12 h-px bg-gradient-to-r from-[#C9A227]/70 via-[#C9A227]/40 to-transparent mb-6" />

              {/* Trust Row */}
              <div
                key={`trust-${currentSlide}`}
                className="flex flex-wrap gap-x-5 gap-y-2.5 hero-fade-in"
              >
                {trustItems.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <svg
                      className="w-3.5 h-3.5 text-luxora-gold flex-shrink-0 drop-shadow-sm"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/70 text-[11px] md:text-xs tracking-[0.09em] font-medium drop-shadow-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ─── Left Arrow — round on mobile, square-ish on desktop ─── */}
        <button
          onClick={prevSlide}
          className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20
                     w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
                     rounded-full md:rounded-none
                     bg-black/25 md:bg-transparent
                     backdrop-blur-sm md:backdrop-blur-none
                     hover:bg-[#C9A227]/20 border border-[#C9A227]/35 hover:border-[#C9A227]
                     text-[#C9A227] transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* ─── Right Arrow ─── */}
        <button
          onClick={nextSlide}
          className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20
                     w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
                     rounded-full md:rounded-none
                     bg-black/25 md:bg-transparent
                     backdrop-blur-sm md:backdrop-blur-none
                     hover:bg-[#C9A227]/20 border border-[#C9A227]/35 hover:border-[#C9A227]
                     text-[#C9A227] transition-all duration-300 group"
          aria-label="Next slide"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* ─── Pagination Dots — pill for active ─── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentSlide
                  ? 'w-8 h-[5px] bg-luxora-gold shadow-[0_0_10px_rgba(201,162,39,0.55)]'
                  : 'w-[5px] h-[5px] bg-white/30 hover:bg-[#C9A227]/55'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}