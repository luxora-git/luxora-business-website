import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import { getPortfolioProject, getRelatedPortfolioProjects, portfolioProjects } from '@/lib/content/portfolio/projects';
import PortfolioCaseStudy from './PortfolioCaseStudy';

export function generateStaticParams() {
  return portfolioProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Luxora Portfolio`,
    description: project.overview,
    alternates: { canonical: `/luxury-v4/portfolio/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.overview,
      images: [project.heroImage.url],
      type: 'article',
    },
  };
}

export default async function PortfolioCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();

  const related = getRelatedPortfolioProjects(slug);

  return (
    <ServicePageShell>
      <PortfolioCaseStudy project={project} related={related} />
    </ServicePageShell>
  );
}
