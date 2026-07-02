import { galleryCategories } from './categories';
import type { GalleryFilterFacets, GalleryFilterState, GalleryProject } from './types';

export const AREA_BUCKETS = [
  { label: '<1,000 sq ft', min: 0, max: 999 },
  { label: '1,000–2,000 sq ft', min: 1000, max: 1999 },
  { label: '2,000–3,000 sq ft', min: 2000, max: 2999 },
  { label: '3,000+ sq ft', min: 3000, max: Infinity },
];

export const BUDGET_BUCKETS = [
  { label: 'Under ₹15L', min: 0, max: 14.99 },
  { label: '₹15L – ₹30L', min: 15, max: 30 },
  { label: '₹30L – ₹50L', min: 30, max: 50 },
  { label: '₹50L – ₹75L', min: 50, max: 75 },
  { label: '₹75L+', min: 75, max: Infinity },
];

export function buildFacets(projects: GalleryProject[]): GalleryFilterFacets {
  const styles = Array.from(new Set(projects.map((p) => p.meta.style))).sort();
  const propertyTypes = Array.from(new Set(projects.map((p) => p.meta.propertyType))).sort();
  const cities = Array.from(new Set(projects.map((p) => p.meta.city))).sort();

  return {
    categories: galleryCategories.map((c) => ({ slug: c.slug, label: c.label })),
    styles,
    propertyTypes,
    cities,
    areaBuckets: AREA_BUCKETS,
    budgetBuckets: BUDGET_BUCKETS,
  };
}

export const EMPTY_FILTER_STATE: GalleryFilterState = {
  category: null,
  style: null,
  propertyType: null,
  city: null,
  areaBucket: null,
  budgetBucket: null,
  query: '',
};

function matchesBucket(value: number, bucketLabel: string, buckets: typeof AREA_BUCKETS) {
  const bucket = buckets.find((b) => b.label === bucketLabel);
  if (!bucket) return true;
  return value >= bucket.min && value <= bucket.max;
}

export function filterProjects(projects: GalleryProject[], filters: GalleryFilterState): GalleryProject[] {
  const query = filters.query.trim().toLowerCase();

  return projects.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.style && p.meta.style !== filters.style) return false;
    if (filters.propertyType && p.meta.propertyType !== filters.propertyType) return false;
    if (filters.city && p.meta.city !== filters.city) return false;
    if (filters.areaBucket && !matchesBucket(p.meta.areaSqFt, filters.areaBucket, AREA_BUCKETS)) return false;
    if (filters.budgetBucket && !matchesBucket(p.meta.budgetLakh, filters.budgetBucket, BUDGET_BUCKETS)) return false;

    if (query) {
      const haystack = [p.title, p.category, p.meta.style, p.meta.location, p.meta.city, p.description]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });
}
