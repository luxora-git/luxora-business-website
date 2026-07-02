import Link from 'next/link';
import GalleryImage from '../image/GalleryImage';
import GalleryImageOverlay from '../image/GalleryImageOverlay';
import GalleryImageMeta from '../image/GalleryImageMeta';
import type { GalleryMetaRowItem } from '../common/GalleryMetaRow';

export interface GalleryFeaturedCardProps {
  href: string;
  image: { src: string; alt: string };
  eyebrow?: string;
  title: string;
  description?: string;
  /** Up to 5 labeled fields — the only card type permitted the full spec row (Visual Language Guide §2.1). */
  meta?: GalleryMetaRowItem[];
  className?: string;
}

/**
 * GalleryFeaturedCard — the highest-hierarchy card on the Gallery. One per
 * section, never more. Slow cinematic zoom, full labeled metadata row.
 */
export default function GalleryFeaturedCard({ href, image, eyebrow = 'Featured Project', title, description, meta, className = '' }: GalleryFeaturedCardProps) {
  return (
    <Link
      href={href}
      className={`group relative rounded-3xl overflow-hidden block h-[440px] md:h-[560px] shadow-[0_18px_50px_rgba(80,50,20,0.14)] transition-shadow duration-500 hover:shadow-[0_26px_70px_rgba(80,50,20,0.20)] ${className}`}
    >
      <GalleryImage src={image.src} alt={image.alt} zoom="slow" coverParent />
      <GalleryImageOverlay variant="bottom-strong" />

      <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
        <GalleryImageMeta title={title} eyebrow={eyebrow} titleSize="lg" className="mb-3" />
        {description && (
          <p className="text-sm md:text-[15px] leading-relaxed font-light mb-6 max-w-lg" style={{ color: 'rgba(253,250,246,0.74)' }}>
            {description}
          </p>
        )}
        {meta && meta.length > 0 && (
          <>
            <div className="w-9 h-px mb-6" style={{ background: 'rgba(201,162,39,0.55)' }} />
            <GalleryImageMeta title="" meta={meta} variant="labeled" />
          </>
        )}
      </div>
    </Link>
  );
}
