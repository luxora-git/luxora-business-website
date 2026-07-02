import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import GalleryButton from './GalleryButton';

export type GalleryEmptyStateVariant = 'no-results' | 'no-search' | 'coming-soon';

export interface GalleryEmptyStateProps {
  variant?: GalleryEmptyStateVariant;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const DEFAULTS: Record<GalleryEmptyStateVariant, { title: string; description: string }> = {
  'no-results': {
    title: 'No Designs Match Yet',
    description: 'Try adjusting your filters — or explore the full gallery below.',
  },
  'no-search': {
    title: 'No Designs Found',
    description: 'Try a different search term, or browse by room and style instead.',
  },
  'coming-soon': {
    title: 'More Designs Coming Soon',
    description: 'We’re adding to this collection — check back shortly, or explore the rest of the gallery.',
  },
};

/**
 * GalleryEmptyState — the single designed empty/zero-result state every
 * Gallery surface shows (Visual Language Guide §11). No illustration, no
 * "broken" framing — calm, warm, and always offers a next action.
 */
export default function GalleryEmptyState({ variant = 'no-results', title, description, actionLabel = 'Clear Filters', onAction, className = '' }: GalleryEmptyStateProps) {
  const copy = DEFAULTS[variant];

  return (
    <div className={`flex flex-col items-center justify-center text-center py-20 px-6 ${className}`}>
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
        style={{ background: 'rgba(201,162,39,0.10)', border: '1.5px solid rgba(201,162,39,0.30)' }}
      >
        <svg className="w-6 h-6" fill="none" stroke={luxoraColors.gold} strokeWidth={1.6} viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
        </svg>
      </div>
      <h3 className="font-playfair text-xl mb-2" style={{ color: luxoraColors.espresso }}>
        {title ?? copy.title}
      </h3>
      <p className="text-[13.5px] font-light leading-relaxed max-w-sm mb-6" style={{ color: luxoraColors.softBrown }}>
        {description ?? copy.description}
      </p>
      {onAction && (
        <GalleryButton variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </GalleryButton>
      )}
    </div>
  );
}
