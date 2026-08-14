import { Suspense } from 'react';
import type { Metadata } from 'next';

// Shell, structured data & shared V4 primitives
import { ServicePageShell, ServiceFAQ } from '@/components/v4/service';
import { GalleryBreadcrumbJsonLd } from '@/components/v4/gallery';

// Background patterns
import { SoftGeometry, EditorialLight, PremiumHalo } from '@/components/v4/background';

// Gallery Component Library — layout
import PageHero from '@/components/v4/common/PageHero';
import GallerySection from '@/components/v4/gallery/layout/GallerySection';
import GallerySectionHeader from '@/components/v4/gallery/layout/GallerySectionHeader';
import GalleryEditorialSplit from '@/components/v4/gallery/layout/GalleryEditorialSplit';

// Gallery Component Library — grid & cards
import GalleryGrid from '@/components/v4/gallery/grid/GalleryGrid';
import GalleryStandardCard from '@/components/v4/gallery/cards/GalleryStandardCard';
import GalleryStyleMosaic from '@/components/v4/gallery/cards/GalleryStyleMosaic';
import type { GalleryStyleMosaicItem } from '@/components/v4/gallery/cards/GalleryStyleMosaic';

// Gallery Component Library — common
import GalleryLoadingState from '@/components/v4/gallery/common/GalleryLoadingState';
import GlobalClosingCTA from '@/components/v4/common/GlobalClosingCTA';

// Legacy GalleryBrowser — the one exhaustive, filterable listing of every project (client component, URL-synced)
import { GalleryBrowser } from '@/components/v4/gallery';

// Content
import { galleryProjects } from '@/lib/content/gallery/projects';
import { galleryCategories } from '@/lib/content/gallery/categories';
import { galleryStyles } from '@/lib/content/gallery/styles';
import { getHomeCollections, getProjectsByCollection } from '@/lib/content/gallery/collections';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

// Page-local client controller (hero search)
import HeroSearchController from './HeroSearchController';

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Design Gallery',
  description:
    'Browse real Luxora interior design inspiration across living rooms, bedrooms, kitchens, wardrobes, full homes and offices. Discover your style, then book a free design consultation.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Luxora Design Gallery — Real Homes, Beautifully Designed',
    description: 'Discover interior design inspiration by room and by style — curated by the Luxora design team.',
    images: ['/img/AI%20BASED/LIVING%20BEDROOM%20DESIGNS/lr2.webp'],
    type: 'website',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Data helpers (server-side, zero latency — data is in-memory)
// ─────────────────────────────────────────────────────────────────────────────

