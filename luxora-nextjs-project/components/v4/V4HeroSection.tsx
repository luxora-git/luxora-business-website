'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { useConsultationModal } from './modal';
import { luxoraStats } from '@/lib/content/global/stats';

interface Slide {
  image: string;
  imageAlt: string;
  eyebrow: string;
  heading: string;
  headingItalic?: string;
  description: string;
}

const slides: Slide[] = [
  {
    image:         '',
    imageAlt:      'Luxora luxury interior design showcase',
    eyebrow:       'Premium Interior Design',
    heading:       'Where Every Detail',
    headingItalic: 'Tells Your Story',
    description:   'Full-service interior design from concept to completion — curated to reflect your taste and elevate everyday living.',
  },
  {
    image:       '/img/General/main-banner-kit-1.webp',
    imageAlt:    'Real Luxora kitchen with premium finishes',
    eyebrow:     'Modular Kitchens',
    heading:     'Kitchens Crafted',
    headingItalic: 'For Life & Luxury',
    description: 'Custom modular kitchens with German-engineered fittings, quartz countertops, and intelligent storage.',
  },
  {
    image:       '/img/General/hero-banner-living-1.webp',
    imageAlt:    'Real Luxora living room with a family at home',
    eyebrow:     'Living Spaces',
    heading:     'Rooms Designed',
    headingItalic: 'For Real Life',
    description: 'Living rooms shaped around how you actually live — warm materials, considered layouts, and space that brings everyone together.',
  },
  {
    image:       '/img/General/hero-banner-bedroom-1.webp',
    imageAlt:    'Real Luxora master bedroom with layered ambient lighting',
    eyebrow:     'Bedroom Retreats',
    heading:     'Rest, Redefined',
    headingItalic: 'In Timeless Comfort',
    description: 'Master bedrooms tuned for the end of the day — soft textiles, ambient lighting, and bespoke storage built into the architecture.',
  },
];

const trustItems = [luxoraStats.freeSiteVisitLabel, '3D Design Preview', 'Transparent Pricing', `${luxoraStats.warrantyYears} Year Warranty`];

