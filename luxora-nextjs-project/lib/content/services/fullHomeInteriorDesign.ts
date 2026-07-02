import type { ServicePageData } from './types';
import { luxoraPriceCalculatorUrl } from '@/lib/content/global/contact';
import { luxoraStats } from '@/lib/content/global/stats';

function encodePath(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
function ai(path: string): string {
  return encodePath(`/img/AI BASED/${path}`);
}
function real(path: string): string {
  return encodePath(`/img/PROJECT BASED/${path}`);
}

/**
 * Content for the "Full Home Interior Design" service page — the primary
 * pillar service and the master reference instance of the Service Page
 * Template. Every future service page (Modular Kitchens, Architectural
 * Design, …) follows this same shape.
 */
export const fullHomeInteriorDesign: ServicePageData = {
  slug: 'full-home-interior-design',

  hero: {
    breadcrumbLabel: 'Full Home Interior Design',
    heading: 'Every Room,',
    headingItalic: 'One Singular Vision',
    description:
      'A complete, turnkey transformation of your home — from the entryway to the last light switch — designed and executed by a single dedicated team, start to finish.',
    image: real('LIVING ROOM DESIGN/Krish ji S.F. A01_View120000.webp'),
    imageAlt: 'Fully furnished luxury living room, part of a complete Luxora full-home interior project',
  },

  overview: {
    eyebrow: "What's Included",
    title: 'A Complete Home,',
    titleItalic: 'Designed As One',
    description:
      'Most renovations happen room by room, with different vendors, different timelines, and no one accountable for the whole. Full Home Interiors is different — one design language, one project team, and one handover date for every room in your house.',
    image: real('LIVING ROOM DESIGN/Vizora House G.F. A01_View010000.webp'),
    imageAlt: 'Completed full-home interior living room with custom furniture and ambient lighting',
    bullets: [
      'Living, dining, kitchen, bedrooms, bathrooms and balconies — planned together, not in isolation',
      'One design language carried through every room, down to hardware and switch plates',
      'A single project manager accountable for the entire home, from first sketch to final handover',
    ],
    statValue: '45 Days',
    statLabel: 'Average Full-Home Handover',
  },

  highlights: [
    { value: luxoraStats.homesDelivered, label: 'Homes Delivered', description: 'Full-home transformations completed across India.' },
    { value: `${luxoraStats.warrantyYears}-Year`, label: 'Structural Warranty', description: 'Long-term assurance on every fitted surface.' },
    { value: `${luxoraStats.avgDeliveryDays}-Day`, label: 'Average Handover', description: 'From signed design to move-in ready.' },
    { value: `${luxoraStats.qualityChecks}-Point`, label: 'Quality Checklist', description: 'Every room inspected before handover.' },
    { value: 'Zero', label: 'Hidden Costs', description: 'One transparent quote, no surprise add-ons.' },
  ],

  comparison: {
    eyebrow: 'Why Luxora',
    title: 'A Different Way To Renovate',
    description:
      'Most home interior projects involve three or four vendors who rarely speak to each other. Here is what changes when one team owns the entire home.',
    luxoraColumnLabel: 'The Luxora Way',
    typicalColumnLabel: 'Typical Vendors',
    rows: [
      { label: 'Point of Contact', luxora: 'One dedicated designer & project manager', typical: 'Separate contractors per room' },
      { label: 'Design Consistency', luxora: 'One design language across every room', typical: 'Inconsistent styles, room to room' },
      { label: 'Pricing', luxora: 'Single transparent quote, upfront', typical: 'Multiple quotes, frequent add-ons' },
      { label: 'Quality Assurance', luxora: '150-point checklist before handover', typical: 'Informal, vendor-dependent checks' },
      { label: 'Warranty', luxora: '10-year structural warranty, one provider', typical: 'Fragmented, vendor-specific warranties' },
      { label: 'Timeline', luxora: '45-day average, one accountable schedule', typical: 'Open-ended, sequential vendor delays' },
    ],
  },

  process: {
    eyebrow: 'How It Works',
    title: 'From Enquiry,',
    titleItalic: 'To Handover',
    description:
      'No guesswork, no gaps between vendors — just six clear stages, each one managed by the same dedicated team.',
    steps: [
      {
        number: '01',
        title: 'Free Consultation',
        description: 'A no-obligation conversation to understand your home, lifestyle and budget.',
        duration: 'Same Day',
      },
      {
        number: '02',
        title: 'Site Visit & Measurement',
        description: 'Our designer visits in person for precise measurements and a feasibility walkthrough.',
        duration: '2–3 Days',
      },
      {
        number: '03',
        title: 'Concept & Design Presentation',
        description: 'Photorealistic 3D renders and a complete material palette, presented room by room.',
        duration: '1 Week',
      },
      {
        number: '04',
        title: 'Material Selection & Final Quote',
        description: 'Every finish, fitting and fixture finalised against one transparent, itemised quote.',
        duration: '3–5 Days',
      },
      {
        number: '05',
        title: 'Execution & Quality Monitoring',
        description: 'Certified craftsmen execute the build under a 150-point quality checklist.',
        duration: '30–40 Days',
      },
      {
        number: '06',
        title: 'Final Styling & Handover',
        description: 'Furniture, decor and styling completed before a guided final walkthrough.',
        duration: '3–5 Days',
      },
    ],
    summary: [
      { label: 'Average Project Duration', value: '45–60 Days' },
      { label: 'Project Management', value: 'One Dedicated Manager' },
      { label: 'Progress Updates', value: 'Every Week' },
      { label: 'Before Handover', value: '150-Point Quality Inspection' },
    ],
  },

  gallery: {
    eyebrow: 'Recent Work',
    title: 'Homes We Have',
    titleItalic: 'Brought To Life',
    description:
      'A curated selection of full-home transformations — each one designed, built and styled by a single Luxora team.',
    filters: ['All', 'Modern', 'Luxury', 'Minimal', 'Classic', 'Contemporary', 'Scandinavian'],
    collections: [
      {
        label: 'Living Rooms',
        featured: {
          title: 'The Vaishali Nagar Residence',
          image: ai('LIVING BEDROOM DESIGNS/lr11.webp'),
          imageAlt: 'Grand living room concept with custom millwork, Vaishali Nagar, Jaipur',
          location: 'Vaishali Nagar, Jaipur',
          area: '2,400 sq ft',
          style: 'Contemporary',
          budgetRange: '₹42L – ₹58L',
          completionTime: '52 Days',
          description:
            'A 3BHK reimagined end-to-end — Italian marble underfoot, custom millwork on every wall, and a single design language carried from the foyer to the master suite.',
        },
        projects: [
          {
            title: 'C-Scheme Kitchen Suite',
            image: ai('MODULAR KITCHEN/mk7.webp'),
            imageAlt: 'Modular kitchen concept with quartz countertops and intelligent storage, C-Scheme, Jaipur',
            style: 'Modern',
            area: '180 sq ft',
            location: 'C-Scheme, Jaipur',
            completionTime: '18 Days',
          },
          {
            title: 'Malviya Nagar Master Suite',
            image: ai('MASTER BEDROOM DESIGNS/mr6.webp'),
            imageAlt: 'Luxury master bedroom suite concept with walk-in wardrobe, Malviya Nagar, Jaipur',
            style: 'Luxury',
            area: '320 sq ft',
            location: 'Malviya Nagar, Jaipur',
            completionTime: '24 Days',
          },
          {
            title: 'Mansarovar Wardrobe Wall',
            image: ai('WARDROBE DESIGN/wd7.webp'),
            imageAlt: 'Floor-to-ceiling designer wardrobe concept with ambient lighting, Mansarovar, Jaipur',
            style: 'Minimal',
            area: '90 sq ft',
            location: 'Mansarovar, Jaipur',
            completionTime: '12 Days',
          },
          {
            title: 'Civil Lines Residence',
            image: real('FOYER DESIGN/krish ji entrance+kitchen+dining area A01_View020100 lux.webp'),
            imageAlt: 'Full home residential foyer with layered ambient lighting, Civil Lines, Jaipur',
            style: 'Classic',
            area: '2,100 sq ft',
            location: 'Civil Lines, Jaipur',
            completionTime: '48 Days',
          },
          {
            title: 'Raja Park Smart Living Room',
            image: ai('LIVING BEDROOM DESIGNS/lr12.webp'),
            imageAlt: 'Scandinavian smart living room concept with integrated lighting, Raja Park, Jaipur',
            style: 'Scandinavian',
            area: '420 sq ft',
            location: 'Raja Park, Jaipur',
            completionTime: '21 Days',
          },
        ],
      },
      {
        label: 'Luxury Villas',
        featured: {
          title: 'The Civil Lines Villa',
          image: real('LIVING ROOM DESIGN/Krish ji S.F. A01_View140000.webp'),
          imageAlt: 'Full villa living area with layered ambient lighting, Civil Lines, Jaipur',
          location: 'Civil Lines, Jaipur',
          area: '4,200 sq ft',
          style: 'Classic',
          budgetRange: '₹85L – ₹1.1Cr',
          completionTime: '64 Days',
          description:
            'An independent villa rebuilt room by room — heritage-inspired millwork, a double-height foyer, and bespoke furnishings sourced for every level.',
        },
        projects: [
          {
            title: 'Jagatpura Family Home',
            image: real('LIVING ROOM DESIGN/Vizora House G.F. A01_View060000.webp'),
            imageAlt: 'Full family home living area, Jagatpura, Jaipur',
            style: 'Contemporary',
            area: '1,950 sq ft',
            location: 'Jagatpura, Jaipur',
            completionTime: '45 Days',
          },
          {
            title: 'Malviya Nagar Master Suite',
            image: ai('MASTER BEDROOM DESIGNS/mr7.webp'),
            imageAlt: 'Luxury master bedroom suite concept with walk-in wardrobe, Malviya Nagar, Jaipur',
            style: 'Luxury',
            area: '320 sq ft',
            location: 'Malviya Nagar, Jaipur',
            completionTime: '24 Days',
          },
          {
            title: 'Mansarovar Wardrobe Wall',
            image: ai('WARDROBE DESIGN/wd12.webp'),
            imageAlt: 'Floor-to-ceiling designer wardrobe concept with ambient lighting, Mansarovar, Jaipur',
            style: 'Minimal',
            area: '90 sq ft',
            location: 'Mansarovar, Jaipur',
            completionTime: '12 Days',
          },
          {
            title: 'C-Scheme Kitchen Suite',
            image: ai('MODULAR KITCHEN/mk8.webp'),
            imageAlt: 'Modular kitchen concept with quartz countertops and intelligent storage, C-Scheme, Jaipur',
            style: 'Modern',
            area: '180 sq ft',
            location: 'C-Scheme, Jaipur',
            completionTime: '18 Days',
          },
          {
            title: 'Raja Park Smart Living Room',
            image: real('MASTER BEDROOM DESIGN/Vizora House G.F. A01_View080000.webp'),
            imageAlt: 'Smart-enabled living room concept with integrated lighting, Raja Park, Jaipur',
            style: 'Scandinavian',
            area: '420 sq ft',
            location: 'Raja Park, Jaipur',
            completionTime: '21 Days',
          },
        ],
      },
      {
        label: 'Contemporary Homes',
        featured: {
          title: 'The Jagatpura Family Home',
          image: real('LIVING ROOM DESIGN/Vizora House G.F. A01_View050000.webp'),
          imageAlt: 'Full contemporary family home living area, Jagatpura, Jaipur',
          location: 'Jagatpura, Jaipur',
          area: '1,950 sq ft',
          style: 'Contemporary',
          budgetRange: '₹36L – ₹50L',
          completionTime: '45 Days',
          description:
            'A young family’s first home, planned around natural light and open living — warm oak tones, hidden storage, and a kitchen built for entertaining.',
        },
        projects: [
          {
            title: 'The Vaishali Nagar Residence',
            image: ai('LIVING BEDROOM DESIGNS/lr3.webp'),
            imageAlt: 'Grand living room concept with custom millwork, Vaishali Nagar, Jaipur',
            style: 'Contemporary',
            area: '2,400 sq ft',
            location: 'Vaishali Nagar, Jaipur',
            completionTime: '52 Days',
          },
          {
            title: 'Civil Lines Residence',
            image: real('MASTER BEDROOM DESIGN/Krish ji Third floor A01_View030000.webp'),
            imageAlt: 'Full home residential bedroom with layered ambient lighting, Civil Lines, Jaipur',
            style: 'Classic',
            area: '2,100 sq ft',
            location: 'Civil Lines, Jaipur',
            completionTime: '48 Days',
          },
          {
            title: 'Mansarovar Wardrobe Wall',
            image: ai('WARDROBE DESIGN/wd14.webp'),
            imageAlt: 'Floor-to-ceiling designer wardrobe concept with ambient lighting, Mansarovar, Jaipur',
            style: 'Minimal',
            area: '90 sq ft',
            location: 'Mansarovar, Jaipur',
            completionTime: '12 Days',
          },
          {
            title: 'C-Scheme Kitchen Suite',
            image: ai('MODULAR KITCHEN/mk9.webp'),
            imageAlt: 'Modular kitchen concept with quartz countertops and intelligent storage, C-Scheme, Jaipur',
            style: 'Modern',
            area: '180 sq ft',
            location: 'C-Scheme, Jaipur',
            completionTime: '18 Days',
          },
          {
            title: 'Malviya Nagar Master Suite',
            image: ai('MASTER BEDROOM DESIGNS/mb2.webp'),
            imageAlt: 'Luxury master bedroom suite concept with walk-in wardrobe, Malviya Nagar, Jaipur',
            style: 'Luxury',
            area: '320 sq ft',
            location: 'Malviya Nagar, Jaipur',
            completionTime: '24 Days',
          },
        ],
      },
      {
        label: 'Premium Apartments',
        featured: {
          title: 'The Raja Park Smart Apartment',
          image: ai('LIVING BEDROOM DESIGNS/lr6.webp'),
          imageAlt: 'Scandinavian smart living room concept with integrated lighting, Raja Park, Jaipur',
          location: 'Raja Park, Jaipur',
          area: '420 sq ft',
          style: 'Scandinavian',
          budgetRange: '₹18L – ₹26L',
          completionTime: '21 Days',
          description:
            'A compact city apartment made to feel larger — light Scandinavian tones, integrated smart lighting, and furniture chosen for every inch to earn its place.',
        },
        projects: [
          {
            title: 'Malviya Nagar Master Suite',
            image: ai('MASTER BEDROOM DESIGNS/mb3.webp'),
            imageAlt: 'Luxury master bedroom suite concept with walk-in wardrobe, Malviya Nagar, Jaipur',
            style: 'Luxury',
            area: '320 sq ft',
            location: 'Malviya Nagar, Jaipur',
            completionTime: '24 Days',
          },
          {
            title: 'Mansarovar Wardrobe Wall',
            image: ai('WARDROBE DESIGN/wd15.webp'),
            imageAlt: 'Floor-to-ceiling designer wardrobe concept with ambient lighting, Mansarovar, Jaipur',
            style: 'Minimal',
            area: '90 sq ft',
            location: 'Mansarovar, Jaipur',
            completionTime: '12 Days',
          },
          {
            title: 'C-Scheme Kitchen Suite',
            image: ai('MODULAR KITCHEN/mk10.webp'),
            imageAlt: 'Modular kitchen concept with quartz countertops and intelligent storage, C-Scheme, Jaipur',
            style: 'Modern',
            area: '180 sq ft',
            location: 'C-Scheme, Jaipur',
            completionTime: '18 Days',
          },
          {
            title: 'The Vaishali Nagar Residence',
            image: ai('LIVING BEDROOM DESIGNS/lr4.webp'),
            imageAlt: 'Grand living room concept with custom millwork, Vaishali Nagar, Jaipur',
            style: 'Contemporary',
            area: '2,400 sq ft',
            location: 'Vaishali Nagar, Jaipur',
            completionTime: '52 Days',
          },
          {
            title: 'Jagatpura Family Home',
            image: real('MASTER BEDROOM DESIGN/Rishabh ji final render 02.webp'),
            imageAlt: 'Full family home bedroom, Jagatpura, Jaipur',
            style: 'Contemporary',
            area: '1,950 sq ft',
            location: 'Jagatpura, Jaipur',
            completionTime: '45 Days',
          },
        ],
      },
    ],
    ctaLabel: 'View Complete Portfolio',
    ctaHref: '/portfolio',
  },

  materials: {
    eyebrow: 'The Material Library',
    title: 'Finishes Worth',
    titleItalic: 'Living With',
    description:
      'Every full-home project draws from the same curated library — nothing generic, nothing rushed.',
    categories: [
      {
        label: 'Wood',
        items: [
          { name: 'Natural Teak Veneer', image: real('LIVING ROOM DESIGN/Karamveer ji G.F. A01_View070000.webp'), imageAlt: 'Natural teak veneer panelling in a living room', description: 'Warm, grain-rich panelling for feature walls and built-in joinery.' },
          { name: 'Smoked Oak Flooring', image: ai('LIVING BEDROOM DESIGNS/lr7.webp'), imageAlt: 'Smoked oak engineered flooring concept', description: 'Engineered oak with a deep smoked finish, underfoot in every living space.' },
          { name: 'Walnut Cabinetry', image: ai('WARDROBE DESIGN/wd2.webp'), imageAlt: 'Dark walnut wardrobe cabinetry concept', description: 'Dense, dark-grained walnut for wardrobes and statement storage walls.' },
        ],
      },
      {
        label: 'Stone',
        items: [
          { name: 'Italian Marble', image: ai('LIVING BEDROOM DESIGNS/lr5.webp'), imageAlt: 'Italian marble flooring concept in a living room', description: 'Book-matched Italian marble for floors, foyers and feature walls.' },
          { name: 'Quartz Countertops', image: ai('MODULAR KITCHEN/mk2.webp'), imageAlt: 'Quartz kitchen countertops concept', description: 'Engineered quartz surfaces, stain-resistant and seamlessly veined.' },
          { name: 'Travertine Cladding', image: real('BATHROOM DESIGN/Rishabh ji Master Bedroom A05.webp'), imageAlt: 'Travertine stone cladding', description: 'Honed travertine cladding for an understated, textured backdrop.' },
        ],
      },
      {
        label: 'Fabric',
        items: [
          { name: 'Linen Upholstery', image: ai('MASTER BEDROOM DESIGNS/mb4.webp'), imageAlt: 'Linen upholstered bedroom furniture concept', description: 'Breathable linen upholstery for sofas, headboards and soft seating.' },
          { name: 'Velvet Drapery', image: ai('LIVING BEDROOM DESIGNS/lr8.webp'), imageAlt: 'Velvet drapery concept in a living room', description: 'Heavyweight velvet drapery that frames every window in soft light.' },
          { name: 'Wool Blend Rugs', image: ai('DINING ROOM DESIGN/dr3.webp'), imageAlt: 'Wool blend area rug concept', description: 'Hand-finished wool blend rugs, layered for warmth and texture.' },
        ],
      },
      {
        label: 'Hardware',
        items: [
          { name: 'Brushed Brass Fittings', image: ai('WARDROBE DESIGN/wd3.webp'), imageAlt: 'Brushed brass cabinet hardware concept', description: 'Soft-close brushed brass handles and hinges on every cabinet.' },
          { name: 'Matte Black Profiles', image: ai('MODULAR KITCHEN/mk3.webp'), imageAlt: 'Matte black hardware profiles concept', description: 'Slim matte black profile handles for a quiet, modern edge.' },
          { name: 'German-Grade Channels', image: ai('WARDROBE DESIGN/wd4.webp'), imageAlt: 'German-grade drawer channel hardware concept', description: 'Soft-close drawer and wardrobe channels rated for a lifetime of use.' },
        ],
      },
      {
        label: 'Lighting',
        items: [
          { name: 'Layered Ambient Lighting', image: real('LIVING ROOM DESIGN/Krish ji S.F. A01_View150000.webp'), imageAlt: 'Layered ambient lighting in a living room', description: 'Cove, task and accent layers tuned for every hour of the day.' },
          { name: 'Statement Pendants', image: ai('DINING ROOM DESIGN/dr4.webp'), imageAlt: 'Statement pendant lighting fixture concept', description: 'Sculptural pendant fixtures as the anchor point of every room.' },
          { name: 'Smart Scene Control', image: ai('LIVING BEDROOM DESIGNS/lr9.webp'), imageAlt: 'Smart home lighting scene control concept', description: 'App and voice-controlled scenes across every fitted light.' },
        ],
      },
      {
        label: 'Luxury Finishes',
        items: [
          { name: 'Lacquered Surfaces', image: ai('TV UNIT DESIGN/tv2.webp'), imageAlt: 'High-gloss lacquered surface finish concept', description: 'High-gloss lacquer finishes for a flawless, reflective surface.' },
          { name: 'Textured Wall Plaster', image: ai('BATHROOM DESIGN/bd2.webp'), imageAlt: 'Textured decorative wall plaster finish concept', description: 'Hand-applied decorative plaster for depth without pattern.' },
          { name: 'Metallic Inlays', image: real('OFFICES BY LUXORA/ASHRIT JI B_View120000.webp'), imageAlt: 'Metallic inlay detailing on furniture', description: 'Fine metallic inlay detailing on furniture edges and thresholds.' },
        ],
      },
    ],
  },

  costEstimator: {
    eyebrow: 'Quick Estimate',
    title: 'What Would Your',
    titleItalic: 'Home Cost?',
    description: 'A directional estimate in seconds — your exact quote follows a free site visit.',
    areaOptions: [
      { label: '<1,000 sq ft', value: '900', multiplier: 1 },
      { label: '1,000–2,000 sq ft', value: '1500', multiplier: 1 },
      { label: '2,000–3,000 sq ft', value: '2500', multiplier: 1 },
      { label: '3,000+ sq ft', value: '3500', multiplier: 1 },
    ],
    packageOptions: [
      { label: 'Essential', value: 'essential', multiplier: 1 },
      { label: 'Signature', value: 'signature', multiplier: 1.45 },
      { label: 'Bespoke', value: 'bespoke', multiplier: 2.1 },
    ],
    baseRatePerSqFt: 1800,
    disclaimer: 'Final quote after a free, no-obligation site visit.',
    ctaLabel: 'Get Detailed Estimate',
    ctaHref: luxoraPriceCalculatorUrl,
  },

  pricing: {
    eyebrow: 'Investment',
    title: 'Packages Built',
    titleItalic: 'Around You',
    description: 'Three considered starting points — every project is tailored from there.',
    tiers: [
      {
        name: 'Essential',
        tagline: 'For The Considered Home',
        priceRange: '₹18L – ₹32L',
        description: 'A complete, well-finished home using our curated standard material palette.',
        features: [
          { label: 'Full design & 3D presentation', included: true },
          { label: 'Standard material palette', included: true },
          { label: 'Single project manager', included: true },
          { label: '10-year structural warranty', included: true },
          { label: 'Premium & luxury finish access', included: false },
          { label: 'Dedicated styling consultant', included: false },
        ],
        ctaLabel: 'Start With Essential',
        ctaHref: '#consultation',
      },
      {
        name: 'Signature',
        tagline: "Luxora's Most Loved",
        priceRange: '₹32L – ₹55L',
        description: 'Our most popular package — premium materials, richer detailing, faster turnaround.',
        features: [
          { label: 'Full design & 3D presentation', included: true },
          { label: 'Premium material palette', included: true },
          { label: 'Single project manager', included: true },
          { label: '10-year structural warranty', included: true },
          { label: 'Premium & luxury finish access', included: true },
          { label: 'Dedicated styling consultant', included: false },
        ],
        ctaLabel: 'Choose Signature',
        ctaHref: '#consultation',
        highlighted: true,
      },
      {
        name: 'Bespoke',
        tagline: 'Without Compromise',
        priceRange: '₹55L+',
        description: 'Fully custom millwork, rare materials, and a dedicated stylist for every room.',
        features: [
          { label: 'Full design & 3D presentation', included: true },
          { label: 'Luxury & imported material palette', included: true },
          { label: 'Single project manager', included: true },
          { label: '10-year structural warranty', included: true },
          { label: 'Premium & luxury finish access', included: true },
          { label: 'Dedicated styling consultant', included: true },
        ],
        ctaLabel: 'Design Bespoke',
        ctaHref: '#consultation',
      },
    ],
  },

  faq: {
    eyebrow: 'Questions',
    title: 'Before You',
    titleItalic: 'Begin',
    description: 'The questions every homeowner asks before starting a full-home project.',
    items: [
      {
        question: 'How long does a full home interior project take?',
        answer:
          'Most full-home projects complete in 45–60 days from final design sign-off, depending on carpet area and the package tier chosen. Your exact timeline is confirmed after the site visit.',
      },
      {
        question: 'Do I need to move out during the renovation?',
        answer:
          'For full-home projects, we recommend relocating temporarily — it allows our team to work across every room in parallel, which is how we keep timelines tight. We can phase the work room-by-room if relocation isn’t possible.',
      },
      {
        question: 'Is the quoted price truly final?',
        answer:
          'Yes. Once your design and material selections are signed off, the quote is locked — no surprise add-ons. Any change you request afterward is quoted separately, upfront, before any work begins.',
      },
      {
        question: 'What happens if I’m unhappy with part of the work?',
        answer:
          'Every room passes a 150-point quality checklist before handover. If anything falls short, it’s corrected at no extra cost — and the 10-year structural warranty covers you well beyond move-in.',
      },
      {
        question: 'Can I make changes once execution has started?',
        answer:
          'Minor changes are usually possible and will be quoted transparently. Major layout changes after execution has started can affect both timeline and cost, so we recommend finalising layout at the design stage.',
      },
    ],
  },

  relatedProjects: {
    eyebrow: 'Completed Work',
    title: 'Real Homes,',
    titleItalic: 'Recently Delivered',
    description: 'A glimpse at full-home projects handed over in the last few months.',
    projects: [
      { title: 'The Krish Residence', location: 'Malviya Nagar, Jaipur', image: real('LIVING ROOM DESIGN/Krish ji S.F. A01_View130000.webp'), imageAlt: 'Completed living room, Krish Residence, Jaipur', area: 'Multi-storey, 4BHK+', duration: '10–12 Weeks' },
      { title: 'Vizora House', location: 'C-Scheme, Jaipur', image: real('LIVING ROOM DESIGN/Vizora House G.F. A01_View020000.webp'), imageAlt: 'Completed living room, Vizora House, Jaipur', area: 'Ground + First Floor', duration: '8–10 Weeks' },
      { title: 'The Rishabh Residence', location: 'Vaishali Nagar, Jaipur', image: real('MASTER BEDROOM DESIGN/Rishabh ji final render 01.webp'), imageAlt: 'Completed master bedroom, Rishabh Residence, Jaipur', area: '3BHK+', duration: '8–10 Weeks' },
    ],
    ctaLabel: 'View All Projects',
    ctaHref: '/portfolio',
  },

  testimonials: {
    eyebrow: 'Client Stories',
    title: 'Real Homes,',
    titleItalic: 'Real Voices',
    description: 'In their own words — what it’s like to renovate an entire home with Luxora.',
    testimonials: [
      {
        name: 'Aditi & Rohan Mehta',
        location: 'Vaishali Nagar, Jaipur',
        quote: 'Every room feels like it belongs to the same home — and to us. We never once dealt with more than one point of contact.',
        image: ai('LIVING BEDROOM DESIGNS/lr10.webp'),
        imageAlt: 'A living room, styled after a full-home renovation',
      },
      {
        name: 'Priya Reddy',
        location: 'Civil Lines, Jaipur',
        quote: 'The 3D renders matched the finished villa almost exactly. No surprises, no delays — just the home we designed on paper.',
        image: real('FOYER DESIGN/krish ji entrance+kitchen+dining area A01_View010100 lux.webp'),
        imageAlt: 'A villa foyer, styled after a full-home renovation',
      },
      {
        name: 'Karthik Iyer',
        location: 'Jagatpura, Jaipur',
        quote: 'We moved in on the exact date we were promised, 45 days after sign-off. That kind of certainty is rare in this industry.',
        image: real('MASTER BEDROOM DESIGN/Vizora House F.F. A01_View180000_View03000.webp'),
        imageAlt: 'A bedroom, styled after a full-home renovation',
      },
    ],
  },

  relatedServices: {
    eyebrow: 'Explore More',
    title: 'Other Ways',
    titleItalic: 'We Can Help',
    description: 'Full Home Interiors pairs naturally with these services.',
    services: [
      { number: '01', title: 'Modular Kitchens', description: 'Bespoke modular kitchens with German-grade fittings and premium finishes.', href: '/services/modular-kitchen-design' },
      { number: '02', title: 'Designer Wardrobes', description: 'Smart storage solutions that combine elegance with everyday practicality.', href: '/services/wardrobe-design' },
      { number: '03', title: 'Living Room Design', description: 'Custom living rooms built around how you actually live, not a showroom display.', href: '/services/living-room-interior-design' },
      { number: '04', title: 'Commercial & Office Interiors', description: 'Brand-driven workspaces and retail environments that inspire identity.', href: '/services/commercial-office-interior-design' },
    ],
  },

  finalCta: {
    eyebrow: 'Start Your Journey',
    title: 'Ready To Begin',
    titleItalic: 'Your Interior Journey?',
    description: 'Book a free site visit and consultation — no obligation, no pressure, just a clear plan for your home.',
    image: real('LIVING ROOM DESIGN/Vizora House G.F. A01_View030000.webp'),
    imageAlt: 'Fully styled luxury living room, ready for handover',
  },
};
