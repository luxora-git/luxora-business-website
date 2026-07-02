import Link from 'next/link';
import GalleryImage from '../image/GalleryImage';
import GalleryImageOverlay from '../image/GalleryImageOverlay';
import GalleryMetaRow from '../common/GalleryMetaRow';

export interface GalleryCompactCardProps {
  href: string;
  image: { src: string; alt: string };
  title: string;
  /** 1–2 values (Visual Language Guide §2.4). */
  meta?: string[];
  /** Fixed pixel width so a rail's scroll math stays predictable across breakpoints. */
  width?: number;
  className?: string;
}

/**
 * GalleryCompactCard — the rail unit (Trending, Recently Added). Denser
 * than Standard, no arrow glyph, lighter hover — built to be seen
 * many-at-once, not one-at-a-time.
 */
export default function GalleryCompactCard({ href, image, title, meta, width = 260, className = '' }: GalleryCompactCardProps) {
  return (
    <Link
      href={href}
      style={{ width }}
      className={`group relative flex-shrink-0 rounded-2xl overflow-hidden block h-[230px] shadow-[0_4px_16px_rgba(80,50,20,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(80,50,20,0.18)] ${className}`}
    >
      <GalleryImage src={image.src} alt={image.alt} zoom="fast" coverParent radius="md" />
      <GalleryImageOverlay variant="bottom" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-playfair text-[0.95rem] leading-snug mb-1.5 truncate" style={{ color: '#FDFAF6' }}>
          {title}
        </h3>
        {meta && meta.length > 0 && <GalleryMetaRow items={meta} variant="plain" light />}
      </div>
    </Link>
  );
}
