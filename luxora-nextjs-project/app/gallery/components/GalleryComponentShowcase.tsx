'use client';

import { useState, type ReactNode } from 'react';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { LuxuryGrain } from '@/components/v4/background';

import {
  GalleryContainer,
  GallerySection,
  GallerySectionHeader,
  GalleryDivider,
  GalleryHero,
  GalleryHeroSearch,
  GalleryHeroStats,
} from '@/components/v4/gallery/layout';

import {
  GalleryFeaturedCard,
  GalleryEditorialCard,
  GalleryStandardCard,
  GalleryCompactCard,
  GalleryMiniCard,
  GalleryCollectionCard,
  GalleryStyleCard,
  GalleryCategoryCard,
} from '@/components/v4/gallery/cards';

import { GalleryImage, GalleryImageOverlay, GalleryImageBadge, GalleryImageMeta, GalleryImageSkeleton } from '@/components/v4/gallery/image';

import { GalleryRail, GalleryRailHeader, GalleryRailNavigation } from '@/components/v4/gallery/rails';

import { GalleryGrid, GalleryGridItem } from '@/components/v4/gallery/grid';

import {
  GallerySearchBar,
  GallerySearchSuggestions,
  GalleryPopularSearches,
  GalleryFilterBar,
  GalleryFilterChip,
  GallerySortDropdown,
} from '@/components/v4/gallery/filters';

import { CollectionHero, CollectionHeader, CollectionPreview } from '@/components/v4/gallery/collections';

import {
  GalleryButton,
  GalleryArrowButton,
  GalleryMetaRow,
  GalleryTag,
  GalleryBadge,
  GalleryCounter,
  GalleryEmptyState,
  GalleryLoadingState,
  GallerySkeleton,
  GalleryPagination,
} from '@/components/v4/gallery/common';

import { GalleryBottomFilterSheet, GalleryHorizontalScroller } from '@/components/v4/gallery/mobile';
import { useLightbox } from '@/components/v4/lightbox';

/* ──────────────────────────────────────────────────────────────────────
 * Sample data — real images already in /public, Luxora-toned copy.
 * Page-local only; not part of the component library.
 * ────────────────────────────────────────────────────────────────────── */
const IMG = {
  livingRoom: { src: '/before-after/living-room-after.jpg', alt: 'Grand living room with Italian marble flooring, Vaishali Nagar, Jaipur' },
  bedroom: { src: '/before-after/bedroom-after.jpg', alt: 'Luxury master bedroom suite with walk-in wardrobe, Malviya Nagar, Jaipur' },
  kitchen: { src: '/before-after/kitchen-after.jpg', alt: 'Modern modular kitchen with quartz countertops' },
  wardrobe: { src: '/services/wardrobe.jpg', alt: 'Floor-to-ceiling designer wardrobe with ambient lighting' },
  residential: { src: '/services/residential.jpg', alt: 'Full home residential interior with layered ambient lighting' },
  commercial: { src: '/services/commercial.jpg', alt: 'Premium commercial office interior' },
  render3d: { src: '/services/design-3d.jpg', alt: 'Living room concept render' },
  smartEvening: { src: '/smart-home/evening.jpg', alt: 'Smart living room, evening scene, Raja Park, Jaipur' },
  smartCozy: { src: '/smart-home/cozy.jpg', alt: 'Smart living room, cozy scene, Raja Park, Jaipur' },
  smartAllOn: { src: '/smart-home/all-on.jpg', alt: 'Smart-enabled living room with integrated lighting' },
  broken: { src: '/this-image-does-not-exist.jpg', alt: 'Intentionally broken image, fallback panel check' },
};

