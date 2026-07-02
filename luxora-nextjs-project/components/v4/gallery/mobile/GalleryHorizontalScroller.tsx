import { forwardRef, type ReactNode } from 'react';

export interface GalleryHorizontalScrollerProps {
  children: ReactNode;
  /** Tailwind gap utility — defaults to the rail gutter, tighter than the grid gutter (Visual Language Guide §7). */
  gap?: string;
  /** Disables scroll-snap (rare — most rails want it). */
  snap?: boolean;
  className?: string;
}

/**
 * GalleryHorizontalScroller — the generic snap-scroll horizontal container
 * shared by every rail and tile strip (Trending, Recently Added, Browse by
 * Room). Desktop arrow-controlled rails (`GalleryRail`) attach a ref here
 * to drive `scrollBy`; on touch devices this component's native momentum +
 * snap is the entire interaction.
 */
const GalleryHorizontalScroller = forwardRef<HTMLDivElement, GalleryHorizontalScrollerProps>(
  ({ children, gap = 'gap-5', snap = true, className = '' }, ref) => (
    <div
      ref={ref}
      className={`flex overflow-x-auto pb-2 -mx-6 px-6 lg:mx-0 lg:px-0 ${gap} ${snap ? 'snap-x snap-mandatory' : ''} ${className}`}
      style={{ scrollbarWidth: 'none' }}
    >
      {children}
    </div>
  )
);

GalleryHorizontalScroller.displayName = 'GalleryHorizontalScroller';

export default GalleryHorizontalScroller;
