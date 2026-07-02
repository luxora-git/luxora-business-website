'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import GalleryFilterBar from './GalleryFilterBar';
import GalleryGrid from './GalleryGrid';
import GalleryEmptyState from './GalleryEmptyState';
import { buildFacets, EMPTY_FILTER_STATE, filterProjects } from '@/lib/content/gallery/facets';
import type { GalleryFilterState, GalleryProject } from '@/lib/content/gallery/types';

export interface GalleryBrowserProps {
  projects: GalleryProject[];
  /** Fixed category for Category pages — hides the category pill row and locks the filter. */
  lockedCategory?: string;
  /** Show the first matching result as a large `featured` card (Home page only). */
  showFeatured?: boolean;
}

const FILTER_KEYS: (keyof GalleryFilterState)[] = ['category', 'style', 'propertyType', 'city', 'areaBucket', 'budgetBucket', 'query'];

/**
 * GalleryBrowser — the one client component every filterable/searchable
 * gallery listing (Home, Category) renders through. Filter state is
 * synced to the URL query string (shallow, no reload) so results stay
 * shareable and bookmarkable.
 */
export default function GalleryBrowser({ projects, lockedCategory, showFeatured }: GalleryBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<GalleryFilterState>(() => ({
    ...EMPTY_FILTER_STATE,
    category: lockedCategory ?? (searchParams.get('category') || null),
    style: searchParams.get('style') || null,
    propertyType: searchParams.get('propertyType') || null,
    city: searchParams.get('city') || null,
    areaBucket: searchParams.get('areaBucket') || null,
    budgetBucket: searchParams.get('budgetBucket') || null,
    query: searchParams.get('q') || '',
  }));

  const syncUrl = useCallback(
    (next: GalleryFilterState) => {
      const params = new URLSearchParams();
      if (!lockedCategory && next.category) params.set('category', next.category);
      if (next.style) params.set('style', next.style);
      if (next.propertyType) params.set('propertyType', next.propertyType);
      if (next.city) params.set('city', next.city);
      if (next.areaBucket) params.set('areaBucket', next.areaBucket);
      if (next.budgetBucket) params.set('budgetBucket', next.budgetBucket);
      if (next.query) params.set('q', next.query);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, lockedCategory]
  );

  const handleChange = useCallback(
    (partial: Partial<GalleryFilterState>) => {
      setFilters((prev) => {
        const next = { ...prev, ...partial };
        syncUrl(next);
        return next;
      });
    },
    [syncUrl]
  );

  const handleClear = useCallback(() => {
    const next: GalleryFilterState = { ...EMPTY_FILTER_STATE, category: lockedCategory ?? null };
    setFilters(next);
    syncUrl(next);
  }, [lockedCategory, syncUrl]);

  const facets = useMemo(() => buildFacets(projects), [projects]);
  const results = useMemo(() => filterProjects(projects, filters), [projects, filters]);

  const hasActiveFilters = FILTER_KEYS.some((key) => (key === 'category' && lockedCategory ? false : Boolean(filters[key])));

  return (
    <div>
      <GalleryFilterBar
        facets={facets}
        filters={filters}
        onChange={handleChange}
        onClear={handleClear}
        hideCategoryPills={Boolean(lockedCategory)}
      />

      {results.length === 0 ? (
        <GalleryEmptyState onClear={hasActiveFilters ? handleClear : undefined} />
      ) : (
        <GalleryGrid projects={results} featuredIndex={showFeatured ? 0 : null} />
      )}
    </div>
  );
}
