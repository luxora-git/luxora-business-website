import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import CatalogDetailPage from '@/components/v4/catalog/CatalogDetailPage';
import { products, getProduct } from '@/lib/content/catalog';

interface ProductPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const item = getProduct(params.slug);
  if (!item) return {};
  return {
    title: `${item.title} | Products | Luxora Interiors`,
    description: item.description,
    alternates: { canonical: `/products/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.description,
      images: [item.heroImage.url],
    },
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const item = getProduct(params.slug);
  if (!item) notFound();

  return (
    <ServicePageShell>
      <CatalogDetailPage item={item} parentLabel="Products" parentHref="/products" />
    </ServicePageShell>
  );
}
