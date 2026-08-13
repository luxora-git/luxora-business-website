import type { Metadata } from 'next';
import { ServicePageShell, ServiceLitePage } from '@/components/v4/service';
import { homeAutomationService } from '@/lib/content/services/homeAutomation';
import { buildMetadata } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema';

const NAME = 'Home Automation';
const PATH = `/services/${homeAutomationService.slug}`;
const DESCRIPTION =
  'Home automation in Jaipur by Luxora Interiors — integrated lighting, climate, security and entertainment controlled from a single touch, planned alongside your interior design.';

export const metadata: Metadata = buildMetadata({
  title: 'Home Automation in Jaipur',
  description: DESCRIPTION,
  path: PATH,
  image: homeAutomationService.heroImage.url,
});

export default function HomeAutomationServicePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: DESCRIPTION, path: PATH, image: homeAutomationService.heroImage.url }),
          faqSchema(homeAutomationService.faq),
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/full-home-interior-design' },
            { label: homeAutomationService.title, href: PATH },
          ]),
        ]}
      />
      <ServicePageShell>
        <ServiceLitePage data={homeAutomationService} />
      </ServicePageShell>
    </>
  );
}