function roomLabel(categorySlug: string): string {
  return categorySlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Browse by Room — the primary discovery grid. Counts are computed from the
// live project list, never hand-maintained, so they can't drift out of sync.
const roomCategories = galleryCategories.map((cat) => ({
  ...cat,
  count: galleryProjects.filter((p) => p.category === cat.slug).length,
}));

// Browse by Style — a compact, uniform tile row (not a photo showcase).
// Sorted by design count purely for a sensible default order.
const styleMosaicItems: GalleryStyleMosaicItem[] = [...galleryStyles]
  .sort((a, b) => b.designCount - a.designCount)
  .map((s) => ({
    slug: s.slug,
    label: s.label,
    image: { src: s.heroImage, alt: s.heroImageAlt },
    // No standalone Style route yet — link into the Full Gallery Browser
    // pre-filtered by style, which is fully functional today rather than a dead end.
    href: `/gallery?style=${encodeURIComponent(s.label)}#gallery-browser`,
  }));

// Curated Collections — small, real link surfaces for the Collection pages.
const homeCollections = getHomeCollections();

// Editor's Picks — the one editorial storytelling moment on the page.
// gp-03 leads (bedroom-suite photography); gp-06 (kitchen) and gp-07
// (wardrobe) support it — chosen deliberately so this spread doesn't repeat
// the exact photos just used for the Full Homes/Office category tiles above.
const editorsPickFeatured = galleryProjects.find((p) => p.id === 'gp-03')!;
const editorsPickMinis = ['gp-06', 'gp-07'].map((id) => galleryProjects.find((p) => p.id === id)!);

const faqData = {
  eyebrow: 'Good to Know',
  title: 'Questions Before',
  titleItalic: 'You Begin',
  description: 'A few things people usually ask before browsing further.',
  items: [
    {
      question: "I don't know my style yet — where do I start?",
      answer:
        "Start with Browse by Style above. Each style groups real Luxora projects by palette, material and mood, so you can recognise what you like before you know the name for it. Most clients land on a style within a few minutes of browsing.",
    },
    {
      question: 'Do you only design full homes, or single rooms too?',
      answer:
        'Both. Browse by Room shows every category we design — from a single wardrobe wall to a full villa — so you can scope a project as small or as complete as you need.',
    },
    {
      question: 'Can a design in the gallery be customised for my space?',
      answer:
        'Every design here is a real, completed Luxora project — a starting point, not a fixed template. Our design team adapts the layout, materials and budget to your exact space during your free consultation.',
    },
    {
      question: 'What does a project like this typically cost?',
      answer:
        'Our completed projects range from roughly ₹8L for a single room to over ₹1Cr for a full villa. Use Estimate Your Budget below for a same-day estimate, or filter the gallery by budget to see comparable projects.',
    },
    {
      question: 'How long does a typical project take?',
      answer:
        'Single rooms are typically delivered in 2–3 weeks; full homes and villas take 8–10 weeks depending on scale. Your consultation will include a firm timeline before you commit to anything.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function GalleryHomePage() {
  return (
    <ServicePageShell>
      {/* BreadcrumbList structured data */}
      <GalleryBreadcrumbJsonLd
        items={[
          { label: 'Home', href: '/' },
          { label: 'Gallery', href: '/gallery' },
        ]}
      />

      {/* ── Hero — the standard internal-page Hero, with the Gallery Home search box added beneath the description. ── */}
      <PageHero
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
        badge="Design Gallery"
        heading="Real Homes,"
        headingItalic="Beautifully Designed"
        description="Browse real Luxora interiors by room or by style, then bring your favourites to a free design consultation."
        image="/img/AI%20BASED/LIVING%20BEDROOM%20DESIGNS/lr2.webp"
        imageAlt="Grand contemporary living room concept with custom millwork"
        extraContent={<HeroSearchController />}
      />

      {/* ── Browse by Room — the primary, practical way in: large photography-led tiles, each labelled with a real design count. ── */}
      <GallerySection id="browse-by-room" spacing="standard" background={luxoraColors.ivory}>
        <GallerySectionHeader
          eyebrow="Start Here"
          title="Browse by"
          titleItalic="Room"
          description="Every space we design, from a single wardrobe wall to a complete villa."
          className="mb-12"
        />
        <GalleryGrid columns={{ desktop: 3 }}>
          {roomCategories.map((cat) => (
            <GalleryStandardCard
              key={cat.slug}
              href={`/gallery/${cat.slug}`}
              image={{ src: cat.heroImage, alt: cat.heroImageAlt }}
              title={cat.label}
              meta={[`${cat.count} Design${cat.count !== 1 ? 's' : ''}`]}
            />
          ))}
        </GalleryGrid>
      </GallerySection>

      {/* ── Browse by Style — the secondary, aesthetic way in: an asymmetric mosaic rather than a repeat of the Room grid, so the two navigation surfaces don't visually collapse into each other. ── */}
      <GallerySection
        id="browse-by-style"
        spacing="standard"
        background={luxoraColors.warmCream}
        patterns={<SoftGeometry id="gallery-home-rooms" />}
      >
        <GallerySectionHeader
          eyebrow="Or, Start With a Feeling"
          title="Browse by"
          titleItalic="Style"
          description="Every home has a sensibility. Find the palette, materials and proportions that feel like yours."
          className="mb-12 max-w-xl"
        />
        <GalleryStyleMosaic items={styleMosaicItems} />
      </GallerySection>

      {/* ── Editor's Picks — the page's one editorial storytelling moment: a dominant feature plus two contrasting supporting projects, not another grid of equal-weight cards. ── */}
      <GallerySection
        id="editors-picks"
        spacing="editorial"
        background="#F5EDE0"
        patterns={<EditorialLight id="gallery-home-styles" />}
      >
        <GallerySectionHeader
          eyebrow="Editor's Choice"
          title="Hand-Picked"
          titleItalic="by the Design Team"
          description="Three projects that defined their brief — selected for exceptional craft, material quality and livability."
          divider="diamond"
          className="mb-12"
        />
        <GalleryEditorialSplit
          featured={{
            href: `/gallery/${editorsPickFeatured.category}/${editorsPickFeatured.slug}`,
            image: { src: editorsPickFeatured.coverImage.url, alt: editorsPickFeatured.coverImage.alt },
            eyebrow: "Editor's Pick",
            title: editorsPickFeatured.title,
            description: editorsPickFeatured.description,
            // Inspiration-only meta — style and room, nothing quantitative.
            meta: [
              { label: 'Style', value: editorsPickFeatured.meta.style },
              { label: 'Room', value: roomLabel(editorsPickFeatured.category) },
            ],
          }}
          mini={editorsPickMinis.map((p) => ({
            href: `/gallery/${p.category}/${p.slug}`,
            image: { src: p.coverImage.url, alt: p.coverImage.alt },
            title: p.title,
            meta: `${p.meta.style} · ${roomLabel(p.category)}`,
          }))}
        />
      </GallerySection>

      {/* ── Curated Collections — a third, mood-based way in, each a real page with its own hero and grid. ── */}
      <GallerySection id="collections" spacing="standard" background={luxoraColors.warmCream}>
        <GallerySectionHeader
          eyebrow="Curated Collections"
          title="Designed Around"
          titleItalic="A Single Idea"
          description="Projects grouped by mood or budget, not room — a faster route in if you already know the feeling you want."
          className="mb-12 max-w-xl"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeCollections.map((collection) => {
            const count = getProjectsByCollection(collection).length;
            return (
              <GalleryStandardCard
                key={collection.slug}
                href={`/gallery/collections/${collection.slug}`}
                image={{ src: collection.heroImage, alt: collection.heroImageAlt }}
                title={collection.label}
                meta={[`${count} Design${count !== 1 ? 's' : ''}`]}
              />
            );
          })}
        </div>
      </GallerySection>

      {/* ── Full Gallery Browser — the one exhaustive, filterable listing of every project (category/style/budget/city) across the whole Gallery, for when a visitor wants to search rather than browse by Room or Style. ── */}
      <GallerySection
        id="gallery-browser"
        spacing="standard"
        background={luxoraColors.ivory}
        patterns={<PremiumHalo id="gallery-home-collections" />}
      >
        <GallerySectionHeader
          eyebrow="Browse Everything"
          title="The Complete"
          titleItalic="Gallery"
          description="Every design, filterable by style, budget, city or area — for when you'd rather search than browse."
          className="mb-12"
        />
        <Suspense fallback={<GalleryLoadingState count={6} />}>
          <GalleryBrowser projects={galleryProjects} showFeatured />
        </Suspense>
      </GallerySection>

      {/* ── FAQ — the objection-handling section a small, real portfolio needs in place of "more grids": addresses scope, customisation, budget and timeline before the visitor reaches out. ── */}
      <ServiceFAQ data={faqData} />

      {/* ── Closing CTA — the single conversion moment, after inspiration and questions are both addressed. ── */}
      <GlobalClosingCTA
        eyebrow="Start Your Journey"
        title="Inspired By What You See?"
        titleItalic="Let's Create Yours."
        description="Every Luxora home begins with a single conversation. Share your brief and our design team will respond within one business day."
        image={editorsPickFeatured.coverImage.url}
        imageAlt={editorsPickFeatured.coverImage.alt}
      />
    </ServicePageShell>
  );
}
