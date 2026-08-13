import type { Metadata } from 'next';
import { ServicePageShell, ServiceLitePage } from '@/components/v4/service';
import { livingRoomService } from '@/lib/content/services/livingRoom';
import { buildMetadata } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema';

const NAME = 'Living Room Interior Design';
const PATH = `/services/${livingRoomService.slug}`;
const DESCRIPTION =
  'Living room interior design in Jaipur by Luxora Interiors — layered seating, considered lighting and a single material language, designed and executed for real everyday living.';

export const metadata: Metadata = buildMetadata({
  title: 'Living Room Interior Design in Jaipur',
  description: DESCRIPTION,
  path: PATH,
  image: livingRoomService.heroImage.url,
});

export default function LivingRoomServicePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: DESCRIPTION, path: PATH, image: livingRoomService.heroImage.url }),
          faqSchema(livingRoomService.faq),
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/full-home-interior-design' },
            { label: livingRoomService.title, href: PATH },
          ]),
        ]}
      />
      <ServicePageShell>
        <ServiceLitePage data={livingRoomService} />
      </ServicePageShell>
    </>
  );
}
