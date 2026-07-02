'use client';

import { useState } from 'react';
import Link from 'next/link';
import V4SectionHeader from './V4SectionHeader';

const slides = [
  {
    left: [
      { title: 'Kitchen Gallery',   image: '/img/AI%20BASED/MODULAR%20KITCHEN/mk12.webp',               category: 'kitchen'     },
      { title: 'False Ceiling',     image: '/img/AI%20BASED/FALSE%20CIELING%20DESIGN/fc1.webp',          category: 'living-room' },
    ],
    center: { title: 'Living Room Gallery', image: '/img/AI%20BASED/LIVING%20BEDROOM%20DESIGNS/lr2.webp', category: 'living-room' },
    right: [
      { title: 'Bedroom Gallery',   image: '/img/AI%20BASED/MASTER%20BEDROOM%20DESIGNS/mr8.webp',        category: 'bedroom'     },
      { title: 'Wardrobe Gallery',  image: '/img/AI%20BASED/WARDROBE%20DESIGN/wd17.webp',                category: 'wardrobes'   },
    ],
  },
  {
    left: [
      { title: 'Modular Kitchen',   image: '/img/AI%20BASED/MODULAR%20KITCHEN/mk13.webp',               category: 'kitchen'     },
      { title: 'Study Room',        image: '/img/AI%20BASED/HOME%20OFFICE/ofc10.webp',                  category: 'office'      },
    ],
    center: { title: 'Grand Living Room',  image: '/img/PROJECT%20BASED/LIVING%20ROOM%20DESIGN/Krish%20ji%20S.F.%20A01_View150000.webp', category: 'living-room' },
    right: [
      { title: 'Master Bedroom',    image: '/img/AI%20BASED/MASTER%20BEDROOM%20DESIGNS/mr9.webp',        category: 'bedroom'     },
      { title: 'Luxury Wardrobe',   image: '/img/AI%20BASED/WARDROBE%20DESIGN/wd18.webp',                category: 'wardrobes'   },
    ],
  },
  {
    left: [
      { title: 'Residential Design',image: '/img/PROJECT%20BASED/LIVING%20ROOM%20DESIGN/Karamveer%20ji%20G.F.%20A01_View080000.webp', category: 'full-home'   },
      { title: 'False Ceiling',     image: '/img/AI%20BASED/FALSE%20CIELING%20DESIGN/fc3.webp',          category: 'living-room' },
    ],
    center: { title: 'Living Space',       image: '/img/PROJECT%20BASED/LIVING%20ROOM%20DESIGN/Vizora%20House%20G.F.%20A01_View020000.webp', category: 'living-room' },
    right: [
      { title: 'Suite Bedroom',     image: '/img/PROJECT%20BASED/MASTER%20BEDROOM%20DESIGN/Rishabh%20ji%20final%20render%2004.webp', category: 'bedroom'     },
      { title: 'Custom Wardrobe',   image: '/img/PROJECT%20BASED/WARDROBE%20DESIGN/Rishabh%20ji%20Master%20Bedroom%20A04.webp', category: 'wardrobes'   },
    ],
  },
];

