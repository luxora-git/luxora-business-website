import GalleryTag from '../common/GalleryTag';

export interface GalleryPopularSearchesProps {
  terms: string[];
  onSelect: (term: string) => void;
  label?: string;
  className?: string;
}

/**
 * GalleryPopularSearches — a quiet chip row of popular search terms shown
 * beneath the Hero search bar before the visitor has typed anything.
 * Reuses `GalleryTag` rather than introducing a second chip style.
 */
export default function GalleryPopularSearches({ terms, onSelect, label = 'Popular:', className = '' }: GalleryPopularSearchesProps) {
  if (terms.length === 0) return null;

  return (
    <div className={`flex items-center gap-2.5 overflow-x-auto flex-nowrap md:flex-wrap ${className}`} style={{ scrollbarWidth: 'none' }}>
      <span className="text-[11px] font-light flex-shrink-0" style={{ color: 'rgba(253,250,246,0.65)' }}>
        {label}
      </span>
      {terms.map((term) => (
        <span key={term} className="flex-shrink-0">
          <GalleryTag label={term} size="sm" onClick={() => onSelect(term)} />
        </span>
      ))}
    </div>
  );
}
