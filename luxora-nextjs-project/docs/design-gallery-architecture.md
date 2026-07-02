# Luxora Design Gallery — Master Architecture (Frozen)

Status: **Architecture freeze** — blueprint only, no implementation in this document.
Scope: **Design Gallery only.** Portfolio (completed projects, case studies, testimonials) is a separate product and is referenced here only in Section 15 to draw the boundary. Gallery is the inspiration + discovery + SEO product; Portfolio is the trust + case-study + conversion product. They never share schema, taxonomy, or URL namespace — restated as a closing principle in Section 25 and not to be revisited casually.
Base path: `/luxury-v4/gallery` (extends the existing V4 implementation already live at this path; this document is the target shape, not a rewrite from zero).

**Document history:** v1 established Sections 0–15 (core IA, routing, data model, search/filter, SEO, mobile, Gallery/Portfolio boundary). v2 (this revision) adds Sections 16–25: Collections, Tags, the Recommendation Engine, Design Identity, Color & Material metadata, Editorial Discovery on Home, reserved architecture for future features, the content growth roadmap, content governance, and a closing set of architecture principles. v1 sections are amended only where a v2 addition requires it (noted inline); nothing in v1 is reversed.

---

## 0. Product Definition

| | Design Gallery | Portfolio |
|---|---|---|
| Purpose | Inspiration, SEO acquisition, lead capture | Proof of delivery, credibility, conversion at decision stage |
| Content unit | "Design" — a styled room/space, may be aspirational or built | "Project" — a fully delivered, client-attributed engagement |
| Primary metric | Organic sessions, filter engagement, lead form starts | Conversion rate, time-on-case-study, consultation bookings |
| Funnel stage | Top-of-funnel (awareness, research) | Mid/bottom-of-funnel (trust, decision) |
| Identity disclosure | Client identity optional/anonymized | Client identity, testimonial, named case study |

Everything below is scoped to the Gallery. Where a decision touches Portfolio, it is flagged explicitly in Section 15 and nowhere else.

---

## 1. Information Architecture

### 1.1 User journey

There are three distinct entry intents, and the architecture must serve all three without forcing one into another:

1. **Browse intent** — "show me what's possible." Enters at Gallery Home, scans categories, free-browses the grid. No filter applied yet.
2. **Search intent** — "I want X style of Y room." Enters via organic search directly onto a Category or Style page (highest-value SEO entry point), or types into on-site search from Home.
3. **Validation intent** — "I already saw a design (Instagram, WhatsApp share, Google Images) and want to confirm it's real / get pricing." Enters directly onto a Single Design page via a shared link.

Journey shape (linear, not a strict funnel — any node can be an entry point from organic search):

```
Entry (organic / nav / share link)
   │
   ├─→ Gallery Home ──→ Category Page ──→ Single Design Page ──→ Lead action
   │         │                │                   │
   │         └────────→ Style Page ──────→ Single Design Page ──→ Lead action
   │                          │
   └─────────────────→ Single Design Page (direct landing) ──→ Related Designs Rail ──→ Lead action
```

Lead actions available at every terminal node: "Book Free Consultation," "Get Instant Budget Estimate," "Save Design" (Phase 2+, see Section 12). The CTA band already present on Home/Category/Detail pages is the mechanism; it must appear on every page type, not only Detail.

### 1.2 Navigation flow

- **Primary nav entry:** "Gallery" in the main site nav, linking to Gallery Home. No mega-menu fan-out from the primary nav — categories are discovered inside the Gallery, not duplicated in global nav, to keep the global nav stable as the taxonomy grows.
- **In-gallery navigation is breadcrumb-driven**, not sidebar-driven. Every page below Home carries a breadcrumb trail (already implemented via `GalleryBreadcrumbJsonLd` + `ServiceBreadcrumb`): `Home → Gallery → [Category] → [Design]`, with Style pages inserting as `Home → Gallery → Style: [Style]`.
- **Lateral movement** happens through three mechanisms, not nav links: the filter bar (cross-category, cross-style), the Related Designs rail (same category/style, different design), and category/style chips surfaced on the Detail page header.
- Gallery Home and every Category/Style page share one filter+search surface (`GalleryBrowser`), so navigation *is* filtering — there is no separate "sitemap-style" browse page.

### 1.3 Page hierarchy

```
Gallery Home                          (/gallery)
├── Category Page                     (/gallery/[category])
│   └── Single Design Page            (/gallery/[category]/[slug])
├── Style Page                        (/gallery/style/[style])
│   └── Single Design Page            (same canonical URL as above — see §2.4)
├── Collections Hub                   (/gallery/collections — see §16)
│   └── Collection Page                (/gallery/collections/[collection])
│       └── Single Design Page         (same canonical URL as above — see §2.4)
└── Search results (no own URL — see §6)
```

Single Design pages have exactly one canonical parent (their primary category), even though they are reachable from Category, Style, and Collection listings alike. This avoids duplicate-content ambiguity (see Section 9). Category, Style, and Collections are three independent discovery systems over the same underlying designs — none is a subset or replacement of another (see Section 16). Tags are a fourth, non-routing discovery layer that feeds all three but never gets its own page (see Section 17).

---

## 2. URL Structure

All URLs are lowercase, hyphenated, English, no trailing slash, no query params in the canonical form.

### 2.1 Gallery Home
```
/luxury-v4/gallery
```

### 2.2 Category pages
```
/luxury-v4/gallery/[category]
```
`[category]` = the existing `GalleryCategory.slug` (`living-room`, `bedroom`, `kitchen`, `wardrobes`, `full-home`, `office`). One static route per taxonomy entry — already implemented via `generateStaticParams` over `galleryCategories`.

### 2.3 Style pages (new taxonomy, promoted from filter facet to indexable route)
```
/luxury-v4/gallery/style/[style]
```
`[style]` = a slugified version of `GalleryProjectMeta.style` (`contemporary`, `scandinavian`, `luxury`, `classic`, `minimalist`, `industrial`, …). Namespaced under `/style/` rather than flattened to `/gallery/[style]` to avoid a routing collision with category slugs and to make the taxonomy axis explicit in the URL (and to search engines).

Style is a **cross-cutting facet**, not a sub-category of a room — a Style page lists designs across every room category that share that style. This is why it gets its own top-level branch rather than nesting under category.

### 2.4 Single design pages
```
/luxury-v4/gallery/[category]/[slug]
```
Canonical, single URL per design, parented under its **primary category** (`GalleryProject.category`), matching the current implementation. A design that also matches a style never gets a second URL under `/gallery/style/[style]/[slug]` — the Style page links to the same canonical category-parented URL. `secondaryCategories` (already reserved in the data model) are surfaced as cross-links on the page, not as alternate canonical paths.

### 2.5 Collections routes (promoted from "reserved" to a designed system — see Section 16)
```
/luxury-v4/gallery/collections                 (Collections hub — index of all live collections)
/luxury-v4/gallery/collections/[collection]     (single Collection page)
```
Collections is a real, designed discovery system as of this revision, not merely a reserved field — see Section 16 for its full data model, navigation, SEO, and rollout gating. It does not replace Category or Style; all three exist permanently side by side.

### 2.6 Reserved / explicitly out of scope at Phase 1
- `/luxury-v4/gallery/search` — no dedicated route; search is a client-side filter state on Home (see Section 6).
- `/luxury-v4/gallery/tag/[tag]` — **never built, by design.** Tags are explicitly not a routing axis (Section 17); a tag that earns enough demand is promoted to a Collection, not to a fourth route type.
- `/luxury-v4/gallery/[category]/[style]` combined static routes — deliberately not built as a full cartesian product (see Section 12); only a curated subset is promoted to static routes when search data justifies it.

---

## 3. Folder Structure

Extends the existing V4 structure; no new top-level conventions introduced.

