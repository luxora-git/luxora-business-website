'use client';

import { useState } from 'react';
import V4SectionHeader from '../V4SectionHeader';
import { LuxuryContour, LuxuryHalo, LuxuryGrain, LuxuryDivider } from '../background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { useLightbox } from '../lightbox';
import type { LightboxPanelContent } from '../lightbox';
import type { ServiceGalleryCollection, ServiceGalleryData, ServiceGalleryProject } from '@/lib/content/services/types';

function projectLightboxPanel(project: ServiceGalleryProject, description?: string): LightboxPanelContent {
  return {
    variant: 'service',
    eyebrow: project.style,
    title: project.title,
    description,
    meta: [
      { label: 'Location', value: project.location },
      { label: 'Area', value: project.area },
      { label: 'Style', value: project.style },
      { label: 'Completion Timeline', value: project.completionTime },
    ],
  };
}

export interface ServiceGalleryShowcaseProps {
  data: ServiceGalleryData;
}

/* ── Tiny gold diamond separator used between metadata fields ───────── */
function MetaDot() {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-[3px] h-[3px] rotate-45 mx-2.5 align-middle"
      style={{ background: 'rgba(201,162,39,0.65)' }}
    />
  );
}

/* ── Elegant arrow, shared by every card ─────────────────────────────── */
function CardArrow({ light = false }: { light?: boolean }) {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 transition-all duration-300 group-hover:translate-x-0.5"
      style={{
        border: `1px solid ${light ? 'rgba(253,250,246,0.45)' : 'rgba(201,162,39,0.35)'}`,
        color: light ? '#FDFAF6' : luxoraColors.gold,
      }}
      aria-hidden="true"
    >
      →
    </span>
  );
}

