import GalleryHorizontalScroller from '../mobile/GalleryHorizontalScroller';
import GalleryCategoryCard from './GalleryCategoryCard';

export interface GalleryCategoryStripItem {
  slug: string;
  label: string;
  image: { src: string; alt: string };
  href: string;
}

export interface GalleryCategoryStripProps {
  categories: GalleryCategoryStripItem[];
  className?: string;
}

/**
 * GalleryCategoryStrip — the Browse-by-Room wayfinding strip used on the
 * Gallery Home. A horizontal scroller of circular `GalleryCategoryCard` tiles
 * spaced wider than the rail gutter to give the icon treatment breathing room.
 * On desktop the tiles centre themselves within a flex-wrap row instead of
 * scrolling (no overflow at typical viewport widths for 6 tiles).
 */
export default function GalleryCategoryStrip({ categories, className = '' }: GalleryCategoryStripProps) {
  return (
    <>
      {/* Mobile — horizontal snap scroller */}
      <div className={`lg:hidden ${className}`}>
        <GalleryHorizontalScroller gap="gap-8" snap={false}>
          {categories.map((cat) => (
            <GalleryCategoryCard key={cat.slug} href={cat.href} image={cat.image} title={cat.label} />
          ))}
        </GalleryHorizontalScroller>
      </div>

      {/* Desktop — centred flex-wrap row (6 tiles never overflow on desktop) */}
      <div className={`hidden lg:flex flex-wrap justify-center gap-10 xl:gap-14 ${className}`}>
        {categories.map((cat) => (
          <GalleryCategoryCard key={cat.slug} href={cat.href} image={cat.image} title={cat.label} />
        ))}
      </div>
    </>
  );
}