function GalleryCard({
  title,
  image,
  category,
  className = '',
}: {
  title: string;
  image: string;
  category: string;
  className?: string;
}) {
  return (
    <Link
      href={`/gallery/${category}`}
      className={`group relative flex flex-col overflow-hidden rounded-[18px] border border-[rgba(160,120,80,0.14)] shadow-[0_8px_28px_rgba(60,35,16,0.07)] cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(60,35,16,0.12)] ${className}`}
      style={{ background: '#F9F3EA' }}
    >
      {/* Image — fills top portion */}
      <div className="relative overflow-hidden" style={{ flex: '1 1 0', minHeight: 0 }}>
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1005]/15 via-transparent to-transparent" />
        <div className="absolute inset-0 border-2 border-[#C8A44A]/0 transition-all duration-300 group-hover:border-[#C8A44A]/30 rounded-t-[18px]" />
      </div>

      {/* Footer — flat, no eyebrow label */}
      <div
        className="flex flex-shrink-0 items-center justify-between px-5 py-4"
        style={{
          background: 'rgba(249,243,234,0.97)',
          borderTop: '1px solid rgba(160,120,80,0.10)',
        }}
      >
        <h3
          className="font-cormorant text-[1.1rem] md:text-[1.2rem] font-normal leading-tight"
          style={{ color: '#1C1005' }}
        >
          {title}
        </h3>

        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1C1005]"
          style={{
            background: '#C8A44A',
            boxShadow: '0 4px 14px rgba(200,164,74,0.30)',
          }}
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="#FFF8EE" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function V4DesignGallerySection() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const next = () => setCurrent((p) => (p + 1) % total);
  const prev = () => setCurrent((p) => (p - 1 + total) % total);

  return (
    <section
      id="v4-gallery"
      className="relative overflow-hidden py-28 md:py-36"
      style={{ backgroundColor: '#F5EFE6' }}
    >
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="gallery-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#C9A96E" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gallery-dots)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">

        {/* Header row + nav arrows */}
        <div className="mb-12 flex items-end justify-between md:mb-16" data-v4-reveal-heading>
          <div className="flex-1">
            <V4SectionHeader
              eyebrow="DESIGN GALLERY"
              title="Discover Inspiring Spaces"
              titleItalic="Crafted For Every Room"
              description="A curated collection of living rooms, bedrooms, kitchens, bathrooms, and beyond."
              centered={false}
            />
          </div>

          {/* Desktop arrows + counter */}
          <div className="mb-14 hidden flex-shrink-0 items-center gap-3 pl-8 md:flex">
            <button
              onClick={prev}
              className="group flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 hover:border-[#1C1005] hover:bg-[#1C1005]"
              style={{ borderColor: 'rgba(160,120,80,0.30)', background: '#FDFAF6' }}
              aria-label="Previous"
            >
              <svg className="h-4 w-4 transition-colors duration-300 group-hover:stroke-[#C8A44A]" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="tabular-nums text-[11px] font-semibold tracking-[0.16em]" style={{ color: '#9C7B68' }}>
              {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <button
              onClick={next}
              className="group flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 hover:border-[#1C1005] hover:bg-[#1C1005]"
              style={{ borderColor: 'rgba(160,120,80,0.30)', background: '#FDFAF6' }}
              aria-label="Next"
            >
              <svg className="h-4 w-4 transition-colors duration-300 group-hover:stroke-[#C8A44A]" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── REAL CSS TRACK SLIDER ──
            All 3 slides render side-by-side in a flex row.
            The track moves via translateX(-N*100%).
            overflow-hidden on outer div clips the off-screen slides.
        */}
        <div className="overflow-hidden" data-v4-reveal>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, si) => (
              <div
                key={si}
                /* Each slide = full width, never shrinks */
                className="w-full flex-shrink-0 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.5fr_1fr] lg:h-[540px]"
              >
                {/* LEFT — 2 stacked */}
                <div className="flex flex-col gap-5 h-full">
                  <GalleryCard title={slide.left[0].title} image={slide.left[0].image} category={slide.left[0].category} className="flex-1" />
                  <GalleryCard title={slide.left[1].title} image={slide.left[1].image} category={slide.left[1].category} className="flex-1" />
                </div>

                {/* CENTER — tall */}
                <GalleryCard
                  title={slide.center.title}
                  image={slide.center.image}
                  category={slide.center.category}
                  className="h-[360px] lg:h-full"
                />

                {/* RIGHT — 2 stacked */}
                <div className="flex flex-col gap-5 h-full">
                  <GalleryCard title={slide.right[0].title} image={slide.right[0].image} category={slide.right[0].category} className="flex-1" />
                  <GalleryCard title={slide.right[1].title} image={slide.right[1].image} category={slide.right[1].category} className="flex-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile nav */}
        <div className="mt-10 flex items-center justify-center gap-4 md:hidden">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(160,120,80,0.30)]"
            style={{ background: '#FDFAF6' }}
            aria-label="Previous"
          >
            <svg className="h-4 w-4" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: current === i ? '24px' : '8px',
                  height: '8px',
                  background: current === i ? '#C9A227' : 'rgba(201,162,39,0.3)',
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(160,120,80,0.30)]"
            style={{ background: '#FDFAF6' }}
            aria-label="Next"
          >
            <svg className="h-4 w-4" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
