import type { Metadata } from 'next';
import { ServicePageShell, ServiceLitePage } from '@/components/v4/service';
import { officeService } from '@/lib/content/services/office';

export const metadata: Metadata = {
  title: 'Commercial & Office Interior Design | Luxora Interiors',
  description: officeService.overview,
  alternates: { canonical: `/services/${officeService.slug}` },
  openGraph: {
    title: officeService.title,
    description: officeService.overview,
    images: [officeService.heroImage.url],
  },
};

export default function OfficeServicePage() {
  return (
    <ServicePageShell>
      <ServiceLitePage data={officeService} />
    </ServicePageShell>
  );
}
