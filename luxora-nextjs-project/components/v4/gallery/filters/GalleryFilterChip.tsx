import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export interface GalleryFilterChipProps {
  label: string;
  active?: boolean;
  onClick: () => void;
  /** Renders a small "×" affordance for an already-applied filter chip (e.g. in an active-filters summary row). */
  removable?: boolean;
  className?: string;
}

/**
 * GalleryFilterChip — the single chip control reused by `GalleryFilterBar`,
 * `GalleryBottomFilterSheet`, and any active-filter summary row. The same
 * visual chip every facet (category, style, budget, area, …) renders as.
 */
export default function GalleryFilterChip({ label, active = false, onClick, removable = false, className = '' }: GalleryFilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.06em] transition-all duration-300 ${className}`}
      style={
        active
          ? { background: luxoraColors.gold, color: '#1C1005' }
          : { background: 'rgba(253,250,246,0.8)', color: '#6B4C3B', border: '1px solid rgba(160,120,80,0.22)' }
      }
    >
      {label}
      {removable && active && <span aria-hidden="true">✕</span>}
    </button>
  );
}
