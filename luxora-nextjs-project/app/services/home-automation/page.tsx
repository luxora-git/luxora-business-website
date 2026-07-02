import type { Metadata } from 'next';
import { ServicePageShell, ServiceLitePage } from '@/components/v4/service';
import { homeAutomationService } from '@/lib/content/services/homeAutomation';

export const metadata: Metadata = {
  title: 'Home Automation | Luxora Interiors',
  description: homeAutomationService.overview,
  alternates: { canonical: `/services/${homeAutomationService.slug}` },
  openGraph: {
    title: homeAutomationService.title,
    description: homeAutomationService.overview,
    images: [homeAutomationService.heroImage.url],
  },
};

export default function HomeAutomationServicePage() {
  return (
    <ServicePageShell>
      <ServiceLitePage data={homeAutomationService} />
    </ServicePageShell>
  );
}
