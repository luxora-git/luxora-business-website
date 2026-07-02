import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import { GalleryBreadcrumbJsonLd } from '@/components/v4/gallery';
import PageHero from '@/components/v4/common/PageHero';
import GlobalClosingCTA from '@/components/v4/common/GlobalClosingCTA';
import GallerySection from '@/components/v4/gallery/layout/GallerySection';
import GalleryGrid from '@/components/v4/gallery/grid/GalleryGrid';
import GalleryStandardCard from '@/components/v4/gallery/cards/GalleryStandardCard';
import { LuxuryGrain } from '@/components/v4/background';
import { galleryCollections, getGalleryCollection, getProjectsByCollection } from '@/lib/content/gallery/collections';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

function roomLabel(categorySlug: string): string {
  return categorySlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function generateStaticParams() {
  return galleryCollections.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const collection = getGalleryCollection(params.slug);
  if (!collection) return {};
  return {
    title: `${collection.label} | Luxora Design Gallery`,
    description: collection.description,
    alternates: { canonical: `/gallery/collections/${collection.slug}` },
    openGraph: { title: collection.label, description: collection.description, images: [collection.heroImage] },
  };
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = getGalleryCollection(params.slug);
  if (!collection) notFound();

  const projects = getProjectsByCollection(collection);

  return (
    <ServicePageShell>
      <GalleryBreadcrumbJsonLd
        items={[
          { label: 'Home', href: '/' },
          { label: 'Gallery', href: '/gallery' },
          { label: collection.label, href: `/gallery/collections/${collection.slug}` },
        ]}
      />

      <PageHero
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Gallery', href: '/gallery' }, { label: collection.label }]}
        badge="Collection"
        heading={collection.label}
        description={collection.description}
        image={collection.heroImage}
        imageAlt={collection.heroImageAlt}
      />

      <GallerySection spacing="standard" background={luxoraColors.ivory} patterns={<LuxuryGrain id={`collection-${collection.slug}-grain`} opacity={0.012} />}>
        <GalleryGrid columns={{ desktop: 3 }}>
          {projects.map((project) => (
            <GalleryStandardCard
              key={project.id}
              href={`/gallery/${project.category}/${project.slug}`}
              image={{ src: project.coverImage.url, alt: project.coverImage.alt }}
              title={project.title}
              meta={[project.meta.style, roomLabel(project.category)]}
            />
          ))}
        </GalleryGrid>
      </GallerySection>

      <GlobalClosingCTA
        eyebrow="Start Your Journey"
        title="Love This Collection?"
        titleItalic="Let's Create Yours."
        description="Book a free consultation, or get an instant budget estimate for a similar look."
        image={collection.heroImage}
        imageAlt={collection.heroImageAlt}
      />
    </ServicePageShell>
  );
}
