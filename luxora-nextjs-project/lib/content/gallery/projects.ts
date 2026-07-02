import type { GalleryProject } from './types';

function encodePath(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
/** Approved AI-concept image (Design Gallery's primary source per site content rules). */
function ai(path: string): string {
  return encodePath(`/img/AI BASED/${path}`);
}
/** Real completed-project image, used to supplement Gallery where no AI concept fits (e.g. full-home spreads). */
function real(path: string): string {
  return encodePath(`/img/PROJECT BASED/${path}`);
}

function img(url: string, alt: string, opts: Partial<{ width: number; height: number; isHero: boolean }> = {}) {
  return { url, alt, width: opts.width ?? 1600, height: opts.height ?? 1200, isHero: opts.isHero };
}

export const galleryProjects: GalleryProject[] = [
  {
    id: 'gp-01',
    slug: 'the-vaishali-nagar-residence',
    title: 'The Vaishali Nagar Residence',
    category: 'living-room',
    coverImage: img(ai('LIVING BEDROOM DESIGNS/lr3.webp'), 'Grand contemporary living room concept with custom millwork, Vaishali Nagar, Jaipur', { isHero: true }),
    images: [
      img(ai('LIVING BEDROOM DESIGNS/lr3.webp'), 'Living room concept with custom millwork, Vaishali Nagar, Jaipur'),
      img(ai('LIVING BEDROOM DESIGNS/lr4.webp'), 'Living room seating concept, Vaishali Nagar, Jaipur'),
      img(ai('LIVING BEDROOM DESIGNS/lr5.webp'), 'Styled living room concept, Vaishali Nagar, Jaipur'),
    ],
    meta: {
      location: 'Vaishali Nagar, Jaipur', city: 'Jaipur',
      area: '2,400 sq ft', areaSqFt: 2400,
      style: 'Contemporary', propertyType: 'Apartment',
      budgetRange: '₹42L – ₹58L', budgetLakh: 50,
      completionTime: '52 Days',
    },
    description: 'A 3BHK reimagined end-to-end — Italian marble underfoot, custom millwork on every wall, and a single design language carried from the foyer to the master suite.',
    story: 'The brief was simple: make a dated 3BHK feel like a single, considered home rather than a collection of rooms. We carried one material palette — warm marble, brushed brass, smoked oak — through every space, and rebuilt the living room around a custom-fabricated media wall that hides every cable and speaker in sight.',
    materials: ['Italian marble flooring', 'Brushed brass fixtures', 'Smoked oak veneer', 'Bouclé upholstery'],
    colorPalette: [{ name: 'Warm Ivory', hex: '#F3ECE0' }, { name: 'Espresso Oak', hex: '#4A3524' }, { name: 'Antique Brass', hex: '#B08D57' }, { name: 'Sage Green', hex: '#8A9A7E' }],
    furnitureHighlights: ['Custom media wall with concealed cable routing', 'Modular sectional sofa in performance fabric', 'Hand-finished coffee table in book-matched stone'],
    featured: true,
    publishedAt: '2026-02-10', updatedAt: '2026-02-10',
    seo: {
      title: 'The Vaishali Nagar Residence — Luxury Living Room | Luxora Gallery',
      description: 'A 3BHK living room in Vaishali Nagar, Jaipur reimagined with Italian marble, custom millwork and layered lighting by Luxora.',
      ogImage: ai('LIVING BEDROOM DESIGNS/lr3.webp'),
    },
  },
  {
    id: 'gp-02',
    slug: 'raja-park-smart-living-room',
    title: 'Raja Park Smart Living Room',
    category: 'living-room',
    coverImage: img(ai('LIVING BEDROOM DESIGNS/lr6.webp'), 'Scandinavian smart living room concept with integrated lighting, Raja Park, Jaipur', { isHero: true }),
    images: [
      img(ai('LIVING BEDROOM DESIGNS/lr6.webp'), 'Smart living room concept, Raja Park, Jaipur'),
      img(ai('LIVING BEDROOM DESIGNS/lr7.webp'), 'Smart living room concept, evening scene, Raja Park, Jaipur'),
      img(ai('LIVING BEDROOM DESIGNS/lr8.webp'), 'Smart living room concept, cozy scene, Raja Park, Jaipur'),
    ],
    meta: {
      location: 'Raja Park, Jaipur', city: 'Jaipur',
      area: '420 sq ft', areaSqFt: 420,
      style: 'Scandinavian', propertyType: 'Apartment',
      budgetRange: '₹18L – ₹26L', budgetLakh: 22,
      completionTime: '21 Days',
    },
    description: 'A compact city living room made to feel larger — light Scandinavian tones, integrated smart lighting, and furniture chosen for every inch to earn its place.',
    story: 'In a city where space is the real luxury, this 420 sq ft living room was designed around restraint — a single light oak tone, hidden storage on every wall, and app-controlled lighting scenes that shift the mood from work to wind-down in one tap.',
    materials: ['Italian marble flooring', 'Brushed brass fixtures', 'Smoked oak veneer', 'Bouclé upholstery'],
    colorPalette: [{ name: 'Warm Ivory', hex: '#F3ECE0' }, { name: 'Espresso Oak', hex: '#4A3524' }, { name: 'Antique Brass', hex: '#B08D57' }, { name: 'Sage Green', hex: '#8A9A7E' }],
    furnitureHighlights: ['Custom media wall with concealed cable routing', 'Modular sectional sofa in performance fabric', 'Hand-finished coffee table in book-matched stone'],
    publishedAt: '2026-01-18', updatedAt: '2026-01-18',
    seo: {
      title: 'Raja Park Smart Living Room | Luxora Gallery',
      description: 'A compact Scandinavian-style smart living room in Raja Park, Jaipur, designed by Luxora.',
      ogImage: ai('LIVING BEDROOM DESIGNS/lr6.webp'),
    },
  },
  {
    id: 'gp-03',
    slug: 'malviya-nagar-master-suite',
    title: 'Malviya Nagar Master Suite',
    category: 'bedroom',
    coverImage: img(ai('MASTER BEDROOM DESIGNS/mb2.webp'), 'Luxury master bedroom suite concept with walk-in wardrobe, Malviya Nagar, Jaipur', { isHero: true }),
    images: [
      img(ai('MASTER BEDROOM DESIGNS/mb2.webp'), 'Master bedroom suite concept, Malviya Nagar, Jaipur'),
      img(ai('WARDROBE DESIGN/wd2.webp'), 'Walk-in wardrobe concept, Malviya Nagar, Jaipur'),
    ],
    meta: {
      location: 'Malviya Nagar, Jaipur', city: 'Jaipur',
      area: '320 sq ft', areaSqFt: 320,
      style: 'Luxury', propertyType: 'Independent House / Villa',
      budgetRange: '₹22L – ₹32L', budgetLakh: 27,
      completionTime: '24 Days',
    },
    description: 'An ordinary bedroom elevated into a luxury suite with a bespoke walk-in wardrobe and layered ambient lighting.',
    story: 'The owners wanted a hotel-suite feeling without losing warmth. We built a fully bespoke walk-in wardrobe behind a hidden panel door, layered three lighting circuits for reading, dressing and sleep, and dressed the room in a single muted palette from headboard to drapery.',
    materials: ['Suede-finish wardrobe shutters', 'Brushed brass hardware', 'Layered wool-blend textiles', 'Warm walnut veneer'],
    colorPalette: [{ name: 'Soft Taupe', hex: '#D8C8B8' }, { name: 'Deep Walnut', hex: '#3E2A1E' }, { name: 'Champagne Gold', hex: '#C9A227' }, { name: 'Cloud White', hex: '#F5F1EA' }],
    furnitureHighlights: ['Upholstered headboard with integrated reading lights', 'Bespoke walk-in wardrobe with soft-close hardware', 'Matching bedside consoles in walnut veneer'],
    featured: true,
    publishedAt: '2026-02-02', updatedAt: '2026-02-02',
    seo: {
      title: 'Malviya Nagar Master Suite | Luxora Gallery',
      description: 'A luxury master bedroom suite with a bespoke walk-in wardrobe in Malviya Nagar, Jaipur, by Luxora.',
      ogImage: ai('MASTER BEDROOM DESIGNS/mb2.webp'),
    },
  },
  {
    id: 'gp-04',
    slug: 'civil-lines-guest-bedroom',
    title: 'Civil Lines Guest Bedroom',
    category: 'bedroom',
    coverImage: img(ai('MASTER BEDROOM DESIGNS/mb3.webp'), 'Guest bedroom concept with layered ambient lighting, Civil Lines, Jaipur', { isHero: true }),
    images: [
      img(ai('MASTER BEDROOM DESIGNS/mb3.webp'), 'Guest bedroom concept, Civil Lines, Jaipur'),
      img(ai('MASTER BEDROOM DESIGNS/mb4.webp'), 'Guest bedroom concept, alternate view, Civil Lines, Jaipur'),
    ],
    meta: {
      location: 'Civil Lines, Jaipur', city: 'Jaipur',
      area: '260 sq ft', areaSqFt: 260,
      style: 'Classic', propertyType: 'Independent House / Villa',
      budgetRange: '₹15L – ₹22L', budgetLakh: 18,
      completionTime: '19 Days',
    },
    description: 'A guest room designed to feel as considered as the rest of the villa — heritage-inspired millwork and soft, layered lighting.',
    story: 'Guest rooms are often an afterthought; this one was not. We carried the villa’s heritage-inspired millwork language into a smaller footprint, with a built-in window seat and a reading light at exactly the right height.',
    materials: ['Suede-finish wardrobe shutters', 'Brushed brass hardware', 'Layered wool-blend textiles', 'Warm walnut veneer'],
    colorPalette: [{ name: 'Soft Taupe', hex: '#D8C8B8' }, { name: 'Deep Walnut', hex: '#3E2A1E' }, { name: 'Champagne Gold', hex: '#C9A227' }, { name: 'Cloud White', hex: '#F5F1EA' }],
    furnitureHighlights: ['Upholstered headboard with integrated reading lights', 'Bespoke walk-in wardrobe with soft-close hardware', 'Matching bedside consoles in walnut veneer'],
    publishedAt: '2026-01-05', updatedAt: '2026-01-05',
    seo: {
      title: 'Civil Lines Guest Bedroom | Luxora Gallery',
      description: 'A classic-style guest bedroom concept in Civil Lines, Jaipur, designed by Luxora.',
      ogImage: ai('MASTER BEDROOM DESIGNS/mb3.webp'),
    },
  },
  {
    id: 'gp-05',
    slug: 'c-scheme-kitchen-suite',
    title: 'C-Scheme Kitchen Suite',
    category: 'kitchen',
    coverImage: img(ai('MODULAR KITCHEN/mk2.webp'), 'Modern modular kitchen concept with quartz countertops and intelligent storage, C-Scheme, Jaipur', { isHero: true }),
    images: [
      img(ai('MODULAR KITCHEN/mk2.webp'), 'Modular kitchen concept, C-Scheme, Jaipur'),
      img(ai('MODULAR KITCHEN/mk3.webp'), 'Kitchen island concept detail, C-Scheme, Jaipur'),
    ],
    meta: {
      location: 'C-Scheme, Jaipur', city: 'Jaipur',
      area: '180 sq ft', areaSqFt: 180,
      style: 'Modern', propertyType: 'Apartment',
      budgetRange: '₹12L – ₹18L', budgetLakh: 15,
      completionTime: '18 Days',
    },
    description: 'A cramped kitchen redesigned into a sprawling modular masterpiece with intelligent storage and premium quartz countertops.',
    story: 'The original kitchen had a single run of cabinets and almost no storage. We reworked the layout into an efficient L-shape with a breakfast counter, pull-out larders, and a quartz worktop that has stayed pristine through daily use.',
    materials: ['Quartz countertops', 'Matte-finish modular cabinetry', 'German-engineered hardware', 'Textured ceramic backsplash'],
    colorPalette: [{ name: 'Warm White', hex: '#F2EDE3' }, { name: 'Charcoal Grey', hex: '#3A3A3A' }, { name: 'Brushed Gold', hex: '#C9A227' }, { name: 'Sage Accent', hex: '#8A9A7E' }],
    furnitureHighlights: ['Waterfall-edge island with breakfast counter', 'Pull-out larder units for full-height storage', 'Under-cabinet LED task lighting'],
    featured: true,
    publishedAt: '2026-01-22', updatedAt: '2026-01-22',
    seo: {
      title: 'C-Scheme Kitchen Suite | Luxora Gallery',
      description: 'A modern modular kitchen concept with quartz countertops in C-Scheme, Jaipur, by Luxora.',
      ogImage: ai('MODULAR KITCHEN/mk2.webp'),
    },
  },
  {
    id: 'gp-06',
    slug: 'jagatpura-family-kitchen',
    title: 'Jagatpura Family Kitchen',
    category: 'kitchen',
    coverImage: img(ai('MODULAR KITCHEN/mk4.webp'), 'Family kitchen concept built for entertaining, Jagatpura, Jaipur', { isHero: true }),
    images: [
      img(ai('MODULAR KITCHEN/mk4.webp'), 'Family kitchen concept, Jagatpura, Jaipur'),
      img(ai('MODULAR KITCHEN/mk5.webp'), 'Family kitchen concept, alternate view, Jagatpura, Jaipur'),
    ],
    meta: {
      location: 'Jagatpura, Jaipur', city: 'Jaipur',
      area: '210 sq ft', areaSqFt: 210,
      style: 'Contemporary', propertyType: 'Independent House / Villa',
      budgetRange: '₹16L – ₹24L', budgetLakh: 20,
      completionTime: '22 Days',
    },
    description: 'A kitchen planned around natural light and open living — warm oak tones, hidden storage, and a layout built for entertaining.',
    story: 'A young family’s first home was planned around one idea: a kitchen that opens onto the living room rather than hiding from it. Warm oak-toned cabinetry, a large island, and concealed appliance garages keep the everyday mess out of sight.',
    materials: ['Quartz countertops', 'Matte-finish modular cabinetry', 'German-engineered hardware', 'Textured ceramic backsplash'],
    colorPalette: [{ name: 'Warm White', hex: '#F2EDE3' }, { name: 'Charcoal Grey', hex: '#3A3A3A' }, { name: 'Brushed Gold', hex: '#C9A227' }, { name: 'Sage Accent', hex: '#8A9A7E' }],
    furnitureHighlights: ['Waterfall-edge island with breakfast counter', 'Pull-out larder units for full-height storage', 'Under-cabinet LED task lighting'],
    publishedAt: '2025-12-14', updatedAt: '2025-12-14',
    seo: {
      title: 'Jagatpura Family Kitchen | Luxora Gallery',
      description: 'A contemporary open-plan family kitchen concept in Jagatpura, Jaipur, designed by Luxora.',
      ogImage: ai('MODULAR KITCHEN/mk4.webp'),
    },
  },
  {
    id: 'gp-07',
    slug: 'mansarovar-wardrobe-wall',
    title: 'Mansarovar Wardrobe Wall',
    category: 'wardrobes',
    coverImage: img(ai('WARDROBE DESIGN/wd3.webp'), 'Floor-to-ceiling designer wardrobe concept with ambient lighting, Mansarovar, Jaipur', { isHero: true }),
    images: [
      img(ai('WARDROBE DESIGN/wd3.webp'), 'Wardrobe wall concept, Mansarovar, Jaipur'),
      img(ai('WARDROBE DESIGN/wd4.webp'), 'Wardrobe wall concept, alternate view, Mansarovar, Jaipur'),
    ],
    meta: {
      location: 'Mansarovar, Jaipur', city: 'Jaipur',
      area: '90 sq ft', areaSqFt: 90,
      style: 'Minimal', propertyType: 'Apartment',
      budgetRange: '₹8L – ₹12L', budgetLakh: 10,
      completionTime: '12 Days',
    },
    description: 'Floor-to-ceiling designer wardrobe with ambient lighting that disappears into the architecture of the room.',
    story: 'A single wall, floor to ceiling, became this project’s entire brief. Soft-close hardware, internal LED strips on motion sensors, and a matte finish that reads as part of the wall rather than furniture sitting against it.',
    materials: ['Soft-close hinges and channels', 'Matte laminate shutters', 'Internal LED strip lighting', 'Velvet-lined accessory trays'],
    colorPalette: [{ name: 'Warm Grey', hex: '#B7ACA1' }, { name: 'Espresso', hex: '#4A3524' }, { name: 'Brushed Brass', hex: '#B08D57' }, { name: 'Ivory', hex: '#F3ECE0' }],
    furnitureHighlights: ['Floor-to-ceiling shutters with mirrored inserts', 'Motion-sensor internal lighting', 'Dedicated accessory and jewellery drawers'],
    publishedAt: '2025-12-02', updatedAt: '2025-12-02',
    seo: {
      title: 'Mansarovar Wardrobe Wall | Luxora Gallery',
      description: 'A minimal floor-to-ceiling wardrobe wall concept with ambient lighting in Mansarovar, Jaipur.',
      ogImage: ai('WARDROBE DESIGN/wd3.webp'),
    },
  },
  {
    id: 'gp-08',
    slug: 'bani-park-walk-in-closet',
    title: 'Bani Park Walk-In Closet',
    category: 'wardrobes',
    coverImage: img(ai('WARDROBE DESIGN/wd5.webp'), 'Walk-in closet concept with custom shelving, Bani Park, Jaipur', { isHero: true }),
    images: [
      img(ai('WARDROBE DESIGN/wd5.webp'), 'Walk-in closet concept, Bani Park, Jaipur'),
      img(ai('MASTER BEDROOM DESIGNS/mb5.webp'), 'Bedroom adjoining walk-in closet concept, Bani Park, Jaipur'),
    ],
    meta: {
      location: 'Bani Park, Jaipur', city: 'Jaipur',
      area: '70 sq ft', areaSqFt: 70,
      style: 'Luxury', propertyType: 'Apartment',
      budgetRange: '₹10L – ₹16L', budgetLakh: 13,
      completionTime: '14 Days',
    },
    description: 'A dedicated walk-in closet with bespoke shelving, a centre island, and lighting tuned for true colour rendering.',
    story: 'Converted from an underused store room, this walk-in closet now holds everything on display behind glass-front cabinetry, lit with a colour-accurate LED strip so clothing colours read true, not warm or cool.',
    materials: ['Soft-close hinges and channels', 'Matte laminate shutters', 'Internal LED strip lighting', 'Velvet-lined accessory trays'],
    colorPalette: [{ name: 'Warm Grey', hex: '#B7ACA1' }, { name: 'Espresso', hex: '#4A3524' }, { name: 'Brushed Brass', hex: '#B08D57' }, { name: 'Ivory', hex: '#F3ECE0' }],
    furnitureHighlights: ['Floor-to-ceiling shutters with mirrored inserts', 'Motion-sensor internal lighting', 'Dedicated accessory and jewellery drawers'],
    publishedAt: '2025-11-20', updatedAt: '2025-11-20',
    seo: {
      title: 'Bani Park Walk-In Closet | Luxora Gallery',
      description: 'A bespoke walk-in closet concept with custom shelving in Bani Park, Jaipur, by Luxora.',
      ogImage: ai('WARDROBE DESIGN/wd5.webp'),
    },
  },
  {
    id: 'gp-09',
    slug: 'the-civil-lines-villa',
    title: 'The Civil Lines Villa',
    category: 'full-home',
    coverImage: img(real('FOYER DESIGN/krish ji entrance+kitchen+dining area A01_View020100 lux.webp'), 'Double-height foyer of a full villa interior, Civil Lines, Jaipur', { isHero: true }),
    images: [
      img(real('FOYER DESIGN/krish ji entrance+kitchen+dining area A01_View020100 lux.webp'), 'Villa foyer, Civil Lines, Jaipur'),
      img(real('LIVING ROOM DESIGN/Krish ji S.F. A01_View140000.webp'), 'Villa living area, Civil Lines, Jaipur'),
      img(real('MASTER BEDROOM DESIGN/Krish ji Third floor A01_View030000.webp'), 'Villa top-floor bedroom, Civil Lines, Jaipur'),
    ],
    meta: {
      location: 'Civil Lines, Jaipur', city: 'Jaipur',
      area: '4,200 sq ft', areaSqFt: 4200,
      style: 'Classic', propertyType: 'Independent House / Villa',
      budgetRange: '₹85L – ₹1.1Cr', budgetLakh: 95,
      completionTime: '64 Days',
    },
    description: 'An independent villa rebuilt room by room — heritage-inspired millwork, a double-height foyer, and bespoke furnishings sourced for every level.',
    story: 'Every room in this villa was designed against one shared material story, so a visitor moving from the foyer to the topmost bedroom never feels like they’ve entered a different project. The double-height foyer became the signature moment — a single pendant fixture, hand-finished plaster, and a staircase rebuilt in book-matched stone.',
    materials: ['Book-matched natural stone', 'Hand-finished plaster', 'Reclaimed and veneered woods', 'Brushed brass throughout'],
    colorPalette: [{ name: 'Warm Ivory', hex: '#F3ECE0' }, { name: 'Deep Espresso', hex: '#3E2A1E' }, { name: 'Antique Brass', hex: '#B08D57' }, { name: 'Muted Sage', hex: '#8A9A7E' }],
    furnitureHighlights: ['Signature double-height foyer fixture', 'Custom joinery carried across every floor', 'Bespoke furnishings sourced room by room'],
    featured: true,
    publishedAt: '2025-11-08', updatedAt: '2025-11-08',
    seo: {
      title: 'The Civil Lines Villa | Luxora Gallery',
      description: 'A complete villa interior in Civil Lines, Jaipur, designed end-to-end by Luxora.',
      ogImage: real('FOYER DESIGN/krish ji entrance+kitchen+dining area A01_View020100 lux.webp'),
    },
  },
  {
    id: 'gp-10',
    slug: 'jagatpura-family-home',
    title: 'Jagatpura Family Home',
    category: 'full-home',
    coverImage: img(real('LIVING ROOM DESIGN/Vizora House G.F. A01_View050000.webp'), 'Full family home living area, Jagatpura, Jaipur', { isHero: true }),
    images: [
      img(real('LIVING ROOM DESIGN/Vizora House G.F. A01_View050000.webp'), 'Family home living area, Jagatpura, Jaipur'),
      img(real('LIVING ROOM DESIGN/Vizora House G.F. A01_View060000.webp'), 'Family home living area, alternate view, Jagatpura, Jaipur'),
      img(real('MASTER BEDROOM DESIGN/Vizora House G.F. A01_View080000.webp'), 'Family home bedroom, Jagatpura, Jaipur'),
    ],
    meta: {
      location: 'Jagatpura, Jaipur', city: 'Jaipur',
      area: '1,950 sq ft', areaSqFt: 1950,
      style: 'Contemporary', propertyType: 'Apartment',
      budgetRange: '₹36L – ₹50L', budgetLakh: 43,
      completionTime: '45 Days',
    },
    description: 'A young family’s first home, planned around natural light and open living from the foyer to the master suite.',
    story: 'This 3BHK was the family’s first home, and the brief was warmth over showiness — oak tones, soft textiles, and a layout that keeps the kitchen, dining and living areas in constant conversation with each other.',
    materials: ['Book-matched natural stone', 'Hand-finished plaster', 'Reclaimed and veneered woods', 'Brushed brass throughout'],
    colorPalette: [{ name: 'Warm Ivory', hex: '#F3ECE0' }, { name: 'Deep Espresso', hex: '#3E2A1E' }, { name: 'Antique Brass', hex: '#B08D57' }, { name: 'Muted Sage', hex: '#8A9A7E' }],
    furnitureHighlights: ['Signature double-height foyer fixture', 'Custom joinery carried across every floor', 'Bespoke furnishings sourced room by room'],
    publishedAt: '2025-10-29', updatedAt: '2025-10-29',
    seo: {
      title: 'Jagatpura Family Home | Luxora Gallery',
      description: 'A complete contemporary family home interior in Jagatpura, Jaipur, by Luxora.',
      ogImage: real('LIVING ROOM DESIGN/Vizora House G.F. A01_View050000.webp'),
    },
  },
  {
    id: 'gp-11',
    slug: 'jaipur-corporate-studio',
    title: 'Jaipur Corporate Studio',
    category: 'office',
    coverImage: img(ai('HOME OFFICE/ofc2.webp'), 'Premium commercial office interior concept, Jaipur', { isHero: true }),
    images: [
      img(ai('HOME OFFICE/ofc2.webp'), 'Office interior concept, Jaipur'),
      img(ai('HOME OFFICE/ofc3.webp'), 'Office breakout area concept, Jaipur'),
    ],
    meta: {
      location: 'Ajmer Road, Jaipur', city: 'Jaipur',
      area: '3,200 sq ft', areaSqFt: 3200,
      style: 'Modern', propertyType: 'Office / Commercial',
      budgetRange: '₹60L – ₹80L', budgetLakh: 70,
      completionTime: '38 Days',
    },
    description: 'A brand-driven workspace built for identity and performance — open-plan desking, acoustic-treated meeting pods and a statement reception.',
    story: 'The client wanted their office to read as a physical extension of their brand. We built a reception wall in their brand material palette, acoustic-treated pods for focused calls, and an open desking plan zoned by natural light rather than hierarchy.',
    materials: ['Acoustic-rated wall panelling', 'Brushed metal and glass partitions', 'Engineered wood flooring', 'Brand-matched laminate finishes'],
    colorPalette: [{ name: 'Warm Grey', hex: '#B7ACA1' }, { name: 'Charcoal', hex: '#333333' }, { name: 'Brand Accent Gold', hex: '#C9A227' }, { name: 'Soft White', hex: '#F2EDE3' }],
    furnitureHighlights: ['Statement reception desk in brand material palette', 'Acoustic-treated meeting pods', 'Modular desking zoned by natural light'],
    publishedAt: '2025-10-10', updatedAt: '2025-10-10',
    seo: {
      title: 'Jaipur Corporate Studio | Luxora Gallery',
      description: 'A brand-driven corporate office interior concept in Jaipur, designed by Luxora.',
      ogImage: ai('HOME OFFICE/ofc2.webp'),
    },
  },
  {
    id: 'gp-12',
    slug: 'tonk-road-design-studio',
    title: 'Tonk Road Design Studio',
    category: 'office',
    coverImage: img(real('OFFICES BY LUXORA/Bansal ji office A01_View050000.webp'), 'Boutique design studio office, Tonk Road, Jaipur', { isHero: true }),
    images: [
      img(real('OFFICES BY LUXORA/Bansal ji office A01_View050000.webp'), 'Design studio interior, Tonk Road, Jaipur'),
      img(real('OFFICES BY LUXORA/ASHRIT JI B_View090000.webp'), 'Design studio meeting area, Tonk Road, Jaipur'),
    ],
    meta: {
      location: 'Tonk Road, Jaipur', city: 'Jaipur',
      area: '1,400 sq ft', areaSqFt: 1400,
      style: 'Minimal', propertyType: 'Office / Commercial',
      budgetRange: '₹28L – ₹38L', budgetLakh: 33,
      completionTime: '26 Days',
    },
    description: 'A boutique studio office built around restraint — exposed materials, a single accent colour, and flexible furniture for a growing team.',
    story: 'A 12-person design studio needed a space that could double its headcount without a second renovation. Modular furniture, a single accent colour against raw materials, and a flexible meeting area that converts into overflow desking on busy weeks.',
    materials: ['Acoustic-rated wall panelling', 'Brushed metal and glass partitions', 'Engineered wood flooring', 'Brand-matched laminate finishes'],
    colorPalette: [{ name: 'Warm Grey', hex: '#B7ACA1' }, { name: 'Charcoal', hex: '#333333' }, { name: 'Brand Accent Gold', hex: '#C9A227' }, { name: 'Soft White', hex: '#F2EDE3' }],
    furnitureHighlights: ['Statement reception desk in brand material palette', 'Acoustic-treated meeting pods', 'Modular desking zoned by natural light'],
    publishedAt: '2025-09-25', updatedAt: '2025-09-25',
    seo: {
      title: 'Tonk Road Design Studio | Luxora Gallery',
      description: 'A minimal boutique studio office interior in Tonk Road, Jaipur, by Luxora.',
      ogImage: real('OFFICES BY LUXORA/Bansal ji office A01_View050000.webp'),
    },
  },
];

export function getGalleryProject(slug: string): GalleryProject | undefined {
  return galleryProjects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(categorySlug: string): GalleryProject[] {
  return galleryProjects.filter((p) => p.category === categorySlug);
}

export function getProjectsByStyle(styleLabel: string): GalleryProject[] {
  return galleryProjects.filter((p) => p.meta.style === styleLabel);
}

export function getRelatedProjects(project: GalleryProject, limit = 3): GalleryProject[] {
  return galleryProjects
    .filter((p) => p.id !== project.id && (p.category === project.category || p.meta.style === project.meta.style))
    .slice(0, limit);
}
