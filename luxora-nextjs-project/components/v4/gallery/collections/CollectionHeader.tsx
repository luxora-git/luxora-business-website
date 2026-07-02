import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import GalleryBadge from '../common/GalleryBadge';
import GalleryDivider from '../layout/GalleryDivider';

export interface CollectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  designCount?: number;
  className?: string;
}

/**
 * CollectionHeader — the smaller, inline Collection label used wherever a
 * Collection is introduced *within* a page rather than as its own header
 * (a rail, a feature block) — distinct from `CollectionHero`, which owns
 * a full page-header moment.
 */
export default function CollectionHeader({ label = 'Collection', title, description, designCount, className = '' }: CollectionHeaderProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-4">
        <GalleryBadge tone="dark">{label}</GalleryBadge>
        {typeof designCount === 'number' && (
          <span className="text-[11px] tracking-[0.08em] uppercase" style={{ color: '#9C7B68' }}>
            {designCount} {designCount === 1 ? 'Design' : 'Designs'}
          </span>
        )}
      </div>
      <h3 className="font-playfair font-normal leading-[1.14] mb-3" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', color: luxoraColors.espresso }}>
        {title}
      </h3>
      {description && (
        <p className="text-[14px] font-light leading-relaxed max-w-md mb-3" style={{ color: luxoraColors.softBrown }}>
          {description}
        </p>
      )}
      <GalleryDivider variant="line" className="max-w-[140px]" />
    </div>
  );
}
