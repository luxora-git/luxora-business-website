import type { ServiceLiteData } from './serviceLiteTypes';

function p(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
function img(path: string, alt: string) {
  return { url: p(`/img/PROJECT BASED/${path}`), alt };
}

export const bedroomService: ServiceLiteData = {
  slug: 'bedroom-interior-design',
  categorySlug: 'bedroom',
  title: 'Bedroom Design',
  titleItalic: 'A Room Tuned for Rest',
  eyebrow: 'Bedroom Interiors',
  heroImage: img('MASTER BEDROOM DESIGN/Balram ji Bedroom A01.webp', 'Master bedroom designed by Luxora, Jaipur'),
  overview:
    'A bedroom has one job — to make the end and start of your day feel considered. We design the bed wall, the storage, and the lighting as one quiet composition, so the room never feels cluttered or half-finished.',
  overviewBullets: [
    'Custom bed-back panelling and headboard walls',
    'Integrated wardrobes designed for your actual wardrobe count',
    'Layered lighting for reading, dressing and sleep',
    'A calm, considered material palette — never over-decorated',
  ],
  process: [
    { number: '01', title: 'Brief & Measure', description: 'We understand your storage needs and how you use the room daily.' },
    { number: '02', title: '3D Visualisation', description: 'See your finished bedroom before we start production.' },
    { number: '03', title: 'Material Lock', description: 'Bed-back panelling, wardrobe finish and lighting finalised together.' },
    { number: '04', title: 'Production & Install', description: 'Built in our own facility and installed by our own team.' },
    { number: '05', title: 'Final Walkthrough', description: 'We check every joint and finish before handover.' },
  ],
  gallery: [
    img('MASTER BEDROOM DESIGN/Balram ji Bedroom A02.webp', 'Master bedroom detail, Jaipur'),
    img('MASTER BEDROOM DESIGN/Balram ji Bedroom A03.webp', 'Bedroom wardrobe wall, Jaipur'),
    img('MASTER BEDROOM DESIGN/Ajit ji khichar A01.webp', 'Bedroom interior, Jaipur'),
    img('MASTER BEDROOM DESIGN/Ajit ji khichar A02.webp', 'Bedroom design, Jaipur'),
    img('MASTER BEDROOM DESIGN/Ajit ji khichar A03.webp', 'Bedroom styling, Jaipur'),
    img('MASTER BEDROOM DESIGN/Ajit ji khichar A04.webp', 'Bedroom detail, Jaipur'),
    img('MASTER BEDROOM DESIGN/Paritosh ji bedroom B01_View090000.webp', 'Bedroom design, Jaipur'),
    img('MASTER BEDROOM DESIGN/Rishabh ji final render 04.webp', 'Bedroom, Rishabh Residence, Jaipur'),
  ],
  relatedPortfolioSlugs: ['rishabh-ji-residence', 'krish-ji-residence'],
  faq: [
    { question: 'Can you design a bedroom for kids or guests too?', answer: "Yes — we design master bedrooms, kids' rooms and guest bedrooms with the same level of detail, scaled to the room's purpose." },
    { question: 'Do wardrobe interiors cost extra?', answer: 'Internal wardrobe organisation (shelves, drawers, accessory trays) is scoped and quoted as part of your bedroom brief, not hidden afterwards.' },
    { question: 'How long does a bedroom take?', answer: 'A single bedroom is typically delivered in 2–3 weeks depending on wardrobe complexity.' },
  ],
};
