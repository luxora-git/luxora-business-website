'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GalleryHeroSearch from '@/components/v4/gallery/layout/GalleryHeroSearch';

/**
 * HeroSearchController — the only client-interactive piece of the Gallery
 * Home Hero. Deliberately just the search input, nothing beneath it — the
 * Hero's job is a confident opening statement plus one way in, not a second
 * navigation surface (that's what Browse by Room/Style are for). Keeps
 * search state local, navigates to `?q=[query]#gallery-browser` on submit so
 * GalleryBrowser initialises from the URL param. Colocated with Gallery Home
 * rather than promoted to the library because it is specific to this page's
 * URL structure.
 */
export default function HeroSearchController() {
  const [value, setValue] = useState('');
  const router = useRouter();

  const handleSubmit = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/gallery?q=${encodeURIComponent(trimmed)}#gallery-browser`);
  };

  return (
    <GalleryHeroSearch
      value={value}
      onChange={setValue}
      onSubmit={handleSubmit}
      placeholder="Search living rooms, kitchens, Scandinavian…"
    />
  );
}
