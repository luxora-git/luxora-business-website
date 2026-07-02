import ServiceBreadcrumb from '../service/ServiceBreadcrumb';
import type { ServiceBreadcrumbItem } from '@/lib/content/services/types';

export interface GalleryHeroStat {
  value: string;
  label: string;
}

export interface GalleryHeroProps {
  breadcrumbItems: ServiceBreadcrumbItem[];
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  image: string;
  imageAlt: string;
  stats?: GalleryHeroStat[];
}

/**
 * GalleryHero — the shared, lighter-weight hero for Gallery Home and
 * Category pages. Reuses `ServiceBreadcrumb` and the exact overlay/CTA
 * typography language from `ServiceHero`, sized for a listing page rather
 * than a landing page.
 */
export default function GalleryHero({ breadcrumbItems, eyebrow, title, titleItalic, description, image, imageAlt, stats }: GalleryHeroProps) {
  return (
    <section className="relative h-[440px] md:h-[500px] overflow-hidden">
      <img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(105deg, rgba(28,22,16,0.82) 0%, rgba(28,22,16,0.55) 45%, rgba(28,22,16,0.18) 100%)' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,22,16,0.55) 0%, transparent 45%)' }} />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center pb-8">
        <div className="max-w-[760px] lg:ml-[3%]">
          <div className="mb-6">
            <ServiceBreadcrumb items={breadcrumbItems} light />
          </div>

          <span
            className="inline-block text-[11px] tracking-[0.24em] uppercase font-semibold mb-4"
            style={{ color: '#C9A227' }}
          >
            {eyebrow}
          </span>

          <h1
            className="font-playfair font-normal text-white leading-[1.08] tracking-[-0.02em] mb-4 drop-shadow-2xl"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3.6rem)' }}
          >
            <span className="block">{title}</span>
            {titleItalic && <span className="block font-playfair italic">{titleItalic}</span>}
          </h1>

          <p
            className="text-[15px] md:text-base font-light leading-relaxed max-w-[480px] mb-6 drop-shadow-md"
            style={{ color: 'rgba(253,250,246,0.78)' }}
          >
            {description}
          </p>

          {stats && stats.length > 0 && (
            <div className="flex flex-wrap gap-x-8 gap-y-3">
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
          )}
        </div>
      </div>
    </section>
  );
}
