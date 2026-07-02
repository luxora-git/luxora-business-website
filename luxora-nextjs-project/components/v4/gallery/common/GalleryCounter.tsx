export interface GalleryCounterProps {
  current: number;
  total: number;
  className?: string;
  light?: boolean;
}

/**
 * GalleryCounter — the "01 / 08" tabular counter shared by rail navigation
 * and the lightbox. Always 1-indexed for display, zero-padded.
 */
export default function GalleryCounter({ current, total, className = '', light = false }: GalleryCounterProps) {
  return (
    <span
      className={`tabular-nums text-[11px] font-semibold tracking-[0.16em] ${className}`}
      style={{ color: light ? 'rgba(253,250,246,0.7)' : '#9C7B68' }}
    >
      {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
  );
}
