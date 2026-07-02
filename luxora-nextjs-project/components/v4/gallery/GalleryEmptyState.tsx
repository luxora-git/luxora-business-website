import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export interface GalleryEmptyStateProps {
  onClear?: () => void;
}

export default function GalleryEmptyState({ onClear }: GalleryEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
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
        No Designs Match Yet
      </h3>
      <p className="text-[13.5px] font-light leading-relaxed max-w-sm mb-6" style={{ color: luxoraColors.softBrown }}>
        Try adjusting your filters or search — or explore the full gallery below.
      </p>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="px-6 py-3 rounded-full font-bold text-[11px] tracking-[0.10em] uppercase"
          style={{ background: luxoraColors.gold, color: '#1C1005' }}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
