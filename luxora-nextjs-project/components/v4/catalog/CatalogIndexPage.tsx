import Image from 'next/image';
import Link from 'next/link';
import type { CatalogItem } from '@/lib/content/catalog/types';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import PageHero from '../common/PageHero';
import GlobalClosingCTA from '../common/GlobalClosingCTA';
import GallerySection from '../gallery/layout/GallerySection';
import GallerySectionHeader from '../gallery/layout/GallerySectionHeader';
import { LuxuryGrain } from '../background';

export interface CatalogIndexPageProps {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  items: CatalogItem[];
  basePath: string; // e.g. '/luxury-v4/elements'
  closingTitle: string;
  closingTitleItalic?: string;
  closingDescription: string;
}

/**
 * CatalogIndexPage — the shared listing template for /luxury-v4/elements
 * and /luxury-v4/products. Reuses the Gallery visual language so both feel
 * like a natural part of the same site rather than a bolted-on catalog.
 */
export default function CatalogIndexPage({
  eyebrow,
  title,
  titleItalic,
  description,
  items,
  basePath,
  closingTitle,
  closingTitleItalic,
  closingDescription,
}: CatalogIndexPageProps) {
  return (
    <>
      <PageHero
        breadcrumbItems={[{ label: 'Home', href: '/luxury-v4' }, { label: eyebrow }]}
        badge={eyebrow}
        heading={title}
        headingItalic={titleItalic}
        description={description}
        image={items[0].heroImage.url}
        imageAlt={items[0].heroImage.alt}
      />

      <GallerySection spacing="standard" background={luxoraColors.ivory} patterns={<LuxuryGrain id="catalog-index-grain" opacity={0.012} />}>
        <GallerySectionHeader eyebrow="Browse" title="Every" titleItalic="Category" className="mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`${basePath}/${item.slug}`}
              className="group relative rounded-2xl overflow-hidden block h-[320px] border-2 shadow-[0_4px_18px_rgba(100,60,20,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C9A227] hover:shadow-[0_22px_50px_rgba(100,60,20,0.20)]"
              style={{ borderColor: 'rgba(160,120,80,0.16)' }}
            >
              <Image src={item.heroImage.url} alt={item.heroImage.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,22,16,0.85) 0%, rgba(28,22,16,0.10) 55%, transparent 100%)' }} />
              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
                <h3 className="font-playfair text-[1.15rem] leading-snug" style={{ color: '#FDFAF6' }}>{item.title}</h3>
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 transition-all duration-300 group-hover:translate-x-0.5"
                  style={{ border: '1px solid rgba(253,250,246,0.45)', color: '#FDFAF6' }}
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </GallerySection>

      <GlobalClosingCTA
        eyebrow="Start Your Journey"
        title={closingTitle}
        titleItalic={closingTitleItalic}
        description={closingDescription}
        image={items[items.length - 1].heroImage.url}
        imageAlt={items[items.length - 1].heroImage.alt}
      />
    </>
  );
}
