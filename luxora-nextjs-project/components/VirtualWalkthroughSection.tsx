'use client';

import { useState } from 'react';

const VIRTUAL_TOUR_URL = 'https://luxora.in/virtualtour/viewer/index.php?code=c4ca4238a0b923820dcc509a6f75849b';

const features = [
  {
    label: 'Real-scale room experience',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-luxora-gold flex-shrink-0">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'Material visualization',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-luxora-gold flex-shrink-0">
        <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v12H4V4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'Lighting simulation',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-luxora-gold flex-shrink-0">
        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zm4.657 1.343a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 10a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 5a5 5 0 100-10 5 5 0 000 10z" />
      </svg>
    ),
  },
  {
    label: 'Design validation',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-luxora-gold flex-shrink-0">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export default function VirtualWalkthroughSection() {
  const [isLaunched, setIsLaunched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleLaunch() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLaunched(true);
      setIsLoading(false);
    }, 400);
  }

  return (
    <section className="py-20 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-10 lg:gap-14 items-center">
          {/* ───── LEFT: Content ───── */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <span className="text-luxora-gold text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4 block">
              Virtual Walkthrough
            </span>

            {/* Heading */}
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-luxora-navy mb-4 leading-tight">
              Walk Through Your Future Home Before It's Built
            </h2>

            {/* Description */}
            <p className="text-luxora-charcoal/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Experience your interior design in immersive 360° before execution begins — every
              detail visualized with photorealistic precision.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f.label} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-luxora-gold/10 flex items-center justify-center flex-shrink-0">
                    {f.icon}
                  </span>
                  <span className="text-luxora-charcoal/70 text-sm md:text-base font-medium">
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={handleLaunch}
              disabled={isLaunched}
              className={`inline-flex items-center gap-3 px-8 py-4 font-semibold text-sm tracking-[0.1em] uppercase transition-all duration-500 group ${
                isLaunched
                  ? 'bg-luxora-navy/5 text-luxora-charcoal/30 cursor-not-allowed border border-luxora-charcoal/10'
                  : 'bg-luxora-gold text-luxora-navy hover:bg-luxora-navy hover:text-white border border-luxora-gold'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                  </svg>
                  Loading...
                </>
              ) : isLaunched ? (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Tour Active
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Launch Walkthrough
                </>
              )}
            </button>
          </div>

          {/* ───── RIGHT: Walkthrough Area ───── */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] group">
              {/* Preview State */}
              {!isLaunched && (
                <div
                  onClick={handleLaunch}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-500"
                >
                  {/* Background Preview Image */}
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
                    alt="Virtual Tour Preview"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/50 transition-opacity duration-500 group-hover:bg-black/40" />

                  {/* Decorative corner accents */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white/20 rounded-tl-xl pointer-events-none z-10" />
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/20 rounded-tr-xl pointer-events-none z-10" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white/20 rounded-bl-xl pointer-events-none z-10" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-white/20 rounded-br-xl pointer-events-none z-10" />

                  {/* Play Button */}
                  <div className="relative z-10 flex flex-col items-center gap-4 transform transition-transform duration-500 group-hover:scale-105">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-luxora-gold flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-shadow duration-500 group-hover:shadow-[0_0_50px_rgba(212,175,55,0.5)]">
                      <svg className="w-7 h-7 md:w-8 md:h-8 text-luxora-navy ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="text-white text-sm md:text-base font-semibold tracking-[0.12em] uppercase">
                      Start Virtual Tour
                    </span>
                  </div>
                </div>
              )}

              {/* Iframe State */}
              {isLaunched && (
                <div className="absolute inset-0 transition-opacity duration-500 ease-in-out">
                  <iframe
                    src={VIRTUAL_TOUR_URL}
                    className="w-full h-full border-0"
                    title="Luxora Virtual Tour"
                    allow="accelerometer; gyroscope; xr-spatial-tracking"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}