import Link from 'next/link';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import GalleryMetaDot from './GalleryMetaDot';
import type { GalleryProject } from '@/lib/content/gallery/types';

export interface GalleryCardProps {
  project: GalleryProject;
  /** `standard` = grid tile, `featured` = large hero-style card with full meta row. */
  variant?: 'standard' | 'featured';
}

function roomLabel(categorySlug: string): string {
  return categorySlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function CardArrow() {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 transition-all duration-300 group-hover:translate-x-0.5"
      style={{ border: '1px solid rgba(253,250,246,0.45)', color: '#FDFAF6' }}
      aria-hidden="true"
    >
      →
    </span>
  );
}

/**
 * GalleryCard — the single reusable card every gallery surface renders
 * through (Home, Category, Search, Related Designs). Two variants only in
 * Phase 1: `standard` (grid tile) and `featured` (large hero-style card).
 */
export default function GalleryCard({ project, variant = 'standard' }: GalleryCardProps) {
  const href = `/luxury-v4/gallery/${project.category}/${project.slug}`;

  if (variant === 'featured') {
    // Deliberately just two fields — style and room type. No budget,
    // completion time, exact area or city: those are precise, quantitative
    // specs that make a card read as a project case study (Portfolio's job),
    // not a piece of design inspiration (this Gallery's job).
    const meta = [
      { label: 'Style', value: project.meta.style },
      { label: 'Room', value: roomLabel(project.category) },
    ];

    return (
      <Link
        href={href}
        className="group relative rounded-3xl overflow-hidden block h-[440px] md:h-[560px] border shadow-[0_24px_70px_rgba(100,60,20,0.16)] transition-shadow duration-500 hover:shadow-[0_30px_85px_rgba(100,60,20,0.22)]"
        style={{ borderColor: 'rgba(201,162,39,0.18)' }}
      >
        <img
          src={project.coverImage.url}
          alt={project.coverImage.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(20,14,6,0.08) 0%, rgba(20,14,6,0.30) 45%, rgba(20,14,6,0.90) 100%)' }}
        />
        <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
          <span className="text-[10px] font-semibold tracking-[0.24em] uppercase mb-3 block" style={{ color: '#E8C468' }}>
            Featured Design
          </span>
          <h3 className="font-playfair font-normal leading-[1.12] mb-3" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', color: '#FDFAF6' }}>
            {project.title}
          </h3>
          <p className="text-sm md:text-[15px] leading-relaxed font-light mb-5 max-w-lg" style={{ color: 'rgba(253,250,246,0.78)' }}>
            {project.description}
          </p>
          <div className="w-10 h-px mb-5" style={{ background: luxoraColors.gold }} />
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:flex xl:flex-nowrap gap-x-6 gap-y-4">
            {meta.map((item, i) => (
              <div key={item.label} className={i > 0 ? 'xl:border-l xl:pl-6 xl:pr-7' : 'xl:pr-7'} style={i > 0 ? { borderColor: 'rgba(201,162,39,0.28)' } : undefined}>
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
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group relative rounded-2xl overflow-hidden block h-[320px] border-2 shadow-[0_4px_18px_rgba(100,60,20,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C9A227] hover:shadow-[0_22px_50px_rgba(100,60,20,0.20)]"
      style={{ borderColor: 'rgba(160,120,80,0.16)' }}
    >
      <img
        src={project.coverImage.url}
        alt={project.coverImage.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(20,14,6,0.86) 0%, rgba(20,14,6,0.15) 55%, transparent 100%)' }}
      />
      <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-playfair text-[1.05rem] leading-snug mb-1.5 truncate" style={{ color: '#FDFAF6' }}>
            {project.title}
          </h3>
          <div className="text-[10px] tracking-[0.08em] uppercase truncate" style={{ color: 'rgba(253,250,246,0.68)' }}>
            {project.meta.style}
            <GalleryMetaDot />
            {roomLabel(project.category)}
          </div>
        </div>
        <CardArrow />
      </div>
    </Link>
  );
}
