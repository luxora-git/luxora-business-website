import type { Metadata } from 'next';
import { ServicePageShell, ServiceLitePage } from '@/components/v4/service';
import { kitchenService } from '@/lib/content/services/kitchen';
import { buildMetadata } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema';

const NAME = 'Modular Kitchen Design';
const PATH = `/services/${kitchenService.slug}`;
const DESCRIPTION =
  'Bespoke modular kitchen design in Jaipur by Luxora Interiors — German-grade soft-close fittings, premium finishes and a working-triangle layout, fabricated in-house and installed with a fully tested handover.';

export const metadata: Metadata = buildMetadata({
  title: 'Modular Kitchen Design in Jaipur',
  description: DESCRIPTION,
  path: PATH,
  image: kitchenService.heroImage.url,
});

export default function KitchenServicePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: DESCRIPTION, path: PATH, image: kitchenService.heroImage.url }),
          faqSchema(kitchenService.faq),
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/full-home-interior-design' },
            { label: kitchenService.title, href: PATH },
          ]),
        ]}
      />
      <ServicePageShell>
        <ServiceLitePage data={kitchenService} />
      </ServicePageShell>
    </>
  );
}
