import type { ReactNode } from 'react';
import GalleryFilterChip from './GalleryFilterChip';

export interface GalleryFilterBarGroup {
  label: string;
  options: { label: string; value: string }[];
  active: string | null;
  onSelect: (value: string | null) => void;
}

export interface GalleryFilterBarProps {
  /** Primary, always-visible facet groups rendered as a chip row (e.g. Category pills). Pass an empty array to hide this row entirely. */
  groups: GalleryFilterBarGroup[];
  /** Rendered alongside the chip row — typically a `GallerySearchBar`. */
  searchSlot?: ReactNode;
  /** Rendered at the trailing edge — typically a `GallerySortDropdown` or a "More Filters" trigger. */
  trailingSlot?: ReactNode;
  /** Number of active secondary facets, shown as a badge on a "Filters" trigger if the caller renders one via `trailingSlot`. */
  activeCount?: number;
  className?: string;
}

/**
 * GalleryFilterBar — the generic filter-bar shell: a primary chip row +
 * search + a trailing slot. Decoupled from any specific facet vocabulary
 * (category/style/budget/…) — the calling page supplies `groups` built
 * from its own content layer, never hardcoded here.
 */
export default function GalleryFilterBar({ groups, searchSlot, trailingSlot, className = '' }: GalleryFilterBarProps) {
  return (
    <div className={className}>
      {groups.map((group) => (
        <div key={group.label} className="flex flex-wrap gap-2.5 mb-5">
          <GalleryFilterChip label="All" active={!group.active} onClick={() => group.onSelect(null)} />
          {group.options.map((opt) => (
            <GalleryFilterChip
              key={opt.value}
              label={opt.label}
              active={group.active === opt.value}
              onClick={() => group.onSelect(group.active === opt.value ? null : opt.value)}
            />
          ))}
        </div>
      ))}

      {(searchSlot || trailingSlot) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {searchSlot && <div className="flex-1">{searchSlot}</div>}
          {trailingSlot}
        </div>
      )}
    </div>
  );
}
