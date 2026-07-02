# Luxora Design Gallery — Visual Language Guide

Status: **Design system reference — not architecture, not UX, not implementation.**
Relationship to other documents: [`design-gallery-architecture.md`](./design-gallery-architecture.md) defines *what exists* (routes, data, taxonomy). [`gallery-home-uiux-spec.md`](./gallery-home-uiux-spec.md) defines *what each Gallery Home section does*. This document defines *what everything looks and feels like* — the visual rules both of those documents assume but don't spell out. None of the three modifies another; this one modifies nothing already frozen.
Token source of truth: `lib/design/luxoraDesignTokens.ts` (`luxoraColors`, `luxoraShadows`, `luxoraRadius`, `luxoraBlur`, `luxoraSpacing`, `luxoraPatternOpacity`, `luxoraMotion`) and the existing `font-playfair` / `font-inter` type pairing already used across V4. This guide does not invent new tokens — it defines *rules for using the ones that already exist*, consistently, across every Gallery surface.

---

## 1. Gallery Visual Philosophy

The Gallery should feel like **opening a premium interior design magazine**, not browsing a catalog. Every visual decision in this document is in service of one sentence: *a visitor should never feel like they are shopping — they should feel like they are being shown something beautiful, by someone with taste.*

**The Gallery is:**
- **Elegant** — restrained, considered, never loud.
- **Editorial** — every section has a point of view, not just a list of items.
- **Quiet** — the loudest thing on any screen is always the photography, never the UI.
- **Warm** — Luxora's existing palette (gold, espresso, warm cream, ivory) carries the page; nothing here introduces a colder, more "tech product" palette.
- **Timeless** — nothing trend-driven (no glassmorphism-of-the-month, no oversized neon gradients); this guide should look correct in five years, not five months.
- **Sophisticated** — confidence expressed through restraint and precision, not through density of information or number of effects.
- **Photography-first** — every layout decision defers to the image; typography and UI exist to frame the photograph, never to compete with it.

**The Gallery is never:**
- **E-commerce.** No price tags floating on images, no "Add to wishlist" heart icons stacked on every corner, no urgency banners ("Only 3 left," "Selling fast"). Budget is information, shown quietly in metadata — never a sales mechanic.
- **Pinterest chaos.** No masonry walls of mismatched aspect ratios competing for attention with no hierarchy. Every grid on this site has a deliberate rhythm; nothing is "just more tiles."
- **Cluttered.** If a section needs an explanation longer than one sentence to justify why an element is on screen, the element doesn't belong there.
- **Gaming/flashy.** No particle effects, no bounce, no neon glows, no badge-collecting visual language ("NEW!" stickers, countdown timers). Premium is quiet.

The test for every future addition to the Gallery, at any layer: **does this look like it belongs in Architectural Digest, or does it look like it belongs on a marketplace?** If there's any doubt, it doesn't ship.

---

## 2. Card System

Eight card types exist across the Gallery. Each has exactly one job and one place it belongs — cards are never interchangeable between contexts, and no rail or grid ever mixes two card types (see Section 12).

