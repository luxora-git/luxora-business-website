import GalleryStyleCard from './GalleryStyleCard';

export interface GalleryStyleMosaicItem {
  slug: string;
  label: string;
  image: { src: string; alt: string };
  href: string;
}

export interface GalleryStyleMosaicProps {
  items: GalleryStyleMosaicItem[];
  className?: string;
}

/**
 * GalleryStyleMosaic — a uniform grid of compact style tiles. Deliberately
 * NOT an asymmetric bento layout: with only a handful of real style photos
 * (several of which are the same underlying photoshoot reused across
 * categories), a large hero-sized mosaic tile made the repetition
 * impossible to miss and was fragile to align (aspect-ratio-driven side
 * columns never reliably matched the featured tile's height). Uniform,
 * modestly-sized tiles read as a quick filter row rather than a second
 * "look at this photography" showcase, which is honest about what the
 * asset library can actually support.
 */
export default function GalleryStyleMosaic({ items, className = '' }: GalleryStyleMosaicProps) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-5 ${className}`}>
      {items.map((item) => (
        <GalleryStyleCard key={item.slug} href={item.href} image={item.image} title={item.label} size="sm" />
      ))}
    </div>
  );
}