```
app/luxury-v4/gallery/
├── page.tsx                          # Gallery Home (rail-based — see §21)
├── [category]/
│   ├── page.tsx                      # Category page
│   └── [slug]/
│       └── page.tsx                  # Single design page
├── style/
│   └── [style]/
│       └── page.tsx                  # Style page
└── collections/
    ├── page.tsx                      # Collections hub (new — see §16)
    └── [collection]/
        └── page.tsx                  # Collection page (new — see §16)

components/v4/gallery/
├── index.ts                          # barrel export (existing pattern, extend in place)
├── GalleryHero.tsx
├── GalleryBrowser.tsx                # owns filter state + grid composition
├── GalleryFilterBar.tsx
├── GalleryFilterDrawer.tsx           # mobile filter surface
├── GallerySearchBar.tsx
├── GalleryGrid.tsx
├── GalleryCard.tsx
├── GalleryEmptyState.tsx
├── GalleryDetailHeader.tsx
├── GalleryImageGrid.tsx
├── GalleryLightbox.tsx
├── RelatedDesignsRail.tsx            # extended to consume the recommendation model, §18
├── GalleryCtaBand.tsx
├── GalleryMetaDot.tsx
├── GalleryBreadcrumbJsonLd.tsx
├── StyleChip.tsx                     # reusable style badge, used on cards + detail + style page header
├── StylePageHeader.tsx               # Style page equivalent of Category hero, reuses GalleryHero internally
├── TagChip.tsx                       # new — pre-filled filter link chip, never a page link (§17)
├── CollectionPageHeader.tsx          # new — Collection page equivalent of Category/Style hero
├── GalleryRail.tsx                   # new — horizontal-scroll rail shell for Home (§21)
└── GalleryRailCard.tsx               # new — denser card variant for rails (§21)

lib/content/gallery/
├── types.ts                          # data contracts (extend, don't fork) — adds designId, tags, colorMaterial (§19, §17, §20)
├── categories.ts                     # category taxonomy + getGalleryCategory()
├── styles.ts                         # style taxonomy + getGalleryStyle(), mirrors categories.ts
├── collections.ts                    # new — collection taxonomy + getGalleryCollection(), curated + dynamic (§16)
├── tags.ts                           # new — canonical tag dictionary + getGalleryTag() (§17)
├── facets.ts                         # filter facets, buckets, filterProjects()
├── projects.ts                       # project records + accessor functions
├── search.ts                         # search indexing/ranking, isolated from facets.ts (see §6)
├── recommendations.ts                # new — weighted scoring model + weight config (§18)
└── homeManifest.ts                   # new — ordered rail manifest consumed by Gallery Home (§21)
```

No new top-level folder is introduced. Everything lives inside the existing `gallery/` sub-trees of `app`, `components`, and `lib/content` — the same three-tree pattern (route / presentation / content) already established by the V4 `services` vertical, kept consistent so the codebase has one mental model for "a content vertical," not two.

---

## 4. Component Architecture

Layering, in order of composition (already the shape of the existing code — formalized here):

1. **Shell layer** — `ServicePageShell` (shared chrome: nav, footer, background canvas). Reused as-is; Gallery does not get its own shell.
2. **Page-level layout components** — `GalleryHero` (Home/Category/Style headers), `GalleryDetailHeader` (Detail page header). These own layout + copy slots, not data fetching.
3. **Orchestration component** — `GalleryBrowser`. Single owner of filter/search/URL-state for any listing page (Home, Category, Style). Receives a pre-scoped project list + a "locked facet" (category or style) and renders search bar, filter bar/drawer, grid, and empty state beneath it. This is the component that makes Category and Style pages structurally identical aside from which facet is locked.
4. **Presentation components** — `GalleryCard`, `GalleryGrid`, `GalleryMetaDot`, `StyleChip`, `GalleryImageGrid`, `GalleryLightbox`. Pure, data-in/markup-out, no fetching, no filter logic.
5. **Cross-sell / conversion components** — `RelatedDesignsRail`, `GalleryCtaBand`. Reused verbatim across Category, Style, and Detail pages.
6. **SEO/structured-data components** — `GalleryBreadcrumbJsonLd`. One per page type, parameterized by breadcrumb items only.

Rule: **only `GalleryBrowser` is allowed to hold filter/search state.** Category, Style, and Home pages are thin — they fetch/scope the project list server-side and pass a "locked facet" prop into `GalleryBrowser`; they must not duplicate filtering logic, matching how `lockedCategory` already works on the Category page today, extended with a `lockedStyle` prop for the new Style page.

---

## 5. Data Models

Extends `lib/content/gallery/types.ts` in place — no parallel schema.

**`GalleryProject`** (existing, additive only):
- Add `styleSlug: string` alongside the existing free-text `meta.style`, so style has a stable routing key independent of display label changes. (`meta.style` stays as the human-readable label shown in UI/SEO copy; `styleSlug` is the only thing the router and facet matcher touch.)
- Everything else in the current contract (`id`, `slug`, `category`, `secondaryCategories`, `collectionSlugs`, `coverImage`, `images`, `meta`, `description`, `story`, `featured`, `beforeAfter`, `aiDesignerSeed`, `shoppableItems`, `publishedAt`, `updatedAt`, `seo`) is retained unchanged. The reserved-for-future fields stay reserved — this document does not pull them forward.

**`GalleryStyle`** (new, mirrors `GalleryCategory` exactly):
```
slug, label, eyebrow, description, heroImage, heroImageAlt
```
Lives in `lib/content/gallery/styles.ts` with a `getGalleryStyle(slug)` accessor, same shape as `categories.ts` today.

**`GalleryCategory`** — unchanged.

**`GalleryFilterFacets` / `GalleryFilterState`** — unchanged in shape; `buildFacets()` already derives `styles: string[]` from project data, which becomes the join key to `GalleryStyle.slug` once style is slugified.

**Relationship model (conceptual, no ORM — content is static/typed data, not a database in Phase 1):**
```
GalleryCategory (1) ──< (N) GalleryProject >── (N) GalleryStyle
                                  │
                                  └─ secondaryCategories[] → GalleryCategory (N)
                                  └─ collectionSlugs[] → Collection (N)   [reserved]
```
Category is a strict 1:N parent (every project has exactly one primary category — this is what makes the canonical URL stable). Style is M:N (a project has one primary `styleSlug` for routing/SEO purposes, but can carry secondary style tags in `meta` for filtering/search only, not for canonical URLs).

**v2 additions to `GalleryProject`** (additive only, all detailed in their own sections — listed here so Section 5 stays the single index of the full record shape):
- `designId: string` — permanent identifier, e.g. `LX-DG-000128`, decoupled from `slug`. See Section 19.
- `tags: string[]` — unbounded, many-to-many, non-routing. See Section 17.
- `colorMaterial?: GalleryColorMaterial` — optional nested metadata (colors, finishes, lighting style). See Section 20.
- `collectionSlugs?: string[]` — already reserved pre-v2; now has a real consumer (Section 16) for curated-collection membership. Dynamic collections never write to this field.

**Updated relationship model:**
```
GalleryCategory (1) ──< (N) GalleryProject >── (N) GalleryStyle
                                  │         >── (N) GalleryCollection   [§16, M:N via collectionSlugs]
                                  │         >── (N) GalleryTag          [§17, M:N via tags, non-routing]
                                  │
                                  └─ secondaryCategories[] → GalleryCategory (N)
```
Four discovery axes now exist over the same project pool — Category (1:N, routing, frozen-governance), Style (M:N in practice but one routing-primary, slow-growth-governance), Collections (M:N, editorial, flexible-governance), Tags (M:N, descriptive, low-governance, never routing). None is a subset of another; a project always has exactly one Category, typically one primary Style, zero-or-more Collections, and several Tags.

---

## 6. Search Architecture

Phase 1 (current scale, ≤ a few hundred designs): **client-side, in-memory search**, isolated into its own module (`lib/content/gallery/search.ts`) rather than living inside `facets.ts`, because search ranking logic and facet-matching logic have different failure modes and will diverge as the catalog grows.

