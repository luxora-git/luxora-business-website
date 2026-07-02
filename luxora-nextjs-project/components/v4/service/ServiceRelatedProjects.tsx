'use client';

import V4SectionHeader from '../V4SectionHeader';
import { LuxuryContour, LuxuryGrain } from '../background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { useLightbox } from '../lightbox';
import type { ServiceRelatedProject, ServiceRelatedProjectsData } from '@/lib/content/services/types';

export interface ServiceRelatedProjectsProps {
  data: ServiceRelatedProjectsData;
}

/**
 * ServiceRelatedProjects — real completed-project case cards, using the
 * same project-meta language (image + name + area/duration chips) already
 * established on the homepage's transformation/gallery sections.
 */
export default function ServiceRelatedProjects({ data }: ServiceRelatedProjectsProps) {
  const { open: openLightbox } = useLightbox();

  const showProject = (project: ServiceRelatedProject) => {
    openLightbox({
      images: [{ src: project.image, alt: project.imageAlt }],
      panel: {
        variant: 'service',
        eyebrow: project.location,
        title: project.title,
        meta: [
          { label: 'Location', value: project.location },
          { label: 'Area', value: project.area },
          { label: 'Completion Timeline', value: project.duration },
        ],
      },
    });
  };

  return (
    <section
      id="v4-service-related-projects"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#F5EDE0' }}
    >
      <LuxuryContour position="top-right" opacity={0.03} scale={1.2} />
      <LuxuryGrain id="service-related-projects-grain" opacity={0.012} />

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14" data-v4-reveal>
          {data.projects.map((project) => (
            <button
              key={project.title}
              type="button"
              onClick={() => showProject(project)}
              className="group relative rounded-2xl overflow-hidden block w-full text-left h-[320px] border shadow-[0_4px_18px_rgba(100,60,20,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C9A227] hover:shadow-[0_22px_50px_rgba(100,60,20,0.20)]"
              style={{ borderColor: 'rgba(160,120,80,0.16)' }}
            >
              <img
                src={project.image}
                alt={project.imageAlt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(20,14,6,0.86) 0%, rgba(20,14,6,0.15) 55%, transparent 100%)' }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-playfair text-[1.2rem] leading-snug mb-1.5" style={{ color: '#FDFAF6' }}>
                  {project.title}
                </h3>
                <p className="text-[11px] tracking-[0.06em] uppercase mb-3" style={{ color: 'rgba(253,250,246,0.65)' }}>
                  {project.location}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-semibold tracking-[0.12em] uppercase" style={{ color: luxoraColors.gold }}>
                    {project.area}
                  </span>
                  <span className="w-1 h-1 rotate-45" style={{ background: 'rgba(201,162,39,0.6)' }} aria-hidden="true" />
                  <span className="text-[10px] font-semibold tracking-[0.12em] uppercase" style={{ color: luxoraColors.gold }}>
                    {project.duration}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-center" data-v4-reveal>
          <a
            href={data.ctaHref}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-[11px] tracking-[0.10em] uppercase transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: luxoraColors.gold, color: '#1C1005', boxShadow: '0 8px 28px rgba(201,162,39,0.28)' }}
          >
            {data.ctaLabel}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
