import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import { GalleryBrowser, GalleryBreadcrumbJsonLd } from '@/components/v4/gallery';
import PageHero from '@/components/v4/common/PageHero';
import GlobalClosingCTA from '@/components/v4/common/GlobalClosingCTA';
import { SoftGeometry } from '@/components/v4/background';
import { luxoraSpacing } from '@/lib/design/luxoraDesignTokens';
import { galleryStyles, getGalleryStyle } from '@/lib/content/gallery/styles';
import { getProjectsByStyle } from '@/lib/content/gallery/projects';

interface StylePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return galleryStyles.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: StylePageProps): Metadata {
  const style = getGalleryStyle(params.slug);
  if (!style) return {};
  return {
    title: `${style.label} Design Gallery`,
    description: style.description,
    alternates: { canonical: `/gallery/style/${style.slug}` },
    openGraph: {
      title: `${style.label} | Luxora Gallery`,
      description: style.description,
      images: [style.heroImage],
    },
  };
}

export default function GalleryStylePage({ params }: StylePageProps) {
  const style = getGalleryStyle(params.slug);
  if (!style) notFound();

  const projects = getProjectsByStyle(style.label);

  return (
    <ServicePageShell>
      <GalleryBreadcrumbJsonLd
        items={[
          { label: 'Home', href: '/' },
          { label: 'Gallery', href: '/gallery' },
          { label: style.label, href: `/gallery/style/${style.slug}` },
        ]}
      />

      <PageHero
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Gallery', href: '/gallery' }, { label: style.label }]}
        badge={style.eyebrow}
        heading={style.label}
        description={style.description}
        image={style.heroImage}
        imageAlt={style.heroImageAlt}
      />

      <section className="relative py-20 md:py-28 3xl:py-36 overflow-hidden" style={{ backgroundColor: '#F5EFE6' }}>
        <SoftGeometry id={`gallery-style-${style.slug}`} />

        <div className={`relative z-10 ${luxoraSpacing.container}`}>
          <Suspense fallback={null}>
            <GalleryBrowser projects={projects} />
          </Suspense>
        </div>
      </section>

      <GlobalClosingCTA
        eyebrow="Start Your Journey"
        title="Inspired By This Style?"
        titleItalic="Let's Create Yours."
        description="Book a free consultation, or get an instant budget estimate for a similar design."
        image={style.heroImage}
        imageAlt={style.heroImageAlt}
      />
    </ServicePageShell>
  );
}
