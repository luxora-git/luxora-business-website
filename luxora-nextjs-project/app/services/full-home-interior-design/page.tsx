import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { fullHomeInteriorDesign as data } from '@/lib/content/services/fullHomeInteriorDesign';
import FullHomeClient from './FullHomeClient';

const NAME = 'Full Home Interior Design';
const PATH = `/services/${data.slug}`;
const DESCRIPTION =
  'Full home interior design in Jaipur by Luxora Interiors — one accountable team for turnkey design and execution of complete homes and villas, from concept and 3D design to modular kitchens, wardrobes, finishes and handover.';

export const metadata: Metadata = buildMetadata({
  title: 'Full Home Interior Design in Jaipur',
  description: DESCRIPTION,
  path: PATH,
  image: data.hero.image,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: DESCRIPTION, path: PATH, image: data.hero.image }),
          faqSchema(data.faq.items),
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/#v4-services' },
            { label: data.hero.breadcrumbLabel, href: PATH },
          ]),
        ]}
      />
      <FullHomeClient />
    </>
  );
}
