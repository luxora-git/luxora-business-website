import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import ContactClient from './ContactClient';

export const metadata: Metadata = buildMetadata({
  // Absolute, Luxora-led title. "Luxora Interiors" is preserved in the
  // description and the page body / NAP for search recognition.
  title: { absolute: 'Contact Luxora — Jaipur' },
  description:
    'Contact Luxora Interiors in Jaipur for premium interior design. Call +91 73399 93930, email hello@luxora.in, or message us on WhatsApp — or book a free design consultation.',
  path: '/contact-us',
});

export default function Page() {
  return <ContactClient />;
}
