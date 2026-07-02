export { default as GalleryCard } from './GalleryCard';
export type { GalleryCardProps } from './GalleryCard';

export { default as GalleryGrid } from './GalleryGrid';
export type { GalleryGridProps } from './GalleryGrid';

export { default as GalleryEmptyState } from './GalleryEmptyState';
export type { GalleryEmptyStateProps } from './GalleryEmptyState';

export { default as GalleryFilterBar } from './GalleryFilterBar';
export type { GalleryFilterBarProps } from './GalleryFilterBar';

export { default as GalleryFilterDrawer } from './GalleryFilterDrawer';
export type { GalleryFilterDrawerProps } from './GalleryFilterDrawer';

export { default as GallerySearchBar } from './GallerySearchBar';
export type { GallerySearchBarProps } from './GallerySearchBar';

export { default as GalleryBrowser } from './GalleryBrowser';
export type { GalleryBrowserProps } from './GalleryBrowser';

export { default as GalleryHero } from './GalleryHero';
export type { GalleryHeroProps, GalleryHeroStat } from './GalleryHero';

export { default as GalleryDetailHeader } from './GalleryDetailHeader';
export type { GalleryDetailHeaderProps } from './GalleryDetailHeader';

export { default as RelatedDesignsRail } from './RelatedDesignsRail';
export type { RelatedDesignsRailProps } from './RelatedDesignsRail';

export { default as GalleryBreadcrumbJsonLd } from './GalleryBreadcrumbJsonLd';
export type { GalleryBreadcrumbJsonLdItem, GalleryBreadcrumbJsonLdProps } from './GalleryBreadcrumbJsonLd';

export { default as GalleryMetaDot } from './GalleryMetaDot';

/**
 * ─────────────────────────────────────────────────────────────────────────
 * Gallery Component Library (v2) — namespaced re-exports.
 *
 * Everything above this line is the legacy, flat Phase-1 component set
 * (`GalleryHero`, `GalleryCard`, `GalleryGrid`, `GallerySearchBar`,
 * `GalleryFilterBar`, `GalleryEmptyState`, …) — it powers the live
 * `/gallery` routes today and is untouched. Image viewing no
 * longer lives here: every clickable image sitewide (including Gallery)
 * opens the single global `PremiumLightbox` via `useLightbox()` from
 * `components/v4/lightbox` — there is no per-page lightbox anymore.
 *
 * The new reusable component library lives in subfolders
 * (`layout/`, `cards/`, `image/`, `rails/`, `grid/`, `filters/`,
 * `collections/`, `common/`, `mobile/`) per the frozen Gallery
 * architecture/UX/visual-language documents. Several new components
 * intentionally share a name with a legacy one above (e.g. `GalleryHero`,
 * `GalleryGrid`, `GallerySearchBar`, `GalleryFilterBar`,
 * `GalleryEmptyState`) — they are NOT the same component. Namespacing the
 * re-export here (rather than a flat re-export) is deliberate: it keeps
 * both sets importable from this one barrel without a naming collision.
 * See `components/v4/gallery/README.md` for the full rationale and
 * migration plan.
 *
 * No Gallery Home (or any other route) is wired to this library yet — it
 * has been built and type-checked, not implemented into a page.
 * ─────────────────────────────────────────────────────────────────────────
 */
export * as GalleryLayout from './layout';
export * as GalleryCards from './cards';
export * as GalleryImageSystem from './image';
export * as GalleryRails from './rails';
export * as GalleryGridSystem from './grid';
export * as GalleryFilters from './filters';
export * as GalleryCollections from './collections';
export * as GalleryCommon from './common';
export * as GalleryMobile from './mobile';
