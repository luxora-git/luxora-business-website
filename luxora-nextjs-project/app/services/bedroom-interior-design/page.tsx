import type { Metadata } from 'next';
import { ServicePageShell, ServiceLitePage } from '@/components/v4/service';
import { bedroomService } from '@/lib/content/services/bedroom';
import { buildMetadata } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema';

const NAME = 'Bedroom Interior Design';
const PATH = `/services/${bedroomService.slug}`;
const DESCRIPTION =
  'Bedroom interior design in Jaipur by Luxora Interiors — restful master and guest bedrooms with built-in storage, ambient lighting and premium finishes, designed around how you actually rest.';

export const metadata: Metadata = buildMetadata({
  title: 'Bedroom Interior Design in Jaipur',
  description: DESCRIPTION,
  path: PATH,
  image: bedroomService.heroImage.url,
});

export default function BedroomServicePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: DESCRIPTION, path: PATH, image: bedroomService.heroImage.url }),
          faqSchema(bedroomService.faq),
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/full-home-interior-design' },
            { label: bedroomService.title, href: PATH },
          ]),
        ]}
      />
      <ServicePageShell>
        <ServiceLitePage data={bedroomService} />
      </ServicePageShell>
    </>
  );
}
