'use client';

import Link from 'next/link';
import type { GalleryProject, GalleryCategory } from '@/lib/content/gallery/types';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import GallerySection from '@/components/v4/gallery/layout/GallerySection';
import GallerySectionHeader from '@/components/v4/gallery/layout/GallerySectionHeader';
import GalleryImage from '@/components/v4/gallery/image/GalleryImage';
import GalleryTag from '@/components/v4/gallery/common/GalleryTag';
import RelatedDesignsRail from '@/components/v4/gallery/RelatedDesignsRail';
import PageHero from '@/components/v4/common/PageHero';
import GlobalClosingCTA from '@/components/v4/common/GlobalClosingCTA';
import { LuxuryGrain } from '@/components/v4/background';
import { useLightbox } from '@/components/v4/lightbox';

export default function GalleryDesignDetail({
  project,
  category,
  related,
}: {
  project: GalleryProject;
  category: GalleryCategory;
  related: GalleryProject[];
}) {
  const { open: openLightbox } = useLightbox();
  const allImages = project.images.length > 0 ? project.images : [project.coverImage];

  const showLightbox = (index: number) => {
    openLightbox({
      images: allImages.map((img) => ({ src: img.url, alt: img.alt })),
      initialIndex: index,
      panel: {
        variant: 'design',
        eyebrow: category.label,
        title: project.title,
        description: project.description,
        meta: [
          { label: 'Category', value: category.label },
          { label: 'Style', value: project.meta.style },
          { label: 'Room Type', value: category.label },
          { label: 'Budget Range', value: project.meta.budgetRange },
          { label: 'Area', value: project.meta.area },
          { label: 'Completion Timeline', value: project.meta.completionTime },
        ],
        relatedTitle: 'Related Designs',
        relatedLinks: related.slice(0, 4).map((r) => ({
          label: r.title,
          sublabel: `${r.meta.style} · ${category.label}`,
          href: `/luxury-v4/gallery/${r.category}/${r.slug}`,
        })),
      },
    });
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/luxury-v4' },
    { label: 'Gallery', href: '/luxury-v4/gallery' },
    { label: category.label, href: `/luxury-v4/gallery/${category.slug}` },
    { label: project.title },
  ];

  const infoPills = [
    { label: 'Location', value: project.meta.location },
    { label: 'Property Type', value: project.meta.propertyType },
    { label: 'Area', value: project.meta.area },
    { label: 'Style', value: project.meta.style },
    { label: 'Investment', value: project.meta.budgetRange },
    { label: 'Timeline', value: project.meta.completionTime },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        breadcrumbItems={breadcrumbItems}
        badge={`${category.label} Concept`}
        heading={project.title}
        description={project.description}
        image={project.coverImage.url}
        imageAlt={project.coverImage.alt}
      />

      {/* ── Design Information ── */}
      <GallerySection spacing="tight" background={luxoraColors.ivory}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {infoPills.map((pill) => (
            <div key={pill.label} className="border-l-2 pl-4" style={{ borderColor: 'rgba(201,162,39,0.4)' }}>
              <div className="text-[9px] font-semibold tracking-[0.16em] uppercase mb-1.5" style={{ color: luxoraColors.gold }}>
                {pill.label}
              </div>
              <div className="font-playfair text-[14px] md:text-[15px] leading-snug" style={{ color: luxoraColors.espresso }}>
                {pill.value}
              </div>
            </div>
          ))}
        </div>
      </GallerySection>

      {/* ── Editorial Story ── */}
      <GallerySection spacing="standard" background={luxoraColors.warmCream} patterns={<LuxuryGrain id={`${project.slug}-story-grain`} opacity={0.012} />}>
        <div className="max-w-3xl">
          <GallerySectionHeader eyebrow="The Concept" title="Behind the" titleItalic="Design" className="mb-9" />
          <p className="text-[15.5px] md:text-base leading-relaxed font-light mb-6" style={{ color: luxoraColors.softBrown }}>
            {project.description}
          </p>
          <p className="text-[15px] leading-[1.85] font-light" style={{ color: luxoraColors.softBrown }}>
            {project.story}
          </p>
        </div>
      </GallerySection>

      {/* ── Materials / Colour Palette / Furniture Highlights ── */}
      {(project.materials || project.colorPalette || project.furnitureHighlights) && (
        <GallerySection spacing="standard" background={luxoraColors.ivory}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-10">
            {project.materials && project.materials.length > 0 && (
              <div>
                <GallerySectionHeader eyebrow="Materials" title="What It's" titleItalic="Made Of" className="mb-7" />
                <div className="flex flex-wrap gap-2.5">
                  {project.materials.map((m) => (
                    <GalleryTag key={m} label={m} size="sm" />
                  ))}
                </div>
              </div>
            )}

            {project.colorPalette && project.colorPalette.length > 0 && (
              <div>
                <GallerySectionHeader eyebrow="Colour Palette" title="The Mood" titleItalic="Board" className="mb-7" />
                <div className="flex flex-wrap gap-6">
                  {project.colorPalette.map((c) => (
                    <div key={c.hex} className="flex flex-col items-center gap-2.5">
                      <span
                        className="block w-12 h-12 rounded-full shadow-[0_4px_14px_rgba(80,50,20,0.16)]"
                        style={{ background: c.hex, border: '1px solid rgba(160,120,80,0.20)' }}
                        aria-hidden="true"
                      />
                      <span className="text-[10.5px] font-medium tracking-[0.04em] text-center max-w-[80px]" style={{ color: luxoraColors.softBrown }}>
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.furnitureHighlights && project.furnitureHighlights.length > 0 && (
              <div>
                <GallerySectionHeader eyebrow="Furniture" title="Signature" titleItalic="Pieces" className="mb-7" />
                <ul className="space-y-3.5">
                  {project.furnitureHighlights.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[14px] font-light leading-relaxed" style={{ color: luxoraColors.softBrown }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: luxoraColors.gold }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </GallerySection>
      )}

      {/* ── Full Image Gallery — magazine rhythm, not a uniform grid ── */}
      <GallerySection spacing="standard" background={luxoraColors.warmCream}>
        <GallerySectionHeader eyebrow="Full Gallery" title="Every Angle," titleItalic="In Detail" className="mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {allImages.map((image, i) => {
            const isLarge = i === 0 && allImages.length > 1;
            return (
              <button
                key={image.url + i}
                type="button"
                onClick={() => showLightbox(i)}
                className={`group relative overflow-hidden rounded-2xl block w-full ${isLarge ? 'sm:col-span-2' : ''}`}
              >
                <GalleryImage
                  src={image.url}
                  alt={image.alt}
                  ratio={isLarge ? 'editorial' : 'standard'}
                  zoom="standard"
                  radius="lg"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 pointer-events-none" />
              </button>
            );
          })}
        </div>
      </GallerySection>

      {/* ── Related Designs / Portfolio / Service / Consultation / Estimate ── */}
      <GallerySection spacing="standard" background={luxoraColors.ivory}>
        <RelatedDesignsRail projects={related} />

        <div className="mt-14 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.18)' }}>
          <p className="text-[14px] font-light text-center sm:text-left" style={{ color: luxoraColors.espresso }}>
            Inspired by this look? See real, completed Luxora projects in our Portfolio.
          </p>
          <Link
            href="/luxury-v4/portfolio"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase flex-shrink-0"
            style={{ color: luxoraColors.gold }}
          >
            View Portfolio →
          </Link>
        </div>
      </GallerySection>

      <GlobalClosingCTA
        eyebrow="Start Your Journey"
        title="Love This Design?"
        titleItalic="Let's Build Something Even Better."
        description="Book a free consultation, or get an instant budget estimate for a similar design."
        image={project.coverImage.url}
        imageAlt={project.coverImage.alt}
      />
    </>
  );
}
