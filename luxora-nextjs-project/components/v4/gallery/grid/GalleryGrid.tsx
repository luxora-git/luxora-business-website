import type { ReactNode } from 'react';

export interface GalleryGridColumns {
  desktop?: 3 | 4;
  tablet?: 2;
  mobile?: 1;
}

export interface GalleryGridProps {
  children: ReactNode;
  columns?: GalleryGridColumns;
  className?: string;
}

const DESKTOP_COLS: Record<NonNullable<GalleryGridColumns['desktop']>, string> = {
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

/**
 * GalleryGrid — the generic responsive grid container every exhaustive
 * listing renders through (Visual Language Guide §8: 1 col mobile, 2 col
 * tablet, 3–4 col desktop). Purely layout — data, empty/loading states,
 * and card choice are the caller's responsibility (`GalleryEmptyState`,
 * `GalleryLoadingState`), not this component's.
 */
export default function GalleryGrid({ children, columns, className = '' }: GalleryGridProps) {
  const desktop = columns?.desktop ?? 3;

  return <div className={`grid grid-cols-1 sm:grid-cols-2 ${DESKTOP_COLS[desktop]} gap-6 md:gap-8 ${className}`}>{children}</div>;
}
