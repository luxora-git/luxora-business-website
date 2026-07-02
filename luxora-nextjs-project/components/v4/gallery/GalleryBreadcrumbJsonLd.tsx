export interface GalleryBreadcrumbJsonLdItem {
  label: string;
  /** Absolute or site-relative URL. Relative URLs are resolved against luxora.in. */
  href: string;
}

export interface GalleryBreadcrumbJsonLdProps {
  items: GalleryBreadcrumbJsonLdItem[];
}

const SITE_ORIGIN = 'https://luxora.in';

/** Renders a BreadcrumbList JSON-LD script tag matching the visible breadcrumb. */
export default function GalleryBreadcrumbJsonLd({ items }: GalleryBreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href.startsWith('http') ? item.href : `${SITE_ORIGIN}${item.href}`,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