/* ── Small project card — used in the side stack ─────────────────────── */
function SideProjectCard({ project, height, onOpen }: { project: ServiceGalleryProject; height: string; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative rounded-2xl overflow-hidden block w-full text-left border-2 shadow-[0_4px_18px_rgba(100,60,20,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C9A227] hover:shadow-[0_22px_50px_rgba(100,60,20,0.24)]"
      style={{ height, borderColor: 'rgba(160,120,80,0.16)' }}
    >
      <img
        src={project.image}
        alt={project.imageAlt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(20,14,6,0.85) 0%, rgba(20,14,6,0.15) 55%, transparent 100%)' }}
      />
      <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-playfair text-[1rem] leading-snug mb-1.5 truncate" style={{ color: '#FDFAF6' }}>
            {project.title}
          </h4>
          <div className="text-[10px] tracking-[0.08em] uppercase" style={{ color: 'rgba(253,250,246,0.68)' }}>
            {project.style}
            <MetaDot />
            {project.area}
          </div>
        </div>
        <CardArrow light />
      </div>
    </button>
  );
}

/* ── Strip card — used in the horizontal filmstrip below ─────────────── */
function StripProjectCard({ project, onOpen }: { project: ServiceGalleryProject; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex-shrink-0 w-[260px] lg:w-auto rounded-2xl overflow-hidden block text-left border-2 h-[300px] shadow-[0_4px_18px_rgba(100,60,20,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C9A227] hover:shadow-[0_22px_50px_rgba(100,60,20,0.24)]"
      style={{ borderColor: 'rgba(160,120,80,0.16)' }}
    >
      <img
        src={project.image}
        alt={project.imageAlt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(20,14,6,0.82) 0%, rgba(20,14,6,0.10) 55%, transparent 100%)' }}
      />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h4 className="font-playfair text-[1rem] leading-snug mb-1.5" style={{ color: '#FDFAF6' }}>
          {project.title}
        </h4>
        <div className="flex items-center justify-between gap-3">
          <div className="text-[10px] tracking-[0.08em] uppercase" style={{ color: 'rgba(253,250,246,0.68)' }}>
            {project.style}
            <MetaDot />
            {project.area}
            <MetaDot />
            {project.completionTime}
          </div>
          <CardArrow light />
        </div>
      </div>
    </button>
  );
}

/* ── One full editorial layout = one carousel slide ──────────────────── */
function CollectionSlide({ collection }: { collection: ServiceGalleryCollection }) {
  const { open: openLightbox } = useLightbox();
  const sideProjects = collection.projects.slice(0, 2);
  const sideHeights = ['268px', '368px'];

  const featuredMeta = [
    { label: 'Location', value: collection.featured.location },
    { label: 'Area', value: collection.featured.area },
    { label: 'Style', value: collection.featured.style },
    { label: 'Budget', value: collection.featured.budgetRange },
    { label: 'Completion', value: collection.featured.completionTime },
  ];

  const openFeatured = () => {
    openLightbox({
      images: [{ src: collection.featured.image, alt: collection.featured.imageAlt }],
      panel: {
        variant: 'service',
        eyebrow: 'Featured Project',
        title: collection.featured.title,
        description: collection.featured.description,
        meta: [
          { label: 'Location', value: collection.featured.location },
          { label: 'Area', value: collection.featured.area },
          { label: 'Style', value: collection.featured.style },
          { label: 'Budget Range', value: collection.featured.budgetRange },
          { label: 'Completion Timeline', value: collection.featured.completionTime },
        ],
      },
    });
  };

  const openProject = (project: ServiceGalleryProject) => {
    openLightbox({
      images: [{ src: project.image, alt: project.imageAlt }],
      panel: projectLightboxPanel(project),
    });
  };

  return (
    <div className="w-full flex-shrink-0">
      {/* Collection label */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: '#9C7B68' }}>
          Collection
        </span>
        <span className="h-px w-8" style={{ background: 'rgba(201,162,39,0.4)' }} />
        <span className="font-playfair italic text-lg" style={{ color: luxoraColors.espresso }}>
          {collection.label}
        </span>
      </div>

      {/* Featured project + side stack — roughly a 70/30 split */}
      <div className="grid grid-cols-1 lg:grid-cols-[2.3fr_1fr] gap-6 lg:gap-8 mb-14 md:mb-16">
        {/* Featured */}
        <button
          type="button"
          onClick={openFeatured}
          className="group relative rounded-3xl overflow-hidden block w-full text-left h-[480px] md:h-[600px] lg:h-[660px] border shadow-[0_24px_70px_rgba(100,60,20,0.16)] transition-shadow duration-500 hover:shadow-[0_30px_85px_rgba(100,60,20,0.22)]"
          style={{ borderColor: 'rgba(201,162,39,0.18)' }}
        >
          <img
            src={collection.featured.image}
            alt={collection.featured.imageAlt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ background: 'linear-gradient(180deg, rgba(20,14,6,0.08) 0%, rgba(20,14,6,0.30) 45%, rgba(20,14,6,0.90) 100%)' }}
          />

          <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
            <span className="text-[10px] font-semibold tracking-[0.24em] uppercase mb-3 block" style={{ color: '#E8C468' }}>
              Featured Project
            </span>
            <h3 className="font-playfair font-normal leading-[1.12] mb-3" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.3rem)', color: '#FDFAF6' }}>
              {collection.featured.title}
            </h3>
            <p className="text-sm md:text-[15px] leading-relaxed font-light mb-5 max-w-lg" style={{ color: 'rgba(253,250,246,0.78)' }}>
              {collection.featured.description}
            </p>

            <div className="w-10 h-px mb-5" style={{ background: luxoraColors.gold }} />

            {/* Below xl: clean 2-col grid, no dividers (always wrap-safe).
                At xl+ the featured card is comfortably wide enough for all
                five fields on one line, so it becomes an editorial spec
                row with thin gold dividers between fields. */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:flex xl:flex-nowrap gap-x-6 gap-y-4">
              {featuredMeta.map((item, i) => (
                <div
                  key={item.label}
                  className={i > 0 ? 'xl:border-l xl:pl-6 xl:pr-7' : 'xl:pr-7'}
                  style={i > 0 ? { borderColor: 'rgba(201,162,39,0.28)' } : undefined}
                >
                  <div className="text-[9px] tracking-[0.18em] uppercase mb-1.5 font-semibold" style={{ color: '#C9A227' }}>
                    {item.label}
                  </div>
                  <div className="font-playfair text-[13px] md:text-sm xl:whitespace-nowrap" style={{ color: '#FDFAF6' }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </button>

        {/* Side stack */}
        <div className="flex flex-col gap-6">
          {sideProjects.map((project, i) => (
            <SideProjectCard key={project.title} project={project} height={sideHeights[i] ?? '200px'} onOpen={() => openProject(project)} />
          ))}
        </div>
      </div>

      {/* Horizontal project strip */}
      <div className="-mx-6 px-6 lg:mx-0 lg:px-0 overflow-x-auto pb-2">
        <div className="flex lg:grid lg:grid-cols-5 gap-5 lg:gap-5 w-max lg:w-full">
          {collection.projects.map((project) => (
            <StripProjectCard key={`strip-${project.title}`} project={project} onOpen={() => openProject(project)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServiceGalleryShowcase({ data }: ServiceGalleryShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState(data.filters[0]);
  const [current, setCurrent] = useState(0);
  const total = data.collections.length;

  const next = () => setCurrent((p) => (p + 1) % total);
  const prev = () => setCurrent((p) => (p - 1 + total) % total);

  return (
    <section
      id="v4-service-gallery"
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ backgroundColor: '#F5EFE6' }}
    >
      <LuxuryContour position="top-left" opacity={0.03} scale={1.3} />
      <LuxuryHalo position="bottom-right" size="lg" opacity={0.05} blur={110} />
      <LuxuryGrain id="service-gallery-grain" opacity={0.012} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div data-v4-reveal-heading>
          <V4SectionHeader
            eyebrow={data.eyebrow}
            title={data.title}
            titleItalic={data.titleItalic}
            description={data.description}
            centered
          />
        </div>

        {/* ── Filter pills — styling only, no live filtering yet ──────── */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 md:mb-20" data-v4-reveal>
          {data.filters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className="px-6 py-3 rounded-full text-[11px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={
                  isActive
                    ? { background: luxoraColors.gold, color: '#1C1005', boxShadow: '0 10px 28px rgba(201,162,39,0.32)' }
                    : {
                        background: 'rgba(253,250,246,0.5)',
                        color: '#9C7B68',
                        border: '1px solid rgba(160,120,80,0.22)',
                      }
                }
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.borderColor = 'rgba(201,162,39,0.55)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.borderColor = 'rgba(160,120,80,0.22)';
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* ── Desktop carousel nav — counter + arrows, same logic as the
            homepage Design Gallery carousel ─────────────────────────── */}
        <div className="hidden md:flex items-center justify-center gap-4 mb-8" data-v4-reveal>
          <button
            onClick={prev}
            className="group flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:border-[#1C1005] hover:bg-[#1C1005]"
            style={{ borderColor: 'rgba(160,120,80,0.30)', background: '#FDFAF6' }}
            aria-label="Previous collection"
          >
            <svg className="h-4 w-4 transition-colors duration-300 group-hover:stroke-[#C9A227]" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="tabular-nums text-[11px] font-semibold tracking-[0.16em]" style={{ color: '#9C7B68' }}>
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>

          <button
            onClick={next}
            className="group flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:border-[#1C1005] hover:bg-[#1C1005]"
            style={{ borderColor: 'rgba(160,120,80,0.30)', background: '#FDFAF6' }}
            aria-label="Next collection"
          >
            <svg className="h-4 w-4 transition-colors duration-300 group-hover:stroke-[#C9A227]" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ── REAL CSS TRACK SLIDER — identical mechanism to the homepage
            Design Gallery: all collections render side-by-side in a flex
            row, the track translates by -N*100%, overflow-hidden clips the
            off-screen slides. Every slide shares identical fixed-height
            cards, so paging never causes a layout shift. ──────────────── */}
        <div className="overflow-hidden" data-v4-reveal>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {data.collections.map((collection) => (
              <CollectionSlide key={collection.label} collection={collection} />
            ))}
          </div>
        </div>

        {/* ── Mobile carousel nav — dots + arrows, slides the whole block */}
        <div className="mt-8 flex items-center justify-center gap-4 md:hidden">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(160,120,80,0.30)]"
            style={{ background: '#FDFAF6' }}
            aria-label="Previous collection"
          >
            <svg className="h-4 w-4" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {data.collections.map((collection, i) => (
              <button
                key={collection.label}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: current === i ? '24px' : '8px',
                  height: '8px',
                  background: current === i ? luxoraColors.gold : 'rgba(201,162,39,0.3)',
                }}
                aria-label={`${collection.label} collection`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(160,120,80,0.30)]"
            style={{ background: '#FDFAF6' }}
            aria-label="Next collection"
          >
            <svg className="h-4 w-4" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ── CTA — the climax of the section ───────────────────────────── */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mt-16 md:mt-24" data-v4-reveal>
          <LuxuryDivider variant="line" className="hidden sm:block flex-1 max-w-[140px]" />
          <a
            href={data.ctaHref}
            className="inline-flex items-center gap-3.5 px-11 py-5 rounded-full font-bold text-[13px] tracking-[0.14em] uppercase transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(201,162,39,0.45)] flex-shrink-0"
            style={{ background: luxoraColors.gold, color: '#1C1005', boxShadow: '0 12px 36px rgba(201,162,39,0.34)' }}
          >
            {data.ctaLabel}
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <LuxuryDivider variant="line" className="hidden sm:block flex-1 max-w-[140px]" />
        </div>
      </div>
    </section>
  );
}
