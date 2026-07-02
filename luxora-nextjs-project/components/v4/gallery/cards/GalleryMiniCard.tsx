import Link from 'next/link';
import GalleryImage from '../image/GalleryImage';
import GalleryImageOverlay from '../image/GalleryImageOverlay';

export interface GalleryMiniCardProps {
  href: string;
  image: { src: string; alt: string };
  title: string;
  /** One field at most (Visual Language Guide §2.5). */
  meta?: string;
  height?: string;
  className?: string;
}

function CardArrow() {
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 transition-all duration-300 group-hover:translate-x-0.5"
      style={{ border: '1px solid rgba(253,250,246,0.45)', color: '#FDFAF6' }}
      aria-hidden="true"
    >
      →
    </span>
  );
}

/**
 * GalleryMiniCard — the supporting-cast card used beside a
 * `GalleryFeaturedCard` in an editorial split layout. Never used standalone.
 */
export default function GalleryMiniCard({ href, image, title, meta, height = '200px', className = '' }: GalleryMiniCardProps) {
  return (
    <Link
      href={href}
      style={{ height }}
      className={`group relative rounded-2xl overflow-hidden block shadow-[0_4px_16px_rgba(80,50,20,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(80,50,20,0.20)] ${className}`}
    >
      <GalleryImage src={image.src} alt={image.alt} zoom="standard" coverParent radius="md" />
      <GalleryImageOverlay variant="bottom" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-playfair text-[1rem] leading-snug mb-1.5 truncate" style={{ color: '#FDFAF6' }}>
            {title}
          </h4>
          {meta && (
            <div className="text-[10px] tracking-[0.1em] uppercase truncate" style={{ color: 'rgba(253,250,246,0.66)' }}>
              {meta}
            </div>
          )}
        </div>
        <CardArrow />
      </div>
    </Link>
  );
}
