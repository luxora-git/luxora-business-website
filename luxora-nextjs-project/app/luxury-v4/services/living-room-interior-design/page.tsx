import type { Metadata } from 'next';
import { ServicePageShell, ServiceLitePage } from '@/components/v4/service';
import { livingRoomService } from '@/lib/content/services/livingRoom';

export const metadata: Metadata = {
  title: 'Living Room Interior Design | Luxora Interiors',
  description: livingRoomService.overview,
  alternates: { canonical: `/luxury-v4/services/${livingRoomService.slug}` },
  openGraph: {
    title: livingRoomService.title,
    description: livingRoomService.overview,
    images: [livingRoomService.heroImage.url],
  },
};

export default function LivingRoomServicePage() {
  return (
    <ServicePageShell>
      <ServiceLitePage data={livingRoomService} />
    </ServicePageShell>
  );
}
