'use client';

import { Children, useRef, useState, type ReactNode } from 'react';
import GalleryRailHeader from './GalleryRailHeader';
import GalleryRailNavigation from './GalleryRailNavigation';
import GalleryHorizontalScroller from '../mobile/GalleryHorizontalScroller';

export interface GalleryRailProps {
  /** `GalleryCompactCard` (or any fixed-width card) instances — the rail manifest concept from architecture §21.2 in component form. */
  children: ReactNode;
  eyebrow?: string;
  title: string;
  subheading?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  /** Approximate per-card width in px, used to compute the desktop "advance by visible count" scroll step. Match the child cards' own width. */
  cardWidth?: number;
  className?: string;
}

/**
 * GalleryRail — the one horizontal-rail shell every signal-backed and
 * curated rail (Trending, Recently Added) composes from. Desktop: arrow
 * navigation advances by however many cards currently fit in view. Mobile:
 * native scroll-snap via `GalleryHorizontalScroller`, no arrows rendered.
 */
export default function GalleryRail({ children, eyebrow, title, subheading, viewAllHref, viewAllLabel, cardWidth = 260, className = '' }: GalleryRailProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);
  const total = Children.count(children);
  const gapPx = 20;

  const step = () => {
    const el = scrollerRef.current;
    if (!el) return cardWidth + gapPx;
    const visible = Math.max(1, Math.floor(el.clientWidth / (cardWidth + gapPx)));
    return visible * (cardWidth + gapPx);
  };

  const scrollBy = (delta: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: 'smooth' });
    const next = Math.min(total, Math.max(1, current + (delta > 0 ? 1 : -1)));
    setCurrent(next);
  };

  return (
    <div className={className}>
      <div className="flex items-start justify-between gap-6">
        <GalleryRailHeader eyebrow={eyebrow} title={title} subheading={subheading} viewAllHref={viewAllHref} viewAllLabel={viewAllLabel} className="flex-1 mb-0" />
        <GalleryRailNavigation current={current} total={total} onPrev={() => scrollBy(-step())} onNext={() => scrollBy(step())} className="mt-2" />
      </div>

      <div className="mt-2">
        <GalleryHorizontalScroller ref={scrollerRef}>
          {Children.map(children, (child) => (
            <div className="snap-start flex-shrink-0">{child}</div>
          ))}
        </GalleryHorizontalScroller>
      </div>
    </div>
  );
}
