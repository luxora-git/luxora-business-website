import Link from 'next/link';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export interface GallerySearchSuggestion {
  label: string;
  href: string;
  /** Optional secondary line (e.g. category/style context). */
  meta?: string;
}

export interface GallerySearchSuggestionsProps {
  suggestions: GallerySearchSuggestion[];
  onSelect?: (suggestion: GallerySearchSuggestion) => void;
  className?: string;
}

/**
 * GallerySearchSuggestions — the dropdown list rendered beneath
 * `GallerySearchBar` while typing. Purely presentational over caller-
 * supplied suggestions — no search/matching logic lives here.
 */
export default function GallerySearchSuggestions({ suggestions, onSelect, className = '' }: GallerySearchSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <ul
      role="listbox"
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{ background: '#FDFAF6', border: '1px solid rgba(201,162,39,0.20)', boxShadow: '0 16px 40px rgba(20,14,6,0.14)' }}
    >
      {suggestions.map((s) => (
        <li key={s.href}>
          <Link
            href={s.href}
            role="option"
            onClick={() => onSelect?.(s)}
            className="flex items-center justify-between gap-3 px-5 py-3 transition-colors duration-200 hover:bg-[rgba(201,162,39,0.08)]"
          >
            <span className="text-[13.5px] font-light" style={{ color: luxoraColors.espresso }}>
              {s.label}
            </span>
            {s.meta && (
              <span className="text-[10px] tracking-[0.08em] uppercase flex-shrink-0" style={{ color: '#9C7B68' }}>
                {s.meta}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
