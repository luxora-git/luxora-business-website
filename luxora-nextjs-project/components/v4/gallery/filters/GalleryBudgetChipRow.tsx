import Link from 'next/link';
import { BUDGET_BUCKETS } from '@/lib/content/gallery/facets';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export interface GalleryBudgetChipRowProps {
  /** Base URL of the gallery page (e.g. `/luxury-v4/gallery`). */
  baseUrl: string;
  className?: string;
}

/**
 * GalleryBudgetChipRow — a row of tappable budget-range chips that pre-fill
 * the Full Gallery Browser filter on click. Each chip links to
 * `[baseUrl]?budgetBucket=[label]#gallery-browser` so the URL is shareable
 * and the GalleryBrowser initialises from the URL param on mount.
 *
 * This is a navigation shortcut, not a stateful filter — no `useState` needed.
 */
export default function GalleryBudgetChipRow({ baseUrl, className = '' }: GalleryBudgetChipRowProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-3 md:gap-4 ${className}`}>
      {BUDGET_BUCKETS.map(({ label }) => (
        <Link
          key={label}
          href={`${baseUrl}?budgetBucket=${encodeURIComponent(label)}#gallery-browser`}
          className="inline-flex items-center rounded-full px-5 py-2.5 text-[11px] font-bold tracking-[0.09em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,162,39,0.24)]"
          style={{
            border: `1.5px solid ${luxoraColors.gold}`,
            color: luxoraColors.espresso,
            background: 'transparent',
          }}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
