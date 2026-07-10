'use client';

import { useRef, useState, type ReactNode } from 'react';
import V4SectionHeader from '../V4SectionHeader';

/** Gap between mobile rail slides — must match the rail's Tailwind `gap-4`. */
const RAIL_GAP_PX = 16;

export interface ShowcaseHeader {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description?: string;
}

export interface ShowcaseProps<T> {
  header: ShowcaseHeader;
  /** Pages shown by the desktop track slider (lg+). */
  desktopPages: T[][];
  /** Pages shown by the swipeable mobile/tablet rail (below lg). May chunk
   * differently from desktop — e.g. Portfolio shows 3 per desktop page but
   * one editorial card per mobile page. */
  mobilePages: T[][];
  /** Renders one desktop page's content (already inside a full-width slide). */
  renderDesktopPage: (page: T[], pageIndex: number) => ReactNode;
  /** Renders one mobile page's content (already inside a full-width snap slide). */
  renderMobilePage: (page: T[], pageIndex: number) => ReactNode;
  /** Accessible label for the swipe region, e.g. "Design gallery — swipe to browse". */
  ariaLabel: string;
}

/**
 * Showcase — the shared carousel architecture every image-led category /
 * collection section renders through (Design Gallery, Portfolio Showcase,
 * future Interior Element / Product category sections).
 *
 * What it owns — the parts that were previously copy-pasted per section:
 *   • header row (V4SectionHeader) with desktop arrows + page counter
 *   • desktop translateX track slider (lg+)
 *   • mobile/tablet snap-scroll rail (native CSS scroll-snap — browser
 *     compositor momentum, no JS drag handling, no lag) with per-page
 *     dots + arrows kept in sync via onScroll
 *
 * What it deliberately does NOT own: the section shell (background, id,
 * bottom CTAs) and the card design — those stay with each section, passed
 * in via the page render props. Cards differ per section by design;
 * generalizing them would trade clarity for reuse. Shared card styles that
 * ARE generic live next door (ShowcaseOverlayCard, ShowcaseMosaicPage).
 */
export default function Showcase<T>({
  header,
  desktopPages,
  mobilePages,
  renderDesktopPage,
  renderMobilePage,
  ariaLabel,
}: ShowcaseProps<T>) {
  const [current, setCurrent] = useState(0);
  /** Mobile rail's own page index — separate from `current` so swiping on
   * mobile never fights the desktop track. */
  const [railIndex, setRailIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const desktopTotal = desktopPages.length;
  const mobileTotal = mobilePages.length;

  const next = () => setCurrent((p) => (p + 1) % desktopTotal);
  const prev = () => setCurrent((p) => (p - 1 + desktopTotal) % desktopTotal);

  /** Width of one rail snap step: a full slide plus the gap after it. */
  const railStep = () => {
    const first = railRef.current?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + RAIL_GAP_PX : 0;
  };

  const scrollRailTo = (index: number) => {
    railRef.current?.scrollTo({ left: index * railStep(), behavior: 'smooth' });
  };

  const scrollRail = (direction: 1 | -1) => {
    scrollRailTo(Math.min(mobileTotal - 1, Math.max(0, railIndex + direction)));
  };

  const handleRailScroll = () => {
    const rail = railRef.current;
    const step = railStep();
    if (!rail || step === 0) return;
    setRailIndex(Math.min(mobileTotal - 1, Math.max(0, Math.round(rail.scrollLeft / step))));
  };

  return (
    <>
      {/* ── Header row + desktop arrows/counter ─────────────────────── */}
      <div className="mb-12 flex items-end justify-between md:mb-16" data-v4-reveal-heading>
        <div className="flex-1">
          <V4SectionHeader
            eyebrow={header.eyebrow}
            title={header.title}
            titleItalic={header.titleItalic}
            description={header.description}
            centered={false}
          />
        </div>

        <div className="mb-14 hidden flex-shrink-0 items-center gap-3 pl-8 lg:flex">
          <button
            onClick={prev}
            className="group flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 hover:border-[#1C1005] hover:bg-[#1C1005]"
            style={{ borderColor: 'rgba(160,120,80,0.30)', background: '#FDFAF6' }}
            aria-label="Previous"
          >
            <svg className="h-4 w-4 transition-colors duration-300 group-hover:stroke-[#C8A44A]" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="tabular-nums text-[11px] font-semibold tracking-[0.16em]" style={{ color: '#9C7B68' }}>
            {String(current + 1).padStart(2, '0')} / {String(desktopTotal).padStart(2, '0')}
          </span>

          <button
            onClick={next}
            className="group flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 hover:border-[#1C1005] hover:bg-[#1C1005]"
            style={{ borderColor: 'rgba(160,120,80,0.30)', background: '#FDFAF6' }}
            aria-label="Next"
          >
            <svg className="h-4 w-4 transition-colors duration-300 group-hover:stroke-[#C8A44A]" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Desktop track slider (lg+) ───────────────────────────────── */}
      <div className="hidden overflow-hidden lg:block" data-v4-reveal>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {desktopPages.map((page, i) => (
            <div key={i} className="w-full flex-shrink-0">
              {renderDesktopPage(page, i)}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile / tablet snap rail (below lg) ─────────────────────── */}
      <div className="lg:hidden" data-v4-reveal>
        <div
          ref={railRef}
          onScroll={handleRailScroll}
          role="region"
          aria-label={ariaLabel}
          className="showcase-rail flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 -mx-6 px-6 sm:-mx-12 sm:px-12"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {mobilePages.map((page, i) => (
            <div key={i} className="w-full flex-shrink-0 snap-center">
              {renderMobilePage(page, i)}
            </div>
          ))}
        </div>

        {/* Rail nav — dots represent pages, arrows move one page */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => scrollRail(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(160,120,80,0.30)]"
            style={{ background: '#FDFAF6' }}
            aria-label="Previous"
          >
            <svg className="h-4 w-4" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {mobilePages.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollRailTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: railIndex === i ? '24px' : '8px',
                  height: '8px',
                  background: railIndex === i ? '#C9A227' : 'rgba(201,162,39,0.3)',
                }}
                aria-label={`Page ${i + 1}`}
                aria-current={railIndex === i ? 'true' : undefined}
              />
            ))}
          </div>

          <button
            onClick={() => scrollRail(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(160,120,80,0.30)]"
            style={{ background: '#FDFAF6' }}
            aria-label="Next"
          >
            <svg className="h-4 w-4" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .showcase-rail {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .showcase-rail::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