- **Index fields:** `title`, `category` label, `styleSlug`/style label, `meta.city`, `meta.location`, `description`. (Matches the current `filterProjects` haystack, formalized into a dedicated indexer.)
- **Matching:** substring match on a normalized (lowercased, accent-stripped) haystack — sufficient at current scale, no fuzzy/typo-tolerance needed yet.
- **State home:** search query lives in the URL as `?q=` (already the pattern implied by `GalleryFilterState.query` + `Suspense`-wrapped `GalleryBrowser` reading `useSearchParams`), so search results are shareable/back-button-safe without a dedicated `/search` route.
- **No separate results page.** Search always renders inside whichever listing page it was triggered from (Home, Category, or Style) — search narrows the current scope, it does not leave it.

**Scalability trigger:** once the catalog crosses roughly 300–500 designs, or once search query volume from Search Console shows people searching for terms not in the indexed fields (e.g. budget, room dimensions in natural language), move indexing to a build-time generated JSON index (Phase 2) and only then evaluate a hosted search service (Algolia/Typesense) — not before, since client-side search over a few hundred typed objects is not a real performance problem and adding a search vendor earlier is unjustified complexity.

---

## 7. Filter Architecture

Single source of truth: `GalleryFilterState` + `filterProjects()` in `lib/content/gallery/facets.ts`, unchanged in mechanism, extended in vocabulary.

**Facet axes (current + frozen for Phase 1):**
| Facet | Source field | Cardinality today | UI |
|---|---|---|---|
| Category | `project.category` | 6 | locked on Category pages, selectable elsewhere |
| Style | `project.styleSlug` | ~6–10 | locked on Style pages, selectable elsewhere |
| Property type | `meta.propertyType` | 3–5 | dropdown/chips |
| City | `meta.city` | grows with geography expansion | dropdown |
| Area bucket | `meta.areaSqFt` via `AREA_BUCKETS` | 4 fixed buckets | chips |
| Budget bucket | `meta.budgetLakh` via `BUDGET_BUCKETS` | 5 fixed buckets | chips |
| Free-text query | indexed fields (§6) | n/a | search bar |

