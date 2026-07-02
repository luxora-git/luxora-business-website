import GalleryHero, { type GalleryHeroProps } from '../layout/GalleryHero';

export interface CollectionHeroProps extends Omit<GalleryHeroProps, 'eyebrow' | 'height' | 'ambientMotion'> {
  /** Defaults to "Collection" — override for a more specific eyebrow if ever needed. */
  eyebrow?: string;
}

/**
 * CollectionHero — `GalleryHero` pre-configured for a Collection page
 * header (architecture §16.3). Thin composition, not a fork: same height,
 * same gradient/typography treatment as any other listing-page hero.
 */
export default function CollectionHero({ eyebrow = 'Collection', ...rest }: CollectionHeroProps) {
  return <GalleryHero eyebrow={eyebrow} height="default" ambientMotion={false} {...rest} />;
}
