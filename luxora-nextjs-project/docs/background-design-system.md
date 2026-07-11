# Luxora Background Design System

`components/v4/background` — a global design-system asset for every Luxora
page (homepage, estimator, gallery, portfolio, services, contact, future
landing pages). Two layers:

1. **Primitives** — single visual ingredients. v1: `LuxuryGrain`,
   `LuxuryHalo`, `LuxuryContour`, `LuxuryBlueprint`, `LuxuryMarble`,
   `LuxuryDivider`, `LuxuryFrame`, `LuxuryMesh`, `LuxurySpotlight`,
   `LuxuryGeometry`. v2 (the "painted environment" set): `LuxurySphere`
   (matte ceramic orb with cast shadow), `LuxuryRidges` (large
   fabric-ridge / concentric-ring line bundles), `LuxuryBotanical`
   (palm-shadow and bas-relief frond), `LuxuryArch` (nested hairline
   archways), `LuxuryStucco` (plaster mottle under the fine grain).
   Pure SVG/CSS, zero image requests.
2. **Scenes** (`background/scenes`) — named, art-directed compositions of
   primitives with hand-tuned positions and opacities. Sections consume a
   scene by name; they do not assemble primitives ad hoc.

## Global rules

- **Content is always the hero.** Scenes live at `z-0` under a `z-10`
  content wrapper, `pointer-events-none`, `aria-hidden`. Host section must
  be `relative overflow-hidden`.
- **Tone-on-tone, at scale (v2 principle):** background forms may be LARGE
  and clearly visible — but only in *form*, never in *contrast*. Big
  cream-on-cream shapes (spheres, ridges, arches, leaf shadows) read as a
  crafted plaster wall; small high-contrast accents read as CSS clip-art.
  The test is not "can I see it?" but "does it pull the eye from content?"
- **Materiality:** prefer shaded, dimensional elements (highlight + ambient
  occlusion + cast shadow) over flat hairlines wherever the element
  represents an object rather than line work.
- **Rhythm:** adjacent sections must not share a scene. Statement scenes
  (`GoldenComposition`, `DarkLuxury`) need quiet neighbors. **At most two
  dark sections per page** (locked decision) — dark moments are drama, and
  repeated drama stops being drama.
- **API:** every scene takes `{ id, surface?: 'light'|'dark', intensity?:
  'whisper'|'standard' }`. `id` must be unique per instance (namespaces SVG
  filters). Use `whisper` on content-dense surfaces.
- **No motion.** Scenes are static by design — reduced-motion safe.

## Scene catalog

### EditorialLight
- **Purpose:** the "resting" scene between statement moments.
- **Visual intent:** daylight from the top-left, hairline top/bottom rules, whisper grain — calm magazine-page air.
- **Ideal usage:** clean content sections right after a hero; service overviews.
- **Use on:** Services (homepage), service-page overviews, about sections.
- **Avoid on:** sections needing warmth or drama; two in a row reads flat.

### LuxuryAmbient
- **Purpose:** warmth and domesticity.
- **Visual intent:** gold/cream mesh washes + a low glow rising bottom-right — evening lamplight in a finished home.
- **Ideal usage:** furniture, materials, lifestyle storytelling.
- **Use on:** Furniture Collection, materials/finishes sections.
- **Avoid on:** dense data or forms — warmth competes with inputs.

### Architectural
- **Purpose:** competence, precision, process.
- **Visual intent:** contour line work in a corner, corner marks mounting the section, outlined squares on point — a page from a drawing set.
- **Ideal usage:** process / how-it-works, consultancy capability.
- **Use on:** Process (homepage), Smart Living, service methodology blocks.
- **Avoid on:** photography-dense grids; estimator question cards (geometry fights option borders); adjacent to SoftGeometry.

### GoldenComposition
- **Purpose:** the brand making a claim.
- **Visual intent:** large golden contour sweep top-right, warm glow from the left, gold corner marks — the most present light scene.
- **Ideal usage:** portfolio/completed work, awards, signature offerings.
- **Use on:** Portfolio Showcase (homepage), case-study landings.
- **Avoid on:** next to another gold-forward scene; behind dense photo grids.

### PremiumHalo
- **Purpose:** total focus on centered content.
- **Visual intent:** one large centered glow, nothing else.
- **Ideal usage:** testimonials, a centered stat or claim.
- **Use on:** Testimonials (homepage), review walls, award counts.
- **Avoid on:** left-aligned editorial layouts — centered light fights an off-center composition.

### DarkLuxury
- **Purpose:** the dramatic register.
- **Visual intent:** golden light entering from above onto a dark amber/brown mesh, faint gold rules — espresso feature moment.
- **Ideal usage:** full-bleed dark sections.
- **Use on:** Premium Trust, Virtual Walkthrough, estimator time-estimate band.
- **Avoid on:** light surfaces; more than ~two per page — repeated drama stops being drama.

### SoftGeometry
- **Purpose:** quiet visual interest around content-heavy showcases.
- **Visual intent:** outlined squares on point, tiny gold diamonds, one big off-canvas arc, soft light top-right — edges alive, middle clear.
- **Ideal usage:** gallery/category showcases, card grids.
- **Use on:** Design Gallery (homepage), category landing sections.
- **Avoid on:** text-heavy sections (accents read as clutter); adjacent to Architectural (shared vocabulary blurs).

### MinimalEditorial
- **Purpose:** decoration-free trust surfaces.
- **Visual intent:** faint top/bottom rules + whisper grain — almost nothing, on purpose.
- **Ideal usage:** legal pages, forms, estimator steps, dense comparisons.
- **Use on:** contact/legal pages, consultation modal surfaces, Before/After.
- **Avoid on:** hero-adjacent or feature moments — it cannot carry emotional weight.

## Surface pairing

| Scene | Light (cream/ivory) | Dark (espresso) |
|---|---|---|
| EditorialLight | ✓ default | ✓ gold-tinted light |
| LuxuryAmbient | ✓ default | ✓ dark mesh |
| Architectural | ✓ default | ✓ lighter gold lines |
| GoldenComposition | ✓ default | ✓ lighter gold lines |
| PremiumHalo | ✓ default | ✓ stronger glow |
| DarkLuxury | ✗ never | ✓ default |
| SoftGeometry | ✓ default | ✓ lighter gold lines |
| MinimalEditorial | ✓ default | ✓ slightly stronger rules |

## Homepage rhythm map (target)

Hero (video) → Services `EditorialLight` → Process `Architectural` →
Trust `DarkLuxury` → Before/After `MinimalEditorial` → Design Gallery
`SoftGeometry` → Portfolio `GoldenComposition` → Walkthrough `DarkLuxury`
→ Furniture `LuxuryAmbient` → Smart Living `Architectural` → Testimonials
`PremiumHalo` → Closing CTA (image) → Footer.

Other pages receive their scene maps during the page-by-page responsive
audit (Milestone 6).
