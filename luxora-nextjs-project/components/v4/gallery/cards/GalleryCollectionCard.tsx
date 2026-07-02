import Link from 'next/link';
import GalleryImage from '../image/GalleryImage';
import GalleryImageOverlay from '../image/GalleryImageOverlay';

export interface GalleryCollectionCardProps {
  href: string;
  image: { src: string; alt: string };
  title: string;
  description?: string;
  /** The one metadata field a Collection Card ever shows (Visual Language Guide §2.6). */
  designCount?: number;
  className?: string;
}

/**
 * GalleryCollectionCard — represents an entire Collection as one object
 * (the Collections hub). Same grid footprint as `GalleryStandardCard`, but
 * carries a description line and a design count instead of room metadata
 * — it must read as "opens a set," not "opens a design."
 */
export default function GalleryCollectionCard({ href, image, title, description, designCount, className = '' }: GalleryCollectionCardProps) {
  return (
    <Link
      href={href}
      className={`group relative rounded-2xl overflow-hidden block h-[320px] border-2 shadow-[0_4px_18px_rgba(100,60,20,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C9A227] hover:shadow-[0_22px_50px_rgba(100,60,20,0.20)] ${className}`}
      style={{ borderColor: 'rgba(160,120,80,0.16)' }}
    >
      <GalleryImage src={image.src} alt={image.alt} zoom="standard" coverParent radius="md" />
      <GalleryImageOverlay variant="bottom" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-playfair text-[1.1rem] leading-snug mb-1.5" style={{ color: '#FDFAF6' }}>
          {title}
        </h3>
        {description && (
          <p className="text-[12.5px] font-light leading-relaxed mb-2 line-clamp-2" style={{ color: 'rgba(253,250,246,0.78)' }}>
            {description}
          </p>
        )}
        {typeof designCount === 'number' && (
          <span className="text-[10px] tracking-[0.1em] uppercase" style={{ color: 'rgba(253,250,246,0.62)' }}>
            {designCount} {designCount === 1 ? 'Design' : 'Designs'}
          </span>
        )}
      </div>
    </Link>
  );
}
