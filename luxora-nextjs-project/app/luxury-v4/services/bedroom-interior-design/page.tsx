import type { Metadata } from 'next';
import { ServicePageShell, ServiceLitePage } from '@/components/v4/service';
import { bedroomService } from '@/lib/content/services/bedroom';

export const metadata: Metadata = {
  title: 'Bedroom Interior Design | Luxora Interiors',
  description: bedroomService.overview,
  alternates: { canonical: `/luxury-v4/services/${bedroomService.slug}` },
  openGraph: {
    title: bedroomService.title,
    description: bedroomService.overview,
    images: [bedroomService.heroImage.url],
  },
};

export default function BedroomServicePage() {
  return (
    <ServicePageShell>
      <ServiceLitePage data={bedroomService} />
    </ServicePageShell>
  );
}
