import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import HomeClient from './HomeClient';

export const metadata: Metadata = buildMetadata({
  // Homepage leads with the master brand "Luxora". The established name
  // "Luxora Interiors" is preserved in the description and Organization schema.
  title: { absolute: 'Luxora — Interior Designers in Jaipur' },
  description:
    'Luxora Interiors (Luxora) is a Jaipur interior design studio crafting premium residential and commercial spaces — full-home interiors, modular kitchens, wardrobes, home automation and turnkey execution. Book a free design consultation.',
  path: '/',
});

export default function Page() {
  return (
    <>
      {/*
        Single, stable, semantic H1 for the homepage. The visible hero
        (V4HeroSection) uses large rotating brand messaging that changes per
        slide, so its display text is intentionally not the document H1 — this
        one truthful heading gives search engines and screen readers a stable
        understanding of the page. Visually hidden (sr-only), fully accessible.
      */}
      <h1 className="sr-only">
        Luxora — Premium Interior Designers in Jaipur
      </h1>
      <HomeClient />
    </>
  );
}
