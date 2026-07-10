# Luxora Showcase System

`components/v4/showcase` — the shared architecture for image-led category
and collection carousels. Part of Design System V2 (see
`design-system-v2.md` for the responsive foundation it builds on).

## Architecture

The core insight from the audit that produced this system: what the Design
Gallery and Portfolio Showcase actually duplicated was the **carousel
chrome and mechanics** — not the cards. So the abstraction cuts there:

```
<Showcase<T>>                      owns (shared, never re-implemented):
  header row                       V4SectionHeader + desktop arrows + page counter
  desktop track (lg+)              translateX slider, one full-width slide per page
  mobile/tablet rail (< lg)        native CSS scroll-snap, momentum swipe,
                                   dots + arrows synced to scroll position

renderDesktopPage / renderMobilePage   owned by the consuming section:
  page composition, card design, links
```

- Generic over the item type `T` — no showcase-wide item shape is forced.
- `desktopPages` and `mobilePages` are chunked independently. Portfolio
  shows 3 cards per desktop page but one editorial card per mobile swipe
  page; the gallery shows the same 5-item block on both.
- The mobile rail is native `scroll-snap` (browser-compositor momentum, no
  JS drag handling). Dots/arrows drive and follow the same scroll position
  via `onScroll`, so swipe, arrow and dot input can never desync.
- The **section shell stays with the section**: background, `id`, scene
  layers, bottom CTAs. Showcase renders inside the section's
  `luxoraSpacing.container`.

## Supported layouts

| Layout | Where | Notes |
|---|---|---|
| Asymmetric editorial mosaic | Design Gallery desktop | `1fr / 1.5fr / 1fr` columns, stacked pairs beside a tall feature; height rides the 2xl/3xl container tiers |
| Uniform card grid | Portfolio desktop | plain `grid-cols-3` |
| Five-card mosaic page | `ShowcaseMosaicPage` (< lg) | phone: 2-col with full-width feature; tablet (640–1023): 3-col with a tall feature column spanning both rows |
| Single editorial card per page | Portfolio mobile | rich cards get a full swipe page each |

New layouts are just new render-prop implementations — add a shared
component here only once two sections need it.

## Card variants

- **`ShowcaseOverlayCard`** — the image IS the card. Ivory title
  bottom-left over a partial espresso scrim (lower ~48% only — the image
  stays vibrant), gold arrow bottom-right, whole card is one link. Hover:
  subtle zoom, scrim deepens, arrow nudges right. Use for category /
  destination tiles.
- **Section-owned cards** — anything richer (Portfolio's badge + location
  + overview + CTA card) stays in its section file. Do not force rich
  cards into a generic variant; pass them through the render props.

## Intended use cases

Sections that present a **browsable set of image-led destinations**:
Design Gallery, Portfolio Showcase, future Interior-Element / Product /
Room category sections and landing-page collections.

## Intentionally excluded

| Section | Why |
|---|---|
| `CatalogIndexPage` (Elements, Products) | listing pages — users scan a full grid; pagination would hide inventory |
| `/gallery` home | has its own richer purpose-built library (GalleryGrid, StyleMosaic, EditorialSplit) |
| `V4ServicesSection` | editorial two-column layout, not a category gallery |
| `V4FurnitureCollectionSection` | bespoke tabbed interaction with external links |
| `ServiceGalleryShowcase` | lightbox-driven, service-page specific |
| Testimonials, Process, Pricing, FAQ, text-heavy cards | not image-led destinations — never migrate these |

If a section doesn't obviously fit, it doesn't fit. Reuse is a means, not
the goal.
