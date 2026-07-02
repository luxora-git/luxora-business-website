import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import CatalogDetailPage from '@/components/v4/catalog/CatalogDetailPage';
import { interiorElements, getInteriorElement } from '@/lib/content/catalog';

interface ElementPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return interiorElements.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: ElementPageProps): Metadata {
  const item = getInteriorElement(params.slug);
  if (!item) return {};
  return {
    title: `${item.title} | Interior Elements | Luxora Interiors`,
    description: item.description,
    alternates: { canonical: `/elements/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.description,
      images: [item.heroImage.url],
    },
  };
}

export default function InteriorElementDetailPage({ params }: ElementPageProps) {
  const item = getInteriorElement(params.slug);
  if (!item) notFound();

  return (
    <ServicePageShell>
      <CatalogDetailPage item={item} parentLabel="Interior Elements" parentHref="/elements" />
    </ServicePageShell>
  );
}
