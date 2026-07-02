import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import GalleryButton from '../common/GalleryButton';

export interface GalleryRailHeaderProps {
  eyebrow?: string;
  title: string;
  /** A single supporting line at most (Visual Language Guide §7). */
  subheading?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
}

/**
 * GalleryRailHeader — the eyebrow + Section Heading + optional "View All"
 * text link every rail uses, identically. The "View All" CTA is always a
 * quiet text link here, never a button — buttons are reserved for
 * `GalleryEditorialCard` features.
 */
export default function GalleryRailHeader({ eyebrow, title, subheading, viewAllHref, viewAllLabel = 'View All', className = '' }: GalleryRailHeaderProps) {
  return (
    <div className={`flex items-start justify-between gap-6 mb-10 ${className}`}>
      <div>
        {eyebrow && (
          <span className="inline-block text-[11px] tracking-[0.26em] uppercase font-semibold mb-3" style={{ color: luxoraColors.gold }}>
            {eyebrow}
          </span>
        )}
        <h2 className="font-playfair font-normal leading-[1.1]" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', color: luxoraColors.espresso }}>
          {title}
        </h2>
        {subheading && (
          <p className="text-[13.5px] font-light leading-relaxed mt-3 max-w-md" style={{ color: luxoraColors.softBrown }}>
            {subheading}
          </p>
        )}
      </div>

      {viewAllHref && (
        <GalleryButton href={viewAllHref} variant="text" className="flex-shrink-0 self-center">
          {viewAllLabel}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </GalleryButton>
      )}
    </div>
  );
}
