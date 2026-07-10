import ShowcaseOverlayCard from './ShowcaseOverlayCard';

export interface ShowcaseMosaicItem {
  title: string;
  image: string;
  href: string;
  imageAlt?: string;
}

export interface ShowcaseMosaicPageProps {
  /** Exactly five items: [small, small, FEATURE, small, small]. */
  items: ShowcaseMosaicItem[];
}

/**
 * ShowcaseMosaicPage — one complete mobile/tablet gallery page: five
 * overlay cards laid out as a compact mosaic so the visitor immediately
 * sees multiple categories exist.
 *
 * Phone (<640): 2 columns — two small cards, full-width feature, two small
 * cards (the approved Design Gallery layout).
 *
 * Tablet (640–1023): 3 columns with the feature as a tall left column
 * spanning both rows — more visible content per page, intentionally
 * composed rather than the phone grid stretched wide:
 *
 *   [ feature ][ s1 ][ s2 ]
 *   [ feature ][ s3 ][ s4 ]
 */
export default function ShowcaseMosaicPage({ items }: ShowcaseMosaicPageProps) {
  const [a, b, feature, c, d] = items;
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:grid-rows-2 sm:gap-3">
      <ShowcaseOverlayCard
        {...a}
        className="order-1 sm:order-2"
        imageWrapClassName="aspect-[4/3.4] sm:aspect-[4/3]"
      />
      <ShowcaseOverlayCard
        {...b}
        className="order-2 sm:order-3"
        imageWrapClassName="aspect-[4/3.4] sm:aspect-[4/3]"
      />
      <ShowcaseOverlayCard
        {...feature}
        className="order-3 col-span-2 sm:order-1 sm:col-span-1 sm:row-span-2"
        imageWrapClassName="aspect-[16/9.5] sm:aspect-auto sm:h-full"
      />
      <ShowcaseOverlayCard
        {...c}
        className="order-4"
        imageWrapClassName="aspect-[4/3.4] sm:aspect-[4/3]"
      />
      <ShowcaseOverlayCard
        {...d}
        className="order-5"
        imageWrapClassName="aspect-[4/3.4] sm:aspect-[4/3]"
      />
    </div>
  );
}
