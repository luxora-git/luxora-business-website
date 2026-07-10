'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import V4SectionHeader from './V4SectionHeader';
import { luxoraColors, luxoraSpacing } from '@/lib/design/luxoraDesignTokens';

/** Card surface — a shade darker than the section background (#F5EFE6) so
 * cards read as elevated blocks instead of blending into the page. Same
 * warm ivory/beige family as the rest of V4, just one step down in
 * lightness rather than up (the previous #F9F3EA was almost indistinguishable
 * from the section). */
const CARD_BG = '#EFE3CE';
const CARD_FOOTER_BG = 'rgba(239,227,206,0.97)';

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
  imageWrapClassName = '',
  overlay = false,
}: {
  title: string;
  image: string;
  category: string;
  className?: string;
  /** Extra classes for the image wrapper — e.g. `aspect-[4/3]` for the
   * mobile rail, where cards aren't inside a fixed-height flex parent. Omit
   * to keep the desktop behavior of filling the available flex height. */
  imageWrapClassName?: string;
  /** Mobile-rail presentation: the image IS the card — no footer strip;
   * title bottom-left over a soft dark gradient, gold arrow bottom-right.
   * Desktop keeps the classic footer variant untouched. */
  overlay?: boolean;
}) {
  if (overlay) {
    return (
      <Link
        href={`/gallery/${category}`}
        className={`group relative block overflow-hidden rounded-[16px] border border-[rgba(160,120,80,0.16)] shadow-[0_10px_30px_rgba(44,31,20,0.10)] cursor-pointer transition-all duration-500 ${className}`}
        style={{ background: CARD_BG }}
      >
        <div className={`relative overflow-hidden ${imageWrapClassName}`}>
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />

          {/* Soft bottom scrim — readability for the title only, never the whole image */}
          <div
            className="absolute inset-x-0 bottom-0 h-[48%]"
            style={{ background: 'linear-gradient(to top, rgba(28,16,5,0.72) 0%, rgba(28,16,5,0.28) 55%, transparent 100%)' }}
            aria-hidden="true"
          />

          {/* Title — bottom-left, on the image */}
          <h3
            className="absolute bottom-3 left-3.5 right-12 font-cormorant text-[1.05rem] font-normal leading-tight drop-shadow-sm"
            style={{ color: luxoraColors.ivory }}
          >
            {title}
          </h3>

          {/* Gold arrow — bottom-right, on the image */}
          <div
            className="absolute bottom-2.5 right-2.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
            style={{ background: '#C8A44A', boxShadow: '0 4px 14px rgba(28,16,5,0.35)' }}
            aria-hidden="true"
          >
            <svg className="h-3 w-3" fill="none" stroke="#FFF8EE" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/gallery/${category}`}
      className={`group relative flex flex-col overflow-hidden rounded-[18px] border border-[rgba(160,120,80,0.16)] shadow-[0_10px_30px_rgba(44,31,20,0.10)] cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(44,31,20,0.16)] ${className}`}
      style={{ background: CARD_BG }}
    >
      {/* Image — fills top portion (or a fixed aspect ratio when imageWrapClassName is set) */}
      <div
        className={`relative overflow-hidden ${imageWrapClassName}`}
        style={imageWrapClassName ? undefined : { flex: '1 1 0', minHeight: 0 }}
      >
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
          background: CARD_FOOTER_BG,
          borderTop: '1px solid rgba(160,120,80,0.10)',
        }}
      >
        <h3
          className="font-cormorant text-[1.1rem] md:text-[1.2rem] font-normal leading-tight"
          style={{ color: luxoraColors.espresso }}
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

/** Gap between mobile slides — must match the rail's Tailwind `gap-4`. */
const RAIL_GAP_PX = 16;

export default function V4DesignGallerySection() {
  const [current, setCurrent] = useState(0);
  /** Mobile rail's own page index (drives the mobile dots) — kept separate
   * from `current` so swiping on mobile never fights the desktop track. */
  const [railIndex, setRailIndex] = useState(0);
  const total = slides.length;
  const railRef = useRef<HTMLDivElement>(null);

  const next = () => setCurrent((p) => (p + 1) % total);
  const prev = () => setCurrent((p) => (p - 1 + total) % total);

  /** Width of one snap step: a full slide plus the gap after it. */
  const railStep = () => {
    const first = railRef.current?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + RAIL_GAP_PX : 0;
  };

  const scrollRailTo = (index: number) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({ left: index * railStep(), behavior: 'smooth' });
  };

  const scrollRail = (direction: 1 | -1) => {
    scrollRailTo(Math.min(total - 1, Math.max(0, railIndex + direction)));
  };

  const handleRailScroll = () => {
    const rail = railRef.current;
    const step = railStep();
    if (!rail || step === 0) return;
    setRailIndex(Math.min(total - 1, Math.max(0, Math.round(rail.scrollLeft / step))));
  };

  return (
    <section
      id="v4-gallery"
      className="relative overflow-hidden py-28 md:py-36 3xl:py-44"
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

      <div className={`relative z-10 ${luxoraSpacing.container}`}>

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

          {/* Desktop arrows + counter — only alongside the desktop track (lg+); below that the mobile rail has its own arrows */}
          <div className="mb-14 hidden flex-shrink-0 items-center gap-3 pl-8 lg:flex">
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

        {/* ── DESKTOP TRACK SLIDER (lg+, unchanged) ──
            All 3 slides render side-by-side in a flex row.
            The track moves via translateX(-N*100%).
            overflow-hidden on outer div clips the off-screen slides.
        */}
        <div className="hidden overflow-hidden lg:block" data-v4-reveal>
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

        {/* ── MOBILE / TABLET GALLERY-BLOCK CAROUSEL (below lg) ──
            Each slide is a COMPLETE gallery block — the same five categories
            as its desktop counterpart, laid out as a compact mosaic (two
            cards, a full-width feature, two cards) so the visitor
            immediately sees that multiple categories exist. One horizontal
            swipe moves to the next complete block, never card-by-card.
            Native CSS scroll-snap does the swiping (browser-compositor
            momentum, no JS drag handling, no lag); the dots and arrows
            drive/reflect the same scroll position via `railIndex`.
        */}
        <div className="lg:hidden" data-v4-reveal>
          <div
            ref={railRef}
            onScroll={handleRailScroll}
            role="region"
            aria-label="Design gallery — swipe to browse"
            className="gallery-mobile-rail flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 -mx-6 px-6 sm:-mx-12 sm:px-12"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {slides.map((slide, si) => (
              <div key={si} className="grid w-full flex-shrink-0 snap-center grid-cols-2 gap-2.5">
                <GalleryCard
                  overlay
                  title={slide.left[0].title}
                  image={slide.left[0].image}
                  category={slide.left[0].category}
                  imageWrapClassName="aspect-[4/3.4]"
                />
                <GalleryCard
                  overlay
                  title={slide.left[1].title}
                  image={slide.left[1].image}
                  category={slide.left[1].category}
                  imageWrapClassName="aspect-[4/3.4]"
                />
                <GalleryCard
                  overlay
                  title={slide.center.title}
                  image={slide.center.image}
                  category={slide.center.category}
                  className="col-span-2"
                  imageWrapClassName="aspect-[16/9.5]"
                />
                <GalleryCard
                  overlay
                  title={slide.right[0].title}
                  image={slide.right[0].image}
                  category={slide.right[0].category}
                  imageWrapClassName="aspect-[4/3.4]"
                />
                <GalleryCard
                  overlay
                  title={slide.right[1].title}
                  image={slide.right[1].image}
                  category={slide.right[1].category}
                  imageWrapClassName="aspect-[4/3.4]"
                />
              </div>
            ))}
          </div>

          {/* Mobile nav — dots represent gallery pages, arrows move one page */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => scrollRail(-1)}
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
                  onClick={() => scrollRailTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: railIndex === i ? '24px' : '8px',
                    height: '8px',
                    background: railIndex === i ? '#C9A227' : 'rgba(201,162,39,0.3)',
                  }}
                  aria-label={`Gallery page ${i + 1}`}
                  aria-current={railIndex === i ? 'true' : undefined}
                />
              ))}
            </div>

            <button
              onClick={() => scrollRail(1)}
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

      </div>

      <style jsx>{`
        .gallery-mobile-rail {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .gallery-mobile-rail::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
