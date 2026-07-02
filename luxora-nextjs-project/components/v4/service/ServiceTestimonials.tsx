'use client';

import { useState } from 'react';
import V4SectionHeader from '../V4SectionHeader';
import { LuxuryHalo, LuxuryGrain } from '../background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { ServiceTestimonialsData } from '@/lib/content/services/types';

export interface ServiceTestimonialsProps {
  data: ServiceTestimonialsData;
}

/**
 * ServiceTestimonials — premium client-story cards. Cards with a
 * `videoId` become video-ready (play button → lightbox), the rest read as
 * quote cards. Reuses the homepage's video-modal pattern, generalised.
 */
export default function ServiceTestimonials({ data }: ServiceTestimonialsProps) {
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);

  return (
    <section
      id="v4-service-testimonials"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#FDFAF6' }}
    >
      <LuxuryHalo position="top-right" size="lg" opacity={0.05} blur={110} />
      <LuxuryGrain id="service-testimonials-grain" opacity={0.012} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div data-v4-reveal-heading>
          <V4SectionHeader
            eyebrow={data.eyebrow}
            title={data.title}
            titleItalic={data.titleItalic}
            description={data.description}
            centered
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-v4-reveal>
          {data.testimonials.map((t) => (
            <div
              key={t.name}
              className="group relative rounded-2xl overflow-hidden border shadow-[0_4px_18px_rgba(100,60,20,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(100,60,20,0.16)]"
              style={{ borderColor: 'rgba(160,120,80,0.16)', background: '#F5EFE6' }}
            >
              <div
                className="relative h-[220px] overflow-hidden cursor-pointer"
                onClick={() => t.videoId && setOpenVideoId(t.videoId)}
              >
                <img
                  src={t.image}
                  alt={t.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,14,6,0.55) 0%, transparent 60%)' }} />
                {t.videoId && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(201,162,39,0.92)', boxShadow: '0 4px 18px rgba(201,162,39,0.45)' }}
                    >
                      <svg className="w-5 h-5 ml-0.5" fill="#1C1005" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
                <span
                  className="absolute top-4 left-4 text-3xl font-playfair italic leading-none"
                  style={{ color: 'rgba(253,250,246,0.85)' }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
              </div>

              <div className="p-6">
                <p className="font-playfair italic text-[15px] leading-relaxed mb-5" style={{ color: luxoraColors.espresso }}>
                  {t.quote}
                </p>
                <div className="w-8 h-px mb-4" style={{ background: 'rgba(201,162,39,0.4)' }} />
                <div className="font-playfair text-[14px]" style={{ color: luxoraColors.espresso }}>
                  {t.name}
                </div>
                <div className="text-[11px] tracking-[0.06em] uppercase mt-1" style={{ color: '#9C7B68' }}>
                  {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openVideoId && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
          style={{ background: 'rgba(28,16,5,0.88)', backdropFilter: 'blur(10px)' }}
          onClick={() => setOpenVideoId(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenVideoId(null)}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
              style={{ background: 'rgba(44,31,20,0.70)', backdropFilter: 'blur(8px)' }}
              aria-label="Close"
            >
              ✕
            </button>
            <div style={{ aspectRatio: '16/9' }}>
              <iframe
                src={`https://www.youtube.com/embed/${openVideoId}?autoplay=1&rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title="Client story"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
