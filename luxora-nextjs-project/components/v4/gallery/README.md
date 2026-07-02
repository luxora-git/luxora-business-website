# `components/v4/gallery/` — Two Component Generations

This folder contains **two distinct generations** of Gallery components. Read this before importing anything from here.

## 1. Legacy (Phase 1) — flat files at this folder's root

`GalleryHero.tsx`, `GalleryCard.tsx`, `GalleryGrid.tsx`, `GalleryBrowser.tsx`, `GalleryFilterBar.tsx`, `GalleryFilterDrawer.tsx`, `GallerySearchBar.tsx`, `GalleryEmptyState.tsx`, `GalleryDetailHeader.tsx`, `RelatedDesignsRail.tsx`, `GalleryMetaDot.tsx`, `GalleryBreadcrumbJsonLd.tsx`.

Image viewing does **not** live here in either generation — there was previously a self-contained `GalleryLightbox` + `GalleryImageGrid` at this root, but both were retired in favor of the single sitewide `PremiumLightbox` (`components/v4/lightbox`), opened via `useLightbox()`. Every gallery/portfolio/catalog page click-to-zoom goes through that one component now.

The bottom-of-page conversion CTA also does **not** live here — `GalleryConsultationCTA` (common/) and `GalleryCtaBand` (root) were both retired in favor of the single sitewide `GlobalClosingCTA` (`components/v4/common/GlobalClosingCTA`), the same closing section every page (Gallery, Portfolio, Services, Elements, Products, Homepage) renders immediately above the footer.

**These power the live `/gallery` routes today** (Gallery Home, Category pages, Detail pages — see `app/gallery/`). They are tightly coupled to `lib/content/gallery/*` (`GalleryProject`, `GalleryFilterState`, etc.) and are **not modified or removed** by the new component library below.

## 2. Gallery Component Library (v2) — subfolders

```
layout/        GalleryContainer, GallerySection, GallerySectionHeader, GalleryDivider, GalleryHero, GalleryHeroSearch, GalleryHeroStats
cards/         GalleryFeaturedCard, GalleryEditorialCard, GalleryStandardCard, GalleryCompactCard, GalleryMiniCard, GalleryCollectionCard, GalleryStyleCard, GalleryCategoryCard
image/         GalleryImage, GalleryImageOverlay, GalleryImageBadge, GalleryImageMeta, GalleryImageSkeleton
rails/         GalleryRail, GalleryRailHeader, GalleryRailNavigation
grid/          GalleryGrid, GalleryGridItem
filters/       GallerySearchBar, GallerySearchSuggestions, GalleryPopularSearches, GalleryFilterBar, GalleryFilterChip, GallerySortDropdown
collections/   CollectionHero, CollectionHeader, CollectionPreview
common/        GalleryButton, GalleryArrowButton, GalleryMetaRow, GalleryTag, GalleryBadge, GalleryCounter, GalleryEmptyState, GalleryLoadingState, GallerySkeleton, GalleryPagination
mobile/        GalleryBottomFilterSheet, GalleryHorizontalScroller
```

This is the **production foundation for every future Gallery page**, built directly against the three frozen planning documents:

- [`docs/design-gallery-architecture.md`](../../../docs/design-gallery-architecture.md)
- [`docs/gallery-home-uiux-spec.md`](../../../docs/gallery-home-uiux-spec.md)
- [`docs/gallery-visual-language-guide.md`](../../../docs/gallery-visual-language-guide.md)

Every component is data-in/markup-out (props only, zero hardcoded content), built from the existing `lib/design/luxoraDesignTokens.ts` tokens and the `components/v4/background` Luxury Pattern Library — no new colors, type, spacing, or background artwork were introduced.

**Not yet wired to any route.** No page imports from these subfolders yet — Gallery Home implementation is the next, separate step, pending approval.

## Why some names repeat across the two generations

`GalleryHero`, `GalleryGrid`, `GallerySearchBar`, `GalleryFilterBar`, and `GalleryEmptyState` exist in **both** generations, with different shapes:

| Name | Legacy (root) | New library (subfolder) |
|---|---|---|
| `GalleryHero` | Sized for Category/Style pages, takes `GalleryFilterFacets`-shaped data implicitly via page composition | Taller Home-capable variant, `coverParent`/`ambientMotion`, no content-layer coupling |
| `GalleryGrid` | Renders `GalleryProject[]` directly, owns the `GalleryCard` choice | Generic layout container, content-agnostic, takes any children |
| `GallerySearchBar` | Plain controlled input | Adds `size="hero"` frosted variant for use over photography |
| `GalleryFilterBar` | Hardcoded to category pills + a drawer trigger | Generic `groups`/`searchSlot`/`trailingSlot` shape, facet-vocabulary-agnostic |
| `GalleryEmptyState` | Single hardcoded copy | `variant` prop (`no-results` / `no-search` / `coming-soon`), per Visual Language Guide §11 |

This was a deliberate naming decision, not an oversight: the new library is the intended long-term replacement for these six, and the names were specified exactly this way when the library was commissioned. The root `index.ts` re-exports the new generation under namespaces (`GalleryLayout`, `GalleryCards`, `GalleryFilters`, etc.) specifically so both generations remain importable side by side without a collision while the migration is pending.

**When Gallery Home (and, later, Category/Style/Detail) is rebuilt on the new library, the corresponding legacy file should be deleted** rather than kept "just in case" — until then, both must coexist, and no change to one should be assumed to apply to the other.
