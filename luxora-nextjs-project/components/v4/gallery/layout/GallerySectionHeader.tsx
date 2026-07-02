import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import GalleryDivider, { type GalleryDividerVariant } from './GalleryDivider';

export interface GallerySectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleItalic?: string;
  description?: string;
  align?: 'left' | 'center';
  divider?: 'none' | GalleryDividerVariant;
  className?: string;
}

/**
 * GallerySectionHeader — eyebrow + Section Heading + optional description,
 * the one construction every rail header, navigational index, and
 * editorial spread on the Gallery uses (Visual Language Guide §4/§7).
 */
export default function GallerySectionHeader({
  eyebrow,
  title,
  titleItalic,
  description,
  align = 'left',
  divider = 'none',
  className = '',
}: GallerySectionHeaderProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <div className={`${alignment} ${className}`}>
      {eyebrow && (
        <span className="inline-block text-[11px] tracking-[0.26em] uppercase font-semibold mb-4" style={{ color: luxoraColors.gold }}>
          {eyebrow}
        </span>
      )}
      <h2
        className="font-playfair font-normal leading-[1.1] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(1.7rem, 2.9vw, 2.5rem)', color: luxoraColors.espresso }}
      >
        {title}
        {titleItalic && <span className="italic"> {titleItalic}</span>}
      </h2>
      {description && (
        <p
          className={`text-[14px] md:text-[15px] font-light leading-relaxed mt-5 ${align === 'center' ? 'max-w-xl mx-auto' : 'max-w-xl'}`}
          style={{ color: luxoraColors.softBrown }}
        >
          {description}
        </p>
      )}
      {divider !== 'none' && <GalleryDivider variant={divider} className="mt-7" />}
    </div>
  );
}
