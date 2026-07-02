import GalleryCard from './GalleryCard';
import GalleryEmptyState from './GalleryEmptyState';
import type { GalleryProject } from '@/lib/content/gallery/types';

export interface GalleryGridProps {
  projects: GalleryProject[];
  /** If set, the project at this index renders as the `featured` card variant, spanning two columns. */
  featuredIndex?: number | null;
}

/**
 * GalleryGrid — the responsive grid every listing surface (Home, Category,
 * Search, filtered results) renders through. Shows `GalleryEmptyState`
 * automatically when `projects` is empty.
 */
export default function GalleryGrid({ projects, featuredIndex = 0 }: GalleryGridProps) {
  if (projects.length === 0) {
    return <GalleryEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-v4-reveal>
      {projects.map((project, i) => (
        <div key={project.id} className={featuredIndex === i ? 'sm:col-span-2 lg:col-span-2' : undefined}>
          <GalleryCard project={project} variant={featuredIndex === i ? 'featured' : 'standard'} />
        </div>
      ))}
    </div>
  );
}
