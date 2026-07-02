'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { PortfolioProject } from '@/lib/content/portfolio/types';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import GallerySection from '@/components/v4/gallery/layout/GallerySection';
import GallerySectionHeader from '@/components/v4/gallery/layout/GallerySectionHeader';
import PageHero from '@/components/v4/common/PageHero';
import GlobalClosingCTA from '@/components/v4/common/GlobalClosingCTA';
import { LuxuryGrain } from '@/components/v4/background';
import { useLightbox } from '@/components/v4/lightbox';

export default function PortfolioCaseStudy({
  project,
  related,
}: {
  project: PortfolioProject;
  related: PortfolioProject[];
}) {
  const { open: openLightbox } = useLightbox();
  const allImages = [project.heroImage, ...project.gallery];

  const showLightbox = (index: number) => {
    openLightbox({
      images: allImages.map((img) => ({ src: img.url, alt: img.alt })),
      initialIndex: index,
      panel: {
        variant: 'portfolio',
        eyebrow: `Completed Project — ${project.category}`,
        title: project.title,
        description: project.overview,
        meta: [
          { label: 'Location', value: project.facts.location },
          { label: 'Property Type', value: project.facts.propertyType },
          { label: 'Scope', value: project.facts.area },
          { label: 'Completion Timeline', value: project.facts.duration },
        ],
        relatedTitle: 'Related Portfolio',
        relatedLinks: related.slice(0, 4).map((r) => ({
          label: r.title,
          sublabel: r.category,
          href: `/portfolio/${r.slug}`,
        })),
      },
    });
  };

  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Portfolio', href: '/portfolio' }, { label: project.category }]}
        badge={`Completed Project — ${project.category}`}
        heading={project.title}
        description={project.overview}
        image={project.heroImage.url}
        imageAlt={project.heroImage.alt}
      />

      {/* ── Project Facts ── */}
      <GallerySection spacing="tight" background={luxoraColors.ivory}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {[
            { label: 'Location', value: project.facts.location },
            { label: 'Property Type', value: project.facts.propertyType },
            { label: 'Scope', value: project.facts.area },
            { label: 'Investment Range', value: project.facts.investmentRange },
            { label: 'Duration', value: project.facts.duration },
          ].map((fact) => (
            <div key={fact.label} className="border-l-2 pl-4" style={{ borderColor: 'rgba(201,162,39,0.4)' }}>
              <div className="text-[10px] font-semibold tracking-[0.16em] uppercase mb-1.5" style={{ color: luxoraColors.gold }}>
                {fact.label}
              </div>
              <div className="font-playfair text-[15px] md:text-base leading-snug" style={{ color: luxoraColors.espresso }}>
                {fact.value}
              </div>
            </div>
          ))}
        </div>
      </GallerySection>

      {/* ── Story ── */}
      <GallerySection spacing="standard" background={luxoraColors.warmCream} patterns={<LuxuryGrain id={`${project.slug}-story-grain`} opacity={0.012} />}>
        <div className="max-w-3xl">
          <GallerySectionHeader eyebrow="The Story" title="Behind the" titleItalic="Design" className="mb-10" />
          <div className="space-y-5 mb-8">
            {project.story.map((paragraph, i) => (
              <p key={i} className="text-[15px] md:text-base leading-relaxed font-light" style={{ color: luxoraColors.softBrown }}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {project.facts.rooms.map((room) => (
              <span
                key={room}
                className="text-[11px] font-semibold tracking-[0.08em] uppercase px-3.5 py-2 rounded-full"
                style={{ background: 'rgba(201,162,39,0.08)', color: luxoraColors.gold, border: '1px solid rgba(201,162,39,0.22)' }}
              >
                {room}
              </span>
            ))}
          </div>
        </div>
      </GallerySection>

      {/* ── Gallery ── */}
      <GallerySection spacing="standard" background={luxoraColors.ivory}>
        <GallerySectionHeader eyebrow="Full Project Gallery" title="Every Room," titleItalic="In Detail" className="mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {allImages.map((image, i) => (
            <button
              key={image.url}
              type="button"
              onClick={() => showLightbox(i)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] block w-full"
            >
              <Image src={image.url} alt={image.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </button>
          ))}
        </div>
      </GallerySection>

      {/* ── Related Projects ── */}
      {related.length > 0 && (
        <GallerySection spacing="standard" background={luxoraColors.warmCream}>
          <GallerySectionHeader eyebrow="Related Work" title="More From Our" titleItalic="Portfolio" className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.slug} href={`/portfolio/${r.slug}`} className="group relative rounded-2xl overflow-hidden aspect-[4/5] block border" style={{ borderColor: 'rgba(160,120,80,0.16)' }}>
                <Image src={r.heroImage.url} alt={r.heroImage.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(44,31,20,0.85) 0%, transparent 55%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-[10px] tracking-[0.16em] uppercase font-semibold mb-1.5" style={{ color: luxoraColors.gold }}>{r.category}</div>
                  <h3 className="font-playfair italic text-lg text-white leading-snug">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </GallerySection>
      )}

      {/* ── CTA ── */}
      <GlobalClosingCTA
        eyebrow="Start Your Journey"
        title="Inspired By This Project?"
        titleItalic="Let's Create Your Story."
        description="Every project here started with a single conversation. Share your brief and our design team will respond within one business day."
        image={project.heroImage.url}
        imageAlt={project.heroImage.alt}
      />
    </>
  );
}
