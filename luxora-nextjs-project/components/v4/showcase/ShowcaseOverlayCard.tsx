import Link from 'next/link';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

/** Card surface — a shade darker than the warm-cream section backgrounds so
 * cards read as elevated blocks instead of blending into the page. */
export const SHOWCASE_CARD_BG = '#EFE3CE';

export interface ShowcaseOverlayCardProps {
  title: string;
  image: string;
  href: string;
  imageAlt?: string;
  className?: string;
  /** Classes controlling the image area's size, e.g. `aspect-[4/3.4]`. */
  imageWrapClassName?: string;
}

/**
 * ShowcaseOverlayCard — the approved image-first category card: the image
 * IS the card, title bottom-left in ivory over a soft espresso scrim that
 * covers only the lower half (the image stays vibrant), gold arrow
 * bottom-right. Whole card is one link. Hover (desktop): subtle image
 * zoom, the scrim deepens slightly for focus, and the arrow nudges right.
 */
export default function ShowcaseOverlayCard({
  title,
  image,
  href,
  imageAlt,
  className = '',
  imageWrapClassName = '',
}: ShowcaseOverlayCardProps) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-[16px] border border-[rgba(160,120,80,0.16)] shadow-[0_2px_6px_rgba(44,31,20,0.05),0_14px_34px_rgba(44,31,20,0.10)] cursor-pointer transition-all duration-500 hover:shadow-[0_4px_10px_rgba(44,31,20,0.06),0_26px_56px_rgba(44,31,20,0.16)] ${className}`}
      style={{ background: SHOWCASE_CARD_BG }}
    >
      <div className={`relative overflow-hidden ${imageWrapClassName}`}>
        <img
          src={image}
          alt={imageAlt ?? title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* Soft bottom scrim — readability for the title only, never the whole image */}
        <div
          className="absolute inset-x-0 bottom-0 h-[48%]"
          style={{ background: 'linear-gradient(to top, rgba(28,16,5,0.72) 0%, rgba(28,16,5,0.28) 55%, transparent 100%)' }}
          aria-hidden="true"
        />
        {/* Hover-only deepening layer — fades in on top of the base scrim */}
        <div
          className="absolute inset-x-0 bottom-0 h-[48%] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'linear-gradient(to top, rgba(28,16,5,0.30) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        {/* Title — bottom-left, on the image */}
        <h3
          className="absolute bottom-3 left-3.5 right-12 font-cormorant text-[1.05rem] font-normal leading-tight drop-shadow-sm"
          style={{ color: luxoraColors.ivory }}
        >
          {title}
        </h3>

        {/* Gold arrow — bottom-right, on the image */}
        <div
          className="absolute bottom-2.5 right-2.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
          style={{ background: '#C8A44A', boxShadow: '0 4px 14px rgba(28,16,5,0.35)' }}
          aria-hidden="true"
        >
          <svg
            className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="#FFF8EE"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
