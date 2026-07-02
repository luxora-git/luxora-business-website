import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import { GalleryBrowser, GalleryBreadcrumbJsonLd } from '@/components/v4/gallery';
import GallerySection from '@/components/v4/gallery/layout/GallerySection';
import GallerySectionHeader from '@/components/v4/gallery/layout/GallerySectionHeader';
import PageHero from '@/components/v4/common/PageHero';
import GlobalClosingCTA from '@/components/v4/common/GlobalClosingCTA';
import GalleryFeaturedCard from '@/components/v4/gallery/cards/GalleryFeaturedCard';
import GalleryEditorialCard from '@/components/v4/gallery/cards/GalleryEditorialCard';
import GalleryCompactCard from '@/components/v4/gallery/cards/GalleryCompactCard';
import GalleryRail from '@/components/v4/gallery/rails/GalleryRail';
import { LuxuryContour, LuxuryGrain } from '@/components/v4/background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { galleryCategories, getGalleryCategory } from '@/lib/content/gallery/categories';
import { getProjectsByCategory } from '@/lib/content/gallery/projects';
import { galleryStyles } from '@/lib/content/gallery/styles';

interface CategoryPageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return galleryCategories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = getGalleryCategory(params.category);
  if (!category) return {};
  return {
    title: `${category.label} Design Gallery | Luxora Interiors`,
    description: category.description,
    alternates: { canonical: `/luxury-v4/gallery/${category.slug}` },
    openGraph: {
      title: `${category.label} | Luxora Gallery`,
      description: category.description,
      images: [category.heroImage],
    },
  };
}

export default function GalleryCategoryPage({ params }: CategoryPageProps) {
  const category = getGalleryCategory(params.category);
  if (!category) notFound();

  const projects = getProjectsByCategory(category.slug);
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const secondary = projects.find((p) => p.id !== featured?.id);
  const relatedCategories = galleryCategories.filter((c) => c.slug !== category.slug);

  return (
    <ServicePageShell>
      <GalleryBreadcrumbJsonLd
        items={[
          { label: 'Home', href: '/luxury-v4' },
          { label: 'Gallery', href: '/luxury-v4/gallery' },
          { label: category.label, href: `/luxury-v4/gallery/${category.slug}` },
        ]}
      />

      <PageHero
        badge="Design Gallery"
        heading={category.label}
        description={category.description}
        image={category.heroImage}
        imageAlt={category.heroImageAlt}
        breadcrumbItems={[{ label: 'Home', href: '/luxury-v4' }, { label: 'Gallery', href: '/luxury-v4/gallery' }, { label: category.label }]}
      />

      {/* Featured Design */}
      {featured && (
        <GallerySection spacing="editorial" background={luxoraColors.ivory} patterns={<LuxuryContour position="top-right" opacity={0.03} scale={1.2} />}>
          <GallerySectionHeader eyebrow="Featured Design" title="Where We'd" titleItalic="Start" className="mb-10" />
          <GalleryFeaturedCard
            href={`/luxury-v4/gallery/${category.slug}/${featured.slug}`}
            image={{ src: featured.coverImage.url, alt: featured.coverImage.alt }}
            eyebrow={featured.meta.style}
            title={featured.title}
            description={featured.description}
            meta={[
              { label: 'Location', value: featured.meta.location },
              { label: 'Area', value: featured.meta.area },
              { label: 'Investment', value: featured.meta.budgetRange },
              { label: 'Timeline', value: featured.meta.completionTime },
            ]}
          />
        </GallerySection>
      )}

      {/* The second design, editorial spread */}
      {secondary && (
        <GallerySection spacing="standard" background={luxoraColors.warmCream}>
          <GalleryEditorialCard
            href={`/luxury-v4/gallery/${category.slug}/${secondary.slug}`}
            image={{ src: secondary.coverImage.url, alt: secondary.coverImage.alt }}
            label={secondary.meta.style}
            title={secondary.title}
            description={secondary.description}
            meta={`${secondary.meta.location} · ${secondary.meta.area}`}
            ctaLabel="View This Design"
            orientation="image-right"
          />
        </GallerySection>
      )}

      {/* Browse by Style */}
      <GallerySection spacing="tight" background={luxoraColors.ivory}>
        <GallerySectionHeader eyebrow="Refine By" title="Browse by" titleItalic="Style" className="mb-8" />
        <div className="flex flex-wrap gap-3">
          {galleryStyles.map((style) => (
            <Link
              key={style.slug}
              href={`/luxury-v4/gallery?style=${encodeURIComponent(style.label)}#gallery-browser`}
              className="rounded-full font-semibold tracking-[0.06em] transition-all duration-300 px-4 py-2 text-[11px]"
              style={{ background: 'rgba(253,250,246,0.8)', color: '#6B4C3B', border: '1px solid rgba(160,120,80,0.22)' }}
            >
              {style.label}
            </Link>
          ))}
        </div>
      </GallerySection>

      {/* Related Categories */}
      <GallerySection spacing="standard" background={luxoraColors.warmCream}>
        <GalleryRail eyebrow="Explore More" title="Related Categories" viewAllHref="/luxury-v4/gallery" viewAllLabel="All Categories" cardWidth={260}>
          {relatedCategories.map((c) => (
            <GalleryCompactCard
              key={c.slug}
              href={`/luxury-v4/gallery/${c.slug}`}
              image={{ src: c.heroImage, alt: c.heroImageAlt }}
              title={c.label}
              meta={['Design Gallery']}
            />
          ))}
        </GalleryRail>
      </GallerySection>

      {/* Full Gallery — smart filters, search, load more */}
      <GallerySection
        spacing="standard"
        background={luxoraColors.ivory}
        patterns={<LuxuryGrain id={`gallery-category-${category.slug}-grain`} opacity={0.012} />}
      >
        <GallerySectionHeader eyebrow="Full Gallery" title="Every Design in" titleItalic={category.label} className="mb-10" />
        <Suspense fallback={null}>
          <GalleryBrowser projects={projects} lockedCategory={category.slug} />
        </Suspense>
      </GallerySection>

      <GlobalClosingCTA
        eyebrow="Start Your Journey"
        title="Inspired By These Designs?"
        titleItalic="Let's Create Yours."
        description="Book a free consultation, or get an instant budget estimate for a similar design."
        image={category.heroImage}
        imageAlt={category.heroImageAlt}
      />
    </ServicePageShell>
  );
}
