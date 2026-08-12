import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ServicePageShell } from '@/components/v4/service';
import PageHero from '@/components/v4/common/PageHero';
import GlobalClosingCTA from '@/components/v4/common/GlobalClosingCTA';
import GallerySection from '@/components/v4/gallery/layout/GallerySection';
import GallerySectionHeader from '@/components/v4/gallery/layout/GallerySectionHeader';
import { LuxuryHalo, LuxuryGrain } from '@/components/v4/background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { portfolioProjects } from '@/lib/content/portfolio/projects';

export const metadata: Metadata = {
  title: 'Portfolio | Luxora Interiors',
  description: 'Completed Luxora interior design projects in Jaipur — real homes and offices, from first brief to final handover.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Luxora Portfolio — Completed Projects in Jaipur',
    description: 'Real completed projects, real clients, real Jaipur addresses.',
    images: [portfolioProjects[0]?.heroImage.url ?? ''],
    type: 'website',
  },
};

export default function PortfolioIndexPage() {
  return (
    <ServicePageShell>
      {/* Hero */}
      <PageHero
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Portfolio' }]}
        badge="Our Portfolio"
        heading="Completed Homes,"
        headingItalic="Real Jaipur Addresses"
        description="Every project here was designed, built and handed over by Luxora — real clients, real scope, real outcomes. This is proof of execution, not inspiration browsing (that's what the Design Gallery is for)."
        image={portfolioProjects[0].heroImage.url}
        imageAlt={portfolioProjects[0].heroImage.alt}
      />

      {/* Project grid */}
      <GallerySection
        spacing="standard"
        background={luxoraColors.ivory}
        patterns={<><LuxuryHalo position="top-right" size="lg" opacity={0.05} blur={110} /><LuxuryGrain id="portfolio-index-grain" opacity={0.012} /></>}
      >
        <GallerySectionHeader
          eyebrow="Case Studies"
          title="Every Project,"
          titleItalic="Start to Finish"
          description="Click into any project for the full brief, the story behind it, and the complete photo gallery."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-6 md:gap-8 3xl:gap-10">
          {portfolioProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group relative rounded-2xl overflow-hidden block h-[380px] border shadow-[0_4px_18px_rgba(100,60,20,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(100,60,20,0.18)]"
              style={{ borderColor: 'rgba(160,120,80,0.16)' }}
            >
              <Image src={project.heroImage.url} alt={project.heroImage.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,14,6,0.88) 0%, rgba(20,14,6,0.15) 55%, transparent 100%)' }} />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: luxoraColors.goldLight }}>
                  {project.category} · {project.facts.location.split(',')[1]?.trim() ?? 'Jaipur'}
                </div>
                <h3 className="font-playfair text-xl leading-snug mb-1" style={{ color: luxoraColors.ivory }}>
                  {project.title}
                </h3>
                <div className="text-xs font-light" style={{ color: 'rgba(253,250,246,0.7)' }}>
                  {project.facts.area}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </GallerySection>

      <GlobalClosingCTA
        eyebrow="Start Your Journey"
        title="Inspired By Our Work?"
        titleItalic="Let's Create Your Story."
        description="Every project here started with a single conversation. Share your brief and our design team will respond within one business day."
        image={portfolioProjects[portfolioProjects.length - 1].heroImage.url}
        imageAlt={portfolioProjects[portfolioProjects.length - 1].heroImage.alt}
      />
    </ServicePageShell>
  );
}
