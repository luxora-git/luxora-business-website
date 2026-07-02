import type { ServiceFinalCtaData } from '@/lib/content/services/types';
import GlobalClosingCTA from '../common/GlobalClosingCTA';

export interface ServiceFinalCTAProps {
  data: ServiceFinalCtaData;
}

/**
 * ServiceFinalCTA — adapts a service page's `ServiceFinalCtaData` to the
 * shared `GlobalClosingCTA` (the official Luxora V4 closing section, the
 * same one every other page renders above its footer).
 */
export default function ServiceFinalCTA({ data }: ServiceFinalCTAProps) {
  return (
    <GlobalClosingCTA
      eyebrow={data.eyebrow}
      title={data.title}
      titleItalic={data.titleItalic}
      description={data.description}
      image={data.image}
      imageAlt={data.imageAlt}
    />
  );
}
