import type { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/lib/seo/siteConfig';
import { galleryCategories } from '@/lib/content/gallery/categories';
import { galleryProjects } from '@/lib/content/gallery/projects';
import { galleryCollections } from '@/lib/content/gallery/collections';
import { galleryStyles } from '@/lib/content/gallery/styles';
import { allServices } from '@/lib/content/services/serviceIndex';
import { interiorElements } from '@/lib/content/catalog/elements';
import { products } from '@/lib/content/catalog/products';
import { portfolioProjects } from '@/lib/content/portfolio/projects';

// Static top-level pages (canonical, indexable). Non-indexable utilities
// (e.g. /gallery/components) and API routes are deliberately excluded.
const staticPages = [
  { url: '/',                    priority: 1.0, changeFrequency: 'weekly' as const },
  { url: '/gallery',             priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/portfolio',           priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/estimate',            priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/elements',            priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/products',            priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/about-us',            priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/contact-us',          priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/careers',             priority: 0.5, changeFrequency: 'monthly' as const },
  { url: '/sitemap',             priority: 0.3, changeFrequency: 'monthly' as const },
  // Policies
  { url: '/privacy-policy',      priority: 0.3, changeFrequency: 'yearly' as const },
  { url: '/terms-conditions',    priority: 0.3, changeFrequency: 'yearly' as const },
  { url: '/disclaimer',          priority: 0.3, changeFrequency: 'yearly' as const },
  { url: '/refund-policy',       priority: 0.3, changeFrequency: 'yearly' as const },
  { url: '/cancellation-policy', priority: 0.3, changeFrequency: 'yearly' as const },
  { url: '/shipping-policy',     priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrls = staticPages.map((p) => ({
    url: `${SITE_ORIGIN}${p.url}`,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // Service pages
  const serviceUrls = allServices.map((s) => ({
    url: `${SITE_ORIGIN}/services/${s.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8 as const,
  }));

  // Gallery category pages
  const categoryUrls = galleryCategories.map((category) => ({
    url: `${SITE_ORIGIN}/gallery/${category.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8 as const,
  }));

  // Gallery collection pages
  const collectionUrls = galleryCollections.map((c) => ({
    url: `${SITE_ORIGIN}/gallery/collections/${c.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6 as const,
  }));

  // Gallery style pages
  const styleUrls = galleryStyles.map((s) => ({
    url: `${SITE_ORIGIN}/gallery/style/${s.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6 as const,
  }));

  // Gallery project pages (real lastModified dates from content)
  const projectUrls = galleryProjects.map((project) => ({
    url: `${SITE_ORIGIN}/gallery/${project.category}/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7 as const,
  }));

  // Portfolio project pages (real lastModified dates from content)
  const portfolioUrls = portfolioProjects.map((p) => ({
    url: `${SITE_ORIGIN}/portfolio/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7 as const,
  }));

  // Interior element pages
  const elementUrls = interiorElements.map((e) => ({
    url: `${SITE_ORIGIN}/elements/${e.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6 as const,
  }));

  // Product pages
  const productUrls = products.map((p) => ({
    url: `${SITE_ORIGIN}/products/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6 as const,
  }));

  return [
    ...baseUrls,
    ...serviceUrls,
    ...categoryUrls,
    ...collectionUrls,
    ...styleUrls,
    ...projectUrls,
    ...portfolioUrls,
    ...elementUrls,
    ...productUrls,
  ];
}