**Rules:**
- **Locked facet ≠ removable filter.** When a facet is locked by the route (category on a Category page, style on a Style page), that filter chip is not rendered as removable — leaving the page is how you change it. This keeps the URL/page model honest: the route *is* the filter, the in-page filter bar narrows further within it.
- **All non-locked facets are combinable (AND logic)**, matching current `filterProjects` behavior — no OR-across-facets in Phase 1, since the catalog size doesn't yet justify that UX complexity.
- **Buckets are fixed, not data-derived**, for area and budget (already true today via `AREA_BUCKETS`/`BUDGET_BUCKETS`) — this keeps bucket boundaries stable and SEO-describable ("Under ₹15L interior design") even as the underlying data distribution shifts.
- **Filter state lives in the URL**, never in component-local state that survives a refresh poorly — this is what makes filtered views shareable and crawlable-adjacent (a filtered URL can be linked from marketing/social even though it's not a separate static route).
- **Empty state is a first-class design, not an afterthought** (`GalleryEmptyState` already exists) — must always offer a "clear filters" action and 2–3 suggested categories/styles, never a dead end.

---

## 8. Category Taxonomy

This section covers Category specifically — the routing-primary, frozen-governance axis. Style is covered below for contrast; Collections (Section 16) and Tags (Section 17) are the other two discovery systems and are governed separately, with their own promotion rules. All four together form the complete discovery model: **Category** (what room), **Style** (what aesthetic), **Collections** (what editorial story), **Tags** (what specific detail) — none replaces another, and a visitor can reach the same design through any of them.

**Primary taxonomy — Category (routing axis, 1 per project, drives canonical URL):**

| Slug | Label |
|---|---|
| `living-room` | Living Rooms |
| `bedroom` | Bedrooms |
| `kitchen` | Kitchens |
| `wardrobes` | Wardrobes |
| `full-home` | Full Homes |
| `office` | Office Interiors |

This list is frozen as the routing taxonomy for Phase 1 (matches `lib/content/gallery/categories.ts` exactly — no additions without a corresponding folder/route/SEO review, since each entry is a static route).

**Secondary taxonomy — Style (cross-cutting facet, routing axis for Style pages):**

Frozen starter set, derived from styles already present in project data plus the standard interior-design vocabulary Luxora's market searches for: `Contemporary`, `Scandinavian`, `Luxury`, `Classic`, `Minimalist`, `Industrial`, `Modern`, `Traditional`. New style slugs are added only when at least 3 projects exist in that style (avoids a Style page with one design — a thin-content SEO risk).

**Tertiary, non-routing facets** (filter-only, never a URL segment): Property Type, City, Area bucket, Budget bucket. These stay query-param-only because their cardinality is open-ended (cities) or not search-demand-justified as standalone landing pages (property type, budget) — promoting any of them to a route is a Section-12 decision, not a Phase-1 default.

---

## 9. SEO Architecture

- **One canonical URL per design**, always category-parented (§2.4). Style pages link to it but never duplicate it — `<link rel="canonical">` on every Detail page points at the category path even when arrived at via a Style page, which the current `generateMetadata` already does and must continue to do.
- **Page-type-specific metadata templates**, matching the existing pattern:
  - Home: `Design Gallery | Luxora Interiors`
  - Category: `${label} Design Gallery | Luxora Interiors`
  - Style (new): `${label} Interior Design Ideas | Luxora Gallery`
  - Detail: per-project `seo.title`/`seo.description` (already authored per record)
- **Structured data:** `BreadcrumbList` JSON-LD on every page (existing `GalleryBreadcrumbJsonLd`, extended with the Style branch). Detail pages should additionally carry `ImageObject` markup for the hero image (new — currently absent) since image search is a meaningful acquisition channel for a visual product like this.
- **Static generation for every indexable route.** Home, Category, Style, and Detail are all build-time static (`generateStaticParams`), matching current Category/Detail behavior — filtered/search views remain client-rendered and are intentionally never statically generated (would explode build output for no SEO value, since they're not unique enough content to rank).
- **Sitemap inclusion:** Home, all Category pages, all Style pages, all Detail pages go into `app/sitemap.ts` (already exists at the app root) as their own entries with `lastmod` sourced from `updatedAt`/category-static. Filtered/search URLs are excluded from the sitemap.
- **Thin-content guard:** a Category or Style page with fewer than ~4 designs should not be promoted to a real route yet — this is the same threshold logic as the Style taxonomy rule in Section 8, applied uniformly.

---

## 10. Internal Linking Strategy

- **Downward links** (Home → Category/Style → Detail) come from the grid itself — no separate "view all" link list needed beyond what `GalleryBrowser` renders.
- **Lateral links at the Detail page:**
  - `RelatedDesignsRail` — same category or style, different project (already implemented, extend its matching to also consider `styleSlug` as a tiebreaker once style exists).
  - Category chip + Style chip in `GalleryDetailHeader`, each linking to their respective listing page — gives every Detail page at least two outbound internal links into the taxonomy, which is what makes Category/Style pages discoverable by crawl from Detail pages, not only from Home.
- **Upward links** are the breadcrumb trail on every page (already implemented) — this is the canonical "how do I get back up the hierarchy" path, not a sidebar.
- **Cross-sell to conversion surfaces:** `GalleryCtaBand` on every page type links out of the Gallery entirely (consultation / budget estimate) — this is the one link type allowed to leave the Gallery vertical, and it must appear on Home, Category, Style, and Detail, not Detail alone.
- **No orphan rule:** every Detail page must be reachable from at least its primary Category page and, once style exists, its Style page — enforced at content-authoring time (a new project record without a valid `category` and `styleSlug` should fail a content-validation check, see Section 24).
- **Collections and Tags add further lateral links, never replace the rule above:** a Detail page also links to each live Collection it belongs to (§16) via chips, and its Tag chips (§17) link back into pre-filtered listing views. The Recommendation engine (§18) is itself an internal-linking mechanism — its output on the Related Designs rail is internal links ranked by relevance, not just same-category links.

---

## 11. Image Management Strategy

- **Storage location:** continues the existing convention of static assets under `public/` (`/before-after/`, `/services/`, `/smart-home/`, etc.) for Phase 1. No DAM/CDN migration is in scope for this freeze — that's a Section 12 trigger, not a Phase 1 requirement.
- **Required metadata per image** (already enforced by `GalleryImage`): explicit `width`/`height` (prevents layout shift), descriptive `alt` text written for SEO + accessibility (location + room + material, matching the pattern already used in `projects.ts`, e.g. *"Grand living room with Italian marble flooring and custom millwork, Worli, Mumbai"*), and an `isHero` flag identifying the cover/cover-equivalent shot.
- **One designated hero image per project**, used consistently as: grid card thumbnail, OG image fallback (`seo.ogImage` may differ for editorial reasons, but defaults to the hero), and Detail page header image.
- **Responsive delivery:** all gallery imagery goes through `next/image` (already implied by the Next.js app shape) so width/height metadata drives automatic responsive `srcset` generation — no manually-authored multiple resolutions in the content layer.
- **Before/after pairs** (`GalleryBeforeAfterPair`) are a distinct image relationship from the general `images[]` array and must not be deduplicated into it — they serve `ServiceBeforeAfter`, a different component with different aspect-ratio/crop assumptions than the grid.
- **Scalability trigger:** once design count crosses ~150–200, move from static `public/` assets to a managed image CDN (e.g. Cloudinary/Imgix) for on-the-fly resizing and to keep the Next.js build/output size bounded — flagged here, not actioned now.

---

## 12. Future Scalability (1000+ designs)

This section is the explicit "what changes, and at what trigger" register for **system/infrastructure** triggers — nothing here is built now. For the parallel **content/catalog-volume** roadmap (how the design count itself should grow and what that does to Category/Style/Collections/Tags), see Section 23 — the two are deliberately separate registers: this one is "what breaks technically," that one is "what the catalog needs editorially," and they're read together, not merged, because a tech trigger and a content-maturity trigger don't always land at the same catalog size.

| Trigger | Change |
|---|---|
| Catalog > ~150–200 designs | Move images from `public/` to a managed CDN (Section 11). |
| Catalog > ~300–500 designs | Move search from in-memory client array scan to a build-time generated index; re-evaluate hosted search only if query patterns demand it (Section 6). |
| Catalog > ~500 designs across many cities | Promote City from a filter-only facet to a routed facet (`/gallery/city/[city]`) if Search Console shows meaningful "[city] interior design" query volume — same thin-content threshold rule as Section 8/9 applies. |
| A specific category×style combination shows real search demand (Search Console / keyword data) | Promote that *specific* combination to a static route (e.g. `/gallery/living-room/scandinavian`) rather than generating the full cartesian product of category × style. Programmatic SEO here is demand-driven and selective, never blanket-generated, to avoid thin/duplicate pages diluting the rest of the site's authority. |
| Content authoring moves from code-edited TypeScript records to a CMS | `lib/content/gallery/*.ts` becomes a typed read layer over the CMS response rather than the source of truth itself — the `GalleryProject`/`GalleryCategory`/`GalleryStyle` interfaces are the contract that survives the migration unchanged; only where the data originates changes. |
| Editorial Collections become a real workflow (not just a reserved field) | `collectionSlugs` (already reserved in the data model) gets its own taxonomy file and `/gallery/collections/[collection]` route, following the exact same pattern Style is given in this document — Collections is "Style, but curated by an editor instead of derived from project metadata." |
| AI Designer / Shop This Room ship | `aiDesignerSeed` / `shoppableItems` (already reserved) get UI — no data migration required, by design, per the existing "frozen Phase 1 data contract" comment in `types.ts`. |

The operating principle: **every scalability change is additive to the existing type contracts, never a breaking reshape.** The Phase 1 data model was deliberately over-specified with reserved fields for exactly this reason, and this document does not violate that by introducing a competing shape.

---

## 13. Mobile-First UX Flow

- **Filter surface collapses to a drawer**, not an inline bar, below the desktop breakpoint — `GalleryFilterDrawer` already exists for this; the rule is that `GalleryBrowser` decides which of `GalleryFilterBar`/`GalleryFilterDrawer` to render based on viewport, not the page.
- **Grid density:** single column on mobile, prioritizing image size over count-per-screen (this is an inspiration product — image quality at speed of scroll matters more than density).
- **Search bar is always the first interactive element** on mobile listing pages, above filters, since thumb-reach and "I know what I want" intent both favor search-first on small screens.
- **Detail page image grid becomes a swipeable/lightbox-first experience** (`GalleryLightbox` already exists) rather than a scrolling grid, since a multi-column image grid degrades badly on narrow viewports.
- **Sticky CTA on mobile Detail pages:** the consultation/budget-estimate action from `GalleryCtaBand` should be reachable without scrolling to the bottom of a long Detail page on mobile — a persistent bottom action bar is the recommended pattern (not built yet, flagged as a Phase 1 mobile requirement, not a future one).
- **Breadcrumbs truncate, never wrap**, on mobile (show `Home → … → [Current]` pattern) to protect vertical space above the fold.

---

## 14. Reusable Components

**Reused as-is from the existing Service vertical (no Gallery-specific fork):**
`ServicePageShell`, `ServiceBreadcrumb`, `ServiceBeforeAfter`, the `components/v4/background` pattern library (`LuxuryHalo`, `LuxuryGrain`, `LuxuryContour`), and `lib/design/luxoraDesignTokens.ts` for all color/shadow/radius/spacing values. Gallery introduces zero new design tokens.

**Gallery-owned, reused across multiple Gallery page types (the actual "reusable component" layer for this product):**
`GalleryHero` (Home/Category/Style), `GalleryBrowser` + its children (Home/Category/Style), `GalleryCard`/`GalleryGrid` (everywhere a project list renders, including `RelatedDesignsRail`), `GalleryCtaBand` (every page type), `GalleryBreadcrumbJsonLd` (every page type), `GalleryMetaDot` and the new `StyleChip` (Card, Detail header, Style page header).

**Single-use, intentionally not generalized:** `GalleryDetailHeader`, `GalleryImageGrid`, `GalleryLightbox`, `RelatedDesignsRail` — these exist only on the Detail page and should stay that way; resist pulling them into the shared layer prematurely.

---

## 15. Shared vs. Separate — Gallery / Portfolio Boundary

**Shared (both products must use the same instance, not a copy):**
- `ServicePageShell` and the entire `components/v4/background` pattern library — visual chrome is one system across the whole V4 site.
- `lib/design/luxoraDesignTokens.ts` — colors, shadows, radii, spacing. Two products with different token sets would visually fracture the site.
- Primitive presentational atoms with no domain meaning: a generic card-image-with-caption pattern, a generic breadcrumb renderer, a generic CTA band *component* (though its copy/destination differs per product — the component is shared, the content is not).
- The lead-capture mechanism itself (consultation booking, budget estimator) — one conversion pipeline, invoked from both products, not two separate forms/flows.

**Must remain completely separate (no shared instance, no shared schema):**
- **Content/data layer.** `lib/content/gallery/*` and any future `lib/content/portfolio/*` are independent type systems. A "Design" and a "Project" are different domain concepts with different required fields (Portfolio requires client attribution, testimonial, and case-study narrative structure that Gallery explicitly does not have and should not be forced to carry).
- **Taxonomy.** Gallery's Category/Style taxonomy is inspiration-oriented (room type, design style). Portfolio's organizing structure is delivery-oriented (by service line, by scale, by client industry/segment) — these are different axes and must not be unified into one shared taxonomy file just because both happen to use "category" as a word.
- **URL namespace.** `/gallery/...` and `/portfolio/...` (or wherever Portfolio lands) stay structurally distinct route trees — no nesting one inside the other, since their canonical/SEO strategies differ (Gallery optimizes for broad inspirational search volume; Portfolio optimizes for branded/decision-stage search and trust signals).
- **Identity/testimonial handling.** Portfolio's client names, testimonials, and case-study attribution are sensitive content with their own consent/legal handling; Gallery content is explicitly designed to not require this (anonymized or generic location-level attribution only, as already evidenced by every current Gallery record using neighborhood-level location, never a client name).
- **Search/filter implementation.** Even though both products will likely have "filter by room type," each filters its own dataset against its own facet model — do not build one shared `filterProjects` over a unioned content type, since the two products' filter *vocabularies* will diverge as Portfolio matures (e.g. "engagement size," "delivery timeline tier" are Portfolio-only facets with no Gallery equivalent).

**Decision rule for anything not listed above:** if it encodes *visual system* → shared. If it encodes *domain content or business meaning* → separate. When genuinely ambiguous, default to separate and revisit only if duplication becomes a maintenance burden — premature sharing between two products that are explicitly defined as "completely separate" is a worse failure mode than temporary duplication.

---

## 16. Collections Architecture

Collections are the **third independent discovery system**, alongside Category (Section 8) and Style (Section 2.3/8). They do not replace either. A Collection is an editorially-defined grouping of designs that doesn't map cleanly to "one room type" or "one aesthetic" — it maps to a *story* ("Homes Under 20 Lakhs," "Festival Collections," "Editor's Choice") that can legitimately span every category and every style at once.

### 16.1 Two kinds of Collection

| Kind | Definition mechanism | Examples | Refresh model |
|---|---|---|---|
| **Curated** | Editor hand-assembles an ordered list of project references | Luxury Bedrooms, Modern Kitchens, Small Apartment Ideas, Editor's Choice, Homes Under 20 Lakhs, Festival Collections | Manually edited; order is editorial intent, not computed |
| **Dynamic** | A stored *rule* (filter + sort + limit) is re-evaluated against the live catalog | Trending, New Arrivals, Top Rated Designs, Most Saved | Computed at build/request time; membership and order change automatically as the catalog and signals change |

Both kinds share one `GalleryCollection` record shape and one route pattern — the difference is entirely in how membership is determined, never in how the page renders.

### 16.2 Data model

```
GalleryCollection {
  slug, label, eyebrow, description, heroImage, heroImageAlt   // same shape as GalleryCategory/GalleryStyle
  kind: 'curated' | 'dynamic'
  projectSlugs?: string[]            // curated only — explicit, ordered membership
  rule?: {                           // dynamic only — a declarative query, not code
    sortBy: 'publishedAt' | 'popularityScore' | 'savedCount'
    filter?: Partial<GalleryFilterState>
    limit: number
  }
  isActive: boolean                  // governs whether the page resolves live or is retired
  expiresAt?: string                 // seasonal/festival collections only
  sortWeight: number                 // controls ordering when multiple collections are listed together (hub, Home rails)
}
```

`GalleryProject.collectionSlugs[]` (already reserved pre-v2 — Section 5) is the back-reference used **only** by curated collections, for fast "which collections is this design in" lookups on the Detail page. Dynamic collections never write to this field — their membership is computed from `rule`, never denormalized into the project record, so there is exactly one place a dynamic collection's membership can go stale-incorrect (the rule evaluation), not two.

### 16.3 URL structure

```
/luxury-v4/gallery/collections                 — hub: index of all isActive collections, grouped by kind for editorial control
/luxury-v4/gallery/collections/[collection]     — single Collection page, same layout shape as a Category/Style page
```
A Collection page reuses `GalleryHero` + `GalleryBrowser` (locked to that collection's resolved project list) exactly as Category/Style pages do — no bespoke page template, per the Section 4 component-architecture rule.

### 16.4 Navigation

- **Not in primary site nav** (same rule already applied to Category and Style) — Collections are discovered *inside* the Gallery, never duplicated into global nav.
- **Featured on Gallery Home** via the rail system (Section 21) — this is the primary discovery surface for Collections, more so than the hub page itself.
- **Contextual chips on Detail pages** — a design belonging to ≥1 active Collection shows a chip per Collection, linking to that Collection page (adds to, never replaces, the existing Category/Style chips).
- **The hub page (`/collections`) exists for crawlability and for visitors who explicitly want to browse "by theme"** — a secondary, not primary, navigation surface.

### 16.5 SEO

- Each **curated** Collection page is a stable, unique landing page — full metadata template (`${label} | Luxora Design Ideas`), static generation, sitemap inclusion, same thin-content guard (≥4 designs) as Category/Style (Section 9).
- Each **dynamic** Collection page has a stable canonical URL whose *content* rotates — this is not a duplicate-content risk (the same pattern as a news section page or an e-commerce "Best Sellers" page that updates daily under one URL); `lastmod` updates whenever the underlying rule re-evaluates to a changed result set.
- **Seasonal/expiring collections** (`expiresAt`) must not be left live as stale, irrelevant content after their season passes — when `isActive` flips false, the page should redirect (to the Collections hub or a successor collection) rather than 404, preserving any link equity it accrued.

### 16.6 Future scalability

Collections is the **highest-velocity** axis in the whole taxonomy — unlike Category (frozen) or Style (3-design-minimum, slow-growing), Collections can launch and retire on an editorial calendar (festival collections, seasonal pushes) without any of the governance overhead applied to Category. This is intentional: Collections is where Luxora's editorial team gets to move fast, while Category/Style stay deliberately stable underneath. See Section 23 for how Collections count and mix is expected to grow alongside the catalog, and Section 17.3 for how a high-performing Tag gets promoted into a Collection rather than into its own route.

---

## 17. Tags Architecture

Tags are the **fourth discovery system** — granular, descriptive, high-volume, low-governance, and **explicitly never a routing axis**. Where Category/Style/Collections each get a real page, Tags exist purely to improve filtering, search recall, and recommendation quality.

### 17.1 What a tag is

A tag is a specific, concrete attribute of a design that's too granular to be a Category and too narrow to be a Style: a material (`wood`, `marble`, `walnut-finish`), a furniture/architectural element (`tv-unit`, `walk-in-closet`, `glass-partition`, `open-kitchen`), a mood/light descriptor (`natural-light`, `golden-accents`, `green-theme`), or an aesthetic micro-label finer than Style (`japandi`, `boho`). A single project carries many tags (5–15 is a reasonable range), versus exactly one Category and one primary Style.

### 17.2 Data model

```
GalleryTag {
  slug, label
  group: 'material' | 'furniture' | 'mood' | 'color' | 'style-accent'   // presentation grouping only, not a routing concept
}

GalleryProject.tags: string[]   // tag slugs, unbounded, many-to-many
```
Tags are drawn from a **canonical dictionary** (`lib/content/gallery/tags.ts`), not freeform strings on each project record — this is the single governance rule for tags, and it exists for one reason: to stop `walnut-finish` / `Walnut Finish` / `walnut finish` from fragmenting into three different values that filtering and search treat as unrelated.

### 17.3 How tags exist without affecting canonical URLs

- **No `/gallery/tag/[tag]` route, ever, by design** (Section 2.6). A tag is metadata on a project, not a page.
- **Tag chips are pre-filled filter links, not page links** — clicking a Tag chip on a Card or Detail page applies `?tags=walnut-finish` to whichever listing context it's clicked from (Home, a Category page, a Style page, a Collection page); it never navigates to a URL whose canonical identity *is* the tag.
- **The only path from "tag" to "real page" is via Collections, never directly.** If a tag shows real organic demand (Search Console query data, mirroring the Style promotion rule in Section 8), the correct response is authoring a Collection backed by a tag-rule (e.g. a dynamic Collection "Walnut Finish Interiors" with `rule.filter = { tags: ['walnut-finish'] } `) — not inventing a new route type. This keeps the number of distinct *route types* fixed at three (Category, Style, Collection) permanently, regardless of how large the tag dictionary grows.

### 17.4 Where tags improve discovery

- **Filtering** — a new "Features"/"Materials" filter group inside `GalleryBrowser`, additive to the existing facets in Section 7, combinable with all of them (same AND-logic rule).
- **Search** (Section 6) — tags join the indexed haystack, meaningfully improving recall for attribute-specific long-tail queries ("walnut tv unit living room") that wouldn't otherwise match unless those exact words appeared in the title or description.
- **Recommendations** (Section 18) — tag overlap is a first-class weighted signal, and the one most likely to surface a genuinely surprising, well-matched "you might also like" result that Category/Style alone would miss.

---

## 18. Recommendation Engine Architecture

Replaces the current "same category, same style" `RelatedDesignsRail` logic with a **weighted, multi-signal scoring model**. Architecture only — the model below is a specification for a pure function, not a build instruction.

### 18.1 Model shape

```
score(source, candidate) = Σ ( weight[signal] × match(source, candidate, signal) )
```
A pure function of `(sourceProject, candidatePool, weightConfig) → rankedCandidateList`. No hidden state, no session/runtime dependency — this is what keeps it computable at static-build time today (for Detail pages, exactly where `RelatedDesignsRail` already renders) and swappable for a real-time/personalized service later without changing what a Detail page expects to receive.

### 18.2 Signal table

| Signal | Match condition | Weight class | Why |
|---|---|---|---|
| Category | same `category` | High (relevance) | The baseline "is this even relevant" gate |
| Style | same `styleSlug` | High (relevance) | Strongest aesthetic-fit signal |
| Tags | overlap count between `tags[]` sets | Medium, scales with overlap (relevance) | Granular taste-matching; rewards multiple shared tags over a single coincidental one |
| Property Type | same `meta.propertyType` | Medium (relevance) | An apartment shopper isn't well served by villa-only suggestions |
| Budget | same/adjacent budget bucket | Medium (relevance) | Keeps suggestions financially realistic for the visitor |
| Area | same/adjacent area bucket | Low–medium (relevance) | Scale-of-space fit |
| City | same `meta.city` | Low (relevance) | Local relevance — real, but weaker than design fit |
| Collections | shared `collectionSlugs` membership | Medium (relevance) | Editorial curation already asserted these belong together |
| Featured Score | candidate's `featured`/editorial weight | Small, additive (boost) | Lets editors nudge strong work into rails without faking relevance |
| Popularity | views/saves count — reserved signal, Section 22 | Small, additive (boost) | "What others liked" tiebreaker, once that data exists |
| Freshness | recency of `publishedAt`/`updatedAt` | Small, additive, decaying (boost) | Keeps rails from going stale; never the dominant factor |

### 18.3 Rules

- **Relevance signals are conditional on the source having that attribute** — a signal only contributes if `source` actually has a value to match against (e.g. Tag-overlap scoring requires `source.tags.length > 0`); there is no "credit" for an absent attribute matching another absent attribute.
- **Boost signals are additive and capped below the value of a single relevance match** — Featured/Popularity/Freshness must never let a low-relevance candidate outrank a genuinely better-matched one. This is a hard architectural constraint, not a tuning suggestion, because the moment boosts can outweigh relevance, "Related Designs" stops meaning "related."
- **One owner for weights:** `lib/content/gallery/recommendations.ts` holds the weight table and the scoring function in one place — tuning relevance is a one-file change, mirroring how `facets.ts` owns bucket definitions today (Section 7). No component is allowed to embed its own ad hoc relevance logic.
- **Output is capped, deduplicated, and self-excluding** — N results, never including the source design, never repeating a candidate already shown elsewhere on the same page (e.g. a project already surfaced in a Collection rail on that Detail page shouldn't repeat in the Related Designs rail directly below it).
- **Graceful degradation by design, not by special-casing:** with Popularity/Saved-count data not existing until Phase 2 (Section 22), those weights simply default to zero — the formula still runs every time, it just has zero-weight terms until the data exists. The model never needs a "do we have popularity data yet" branch.

---

## 19. Design Identity

### 19.1 Format

`LX-DG-000128` — `LX` (Luxora) + `DG` (Design Gallery — reserves `LX-PF-######` as a structurally distinct ID space for Portfolio, so the two products' identifiers can never collide or be confused even if someone sees only the number) + a zero-padded sequential number.

`GalleryProject.designId: string` — assigned once, at publish time, immutable for the record's lifetime. A retired/unpublished design's ID is never reused or recycled back into a pool.

This is **deliberately decoupled from `slug`.** The slug can be edited later for SEO reasons (a rare but legitimate case — fixing a typo, improving keyword phrasing) with a redirect (Section 24); the Design ID never changes regardless, because everything outside the website (CRM, sales conversations, printed material) should never break when a URL is tidied up.

### 19.2 Why it exists — purpose per consumer

- **CRM:** the stable join key between a Gallery design and a CRM lead record. Titles can collide in spirit, slugs can be renamed — `designId` is the one identifier guaranteed unique and permanent, so a lead record's "design of interest" field never goes stale.
- **Lead forms:** every consultation/budget-estimate CTA fired from a Detail page should carry the source `designId` as a hidden field, so the first sales touchpoint can reference the exact design without relying on the lead remembering or re-finding the URL.
- **Sales team:** a designer can say or write "the client liked LX-DG-000128" and it's unambiguous forever — shorter than a URL, more durable than a title, and immediately tells whoever reads it that it's a Gallery design (not a Portfolio project) by the `DG` segment alone.
- **Sharing:** WhatsApp/Instagram captions can carry the Design ID as a human-speakable reference ("Ask for LX-DG-000128") even when the actual shared link is the full canonical URL — useful specifically in voice/offline contexts (a showroom conversation, a phone call) where reciting a URL is impractical.
- **Future QR codes:** a printed QR code (showroom signage, printed catalog, festival brochure insert) encodes the canonical URL as the scan target, with the Design ID printed as human-readable text beneath it — so a damaged or unscannable code is still manually look-up-able by ID, and the same ID format works whether the eventual QR target is a Gallery Detail page or a Portfolio case study, because the product segment (`DG` vs `PF`) disambiguates which system to search.

### 19.3 Generation

Sequential assignment is a **content-authoring concern**, not a runtime computation — the next available number is tracked wherever project records are authored/validated (Section 24's publishing checklist), and assigned at the moment a record moves from draft to published. IDs are never derived from array index or position in `projects.ts`, so reordering, deleting, or archiving a draft never shifts another design's permanent ID.

---

## 20. Color & Material Metadata

Reserved metadata only — no UI, no filter surface, no search integration is built against this in Phase 1. The purpose of formalizing it now is so that when any of those are built later, it's a presentation-layer addition, not a data-modeling project.

### 20.1 Shape

```
GalleryColorMaterial {
  primaryColors: string[]      // controlled vocabulary, e.g. ["warm-beige", "espresso-brown"]
  accentColors: string[]       // e.g. ["brushed-gold"]
  materials: string[]          // e.g. ["italian-marble", "smoked-oak", "brass"]
  woodFinish?: string
  countertop?: string
  wardrobeFinish?: string
  floorFinish?: string
  lightingStyle?: string       // e.g. "warm-layered", "cove-lighting", "statement-pendant"
}

GalleryProject.colorMaterial?: GalleryColorMaterial   // fully optional — see §20.3
```
Every list field draws from a small controlled vocabulary (the same governance pattern as the Tag dictionary, Section 17.2) so that, e.g., `"espresso-brown"` and `"Espresso Brown"` never fragment into two values that search/filtering treat as different.

### 20.2 How it helps search and recommendations (the *why*, since no UI ships against it yet)

- **Search recall:** a query like "marble living room" or "gold accent bedroom" becomes matchable against a structured field instead of depending on the exact word appearing in free-text `description`/`story` prose — a materially better match rate for the kind of visual-attribute query an interior shopper actually types into Google or on-site search.
- **Recommendation quality:** material/color overlap is a natural future weighted signal for Section 18's model (e.g. two designs in *different* categories that both feature walnut finish and a warm-beige palette are a legitimate "you might also like" pairing that Category/Style alone would never surface). Deliberately **not added to the Section 18 weight table yet** — there's no data to weight against until this metadata is populated — but the model's "add a new relevance signal" mechanism already supports it without restructuring.
- **Future filtering:** the natural backing data for a "Shop by Color" or "Shop by Material" visual swatch picker, should that ever be built — the metadata existing first means that's a pure UI project later, not a data-modeling one.
- **Future AI Designer / Shop This Room:** both already-reserved features (`aiDesignerSeed`, `shoppableItems`) get meaningfully more useful once a request can be seeded with "match this wood finish," not just "match this room type" — this metadata is direct groundwork for those, consistent with the reserved-fields philosophy already established in `types.ts`.

### 20.3 Rollout

Ships as **fully optional** on every record, old and new. Backfilling historical records is a content task done over time, never a schema migration — the type permits partial or entirely absent values from day one, so there is no "all-or-nothing" cutover required.

---

## 21. Editorial Discovery (Gallery Home Architecture)

Gallery Home stops being "hero + one grid" and becomes a **rail-based editorial page** — an ordered sequence of independent, swappable sections, each backed by its own data query. This is the architectural answer to "should support unlimited editorial sections": the page is a *renderer over a list*, not a fixed template with a hardcoded number of sections.

### 21.1 Rail types

Every example in the brief (Trending, Editor's Picks, Recently Added, Most Viewed, Luxury Collection, Small Space Ideas, Family Homes, Celebrity Inspired, Seasonal Designs, Minimal Collection) reduces to exactly one of three underlying mechanisms — there is no per-rail bespoke logic:

1. **Collection-backed rail** — the rail's contents are literally a Collection (Section 16), curated or dynamic, rendered horizontally instead of on its own page. "Luxury Collection," "Editor's Picks," "Small Space Ideas," "Family Homes," "Seasonal Designs," "Minimal Collection," "Celebrity Inspired" are all this — same data source as the Collection's own page, two presentations of the same underlying query.
2. **Signal-backed dynamic rail** — "Trending," "Recently Added," "Most Viewed" are computed from signals (recency, view count, save count — the same Popularity/Freshness inputs reserved in Section 18) using the same rule mechanism a dynamic Collection uses (Section 16.1). Whether a given dynamic rail also gets its own standalone page is a separate, independent decision per rail — not a different architecture.
3. **Curated-order full-catalog section** — the existing main grid (`GalleryBrowser`) remains on Home as the final section: "everything, filterable" stays available, it's simply no longer the *first* thing the visitor sees.

### 21.2 Composition model

Gallery Home is driven by an ordered **rail manifest**:
```
homeManifest: { railType: 'collection' | 'dynamic' | 'browser', sourceSlug?: string, title: string, limit?: number }[]
```
Adding, removing, reordering, or retiring an editorial section on Home becomes a **content/config change** — editing the manifest — never a code change. This is the concrete mechanism behind "support unlimited editorial sections": there is no ceiling baked into the page template, only into how many rails are worth showing before the page itself becomes unwieldy (an editorial/UX judgment call, not an architectural limit).

### 21.3 Component implication (architecture only — not built)

One new presentation family: `GalleryRail` (the horizontal-scroll shell) + `GalleryRailCard` (a denser card variant of `GalleryCard` sized for horizontal scanning). Every rail, regardless of whether its data came from a Collection, a dynamic signal query, or the manual curation list, renders through this same pair — the identical "thin orchestration, shared presentation" pattern already established for `GalleryBrowser` (Section 4).

### 21.4 Scope boundary

This explicitly **does not change Category, Style, or Collection page architecture** — rails are a Home-page-only composition concept. Category/Style/Collection pages keep their current single-grid shape (`GalleryHero` + `GalleryBrowser`), because their job is exhaustive browsing within one locked facet, not editorial storytelling. Only Home gets to be editorial; everywhere else stays a clean, predictable grid.

---

## 22. Future Features — Reserved Architecture Only

None of the following are built now. Each row reserves a data shape so that building the feature later is additive, never a migration — the same philosophy already established for `aiDesignerSeed`/`shoppableItems` in the original `types.ts`.

| Feature | Reserved shape | Attaches to | Why this shape |
|---|---|---|---|
| Save Design / Wishlist | `savedDesignIds: string[]` (storing `designId`, §19 — never `slug`) keyed by a user/session identity | New user-account/session layer — **not** a field on `GalleryProject` | Saving is a relationship between a visitor and a design, not a property of the design itself; it must never be modeled on the project record, or every design would need to track every saver |
| Compare Designs | Ephemeral set of `designId`s held in URL/session state, resolved to full records at render time | No persisted schema | Comparison is a transient UI session, not durable content — nothing to reserve on the content layer |
| Download PDF | Derives entirely from existing `GalleryProject` fields at generation time | No new field | Confirms the current data model already contains everything a spec-sheet PDF needs — a pure rendering target |
| Share Design | Uses canonical URL (§2.4) + `designId` (§19) + `seo.ogImage` | No new field | Sharing reads existing fields; it needs no new storage |
| Moodboards | `Moodboard { id, ownerId, title, designIds: string[], createdAt }` | New top-level entity | Architecturally, a moodboard is "a Collection a visitor curates instead of an editor" — same shape (an ordered, titled list of design references), different owner. This is exactly why giving Collections (§16) a clean, generic shape now pays off directly here later |
| AI Designer Integration | `aiDesignerSeed: { roomType, styleTags }` | Already on `GalleryProject` | Already future-proofed pre-v2; no change required |
| Shop This Room | `shoppableItems: { imageUrl, x, y, productId }[]` | Already on `GalleryProject` | Already future-proofed pre-v2; no change required |
| Designer Profiles | Optional `designerId` on `GalleryProject` → future `Designer { id, name, bio, photo, slug }` entity | New optional reference field + new entity | Optional and defaulting to absent ("Luxora team") means attribution can be added without touching a single existing record |
| Recently Viewed | Capped list of `designId`s in client-side storage (e.g. `localStorage`), no server schema | None | Privacy-light, account-free, browser-side convenience by design — should never require login |

**Cross-cutting rule:** every reservation in this section is additive and optional, and none requires touching `GalleryCategory`, `GalleryStyle`, `GalleryCollection`, or the canonical URL model. That's the actual test of whether Sections 1–21 are well-designed: none of these ten future features should force a redesign of anything already specified.

---

## 23. Gallery Content Strategy (Catalog Growth Roadmap)

How the **catalog itself** should grow, and what that triggers at each axis — content-volume-driven, and deliberately a separate register from Section 12's infrastructure triggers (cross-referenced there).

| Stage | Catalog size | Category | Style | Collections | Tags | SEO | Internal linking |
|---|---|---|---|---|---|---|---|
| **Seed** | ~50–100 | All 6 categories live, thin (3–5 designs) is acceptable — the whole site is young | Filter-only; no Style pages yet (none clear the 3-design minimum, §8) | 1–2 curated only (e.g. "Editor's Choice"), to make Home feel intentional despite low volume | Dictionary seeded (~30–50 tags); filter-only, not yet a growth lever | All SEO effort on Category pages + full per-Detail-page treatment | Breadcrumb + Related rail only; low rail variety is correct at this size, not a gap |
| **Establish** | ~300–500 | Rebalance content planning toward lagging categories rather than piling onto the leader | Style pages go live for every style clearing the 3-design threshold — **this is the stage Style stops being filter-only** | 5–8 collections: curated ("Luxury Bedrooms," "Homes Under 20 Lakhs") + first dynamic ones ("New Arrivals," "Trending") once publish velocity makes "new"/"trending" mean something | Tag filtering becomes genuinely useful (real result sets per tag) | Search Console data starts to matter; first programmatic category×style promotions considered (§12) | Rail-based Home (§21) becomes worth building — below this volume rails would just repeat the same few designs |
| **Scale** | ~1,000 | Consider city-led sub-grouping inside dominant-metro categories — a content-organization choice surfaced via filters, not a new route type | Taxonomy may extend past the 8-style seed list; same 3-design governance applies per new style | Festival/seasonal collections become a recurring calendar item (launch + retire via `isActive`/`expiresAt`, §16.2), not one-offs | Dictionary likely 100+ entries; first tag-backed Collections promoted where Search Console shows demand (§17.3) | Sitemap segmentation (separate files per page type) for crawl-budget hygiene | Recommendation engine (§18) signals beyond Category/Style start meaningfully differentiating results — enough density per Tag/Property-Type/Budget combination to matter |
| **Maturity** | 5,000–10,000+ | Category list itself may warrant review (e.g. splitting "Full Home" into finer cases) — always a deliberate, reviewed taxonomy change, never ad hoc | Same governance model, scales by style *count*, not by mechanism change | Primary editorial lever for freshness — Home rotates Collections far more often than Category/Style ever change | Tag-dictionary audits (merging near-duplicates) become standing content-ops, not a one-time cleanup | Full reliance on demand-driven programmatic SEO (§12) — steady cadence of newly-promoted category×style and tag×Collection pages, each justified by real query data | Recommendation engine becomes the dominant discovery mechanism for return visitors; Home rails become personalized-*adjacent* (still rule-based per §18, not ML) rather than purely editorial |

**The rule underneath every stage:** no taxonomy axis is promoted ahead of the content that justifies it. Category is frozen because it's foundational; Style, Collections, and Tags each have an explicit, data-justified promotion gate of their own (3-design minimum, demand-driven route promotion, dictionary governance). The catalog's actual growth should always be what triggers an architecture change — never the reverse, and never a change made "because we might need it."

---

## 24. Content Governance

### 24.1 Naming conventions
- **Project title:** human, marketing-readable, location/style implied where natural ("The Worli Residence," "Bandra Smart Living Room") — the existing `projects.ts` convention, kept as the permanent standard.
- **Category/Style/Collection labels:** Title Case; plural for Category ("Living Rooms"), singular-or-plural as natural for Style ("Scandinavian"), a descriptive phrase for Collections ("Homes Under 20 Lakhs").

### 24.2 Slug conventions
- All slugs: lowercase, hyphen-separated, ASCII only — a clean identifier, not a keyword-stuffing surface (keyword targeting belongs in `seo.title`/`seo.description`, never the slug).
- **Project slug:** derived from the title at creation, then frozen. Changed only for a genuine SEO/legal reason, and only with a redirect (§24.5).
- **Category slugs:** permanent; any addition goes through the route/SEO review already specified in Section 8.
- **Style/Collection slugs:** stable once published; renaming requires updating every referencing record plus a redirect for the old route.
- **Tag slugs:** no route to redirect, but still drawn from the canonical dictionary (§17.2) — renaming a tag slug means a one-time bulk update across every project that carries it.

### 24.3 Image naming
- Convention: `{category-slug}-{descriptor}-{sequence}.jpg` (e.g. `living-room-marble-tv-unit-02.jpg`) — self-documenting in a file browser, independent of `alt` text (which is written for humans/SEO, never for file management).
- The hero image is always the first asset authored for a project and is the only image permitted to double as the OG fallback (§11).

### 24.4 SEO writing rules
- Title tags follow the per-page-type templates fixed in Section 9 — never freehanded per page.
- Meta descriptions: one sentence stating what the design is, one sentence stating the differentiator (material, scale, or transformation) — the tone already established in existing `seo.description` records.
- No two records may share a title or description — checked at the validation stage (§24.6).

### 24.5 Alt text rules
- Pattern frozen from Section 11: `{descriptive room/material phrase}, {neighborhood}, {city}` — every image, no exceptions, no generic filler ("interior design photo").
- Alt text must differ across every image within one project — never copy the cover image's alt text onto the rest of the set.

### 24.6 Metadata rules
- Every required field in `GalleryProject` must be populated before publish; optional/reserved fields (Color & Material, Tags, Design ID once assigned) may be partially populated but never silently `undefined` where the type expects a value — explicit omission, never an empty string standing in for "no data yet."

### 24.7 Publishing checklist (manual gate, draft → published)
1. Design ID assigned (§19) — sequential, never reused.
2. Category + primary Style assigned and validated against their taxonomy files.
3. At least one Tag from the canonical dictionary (§17) — zero tags is a content-quality flag, not a hard block, but should be rare.
4. Hero image set; every image has width, height, and unique alt text populated.
5. SEO title/description authored deliberately (not auto-derived from the title alone) and checked against the no-duplicate rule (§24.4).
6. Breadcrumb-reachability confirmed — the No Orphan Rule (§10): the record will be linked from its Category page and, once assigned, its Style page.
7. If the slug differs from a previously published slug for this record (a rename), a redirect is configured *before* the old URL stops resolving.

### 24.8 Content validation (described architecturally — not implemented here)
- Schema validation against `types.ts` on every content build — formalized as a CI step that fails the build on a type violation, not merely a local editor warning.
- Uniqueness checks: `id`, `slug`, and `designId` must each be globally unique across `projects.ts`.
- Referential integrity: `category` must exist in `categories.ts`, `styleSlug` in `styles.ts`, every `tags[]` entry in `tags.ts`, every `collectionSlugs[]` entry in the collections file — a dangling reference fails validation outright, it never silently renders blank.
- Thin-content check: before any Category/Style/Collection is promoted to a real route, automatically confirm it clears its relevant minimum-design threshold (§8, §16.5).

### 24.9 Review workflow
Author writes the record → editorial review (story quality, photo sequencing) → SEO review (title/description/alt text against §24.4–24.5) → publish gate (§24.7) → live. This describes the *stages*, not a tool — whether they run through a PR review, a CMS draft/publish state, or a sign-off sheet is a tooling decision for whenever content authoring moves off hand-written TypeScript (the CMS-migration trigger already in Section 12); the stages themselves don't change with the tooling.

---

## 25. Architecture Principles

1. **Single source of truth** — one typed content layer (`lib/content/gallery/*`) backs every page; no page hand-rolls its own data shape.
2. **One canonical URL per design** — always Category-parented (§2.4); Style, Collections, Tags, and the Recommendation engine all link to it, none of them ever fork it.
3. **No duplicated data** — relationships are references (slugs, IDs), never copy-pasted content; a project's title, images, and metadata exist in exactly one record.
4. **Content-first architecture** — every new capability (Style, Collections, Tags, Recommendations, Color/Material) is modeled as an extension of the existing typed content contract first; UI follows the data, never the other way round.
5. **Component reusability** — a small, fixed set of orchestration and presentation components (`GalleryBrowser`, `GalleryCard`, `GalleryRail`) serve every page type; new page types are composition over the existing set wherever the underlying data shape allows it, not new component families.
6. **SEO-first routing** — a URL exists only where it represents genuinely unique, demand-justified content; the thin-content guard applies uniformly across Category, Style, and Collections, and Tags are withheld from routing entirely for exactly this reason.
7. **Future scalability without premature build-out** — every speculative feature (§22) is reserved as an optional, additive field, never implemented ahead of need; every infrastructure change (§12) and every catalog-maturity change (§23) is trigger-gated, never anticipatory.
8. **Performance-first** — static generation for every indexable route; client-side state confined to filtering, search, and ephemeral session concerns (Compare, Recently Viewed); image-delivery decisions made for load performance before convenience.
9. **Editorial flexibility, deliberately fenced** — Collections and Home-page rails (§16, §21) are the system's designated "move fast" surface. Category and the canonical URL model are the deliberate opposite: slow-changing, governed, boring on purpose — because the Gallery's SEO equity depends on that half of the system staying stable while the other half moves freely.
10. **No premature complexity** — every mechanism in this document (search infrastructure, the recommendation model's data signals, Collection-as-route, tag-to-Collection promotion) has an explicit volume or demand trigger before it activates. Nothing here is built, indexed, or promoted to a route ahead of the content and traffic that justify it.
11. **Gallery and Portfolio never merge.** No shared schema, no shared taxonomy, no shared URL namespace — regardless of how much short-term duplication that costs (§15). This is restated here, as the final principle, because it is the one rule in this entire document that must never be revisited for convenience.
