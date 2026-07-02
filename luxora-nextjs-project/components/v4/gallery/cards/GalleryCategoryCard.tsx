import Link from 'next/link';
import GalleryImage from '../image/GalleryImage';

export interface GalleryCategoryCardProps {
  href: string;
  image: { src: string; alt: string };
  title: string;
  className?: string;
}

/**
 * GalleryCategoryCard — the Browse-by-Room wayfinding tile. The lowest
 * visual weight card in the system: no metadata, no zoom-on-hover (the one
 * card type explicitly forbidden from it — Visual Language Guide §2.8),
 * just a lift and a label brighten.
 */
export default function GalleryCategoryCard({ href, image, title, className = '' }: GalleryCategoryCardProps) {
  return (
    <Link
      href={href}
      className={`group flex flex-col items-center gap-4 flex-shrink-0 transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <div
        className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-[0_6px_20px_rgba(80,50,20,0.10)] transition-shadow duration-300 group-hover:shadow-[0_10px_28px_rgba(80,50,20,0.18)]"
        style={{ border: '1px solid rgba(160,120,80,0.14)' }}
      >
        <GalleryImage src={image.src} alt={image.alt} zoom="none" coverParent className="rounded-full" />
      </div>
      <span
        className="text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors duration-300 group-hover:text-[#C9A227]"
        style={{ color: '#6B4C3B' }}
      >
        {title}
      </span>
    </Link>
  );
}
