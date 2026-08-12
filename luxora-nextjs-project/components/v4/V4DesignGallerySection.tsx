'use client';

import Link from 'next/link';
import { luxoraColors, luxoraSpacing } from '@/lib/design/luxoraDesignTokens';
import { SoftGeometry } from './background';
import { Showcase, ShowcaseMosaicPage, SHOWCASE_CARD_BG, type ShowcaseMosaicItem } from './showcase';

const CARD_FOOTER_BG = 'rgba(239,227,206,0.97)';

interface GalleryItem {
  title: string;
  image: string;
  category: string;
}

interface GallerySlide {
  left: GalleryItem[];
  center: GalleryItem;
  right: GalleryItem[];
}

const slides: GallerySlide[] = [
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

function toMosaicItems(slide: GallerySlide): ShowcaseMosaicItem[] {
  return [slide.left[0], slide.left[1], slide.center, slide.right[0], slide.right[1]].map((item) => ({
    title: item.title,
    image: item.image,
    href: `/gallery/${item.category}`,
  }));
}

/**
 * DesktopGalleryCard — the classic footer-variant card the desktop track
 * uses (image filling the available flex height, title + gold arrow in a
 * flat footer strip). Desktop-only by design; the mobile rail renders the
 * shared ShowcaseOverlayCard via ShowcaseMosaicPage instead.
 */
function DesktopGalleryCard({ title, image, category, className = '' }: GalleryItem & { className?: string }) {
  return (
    <Link
      href={`/gallery/${category}`}
      className={`group relative flex flex-col overflow-hidden rounded-[18px] border border-[rgba(160,120,80,0.16)] shadow-[0_2px_6px_rgba(44,31,20,0.05),0_14px_34px_rgba(44,31,20,0.10)] cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_4px_10px_rgba(44,31,20,0.06),0_26px_56px_rgba(44,31,20,0.16)] ${className}`}
      style={{ background: SHOWCASE_CARD_BG }}
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
        style={{ background: CARD_FOOTER_BG, borderTop: '1px solid rgba(160,120,80,0.10)' }}
      >
        <h3 className="font-cormorant text-[1.1rem] md:text-[1.2rem] font-normal leading-tight" style={{ color: luxoraColors.espresso }}>
          {title}
        </h3>

        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1C1005]"
          style={{ background: '#C8A44A', boxShadow: '0 4px 14px rgba(200,164,74,0.30)' }}
        >
          <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="#FFF8EE" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function V4DesignGallerySection() {
  return (
    <section
      id="v4-gallery"
      className="relative overflow-hidden py-28 md:py-36 3xl:py-44"
      style={{ backgroundColor: '#F5EFE6' }}
    >
      {/* Scene: SoftGeometry — quiet accents at the edges, middle stays
          clear for the showcase (see docs/background-design-system.md) */}
      <SoftGeometry id="home-gallery" />

      <div className={`relative z-10 ${luxoraSpacing.container}`}>
        <Showcase<GallerySlide>
          header={{
            eyebrow: 'DESIGN GALLERY',
            title: 'Discover Inspiring Spaces',
            titleItalic: 'Crafted For Every Room',
            description: 'A curated collection of living rooms, bedrooms, kitchens, bathrooms, and beyond.',
          }}
          desktopPages={slides.map((s) => [s])}
          mobilePages={slides.map((s) => [s])}
          ariaLabel="Design gallery — swipe to browse"
          renderDesktopPage={([slide]) => (
            /* Asymmetric editorial mosaic; height grows with the container's
               large-display tiers so the composition keeps its proportions. */
            <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-5 h-[540px] 3xl:h-[620px] 3xl:gap-6">
              <div className="flex flex-col gap-5 3xl:gap-6 h-full">
                <DesktopGalleryCard {...slide.left[0]} className="flex-1" />
                <DesktopGalleryCard {...slide.left[1]} className="flex-1" />
              </div>

              <DesktopGalleryCard {...slide.center} className="h-full" />

              <div className="flex flex-col gap-5 3xl:gap-6 h-full">
                <DesktopGalleryCard {...slide.right[0]} className="flex-1" />
                <DesktopGalleryCard {...slide.right[1]} className="flex-1" />
              </div>
            </div>
          )}
          renderMobilePage={([slide]) => <ShowcaseMosaicPage items={toMosaicItems(slide)} />}
        />
      </div>
    </section>
  );
}
