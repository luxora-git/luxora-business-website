import type { ServiceLiteData } from './serviceLiteTypes';

function p(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
function img(path: string, alt: string) {
  return { url: p(`/img/PROJECT BASED/${path}`), alt };
}

export const wardrobeService: ServiceLiteData = {
  slug: 'wardrobe-design',
  categorySlug: 'wardrobes',
  title: 'Wardrobe Design',
  titleItalic: 'Storage That Disappears Into the Room',
  eyebrow: 'Designer Wardrobes',
  heroImage: img('WARDROBE DESIGN/GAUTMA JI M. BEDROOM DRESSING A01.webp', 'Wardrobe and dressing area designed by Luxora, Jaipur'),
  overview:
    'A wardrobe should hold everything you own and still look like part of the architecture, not furniture sitting against a wall. We design the interior layout first — by what you actually own — then build the exterior to match your room.',
  overviewBullets: [
    'Interior layouts planned by your actual clothing and accessory count',
    'Soft-close hardware and internal LED lighting on motion sensors',
    'Sliding, openable or walk-in configurations to fit your footprint',
    'Finishes matched to your bedroom\'s existing material language',
  ],
  process: [
    { number: '01', title: 'Wardrobe Audit', description: 'We catalogue what you need to store — clothes, accessories, luggage.' },
    { number: '02', title: 'Layout Design', description: 'Internal compartments are planned before the exterior finish is chosen.' },
    { number: '03', title: 'Finish Selection', description: 'Shutter finish and hardware matched to your room.' },
    { number: '04', title: 'Fabrication', description: 'Built to your exact wall footprint, not a standard module width.' },
    { number: '05', title: 'Install & Adjust', description: 'Every door and drawer is aligned and tested on-site.' },
  ],
  gallery: [
    img('WARDROBE DESIGN/GAUTMA JI M. BEDROOM DRESSING A02.webp', 'Wardrobe interior, Jaipur'),
    img('WARDROBE DESIGN/GAUTMA JI M. BEDROOM DRESSING A03.webp', 'Dressing area detail, Jaipur'),
    img('WARDROBE DESIGN/Krish ji Dressing A01_View010000.webp', 'Wardrobe, Krish Residence, Jaipur'),
    img('WARDROBE DESIGN/Krish ji Dressing A01_View020000.webp', 'Dressing room, Krish Residence, Jaipur'),
    img('WARDROBE DESIGN/Rishabh ji Doughter bedroom dressing A01.webp', 'Dressing area, Rishabh Residence, Jaipur'),
    img('WARDROBE DESIGN/Rishabh ji Master Bedroom A04.webp', 'Master wardrobe, Rishabh Residence, Jaipur'),
    img('WARDROBE DESIGN/Vizora House F.F. A01_View180000_View01000.webp', 'Wardrobe wall, Vizora House, Jaipur'),
    img('WARDROBE DESIGN/Rishabh ji final render B04.webp', 'Wardrobe design, Jaipur'),
  ],
  relatedPortfolioSlugs: ['krish-ji-residence', 'rishabh-ji-residence'],
  faq: [
    { question: 'Do you design walk-in closets as well as wall wardrobes?', answer: 'Yes — both, depending on your room footprint and storage needs.' },
    { question: 'Can wardrobe interiors be customised per family member?', answer: "Yes — each person's wardrobe section can have a different internal layout within the same unit." },
    { question: 'How long does a wardrobe wall take?', answer: 'A single wardrobe wall is typically delivered in 10–14 days.' },
  ],
};
