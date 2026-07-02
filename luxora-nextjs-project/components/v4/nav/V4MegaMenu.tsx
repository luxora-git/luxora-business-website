import Link from 'next/link';
import Image from 'next/image';
import type { MegaMenuData } from '@/lib/content/navigation/megaMenuData';

export interface V4MegaMenuProps {
  data: MegaMenuData;
  onNavigate: () => void;
}

/**
 * V4MegaMenu — the shared panel every desktop mega menu renders through.
 * Elegant luxury only: warm ivory background matching the navbar capsule,
 * generous spacing, Playfair headings, no dark overlay, no glassmorphism.
 */
export default function V4MegaMenu({ data, onNavigate }: V4MegaMenuProps) {
  return (
    <div
      role="menu"
      className="rounded-[28px] overflow-hidden"
      style={{
        background: '#FDFAF6',
        border: '1px solid rgba(160,120,80,0.16)',
        boxShadow: '0 30px 70px rgba(60,35,16,0.16)',
      }}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Columns */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-8 p-9 md:p-10">
          {data.columns.map((col) => (
            <div key={col.heading}>
              <h3
                className="font-playfair italic text-[15px] mb-4"
                style={{ color: '#C9A227' }}
              >
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="group inline-flex items-center gap-1.5 text-[13.5px] font-medium transition-colors duration-200"
                      style={{ color: '#3D2B1F' }}
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#C9A227]">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Editorial preview rail */}
        {data.previews && data.previews.length > 0 && (
          <div
            className="lg:w-[340px] flex-shrink-0 p-9 md:p-10"
            style={{ background: 'rgba(201,162,39,0.05)', borderLeft: '1px solid rgba(160,120,80,0.14)' }}
          >
            {data.previewsHeading && (
              <h3 className="font-playfair italic text-[15px] mb-5" style={{ color: '#C9A227' }}>
                {data.previewsHeading}
              </h3>
            )}
            <div className="flex flex-col gap-4">
              {data.previews.map((preview) => (
                <Link
                  key={preview.href}
                  href={preview.href}
                  onClick={onNavigate}
                  className="group flex items-center gap-3.5"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border" style={{ borderColor: 'rgba(160,120,80,0.18)' }}>
                    <Image src={preview.image} alt={preview.imageAlt} fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <span
                    className="text-[13px] font-medium leading-snug transition-colors duration-200 group-hover:text-[#C9A227]"
                    style={{ color: '#3D2B1F' }}
                  >
                    {preview.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* View all */}
      <div
        className="flex items-center justify-between px-9 md:px-10 py-5"
        style={{ borderTop: '1px solid rgba(160,120,80,0.14)', background: 'rgba(160,120,80,0.04)' }}
      >
        <span className="text-[11px] tracking-[0.14em] uppercase" style={{ color: '#9C7B68' }}>
          Luxora Interiors
        </span>
        <Link
          href={data.viewAllHref}
          onClick={onNavigate}
          className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase transition-colors duration-200"
          style={{ color: '#C9A227' }}
        >
          {data.viewAllLabel}
          <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
