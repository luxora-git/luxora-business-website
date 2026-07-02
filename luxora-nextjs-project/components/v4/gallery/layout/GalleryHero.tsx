import type { ReactNode } from 'react';
import Image from 'next/image';
import ServiceBreadcrumb from '../../service/ServiceBreadcrumb';
import type { ServiceBreadcrumbItem } from '@/lib/content/services/types';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import GalleryContainer from './GalleryContainer';
import GalleryHeroStats, { type GalleryHeroStatItem } from './GalleryHeroStats';

export interface GalleryHeroProps {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description?: string;
  image: string;
  imageAlt: string;
  /** Omit on Gallery Home — Home has no parent to breadcrumb to (Gallery Home UI/UX Spec §2). */
  breadcrumbItems?: ServiceBreadcrumbItem[];
  stats?: GalleryHeroStatItem[];
  /** A `GalleryHeroSearch` instance, placed beneath the description (Gallery Home only). */
  searchSlot?: ReactNode;
  /** `tall` is the Gallery Home variant; `default` matches the existing Category/Style page hero height. */
  height?: 'default' | 'tall';
  /** Slow ambient background zoom — the Hero's one continuous motion (Visual Language Guide §10). Disable for reduced-motion contexts or non-Home heroes that don't want it. */
  ambientMotion?: boolean;
  /** CSS `object-position` for the background photograph — lets the calling page favour a specific focal point without cropping decisions living in page code. */
  imagePosition?: string;
  className?: string;
}

const HEIGHT_CLASSNAME: Record<NonNullable<GalleryHeroProps['height']>, string> = {
  default: 'h-[440px] md:h-[500px]',
  // Mobile: content-driven height (auto + a floor) so a tall stack — title, description, search, stats — never clips against a hard vh ceiling. Tablet/desktop: cinematic viewport-relative height, where there's room to spare.
  tall: 'h-auto min-h-[680px] py-10 md:py-0 md:h-[94vh] md:min-h-[600px] md:max-h-[920px]',
};

/**
 * GalleryHero — the Gallery library's primary hero. `height="tall"` +
 * `ambientMotion` is the Gallery Home "library entrance" treatment
 * (UI/UX Spec §2) — composed as a magazine-cover layout: content
 * bottom-anchored so the photograph leads, a single bottom-heavy scrim
 * (not a diagonal spotlight) for legibility, and stats separated below a
 * hairline as a quiet closing "spec line" rather than crowding the title.
 * `height="default"` without motion matches today's Category/Style hero
 * proportions for any future page that wants this version of the
 * component instead of the legacy root `GalleryHero`.
 */
export default function GalleryHero({
  eyebrow,
  title,
  titleItalic,
  description,
  image,
  imageAlt,
  breadcrumbItems,
  stats,
  searchSlot,
  height = 'default',
  ambientMotion = false,
  imagePosition = 'center',
  className = '',
}: GalleryHeroProps) {
  const isTall = height === 'tall';

  return (
    <section className={`relative overflow-hidden ${HEIGHT_CLASSNAME[height]} ${className}`}>
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${ambientMotion ? 'animate-gallery-ken-burns' : ''}`}
          style={{ objectPosition: imagePosition }}
        />
      </div>

      {/* Bottom-heavy cinematic scrim — keeps the top two-thirds of the frame clear so the photograph leads, deepens only where the caption block sits. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,11,6,0) 0%, rgba(15,11,6,0.02) 38%, rgba(15,11,6,0.38) 68%, rgba(15,11,6,0.78) 92%, rgba(15,11,6,0.86) 100%)',
        }}
      />
      {/* Soft left-edge falloff, just enough to lift type off the image without reading as a stage spotlight. */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(100deg, rgba(15,11,6,0.30) 0%, rgba(15,11,6,0.08) 42%, rgba(15,11,6,0) 70%)' }}
      />
      {/* Thin top scrim for nav legibility only. */}
      <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(180deg, rgba(15,11,6,0.32) 0%, transparent 100%)' }} />

      <GalleryContainer className={`relative z-10 h-full flex flex-col ${isTall ? 'justify-end pb-0 md:pb-[4.5rem]' : 'justify-center pb-8'}`}>
        <div className={isTall ? 'max-w-[640px]' : 'max-w-[760px]'}>
          {breadcrumbItems && (
            <div className="mb-6">
              <ServiceBreadcrumb items={breadcrumbItems} light />
            </div>
          )}

          <span className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-7" style={{ background: luxoraColors.gold }} aria-hidden="true" />
            <span className="text-[11px] tracking-[0.28em] uppercase font-semibold" style={{ color: luxoraColors.gold }}>
              {eyebrow}
            </span>
          </span>

          <h1
            className="font-playfair font-normal text-white leading-[1.04] tracking-[-0.015em] mb-5 drop-shadow-2xl"
            style={{ fontSize: isTall ? 'clamp(2.6rem, 6vw, 5rem)' : 'clamp(2rem, 4.2vw, 3.6rem)' }}
          >
            <span className="block">{title}</span>
            {titleItalic && <span className="block font-playfair italic">{titleItalic}</span>}
          </h1>

          {description && (
            <p className="text-[15px] md:text-base font-light leading-relaxed max-w-[460px] mb-8 drop-shadow-md" style={{ color: 'rgba(253,250,246,0.76)' }}>
              {description}
            </p>
          )}

          {searchSlot && <div className="mb-9 max-w-[440px]">{searchSlot}</div>}

          {stats && (
            <div className="pt-6 border-t" style={{ borderColor: 'rgba(253,250,246,0.16)' }}>
              <GalleryHeroStats stats={stats} />
            </div>
          )}
        </div>
      </GalleryContainer>
    </section>
  );
}
