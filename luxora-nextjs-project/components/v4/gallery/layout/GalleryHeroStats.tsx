export interface GalleryHeroStatItem {
  value: string;
  label: string;
}

export interface GalleryHeroStatsProps {
  stats: GalleryHeroStatItem[];
  className?: string;
}

/**
 * GalleryHeroStats — the value/label stat row used in `GalleryHero`,
 * exported standalone so a future surface (e.g. a Collection page header)
 * can reuse the exact same stat treatment without pulling in the full Hero.
 */
export default function GalleryHeroStats({ stats, className = '' }: GalleryHeroStatsProps) {
  if (stats.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-x-8 gap-y-3 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="font-playfair italic text-xl" style={{ color: '#FDFAF6' }}>
            {stat.value}
          </div>
          <div className="text-[10px] font-semibold tracking-[0.14em] uppercase" style={{ color: 'rgba(253,250,246,0.62)' }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
