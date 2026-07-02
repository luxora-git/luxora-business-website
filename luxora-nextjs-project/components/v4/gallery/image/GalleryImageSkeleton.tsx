import GallerySkeleton from '../common/GallerySkeleton';
import { RATIO_CLASSNAME, type GalleryImageRatio } from './ratios';

export interface GalleryImageSkeletonProps {
  ratio?: GalleryImageRatio;
  className?: string;
}

/**
 * GalleryImageSkeleton — a `GallerySkeleton` pre-sized to one of the
 * Gallery's frozen image ratios (Visual Language Guide §3), so a card's
 * loading state never shifts layout once the real image resolves.
 */
export default function GalleryImageSkeleton({ ratio = 'standard', className = '' }: GalleryImageSkeletonProps) {
  return (
    <div className={`relative w-full ${RATIO_CLASSNAME[ratio]} ${className}`}>
      <GallerySkeleton radius="lg" />
    </div>
  );
}
