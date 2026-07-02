import type { ReactNode } from 'react';
import type { ServiceBreadcrumbItem, ServiceCta } from '@/lib/content/services/types';
import { luxoraPriceCalculatorUrl } from '@/lib/content/global/contact';
import ServiceBreadcrumb from '../service/ServiceBreadcrumb';
import ServiceCtaButton, { CONSULTATION_CTA_HREF } from '../service/ServiceCtaButton';

/** Fixed sitewide Hero CTAs — every internal page uses these exact labels/targets, no exceptions. */
export const PAGE_HERO_PRIMARY_CTA: ServiceCta = { label: 'Book Free Consultation', href: CONSULTATION_CTA_HREF };
export const PAGE_HERO_SECONDARY_CTA: ServiceCta = { label: 'Get Free Estimate', href: luxoraPriceCalculatorUrl };

export interface PageHeroProps {
  image: string;
  imageAlt: string;
  breadcrumbItems: ServiceBreadcrumbItem[];
  /** Optional small label above the heading (e.g. a category eyebrow). */
  badge?: string;
  heading: string;
  headingItalic?: string;
  description: string;
  /** Defaults to the standard "Book Free Consultation" CTA — override only for a very strong reason. */
  primaryCta?: ServiceCta;
  /** Defaults to the standard "Get Free Estimate" CTA — override only for a very strong reason. */
  secondaryCta?: ServiceCta;
  /** Extra content rendered between the description and the CTAs (e.g. the Gallery Home search box). */
  extraContent?: ReactNode;
}

/**
 * PageHero — the official Luxora V4 internal-page Hero (approved from the
 * Full Home Interior Design service page). Every internal page — Services,
 * Design Gallery, Portfolio, Interior Elements, Products, and any future V4
 * page — renders through this one component so layout, overlay, typography,
 * CTA placement and spacing stay identical everywhere. Only content (image,
 * heading, description, breadcrumb, optional badge) changes between pages.
 * The Homepage Hero (`V4HeroSection`) is deliberately separate and never
 * renders through this component.
 */
export default function PageHero({
  image,
  imageAlt,
  breadcrumbItems,
  badge,
  heading,
  headingItalic,
  description,
  primaryCta = PAGE_HERO_PRIMARY_CTA,
  secondaryCta = PAGE_HERO_SECONDARY_CTA,
  extraContent,
}: PageHeroProps) {
  return (
    <section className="relative h-[680px] md:h-[780px] overflow-hidden">
      <img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" loading="eager" />

      {/* Overlay — same recipe as V4HeroSection's image slides */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(105deg, rgba(28,22,16,0.82) 0%, rgba(28,22,16,0.50) 45%, rgba(28,22,16,0.08) 100%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(28,22,16,0.65) 0%, transparent 40%)' }}
      />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center pb-10 md:pb-14">
        <div className="max-w-[880px] lg:ml-[5%] xl:ml-[7%]">
          <div className="mb-8 md:mb-10">
            <ServiceBreadcrumb items={breadcrumbItems} light />
          </div>

          {badge && (
            <span className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-7" style={{ background: '#C9A227' }} aria-hidden="true" />
              <span className="text-[11px] tracking-[0.28em] uppercase font-semibold" style={{ color: '#C9A227' }}>
                {badge}
              </span>
            </span>
          )}

          <h1
            className="font-playfair font-normal text-white leading-[1.05] tracking-[-0.025em] mb-7 drop-shadow-2xl"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.2rem)' }}
          >
            <span className="block">{heading}</span>
            {headingItalic && <span className="block font-playfair italic">{headingItalic}</span>}
          </h1>

          <p
            className="text-base md:text-[1.05rem] font-light leading-[1.75] mb-12 max-w-[400px] drop-shadow-md"
            style={{ color: 'rgba(253,250,246,0.72)' }}
          >
            {description}
          </p>

          {extraContent && <div className="mb-12 max-w-[440px] -mt-8">{extraContent}</div>}

          <div className="flex flex-col sm:flex-row gap-3.5">
            <ServiceCtaButton
              cta={primaryCta}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-[12px] tracking-[0.08em] uppercase transition-all duration-300 hover:-translate-y-0.5 group"
              style={{ background: '#C9A227', color: '#1C1005', boxShadow: '0 0 32px rgba(201,162,39,0.38)' }}
            >
              {primaryCta.label}
              <svg className="w-3.5 h-3.5 ml-2.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </ServiceCtaButton>
            <ServiceCtaButton
              cta={secondaryCta}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-[12px] tracking-[0.08em] uppercase transition-all duration-300 hover:bg-white/10 group"
              style={{ color: '#FFFFFF', border: '1px solid rgba(201,162,39,0.45)' }}
            >
              {secondaryCta.label}
              <svg className="w-3.5 h-3.5 ml-2.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </ServiceCtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
