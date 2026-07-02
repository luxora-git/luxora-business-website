import type { Metadata } from 'next';
import GalleryComponentShowcase from './GalleryComponentShowcase';

export const metadata: Metadata = {
  title: 'Gallery Component Showcase (Internal)',
  robots: { index: false, follow: false },
};

/**
 * Internal QA route — renders every Gallery Component Library (v2)
 * component once, grouped by folder, with realistic sample data. Not part
 * of the public site (noindex, not in sitemap). Exists purely to visually
 * verify spacing/typography/states/hover/responsive/accessibility before
 * any of these components are wired into Gallery Home.
 */
export default function GalleryComponentsShowcasePage() {
  return <GalleryComponentShowcase />;
}
