/**
 * Gallery Style taxonomy — the secondary cross-cutting routing axis
 * (architecture §8, promoted from filter facet to indexable route).
 * Slugs match the values already present in GalleryProject.meta.style
 * across projects.ts; these records add the editorial copy and hero image
 * needed to render the Style page and the Browse by Style mosaic.
 */

function encodePath(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
function ai(path: string): string {
  return encodePath(`/img/AI BASED/${path}`);
}

export interface GalleryStyle {
  slug: string;
  label: string;
  eyebrow: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  /** Design count — maintained manually until a data-layer accessor exists; used to determine mosaic tile size (most designs → 'lg' slot). */
  designCount: number;
}

export const galleryStyles: GalleryStyle[] = [
  {
    slug: 'contemporary',
    label: 'Contemporary',
    eyebrow: 'Gallery',
    description: 'Warm materials, clean geometry, and layers of natural light — Contemporary design at its Luxora best.',
    heroImage: ai('LIVING BEDROOM DESIGNS/lr9.webp'),
    heroImageAlt: 'Grand contemporary living room concept with custom millwork',
    designCount: 3,
  },
  {
    slug: 'modern',
    label: 'Modern',
    eyebrow: 'Gallery',
    description: 'Precision craft, restrained palettes, and spaces that perform as well as they photograph.',
    heroImage: ai('MODULAR KITCHEN/mk6.webp'),
    heroImageAlt: 'Modern modular kitchen concept with quartz countertops',
    designCount: 2,
  },
  {
    slug: 'luxury',
    label: 'Luxury',
    eyebrow: 'Gallery',
    description: 'Bespoke millwork, premium materials, and a hotel-suite quality of finish in every room.',
    heroImage: ai('MASTER BEDROOM DESIGNS/mb10.webp'),
    heroImageAlt: 'Luxury master bedroom suite concept with walk-in wardrobe',
    designCount: 2,
  },
  {
    slug: 'classic',
    label: 'Classic',
    eyebrow: 'Gallery',
    description: 'Heritage-inspired details, handcrafted finishes, and an architecture that improves with time.',
    heroImage: ai('DINING ROOM DESIGN/dr2.webp'),
    heroImageAlt: 'Classic heritage-inspired dining room concept',
    designCount: 2,
  },
  {
    slug: 'minimal',
    label: 'Minimal',
    eyebrow: 'Gallery',
    description: 'Everything with purpose, nothing without — spaces where restraint is the truest form of luxury.',
    heroImage: ai('WARDROBE DESIGN/wd6.webp'),
    heroImageAlt: 'Minimal floor-to-ceiling wardrobe concept with ambient lighting',
    designCount: 2,
  },
  {
    slug: 'scandinavian',
    label: 'Scandinavian',
    eyebrow: 'Gallery',
    description: 'Light tones, honest materials, and the Scandinavian belief that a considered small home beats a cluttered large one.',
    heroImage: ai('LIVING BEDROOM DESIGNS/lr10.webp'),
    heroImageAlt: 'Scandinavian-style smart living room concept with integrated lighting',
    designCount: 1,
  },
];

export function getGalleryStyle(slug: string): GalleryStyle | undefined {
  return galleryStyles.find((s) => s.slug === slug);
}
