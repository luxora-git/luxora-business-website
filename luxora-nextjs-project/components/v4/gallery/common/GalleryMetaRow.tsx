import GalleryMetaDot from '../GalleryMetaDot';

export interface GalleryMetaRowItem {
  label: string;
  value: string;
}

export interface GalleryMetaRowProps {
  /** Plain values (e.g. ["Scandinavian", "420 sq ft"]) or labeled fields for the `labeled` variant. */
  items: (string | GalleryMetaRowItem)[];
  /** `plain` = value-only, dot-separated (Standard/Compact cards). `labeled` = small uppercase label above each value, dividers instead of dots (Featured card spec row). */
  variant?: 'plain' | 'labeled';
  light?: boolean;
  className?: string;
}

/**
 * GalleryMetaRow — the single reusable metadata renderer every card type
 * shares, per the Visual Language Guide's metadata priority rules. Caps on
 * field count are enforced by the calling card, not by this component.
 */
export default function GalleryMetaRow({ items, variant = 'plain', light = true, className = '' }: GalleryMetaRowProps) {
  if (variant === 'labeled') {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 xl:flex xl:flex-nowrap gap-x-6 gap-y-4 ${className}`}>
        {items.map((item, i) => {
          const field = typeof item === 'string' ? { label: '', value: item } : item;
          return (
            <div
              key={`${field.label}-${i}`}
              className={i > 0 ? 'xl:border-l xl:pl-6 xl:pr-7' : 'xl:pr-7'}
              style={i > 0 ? { borderColor: 'rgba(201,162,39,0.28)' } : undefined}
            >
              {field.label && (
                <div className="text-[9px] tracking-[0.18em] uppercase mb-1.5 font-semibold" style={{ color: '#C9A227' }}>
                  {field.label}
                </div>
              )}
              <div
                className="font-playfair text-[13px] md:text-sm xl:whitespace-nowrap"
                style={{ color: light ? '#FDFAF6' : '#2C1F14' }}
              >
                {field.value}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`text-[10px] tracking-[0.08em] uppercase truncate ${className}`}
      style={{ color: light ? 'rgba(253,250,246,0.68)' : 'rgba(44,31,20,0.62)' }}
    >
      {items.map((item, i) => {
        const value = typeof item === 'string' ? item : item.value;
        return (
          <span key={`${value}-${i}`}>
            {i > 0 && <GalleryMetaDot />}
            {value}
          </span>
        );
      })}
    </div>
  );
}