### 2.1 Featured Card
- **Purpose:** the single most important design on any given screen — the "this is the one to look at" card.
- **Usage:** the large card in an editorial split layout (Editor's Picks); the first tile in a locked-category browser; never used more than once per section.
- **Hierarchy:** highest. If a Featured Card and a Standard Card appear together, the Featured Card must be visually unmistakable as the lead — larger, richer in detail, never just "a bigger version of the same thing."
- **Image ratio:** landscape, generous — tall enough (≈4:5 to 16:10 depending on viewport) to feel like a spread, not a thumbnail.
- **Typography:** Playfair display heading at the card's largest size on the page outside the page Hero itself; an eyebrow label ("Featured Project") in tracked gold uppercase above it.
- **Metadata:** the only card permitted the full metadata row (up to five fields — Location, Area, Style, Budget, Completion) — see Section 5's priority order.
- **CTA behaviour:** the entire card is the link target; no visible button — the card's scale and detail are the invitation.
- **Hover behaviour:** the slowest, most cinematic image scale on the site (the deliberate exception to "snappy" everywhere else) — this card should feel like it's breathing, not reacting.
- **Responsive behaviour:** stacks to full width on mobile, retains its full metadata row (wraps to two columns rather than truncating fields — a Featured Card never hides metadata to save space, it makes room).
- **Spacing:** generous internal padding, never crowded against its own edges; always the most "breathing room per pixel" card on the page.

### 2.2 Editorial Card
- **Purpose:** the unit of a magazine-style feature spread (Luxury Collections) — communicates "this is a story," not "this is an item in a list."
- **Usage:** one per Collection feature, alternating left/right composition across consecutive features.
- **Hierarchy:** equal to Featured in visual weight, different in shape — wider, asymmetric, paired with a dedicated text block rather than overlaid captions.
- **Image ratio:** the widest ratio on the site (cinematic, close to 16:9 or wider) — this card is meant to feel like a magazine double-page spread, not a portrait poster.
- **Typography:** text lives beside the image, not on top of it — Editorial Heading scale (Section 4), with the supporting description set in Body type at a generous line length.
- **Metadata:** minimal or none — this card sells a feeling and a Collection name, not a spec sheet. One line of context at most (e.g. design count: "12 designs in this collection").
- **CTA behaviour:** the only card type permitted a visible button-style CTA (not just a click-anywhere card) — because each Editorial Card is its own mini-landing moment, not a list item.
- **Hover behaviour:** restrained parallax-lite image drift on scroll, not a hover-triggered zoom — this card's motion is tied to scrolling through the story, not to pointer interaction.
- **Responsive behaviour:** always collapses to image-above-text on mobile regardless of its desktop left/right orientation.
- **Spacing:** the most generous section-level spacing on the site — Editorial Cards need room to breathe on every side, more than any other card type.

### 2.3 Standard Card
- **Purpose:** the workhorse of the Gallery — the default tile for any exhaustive grid (Category pages, Style pages, the Full Gallery Browser).
- **Usage:** every grid that isn't a curated rail or a feature spread.
- **Hierarchy:** middle — clearly a "browse" unit, not a "look at this" unit.
- **Image ratio:** portrait-leaning landscape (roughly 4:5 to 1:1) — tall enough to show a room convincingly, compact enough to tile efficiently.
- **Typography:** Card Heading scale (Section 4) — a single line, truncated if needed, never wrapped to two lines.
- **Metadata:** exactly two to three fields, separated by the existing gold-diamond meta-dot, never a full spec row.
- **CTA behaviour:** whole-card link; a small circular arrow glyph in the bottom-right signals "this opens something" without being a button.
- **Hover behaviour:** the site's "default" hover language — lift, border brighten to gold, faster image zoom than Featured (Section 6).
- **Responsive behaviour:** column count reduces with viewport (Section 8); the card itself never changes shape, only the grid around it.
- **Spacing:** consistent grid gutter (`luxoraSpacing.grid`) on every side — never tighter than its neighbors, never given extra room (that would make it a Featured Card).

### 2.4 Compact Card
- **Purpose:** the rail unit — built for scanning many items quickly in a horizontal row (Trending, Recently Added).
- **Usage:** exclusively inside horizontal rails, never in a static grid.
- **Hierarchy:** lower than Standard — denser, less elaborated, designed to be seen many-at-once rather than one-at-a-time.
- **Image ratio:** shorter than Standard (closer to landscape, ≈4:3) so more cards fit in the viewport without scrolling.
- **Typography:** Card Heading at a reduced size (one step down from Standard).
- **Metadata:** one or two fields maximum — whichever is most relevant to the rail's premise (e.g. Recently Added shows a relative date instead of budget).
- **CTA behaviour:** whole-card link, no arrow glyph — at this density, an arrow on every card becomes visual noise.
- **Hover behaviour:** the lightest hover treatment on the site beyond Mini — a brightness lift and a small, fast zoom; no border-color change (borders this close together, all changing color on hover, read as flickering).
- **Responsive behaviour:** card width is fixed in pixels (not percentage), so the rail's scroll mechanism stays predictable across breakpoints; only the *number visible* changes.
- **Spacing:** tight, consistent card-to-card gutter — tighter than the grid gutter, because density is this card's entire purpose.

### 2.5 Mini Card
- **Purpose:** the supporting-cast card — used beside, not instead of, a Featured Card (the side stack in an editorial split layout).
- **Usage:** Editor's Picks' two side cards; nowhere else.
- **Hierarchy:** lowest of the photographic cards — deliberately understated so it never competes with the Featured Card beside it.
- **Image ratio:** tall portrait, sized to stack two of them to roughly the Featured Card's height.
- **Typography:** Card Heading at its smallest permitted size — title only, no eyebrow.
- **Metadata:** one field at most (Style, or Area) — anything more would make this card compete with its Featured neighbor.
- **CTA behaviour:** whole-card link, small light-on-dark arrow glyph (matches Standard's arrow language at reduced scale).
- **Hover behaviour:** identical mechanism to Standard, scaled down — consistency with Standard matters more here than novelty.
- **Responsive behaviour:** stacks beneath the Featured Card on mobile, each at reduced height, in original top-to-bottom order.
- **Spacing:** equal gutter to its sibling Mini Card and to the Featured Card it sits beside — the gap is what visually reads as "stack," so it must be exact and consistent.

### 2.6 Collection Card
- **Purpose:** represents an entire Collection as a single object (the Collections hub) — distinct from any card that represents one design.
- **Usage:** the Collections hub page only.
- **Hierarchy:** equivalent to Standard in size, distinct in content type — it must be visually legible at a glance that this card opens *a set*, not *a design*.
- **Image ratio:** landscape, often a composite/cluster cue (a primary image with a small corner indicator of "more inside") rather than a single clean photograph.
- **Typography:** Collection label at Card Heading scale, plus a one-line editorial description beneath it (the only card type besides Editorial that carries body copy, because a Collection needs a sentence of framing a single design doesn't).
- **Metadata:** one field only — design count ("14 designs") — never room/style/budget metadata, since those don't describe a Collection.
- **CTA behaviour:** whole-card link to the Collection page.
- **Hover behaviour:** matches Standard's hover language exactly — consistency signals "this is still a card in the same family," just describing a different kind of object.
- **Responsive behaviour:** same grid collapse rules as Standard.
- **Spacing:** same grid gutter as Standard.

### 2.7 Style Card
- **Purpose:** the tile representing one Style in the Browse by Style mosaic.
- **Usage:** Browse by Style section only (and, if ever built, a future Style index outside Home).
- **Hierarchy:** variable by design — the mosaic intentionally gives some Style Cards more visual weight than others (the styles with more designs get the larger slot), so hierarchy here is data-driven, not fixed per card.
- **Image ratio:** square at the smaller mosaic sizes, landscape at the larger "feature" slot — the one card type whose ratio changes by size tier, which is acceptable specifically because the mosaic's asymmetry is the point (see Section 3 on never mixing ratios *within* a single uniform grid — the mosaic is not a uniform grid).
- **Typography:** Style label only, set in Card Heading or Label scale depending on tile size.
- **Metadata:** none — Style Cards are pure visual/aesthetic entry points, not data cards.
- **CTA behaviour:** whole-tile link to the Style page.
- **Hover behaviour:** soft cross-fade/scale, slower than Standard's — Style is about mood, and the hover should feel considered, not snappy.
- **Responsive behaviour:** the asymmetric mosaic is desktop-only; mobile resolves to a uniform single column (Section 8).
- **Spacing:** tighter than Standard's grid gutter — a mosaic reads as one continuous composition, not a set of separated tiles.

### 2.8 Category Card
- **Purpose:** the tile representing one Category (room type) in the Browse by Room strip.
- **Usage:** Browse by Room section only.
- **Hierarchy:** lowest-weight card on the page by design — this is wayfinding, not content.
- **Image ratio:** square or near-square, the most compact ratio on the site — these read as icons-with-a-photo, not as content cards.
- **Typography:** Category label only, smallest Label-scale type on the page outside true microcopy.
- **Metadata:** none.
- **CTA behaviour:** whole-tile link to the Category page.
- **Hover behaviour:** the lightest touch on the site — a small lift and label brighten, nothing else; this is the one card explicitly forbidden from using image-zoom-on-hover (it would make a utility strip feel like a content showcase, contradicting its purpose).
- **Responsive behaviour:** horizontal scroll-snap strip on mobile, identical tiles, just smaller.
- **Spacing:** even, generous horizontal spacing between tiles — this strip should feel uncluttered even though it shows all six categories at once.

---

## 3. Image System

**The governing rule, with no exceptions: photography is never stretched, never distorted, and never upstaged.** Every image uses `object-fit: cover` against a fixed-ratio container — an image is cropped to fit its frame, never squeezed.

### 3.1 Aspect ratios by use
| Use | Ratio | Notes |
|---|---|---|
| Hero | ~16:9 to 21:9 (very wide) | Full-bleed, cinematic |
| Featured Card | 4:5 to 16:10 | Generous, varies by viewport |
| Editorial Card | 16:9 or wider | Magazine-spread width |
| Standard Card | 4:5 to 1:1 | Portrait-leaning |
| Compact Card | ~4:3 | Shorter, denser |
| Mini Card | Tall portrait (~3:4) | Built to stack |
| Collection / Style / Category Card | Landscape or square | Per card type, Section 2 |
| Thumbnail (lightbox strip, related-rail mini-thumbs) | Square | Easiest to scan in a row |

### 3.2 Cropping rules
- Crop is always center-weighted by default; where a project's hero image has an obvious off-center subject (e.g. a feature wall, not the room's geometric center), the content author sets a focal point at the image-metadata level (already supported structurally by `GalleryImage`'s explicit `width`/`height` — focal-point authoring is a content task, not a new field type).
- Never crop a face, a logo, or identifying text out of frame awkwardly — if a crop would do that, the image is unsuitable for that slot and a different image from the project's set should be used instead.

### 3.3 Image focus & zoom rules
- Zoom-on-hover is a **privilege earned by card hierarchy**, not a default: Featured (slow, 1100ms, scale ~1.03) → Standard (700ms, scale ~1.10) → Compact (faster, smaller scale) → Mini (matches Standard, scaled down) → Category Card (**no zoom**, Section 2.8).
- Zoom never exceeds a scale that would visibly degrade image sharpness or reveal the crop's edge artifacts — the ceiling is roughly 1.10–1.12 even on the most dramatic card.

### 3.4 Overlays & gradient treatment
- Every card with text overlaid directly on a photograph uses a bottom-anchored dark gradient (`rgba(20,14,6, …)` fading to transparent), never a flat scrim — the gradient's stop percentages vary by how much text sits on top (more text = the gradient starts higher and reaches greater opacity at the base), but the direction and color family never change.
- Hero treatments add a second, side-anchored gradient (left-to-right or angled) purely for headline legibility — this is the one place two gradients stack, and only because the headline block sits in a fixed corner rather than at the card's natural base.
- Editorial Cards (Section 2.2) are the deliberate exception — text lives beside the image, not on top of it, so no legibility gradient is needed there at all.

### 3.5 Image loading
- All Gallery imagery loads through `next/image` for automatic responsive `srcset` generation (already implied by the architecture's image strategy).
- **Blur placeholder:** every image shows a low-resolution blurred placeholder (a base64 microthumbnail or a dominant-color swatch derived from the image) while the full image loads — never a flash of blank space, never a generic gray box.
- **Empty image fallback:** if an image genuinely fails to resolve, the fallback is a designed state — a warm-cream panel (`luxoraColors.warmCream`) carrying a single thin-line Luxora monogram or motif at low opacity, never a broken-image icon, never a stock "no image available" graphic. This fallback must look intentional, as if it could pass for a deliberate design choice, because on a photography-first page a visibly "broken" state is the single worst thing a visitor can see.

---

## 4. Typography System

Two type families carry the entire Gallery, exactly as the rest of V4: **Playfair** (display/editorial serif) for anything that should feel considered and crafted, **Inter** (`font-inter`, the site body sans) for anything that should feel clean and legible. No third typeface is ever introduced.

| Level | Typeface | Role | Notes |
|---|---|---|---|
| **Display Heading** | Playfair, regular + italic accent line | Page Hero headline only | Largest type on the Gallery; the italic line is reserved for the single most emotive phrase in the headline |
| **Editorial Heading** | Playfair, regular | Editorial Card / feature-spread headings (Luxury Collections, Editor's Picks) | One step below Display; can carry an italic word for emphasis, never an entire italic line |
| **Section Heading** | Playfair, regular | Rail/section titles ("Trending Designs," "Browse by Style") | Always paired with an uppercase tracked eyebrow label above it (gold, Label scale) |
| **Card Heading** | Playfair, regular | Every card title (Featured down to Mini, scaled per card tier) | Single line, truncates rather than wraps |
| **Metadata** | Inter, semibold, uppercase, tracked | Style/Area/Budget/etc. fields on cards | Smallest functional type on the site; tracking compensates for the small size so it never feels cramped |
| **Caption** | Inter, light | Supporting one-liners under Editorial/Collection Cards | Slightly larger than Metadata, never bold |
| **Label** | Inter, semibold, uppercase, tracked, gold | Eyebrows, badges ("Featured Project," "Collection") | Always gold (`luxoraColors.gold` or the lighter `goldLight` on dark backgrounds), never any other color |
| **Body** | Inter, light, relaxed leading | Descriptions, Editorial Card copy, empty-state messaging | Generous line-height; body copy on this site is never dense |
| **Button / CTA text** | Inter, bold, uppercase, tracked | The rare visible button (Editorial Card CTA, Consultation CTA) | Identical scale and tracking to existing V4 CTA buttons — no Gallery-specific button typography |

**Spacing and rhythm:**
- Every heading-to-body relationship follows the same vertical rhythm already established across V4 components: eyebrow → small gap → heading → slightly larger gap → description/body → larger gap still → metadata or CTA. The gaps grow as you move down the stack, never shrink — this is what makes the type "breathe" rather than feel stacked.
- A thin gold hairline (`LuxuryDivider`, `line` or `diamond` variant) is the one permitted typographic punctuation mark between a heading and what follows it in feature-weight contexts (Featured Card, Editorial Card, Section Headings) — never used under Compact/Mini/Category card titles, where it would be visual overkill for the content's weight.
- Tracking (letter-spacing) increases as type size decreases — Display Heading has the loosest natural spacing from its size alone; Metadata and Label, both very small, get explicit positive tracking (the existing ~0.14–0.24em pattern already in use) specifically so they don't collapse into an illegible blur at small sizes.

---

## 5. Metadata System

Every design card displays metadata from one consistent, prioritized pool — never a card-specific invented field, never overloaded with everything available.

**Priority order (highest to lowest):**
1. **Style** — the single most identity-defining fact about a design; shown on every card type that shows metadata at all.
2. **Room / Category** — usually implicit from context (a Category page already tells you it's living rooms) but shown explicitly on cross-category surfaces (Trending, Recently Added, the Collections hub).
3. **Area** — concrete, comparably useful across designs.
4. **Budget** — important, but never leads; never shown alone without at least Style or Area alongside it (budget-only metadata reads as a price tag, which contradicts Section 1's "never e-commerce" rule).
5. **Location / City** — adds real-world credibility without becoming the headline fact.
6. **Completion time** — the most "operational" metadata field; reserved for the Featured Card's full spec row, rarely shown elsewhere.
7. **Image count** — the lowest-priority field, used only where relevant (e.g. a Collection Card showing "14 designs," or a future gallery-detail thumbnail strip indicator) — never shown on a single-design card, since opening the card itself reveals the images.

**Field caps per card tier** (cross-referenced from Section 2 — repeated here as the single place to check the rule):
- Featured Card: up to 5 fields, full labeled spec row.
- Editorial / Collection Card: 0–1 field (design count only, if any).
- Standard Card: 2–3 fields, separated by the gold meta-dot, never labeled (value only — "Scandinavian · 420 sq ft · 21 Days," not "Style: Scandinavian").
- Compact Card: 1–2 fields.
- Mini / Style / Category Card: 0–1 field.

**The governing rule:** if a card needs a sixth metadata field to feel "complete," that's a sign the design wants a Detail page visit, not more text on a thumbnail — resist the urge to add fields to a card; add a reason to click through instead.

---

## 6. Hover Language

Every interactive surface on the Gallery responds to hover/touch with one or more of exactly six effects — no others are introduced, and no card uses more than two or three of them at once (stacking all six on one element is itself a violation of "never flashy").

1. **Image zoom** — scale only, never rotation, never skew. Speed and magnitude scale with card hierarchy (Section 3.3).
2. **Border transition** — a hairline border fades from a neutral warm tone to gold on hover (the existing `border-2` → `hover:border-[#C9A227]` pattern already used on `GalleryCard`). Never used on cards whose text sits directly on the photo with no border at all in the resting state (e.g. Featured, Editorial) — border transitions belong to bordered card types only (Standard, Compact, Mini).
3. **Elevation / shadow** — a card lifts a few pixels (`translateY` negative) and its shadow deepens from `luxoraShadows.card` toward `luxoraShadows.floating`. This and the border transition are the two effects every bordered card type shares, always together, never one without the other.
4. **Overlay shift** — on cards with a gradient overlay, hover may very slightly deepen the overlay's base opacity (a few percentage points) to help the arrow glyph/CTA read more clearly — subtle enough that a visitor would struggle to describe it if asked, which is exactly the point.
5. **Arrow movement** — the small circular arrow glyph (Standard/Mini cards) nudges a few pixels in its pointing direction on hover. This is the only "directional" motion permitted anywhere in the hover language.
6. **Text/label brighten** — on the lightest-weight cards (Category, Style), hover brightens the label's color/opacity rather than moving or scaling anything — the correct hover treatment for cards too small or too utilitarian for the heavier effects above.

**Absolute rules:**
- No bounce, no spring/elastic easing, no rotation, no color-cycling, no glow pulses, no sound. Easing is always a smooth ease-out (entrances) or ease-in-out (transitions), per `luxoraMotion`.
- No hover effect ever changes a card's *dimensions* (width/height) — only its transform (scale/translate) and color/opacity — so neighboring cards never reflow when one is hovered.
- Touch devices receive the equivalent *tap/active* state treatment, not a permanently-stuck hover state — nothing should look "hovered forever" on a phone.

---

## 7. Rail Language

Every horizontal rail on the Gallery (Trending, Recently Added, and any future rail) shares one consistent structural language, even though their card content and tone differ (per the UX spec's deliberate variation in *what* each rail contains — this section governs *how* every rail is built, which stays constant).

- **Heading:** eyebrow label (Label scale, gold, uppercase) directly above a Section Heading (Playfair) — identical construction to every other section heading on the site, never a rail-specific heading style.
- **Subheading:** optional single line of Body or Caption type beneath the heading, used only when a rail's premise needs one extra sentence of framing (e.g. Trending's degraded-to-freshness framing, Editor's Picks' "hand-picked by the Luxora team" line) — never more than one line.
- **CTA:** a quiet text link ("View All →"), top-right of the heading row, same baseline as the Section Heading — never a button at the rail-header level (buttons are reserved for Editorial Card features, Section 2.2/2.6's exception aside).
- **Spacing:** the rail header block aligns to the same container left edge as every other section on the page (`luxoraSpacing.container`); the gap between the header block and the first card row matches the established heading-to-content rhythm (Section 4).
- **Arrow placement (desktop):** previous/next arrow controls sit either flanking the rail's card row at the container's outer edge, or centered just beneath the heading row beside a numeric counter ("01 / 08") — whichever placement is chosen, it must be used identically by every rail on the site (no rail invents its own arrow position).
- **Card spacing:** a fixed, consistent gutter between cards within a rail — tighter than a static grid's gutter (Section 2.4), but identical across every rail so the page has one "rail rhythm," not several.
- **Scroll behaviour:**
  - **Desktop:** arrow-controlled, advancing by a fixed visible-card-count step, never a full-page jump; manual mouse-wheel/track-pad horizontal scroll is also supported as a secondary input, but arrows are the primary, always-visible control.
  - **Tablet:** same arrow mechanism as desktop where space allows; if arrows would crowd the card row at tablet widths, they may recede to appear only on hover/focus of the rail itself.
  - **Mobile:** native scroll-snap, no visible arrows, momentum-based — the rail must always snap cleanly to a card edge, never leave a card half-visible at rest.

---

## 8. Grid System

| Breakpoint | Standard grid columns | Notes |
|---|---|---|
| Desktop (≥1280px) | 3–4 | Matches the existing `max-w-7xl` container; 4 columns for denser browse grids (Full Gallery Browser), 3 for anything where cards carry more detail |
| Tablet (~768–1279px) | 2 | Never 3 at tablet widths — 3 columns at this width starts to crowd Standard Card metadata |
| Mobile (<768px) | 1 | Single column, full-width cards — matches the architecture's mobile-first rule (image quality over density) |

- **Card spacing:** `luxoraSpacing.grid` (`gap-6 md:gap-8`) — the one gutter value every static grid on the Gallery uses; rails use a tighter, separate value (Section 7), and that distinction is intentional, not an inconsistency.
- **Section spacing:** `luxoraSpacing.section` (`py-24 md:py-32`) for standard sections; Editorial-weight sections (Luxury Collections, large feature spreads) are permitted the heavier spacing already used by `ServiceGalleryShowcase` (`py-28 md:py-36`) — the one place section padding is allowed to grow beyond the default, and only because the content inside is proportionally larger too.
- **White space philosophy:** white space is treated as a design material, not leftover space. When in doubt between "add one more card to this row" and "leave the row as is with more margin," the Gallery always chooses the latter. A page that feels like it could fit more is doing its job; a page that feels crowded has failed regardless of how good any individual photograph is.

---

## 9. Background Language

**The Luxury Pattern Library — `LuxuryHalo`, `LuxuryContour`, `LuxuryBlueprint`, `LuxuryMarble`, `LuxuryGrain`, `LuxuryDivider` — is the only source of background texture anywhere in the Gallery.** No new artwork, gradients, illustrations, or textures are ever introduced outside this library.

| Pattern | What it represents | Where it belongs | Default opacity |
|---|---|---|---|
| `LuxuryGrain` | Subtle film-grain texture, the page's base "paper" feeling | Every section, as the universal base layer underneath any feature pattern — the one pattern that is never *not* present | 0.012 (`luxoraPatternOpacity.grain`) — barely perceptible by design |
| `LuxuryHalo` | A soft radial light source, warmth and focus | Sections that need a gentle glow behind dense content (Trending rail, the Full Gallery Browser) — placed in a corner, never centered behind text | 0.08 (`luxoraPatternOpacity.halo`) |
| `LuxuryContour` | Abstract topographic-line texture | Editorial spread sections (Editor's Picks) — gives a feature spread its own quiet identity without literal imagery | 0.04 (`luxoraPatternOpacity.contour`) |
| `LuxuryMarble` | Material-grain texture, evokes stone/surface craft | Sections about aesthetic/material mood specifically (Browse by Style) — reserved for exactly this association, not used decoratively elsewhere | 0.045 (`luxoraPatternOpacity.marble`) |
| `LuxuryBlueprint` | Architectural plan/line-drawing texture | The page's most "craft" association — reserved for the largest, most premium editorial moment (Luxury Collections) | 0.035 (`luxoraPatternOpacity.blueprint`) |
| `LuxuryDivider` | Not a background — a foreground separator (hairline, diamond, curve, editorial) | Between a heading and its content, between a section and a CTA — never used as a background fill | N/A (foreground element) |

**Where these must NEVER be used:**
- **Never directly behind or over a full-bleed photograph.** A pattern sits in the section's empty background space, never overlapping a card's image area — photography always wins that contest, so the pattern is positioned where there's no photography to compete with (a corner gap, the space around a rail, behind a quiet utility section).
- **Never two feature patterns in one section.** `LuxuryGrain` may always be present underneath, but only one of Halo/Contour/Marble/Blueprint appears per section — stacking two feature patterns reads as visual noise, even at low opacity.
- **Never above the documented opacity ceiling.** The values above are ceilings, not starting points to be increased for "more visual interest" — if a section feels visually flat, the fix is better photography or better whitespace, never a louder background pattern.
- **Never on the quietest utility sections** (Browse by Budget, Browse by Room) — these are explicitly pattern-free or grain-only by design (per the UX spec's background allocation table); adding a feature pattern there would make a deliberately quiet section compete for attention it shouldn't have.
- **Never as a substitute for a real design decision.** A background pattern is seasoning, not a structural element — if removing it would make a section feel broken rather than merely "plainer," the section was relying on decoration to do a job typography/layout should be doing instead.

---

## 10. Motion Language

**Motion on the Gallery should feel cinematic — slow, intentional, and purposeful — never distracting, never decorative for its own sake.**

- **Page load:** the Hero's headline and stat row fade/rise in once, on initial load only (not on every return scroll). No other section animates on page load — everything below the fold waits for scroll-reveal.
- **Scroll reveal:** every section/card fades in and rises a small distance (8–16px) the first time it crosses roughly 20% into the viewport — matching the existing `data-v4-reveal` convention already used across V4. Reveals never repeat once triggered (no animate-out-then-in-again on scroll-up), and dense grids (Full Gallery Browser at scale) intentionally skip staggered per-card reveal entirely (Section 10 of the UX spec) to protect performance at high item counts.
- **Hover:** per Section 6 — scale, translate, opacity, color only; never position-shifting layout changes.
- **Slider/rail:** a single translating track (`transform: translateX(...)`), `500ms ease-in-out` — the existing mechanism already proven in `ServiceGalleryShowcase`. Never a fade-cross-dissolve between slides; always a physical slide.
- **Lightbox:** opens with a fade + slight scale-up of the image (never a slide-in from an edge), backdrop fades in beneath it; closes as the exact reverse. Never a bounce on open/close.
- **Transitions (page-level):** no custom page-transition choreography between Gallery routes — standard Next.js navigation; motion budget is spent on in-page experience, not route changes.

**Duration and easing scale** (the only values used anywhere on the Gallery):
| Tier | Duration | Easing | Used for |
|---|---|---|---|
| Micro | 300ms | ease-out | Hover color/border/elevation changes |
| Standard | 500ms | ease-out / ease-in-out | Scroll reveals, slider track movement, lift transforms |
| Slow | 700ms | ease-out | Standard Card image zoom |
| Cinematic | 1000–1100ms | ease-out | Featured Card image zoom, lightbox image transitions |
| Ambient | 20–30s loop | linear/ease | Hero background Ken Burns drift — the one genuinely slow, continuous motion on the page |

**Animation hierarchy:** the Hero's ambient motion is the slowest and most continuous; Featured/Editorial cards get the next-slowest, most deliberate motion; Standard/Compact cards get brisk, confident motion; metadata text, labels, and dividers **never animate at all** beyond appearing in the initial scroll-reveal fade — text is read, not watched.

**Hard rules:** no spring/elastic/bounce easing anywhere. No infinite-loop motion except the Hero's ambient drift. No motion that triggers on page scroll position beyond the one-time reveal threshold (no parallax-scrubbing tied continuously to scroll position except the explicitly-scoped Editorial Card image drift, Section 2.2, which is itself capped to a small, slow range).

---

## 11. Empty States

Every empty/loading/error state on the Gallery is a **designed state**, never a default browser/framework fallback.

- **No results (filtered to zero):** warm, calm messaging — no illustration of a sad face or broken object; a short line acknowledging the filter combination, plus a clear "Clear filters" action and 2–3 suggested categories/styles (matches the architecture's existing `GalleryEmptyState` requirement) — the tone is "let's try something else," never "error."
- **No search results:** identical visual treatment to No Results, with copy specific to the search query ("No designs matched '...'") rather than filters — still ends in a positive next action, never a dead end.
- **No filters applied / catalog genuinely empty for a scope** (e.g. a brand-new Style page before content exists): this state should never ship live — per the architecture's thin-content guard, a Category/Style/Collection page isn't promoted to a real route until it clears its minimum design count. If it's ever encountered in a staging context, the treatment is a quiet "More designs coming soon to this collection" message, same visual family as No Results, with a single CTA back to the Gallery Home.
- **"Coming Soon"** (a teased but not-yet-populated Collection, e.g. an upcoming Festival Collection): a refined placeholder using the Hero's gradient/typography language at reduced scale — eyebrow + heading + one line, no fake/placeholder photography ever substituted in just to fill space.
- **Loading (skeleton):** every card type has a matching skeleton shape at its exact aspect ratio and corner radius — a soft, slow shimmer (a subtle left-to-right gradient sweep, 1.5–2s loop) across a warm-cream/ivory base tone (`luxoraColors.warmCream`/`ivory`), never a gray, generic skeleton lifted from a non-branded UI kit. Skeletons never show placeholder text lines for metadata that will be very short (e.g. a two-word style name) — only the image block and the heading line need a skeleton shape; short metadata can simply appear once data resolves.
- **Offline / failed data fetch:** rare on a largely static-generated page, but where it can occur (e.g. a client-side search/filter operation failing), the treatment is the same calm, warm messaging family as No Results — never a browser-default error page, never a stack trace, never alarming color (no red).

---

## 12. Visual Consistency Rules (Checklist)

A binding checklist for every Gallery page, present and future:

1. **Never mix two card types in one rail or grid.** A rail is Compact Cards, or Standard Cards, or Mini Cards — never a blend.
2. **Never mix image aspect ratios within a single uniform grid.** (The Style mosaic is the one explicitly-asymmetric exception, by design — Section 2.7 — and even it has fixed ratios per size tier, not arbitrary ones.)
3. **Never place a feature background pattern directly behind or across a photograph.**
4. **Never show inconsistent metadata field order.** Style always leads when present; the order in Section 5's priority list is fixed across every card of the same type.
5. **Never use more than one dominant (button-style) CTA per section.** Text-link CTAs don't count against this limit; visible buttons do.
6. **Never let a hover effect change card dimensions** or cause sibling cards to reflow.
7. **Never introduce a new typeface, weight, or italic usage pattern** beyond what Section 4 defines.
8. **Never stack more than two-to-three hover effects on one element.**
9. **Never let metadata exceed its card tier's field cap** (Section 5).
10. **Never use a generic/non-branded loading spinner, error icon, or empty-state illustration.**
11. **Never animate metadata, labels, or captions** — only headings, images, and full cards animate.
12. **Maintain editorial rhythm:** across the page, alternate rail/grid sections with feature/spread sections (per the UX spec's deliberate sequencing) — never let three consecutive sections share the same layout archetype.
13. **Never exceed the documented background-pattern opacity ceiling**, and never combine two feature patterns in one section.
14. **Never crop a photograph in a way that distorts proportions** (no non-uniform scaling) — crop, never stretch.
15. **Every new component must be checked against this guide before it ships** — if a new card, rail, or section can't be mapped onto an existing type in this document, that's a signal to either extend this guide deliberately (a conscious decision) or to reconsider whether the new thing is actually necessary (Section 13, Principle 7).

---

## 13. Design Principles

1. **Photography first.** Every layout decision defers to the image.
2. **Typography before decoration.** If type and whitespace can carry a section, no pattern, icon, or ornament is added.
3. **White space is luxury.** Density is never the goal; restraint is.
4. **Content is the hero.** The interface exists to present the work, not to perform.
5. **Motion supports content.** Animation reveals and frames; it never entertains for its own sake.
6. **Never decorate for decoration's sake.** Every visual element must be traceable to a purpose defined in this guide.
7. **Every component must justify its existence.** If an existing card, rail, or pattern can do the job, a new one is not created.
8. **Consistency over novelty.** A new section should feel like it belongs, not like it's trying to stand out from its neighbors.
9. **Editorial over commercial.** The Gallery sells nothing directly; it inspires, and lets the Consultation CTA do the only selling that happens.
10. **Premium over trendy.** No visual technique is adopted because it's currently popular; it's adopted because it serves restraint, warmth, and craft.
11. **Timeless over fashionable.** This guide should still look correct in five years.
12. **One dominant idea per section.** Every rail, grid, or spread has exactly one editorial premise — never two competing ideas in one section.
13. **Hierarchy is communicated visually, not verbally.** A Featured Card looks more important; it doesn't need a label saying so beyond its eyebrow.
14. **Quiet confidence over loud persuasion.** No urgency mechanics, no countdown timers, no manufactured scarcity — ever.
15. **The warm Luxora palette is non-negotiable.** No section introduces a colder or unrelated color system, regardless of trend.
16. **Cards never lie about their weight.** A Mini Card never tries to look like a Featured Card; visual weight always matches actual editorial importance.
17. **Backgrounds support; they never compete.** If a pattern is noticed before the photograph, the pattern is too strong.
18. **Performance is a design constraint, not an afterthought.** Every visual choice (stagger reveals, skeleton states, image loading) is made assuming the catalog will eventually be ten times its current size.
19. **Empty and loading states are designed, not defaulted.** A visitor should never see a state that looks unfinished or accidental.
20. **When in doubt, remove, don't add.** The Gallery's premium feeling comes from what's been left out at least as much as from what's been included.
