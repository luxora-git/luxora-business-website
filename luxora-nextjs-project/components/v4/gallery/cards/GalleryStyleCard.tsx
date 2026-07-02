import Link from 'next/link';
import GalleryImage from '../image/GalleryImage';

export type GalleryStyleCardSize = 'sm' | 'md' | 'lg';

export interface GalleryStyleCardProps {
  href: string;
  image: { src: string; alt: string };
  title: string;
  /** Mosaic tile size — `lg` for the highest-design-count styles, sized by the calling grid, not by this component (Visual Language Guide §2.7). */
  size?: GalleryStyleCardSize;
  className?: string;
}

const SIZE_RATIO: Record<GalleryStyleCardSize, string> = {
  sm: 'aspect-square',
  md: 'aspect-square',
  lg: 'aspect-[4/3]',
};

const SIZE_TITLE: Record<GalleryStyleCardSize, string> = {
  sm: 'text-[11px]',
  md: 'text-[0.95rem]',
  lg: 'text-[1.3rem]',
};

/**
 * GalleryStyleCard — a mosaic tile representing one Style. No metadata,
 * no arrow glyph — purely a visual/aesthetic entry point, with a slower,
 * more considered hover (cross-fade, not a snappy zoom).
 */
export default function GalleryStyleCard({ href, image, title, size = 'md', className = '' }: GalleryStyleCardProps) {
  return (
    <Link href={href} className={`group relative rounded-2xl overflow-hidden block w-full shadow-[0_4px_16px_rgba(80,50,20,0.07)] transition-shadow duration-500 hover:shadow-[0_14px_36px_rgba(80,50,20,0.16)] ${SIZE_RATIO[size]} ${className}`}>
      <GalleryImage src={image.src} alt={image.alt} zoom="fast" coverParent radius="md" />
      <div
        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
        style={{ background: 'linear-gradient(to top, rgba(20,14,6,0.70) 0%, rgba(20,14,6,0.06) 58%, transparent 100%)' }}
      />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className={`font-playfair leading-snug transition-opacity duration-300 group-hover:opacity-90 ${SIZE_TITLE[size]}`} style={{ color: '#FDFAF6' }}>
          {title}
        </h3>
      </div>
    </Link>
  );
}
