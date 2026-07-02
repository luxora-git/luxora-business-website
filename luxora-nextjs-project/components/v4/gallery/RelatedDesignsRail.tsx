import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import GalleryCard from './GalleryCard';
import type { GalleryProject } from '@/lib/content/gallery/types';

export interface RelatedDesignsRailProps {
  projects: GalleryProject[];
}

/**
 * RelatedDesignsRail — same-category/same-style designs shown at the
 * bottom of every detail page, reusing `GalleryCard` (standard variant)
 * exactly as the grid does — no separate card implementation.
 */
export default function RelatedDesignsRail({ projects }: RelatedDesignsRailProps) {
  if (projects.length === 0) return null;

  return (
    <div className="mt-16 md:mt-20" data-v4-reveal>
      <div className="flex items-center gap-3 mb-7">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: '#9C7B68' }}>
          Related Designs
        </span>
        <span className="h-px flex-1" style={{ background: 'rgba(201,162,39,0.25)' }} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <GalleryCard key={project.id} project={project} variant="standard" />
        ))}
      </div>
    </div>
  );
}
