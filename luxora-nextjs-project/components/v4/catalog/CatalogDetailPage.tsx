'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CatalogItem } from '@/lib/content/catalog/types';
import { getGalleryCategory } from '@/lib/content/gallery/categories';
import { getPortfolioProject } from '@/lib/content/portfolio/projects';
import { allServices } from '@/lib/content/services/serviceIndex';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import PageHero from '../common/PageHero';
import GallerySection from '../gallery/layout/GallerySection';
import GallerySectionHeader from '../gallery/layout/GallerySectionHeader';
import GlobalClosingCTA from '../common/GlobalClosingCTA';
import { LuxuryGrain, LuxuryHalo } from '../background';
import { useLightbox } from '../lightbox';

export interface CatalogDetailPageProps {
  item: CatalogItem;
  /** "Interior Elements" or "Products" — the parent index page's label + href. */
  parentLabel: string;
  parentHref: string;
}

/**
 * CatalogDetailPage — the shared template for every Interior Element and
 * Product page: Hero, editorial description + highlights, real project
 * gallery, and links out to the matching Gallery category, Service page and
 * real Portfolio projects, closing with the standard Consultation + Estimate
 * CTA. No pricing/SKUs — we have no real per-item price list.
 */
export default function CatalogDetailPage({ item, parentLabel, parentHref }: CatalogDetailPageProps) {
  const { open: openLightbox } = useLightbox();
  const category = item.gallerySlug ? getGalleryCategory(item.gallerySlug) : undefined;
  const service = item.serviceSlug ? allServices.find((s) => s.slug === item.serviceSlug) : undefined;
  const relatedPortfolio = item.relatedPortfolioSlugs.map((s) => getPortfolioProject(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const isProduct = parentLabel === 'Products';

  const relatedLinks = [
    ...(service ? [{ label: `${service.title} Service`, sublabel: 'Service', href: `/services/${service.slug}` }] : []),
    ...(category ? [{ label: `${category.label} Gallery`, sublabel: 'Design Gallery', href: `/gallery/${category.slug}` }] : []),
    ...relatedPortfolio.map((p) => ({ label: p.title, sublabel: p.category, href: `/portfolio/${p.slug}` })),
  ].slice(0, 4);

  const showLightbox = (index: number) => {
    openLightbox({
      images: item.gallery.map((img) => ({ src: img.url, alt: img.alt })),
      initialIndex: index,
      panel: {
        variant: 'product',
        eyebrow: parentLabel,
        title: item.title,
        description: item.description,
        meta: [
          { label: 'Category', value: parentLabel },
          ...(service ? [{ label: 'Delivered Through', value: service.title }] : []),
        ],
        relatedTitle: 'Explore More',
        relatedLinks,
      },
    });
  };

  return (
    <>
      <PageHero
        badge={item.eyebrow}
        heading={item.title}
        description={item.description}
        image={item.heroImage.url}
        imageAlt={item.heroImage.alt}
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: parentLabel, href: parentHref }, { label: item.title }]}
      />

      {/* Description + Highlights */}
      <GallerySection spacing="standard" background={luxoraColors.ivory}>
        <div className="max-w-3xl">
          <GallerySectionHeader eyebrow="Overview" title="What We" titleItalic="Design" className="mb-8" />
          <p className="text-[15px] md:text-base leading-relaxed font-light mb-8" style={{ color: luxoraColors.softBrown }}>
            {item.description}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {item.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-[14px]" style={{ color: luxoraColors.espresso }}>
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: luxoraColors.gold }}>✓</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </GallerySection>

      {/* Gallery */}
      <GallerySection spacing="standard" background={luxoraColors.warmCream} patterns={<LuxuryHalo position="top-right" size="lg" opacity={0.05} blur={110} />}>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <GallerySectionHeader eyebrow="Real Work" title="Recent" titleItalic="Designs" />
          {category && (
            <Link href={`/gallery/${category.slug}`} className="text-[11px] font-bold tracking-[0.1em] uppercase flex-shrink-0" style={{ color: luxoraColors.gold }}>
              View All in Gallery →
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {item.gallery.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => showLightbox(i)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] block w-full"
            >
              <Image src={img.url} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </button>
          ))}
        </div>
      </GallerySection>

      {/* Related Portfolio */}
      {relatedPortfolio.length > 0 && (
        <GallerySection spacing="standard" background={luxoraColors.ivory}>
          <GallerySectionHeader eyebrow="Proof of Execution" title="See It" titleItalic="Completed" description="Real Luxora clients whose projects included this." className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPortfolio.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className="group relative rounded-2xl overflow-hidden aspect-[4/5] block border" style={{ borderColor: 'rgba(160,120,80,0.16)' }}>
                <Image src={project.heroImage.url} alt={project.heroImage.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(44,31,20,0.85) 0%, transparent 55%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-[10px] tracking-[0.16em] uppercase font-semibold mb-1.5" style={{ color: luxoraColors.gold }}>{project.category}</div>
                  <h3 className="font-playfair italic text-lg text-white leading-snug">{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </GallerySection>
      )}

      {/* Related Service */}
      {service && (
        <GallerySection spacing="tight" background={luxoraColors.warmCream}>
          <div className="rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.18)' }}>
            <p className="text-[14px] font-light text-center sm:text-left" style={{ color: luxoraColors.espresso }}>
              Want this delivered as part of a full project? See our {service.title} service.
            </p>
            <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase flex-shrink-0" style={{ color: luxoraColors.gold }}>
              View Service →
            </Link>
          </div>
        </GallerySection>
      )}

      {/* CTA */}
      {isProduct ? (
        <GlobalClosingCTA
          eyebrow="Start Your Journey"
          title="Bring"
          titleItalic="Luxury Home."
          description={`Share your brief for your ${item.title.toLowerCase()} and our design team will respond within one business day.`}
          image={item.heroImage.url}
          imageAlt={item.heroImage.alt}
        />
      ) : (
        <GlobalClosingCTA
          eyebrow="Start Your Journey"
          title="Ready To Elevate"
          titleItalic="Every Detail?"
          description={`Share your brief for your ${item.title.toLowerCase()} and our design team will respond within one business day.`}
          image={item.heroImage.url}
          imageAlt={item.heroImage.alt}
        />
      )}
    </>
  );
}
