import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import { GalleryBrowser, GalleryBreadcrumbJsonLd } from '@/components/v4/gallery';
import PageHero from '@/components/v4/common/PageHero';
import GlobalClosingCTA from '@/components/v4/common/GlobalClosingCTA';
import { LuxuryContour, LuxuryGrain } from '@/components/v4/background';
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
    title: `${style.label} Design Gallery | Luxora Interiors`,
    description: style.description,
    alternates: { canonical: `/luxury-v4/gallery/style/${style.slug}` },
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
          { label: 'Home', href: '/luxury-v4' },
          { label: 'Gallery', href: '/luxury-v4/gallery' },
          { label: style.label, href: `/luxury-v4/gallery/style/${style.slug}` },
        ]}
      />

      <PageHero
        breadcrumbItems={[{ label: 'Home', href: '/luxury-v4' }, { label: 'Gallery', href: '/luxury-v4/gallery' }, { label: style.label }]}
        badge={style.eyebrow}
        heading={style.label}
        description={style.description}
        image={style.heroImage}
        imageAlt={style.heroImageAlt}
      />

      <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#F5EFE6' }}>
        <LuxuryContour position="top-right" opacity={0.03} scale={1.2} />
        <LuxuryGrain id={`gallery-style-${style.slug}-grain`} opacity={0.012} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
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
