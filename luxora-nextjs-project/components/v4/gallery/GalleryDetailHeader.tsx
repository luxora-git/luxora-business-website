import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { GalleryProject } from '@/lib/content/gallery/types';

export interface GalleryDetailHeaderProps {
  project: GalleryProject;
  categoryLabel: string;
}

/**
 * GalleryDetailHeader — large hero image followed by an editorial title +
 * full meta row + story. Unlike the compact gallery cards (which overlay
 * text on the image), the detail page separates image and copy for a
 * proper magazine-feature read.
 */
export default function GalleryDetailHeader({ project, categoryLabel }: GalleryDetailHeaderProps) {
  const meta = [
    { label: 'Location', value: project.meta.location },
    { label: 'Area', value: project.meta.area },
    { label: 'Style', value: project.meta.style },
    { label: 'Budget', value: project.meta.budgetRange },
    { label: 'Completion', value: project.meta.completionTime },
  ];

  return (
    <div>
      <div className="relative rounded-3xl overflow-hidden h-[360px] md:h-[520px] border shadow-[0_24px_70px_rgba(100,60,20,0.14)] mb-10" style={{ borderColor: 'rgba(201,162,39,0.18)' }}>
        <img src={project.coverImage.url} alt={project.coverImage.alt} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,14,6,0.05) 0%, transparent 30%, rgba(20,14,6,0.35) 100%)' }} />
        <span
          className="absolute top-6 left-6 inline-block text-[10px] font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full"
          style={{ color: '#E8C468', background: 'rgba(20,14,6,0.45)', backdropFilter: 'blur(10px)', border: '1px solid rgba(201,162,39,0.35)' }}
        >
          {categoryLabel}
        </span>
      </div>

      <h1 className="font-playfair font-normal leading-[1.1] tracking-[-0.02em] mb-5" style={{ fontSize: 'clamp(2rem, 3.4vw, 3rem)', color: luxoraColors.espresso }}>
        {project.title}
      </h1>

      <p className="text-[15.5px] md:text-base leading-relaxed font-light max-w-2xl mb-8" style={{ color: luxoraColors.softBrown }}>
        {project.description}
      </p>

      <div className="w-10 h-px mb-7" style={{ background: luxoraColors.gold }} />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-nowrap gap-x-8 gap-y-5 mb-10">
        {meta.map((item, i) => (
          <div key={item.label} className={i > 0 ? 'lg:border-l lg:pl-8 lg:pr-9' : 'lg:pr-9'} style={i > 0 ? { borderColor: 'rgba(201,162,39,0.28)' } : undefined}>
            <div className="text-[9px] tracking-[0.18em] uppercase mb-1.5 font-semibold" style={{ color: '#B07D3A' }}>
              {item.label}
            </div>
            <div className="font-playfair text-sm lg:whitespace-nowrap" style={{ color: luxoraColors.espresso }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-3xl">
        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#B07D3A' }}>
          The Story
        </div>
        <p className="text-[15px] leading-[1.85] font-light" style={{ color: luxoraColors.softBrown }}>
          {project.story}
        </p>
      </div>
    </div>
  );
}
