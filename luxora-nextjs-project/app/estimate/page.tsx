import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import EstimateClient from './EstimateClient';

export const metadata: Metadata = buildMetadata({
  title: 'Interior Design Cost Estimate — Jaipur',
  description:
    'Get a free interior design cost estimate in Jaipur from Luxora Interiors. Answer a few questions about your home and budget to receive an indicative price for full-home interiors, modular kitchens and more.',
  path: '/estimate',
});

export default function Page() {
  return <EstimateClient />;
}
