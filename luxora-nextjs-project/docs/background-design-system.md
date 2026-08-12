# Luxora Background Design System

`components/v4/background` — a global design-system asset for every Luxora
page (homepage, estimator, gallery, portfolio, services, contact, future
landing pages). Two layers:

1. **Primitives** — single visual ingredients. **In active use (texture &
   light only):** `LuxuryGrain`, `LuxuryStucco` (paper + limewash texture),
   `LuxurySpotlight`, `LuxuryHalo`, `LuxuryMesh` (light & colour fields),
   `LuxuryFrame` (editorial hairline rules). **Retained but currently unused
   — the shape set:** `LuxuryContour`, `LuxuryBlueprint`, `LuxuryMarble`,
   `LuxuryGeometry`, `LuxurySphere`, `LuxuryRidges`, `LuxuryBotanical`,
   `LuxuryArch`, plus `LuxuryDivider`. These are kept in the library for the
   future "signature element" path (see the restraint decision below) but no
   scene renders them today. Pure SVG/CSS, zero image requests.
2. **Scenes** (`background/scenes`) — named, art-directed compositions of
   primitives with hand-tuned values. Sections consume a scene by name; they
   do not assemble primitives ad hoc.

## Global rules

- **Content is always the hero.** Scenes live at `z-0` under a `z-10`
  content wrapper, `pointer-events-none`, `aria-hidden`. Host section must
  be `relative overflow-hidden`.
- **Restraint over ornament (governing principle).** Scenes are built from
  **texture (grain + limewash stucco) and light (spotlight, halo, mesh)
  only** — no decorative shapes. Reason, learned the hard way: hand-coded
  CSS/SVG line-art (ridges, arches, rings, fronds) reads as a budget
  imitation of crafted illustration and *cheapens* a premium page. The most
  premium interior brands use almost no background decoration — the luxury
  comes from a beautiful warm wall, directional light, exceptional cards,
  photography and type. When in doubt, remove.
- **The "signature element" exception (not yet used).** A single, genuinely
  exceptional crafted element (e.g. a flawless gradient-shaded orb, or a
  real leaf silhouette from a photo) may be introduced in one or two marquee
  sections — but only if it is exceptional. The shape primitives above are
  retained for exactly this. Scattered line-art is never acceptable.
- **Rhythm:** adjacent sections must not share a scene. Differentiation now
  comes from **light direction and warmth**, not shapes. **At most two dark
  sections per page** (locked decision).
- **API:** every scene takes `{ id, surface?: 'light'|'dark', intensity?:
  'whisper'|'standard' }`. `id` must be unique per instance (namespaces SVG
  filters). Use `whisper` on content-dense surfaces.
- **No motion.** Scenes are static by design — reduced-motion safe.

## Scene catalog

Every scene = limewash stucco + fine grain (the material base) + a light
signature. They differ by **light direction and warmth**, not shapes.

### EditorialLight
- **Purpose:** the "resting" scene between statement moments.
- **Light signature:** daylight from the top-left + faint editorial rules — calm magazine-page air.
- **Use on:** Services (homepage), Walkthrough, service overviews, about sections.
- **Avoid on:** sections wanting overt warmth or drama.

### LuxuryAmbient
- **Purpose:** warmth and domesticity.
- **Light signature:** warm gold/cream mesh + a low glow rising bottom-right — evening lamplight.
- **Use on:** Furniture Collection, materials/finishes, lifestyle sections.
- **Avoid on:** dense data or forms — warmth competes with inputs.

### Architectural
- **Purpose:** composed, precise, structured.
- **Light signature:** daylight from the top-right + editorial top/bottom rules that frame the section.
- **Use on:** Process (homepage), Smart Living, methodology blocks.
- **Avoid on:** warm lifestyle moments (this reads cool).

### GoldenComposition
- **Purpose:** the brand making a warm claim.
- **Light signature:** richer golden mesh + a glow from the bottom-left — the most present light scene.
- **Use on:** Portfolio Showcase (homepage), case-study landings.
- **Avoid on:** next to another warm scene.

### PremiumHalo
- **Purpose:** total focus on centered content.
- **Light signature:** one large centered glow, nothing else.
- **Use on:** Premium Trust, Testimonials (homepage), review walls, centered claims.
- **Avoid on:** strongly left-aligned layouts.

### DarkLuxury
- **Purpose:** the dramatic register (dark surfaces only).
- **Light signature:** golden light from above onto a dark amber/brown mesh + faint gold rules.
- **Use on:** genuinely dark full-bleed surfaces (estimator time-estimate band, future dark features).
- **Avoid on:** light surfaces; more than ~two per page.

### SoftGeometry
- **Purpose:** a soft, quiet wash for image-led showcases (name is historical — no literal geometry).
- **Light signature:** gentle daylight from the top-right over the faintest warm mesh; middle stays clear.
- **Use on:** Design Gallery (homepage), category landing sections.
- **Avoid on:** text-only sections — use MinimalEditorial.

### MinimalEditorial
- **Purpose:** near-blank trust surfaces.
- **Light signature:** faint top/bottom rules + whisper texture — almost nothing, on purpose.
- **Use on:** Before/After, legal pages, forms, estimator steps, dense comparisons.
- **Avoid on:** hero-adjacent or feature moments — it cannot carry emotional weight.

## Surface pairing

| Scene | Light (cream/ivory) | Dark (espresso) |
|---|---|---|
| EditorialLight | ✓ default | ✓ gold-tinted light |
| LuxuryAmbient | ✓ default | ✓ dark mesh |
| Architectural | ✓ default | ✓ gold-tinted light |
| GoldenComposition | ✓ default | ✓ dark mesh |
| PremiumHalo | ✓ default | ✓ stronger glow |
| DarkLuxury | ✗ never | ✓ default |
| SoftGeometry | ✓ default | ✓ gold-tinted light |
| MinimalEditorial | ✓ default | ✓ slightly stronger rules |

## Homepage rhythm map (implemented)

Every light section shares one `#F5EFE6` wall; scenes layer texture + a
light signature on top. Rhythm comes from light direction/warmth:

Hero (video) → Services `EditorialLight` → Process `Architectural` →
Trust `PremiumHalo` → Before/After `MinimalEditorial` → Design Gallery
`SoftGeometry` → Portfolio `GoldenComposition` → Walkthrough
`EditorialLight` → Furniture `LuxuryAmbient` → Smart Living
`Architectural` → Testimonials `PremiumHalo` → Closing CTA (image) →
Footer.

Every homepage section now consumes a scene — the previously hand-built
compositions in Premium Trust (concentric arcs + sphere + leaf) and
Furniture Collection (sphere + ring), and the Testimonials botanical
accent, were all removed in the restraint pass. All homepage sections are
light-surfaced; `DarkLuxury` serves genuinely dark surfaces elsewhere
(estimator bands, future features) within the two-dark-sections page rule.

Other pages receive their scene maps during the page-by-page responsive
audit (Milestone 6).
