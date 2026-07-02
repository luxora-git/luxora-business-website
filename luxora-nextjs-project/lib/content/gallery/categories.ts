import type { GalleryCategory } from './types';

function aiConcept(path: string): string {
  return `/img/AI BASED/${path}`.split('/').map(encodeURIComponent).join('/');
}
function projectImage(path: string): string {
  return `/img/PROJECT BASED/${path}`.split('/').map(encodeURIComponent).join('/');
}

export const galleryCategories: GalleryCategory[] = [
  {
    slug: 'living-room',
    label: 'Living Rooms',
    eyebrow: 'Gallery',
    description: 'Where every home begins — layered seating, considered lighting, and a single design language carried through every detail.',
    heroImage: aiConcept('LIVING BEDROOM DESIGNS/lr1.webp'),
    heroImageAlt: 'Luxury living room concept with custom TV wall and layered lighting',
  },
  {
    slug: 'bedroom',
    label: 'Bedrooms',
    eyebrow: 'Gallery',
    description: 'Quiet, considered spaces built around rest — bespoke wardrobes, soft textiles, and ambient lighting tuned for the end of the day.',
    heroImage: aiConcept('MASTER BEDROOM DESIGNS/mb1.webp'),
    heroImageAlt: 'Luxury master bedroom concept with layered ambient lighting',
  },
  {
    slug: 'kitchen',
    label: 'Kitchens',
    eyebrow: 'Gallery',
    description: 'Modular kitchens engineered for everyday life — intelligent storage, premium countertops, and German-grade fittings throughout.',
    heroImage: aiConcept('MODULAR KITCHEN/mk1.webp'),
    heroImageAlt: 'Modern modular kitchen concept with quartz countertops',
  },
  {
    slug: 'wardrobes',
    label: 'Wardrobes',
    eyebrow: 'Gallery',
    description: 'Floor-to-ceiling storage that disappears into the architecture — soft-close hardware, ambient lighting, and bespoke layouts.',
    heroImage: aiConcept('WARDROBE DESIGN/WD1.webp'),
    heroImageAlt: 'Floor-to-ceiling designer wardrobe concept with ambient lighting',
  },
  {
    slug: 'full-home',
    label: 'Full Homes',
    eyebrow: 'Gallery',
    description: 'Complete, end-to-end residences — every room designed under one language, by one team, on one handover date.',
    heroImage: projectImage('LIVING ROOM DESIGN/Vizora House G.F. A01_View010000.webp'),
    heroImageAlt: 'Full home living room, Vizora House, Jaipur',
  },
  {
    slug: 'office',
    label: 'Office Interiors',
    eyebrow: 'Gallery',
    description: 'Workspaces built for identity and performance — brand-driven interiors for offices, studios and commercial spaces.',
    heroImage: aiConcept('HOME OFFICE/ofc1.webp'),
    heroImageAlt: 'Styled home office concept with designer seating',
  },
];

export function getGalleryCategory(slug: string): GalleryCategory | undefined {
  return galleryCategories.find((c) => c.slug === slug);
}
