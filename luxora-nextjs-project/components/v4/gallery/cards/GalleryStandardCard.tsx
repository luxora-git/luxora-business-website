import Link from 'next/link';
import GalleryImage from '../image/GalleryImage';
import GalleryImageOverlay from '../image/GalleryImageOverlay';
import GalleryMetaRow from '../common/GalleryMetaRow';

export interface GalleryStandardCardProps {
  href: string;
  image: { src: string; alt: string };
  title: string;
  /** 2–3 values, dot-separated (Visual Language Guide §2.3/§5). */
  meta?: string[];
  className?: string;
}

function CardArrow() {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 transition-all duration-300 group-hover:translate-x-0.5"
      style={{ border: '1px solid rgba(253,250,246,0.45)', color: '#FDFAF6' }}
      aria-hidden="true"
    >
      →
    </span>
  );
}

/**
 * GalleryStandardCard — the default grid tile for any exhaustive listing
 * (Category, Style, the Full Gallery Browser). The Gallery's workhorse card.
 */
export default function GalleryStandardCard({ href, image, title, meta, className = '' }: GalleryStandardCardProps) {
  return (
    <Link
      href={href}
      className={`group relative rounded-2xl overflow-hidden block h-[320px] border-2 shadow-[0_4px_18px_rgba(100,60,20,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C9A227] hover:shadow-[0_22px_50px_rgba(100,60,20,0.20)] ${className}`}
      style={{ borderColor: 'rgba(160,120,80,0.16)' }}
    >
      <GalleryImage src={image.src} alt={image.alt} zoom="standard" coverParent radius="md" />
      <GalleryImageOverlay variant="bottom" />
      <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-playfair text-[1.05rem] leading-snug mb-1.5 truncate" style={{ color: '#FDFAF6' }}>
            {title}
          </h3>
          {meta && meta.length > 0 && <GalleryMetaRow items={meta} variant="plain" light />}
        </div>
        <CardArrow />
      </div>
    </Link>
  );
}
