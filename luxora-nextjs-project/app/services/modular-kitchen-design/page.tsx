import type { Metadata } from 'next';
import { ServicePageShell, ServiceLitePage } from '@/components/v4/service';
import { kitchenService } from '@/lib/content/services/kitchen';

export const metadata: Metadata = {
  title: 'Modular Kitchen Design | Luxora Interiors',
  description: kitchenService.overview,
  alternates: { canonical: `/services/${kitchenService.slug}` },
  openGraph: {
    title: kitchenService.title,
    description: kitchenService.overview,
    images: [kitchenService.heroImage.url],
  },
};

export default function KitchenServicePage() {
  return (
    <ServicePageShell>
      <ServiceLitePage data={kitchenService} />
    </ServicePageShell>
  );
}
