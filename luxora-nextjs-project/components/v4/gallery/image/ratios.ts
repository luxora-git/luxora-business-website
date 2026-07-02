/**
 * GalleryImageRatio — the frozen aspect-ratio scale from the Visual
 * Language Guide §3.1. Every image-bearing surface in the Gallery picks one
 * of these; no ad hoc ratio is ever set inline on a page.
 */
export type GalleryImageRatio = 'hero' | 'featured' | 'editorial' | 'standard' | 'compact' | 'mini' | 'square' | 'thumbnail';

export const RATIO_CLASSNAME: Record<GalleryImageRatio, string> = {
  hero: 'aspect-[16/9]',
  featured: 'aspect-[4/5]',
  editorial: 'aspect-[16/9]',
  standard: 'aspect-[4/5]',
  compact: 'aspect-[4/3]',
  mini: 'aspect-[3/4]',
  square: 'aspect-square',
  thumbnail: 'aspect-square',
};
