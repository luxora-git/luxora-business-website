# Luxora Design System V2 — Responsive Foundation

The foundation lives in three files. Components consume it; they never
re-implement responsive logic locally.

| Concern | Source of truth |
|---|---|
| Breakpoints | `tailwind.config.ts` (`theme.extend.screens`) |
| Type scale | `app/globals.css` (`--lux-type-*`) + `luxoraType` in `lib/design/luxoraDesignTokens.ts` |
| Containers & spacing | `luxoraSpacing` in `lib/design/luxoraDesignTokens.ts` (+ `SectionContainer` component) |

> ⚠️ Tailwind's `content` globs include `lib/**` specifically so class
> recipes defined in `luxoraDesignTokens.ts` survive purging. If you define
> class strings in a new directory outside `app/`, `components/`, `lib/`,
> add it to the globs or the classes will silently disappear in production.

## Breakpoints

Defaults plus two named large-display tiers — never use ad-hoc `min-[…]`
variants:

```
sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536 · 3xl 1920 · 4xl 2560
```

Mental model: `< lg` touch-first · `lg–2xl` laptop (the classic V4 canvas,
keep pixel-faithful) · `3xl` large desktop (scale up deliberately) ·
`4xl` ultrawide/TV (cap and compose, never stretch).

## Typography

Serif display/heading sizes are fluid CSS custom properties. They match the
old hand-tuned `clamp()` values below ~1550px and keep scaling on the same
slope to a hard cap at 1920px — beyond that, type stays flat and layout
carries the growth.

```tsx
import { luxoraType } from '@/lib/design/luxoraDesignTokens';

<h1 style={{ fontSize: luxoraType.display }} />   // hero H1
<h2 style={{ fontSize: luxoraType.h2 }} />        // section heading
<h3 style={{ fontSize: luxoraType.h3 }} />        // card title

// UI text uses class recipes instead:
<span className={luxoraType.eyebrow} />           // gold uppercase eyebrow
<p className={luxoraType.lead} />                  // section description
<p className={luxoraType.body} />                  // body copy
```

Most headings should come through `V4SectionHeader`, which already consumes
the scale. Only reach for `luxoraType` directly when a component can't use
it.

## Containers

One recipe: legacy `max-w-7xl` behavior to 1535px, then
`2xl:1440 → 3xl:1680 (wider gutters) → 4xl:1840 cap`.

```tsx
// New code — preferred:
import SectionContainer from '@/components/v4/common/SectionContainer';
<SectionContainer className="relative z-10">…</SectionContainer>

// Existing elements where restructuring JSX is riskier:
import { luxoraSpacing } from '@/lib/design/luxoraDesignTokens';
<div className={`relative z-10 ${luxoraSpacing.container}`}>…</div>
```

`GalleryContainer` (gallery pages) delegates to the same recipe.

## Section spacing

Three vertical-rhythm recipes — pick the one matching the section's
density; do not invent new paddings:

```
luxoraSpacing.section         py-24 md:py-32 3xl:py-40    (default)
luxoraSpacing.sectionRelaxed  py-28 md:py-36 3xl:py-44    (hero-adjacent, editorial)
luxoraSpacing.sectionTight    py-16 md:py-20 3xl:py-28    (dense/utility)
```

## Showcase system (`components/v4/showcase`)

The shared architecture for image-led category/collection carousels
(Design Gallery, Portfolio Showcase, future category sections).

`<Showcase>` owns the chrome and mechanics that used to be copy-pasted per
section: the header row with desktop arrows + page counter, the desktop
translateX track (`lg+`), and the mobile/tablet snap-scroll rail with
synced dots. It is generic over the item type — page composition and card
design are passed in via `renderDesktopPage` / `renderMobilePage`, and
desktop/mobile may chunk pages differently (Portfolio: 3 per desktop page,
1 editorial card per mobile page).

Shared visual pieces for category-style consumers:
- `ShowcaseOverlayCard` — the image-first card (ivory title bottom-left on
  a partial espresso scrim, gold arrow bottom-right, hover zoom/deepen).
- `ShowcaseMosaicPage` — one five-card mobile/tablet page (2-col phone
  mosaic; 3-col tablet mosaic with a tall feature column).

What deliberately does NOT use Showcase: listing pages (`CatalogIndexPage`
for Elements/Products — static scannable grids), the `/gallery` page (its
own richer component library), and any text-heavy section (testimonials,
process, pricing, FAQ). Don't force it — the section shell, backgrounds
and bottom CTAs always stay with the section.

## Rules of thumb

1. A component that needs a width, heading size, or section padding imports
   it — it never writes its own `max-w-*`, `clamp()`, or `py-*` pair.
2. Anything designed at `lg–2xl` must be *verified*, not assumed, at `3xl`
   and `4xl` — wider containers stretch flex/grid children.
3. Type never grows past the 1920px cap; if a large display looks empty,
   fix composition (container tier, spacing, imagery), not font size.
