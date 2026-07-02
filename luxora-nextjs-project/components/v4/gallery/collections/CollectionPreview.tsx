import GalleryEditorialCard, { type GalleryEditorialCardProps } from '../cards/GalleryEditorialCard';

export type CollectionPreviewProps = GalleryEditorialCardProps;

/**
 * CollectionPreview — the Collection-specific application of
 * `GalleryEditorialCard` (Luxury Collections feature spread, architecture
 * §21.1.1). Kept as its own named component because "previewing a
 * Collection" is a distinct semantic use of the editorial-card shape from
 * "previewing a single design" — same visuals, different meaning, so a
 * future change to one usage doesn't have to ripple into the other.
 */
export default function CollectionPreview(props: CollectionPreviewProps) {
  return <GalleryEditorialCard {...props} />;
}
