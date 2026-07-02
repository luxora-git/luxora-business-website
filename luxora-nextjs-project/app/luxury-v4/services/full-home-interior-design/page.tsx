'use client';

import { useScrollReveal } from '@/lib/useScrollReveal';
import { fullHomeInteriorDesign } from '@/lib/content/services/fullHomeInteriorDesign';
import {
  ServicePageShell,
  ServiceHero,
  ServiceOverview,
  ServiceHighlights,
  ServiceComparisonTable,
  ServiceProcessTimeline,
  ServiceGalleryShowcase,
  ServiceBeforeAfter,
  ServiceMaterialsFinishes,
  ServiceCostEstimatorPreview,
  ServicePricingPackages,
  ServiceFAQ,
  ServiceRelatedProjects,
  ServiceTestimonials,
  ServiceRelatedServices,
  ServiceFinalCTA,
  StickyConsultationCTA,
} from '@/components/v4/service';

export default function FullHomeInteriorDesignPage() {
  useScrollReveal({ selector: '[data-v4-reveal]', threshold: 0.08, stagger: 0.06, duration: 0.7, y: 30 });
  useScrollReveal({ selector: '[data-v4-reveal-heading]', threshold: 0.1, stagger: 0.05, duration: 0.55, y: 24 });

  const data = fullHomeInteriorDesign;

  return (
    <ServicePageShell>
      <ServiceHero
        data={data.hero}
        breadcrumbItems={[
          { label: 'Home', href: '/luxury-v4' },
          { label: 'Services', href: '/luxury-v4#v4-services' },
          { label: data.hero.breadcrumbLabel },
        ]}
      />
      <ServiceOverview data={data.overview} />
      <ServiceHighlights items={data.highlights} />
      <ServiceComparisonTable data={data.comparison} />
      <ServiceProcessTimeline data={data.process} />
      <ServiceGalleryShowcase data={data.gallery} />
      {data.beforeAfter && <ServiceBeforeAfter data={data.beforeAfter} />}
      <ServiceMaterialsFinishes data={data.materials} />
      <ServiceCostEstimatorPreview data={data.costEstimator} />
      <ServicePricingPackages data={data.pricing} />
      <ServiceFAQ data={data.faq} />
      <ServiceRelatedProjects data={data.relatedProjects} />
      <ServiceTestimonials data={data.testimonials} />
      <ServiceRelatedServices data={data.relatedServices} />
      <ServiceFinalCTA data={data.finalCta} />
      <StickyConsultationCTA
        heroSectionId="v4-service-hero"
        finalCtaSectionId="v4-service-final-cta"
      />
    </ServicePageShell>
  );
}
