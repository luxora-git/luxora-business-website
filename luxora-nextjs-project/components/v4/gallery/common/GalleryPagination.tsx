import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import GalleryArrowButton from './GalleryArrowButton';

export interface GalleryPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

/**
 * GalleryPagination — reserved for future paginated grids (Collections hub,
 * large Category pages once virtualization lands, architecture §12/§23).
 * Not wired into any page yet — a self-contained, fully working control.
 */
export default function GalleryPagination({ page, totalPages, onChange, className = '' }: GalleryPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className={`flex items-center justify-center gap-3 ${className}`}>
      <GalleryArrowButton direction="prev" size="sm" disabled={page <= 1} onClick={() => onChange(page - 1)} />

      <ul className="flex items-center gap-1.5">
        {pages.map((p) => {
          const isActive = p === page;
          return (
            <li key={p}>
              <button
                type="button"
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Page ${p}`}
                onClick={() => onChange(p)}
                className="w-8 h-8 rounded-full text-[11px] font-semibold tabular-nums transition-all duration-300"
                style={
                  isActive
                    ? { background: luxoraColors.gold, color: '#1C1005' }
                    : { color: luxoraColors.softBrown, background: 'transparent' }
                }
              >
                {p}
              </button>
            </li>
          );
        })}
      </ul>

      <GalleryArrowButton direction="next" size="sm" disabled={page >= totalPages} onClick={() => onChange(page + 1)} />
    </nav>
  );
}
