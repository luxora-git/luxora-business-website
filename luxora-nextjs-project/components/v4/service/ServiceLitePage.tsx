'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ServiceLiteData } from '@/lib/content/services/serviceLiteTypes';
import { getGalleryCategory } from '@/lib/content/gallery/categories';
import { getPortfolioProject } from '@/lib/content/portfolio/projects';
import { getRelatedServices } from '@/lib/content/services/serviceIndex';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import PageHero from '../common/PageHero';
import GallerySection from '../gallery/layout/GallerySection';
import GallerySectionHeader from '../gallery/layout/GallerySectionHeader';
import GlobalClosingCTA from '../common/GlobalClosingCTA';
import ServiceFAQ from './ServiceFAQ';
import ServiceRelatedServices from './ServiceRelatedServices';
import { LuxuryGrain, LuxuryHalo } from '../background';
import { useLightbox } from '../lightbox';

/**
 * ServiceLitePage — the shared template every room-type service page beyond
 * the flagship Full Home page renders through: Hero, Overview, Process,
 * Gallery, Related Designs (→ Design Gallery category), Related Portfolio
 * (→ real completed case studies), FAQ, and the standard Consultation +
 * Estimate close. Deliberately lighter than the flagship's bespoke template
 * — no fabricated pricing tables or comparison matrices, only sections
 * backed by real content.
 */
export default function ServiceLitePage({ data }: { data: ServiceLiteData }) {
  const { open: openLightbox } = useLightbox();
  const category = getGalleryCategory(data.categorySlug);
  const relatedPortfolio = data.relatedPortfolioSlugs.map((s) => getPortfolioProject(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const relatedServices = getRelatedServices(data.slug);

  const showLightbox = (index: number) => {
    openLightbox({
      images: data.gallery.map((img) => ({ src: img.url, alt: img.alt })),
      initialIndex: index,
      panel: {
        variant: 'service',
        eyebrow: data.eyebrow,
        title: data.title,
        description: data.overview,
        meta: [{ label: 'Service', value: data.title }],
        relatedTitle: 'Related Services',
        relatedLinks: relatedServices.slice(0, 4).map((s) => ({
          label: s.title,
          href: `/services/${s.slug}`,
        })),
      },
    });
  };

  return (
    <>
      <PageHero
        badge={data.eyebrow}
        heading={data.title}
        headingItalic={data.titleItalic}
        description={data.overview}
        image={data.heroImage.url}
        imageAlt={data.heroImage.alt}
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/full-home-interior-design' }, { label: data.title }]}
      />

      {/* Overview */}
      <GallerySection spacing="standard" background={luxoraColors.ivory}>
        <div className="max-w-3xl">
          <GallerySectionHeader eyebrow="Overview" title="What We" titleItalic="Design" className="mb-8" />
          <p className="text-[15px] md:text-base leading-relaxed font-light mb-8" style={{ color: luxoraColors.softBrown }}>
            {data.overview}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.overviewBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-[14px]" style={{ color: luxoraColors.espresso }}>
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: luxoraColors.gold }}>✓</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </GallerySection>

      {/* Process */}
      <GallerySection spacing="standard" background={luxoraColors.warmCream} patterns={<LuxuryGrain id={`${data.slug}-process-grain`} opacity={0.012} />}>
        <GallerySectionHeader eyebrow="Our Process" title="How It" titleItalic="Comes Together" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data.process.map((step) => (
            <div key={step.number}>
              <div className="font-playfair italic text-3xl mb-3" style={{ color: luxoraColors.gold }}>{step.number}</div>
              <h3 className="font-playfair text-base leading-snug mb-2" style={{ color: luxoraColors.espresso }}>{step.title}</h3>
              <p className="text-[13px] leading-relaxed font-light" style={{ color: luxoraColors.softBrown }}>{step.description}</p>
            </div>
          ))}
        </div>
      </GallerySection>

      {/* Gallery */}
      <GallerySection spacing="standard" background={luxoraColors.ivory} patterns={<LuxuryHalo position="top-right" size="lg" opacity={0.05} blur={110} />}>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <GallerySectionHeader eyebrow="Real Work" title="Recent" titleItalic="Designs" />
          {category && (
            <Link href={`/gallery/${category.slug}`} className="text-[11px] font-bold tracking-[0.1em] uppercase flex-shrink-0" style={{ color: luxoraColors.gold }}>
              View All in Gallery →
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {data.gallery.map((img, i) => (
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
        <GallerySection spacing="standard" background={luxoraColors.warmCream}>
          <GallerySectionHeader eyebrow="Proof of Execution" title="See It" titleItalic="Completed" description="Real Luxora clients who chose this exact service." className="mb-10" />
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

      {/* FAQ */}
      <ServiceFAQ
        data={{
          eyebrow: 'Good to Know',
          title: 'Questions About',
          titleItalic: data.title,
          description: 'A few things people usually ask before starting.',
          items: data.faq,
        }}
      />

      {/* Related Services */}
      <ServiceRelatedServices
        data={{
          eyebrow: 'Explore More',
          title: 'Other Services',
          titleItalic: 'You May Need',
          description: 'Most Luxora homes combine more than one of these.',
          services: relatedServices.map((s, i) => ({
            number: String(i + 1).padStart(2, '0'),
            title: s.title,
            description: s.description,
            href: `/services/${s.slug}`,
          })),
        }}
      />

      {/* CTA */}
      <GlobalClosingCTA
        eyebrow="Start Your Journey"
        title="Ready To Begin"
        titleItalic="Your Interior Journey?"
        description={`Share your brief for your ${data.title.toLowerCase()} and our design team will respond within one business day.`}
        image={data.heroImage.url}
        imageAlt={data.heroImage.alt}
      />
    </>
  );
}
