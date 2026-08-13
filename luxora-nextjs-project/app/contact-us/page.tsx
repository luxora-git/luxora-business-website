import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import ContactClient from './ContactClient';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Luxora Interiors — Jaipur',
  description:
    'Contact Luxora Interiors in Jaipur for premium interior design. Call +91 73399 93930, email hello@luxora.in, or message us on WhatsApp — or book a free design consultation.',
  path: '/contact-us',
});

export default function Page() {
  return <ContactClient />;
}
