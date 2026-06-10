'use client';

import { useEffect, useState } from 'react';

const categoryLabels = ['Furniture', 'Lighting', 'Décor', 'Home Fragrance', 'Lifestyle Essentials'];

export default function LuxoraLifestyles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full bg-[#F7F4EE] overflow-hidden py-16 md:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center">
          {/* ── LEFT: LARGE HERO IMAGE (65% on desktop) ── */}
          <div
            className={`w-full md:w-[65%] transition-all duration-[1000ms] ease-out ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative aspect-[4/3] md:aspect-auto md:h-[550px] lg:h-[620px] xl:h-[680px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=85"
                alt="Curated luxury lifestyle collection"
                className="w-full h-full object-cover"
                style={{
                  animation: mounted
                    ? 'editorialReveal 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
                    : 'none',
                }}
              />
              {/* Subtle editorial gradient on image edge */}
              <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-r from-transparent to-[#F7F4EE] hidden md:block pointer-events-none" />
            </div>
          </div>

          {/* ── RIGHT: CONTENT (35% on desktop) ── */}
          <div className="w-full md:w-[35%] px-6 md:px-10 lg:px-14 md:px-0 md:pl-10 lg:pl-14 xl:pl-16 mt-6 md:mt-0">
            <div
              className={`transition-all duration-[800ms] delay-[200ms] ease-out ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-px w-6 bg-gradient-to-r from-transparent via-luxora-gold/40 to-transparent" />
                <span className="text-luxora-gold/70 text-[10px] font-semibold tracking-[0.35em] uppercase">
                  Luxora Lifestyles
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl xl:text-[52px] font-bold text-[#1A1A1A] leading-[1.1] tracking-tight">
                Curated Luxury{' '}
                <span className="bg-gradient-to-r from-[#C9A96E] via-luxora-gold to-[#E8C84A] bg-clip-text text-transparent">
                  Beyond Interiors
                </span>
              </h2>

              {/* Subtext */}
              <p className="mt-4 text-[#1A1A1A]/50 text-sm md:text-base leading-relaxed font-light font-inter max-w-sm">
                Furniture, lighting, décor, fragrances and lifestyle essentials selected to elevate modern luxury living.
              </p>

              {/* Category labels */}
              <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5">
                {categoryLabels.map((label, i) => (
                  <span key={label} className="flex items-center gap-2">
                    <span className="text-[#1A1A1A]/40 text-[11px] md:text-xs font-medium tracking-[0.08em]">
                      {label}
                    </span>
                    {i < categoryLabels.length - 1 && (
                      <span className="text-luxora-gold/50 text-[6px]">●</span>
                    )}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <a
                  href="https://luxoralifestyles.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-7 py-3 bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white rounded-full transition-all duration-500"
                >
                  <span className="text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase">
                    Explore Luxora Lifestyles
                  </span>
                  <svg
                    className="w-3.5 h-3.5 text-luxora-gold transition-all duration-500 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes editorialReveal {
          0% {
            opacity: 0;
            transform: scale(1.06);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}