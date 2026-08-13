/**
 * buildMetadata — one place that assembles page metadata (canonical + Open
 * Graph + Twitter) so every page is consistent and no field is forgotten.
 * metadataBase (set in the root layout) resolves the relative canonical/OG
 * paths to the canonical www origin.
 */
import type { Metadata } from 'next';
import { BRAND, SITE_LOCALE, DEFAULT_OG_IMAGE, absoluteUrl } from './siteConfig';

export interface BuildMetadataInput {
  /** Page <title>. String → gets the "| Luxora Interiors" template suffix.
   *  Pass { absolute } to opt out of the suffix. */
  title: string | { absolute: string };
  description: string;
  /** Site-relative canonical path, e.g. "/services/modular-kitchen-design". */
  path: string;
  /** Site-relative image path; defaults to the brand share image. */
  image?: string;
  /** Set true only for pages that must not be indexed. */
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const ogTitle = typeof title === 'string' ? title : title.absolute;
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: absoluteUrl(path),
      siteName: BRAND.name,
      locale: SITE_LOCALE,
      type: 'website',
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [imageUrl],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
