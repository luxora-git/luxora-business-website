import type { CatalogItem } from './types';

function p(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
function real(path: string, alt: string) {
  return { url: p(`/img/PROJECT BASED/${path}`), alt };
}
function ai(path: string, alt: string) {
  return { url: p(`/img/AI BASED/${path}`), alt };
}

/**
 * Products — the physical modular systems Luxora designs, fabricates and
 * installs as part of a project. Distinct from Interior Elements (which
 * covers every surface/detail of a room) and Services (the process of
 * delivering a project): this is specifically "what we build in our own
 * facility." No pricing or SKUs — we have no real per-unit price list, so
 * every page routes to Consultation/Estimate for actual figures.
 */
export const products: CatalogItem[] = [
  {
    slug: 'modular-kitchens',
    title: 'Modular Kitchens',
    eyebrow: 'Product',
    heroImage: real('MODULAR KITCHEN/Krish ji D01_View020000.webp', 'Modular kitchen fabricated by Luxora, Jaipur'),
    description: 'Fabricated in our own facility to precise measurements — not a catalogue module trimmed to fit, but a kitchen built to your exact wall footprint.',
    highlights: ['Built to exact wall measurements, not standard widths', 'German-grade hardware and soft-close fittings', 'Quartz, granite and solid-surface countertop options', 'Concealed appliance integration'],
    gallery: [
      real('MODULAR KITCHEN/Ram ji G.F. kitchen A02.webp', 'Modular kitchen, Jaipur'),
      real('MODULAR KITCHEN/DD khandelwal kitchen A02.webp', 'Modular kitchen detail, Jaipur'),
      real('MODULAR KITCHEN/Rakesh ji living A01_View080000.webp', 'Modular kitchen, Rakesh Residence, Jaipur'),
      real('MODULAR KITCHEN/Krish ji C01_View020000.webp', 'Modular kitchen, Krish Residence, Jaipur'),
    ],
    gallerySlug: 'kitchen',
    serviceSlug: 'modular-kitchen-design',
    relatedPortfolioSlugs: ['rakesh-ji-residence', 'dd-khandelwal-kitchen'],
  },
  {
    slug: 'wardrobes-storage',
    title: 'Wardrobes & Storage',
    eyebrow: 'Product',
    heroImage: real('WARDROBE DESIGN/Krish ji S.F. Bathrooms A01_View010042.webp', 'Wardrobe fabricated by Luxora, Jaipur'),
    description: 'Sliding, hinged or walk-in — every wardrobe is built around an interior layout planned by what you actually own, then finished to match your room.',
    highlights: ['Interior layouts planned before exterior finish', 'Soft-close hardware and motion-sensor LED lighting', 'Sliding, hinged and walk-in configurations', 'Matched to your bedroom\'s material language'],
    gallery: [
      real('WARDROBE DESIGN/krish ji f.f. bathroom&dressing A01.webp', 'Wardrobe and dressing, Krish Residence, Jaipur'),
      real('WARDROBE DESIGN/Rishabh ji Master Bedroom A04.webp', 'Wardrobe, Rishabh Residence, Jaipur'),
      real('WARDROBE DESIGN/GAUTMA JI M. BEDROOM DRESSING A03.webp', 'Wardrobe dressing area, Jaipur'),
      real('WARDROBE DESIGN/Vizora House F.F. A01_View180000_View01000.webp', 'Wardrobe wall, Vizora House, Jaipur'),
    ],
    gallerySlug: 'wardrobes',
    serviceSlug: 'wardrobe-design',
    relatedPortfolioSlugs: ['krish-ji-residence', 'gautam-ji-residence'],
  },
  {
    slug: 'tv-units-media-walls',
    title: 'TV Units & Media Walls',
    eyebrow: 'Product',
    heroImage: real('TV UNIT DESIGN/Krish ji Third floor A01_View020000.webp', 'Media wall by Luxora, Jaipur'),
    description: 'Built as the living room\'s focal wall — cable management, speaker placement and display height planned together, not fitted around an existing television.',
    highlights: ['Concealed cable and speaker management', 'Display height planned for the seating layout', 'Integrated ambient lighting', 'Matched to the room\'s feature-wall material'],
    gallery: [
      real('TV UNIT DESIGN/Vizora House G.F. A01_View020000.webp', 'TV unit, Vizora House, Jaipur'),
      real('TV UNIT DESIGN/Krish ji Bedroom A02.webp', 'Bedroom TV unit, Krish Residence, Jaipur'),
      ai('TV UNIT DESIGN/tv2.webp', 'Media wall design concept, Jaipur'),
      ai('TV UNIT DESIGN/tv4.webp', 'TV unit design concept, Jaipur'),
    ],
    gallerySlug: 'living-room',
    serviceSlug: 'living-room-interior-design',
    relatedPortfolioSlugs: ['vizora-house', 'gautam-ji-residence'],
  },
  {
    slug: 'false-ceilings-lighting',
    title: 'False Ceilings & Lighting',
    eyebrow: 'Product',
    heroImage: ai('FALSE CIELING DESIGN/fc9.webp', 'False ceiling and lighting design concept, Jaipur'),
    description: 'Ceiling and lighting planned as one system — cove detailing, panel layout and light fixtures coordinated with the room\'s electrical plan from day one.',
    highlights: ['Cove and panel detailing to match room proportions', 'Ambient, task and accent lighting layers', 'Coordinated with HVAC and electrical layout', 'Scene-based control where automated'],
    gallery: [
      ai('FALSE CIELING DESIGN/fc10.webp', 'False ceiling concept, Jaipur'),
      ai('FALSE CIELING DESIGN/fc2.webp', 'Ceiling lighting concept, Jaipur'),
      real('FALSE CEILINGS DESIGN/Rishabh ji  final 20-5-2025 A01_View010078.webp', 'False ceiling, Rishabh Residence, Jaipur'),
      ai('FALSE CIELING DESIGN/fc6.webp', 'False ceiling concept, Jaipur'),
    ],
    gallerySlug: 'living-room',
    serviceSlug: 'home-automation',
    relatedPortfolioSlugs: ['rishabh-ji-residence', 'vizora-house'],
  },
  {
    slug: 'bathroom-vanities',
    title: 'Bathroom Vanities',
    eyebrow: 'Product',
    heroImage: real('BATHROOM DESIGN/Balram ji Bathroom C01_View010000.webp', 'Bathroom vanity by Luxora, Jaipur'),
    description: 'Vanities and storage built for a wet environment without losing the material language of the bedroom it adjoins.',
    highlights: ['Water-resistant carcass and finish materials', 'Storage planned around fittings and toiletries', 'Matched to adjoining bedroom or dressing area', 'Fittings chosen for long-term durability'],
    gallery: [
      real('BATHROOM DESIGN/Rishabh ji Master Bedroom B04.webp', 'Bathroom vanity, Rishabh Residence, Jaipur'),
      real('BATHROOM DESIGN/Krish ji Dressing A01_View080000.webp', 'Bathroom, Krish Residence, Jaipur'),
      real('BATHROOM DESIGN/Balram ji Bathroom B01_View020000.webp', 'Bathroom vanity, Balram Residence, Jaipur'),
      real('BATHROOM DESIGN/krish ji f.f. bathroom&dressing A04.webp', 'Bathroom detail, Krish Residence, Jaipur'),
    ],
    gallerySlug: 'bedroom',
    serviceSlug: 'bedroom-interior-design',
    relatedPortfolioSlugs: ['rishabh-ji-residence', 'balram-ji-residence'],
  },
  {
    slug: 'custom-furniture',
    title: 'Custom Furniture',
    eyebrow: 'Product',
    heroImage: real('LIVING ROOM DESIGN/Rakesh ji living A01_View090000.webp', 'Custom furniture by Luxora, Jaipur'),
    description: 'Seating, tables and joinery built to a room\'s exact proportions where an off-the-shelf piece would compromise the layout.',
    highlights: ['Built to a room\'s exact proportions', 'Upholstery and finish matched to the material palette', 'Joinery integrated with walls and storage', 'Sourced and fabricated for daily durability'],
    gallery: [
      real('LIVING ROOM DESIGN/Ajit ji khichar A08.webp', 'Custom living room furniture, Jaipur'),
      real('LIVING ROOM DESIGN/Ajit ji khichar A09.webp', 'Custom seating, Jaipur'),
      real('LIVING ROOM DESIGN/Karamveer ji G.F. A01_View070000.webp', 'Custom furniture layout, Karamveer Residence, Jaipur'),
      real('LIVING ROOM DESIGN/Vizora House G.F. A01_View050000.webp', 'Custom furniture, Vizora House, Jaipur'),
    ],
    gallerySlug: 'living-room',
    serviceSlug: 'living-room-interior-design',
    relatedPortfolioSlugs: ['khichar-residence', 'karamveer-ji-residence'],
  },
  {
    slug: 'home-automation-systems',
    title: 'Home Automation Systems',
    eyebrow: 'Product',
    heroImage: ai('FALSE CIELING DESIGN/fc7.webp', 'Home automation system design concept, Jaipur'),
    description: 'Lighting, climate, curtains and security integrated into a single control system — built into the interior design rather than retrofitted after.',
    highlights: ['Scene-based lighting from one app or wall panel', 'Motorised curtains and blinds', 'Zoned climate control', 'Security and access control integration'],
    gallery: [
      ai('FALSE CIELING DESIGN/fc8.webp', 'Automation-ready lighting concept, Jaipur'),
      ai('TV UNIT DESIGN/tv5.webp', 'Media wall automation concept, Jaipur'),
      real('TV UNIT DESIGN/Vizora House G.F. A01_View020000.webp', 'TV unit, Vizora House, Jaipur'),
      ai('MASTER BEDROOM DESIGNS/mb3.webp', 'Bedroom automation concept, Jaipur'),
    ],
    gallerySlug: 'living-room',
    serviceSlug: 'home-automation',
    relatedPortfolioSlugs: ['vizora-house', 'krish-ji-residence'],
  },
];
