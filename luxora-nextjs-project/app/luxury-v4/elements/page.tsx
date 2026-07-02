import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import CatalogIndexPage from '@/components/v4/catalog/CatalogIndexPage';
import { interiorElements } from '@/lib/content/catalog';

export const metadata: Metadata = {
  title: 'Interior Elements | Luxora Interiors',
  description: 'Every element of a Luxora interior, from kitchens and wardrobes to lighting, ceilings, flooring and hardware — real work, room by room.',
  alternates: { canonical: '/luxury-v4/elements' },
};

export default function InteriorElementsPage() {
  return (
    <ServicePageShell>
      <CatalogIndexPage
        eyebrow="Interior Elements"
        title="Every Detail,"
        titleItalic="Considered"
        description="From the kitchen to the hardware on a wardrobe door — every element of a Luxora interior is designed as part of one whole, not fitted in isolation."
        items={interiorElements}
        basePath="/luxury-v4/elements"
        closingTitle="Ready To Elevate"
        closingTitleItalic="Every Detail?"
        closingDescription="Every element here is designed as part of one whole. Share your brief and our design team will respond within one business day."
      />
    </ServicePageShell>
  );
}
