import type { Metadata } from 'next';
import { ServicePageShell, ServiceLitePage } from '@/components/v4/service';
import { architecturalDesignService } from '@/lib/content/services/architecturalDesign';

export const metadata: Metadata = {
  title: 'Architectural Design | Luxora Interiors',
  description: architecturalDesignService.overview,
  alternates: { canonical: `/luxury-v4/services/${architecturalDesignService.slug}` },
  openGraph: {
    title: architecturalDesignService.title,
    description: architecturalDesignService.overview,
    images: [architecturalDesignService.heroImage.url],
  },
};

export default function ArchitecturalDesignServicePage() {
  return (
    <ServicePageShell>
      <ServiceLitePage data={architecturalDesignService} />
    </ServicePageShell>
  );
}
