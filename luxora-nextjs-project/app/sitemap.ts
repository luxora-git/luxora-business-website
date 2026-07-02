import type { MetadataRoute } from 'next';
import { galleryCategories } from '@/lib/content/gallery/categories';
import { galleryProjects } from '@/lib/content/gallery/projects';
import { allServices } from '@/lib/content/services/serviceIndex';
import { interiorElements } from '@/lib/content/catalog/elements';
import { products } from '@/lib/content/catalog/products';
import { portfolioProjects } from '@/lib/content/portfolio/projects';

const SITE_ORIGIN = 'https://luxora.in';
const BASE = '';

// Static top-level pages
const staticPages = [
  { url: `${BASE}/`,                    priority: 1.0, changeFrequency: 'weekly' as const },
  { url: `${BASE}/gallery`,             priority: 0.9, changeFrequency: 'weekly' as const },
  { url: `${BASE}/portfolio`,           priority: 0.8, changeFrequency: 'weekly' as const },
  { url: `${BASE}/elements`,            priority: 0.7, changeFrequency: 'monthly' as const },
  { url: `${BASE}/products`,            priority: 0.7, changeFrequency: 'monthly' as const },
  { url: `${BASE}/about-us`,            priority: 0.6, changeFrequency: 'monthly' as const },
  { url: `${BASE}/contact-us`,          priority: 0.6, changeFrequency: 'monthly' as const },
  { url: `${BASE}/careers`,             priority: 0.5, changeFrequency: 'monthly' as const },
  { url: `${BASE}/sitemap`,             priority: 0.3, changeFrequency: 'monthly' as const },
  // Policies
  { url: `${BASE}/privacy-policy`,      priority: 0.3, changeFrequency: 'yearly' as const },
  { url: `${BASE}/terms-conditions`,    priority: 0.3, changeFrequency: 'yearly' as const },
  { url: `${BASE}/disclaimer`,          priority: 0.3, changeFrequency: 'yearly' as const },
  { url: `${BASE}/refund-policy`,       priority: 0.3, changeFrequency: 'yearly' as const },
  { url: `${BASE}/cancellation-policy`, priority: 0.3, changeFrequency: 'yearly' as const },
  { url: `${BASE}/shipping-policy`,     priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Service pages
  const serviceUrls = allServices.map((s) => ({
    url: `${SITE_ORIGIN}${BASE}/services/${s.slug}`,
    priority: 0.8 as const,
    changeFrequency: 'monthly' as const,
  }));

  // Gallery category pages
  const categoryUrls = galleryCategories.map((category) => ({
    url: `${SITE_ORIGIN}${BASE}/gallery/${category.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8 as const,
  }));

  // Gallery project pages
  const projectUrls = galleryProjects.map((project) => ({
    url: `${SITE_ORIGIN}${BASE}/gallery/${project.category}/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7 as const,
  }));

  // Portfolio project pages
  const portfolioUrls = portfolioProjects.map((p) => ({
    url: `${SITE_ORIGIN}${BASE}/portfolio/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7 as const,
  }));

  // Interior element pages
  const elementUrls = interiorElements.map((e) => ({
    url: `${SITE_ORIGIN}${BASE}/elements/${e.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6 as const,
  }));

  // Product pages
  const productUrls = products.map((p) => ({
    url: `${SITE_ORIGIN}${BASE}/products/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6 as const,
  }));

  const baseUrls = staticPages.map((p) => ({
    url: `${SITE_ORIGIN}${p.url}`,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  return [
    ...baseUrls,
    ...serviceUrls,
    ...categoryUrls,
    ...projectUrls,
    ...portfolioUrls,
    ...elementUrls,
    ...productUrls,
  ];
}