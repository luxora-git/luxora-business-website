import GalleryMetaRow, { type GalleryMetaRowItem } from '../common/GalleryMetaRow';

export interface GalleryImageMetaProps {
  title: string;
  /** Plain meta values, or labeled fields for the `labeled` variant (Featured card). */
  meta?: (string | GalleryMetaRowItem)[];
  variant?: 'plain' | 'labeled';
  titleSize?: 'sm' | 'md' | 'lg';
  eyebrow?: string;
  className?: string;
}

const TITLE_SIZE: Record<NonNullable<GalleryImageMetaProps['titleSize']>, string> = {
  sm: 'text-[1rem]',
  md: 'text-[1.05rem]',
  lg: 'leading-[1.12]',
};

/**
 * GalleryImageMeta — the title + metadata block anchored over a card's
 * image overlay. The one place every photographic card (Featured down to
 * Mini) renders its heading, so every card's text-over-photo treatment
 * stays pixel-consistent.
 */
export default function GalleryImageMeta({ title, meta, variant = 'plain', titleSize = 'md', eyebrow, className = '' }: GalleryImageMetaProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <span className="text-[10px] font-semibold tracking-[0.24em] uppercase mb-3 block" style={{ color: '#E8C468' }}>
          {eyebrow}
        </span>
      )}
      {title && (
        <h3
          className={`font-playfair font-normal mb-1.5 ${titleSize === 'lg' ? 'line-clamp-2' : 'truncate'} ${TITLE_SIZE[titleSize]}`}
          style={titleSize === 'lg' ? { fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', color: '#FDFAF6' } : { color: '#FDFAF6' }}
        >
          {title}
        </h3>
      )}
      {meta && meta.length > 0 && <GalleryMetaRow items={meta} variant={variant} light />}
    </div>
  );
}
