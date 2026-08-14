import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import { GalleryBreadcrumbJsonLd } from '@/components/v4/gallery';
import { galleryProjects, getGalleryProject, getRelatedProjects } from '@/lib/content/gallery/projects';
import { getGalleryCategory } from '@/lib/content/gallery/categories';
import GalleryDesignDetail from './GalleryDesignDetail';

interface DetailPageProps {
  params: { category: string; slug: string };
}

export function generateStaticParams() {
  return galleryProjects.map((p) => ({ category: p.category, slug: p.slug }));
}

export function generateMetadata({ params }: DetailPageProps): Metadata {
  const project = getGalleryProject(params.slug);
  if (!project) return {};
  return {
    // Strip the data's trailing "| Luxora Gallery" so the root title template
    // supplies the single "| Luxora" brand suffix (no duplication).
    // openGraph.title keeps the original seo.title (OG titles are not templated).
    title: project.seo.title.replace(/\s*\|\s*Luxora Gallery\s*$/, ''),
    description: project.seo.description,
    alternates: { canonical: `/gallery/${project.category}/${project.slug}` },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      images: [project.seo.ogImage],
    },
  };
}

export default function GalleryDetailPage({ params }: DetailPageProps) {
  const project = getGalleryProject(params.slug);
  if (!project || project.category !== params.category) notFound();

  const category = getGalleryCategory(project.category);
  if (!category) notFound();

  const related = getRelatedProjects(project, 3);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Gallery', href: '/gallery' },
    { label: category.label, href: `/gallery/${category.slug}` },
    { label: project.title },
  ];

  return (
    <ServicePageShell>
      <GalleryBreadcrumbJsonLd
        items={breadcrumbItems.map((item) => ({
          label: item.label,
          href: item.href ?? `/gallery/${category.slug}/${project.slug}`,
        }))}
      />
      <GalleryDesignDetail project={project} category={category} related={related} />
    </ServicePageShell>
  );
}
