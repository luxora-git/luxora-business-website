import LuxuryDivider, { type LuxuryDividerProps } from '../../background/LuxuryDivider';

export type { LuxuryDividerVariant as GalleryDividerVariant } from '../../background/LuxuryDivider';
export type GalleryDividerProps = LuxuryDividerProps;

/**
 * GalleryDivider — a thin alias over `LuxuryDivider` so every Gallery
 * component imports its separators from the Gallery library, not by
 * reaching into `components/v4/background` directly. No new visual
 * language — same four variants, same defaults.
 */
export default function GalleryDivider(props: GalleryDividerProps) {
  return <LuxuryDivider {...props} />;
}
