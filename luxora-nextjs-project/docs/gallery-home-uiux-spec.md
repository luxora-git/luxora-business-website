# Luxora Design Gallery — Gallery Home (`/luxury-v4/gallery`) UI/UX Specification

Status: **Implementation blueprint.** No JSX, no React, no Tailwind, no code in this document.
Builds on: [`design-gallery-architecture.md`](./design-gallery-architecture.md) (frozen — not modified by this document). Every data source, route, and taxonomy referenced below is defined there; this document is purely the *page-level UI/UX spec* for one route.
Audience: implementer building the actual Home page next.

---

## 0. Creative Direction

Luxora Design Gallery is not a product catalog and not a project showcase. It is **an inspiration library** — the feeling on landing should be closer to opening a beautifully art-directed magazine than opening a storefront.

What we borrow, specifically, and what we deliberately leave behind:

| Reference | What we borrow | What we don't |
|---|---|---|
| **Livspace Design Ideas** | The basic shape — a gallery of real interior ideas organized by room, browsable without commitment | Its density and ad-like card treatment |
| **Apple** | Restraint, generous whitespace, one strong idea per screen, typography doing most of the work | Product-launch pacing (this is a browsing page, not a reveal sequence) |
| **Aesop** | Material honesty — let the photography and the warm Luxora palette (`luxoraColors`) carry the page; minimal chrome | Its near-total minimalism (Luxora still needs filtering/search utility, Aesop doesn't) |
| **Airbnb** | The category-strip-near-the-top navigational pattern, and quiet, confident iconography for "ways to browse" | Map-based browsing, price-forward card design |
| **Netflix** | Horizontal rails as the primary browsing unit; rails with a clear, single editorial premise ("Trending," "New") | Auto-playing previews, infinite undifferentiated rows |
| **Architectural Digest** | Large editorial feature spreads, magazine-style asymmetry, a sense that someone curated this, not an algorithm | Subscription paywalls, dense text-led layouts |

The synthesis: **a page built from rails, where every rail has a distinct editorial premise and a distinct layout shape**, opening with a library-entrance hero, closing with the exhaustive browse-everything tool for visitors who want it. Luxora's existing warm/gold V4 visual language (`luxoraColors`, the `background` pattern library, Playfair display type) is the one constant running underneath all of it — this page must still look unmistakably like the rest of luxury-v4.

---

## 1. Section Sequence — Proposed Change & Why

The brief's proposed order included both **"Featured Categories"** (#2) and **"Browse by Room"** (#9) as separate sections. In the frozen architecture, Category *is* "room type" (Section 8) — there is only one taxonomy axis here, not two. Two separate sections branding the same six categories (`living-room`, `bedroom`, `kitchen`, `wardrobes`, `full-home`, `office`) would either repeat the same content twice or force one of them to be artificially different, which fights the "avoid repetitive layouts" directive rather than serving it.

**Change:** merge them into one section — **Browse by Room** — and move it to position 2, immediately after the Hero. Rationale:

- Category is the architecture's primary, frozen, SEO-load-bearing taxonomy (architecture §8) and the main internal-linking entry point into the rest of the site (architecture §10). It deserves the *earliest* prominent placement, not a late slot — a visitor who already knows "I want kitchen ideas" should never have to scroll through five editorial rails first (this is the Airbnb lesson: category selection sits near the top, not the bottom).
- Editorial storytelling rails (Trending, Editor's Picks, Luxury Collections, Recently Added) work better *after* the visitor has gotten their bearings on the taxonomy, not before.

Final sequence (11 sections, down from the brief's 12, by this one merge — nothing else removed):

1. Hero
2. Browse by Room
3. Trending Designs
4. Editor's Picks
5. Browse by Style
6. Luxury Collections
7. Recently Added
8. Browse by Budget
9. Full Gallery Browser
10. Consultation CTA
11. Footer

This sequence deliberately **alternates rail character** so no two adjacent sections feel the same: Hero (cover) → Room (navigational strip) → Trending (signal slider) → Editor's Picks (editorial spread) → Style (navigational index) → Luxury Collections (editorial spread) → Recently Added (quiet slider) → Budget (quiet utility) → Full Browser (exhaustive tool) → CTA → Footer. Every section below names its layout archetype explicitly so this alternation is enforceable at build time, not just at design time.

---

## 2. Section 1 — Hero

**Purpose:** the front door to an inspiration library, not a landing-page pitch. Its only job is to make a first-time visitor feel "there is a lot of beautiful, real work here, and I can explore it freely" within one screen, with zero commitment required.

**User psychology:** a visitor arriving here is in browse/research mode, not decision mode (architecture §1.1, "Browse intent"). They should feel invited to wander, not funneled toward a single CTA. The hero's job is permission and scale ("thousands of premium interior ideas exist here"), not conversion.

**Content:**
- Eyebrow: `Design Gallery`
- Headline: a two-line Playfair statement built around *"Explore Thousands of Premium Interior Ideas"* — phrased as an invitation, not a tagline (e.g. "Step Into / Luxora's Interior Design Library" — exact copy is a content task, not specified here, but the headline must communicate *scale + library*, not *we are a design firm*).
- Supporting line: one sentence reinforcing browsing, e.g. "Every room. Every style. Real homes, designed end-to-end by one team." — short, no CTA verbs.
- Live stat row (reuses `GalleryHeroStat`): total design count, category count, a third stat that signals breadth rather than sales (e.g. "12 Cities" or "8 Styles") — deliberately not "10-Year Warranty" (that's a trust/Portfolio-style stat, out of place in an inspiration library's first screen).
- No primary CTA button in the hero itself. The hero's only interactive element is implicit: the visitor scrolls.

**Layout:** full-bleed image hero, taller than the current `GalleryHero` (which is sized for Category/Style pages, not Home) — a dedicated, larger Home-only hero treatment. Image is a single striking interior photograph (not a collage, not a grid of thumbnails — the "library entrance," singular and considered, à la Aesop's restraint).

**Desktop behaviour:** full viewport height or near it (90vh), headline and stat row anchored lower-left in the existing V4 hero text-placement convention (matches `GalleryHero`'s `max-w-[760px] lg:ml-[3%]` placement language). A subtle scroll-affordance indicator (a thin animated chevron or line, not a button) at the bottom center signals "more below" — reinforcing "library," not "page."

**Mobile behaviour:** height reduces to roughly 70vh to avoid pushing all content below the fold on small screens; stat row wraps to two rows if needed (already how `GalleryHeroStat` wraps); breadcrumb is omitted on Home specifically (Home has no parent to breadcrumb to — this differs from the breadcrumb-everywhere rule in architecture §10, which applies from Category downward).

**Animations:** slow, cinematic image zoom (Ken Burns-style, very subtle, 20–30s loop, GPU-cheap `transform: scale`) rather than a static image — communicates "alive, premium" without becoming a slideshow. Headline and stat row fade/rise in on initial load only (not on every scroll-into-view, since it's above the fold at load).

**Background patterns:** none of the `background` pattern library on top of the hero photograph itself — a photograph this size needs zero competing texture. The existing gradient-overlay treatment from `GalleryHero` (dark-to-transparent linear gradients for text legibility) is reused as-is.

**CTA behaviour:** none, by design. The CTA budget for this page is spent at the bottom (Section 10, Consultation CTA) and inside individual rails (each card *is* a CTA to its design) — stacking a CTA button into the hero on top of that would dilute both.

**Component reuse:** a new `GalleryHomeHero` component, modeled directly on the existing `GalleryHero` (same breadcrumb/eyebrow/title/description/stat structure and the same gradient-overlay technique) but taller and without the breadcrumb — this is the one genuinely new component this page needs (see Section 12).

**Data source:** `galleryProjects.length`, `galleryCategories.length`, and one more aggregate stat (e.g. distinct `meta.city` count) computed at build time from `lib/content/gallery/projects.ts` / `categories.ts` — no new data file needed.

---

## 3. Section 2 — Browse by Room

**Purpose:** the primary navigational entry into the Category taxonomy (architecture §8) — gets every visitor who already knows what room they care about to the right place in one tap, before any editorial content.

**User psychology:** matches "Search intent" visitors (architecture §1.1) who arrived already knowing "I want kitchen ideas" — and gives "Browse intent" visitors their first sense of the site's shape (six rooms, full homes, offices) without overwhelming them with a wall of categories.

**Content:** all six categories (`living-room`, `bedroom`, `kitchen`, `wardrobes`, `full-home`, `office`) as a single, complete strip — every category, always, since six is small enough to show in full (no "view all" truncation needed at this taxonomy size).

**Layout:** **horizontal icon/image strip**, Airbnb-style — each category is a compact circular or softly-rounded tile (a representative photo crop, not a generic icon) with its label beneath, not a heavy card. Deliberately the lightest-weight, most compact section on the page — this is a wayfinding strip, not a content rail, and must read as utility at a glance.

**Desktop behaviour:** all six tiles fit in one row at typical desktop widths with even spacing, no scrolling needed; hover lifts the tile slightly and brightens the label (consistent with the lift/border-highlight hover language already used on `GalleryCard`).

**Mobile behaviour:** horizontal scroll-snap strip (the only place on the page besides Trending/Recently Added rails using this mechanism) — tiles are smaller and the strip scrolls with snap-to-tile behavior so a swipe always lands on a centered tile, never mid-tile.

**Animations:** tiles fade/rise in on scroll-into-view, staggered left-to-right (50–80ms stagger) — the only place a "stagger" animation is used this early, establishing the page's general scroll-reveal language gently before heavier rails below.

**Background patterns:** `LuxuryGrain` at the lowest opacity already used elsewhere (0.012, matching existing sections) directly on the section background — no halo/contour here, keeping this strip visually quiet relative to the rails around it.

**CTA behaviour:** each tile *is* the CTA — tapping/clicking navigates straight to `/gallery/[category]`. No secondary "Browse All Categories" link needed since all six are already shown.

**Component reuse:** new lightweight presentation component, `GalleryCategoryStrip` (+ a `GalleryCategoryTile`) — there is no existing component shaped for this (the existing category surfacing is the `GalleryFilterBar`'s category pills, which are filter controls, not a navigational hero strip). Built from the same image/typography primitives as `GalleryCard`, just restyled smaller and circular/pill-shaped — not a fork of business logic, only of presentation.

**Data source:** `galleryCategories` (`lib/content/gallery/categories.ts`) — each tile's image is `GalleryCategory.heroImage`/`heroImageAlt`, already present.

---

## 4. Section 3 — Trending Designs

**Purpose:** a signal-backed dynamic rail (architecture §21.1.2) — "what's getting attention right now" — gives the page a sense of liveness and social proof without needing testimonials (which belong to Portfolio, never Gallery, per architecture §15).

**User psychology:** trending content triggers curiosity and FOMO-adjacent browsing ("what is everyone else looking at") — the Netflix mechanism exactly. It also signals the catalog is active and growing, reinforcing the "library, not a static brochure" feeling from the hero.

**Content:** a capped set (8–12) of designs ranked by the Popularity/Freshness signals already reserved in the Recommendation Engine architecture (architecture §18.2) — in Phase 1, before real view/save data exists, this rail's rule degrades to **Freshness only** (architecture §18.3's graceful-degradation rule: weights default to zero until the data exists, no special-case code path) — so "Trending" in Phase 1 effectively shows the most recently meaningful publishes, and silently upgrades to genuine popularity-weighted trending the moment Save/View data exists, with no rebuild of this section required.

**Layout:** **horizontal slider**, uniform card size, denser/smaller than the Editor's Picks spread below it — explicitly the Netflix-row archetype: many items, one scan direction, no per-item elaboration.

**Desktop behaviour:** shows 4–5 cards at once with arrow controls at the section edges (reusing the exact prev/next arrow-button treatment already built in `ServiceGalleryShowcase`); clicking an arrow advances by one card-width set, not by a full page, so the rail never "snaps away" content mid-card.

**Mobile behaviour:** native horizontal scroll with momentum + snap, no visible arrow controls (matches the existing mobile pattern in `ServiceGalleryShowcase`'s dot/arrow mobile nav, minus the dots — dots imply a small fixed slide count, which a rail of 8–12 individual cards doesn't suit; rely on scroll-snap alone, the way Netflix's own mobile rails do).

**Animations:** card hover/tap uses the existing `GalleryCard` image-zoom-on-hover treatment, unchanged — no new animation vocabulary introduced for "trending" specifically; the rail's *novelty* is its layout and premise, not new motion.

**Background patterns:** `LuxuryHalo` (small, low opacity, one corner) — same restrained treatment already used behind the Category-page browser sections — enough to differentiate this section's background tone from the quiet strip above it without competing with the dense card row.

**CTA behaviour:** no section-level CTA — each card is its own destination; a small "View All Trending" text-link at the rail's top-right corner (not a button) leads to a Collection page once Trending is also promoted to its own dynamic Collection (architecture §16.1/§21.1.2) — until that Collection exists, this link is simply omitted rather than pointing nowhere.

**Component reuse:** new `GalleryRail` + `GalleryRailCard` (already specified as reserved-but-not-built in architecture §3/§21.3) — this is the first of several sections that consume them. `GalleryRailCard` is a denser variant of `GalleryCard`'s `standard` variant (smaller fixed height, tighter meta row), not a third bespoke card design.

**Data source:** `lib/content/gallery/recommendations.ts`'s scoring function (architecture §18), invoked with a Freshness-only weight profile for Phase 1, reading from `galleryProjects`.

---

## 5. Section 4 — Editor's Picks

**Purpose:** the page's first true editorial *spread* — communicates "a human curated this," the single most important feeling separating Luxora's gallery from an algorithmic Pinterest board.

**User psychology:** editorial endorsement raises perceived quality without needing salesy language — "Editor's Picks" reads as taste, not promotion, and gives visitors permission to trust a handful of designs without browsing everything themselves.

**Content:** a curated Collection (architecture §16.1) of 5–7 hand-picked designs, editor-ordered (not algorithmically sorted) — one large featured design plus a small supporting set, with a short editorial framing line (e.g. "Hand-picked by the Luxora design team this month") that no other rail on the page uses, reinforcing this is the one manually-curated voice on the page.

**Layout:** **editorial split layout** — one large featured card (≈70% width) paired with a vertical stack of 2 smaller side cards (≈30% width), directly reusing the proven `ServiceGalleryShowcase` "featured + side stack" composition already live elsewhere in V4, rather than inventing a new asymmetric grid from scratch.

**Desktop behaviour:** the 70/30 split renders side-by-side exactly as it already does in `ServiceGalleryShowcase`; the large card carries full meta detail (location, area, style, budget, completion — the existing `GalleryCard` `featured` variant's meta row), the two side cards carry only title + one or two meta fields, creating visual hierarchy through information density, not just size.

**Mobile behaviour:** stacks vertically — large featured card first, full width, then the two side cards beneath at reduced height — same responsive collapse already proven in `ServiceGalleryShowcase`.

**Animations:** the large featured card's image gets the slow, more dramatic zoom-on-hover already defined on `GalleryCard`'s `featured` variant (1100ms ease-out scale); the side cards use the snappier `standard`-variant hover (700ms). This intentional speed mismatch is itself the "feels different" cue distinguishing a hero card from a supporting card.

**Background patterns:** `LuxuryContour` at low opacity, offset to one side, behind the split layout — the same pattern/opacity already used behind `ServiceGalleryShowcase`, kept consistent so editorial spreads across the whole V4 site share one background signature.

**CTA behaviour:** a single, quiet text-link CTA beneath the spread ("See the Full Collection") routing to this Collection's own page (`/gallery/collections/editors-choice`) — not a button, since the section has already done its conversion work by surfacing the designs themselves; the link is for the visitor who wants *more of the same curation*, not a sales action.

**Component reuse:** the large-card + side-stack composition is lifted from `ServiceGalleryShowcase`'s `CollectionSlide` internals, re-pointed at `GalleryCard` (`featured` and `standard` variants) instead of the Service vertical's own card markup — genuinely "reuse the pattern, not fork new markup," per the brief's component strategy.

**Data source:** a curated `GalleryCollection` record (architecture §16.2) — `kind: 'curated'`, `projectSlugs: string[]` in editor-controlled order — read via a new `getGalleryCollection('editors-choice')` accessor in `lib/content/gallery/collections.ts`.

---

## 6. Section 5 — Browse by Style

**Purpose:** the second navigational index on the page — Style is the architecture's secondary taxonomy axis (architecture §8) and earns its own dedicated entry point, distinct from Category, for visitors whose intent is aesthetic ("I want Scandinavian," not "I want a bedroom").

**User psychology:** style-led browsing is how a meaningfully large share of interior-inspiration searches actually start ("minimalist living room," "Japandi bedroom") — this section validates that mental model directly rather than forcing a style-minded visitor to first pick a room.

**Content:** the full frozen style set (architecture §8: Contemporary, Scandinavian, Luxury, Classic, Minimalist, Industrial, Modern, Traditional) — shown as a complete index, same "show everything, no truncation" approach as Browse by Room, since the set is small.

**Layout:** **asymmetrical grid** — explicitly *not* a repeat of the Browse by Room strip's uniform circular tiles. Styles render as a mixed-size mosaic (2–3 larger "feature" style tiles for the styles with the most designs, surrounded by smaller tiles for the rest) — a magazine-index look, reinforcing that this section is about visual mood, where Browse by Room was about quick utility.

**Desktop behaviour:** CSS-grid-driven mosaic with deliberate size variation (e.g. a 2×2 tile for the top style, 1×1 tiles for the rest) — sized so the grid always resolves cleanly regardless of exact style count (architecture-conscious: new styles can be added per the §8 promotion rule without breaking the mosaic math, since tile sizing is rule-based — "top N styles by design count get the large slot" — not hardcoded per style).

**Mobile behaviour:** the mosaic collapses to a single column of uniform-height cards in descending design-count order — asymmetry is a desktop-only flourish; mobile prioritizes scannability over visual variety here, matching the general "single column, image-size over density" rule already set in the architecture's mobile-UX section (architecture §13).

**Animations:** a soft cross-fade/scale-in on scroll-into-view per tile, slightly slower stagger than Browse by Room's (this section should feel more "considered," less "snappy utility").

**Background patterns:** `LuxuryMarble`, used nowhere else on this page — a deliberate choice to give the Style section its own background identity (Style is about material/aesthetic mood, and `LuxuryMarble` is the one pattern in the library that visually rhymes with "material," at the same restrained opacity discipline as everywhere else).

**CTA behaviour:** each tile is its own destination link to `/gallery/style/[style]`; no section-level CTA needed for the same reason as Browse by Room.

**Component reuse:** a new `GalleryStyleMosaic` (+ reusing `GalleryCategoryTile`'s underlying image/label primitive at variable sizes) — the only genuinely new layout component this section needs is the mosaic grid container; the tiles themselves are a sizing variant of the same primitive built for Browse by Room, not a new card design.

**Data source:** `lib/content/gallery/styles.ts` (`GalleryStyle[]`, architecture §5) joined against a per-style project count computed from `galleryProjects` to drive the "which styles get the large slot" sizing rule.

---

## 7. Section 6 — Luxury Collections

**Purpose:** the page's second, larger editorial *moment* — Architectural Digest-style — showcasing Collections (architecture §16) as Luxora's primary storytelling lever, distinct in tone from the more catalog-like Editor's Picks spread above.

**User psychology:** this is the section that should feel the most "premium magazine, not website" — slower pacing, fewer items, bigger photography — rewarding visitors who've scrolled this far with the richest visual payoff on the page before the utility-driven sections below.

**Content:** 2–4 curated Collections rendered as full editorial features (not a rail of many small items) — e.g. "Luxury Collection," "Festival Collection" (when in-season, governed by the `isActive`/`expiresAt` mechanism, architecture §16.2/16.5), "Homes Under 20 Lakhs." Each gets its own full-width feature block, not a shared card grid.

**Layout:** **magazine layout** — full-width image block per Collection with overlaid or adjacent editorial text (Collection name, one-line description, a 3–4 image cluster suggesting "there's more inside") — the heaviest, most photography-forward layout on the page, deliberately different from every grid/rail above it.

**Desktop behaviour:** each Collection feature alternates left/right image-vs-text placement (Collection 1: text-left/image-right, Collection 2: image-left/text-right, etc.) — classic magazine-spread alternation, ensuring that even with only 2–4 items, the section doesn't feel like a repeating template.

**Mobile behaviour:** every feature collapses to image-on-top, text-below regardless of its desktop left/right orientation — alternation is a desktop-only device, mobile always resolves to the single most legible order (image context before text, matching how a visitor scans a vertical feed).

**Animations:** parallax-lite image movement on scroll (image moves slightly slower than scroll speed, a restrained magazine-editorial effect — not a heavy 3D parallax), applied only here, nowhere else on the page — reinforcing this section's distinct, premium pacing.

**Background patterns:** `LuxuryBlueprint` at low density — chosen deliberately because it's the most "architectural plan" feeling pattern in the library, and this is the section closest in spirit to Luxora's actual design craft (versus the more abstract `LuxuryHalo`/`LuxuryContour` used in lighter sections).

**CTA behaviour:** each Collection feature carries one clear text/button CTA into its full Collection page (`/gallery/collections/[collection]`) — this is the one section on the page where a visible button-style CTA (not just a text-link) is appropriate per feature, because each Collection feature is effectively its own mini-landing moment, not a card in a row.

**Component reuse:** new `GalleryCollectionFeature` component — the one section that doesn't have a close existing analog in V4 (the closest, `ServiceGalleryShowcase`, is rail/carousel-shaped, not alternating-magazine-spread-shaped) and is the second genuinely new component this page needs (see Section 12). Built from existing primitives (image treatment, gradient overlays, typography scale) already established across `GalleryHero`/`GalleryCard`/`ServiceGalleryShowcase` — new *composition*, no new visual language.

**Data source:** a small, explicit list of curated `GalleryCollection` slugs selected for Home placement (e.g. `['luxury-collection', 'homes-under-20-lakhs']`), read via `getGalleryCollection()` — which Collections appear here is exactly the kind of "ordered rail manifest" entry described in architecture §21.2, just rendered as full features instead of a horizontal rail.

---

## 8. Section 7 — Recently Added

**Purpose:** a second signal-backed dynamic rail (architecture §21.1.2), this one explicitly about recency rather than popularity — proves the gallery is actively growing, which matters for both visitor trust ("this firm is currently working") and SEO (fresh content signals).

**User psychology:** deliberately the quietest rail on the page — recency-seeking visitors (returning visitors checking "what's new since last time") are a small, specific audience; this section should be easy to skim past for everyone else, not compete for attention with Trending or the Collections features above it.

**Content:** the most recently published 8–12 designs by `publishedAt`, newest first — no editorial selection, purely chronological, and explicitly labeled as such ("Recently Added to the Gallery") so it reads as transparent activity, not curation.

**Layout:** horizontal slider again (same archetype as Trending), but **visually quieter** — smaller card height, no large-card variant mixed in, tighter meta (date-forward: "Added this week" style micro-copy rather than full meta rows) — the deliberate "feels different" lever here is *restraint*, not a new layout shape, which is itself a valid way to vary rhythm (not every section needs a structurally different layout; some need a structurally identical layout dialed down, so the page doesn't feel like it's straining for novelty everywhere).

**Desktop behaviour:** same arrow-controlled slider mechanism as Trending, smaller card width so more items are visible at once (this section is about breadth-at-a-glance, not depth-per-item).

**Mobile behaviour:** same scroll-snap mechanism as Trending, scaled down.

**Animations:** minimal — a simple fade-in on scroll-into-view, no stagger, no hover-zoom drama beyond the standard `GalleryCard` hover — consistent with this section's "quiet" brief.

**Background patterns:** plain section background color (`luxoraColors.warmCream`/`ivory`, matching the page's base tone) with `LuxuryGrain` only, no halo/contour/marble/blueprint — the only section besides Browse by Room with zero "feature" background pattern, by design, to keep it visually subordinate to the sections around it.

**CTA behaviour:** none beyond the cards themselves — recency doesn't need a CTA, it needs to be glanceable and moved past.

**Component reuse:** same `GalleryRail`/`GalleryRailCard` pair introduced for Trending (Section 4) — this section is proof that the rail component genuinely generalizes (different data, different tone, same component), not a one-off.

**Data source:** `galleryProjects` sorted by `publishedAt` descending, sliced to the most recent N — no new data file, a pure sort/slice over the existing array (or, once a dynamic Collection exists for it, `lib/content/gallery/collections.ts`'s rule evaluator per architecture §16.1).

---

## 9. Section 8 — Browse by Budget

**Purpose:** the most utilitarian section on the page — a practical bridge between the editorial upper half of Home and the exhaustive Full Gallery Browser below, for visitors whose intent has shifted from "inspire me" to "show me what's realistic for my budget."

**User psychology:** budget is a sensitive, practical filter, not an inspirational one — over-designing this section (large imagery, editorial copy) would feel tonally wrong, almost like a sales upsell. The right psychology here is calm, clear, non-judgmental information design — "here's how to narrow this by what you can spend," nothing more.

**Content:** the fixed budget buckets already frozen in the architecture (`BUDGET_BUCKETS`, architecture §7: Under ₹15L, ₹15L–₹30L, ₹30L–₹50L, ₹50L–₹75L, ₹75L+) — five entries, shown in full.

**Layout:** **compact chip/card row** — the smallest, plainest card treatment on the page, closer to a filter control than a content card (no full-bleed photography per chip; a small representative thumbnail at most, label-forward).

**Desktop behaviour:** a simple five-item row, evenly spaced, no slider mechanism needed (five items always fit) — deliberately the *least* dynamic section on the page, reinforcing its utility framing through sheer plainness.

**Mobile behaviour:** wraps to two rows of chips rather than introducing a sixth scroll-mechanism on the page — Budget is the one section where "everything fits without scrolling tricks" is itself the right mobile behavior, since five short labels don't need a slider.

**Animations:** minimal — simple opacity fade-in, no stagger, no hover-zoom (these aren't photography cards, hover should just lift slightly and brighten the border, the way a clean filter chip would, not the dramatic image-zoom language used everywhere else).

**Background patterns:** none beyond the page's flat base tone — explicitly the one section using zero pattern from the `background` library, completing the "quietest section" brief.

**CTA behaviour:** each chip's tap target navigates to the Full Gallery Browser section below (Section 9) with that budget bucket pre-applied as a filter (an in-page anchor scroll + filter-state pre-fill, since Budget is a non-routing facet per architecture §8 — it filters within `GalleryBrowser`, it never gets its own URL page) — this is the one section on Home whose "CTA" is a same-page filter hand-off rather than a navigation to a new route, and that distinction should be visually legible (e.g. a subtle "↓" affordance rather than the external-link arrow used on category/style tiles).

**Component reuse:** a new, intentionally minimal `GalleryBudgetChipRow` — small enough that it could arguably reuse `GalleryFilterBar`'s existing budget-bucket chip rendering directly rather than building a new component; the implementer should default to extracting and reusing `GalleryFilterBar`'s bucket-chip sub-markup here rather than duplicating it, since the visual treatment should be identical to what the same chips look like inside the filter bar below.

**Data source:** `BUDGET_BUCKETS` (`lib/content/gallery/facets.ts`) — no new data, this section is a navigational skin on data that already exists purely for filtering.

---

## 10. Section 9 — Full Gallery Browser

**Purpose:** the exhaustive, no-curation "browse everything" tool — the capstone for visitors who've either decided what they want (via the rails/indexes above) or who want full control rather than editorial guidance. This is also the only section on the page that must remain fast at 1,000+ designs, since it's the one rendering an unbounded result set.

**User psychology:** by the time a visitor reaches this section, they've either been satisfied by something above (and won't reach this point) or are a "see everything, filter it myself" visitor — the UI here should feel powerful and complete, not playful; it's the inspiration-library equivalent of a card catalog.

**Content:** the entire `galleryProjects` set, filterable/searchable exactly as today, with any pre-applied filter state arriving from an in-page hand-off (Browse by Budget, Section 9) or from a deep link.

**Layout:** existing `GalleryBrowser` composition (search bar → filter bar/drawer → grid → empty state) — unchanged in mechanism. This section is intentionally the one place on the page that *is* a plain grid, because that's the correct tool for exhaustive browsing — the brief's "avoid making every section another card grid" applies to the page as a whole, not to this specific section, whose entire job is being the grid.

**Desktop behaviour:** unchanged from the current implementation — inline `GalleryFilterBar`, multi-column `GalleryGrid`.

**Mobile behaviour:** unchanged — `GalleryFilterDrawer` instead of the inline bar, single-column grid (architecture §13).

**Animations:** none beyond what already exists (card hover/entry) — this section should feel stable and predictable, not performance-risky; no scroll-reveal stagger across potentially hundreds of grid items (staggering a 1,000-item grid is both a poor interaction and a real performance risk).

**Background patterns:** the existing `LuxuryHalo` + `LuxuryGrain` combination already used on the current Home implementation's browser section — unchanged, since this section's visual job is to stay out of the way of the grid itself.

**CTA behaviour:** none beyond the existing per-card navigation and the existing empty-state "clear filters" action (architecture §7) — this section doesn't need a CTA of its own, it *is* the destination.

**Component reuse:** 100% reuse — `GalleryBrowser`, `GalleryFilterBar`, `GalleryFilterDrawer`, `GallerySearchBar`, `GalleryGrid`, `GalleryCard`, `GalleryEmptyState` — no new component. This is the section where "reuse wherever possible" is most literal: nothing here changes from today's implementation except its position on the page (now ninth, not first) and that it may now arrive with a pre-filled filter state from Section 9 above.

**Performance note (binding for implementation, not just a suggestion):** this is the one section that must be designed assuming virtualization/lazy-loading lands eventually (per the brief's performance requirement) — concretely, that means: keep `GalleryGrid` rendering a windowed/paginated slice rather than the full array once the catalog crosses the thresholds already defined in architecture §12 (Section 6's search-infra trigger and Section 11's image-CDN trigger apply directly here, since this section is where every one of those 1,000+ images could otherwise render at once). No virtualization is implemented now — only that this section's data-fetching contract (`projects: GalleryProject[]` in, filtered/sliced out) must not assume the full array is small forever.

**Data source:** `galleryProjects` (full set) — unchanged from today.

---

## 11. Section 10 — Consultation CTA

**Purpose:** the single conversion exit point that the entire rest of the page deliberately avoided being — per architecture §1.1/§10, every Gallery page must offer a path out to a lead action, and Home is no exception, but it must appear exactly once, at the natural end of the browsing journey, not interrupt it earlier.

**User psychology:** by this point a visitor has either found something they like (in which case they likely already clicked into a Detail page and isn't seeing this section at all) or has browsed extensively without committing — this section's job is to catch that second visitor with a low-friction, low-pressure offer, not a hard sell.

**Content:** reuses the existing `GalleryCtaBand` copy pattern — a short headline + two paths ("Book Free Consultation," "Get Instant Budget Estimate") exactly as already used on Category/Detail pages, with Home-appropriate copy (e.g. "Found Something You Love?" rather than the Detail page's project-specific framing).

**Layout:** unchanged from the existing `GalleryCtaBand` — full-width band, centered content, two CTA actions.

**Desktop / Mobile behaviour:** unchanged — `GalleryCtaBand` is already responsive.

**Animations:** unchanged — standard scroll-reveal fade, no new treatment needed; this section shouldn't try to be visually exciting, it should feel like a calm, confident close.

**Background patterns:** unchanged from existing `GalleryCtaBand` usage elsewhere.

**CTA behaviour:** the two existing actions, unchanged in mechanism — this is the one section whose entire purpose is its CTA.

**Component reuse:** 100% reuse — `GalleryCtaBand`, exactly as it exists today, with Home-specific `title`/`description` props (the component already supports per-page copy overrides, as seen on the Detail page's usage).

**Data source:** static copy, no project data.

---

## 12. Section 11 — Footer

**Purpose:** the site-wide close — not a Gallery-specific concern at all.

**User psychology:** N/A — the footer is wayfinding/legal/secondary-navigation territory, not part of the inspiration-library experience.

**Content / Layout / Desktop / Mobile / Animations / Background / CTA:** unchanged from the rest of the V4 site — this is `ServicePageShell`'s shared footer, not a Gallery Home concern. Listing it here only to confirm explicitly: **no Gallery-specific footer variant is needed or should be built.**

**Component reuse:** 100% — `ServicePageShell`.

**Data source:** N/A.

---

## 13. New Components Required (Summary)

Per the brief's "only introduce new components when absolutely necessary" — this is the complete list, and it is short relative to the number of sections (11 sections, 5 new components, all of them either thin compositions of existing primitives or already-reserved-but-unbuilt per the architecture):

| New component | Used in | Why it's genuinely new |
|---|---|---|
| `GalleryHomeHero` | §2 Hero | Home needs a taller, breadcrumb-less variant `GalleryHero` doesn't currently support |
| `GalleryCategoryStrip` / `GalleryCategoryTile` | §3 Browse by Room | No existing component renders categories as a navigational tile strip (the filter bar's category pills are a different control type) |
| `GalleryRail` / `GalleryRailCard` | §4 Trending, §8 Recently Added | Already specified as reserved in architecture §3/§21.3 — this page is their first real consumer |
| `GalleryStyleMosaic` | §6 Browse by Style | No existing component supports variable-size grid tiles |
| `GalleryCollectionFeature` | §7 Luxury Collections | No existing component supports the alternating image/text magazine-spread layout |
| `GalleryBudgetChipRow` | §9 Browse by Budget | Recommended to be a thin extraction of `GalleryFilterBar`'s existing bucket-chip markup, not new visual design |

Everything else on the page — `GalleryCard`, `GalleryBrowser`, `GalleryFilterBar`/`Drawer`, `GallerySearchBar`, `GalleryGrid`, `GalleryEmptyState`, `GalleryCtaBand`, `GalleryBreadcrumbJsonLd`, `ServicePageShell`, the entire `background` pattern library — is reused exactly as it exists today.

---

## 14. Background Pattern Allocation (Summary)

Per the brief's "use the existing Luxury Pattern Library only, backgrounds support photography, never compete" — explicit allocation so no two adjacent sections share a pattern signature, and so the rule is auditable at implementation time:

| Section | Pattern | Notes |
|---|---|---|
| Hero | None (gradient overlay only) | Photograph this large needs zero competing texture |
| Browse by Room | `LuxuryGrain`, minimal | Quietest section, no feature pattern |
| Trending Designs | `LuxuryHalo`, one corner, low opacity | Differentiates from the strip above without competing with dense cards |
| Editor's Picks | `LuxuryContour`, offset, low opacity | Matches the existing `ServiceGalleryShowcase` editorial signature |
| Browse by Style | `LuxuryMarble` | Material/mood association, unique to this section |
| Luxury Collections | `LuxuryBlueprint`, low density | Architectural/craft association for the page's biggest editorial moment |
| Recently Added | `LuxuryGrain` only | Deliberately as quiet as Browse by Room |
| Browse by Budget | None | The one fully flat section — utility, not mood |
| Full Gallery Browser | `LuxuryHalo` + `LuxuryGrain` (unchanged from today) | Stay out of the grid's way |
| Consultation CTA | Unchanged existing `GalleryCtaBand` treatment | — |
| Footer | N/A | Shared site footer |

No section repeats another's *exact* pattern-plus-position combination back-to-back, satisfying the "every rail should feel slightly different" directive at the background layer, not just the layout layer.

---

## 15. Open Implementation Notes (not decisions — flagged for the build phase)

- **Rail manifest:** Sections 4, 7, and 8 (Trending, Luxury Collections, Recently Added) are all instances of the ordered rail-manifest concept already specified in architecture §21.2. The implementer should build Home's section order as data (a manifest array) wherever feasible, not as hardcoded JSX order, so that re-ordering or retiring a rail later (e.g. swapping in a seasonal Collection feature) is a content change, matching the architecture's intent.
- **Collections referenced above** ("Editor's Choice," "Luxury Collection," "Homes Under 20 Lakhs") are illustrative — actual Collection records and their `isActive` scheduling are a content-authoring task per architecture §16/§24, not specified by this document.
- **Phase 1 data gaps:** Trending (Section 4) and any future Popularity-weighted rail will run on Freshness-only signals until Save/View tracking exists (architecture §18.3, §22) — this is expected, not a placeholder to "fix," and requires no special-case logic, only that the scoring function's weight config already supports zero-weighted terms.
