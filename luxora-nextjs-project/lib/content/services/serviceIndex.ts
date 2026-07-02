/**
 * Master index of every Luxora service page — used to build "Related
 * Services" cross-links from any service page without duplicating titles
 * and hrefs across each service's own data file.
 */
export interface ServiceIndexEntry {
  slug: string;
  title: string;
  description: string;
}

export const allServices: ServiceIndexEntry[] = [
  {
    slug: 'full-home-interior-design',
    title: 'Interior Design Consultancy',
    description: 'Personalised interiors crafted around your lifestyle, needs and vision.',
  },
  {
    slug: 'architectural-design',
    title: 'Architectural Design',
    description: 'Structural planning to façade design — blending function with aesthetic vision.',
  },
  {
    slug: 'modular-kitchen-design',
    title: 'Designer Modular Kitchens',
    description: 'Bespoke modular kitchens with German-grade fittings and premium finishes.',
  },
  {
    slug: 'wardrobe-design',
    title: 'Designer Wardrobes',
    description: 'Smart storage solutions that combine elegance with everyday practicality.',
  },
  {
    slug: 'home-automation',
    title: 'Home Automation',
    description: 'Lighting, climate and security — seamlessly integrated at a single touch.',
  },
  {
    slug: 'commercial-office-interior-design',
    title: 'Commercial & Office Interiors',
    description: 'Brand-driven workspaces and retail environments that inspire identity.',
  },
  {
    slug: 'living-room-interior-design',
    title: 'Living Room Design',
    description: 'Layered seating, considered lighting, and a single design language throughout.',
  },
  {
    slug: 'bedroom-interior-design',
    title: 'Bedroom Design',
    description: 'Quiet, considered spaces built around rest, storage and ambient lighting.',
  },
];

export function getRelatedServices(currentSlug: string, count = 4): ServiceIndexEntry[] {
  return allServices.filter((s) => s.slug !== currentSlug).slice(0, count);
}
