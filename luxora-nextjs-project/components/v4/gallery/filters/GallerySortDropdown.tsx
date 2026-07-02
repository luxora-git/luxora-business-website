import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export interface GallerySortOption {
  label: string;
  value: string;
}

export interface GallerySortDropdownProps {
  value: string;
  options: GallerySortOption[];
  onChange: (value: string) => void;
  className?: string;
}

/**
 * GallerySortDropdown — a plain native `<select>` styled to match the
 * Gallery's filter chip language. Native select keeps keyboard/touch
 * behaviour correct for free, which matters more here than a fully custom
 * dropdown would justify.
 */
export default function GallerySortDropdown({ value, options, onChange, className = '' }: GallerySortDropdownProps) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort designs"
        className="appearance-none pl-4 pr-9 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.06em] uppercase focus:outline-none cursor-pointer"
        style={{ background: '#FDFAF6', color: luxoraColors.espresso, border: '1px solid rgba(160,120,80,0.22)' }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg className="absolute right-3.5 w-3 h-3 pointer-events-none" fill="none" stroke={luxoraColors.gold} strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}
