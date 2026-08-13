import type { Metadata } from 'next';
import { ServicePageShell, ServiceLitePage } from '@/components/v4/service';
import { officeService } from '@/lib/content/services/office';
import { buildMetadata } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema';

const NAME = 'Commercial & Office Interior Design';
const PATH = `/services/${officeService.slug}`;
const DESCRIPTION =
  'Commercial and office interior design in Jaipur by Luxora Interiors — brand-driven workspaces, retail and hospitality environments designed and executed end to end by one accountable team.';

export const metadata: Metadata = buildMetadata({
  title: 'Commercial & Office Interior Design in Jaipur',
  description: DESCRIPTION,
  path: PATH,
  image: officeService.heroImage.url,
});

export default function OfficeServicePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: DESCRIPTION, path: PATH, image: officeService.heroImage.url }),
          faqSchema(officeService.faq),
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/full-home-interior-design' },
            { label: officeService.title, href: PATH },
          ]),
        ]}
      />
      <ServicePageShell>
        <ServiceLitePage data={officeService} />
      </ServicePageShell>
    </>
  );
}
