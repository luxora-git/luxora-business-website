import { luxoraColors, luxoraRadius } from '@/lib/design/luxoraDesignTokens';

export interface GallerySkeletonProps {
  /** CSS width — defaults to 100% so it fills its parent. */
  width?: string | number;
  /** CSS height — required for any non-aspect-ratio skeleton block. */
  height?: string | number;
  /** Border radius token. Defaults to `md` to match the general card radius. */
  radius?: keyof typeof luxoraRadius | '9999px';
  className?: string;
}

/**
 * GallerySkeleton — the single shimmer primitive every loading state on the
 * Gallery composes from (`GalleryImageSkeleton`, `GalleryLoadingState`).
 * Pure presentation, no data, no timers — the shimmer is CSS-only.
 */
export default function GallerySkeleton({ width = '100%', height = '100%', radius = 'md', className = '' }: GallerySkeletonProps) {
  const borderRadius = radius === '9999px' ? '9999px' : luxoraRadius[radius];

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, borderRadius, background: luxoraColors.warmCream }}
    >
      <div
        className="absolute inset-0 animate-gallery-shimmer"
        style={{
          background: `linear-gradient(100deg, transparent 30%, ${luxoraColors.ivory} 50%, transparent 70%)`,
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );
}
