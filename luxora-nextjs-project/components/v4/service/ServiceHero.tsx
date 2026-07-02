import type { ServiceBreadcrumbItem, ServiceHeroData } from '@/lib/content/services/types';
import PageHero from '../common/PageHero';

export interface ServiceHeroProps {
  data: ServiceHeroData;
  breadcrumbItems: ServiceBreadcrumbItem[];
}

/**
 * ServiceHero — adapts a service page's `ServiceHeroData` to the shared
 * `PageHero` (the official Luxora V4 internal-page Hero). Kept as a thin
 * mapper so service content files don't need to change shape.
 */
export default function ServiceHero({ data, breadcrumbItems }: ServiceHeroProps) {
  return (
    <PageHero
      image={data.image}
      imageAlt={data.imageAlt}
      breadcrumbItems={breadcrumbItems}
      heading={data.heading}
      headingItalic={data.headingItalic}
      description={data.description}
    />
  );
}
