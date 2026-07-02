import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import GalleryImage from '../image/GalleryImage';
import GalleryButton from '../common/GalleryButton';

export interface GalleryEditorialCardProps {
  href: string;
  image: { src: string; alt: string };
  label?: string;
  title: string;
  description?: string;
  /** A single line of context, e.g. "12 designs in this collection" — never full metadata (Visual Language Guide §2.2). */
  meta?: string;
  ctaLabel?: string;
  /** Desktop text/image placement — alternate across consecutive features for magazine rhythm. */
  orientation?: 'image-left' | 'image-right';
  className?: string;
}

/**
 * GalleryEditorialCard — the magazine-spread feature unit (Luxury
 * Collections). Text sits beside the image, never on top of it — no
 * gradient overlay, no zoom-on-hover; its motion is the page-level
 * parallax drift, applied by the rail/page composing it, not by this card.
 */
export default function GalleryEditorialCard({ href, image, label = 'Collection', title, description, meta, ctaLabel = 'Explore Collection', orientation = 'image-left', className = '' }: GalleryEditorialCardProps) {
  const imageFirst = orientation === 'image-left';

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${className}`}>
      <div className={`relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_16px_44px_rgba(80,50,20,0.10)] ${imageFirst ? 'lg:order-1' : 'lg:order-2'}`}>
        <GalleryImage src={image.src} alt={image.alt} zoom="none" coverParent radius="editorial" />
      </div>

      <div className={`${imageFirst ? 'lg:order-2' : 'lg:order-1'} lg:px-4`}>
        <span className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-4 block" style={{ color: luxoraColors.gold }}>
          {label}
        </span>
        <h3 className="font-playfair font-normal leading-[1.12] mb-5" style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.35rem)', color: luxoraColors.espresso }}>
          {title}
        </h3>
        {description && (
          <p className="text-[14px] md:text-[15px] font-light leading-relaxed max-w-md mb-5" style={{ color: luxoraColors.softBrown }}>
            {description}
          </p>
        )}
        {meta && (
          <p className="text-[11px] tracking-[0.1em] uppercase mb-7" style={{ color: '#9C7B68' }}>
            {meta}
          </p>
        )}
        <GalleryButton href={href} variant="primary" size="md">
          {ctaLabel}
        </GalleryButton>
      </div>
    </div>
  );
}
