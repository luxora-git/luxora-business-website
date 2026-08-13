import type { Metadata } from 'next';
import { ServicePageShell, ServiceLitePage } from '@/components/v4/service';
import { architecturalDesignService } from '@/lib/content/services/architecturalDesign';
import { buildMetadata } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema';

const NAME = 'Architectural Design';
const PATH = `/services/${architecturalDesignService.slug}`;
const DESCRIPTION =
  'Architectural design and space planning in Jaipur by Luxora Interiors — structural planning through façade design, blending function with aesthetics for homes and workspaces.';

export const metadata: Metadata = buildMetadata({
  title: 'Architectural Design in Jaipur',
  description: DESCRIPTION,
  path: PATH,
  image: architecturalDesignService.heroImage.url,
});

export default function ArchitecturalDesignServicePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: DESCRIPTION, path: PATH, image: architecturalDesignService.heroImage.url }),
          faqSchema(architecturalDesignService.faq),
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services/full-home-interior-design' },
            { label: architecturalDesignService.title, href: PATH },
          ]),
        ]}
      />
      <ServicePageShell>
        <ServiceLitePage data={architecturalDesignService} />
      </ServicePageShell>
    </>
  );
}