const statCards = [
  { value: luxoraStats.homesDelivered,        label: 'Homes Delivered' },
  { value: `${luxoraStats.clientRating}★`,    label: 'Client Rating'   },
  { value: 'ZERO',                            label: 'Hidden Costs'    },
  { value: luxoraStats.avgDeliveryDays,       label: 'Day Delivery'    },
];

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function V4HeroSection() {
  const { open: openConsultationModal } = useConsultationModal();
  const [currentSlide, setCurrentSlide]       = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered]             = useState(false);
  const autoPlayRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef      = useRef<HTMLElement>(null);
  const heroContentRef  = useRef<HTMLDivElement>(null);
  const initialAnimDone = useRef(false);
  const ytPlayerRef     = useRef<any>(null);
  const ytApiLoaded     = useRef(false);

  /* ── YouTube IFrame API — load once, kill captions on ready ── */
  useEffect(() => {
    if (ytApiLoaded.current) return;
    ytApiLoaded.current = true;

    const initPlayer = () => {
      ytPlayerRef.current = new window.YT.Player('hero-yt-iframe', {
        events: {
          onReady: (event: any) => {
            try {
              event.target.unloadModule('captions');
              event.target.unloadModule('cc');
            } catch (_) {}
          },
          onStateChange: (event: any) => {
            // Re-kill captions every time playback starts
            if (event.data === window.YT.PlayerState.PLAYING) {
              try {
                ytPlayerRef.current?.unloadModule('captions');
                ytPlayerRef.current?.unloadModule('cc');
              } catch (_) {}
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };

      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    }
  }, []);

  /* ── GSAP text reveal ─────────────────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;
    const first = !initialAnimDone.current;
    initialAnimDone.current = true;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (first) {
        tl.fromTo('[data-h-eyebrow]', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.9 })
          .fromTo('[data-h-heading]', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, '-=0.5')
          .fromTo('[data-h-desc]',    { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.85 }, '-=0.3')
          .fromTo('[data-h-cta]',     { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8  }, '-=0.4')
          .fromTo('[data-h-trust]',   { opacity: 0       }, { opacity: 1,        duration: 0.7  }, '-=0.3')
          .fromTo('[data-h-stats]',   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7  }, '-=0.5');
      } else {
        tl.fromTo('[data-h-eyebrow]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35 })
          .fromTo('[data-h-heading]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, '-=0.1');
      }
    }, heroContentRef);
    return () => ctx.revert();
  }, [currentSlide]);

  /* ── Slide navigation ─────────────────────────────────────────── */
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => goToSlide((currentSlide + 1) % slides.length), [currentSlide, goToSlide]);
  const prevSlide = useCallback(() => goToSlide((currentSlide - 1 + slides.length) % slides.length), [currentSlide, goToSlide]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(
      () => setCurrentSlide((p) => (p + 1) % slides.length),
      currentSlide === 0 ? 10000 : 6000
    );
  }, [currentSlide]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) { clearInterval(autoPlayRef.current); autoPlayRef.current = null; }
  }, []);

  useEffect(() => {
    if (!isHovered) startAutoPlay(); else stopAutoPlay();
    return () => stopAutoPlay();
  }, [isHovered, startAutoPlay, stopAutoPlay]);

  const slide   = slides[currentSlide];
  const isVideo = currentSlide === 0;

  return (
    <>
      <style jsx>{`
        .kb { animation: kb 9s ease-in-out forwards; }
        @keyframes kb { from { transform: scale(1.05); } to { transform: scale(1.0); } }
      `}</style>

      <section
        id="v4-home"
        ref={sectionRef}
        className="relative h-screen min-h-[760px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {/* ── Slide backgrounds ─────────────────────────────────── */}
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-in-out ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            {i === 0 ? (
              <div className="absolute inset-0 overflow-hidden bg-[#1C1005]">
                {/* Transparent overlay blocks user interaction with iframe (prevents subtitle click) */}
                <div className="absolute inset-0 z-10 pointer-events-none" />
                <iframe
                  id="hero-yt-iframe"
                  src="https://www.youtube.com/embed/153mazee_1w?autoplay=1&mute=1&loop=1&playlist=153mazee_1w&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&cc_load_policy=0&cc_lang_pref=&widget_referrer=luxora"
                  className="absolute"
                  style={{
                    top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: 'max(100%, 177.78vh)',
                    height: 'max(100%, 56.25vw)',
                    minWidth: '100%', minHeight: '100%',
                    border: 'none', pointerEvents: 'none',
                  }}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title="Luxora"
                />
              </div>
            ) : (
              <img
                src={s.image}
                alt={s.imageAlt}
                className={`w-full h-full object-cover ${i === currentSlide ? 'kb' : ''}`}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/img/AI%20BASED/LIVING%20BEDROOM%20DESIGNS/lr1.webp'; }
                }}
              />
            )}
          </div>
        ))}

        {/* ── Gradient overlays ─────────────────────────────────── */}
        {isVideo ? (
          <>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(28,22,16,0.30) 0%, rgba(28,22,16,0.05) 70%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,22,16,0.55) 0%, transparent 35%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(28,22,16,0.20) 0%, transparent 20%)' }} />
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(28,22,16,0.82) 0%, rgba(28,22,16,0.50) 45%, rgba(28,22,16,0.08) 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,22,16,0.65) 0%, transparent 40%)' }} />
          </>
        )}

        {/* ══ CONTENT ═══════════════════════════════════════════════ */}
        <div ref={heroContentRef} className="relative z-10 h-full flex flex-col">

          {isVideo ? (
            /* ── VIDEO SLIDE: Centered cinematic layout */
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-36">
              <div data-h-eyebrow className="mb-7">
                <span
                  className="inline-flex items-center gap-2 text-[11px] md:text-[12px] tracking-[0.28em] uppercase font-semibold px-5 py-2.5 rounded-full"
                  style={{
                    color: '#C9A227',
                    background: 'rgba(201,162,39,0.12)',
                    border: '1px solid rgba(201,162,39,0.35)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
                  {slide.eyebrow}
                </span>
              </div>

              <h1
                className="font-playfair font-normal text-white leading-[1.05] tracking-[-0.03em] mb-7 drop-shadow-2xl"
                style={{ fontSize: 'clamp(1.9rem, 3.6vw, 4rem)' }}
              >
                <span data-h-heading className="block">{slide.heading}</span>
                {slide.headingItalic && (
                  <span data-h-heading className="block font-playfair italic" style={{ color: 'rgba(253,250,246,0.90)' }}>
                    {slide.headingItalic}
                  </span>
                )}
              </h1>

              <p
                data-h-desc
                className="text-base md:text-[1.1rem] font-light leading-[1.75] mb-10 max-w-[520px] drop-shadow-md"
                style={{ color: 'rgba(253,250,246,0.75)' }}
              >
                {slide.description}
              </p>

              <div data-h-cta className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                <button
                  type="button"
                  onClick={openConsultationModal}
                  className="inline-flex items-center justify-center px-9 py-4 rounded-full font-bold text-[13px] tracking-[0.08em] uppercase transition-all duration-300 hover:-translate-y-0.5 group"
                  style={{ background: '#C9A227', color: '#1C1005', boxShadow: '0 0 40px rgba(201,162,39,0.40)' }}
                >
                  Book Free Consultation
                  <svg className="w-3.5 h-3.5 ml-2.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </button>
                <a
                  href="/gallery"
                  className="inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-[13px] tracking-[0.08em] uppercase transition-all duration-300 hover:bg-white/10 group"
                  style={{ color: '#FFFFFF', border: '1px solid rgba(201,162,39,0.50)' }}
                >
                  Explore Designs
                  <svg className="w-3.5 h-3.5 ml-2.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              </div>

              <div data-h-trust className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {trustItems.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="#C9A227" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span className="text-[11px] font-medium tracking-[0.08em]" style={{ color: 'rgba(255,255,255,0.72)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          ) : (
            /* ── IMAGE SLIDES: Bottom-anchored editorial layout */
            <div className="flex-1 flex flex-col justify-end px-6 sm:px-8 md:px-12 lg:px-16 pb-36">
              <div className="max-w-[680px]">
                <div data-h-eyebrow className="mb-5">
                  <span
                    className="inline-block text-[11px] tracking-[0.24em] uppercase font-semibold px-4 py-2 rounded-full"
                    style={{ color: '#C9A227', background: 'rgba(28,22,16,0.40)', border: '1px solid rgba(201,162,39,0.35)', backdropFilter: 'blur(8px)' }}
                  >
                    {slide.eyebrow}
                  </span>
                </div>

                <h1
                  className="font-playfair font-normal text-white leading-[1.05] tracking-[-0.025em] mb-5 drop-shadow-2xl"
                  style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.8rem)' }}
                >
                  <span data-h-heading className="block">{slide.heading}</span>
                  {slide.headingItalic && (
                    <span data-h-heading className="block font-playfair italic">
                      {slide.headingItalic}
                    </span>
                  )}
                </h1>

                <p
                  data-h-desc
                  className="text-base md:text-[1.05rem] font-light leading-[1.75] mb-8 max-w-[440px] drop-shadow-md"
                  style={{ color: 'rgba(253,250,246,0.72)' }}
                >
                  {slide.description}
                </p>

                <div data-h-cta className="flex flex-col sm:flex-row gap-3.5 mb-8">
                  <button
                    type="button"
                    onClick={openConsultationModal}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-[12px] tracking-[0.08em] uppercase transition-all duration-300 hover:-translate-y-0.5 group"
                    style={{ background: '#C9A227', color: '#1C1005', boxShadow: '0 0 32px rgba(201,162,39,0.38)' }}
                  >
                    Book Free Consultation
                    <svg className="w-3.5 h-3.5 ml-2.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </button>
                  <a
                    href="/gallery"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-[12px] tracking-[0.08em] uppercase transition-all duration-300 hover:bg-white/10 group"
                    style={{ color: '#FFFFFF', border: '1px solid rgba(201,162,39,0.45)' }}
                  >
                    View Our Work
                    <svg className="w-3.5 h-3.5 ml-2.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </a>
                </div>

                <div data-h-trust className="flex flex-wrap gap-x-5 gap-y-2">
                  {trustItems.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="#C9A227" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span className="text-[11px] font-medium tracking-[0.06em]" style={{ color: 'rgba(255,255,255,0.68)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Stats — right-side floating cards on IMAGE slides only ── */}
        {!isVideo && (
          <div
            data-h-stats
            className="absolute right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-3"
          >
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="backdrop-blur-xl border rounded-xl px-5 py-3.5 transition-all duration-300 hover:border-[#C9A227]/40"
                style={{ background: 'rgba(20,18,16,0.72)', borderColor: 'rgba(255,255,255,0.10)' }}
              >
                <div className="font-playfair text-xl font-bold leading-none mb-1 text-white">{stat.value}</div>
                <div className="text-[9px] tracking-[0.12em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.60)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── Prev / Next arrows ──────────────────────────────────── */}
        {[
          { fn: prevSlide, side: 'left-5 md:left-8', icon: 'M15 19l-7-7 7-7', label: 'Previous' },
          { fn: nextSlide, side: 'right-5 md:right-8', icon: 'M9 5l7 7-7 7', label: 'Next' },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.fn}
            aria-label={btn.label}
            className={`absolute ${btn.side} top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110`}
            style={{
              background: 'rgba(253,250,246,0.10)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(201,162,39,0.35)',
              color: '#C9A227',
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={btn.icon}/>
            </svg>
          </button>
        ))}

        {/* ── Slide pagination dots ────────────────────────────────── */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 lg:bottom-24">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className="transition-all duration-500 rounded-full"
              style={{
                width:      i === currentSlide ? '28px' : '6px',
                height:     '6px',
                background: i === currentSlide ? '#C9A227' : 'rgba(255,255,255,0.38)',
                boxShadow:  i === currentSlide ? '0 0 10px rgba(201,162,39,0.55)' : 'none',
              }}
            />
          ))}
        </div>

        {/* ── Scroll indicator ────────────────────────────────────── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-1.5"
          style={{ bottom: '88px' }}
        >
          <span className="text-[9px] tracking-[0.24em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Scroll</span>
          <div
            className="w-px h-8"
            style={{
              background: 'linear-gradient(to bottom, rgba(201,162,74,0.60), transparent)',
              animation: 'scrollPulse 1.8s ease-in-out infinite',
            }}
          />
        </div>

      </section>

      <style jsx global>{`
        @keyframes scrollPulse {
          0%,100% { opacity: 0.4; transform: scaleY(0.8); }
          50%      { opacity: 1;   transform: scaleY(1);   }
        }
      `}</style>
    </>
  );
}