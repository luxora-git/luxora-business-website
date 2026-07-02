import type { ReactNode } from 'react';

export interface GalleryGridItemProps {
  children: ReactNode;
  /** `2` spans two columns (used for an in-grid Featured card) — the only span value the grid system permits. */
  span?: 1 | 2;
  className?: string;
}

/**
 * GalleryGridItem — the column-span wrapper for `GalleryGrid` children.
 * Span is opt-in per item so a grid can promote exactly one tile to a
 * two-column Featured slot without the grid itself needing to know which.
 */
export default function GalleryGridItem({ children, span = 1, className = '' }: GalleryGridItemProps) {
  return <div className={`${span === 2 ? 'sm:col-span-2 lg:col-span-2' : ''} ${className}`}>{children}</div>;
}
