import GalleryArrowButton from '../common/GalleryArrowButton';
import GalleryCounter from '../common/GalleryCounter';

export interface GalleryRailNavigationProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

/**
 * GalleryRailNavigation — prev/next arrows + a "01 / 08" counter, the one
 * desktop navigation control every `GalleryRail` uses identically (Visual
 * Language Guide §7 — no rail invents its own arrow placement).
 */
export default function GalleryRailNavigation({ current, total, onPrev, onNext, className = '' }: GalleryRailNavigationProps) {
  if (total <= 1) return null;

  return (
    <div className={`hidden md:flex items-center gap-4 ${className}`}>
      <GalleryArrowButton direction="prev" onClick={onPrev} disabled={current <= 1} />
      <GalleryCounter current={current} total={total} />
      <GalleryArrowButton direction="next" onClick={onNext} disabled={current >= total} />
    </div>
  );
}
