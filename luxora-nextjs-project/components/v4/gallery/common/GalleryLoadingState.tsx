import GallerySkeleton from './GallerySkeleton';

export interface GalleryLoadingStateProps {
  /** Number of skeleton placeholders to render. */
  count?: number;
  /** `grid` mirrors the Standard grid columns; `rail` lays out a horizontal row. */
  layout?: 'grid' | 'rail';
  /** Aspect ratio (height ÷ width expressed as Tailwind `aspect-*` style) for each placeholder, matching the card type it stands in for. */
  aspectClassName?: string;
  className?: string;
}

/**
 * GalleryLoadingState — the designed "loading" state for any card-based
 * surface. Renders a row/grid of `GallerySkeleton` blocks at the calling
 * card type's exact shape, never a generic spinner (Visual Language Guide §11).
 */
export default function GalleryLoadingState({ count = 6, layout = 'grid', aspectClassName = 'aspect-[4/5]', className = '' }: GalleryLoadingStateProps) {
  const items = Array.from({ length: count });

  if (layout === 'rail') {
    return (
      <div className={`flex gap-5 overflow-hidden ${className}`} aria-busy="true" aria-label="Loading designs">
        {items.map((_, i) => (
          <div key={i} className={`flex-shrink-0 w-[260px] ${aspectClassName}`}>
            <GallerySkeleton radius="lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${className}`} aria-busy="true" aria-label="Loading designs">
      {items.map((_, i) => (
        <div key={i} className={aspectClassName}>
          <GallerySkeleton radius="lg" />
        </div>
      ))}
    </div>
  );
}
