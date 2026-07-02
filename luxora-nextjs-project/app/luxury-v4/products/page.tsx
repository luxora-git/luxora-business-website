import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import CatalogIndexPage from '@/components/v4/catalog/CatalogIndexPage';
import { products } from '@/lib/content/catalog';

export const metadata: Metadata = {
  title: 'Products | Luxora Interiors',
  description: 'Modular kitchens, wardrobes, media walls, false ceilings and more — the systems Luxora designs, fabricates and installs in our own facility.',
  alternates: { canonical: '/luxury-v4/products' },
};

export default function ProductsPage() {
  return (
    <ServicePageShell>
      <CatalogIndexPage
        eyebrow="Products"
        title="Built In Our"
        titleItalic="Own Facility"
        description="Every product here is designed and fabricated to your exact measurements — never a catalogue module trimmed to fit."
        items={products}
        basePath="/luxury-v4/products"
        closingTitle="Bring"
        closingTitleItalic="Luxury Home."
        closingDescription="Every product here is designed and fabricated to your exact measurements. Share your brief and our design team will respond within one business day."
      />
    </ServicePageShell>
  );
}