/* ── Page-local layout helpers (not part of the component library) ──── */
function ShowcaseCategory({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  return (
    <GallerySection id={id} spacing="standard" patterns={<LuxuryGrain id={`showcase-${id}-grain`} opacity={0.012} />}>
      <GallerySectionHeader eyebrow="Component Category" title={title} description={description} divider="line" className="mb-12" />
      <div className="space-y-14">{children}</div>
    </GallerySection>
  );
}

function ShowcaseEntry({ name, note, children }: { name: string; note?: string; children: ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <code className="text-[12px] font-semibold tracking-[0.02em]" style={{ color: luxoraColors.gold }}>
          {name}
        </code>
        {note && (
          <span className="text-[11px] font-light" style={{ color: luxoraColors.softBrown }}>
            {note}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export default function GalleryComponentShowcase() {
  /* Filters demo state */
  const [category, setCategory] = useState<string | null>('living-room');
  const [sort, setSort] = useState('relevant');
  const [searchValue, setSearchValue] = useState('');
  const [heroSearchValue, setHeroSearchValue] = useState('');
  const [page, setPage] = useState(2);
  const [chipActive, setChipActive] = useState(true);
  const [tagActive, setTagActive] = useState(false);

  /* Lightbox demo state — the library no longer owns image viewing; it's the one global `PremiumLightbox` (components/v4/lightbox), opened here via useLightbox() exactly like every real page does. */
  const lightboxImages = [IMG.livingRoom, IMG.render3d, IMG.smartEvening, IMG.smartCozy];
  const { open: openLightbox } = useLightbox();

  /* Bottom filter sheet demo state */
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <main style={{ background: luxoraColors.ivory }}>
      {/* ── Page banner — plain markup, not a library component ─────── */}
      <div className="py-10" style={{ background: luxoraColors.espressoDeep }}>
        <GalleryContainer>
          <span className="text-[11px] tracking-[0.24em] uppercase font-semibold" style={{ color: luxoraColors.gold }}>
            Internal QA — Not Part Of The Public Site
          </span>
          <h1 className="font-playfair text-3xl md:text-4xl mt-3" style={{ color: '#FDFAF6' }}>
            Gallery Component Showcase
          </h1>
          <p className="text-[14px] font-light leading-relaxed mt-3 max-w-2xl" style={{ color: 'rgba(253,250,246,0.72)' }}>
            Every component in the Gallery Component Library v2, rendered once with realistic sample data, grouped by folder. Use this page to
            check spacing, typography, hover, responsive behaviour, dark-photography contrast, loading/empty states, and keyboard interaction
            before any of these are wired into Gallery Home.
          </p>
        </GalleryContainer>
      </div>

      {/* ════════════════════════════════════════════════════════════
          1. LAYOUT
         ════════════════════════════════════════════════════════════ */}
      <ShowcaseCategory id="layout" title="Layout" description="Container, section shell, section headers, dividers, and the Hero family.">
        <ShowcaseEntry name="GalleryContainer">
          <GalleryContainer className="py-4 border border-dashed border-[rgba(201,162,39,0.3)]">
            <p className="text-[13px]" style={{ color: luxoraColors.softBrown }}>
              Content constrained to the standard max-w-7xl container (dashed border for visibility only).
            </p>
          </GalleryContainer>
        </ShowcaseEntry>

        <ShowcaseEntry name="GallerySectionHeader" note="align=&quot;center&quot;, divider=&quot;diamond&quot;">
          <GallerySectionHeader
            eyebrow="Sample Eyebrow"
            title="A Section Heading"
            titleItalic="With Emphasis"
            description="One supporting sentence beneath the heading, set in Body type at a generous line length."
            align="center"
            divider="diamond"
          />
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryDivider" note="all four variants">
          <div className="space-y-6 max-w-md">
            <GalleryDivider variant="line" />
            <GalleryDivider variant="diamond" />
            <GalleryDivider variant="curve" />
            <GalleryDivider variant="editorial" />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryHeroStats">
          <div className="p-6 rounded-2xl" style={{ background: luxoraColors.espresso }}>
            <GalleryHeroStats stats={[{ value: '128+', label: 'Designs' }, { value: '6', label: 'Categories' }, { value: '12', label: 'Cities' }]} />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryHeroSearch" note="size=&quot;hero&quot;, over a dark panel">
          <div className="p-6 rounded-2xl max-w-md" style={{ background: luxoraColors.espresso }}>
            <GalleryHeroSearch
              value={heroSearchValue}
              onChange={setHeroSearchValue}
              suggestionsSlot={<GalleryPopularSearches terms={['Scandinavian', 'Modular Kitchen', 'Walk-in Closet']} onSelect={() => {}} />}
            />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryHero" note="height=&quot;tall&quot;, ambientMotion, with breadcrumb, stats and search slot">
          <div className="rounded-3xl overflow-hidden" style={{ height: 560 }}>
            <GalleryHero
              eyebrow="Design Gallery"
              title="Explore Thousands Of"
              titleItalic="Premium Interior Ideas"
              description="Every room. Every style. Real homes, designed end-to-end by one Luxora team."
              image={IMG.livingRoom.src}
              imageAlt={IMG.livingRoom.alt}
              breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
              stats={[{ value: '128+', label: 'Projects' }, { value: '6', label: 'Categories' }]}
              searchSlot={<GalleryHeroSearch value={heroSearchValue} onChange={setHeroSearchValue} />}
              height="tall"
              ambientMotion
              className="!h-full"
            />
          </div>
        </ShowcaseEntry>
      </ShowcaseCategory>

      {/* ════════════════════════════════════════════════════════════
          2. CARDS
         ════════════════════════════════════════════════════════════ */}
      <ShowcaseCategory id="cards" title="Cards" description="All eight card types at their natural size, side by side where hierarchy needs comparing.">
        <ShowcaseEntry name="GalleryFeaturedCard">
          <div className="max-w-2xl">
            <GalleryFeaturedCard
              href="#"
              image={IMG.livingRoom}
              title="The Vaishali Nagar Residence"
              description="A 3BHK reimagined end-to-end — Italian marble underfoot, custom millwork on every wall."
              meta={[
                { label: 'Location', value: 'Vaishali Nagar, Jaipur' },
                { label: 'Area', value: '2,400 sq ft' },
                { label: 'Style', value: 'Contemporary' },
                { label: 'Budget', value: '₹42L – ₹58L' },
                { label: 'Completion', value: '52 Days' },
              ]}
            />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryEditorialCard" note="orientation=&quot;image-left&quot; vs &quot;image-right&quot;">
          <div className="space-y-10">
            <GalleryEditorialCard
              href="#"
              image={IMG.residential}
              label="Collection"
              title="The Luxury Collection"
              description="Twelve of our most ambitious full-home transformations, hand-picked by the Luxora design team."
              meta="12 designs in this collection"
              orientation="image-left"
            />
            <GalleryEditorialCard
              href="#"
              image={IMG.wardrobe}
              label="Collection"
              title="Small Apartment Ideas"
              description="Proof that under 600 sq ft can still feel considered, layered and complete."
              meta="9 designs in this collection"
              orientation="image-right"
            />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryStandardCard" note="the workhorse grid tile">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
            <GalleryStandardCard href="#" image={IMG.bedroom} title="Malviya Nagar Master Suite" meta={['Luxury', '320 sq ft', '24 Days']} />
            <GalleryStandardCard href="#" image={IMG.kitchen} title="C-Scheme Kitchen Suite" meta={['Modern', '180 sq ft']} />
            <GalleryStandardCard href="#" image={IMG.commercial} title="Tonk Road Studio" meta={['Industrial', '900 sq ft', '34 Days']} />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryCompactCard" note="fixed-width rail unit, scroll to see more">
          <div className="flex gap-5 overflow-x-auto pb-2">
            <GalleryCompactCard href="#" image={IMG.smartEvening} title="Raja Park Smart Living Room" meta={['Scandinavian', '420 sq ft']} />
            <GalleryCompactCard href="#" image={IMG.smartCozy} title="Cozy Evening Scene" meta={['Scandinavian']} />
            <GalleryCompactCard href="#" image={IMG.render3d} title="Concept Render Preview" meta={['Contemporary', '2,100 sq ft']} />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryMiniCard" note="supporting-cast card, paired beside a Featured card">
          <div className="grid grid-cols-1 lg:grid-cols-[2.3fr_1fr] gap-6 max-w-3xl">
            <GalleryFeaturedCard href="#" image={IMG.livingRoom} title="The Vaishali Nagar Residence" />
            <div className="flex flex-col gap-6">
              <GalleryMiniCard href="#" image={IMG.bedroom} title="Master Suite" meta="Luxury" height="140px" />
              <GalleryMiniCard href="#" image={IMG.kitchen} title="Modular Kitchen" meta="Modern" height="180px" />
            </div>
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryCollectionCard">
          <div className="max-w-xs">
            <GalleryCollectionCard href="#" image={IMG.residential} title="Homes Under ₹20 Lakhs" description="Proof that considered design and a tight budget aren't opposites." designCount={14} />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryStyleCard" note="sm / md / lg mosaic sizes">
          <div className="flex gap-4 items-end">
            <div className="w-24"><GalleryStyleCard href="#" image={IMG.smartEvening} title="Scandinavian" size="sm" /></div>
            <div className="w-40"><GalleryStyleCard href="#" image={IMG.livingRoom} title="Contemporary" size="md" /></div>
            <div className="w-64"><GalleryStyleCard href="#" image={IMG.residential} title="Luxury" size="lg" /></div>
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryCategoryCard" note="never zooms on hover, by design">
          <div className="flex gap-6">
            <GalleryCategoryCard href="#" image={IMG.livingRoom} title="Living Rooms" />
            <GalleryCategoryCard href="#" image={IMG.bedroom} title="Bedrooms" />
            <GalleryCategoryCard href="#" image={IMG.kitchen} title="Kitchens" />
            <GalleryCategoryCard href="#" image={IMG.wardrobe} title="Wardrobes" />
          </div>
        </ShowcaseEntry>
      </ShowcaseCategory>

      {/* ════════════════════════════════════════════════════════════
          3. IMAGE
         ════════════════════════════════════════════════════════════ */}
      <ShowcaseCategory id="image" title="Image" description="The image primitive, overlays, badges, the meta-over-photo block, skeletons, and the broken-image fallback.">
        <ShowcaseEntry name="GalleryImage" note="ratio variants — hero / featured / standard / compact / mini / square">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {(['hero', 'featured', 'standard', 'compact', 'mini', 'square'] as const).map((ratio) => (
              <div key={ratio}>
                <GalleryImage src={IMG.livingRoom.src} alt={IMG.livingRoom.alt} ratio={ratio} zoom="standard" />
                <p className="text-[10px] uppercase tracking-[0.1em] mt-1.5" style={{ color: luxoraColors.softBrown }}>
                  {ratio}
                </p>
              </div>
            ))}
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryImage" note="broken src → designed fallback panel, never a broken-image icon">
          <div className="w-48">
            <GalleryImage src={IMG.broken.src} alt={IMG.broken.alt} ratio="standard" />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryImageOverlay + GalleryImageBadge + GalleryImageMeta" note="composed together, as a card would use them">
          <div className="relative w-72 aspect-[4/5] rounded-2xl overflow-hidden">
            <GalleryImage src={IMG.kitchen.src} alt={IMG.kitchen.alt} coverParent zoom="none" />
            <GalleryImageOverlay variant="bottom-strong" />
            <GalleryImageBadge position="top-left">Featured Project</GalleryImageBadge>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <GalleryImageMeta title="C-Scheme Kitchen Suite" meta={['Modern', '180 sq ft', '18 Days']} />
            </div>
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryImageSkeleton" note="ratio-matched shimmer placeholder">
          <div className="grid grid-cols-3 gap-4 max-w-md">
            <GalleryImageSkeleton ratio="standard" />
            <GalleryImageSkeleton ratio="square" />
            <GalleryImageSkeleton ratio="compact" />
          </div>
        </ShowcaseEntry>
      </ShowcaseCategory>

      {/* ════════════════════════════════════════════════════════════
          4. RAILS
         ════════════════════════════════════════════════════════════ */}
      <ShowcaseCategory id="rails" title="Rails" description="The composed rail, plus its header and navigation pieces standalone.">
        <ShowcaseEntry name="GalleryRailHeader" note="standalone, with a View All link">
          <GalleryRailHeader eyebrow="Signal Rail" title="Trending Designs" subheading="What's getting attention this week." viewAllHref="#" viewAllLabel="View All Trending" />
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryRailNavigation" note="standalone — arrows + counter">
          <GalleryRailNavigation current={3} total={8} onPrev={() => {}} onNext={() => {}} className="!flex" />
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryRail" note="composed: header + nav + scroller, resize the window to see mobile snap-scroll">
          <GalleryRail eyebrow="Signal Rail" title="Trending Designs" subheading="Freshness-ranked until Save/View data exists." viewAllHref="#">
            <GalleryCompactCard href="#" image={IMG.smartEvening} title="Raja Park Smart Living Room" meta={['Scandinavian']} />
            <GalleryCompactCard href="#" image={IMG.bedroom} title="Malviya Nagar Master Suite" meta={['Luxury']} />
            <GalleryCompactCard href="#" image={IMG.kitchen} title="C-Scheme Kitchen Suite" meta={['Modern']} />
            <GalleryCompactCard href="#" image={IMG.residential} title="Full Home, Civil Lines" meta={['Classic']} />
            <GalleryCompactCard href="#" image={IMG.commercial} title="Tonk Road Studio" meta={['Industrial']} />
          </GalleryRail>
        </ShowcaseEntry>
      </ShowcaseCategory>

      {/* ════════════════════════════════════════════════════════════
          5. GRID
         ════════════════════════════════════════════════════════════ */}
      <ShowcaseCategory id="grid" title="Grid" description="The generic responsive grid container, with one item promoted to a two-column span.">
        <ShowcaseEntry name="GalleryGrid + GalleryGridItem" note="resize the window: 1 col mobile → 2 col tablet → 3 col desktop">
          <GalleryGrid>
            <GalleryGridItem span={2}>
              <GalleryStandardCard href="#" image={IMG.livingRoom} title="The Vaishali Nagar Residence (spans 2 columns)" meta={['Contemporary', '2,400 sq ft']} />
            </GalleryGridItem>
            <GalleryGridItem>
              <GalleryStandardCard href="#" image={IMG.bedroom} title="Malviya Nagar Master Suite" meta={['Luxury']} />
            </GalleryGridItem>
            <GalleryGridItem>
              <GalleryStandardCard href="#" image={IMG.kitchen} title="C-Scheme Kitchen Suite" meta={['Modern']} />
            </GalleryGridItem>
            <GalleryGridItem>
              <GalleryStandardCard href="#" image={IMG.commercial} title="Tonk Road Studio" meta={['Industrial']} />
            </GalleryGridItem>
          </GalleryGrid>
        </ShowcaseEntry>
      </ShowcaseCategory>

      {/* ════════════════════════════════════════════════════════════
          6. FILTERS
         ════════════════════════════════════════════════════════════ */}
      <ShowcaseCategory id="filters" title="Filters" description="Search, suggestions, popular searches, the filter bar, chips, and sort.">
        <ShowcaseEntry name="GallerySearchBar" note="default size">
          <div className="max-w-sm">
            <GallerySearchBar value={searchValue} onChange={setSearchValue} />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GallerySearchSuggestions" note="tab/arrow-focusable links">
          <div className="max-w-sm">
            <GallerySearchSuggestions
              suggestions={[
                { label: 'Scandinavian Living Rooms', href: '#suggestion-style', meta: 'Style' },
                { label: 'Modular Kitchens', href: '#suggestion-category', meta: 'Category' },
                { label: 'Vaishali Nagar, Jaipur', href: '#suggestion-city', meta: 'City' },
              ]}
            />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryPopularSearches">
          <div className="p-5 rounded-2xl max-w-sm" style={{ background: luxoraColors.espresso }}>
            <GalleryPopularSearches terms={['Scandinavian', 'Modular Kitchen', 'Walk-in Closet', 'Full Home']} onSelect={() => {}} />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryFilterChip" note="active vs inactive vs removable">
          <div className="flex gap-3">
            <GalleryFilterChip label="All" active={!chipActive} onClick={() => setChipActive(false)} />
            <GalleryFilterChip label="Living Rooms" active={chipActive} onClick={() => setChipActive(true)} />
            <GalleryFilterChip label="Scandinavian" active removable onClick={() => {}} />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GallerySortDropdown">
          <GallerySortDropdown
            value={sort}
            onChange={setSort}
            options={[
              { label: 'Most Relevant', value: 'relevant' },
              { label: 'Newest First', value: 'newest' },
              { label: 'Most Popular', value: 'popular' },
            ]}
          />
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryFilterBar" note="composed: category pills + search + sort">
          <GalleryFilterBar
            groups={[
              {
                label: 'Category',
                active: category,
                onSelect: setCategory,
                options: [
                  { label: 'Living Rooms', value: 'living-room' },
                  { label: 'Bedrooms', value: 'bedroom' },
                  { label: 'Kitchens', value: 'kitchen' },
                ],
              },
            ]}
            searchSlot={<GallerySearchBar value={searchValue} onChange={setSearchValue} />}
            trailingSlot={
              <GallerySortDropdown
                value={sort}
                onChange={setSort}
                options={[
                  { label: 'Most Relevant', value: 'relevant' },
                  { label: 'Newest First', value: 'newest' },
                ]}
              />
            }
          />
        </ShowcaseEntry>
      </ShowcaseCategory>

      {/* ════════════════════════════════════════════════════════════
          7. COLLECTIONS
         ════════════════════════════════════════════════════════════ */}
      <ShowcaseCategory id="collections" title="Collections" description="Collection-specific header treatments — a full hero, an inline header, and a feature preview.">
        <ShowcaseEntry name="CollectionHeader" note="inline, used within a page rather than as its own header">
          <CollectionHeader label="Collection" title="Luxury Bedrooms" description="Hotel-suite calm, built into everyday homes." designCount={9} />
        </ShowcaseEntry>

        <ShowcaseEntry name="CollectionPreview" note="GalleryEditorialCard applied to a Collection">
          <CollectionPreview href="#" image={IMG.bedroom} label="Collection" title="Luxury Bedrooms" description="Nine suites built around rest." meta="9 designs" />
        </ShowcaseEntry>

        <ShowcaseEntry name="CollectionHero" note="full page-header moment for a Collection page">
          <div className="rounded-3xl overflow-hidden" style={{ height: 420 }}>
            <CollectionHero
              title="Luxury Bedrooms"
              description="Hotel-suite calm, built into nine real Luxora homes."
              image={IMG.bedroom.src}
              imageAlt={IMG.bedroom.alt}
              stats={[{ value: '9', label: 'Designs' }]}
              className="!h-full"
            />
          </div>
        </ShowcaseEntry>
      </ShowcaseCategory>

      {/* ════════════════════════════════════════════════════════════
          8. COMMON
         ════════════════════════════════════════════════════════════ */}
      <ShowcaseCategory id="common" title="Common UI" description="Buttons, arrows, meta rows, tags, badges, counters, pagination, and the designed empty/loading states.">
        <ShowcaseEntry name="GalleryButton" note="primary / secondary / ghost / text">
          <div className="flex flex-wrap items-center gap-4">
            <GalleryButton variant="primary" href="#">Book Free Consultation</GalleryButton>
            <GalleryButton variant="secondary" href="#">Estimate My Budget</GalleryButton>
            <GalleryButton variant="ghost" onClick={() => {}}>Filters (2)</GalleryButton>
            <GalleryButton variant="text" href="#">View All →</GalleryButton>
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryArrowButton" note="dark tone (cream bg) vs light tone (over photography)">
          <div className="flex items-center gap-4">
            <GalleryArrowButton direction="prev" tone="dark" />
            <GalleryArrowButton direction="next" tone="dark" />
            <div className="p-3 rounded-full flex gap-3" style={{ background: luxoraColors.espresso }}>
              <GalleryArrowButton direction="prev" tone="light" />
              <GalleryArrowButton direction="next" tone="light" />
            </div>
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryMetaRow" note="plain (dot-separated) vs labeled (spec row)">
          <div className="space-y-4 max-w-md">
            <GalleryMetaRow items={['Scandinavian', '420 sq ft', '21 Days']} variant="plain" light={false} />
            <GalleryMetaRow
              variant="labeled"
              light={false}
              items={[{ label: 'Area', value: '420 sq ft' }, { label: 'Budget', value: '₹18L – ₹26L' }]}
            />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryTag" note="active vs inactive, sm vs md">
          <div className="flex flex-wrap gap-2.5">
            <GalleryTag label="Wood" active={tagActive} onClick={() => setTagActive((v) => !v)} />
            <GalleryTag label="Marble" />
            <GalleryTag label="Walk-in Closet" size="sm" />
            <GalleryTag label="Golden Accents" size="sm" active />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryBadge" note="gold / light (on dark) / dark tones">
          <div className="flex items-center gap-3">
            <GalleryBadge tone="gold">Collection</GalleryBadge>
            <GalleryBadge tone="dark">New</GalleryBadge>
            <div className="px-4 py-2 rounded-full" style={{ background: luxoraColors.espresso }}>
              <GalleryBadge tone="light">Featured</GalleryBadge>
            </div>
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryCounter">
          <GalleryCounter current={3} total={8} />
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryPagination" note="click the numbers or arrows">
          <GalleryPagination page={page} totalPages={6} onChange={setPage} />
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryEmptyState" note="no-results / no-search / coming-soon">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(160,120,80,0.12)' }}>
            <div style={{ background: luxoraColors.ivory }}><GalleryEmptyState variant="no-results" onAction={() => {}} /></div>
            <div style={{ background: luxoraColors.ivory }}><GalleryEmptyState variant="no-search" /></div>
            <div style={{ background: luxoraColors.ivory }}><GalleryEmptyState variant="coming-soon" /></div>
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryLoadingState" note="grid layout vs rail layout">
          <div className="space-y-6">
            <GalleryLoadingState layout="grid" count={3} />
            <GalleryLoadingState layout="rail" count={4} />
          </div>
        </ShowcaseEntry>

        <ShowcaseEntry name="GallerySkeleton" note="the base shimmer primitive">
          <div className="flex gap-4">
            <GallerySkeleton width={120} height={80} radius="md" />
            <GallerySkeleton width={80} height={80} radius="9999px" />
          </div>
        </ShowcaseEntry>
      </ShowcaseCategory>

      {/* ════════════════════════════════════════════════════════════
          9. LIGHTBOX
         ════════════════════════════════════════════════════════════ */}
      <ShowcaseCategory id="lightbox" title="Lightbox" description="There is exactly one Lightbox sitewide — PremiumLightbox, mounted once in the root layout. Every page opens it via useLightbox().open(...); no page renders its own viewer.">
        <ShowcaseEntry name="PremiumLightbox" note="split-screen editorial viewer — keyboard: Esc closes, ←/→ navigates, wheel/double-click/pinch zoom">
          <GalleryButton
            variant="primary"
            onClick={() =>
              openLightbox({
                images: lightboxImages.map((img) => ({ src: img.src, alt: img.alt })),
                panel: {
                  variant: 'generic',
                  eyebrow: 'Component Library',
                  title: 'Premium Lightbox Preview',
                  description: 'This is the exact global viewer every image on the site opens — Design Gallery, Portfolio, Services, Interior Elements and Products all share this one instance.',
                },
              })
            }
          >
            Open Lightbox
          </GalleryButton>
        </ShowcaseEntry>
      </ShowcaseCategory>

      {/* ════════════════════════════════════════════════════════════
          10. MOBILE
         ════════════════════════════════════════════════════════════ */}
      <ShowcaseCategory id="mobile" title="Mobile" description="The bottom filter sheet and the generic horizontal scroller — narrow the viewport to see native snap-scroll.">
        <ShowcaseEntry name="GalleryHorizontalScroller" note="generic snap-scroll container, no rail chrome">
          <GalleryHorizontalScroller>
            <div className="w-40 h-28 flex-shrink-0 snap-start rounded-xl" style={{ background: 'rgba(201,162,39,0.15)' }} />
            <div className="w-40 h-28 flex-shrink-0 snap-start rounded-xl" style={{ background: 'rgba(201,162,39,0.25)' }} />
            <div className="w-40 h-28 flex-shrink-0 snap-start rounded-xl" style={{ background: 'rgba(201,162,39,0.35)' }} />
            <div className="w-40 h-28 flex-shrink-0 snap-start rounded-xl" style={{ background: 'rgba(201,162,39,0.45)' }} />
          </GalleryHorizontalScroller>
        </ShowcaseEntry>

        <ShowcaseEntry name="GalleryBottomFilterSheet" note="keyboard: Esc closes; click the backdrop to close">
          <GalleryButton variant="ghost" onClick={() => setSheetOpen(true)}>
            Open Filter Sheet
          </GalleryButton>
          <GalleryBottomFilterSheet
            isOpen={sheetOpen}
            onClose={() => setSheetOpen(false)}
            title="Refine Designs"
            footer={
              <>
                <GalleryButton variant="secondary" className="flex-1" onClick={() => setSheetOpen(false)}>
                  Clear All
                </GalleryButton>
                <GalleryButton variant="primary" className="flex-1" onClick={() => setSheetOpen(false)}>
                  Show Results
                </GalleryButton>
              </>
            }
          >
            <div className="flex flex-wrap gap-2.5 mb-6">
              <GalleryFilterChip label="Scandinavian" active onClick={() => {}} />
              <GalleryFilterChip label="Contemporary" onClick={() => {}} />
              <GalleryFilterChip label="Luxury" onClick={() => {}} />
            </div>
          </GalleryBottomFilterSheet>
        </ShowcaseEntry>
      </ShowcaseCategory>
    </main>
  );
}
