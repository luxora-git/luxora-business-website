import type { GalleryFeaturedCardProps } from '../cards/GalleryFeaturedCard';
import type { GalleryMiniCardProps } from '../cards/GalleryMiniCard';
import GalleryFeaturedCard from '../cards/GalleryFeaturedCard';
import GalleryMiniCard from '../cards/GalleryMiniCard';

export interface GalleryEditorialSplitProps {
  /** The dominant left-hand FeaturedCard */
  featured: GalleryFeaturedCardProps;
  /** 1 or 2 supporting MiniCards stacked on the right */
  mini: GalleryMiniCardProps[];
  className?: string;
}

/**
 * GalleryEditorialSplit — the fixed 70/30 editorial grid that pairs one
 * `GalleryFeaturedCard` with a vertical stack of 1–2 `GalleryMiniCard`s.
 * Used exclusively for the Editor's Picks section. The split collapses to a
 * single column on mobile (featured first, minis below as a 2-col row).
 */
export default function GalleryEditorialSplit({ featured, mini, className = '' }: GalleryEditorialSplitProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-[2.3fr_1fr] gap-5 md:gap-6 ${className}`}>
      {/* Dominant FeaturedCard */}
      <GalleryFeaturedCard {...featured} className={`h-[380px] md:h-[520px] lg:h-full ${featured.className ?? ''}`} />

      {/* Mini side-stack */}
      <div className={`grid gap-5 md:gap-6 ${mini.length > 1 ? 'grid-cols-2 lg:grid-cols-1' : 'grid-cols-1'}`}>
        {mini.map((m, i) => (
          <GalleryMiniCard key={i} {...m} height="100%" className={`min-h-[160px] md:min-h-[200px] ${m.className ?? ''}`} />
        ))}
      </div>
    </div>
  );
}
