import type { Metadata } from 'next';
import { ServicePageShell, ServiceLitePage } from '@/components/v4/service';
import { wardrobeService } from '@/lib/content/services/wardrobe';
import { buildMetadata } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema';

const NAME = 'Wardrobe Design';
const PATH = `/services/${wardrobeService.slug}`;
const DESCRIPTION =
  'Custom wardrobe design in Jaipur by Luxora Interiors — sliding and hinged wardrobes with smart internal storage, premium shutters and soft-close hardware, made to fit your room and how you live.';

export const metadata: Metadata = buildMetadata({
  title: 'Wardrobe Design in Jaipur',
  description: DESCRIPTION,
  path: PATH,
  image: wardrobeService.heroImage.url,
});

export default function WardrobeServicePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: DESCRIPTION, path: PATH, image: wardrobeService.heroImage.url }),
          faqSchema(wardrobeService.faq),
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/full-home-interior-design' },
            { label: wardrobeService.title, href: PATH },
          ]),
        ]}
      />
      <ServicePageShell>
        <ServiceLitePage data={wardrobeService} />
      </ServicePageShell>
    </>
  );
}
