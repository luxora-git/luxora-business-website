/**
 * Gallery Collections — curated editorial groupings of projects
 * (architecture §16). Collections are discoverable at
 * /gallery/collections/[slug] and featured in the Gallery Home
 * "Luxury Collections" rail.
 *
 * Collections deliberately avoid mirroring Category/Style routes;
 * they are thematic & mood-based curation (architecture §16.1).
 */

import { galleryProjects } from './projects';
import type { GalleryProject } from './types';

function encodePath(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
function ai(path: string): string {
  return encodePath(`/img/AI BASED/${path}`);
}
function real(path: string): string {
  return encodePath(`/img/PROJECT BASED/${path}`);
}

export type GalleryCollectionKind = 'curated' | 'style' | 'theme' | 'editorial';

export interface GalleryCollection {
  slug: string;
  kind: GalleryCollectionKind;
  label: string;
  eyebrow: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  projectSlugs: string[];
  /** Show on Gallery Home Luxury Collections rail */
  featuredOnHome: boolean;
  /** 0 = first in rail, ascending */
  homeOrder: number;
}

export const galleryCollections: GalleryCollection[] = [
  {
    slug: 'editors-choice',
    kind: 'editorial',
    label: "Editor's Choice",
    eyebrow: 'Curated Collection',
    shortDescription: 'The designs our team returns to, every time.',
    description:
      'Four spaces that defined the year — shortlisted by the Luxora editorial team for exceptional material quality, spatial efficiency, and the kind of finishing craft that photographs cannot fully capture.',
    heroImage: ai('LIVING BEDROOM DESIGNS/lr3.webp'),
    heroImageAlt: "Grand contemporary living room concept, Vaishali Nagar, Jaipur — Editor's Choice",
    projectSlugs: ['gp-01', 'gp-03', 'gp-05', 'gp-09'],
    featuredOnHome: true,
    homeOrder: 0,
  },
  {
    slug: 'luxury-living-rooms',
    kind: 'theme',
    label: 'Luxury Living Rooms',
    eyebrow: 'Curated Collection',
    shortDescription: 'Grand spaces designed for the art of living.',
    description:
      'Floor-to-ceiling drama, bespoke millwork, and finishes that reward a close look. These living rooms were built without compromise — the kind where guests forget to put down their drinks.',
    heroImage: real('LIVING ROOM DESIGN/Krish ji S.F. A01_View140000.webp'),
    heroImageAlt: 'Full-villa classic living hall, Civil Lines, Jaipur — Luxury Living Rooms',
    projectSlugs: ['gp-01', 'gp-02', 'gp-09'],
    featuredOnHome: true,
    homeOrder: 1,
  },
  {
    slug: 'compact-homes',
    kind: 'theme',
    label: 'Compact Homes Under ₹20L',
    eyebrow: 'Curated Collection',
    shortDescription: 'Small footprints, outsized impact.',
    description:
      'Proof that a thoughtful 400 sq ft feels more spacious than a cluttered 1200. These projects squeeze every centimetre for smarter storage, better light, and a quality of life that punches well above budget.',
    heroImage: ai('LIVING BEDROOM DESIGNS/lr6.webp'),
    heroImageAlt: 'Scandinavian smart living room concept, Raja Park, Jaipur — Compact Homes',
    projectSlugs: ['gp-02', 'gp-04', 'gp-07', 'gp-08'],
    featuredOnHome: true,
    homeOrder: 2,
  },
];

/** Resolve projectSlugs → full GalleryProject records */
export function getProjectsByCollection(collection: GalleryCollection): GalleryProject[] {
  return collection.projectSlugs
    .map((slug) => galleryProjects.find((p) => p.id === slug))
    .filter((p): p is GalleryProject => p !== undefined);
}

export function getGalleryCollection(slug: string): GalleryCollection | undefined {
  return galleryCollections.find((c) => c.slug === slug);
}

export function getHomeCollections(): GalleryCollection[] {
  return galleryCollections
    .filter((c) => c.featuredOnHome)
    .sort((a, b) => a.homeOrder - b.homeOrder);
}
