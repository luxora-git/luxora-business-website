import type { Metadata } from 'next';
import { ServicePageShell, ServiceLitePage } from '@/components/v4/service';
import { wardrobeService } from '@/lib/content/services/wardrobe';

export const metadata: Metadata = {
  title: 'Wardrobe Design | Luxora Interiors',
  description: wardrobeService.overview,
  alternates: { canonical: `/luxury-v4/services/${wardrobeService.slug}` },
  openGraph: {
    title: wardrobeService.title,
    description: wardrobeService.overview,
    images: [wardrobeService.heroImage.url],
  },
};

export default function WardrobeServicePage() {
  return (
    <ServicePageShell>
      <ServiceLitePage data={wardrobeService} />
    </ServicePageShell>
  );
}
