import type { PortfolioProject } from './types';

/**
 * Encodes each path segment of a `public/img/...` asset so filenames with
 * spaces, ampersands etc. resolve correctly as a URL, without having to
 * rename ~250 real production files on disk.
 */
function p(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}

function img(path: string, alt: string) {
  return { url: p(`/img/PROJECT BASED/${path}`), alt };
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'krish-ji-residence',
    title: 'The Krish Residence',
    category: 'Full Home',
    heroImage: img('LIVING ROOM DESIGN/Krish ji S.F. A01_View120000.webp', 'Living room of the Krish Residence, a full-home renovation in Jaipur'),
    overview:
      'A multi-storey family home reimagined room by room — living and dining, three bedrooms, a home mandir, and every bathroom and wardrobe carried under one considered material language.',
    facts: {
      location: 'Malviya Nagar, Jaipur',
      propertyType: 'Independent House',
      area: 'Multi-storey, 4BHK+',
      investmentRange: '₹45L – ₹65L (typical for this scope)',
      duration: '10–12 weeks (typical for full-home scope)',
      rooms: ['Living & Dining', 'Master Bedroom', "Kids' Bedrooms", 'Modular Kitchen', 'Wardrobes', 'Bathrooms', 'Pooja Room', 'Foyer'],
    },
    story: [
      'The Krish family came to us with a home that had grown room by room over the years, with no single thread tying it together. The brief was to fix that without a full teardown — to bring one material language to a living room, three bedrooms, a kitchen and a home mandir spread across multiple floors.',
      'We anchored the ground floor around a single entrance-to-dining sightline, letting the foyer, kitchen and dining area read as one continuous space rather than three separate rooms. Warm wood tones and a restrained palette carry through every bedroom, so the design never resets from floor to floor.',
      "Every bathroom and wardrobe on the project was custom-built to the room's exact footprint rather than fitted from a catalogue — the kind of detail that shows up only after you've lived with a space for a few months.",
    ],
    gallery: [
      img('LIVING ROOM DESIGN/Krish ji S.F. A01_View130000.webp', 'Living room seating area, Krish Residence, Jaipur'),
      img('MASTER BEDROOM DESIGN/Krish ji M.Bedroom A01_View010000.webp', 'Master bedroom, Krish Residence, Jaipur'),
      img('MODULAR KITCHEN/Krish ji C01_View010000.webp', 'Modular kitchen, Krish Residence, Jaipur'),
      img('KIDS BEDROOM DESIGN/Krish ji Girls bedroom A01.webp', "Kids' bedroom, Krish Residence, Jaipur"),
      img('WARDROBE DESIGN/Krish ji Dressing A01_View010000.webp', 'Walk-in wardrobe, Krish Residence, Jaipur'),
      img('POOJA ROOM DESIGN/Krish ji f.f. mandir A01.webp', 'Home mandir, Krish Residence, Jaipur'),
      img('FOYER DESIGN/krish ji entrance+kitchen+dining area A01_View010100 lux.webp', 'Entrance foyer, Krish Residence, Jaipur'),
      img('BATHROOM DESIGN/Krish ji Dressing A01_View050000.webp', 'Bathroom, Krish Residence, Jaipur'),
      img('TV UNIT DESIGN/Krish ji Third floor A01_View020000.webp', 'TV unit wall, third floor, Krish Residence, Jaipur'),
      img('DINING ROOM DESIGN/krish ji entrance+kitchen+dining area A01_View040100.webp', 'Dining area, Krish Residence, Jaipur'),
      img('BALCONY DESIGN/Krish ji S.F. Bathrooms A01_View160042.webp', 'Balcony, Krish Residence, Jaipur'),
      img('MASTER BEDROOM DESIGN/Krish ji Third floor A01_View010000.webp', 'Third-floor bedroom, Krish Residence, Jaipur'),
    ],
    publishedAt: '2026-04-10',
  },
  {
    slug: 'rishabh-ji-residence',
    title: 'The Rishabh Residence',
    category: 'Full Home',
    heroImage: img('MASTER BEDROOM DESIGN/Rishabh ji final render 01.webp', 'Master bedroom of the Rishabh Residence, Jaipur'),
    overview:
      "A family home built around three generations under one roof — a master suite, a daughter's room and dressing, a mother's bedroom, and a kitchen designed for a household that cooks together.",
    facts: {
      location: 'Vaishali Nagar, Jaipur',
      propertyType: 'Independent House',
      area: '3BHK+, multi-generational layout',
      investmentRange: '₹30L – ₹45L (typical for this scope)',
      duration: '8–10 weeks (typical for full-home scope)',
      rooms: ['Master Bedroom', "Daughter's Bedroom", "Mother's Bedroom", 'Modular Kitchen', 'Dining Room', 'Pooja Room', 'Wardrobes'],
    },
    story: [
      "Designing for three generations in one home means no single room can be designed in isolation — a mother's bedroom needs a different quietness than a daughter's, and the kitchen has to work for a household that actually cooks together daily, not just entertains.",
      'We gave each bedroom its own distinct material mood while keeping the same joinery language and hardware throughout, so the home reads as considered rather than mismatched. The kitchen was planned around a single working triangle with dedicated space for two people to cook at once.',
      "The daughter's bedroom and dressing area became the most personal room in the house — a custom wardrobe wall with a dedicated vanity nook, built into a footprint that a standard modular system simply couldn't have filled cleanly.",
    ],
    gallery: [
      img('MASTER BEDROOM DESIGN/Rishabh ji final render 02.webp', 'Master bedroom detail, Rishabh Residence, Jaipur'),
      img('MODULAR KITCHEN/Rishabh ji kitchen E01.webp', 'Modular kitchen, Rishabh Residence, Jaipur'),
      img('KIDS BEDROOM DESIGN/Rishabh ji final render 07.webp', "Daughter's bedroom, Rishabh Residence, Jaipur"),
      img('WARDROBE DESIGN/Rishabh ji Doughter bedroom dressing A01.webp', 'Dressing area, Rishabh Residence, Jaipur'),
      img('BATHROOM DESIGN/Rishabh ji Mothers bedroom A05.webp', "Mother's bedroom ensuite, Rishabh Residence, Jaipur"),
      img('DINING ROOM DESIGN/Rishabh ji  final 20-5-2025 A01_View110078.webp', 'Dining room, Rishabh Residence, Jaipur'),
      img('POOJA ROOM DESIGN/Rishabh ji final render 20.webp', 'Pooja room, Rishabh Residence, Jaipur'),
      img('BATHROOM DESIGN/Rishabh ji Doughter bedroom bathroom B01.webp', "Daughter's bathroom, Rishabh Residence, Jaipur"),
    ],
    publishedAt: '2026-03-02',
  },
  {
    slug: 'vizora-house',
    title: 'Vizora House',
    category: 'Full Home',
    heroImage: img('LIVING ROOM DESIGN/Vizora House G.F. A01_View010000.webp', 'Living room of Vizora House, Jaipur'),
    overview:
      'A ground-and-first-floor home designed as one continuous story — an open living and kitchen ground floor, and a first-floor master suite built for total privacy.',
    facts: {
      location: 'C-Scheme, Jaipur',
      propertyType: 'Independent House, G+1',
      area: 'Ground + First Floor',
      investmentRange: '₹35L – ₹50L (typical for this scope)',
      duration: '8–10 weeks (typical for full-home scope)',
      rooms: ['Living Room', 'Modular Kitchen', 'Master Bedroom', 'Wardrobe', 'Foyer', 'TV Unit'],
    },
    story: [
      'Vizora House came with a straightforward but demanding brief: the ground floor had to work as a genuinely open living-and-entertaining space, while the first floor needed to feel completely separate — a private retreat once you climbed the stairs.',
      'On the ground floor, we planned the living room, kitchen and entrance as one sightline, using a single flooring and ceiling language to blur the boundary between them without losing distinct zones for each function.',
      "The first-floor master suite was treated as its own smaller project — a dedicated wardrobe wall, a considered TV unit placement, and a palette a shade warmer than the ground floor's to signal the shift from shared to private space.",
    ],
    gallery: [
      img('LIVING ROOM DESIGN/Vizora House G.F. A01_View020000.webp', 'Living room seating, Vizora House, Jaipur'),
      img('MODULAR KITCHEN/Vizora House G.F. A01_View030000.webp', 'Modular kitchen, Vizora House, Jaipur'),
      img('MASTER BEDROOM DESIGN/Vizora House F.F. A01_View180000_View02000.webp', 'First-floor master bedroom, Vizora House, Jaipur'),
      img('WARDROBE DESIGN/Vizora House F.F. A01_View180000_View01000.webp', 'Master wardrobe wall, Vizora House, Jaipur'),
      img('TV UNIT DESIGN/Vizora House G.F. A01_View020000.webp', 'Ground-floor TV unit, Vizora House, Jaipur'),
      img('FOYER DESIGN/Vizora House G.F. A01_View130000.webp', 'Entrance foyer, Vizora House, Jaipur'),
      img('MASTER BEDROOM DESIGN/Vizora House G.F. A01_View070000.webp', 'Ground-floor bedroom, Vizora House, Jaipur'),
    ],
    publishedAt: '2026-01-18',
  },
  {
    slug: 'ashrit-corporate-studio',
    title: 'Ashrit Corporate Studio',
    category: 'Office Interior',
    heroImage: img('OFFICES BY LUXORA/ASHRIT JI B_View010000.webp', 'Reception area, Ashrit Corporate Studio, Jaipur'),
    overview:
      'A brand-forward workspace designed to make the right first impression — a considered reception, open workstations, and private meeting rooms under one identity-driven material language.',
    facts: {
      location: 'Ajmer Road, Jaipur',
      propertyType: 'Commercial Office',
      area: 'Full office fit-out',
      investmentRange: '₹25L – ₹40L (typical for this scope)',
      duration: '6–8 weeks (typical for office fit-out scope)',
      rooms: ['Reception', 'Open Workstations', 'Meeting Rooms', "Director's Office", 'Breakout Area'],
    },
    story: [
      'Ashrit\'s brief was simple to state and hard to deliver: the office needed to look and feel like a company that clients would trust on sight, without the budget of a flagship corporate headquarters.',
      "We concentrated the visual impact at the reception and the director's office — the two spaces every visitor and every important meeting actually passes through — and kept the open workstation area efficient, bright and low-maintenance.",
      'A single accent material, repeated from the reception desk through to the meeting room panelling, ties the whole studio together without needing an expensive material palette across every square foot.',
    ],
    gallery: [
      img('OFFICES BY LUXORA/ASHRIT JI B_View020000.webp', 'Open workstation area, Ashrit Corporate Studio, Jaipur'),
      img('OFFICES BY LUXORA/ASHRIT JI B_View030000.webp', 'Meeting room, Ashrit Corporate Studio, Jaipur'),
      img('OFFICES BY LUXORA/ASHRIT JI B_View040000.webp', "Director's office, Ashrit Corporate Studio, Jaipur"),
      img('OFFICES BY LUXORA/ASHRIT JI B_View050000.webp', 'Breakout area, Ashrit Corporate Studio, Jaipur'),
      img('OFFICES BY LUXORA/ASHRIT JI B_View060000.webp', 'Workstation detail, Ashrit Corporate Studio, Jaipur'),
      img('OFFICES BY LUXORA/ASHRIT JI B_View070000.webp', 'Meeting room detail, Ashrit Corporate Studio, Jaipur'),
      img('OFFICES BY LUXORA/ASHRIT JI B_View080000.webp', 'Reception detail, Ashrit Corporate Studio, Jaipur'),
    ],
    publishedAt: '2025-12-05',
  },
  {
    slug: 'rakesh-ji-residence',
    title: 'The Rakesh Residence',
    category: 'Full Home',
    heroImage: img('LIVING ROOM DESIGN/Rakesh ji living A01_View010000.webp', 'Living room of the Rakesh Residence, Jaipur'),
    overview:
      'A ground-floor family home reimagined as one continuous flow — foyer, living, dining and kitchen carried under a single warm material language, with a dedicated pooja room and balcony finished to the same standard.',
    facts: {
      location: 'Mansarovar, Jaipur',
      propertyType: 'Independent House',
      area: '4BHK, full ground-floor scope',
      investmentRange: '₹28L – ₹42L (typical for this scope)',
      duration: '8–9 weeks (typical for full-home scope)',
      rooms: ['Foyer', 'Living Room', 'Dining Room', 'Modular Kitchen', 'Pooja Room', 'Balcony'],
    },
    story: [
      "The Rakesh family wanted their ground floor to feel like one considered space rather than a corridor of separate rooms — the brief started at the front door and didn't stop until the kitchen.",
      'We treated the foyer, living and dining areas as a single sightline, using consistent flooring and a restrained palette so the eye moves through the home without a visual reset at each threshold. The modular kitchen was planned to open onto this flow rather than sit apart from it.',
      'A dedicated pooja room was given its own quieter materiality, set slightly apart from the day-to-day rooms, while the balcony and dressing areas were finished with the same attention as the more visible spaces.',
    ],
    gallery: [
      img('FOYER DESIGN/Rakesh ji living A01_View040000.webp', 'Foyer, Rakesh Residence, Jaipur'),
      img('MODULAR KITCHEN/Rakesh ji living A01_View060000.webp', 'Modular kitchen, Rakesh Residence, Jaipur'),
      img('MODULAR KITCHEN/Rakesh ji living A01_View070000.webp', 'Modular kitchen detail, Rakesh Residence, Jaipur'),
      img('MODULAR KITCHEN/Rakesh ji living A01_View080000.webp', 'Kitchen counter, Rakesh Residence, Jaipur'),
      img('DINING ROOM DESIGN/Rakesh ji living C01_View020000.webp', 'Dining area, Rakesh Residence, Jaipur'),
      img('DINING ROOM DESIGN/Rakesh ji living C01_View030000 lux.webp', 'Dining room detail, Rakesh Residence, Jaipur'),
      img('FOYER DESIGN/Rakesh ji living C01_View050000.webp', 'Entrance detail, Rakesh Residence, Jaipur'),
      img('FOYER DESIGN/Rakesh ji Maheshwari A01.webp', 'Foyer alcove, Rakesh Residence, Jaipur'),
      img('POOJA ROOM DESIGN/Rakesh ji Maheshwari A02.webp', 'Pooja room alcove, Rakesh Residence, Jaipur'),
      img('POOJA ROOM DESIGN/Rakesh ji Mandir .webp', 'Home mandir, Rakesh Residence, Jaipur'),
      img('LIVING ROOM DESIGN/Rakesh ji living A01_View090000.webp', 'Living room seating, Rakesh Residence, Jaipur'),
      img('BALCONY DESIGN/Rakesh ji Dressings_View030000.webp', 'Balcony, Rakesh Residence, Jaipur'),
      img('BALCONY DESIGN/Rakesh ji Dressings_View040000.webp', 'Balcony detail, Rakesh Residence, Jaipur'),
      img('BALCONY DESIGN/Rakesh ji Dressings_View050000.webp', 'Dressing area, Rakesh Residence, Jaipur'),
      img('BALCONY DESIGN/Rakesh ji Dressings_View060000.webp', 'Dressing area detail, Rakesh Residence, Jaipur'),
    ],
    publishedAt: '2025-06-14',
  },
  {
    slug: 'saurabh-jain-residence',
    title: 'The Saurabh Jain Residence',
    category: 'Home Interior',
    heroImage: img('LIVING ROOM DESIGN/Saurabh jain f.f. C01_View050100_View010025.webp', 'Living room of the Saurabh Jain Residence, Jaipur'),
    overview:
      'A first-floor living wing finished as a self-contained retreat — a considered living room, a home mandir, and balconies designed to be lived on, not just looked at.',
    facts: {
      location: 'Raja Park, Jaipur',
      propertyType: 'Apartment',
      area: 'First-floor living wing',
      investmentRange: '₹10L – ₹18L (typical for this scope)',
      duration: '3–4 weeks (typical for this scope)',
      rooms: ['Living Room', 'Balcony', 'Pooja Room', 'TV Unit'],
    },
    story: [
      'The brief for this first-floor wing was to make a compact living space feel generous — a family room, a small mandir and a run of balconies that all had to work together rather than as afterthoughts.',
      'We kept the living room palette light and let the TV unit wall anchor the space, while the balconies were treated as genuine extensions of the room rather than leftover outdoor space — finished with the same flooring and detailing carried through from inside.',
    ],
    gallery: [
      img('LIVING ROOM DESIGN/Saurabh jain f.f. C01_View050100_View020025.webp', 'Living room detail, Saurabh Jain Residence, Jaipur'),
      img('LIVING ROOM DESIGN/Saurabh jain f.f. C01_View050100_View030025.webp', 'Living room seating, Saurabh Jain Residence, Jaipur'),
      img('TV UNIT DESIGN/Saurabh jain f.f. B01_View150100.webp', 'TV unit wall, Saurabh Jain Residence, Jaipur'),
      img('POOJA ROOM DESIGN/Saurabh jain f.f. C01_View050100_View040025.webp', 'Home mandir, Saurabh Jain Residence, Jaipur'),
      img('POOJA ROOM DESIGN/Saurabh jain f.f. C01_View050100_View050025.webp', 'Mandir detail, Saurabh Jain Residence, Jaipur'),
      img('BALCONY DESIGN/Saurabh jain f.f. B01_View180100 .webp', 'Balcony, Saurabh Jain Residence, Jaipur'),
      img('BALCONY DESIGN/Saurabh jain f.f. B01_View180100.webp', 'Balcony seating, Saurabh Jain Residence, Jaipur'),
      img('BALCONY DESIGN/Saurabh jain f.f. C01_View050100_View120025.webp', 'Balcony view, Saurabh Jain Residence, Jaipur'),
      img('BALCONY DESIGN/Saurabh jain f.f. C01_View050100_View130025.webp', 'Balcony detail, Saurabh Jain Residence, Jaipur'),
      img('BALCONY DESIGN/Saurabh jain f.f. C01_View050100_View160025.webp', 'Balcony corner, Saurabh Jain Residence, Jaipur'),
    ],
    publishedAt: '2025-07-02',
  },
  {
    slug: 'ved-prakash-residence',
    title: 'The Ved Prakash Residence',
    category: 'Home Interior',
    heroImage: img('LIVING ROOM DESIGN/Ved Prakash Living dining B_View010000.webp', 'Living and dining room of the Ved Prakash Residence, Jaipur'),
    overview:
      "A living-and-dining space built for a young family, paired with a daughter's bedroom and a pair of balconies finished to match the rest of the home.",
    facts: {
      location: 'Bani Park, Jaipur',
      propertyType: 'Apartment',
      area: "Living & dining plus daughter's bedroom",
      investmentRange: '₹9L – ₹16L (typical for this scope)',
      duration: '3–4 weeks (typical for this scope)',
      rooms: ['Living & Dining', "Daughter's Bedroom", 'Balcony'],
    },
    story: [
      'The Ved Prakash family wanted a living and dining space that could flex between everyday family time and hosting guests, alongside a bedroom their daughter could genuinely call her own.',
      "The living-dining area was planned as one open zone with a clear seating side and a separate dining table, while the daughter's bedroom took a softer, more playful palette than the rest of the home — carried through to her private balcony.",
    ],
    gallery: [
      img('LIVING ROOM DESIGN/Ved Prakash Living dining B_View020000.webp', 'Dining area, Ved Prakash Residence, Jaipur'),
      img('LIVING ROOM DESIGN/Ved Prakash Living dining B_View030000.webp', 'Living room seating, Ved Prakash Residence, Jaipur'),
      img('LIVING ROOM DESIGN/Ved Prakash Living dining B_View040000.webp', 'Living and dining detail, Ved Prakash Residence, Jaipur'),
      img('LIVING ROOM DESIGN/Ved Prakash Living dining B_View050000.webp', 'Dining table, Ved Prakash Residence, Jaipur'),
      img('KIDS BEDROOM DESIGN/Ved Prakash Daughter room A_View010000.webp', "Daughter's bedroom, Ved Prakash Residence, Jaipur"),
      img('KIDS BEDROOM DESIGN/Ved Prakash Daughter room A_View020000.webp', "Daughter's bedroom detail, Ved Prakash Residence, Jaipur"),
      img('KIDS BEDROOM DESIGN/Ved Prakash Daughter room A_View030000.webp', "Daughter's bedroom study nook, Ved Prakash Residence, Jaipur"),
      img('KIDS BEDROOM DESIGN/Ved Prakash Daughter room A_View040000.webp', "Daughter's bedroom wardrobe, Ved Prakash Residence, Jaipur"),
      img('BALCONY DESIGN/Ved Prakash Daughter room Balcony A_View010000.webp', "Daughter's room balcony, Ved Prakash Residence, Jaipur"),
      img('BALCONY DESIGN/Ved Prakash Masterbedroom Balcony A_View01 .webp', 'Master bedroom balcony, Ved Prakash Residence, Jaipur'),
    ],
    publishedAt: '2025-07-20',
  },
  {
    slug: 'paritosh-ji-residence',
    title: 'The Paritosh Residence',
    category: 'Full Home',
    heroImage: img('LIVING ROOM DESIGN/Paritosh ji Living A01_View040000.webp', 'Living room of the Paritosh Residence, Jaipur'),
    overview:
      'A foyer-to-bedroom home design carried through one consistent language — an entrance that sets the tone, a living and dining space built for entertaining, and a master bedroom designed as a genuine retreat.',
    facts: {
      location: 'Jagatpura, Jaipur',
      propertyType: 'Independent House',
      area: '3BHK, foyer-to-bedroom scope',
      investmentRange: '₹22L – ₹35L (typical for this scope)',
      duration: '6–7 weeks (typical for this scope)',
      rooms: ['Foyer', 'Living Room', 'Dining Room', 'Master Bedroom'],
    },
    story: [
      "The Paritosh family's brief began at the entrance: the foyer had to set expectations for the rest of the home rather than function as a leftover passage.",
      'From there, the living and dining rooms were planned as a single entertaining zone, with a considered furniture layout that could flex for family evenings or guests. The master bedroom was treated as a separate, quieter chapter — a warmer palette and softer lighting than the shared spaces downstairs.',
    ],
    gallery: [
      img('LIVING ROOM DESIGN/Paritosh ji Living A01_View050000.webp', 'Living room detail, Paritosh Residence, Jaipur'),
      img('LIVING ROOM DESIGN/Paritosh ji Living A01_View120000.webp', 'Living room seating, Paritosh Residence, Jaipur'),
      img('FOYER DESIGN/Paritosh ji Living A01_View010000.webp', 'Entrance foyer, Paritosh Residence, Jaipur'),
      img('FOYER DESIGN/Paritosh ji Living A01_View020000.webp', 'Foyer detail, Paritosh Residence, Jaipur'),
      img('DINING ROOM DESIGN/Paritosh ji Living A01_View080000.webp', 'Dining room, Paritosh Residence, Jaipur'),
      img('DINING ROOM DESIGN/Paritosh ji Living A01_View090000.webp', 'Dining room detail, Paritosh Residence, Jaipur'),
      img('MASTER BEDROOM DESIGN/Paritosh ji bedroom B01_View090000.webp', 'Master bedroom, Paritosh Residence, Jaipur'),
      img('MASTER BEDROOM DESIGN/Paritosh ji bedroom B01_View100000.webp', 'Master bedroom detail, Paritosh Residence, Jaipur'),
      img('MASTER BEDROOM DESIGN/Paritosh ji bedroom B01_View110000.webp', 'Master bedroom seating nook, Paritosh Residence, Jaipur'),
    ],
    publishedAt: '2025-08-11',
  },
  {
    slug: 'balram-ji-residence',
    title: 'The Balram Residence',
    category: 'Master Suite',
    heroImage: img('MASTER BEDROOM DESIGN/Balram ji Bedroom A01.webp', 'Master bedroom of the Balram Residence, Jaipur'),
    overview:
      'A master bedroom and ensuite bathroom redesigned as one connected suite — a calmer palette in the bedroom, carried through into two dedicated bathrooms.',
    facts: {
      location: 'Vidhyadhar Nagar, Jaipur',
      propertyType: 'Apartment',
      area: 'Master bedroom + ensuite bathrooms',
      investmentRange: '₹8L – ₹14L (typical for this scope)',
      duration: '3 weeks (typical for this scope)',
      rooms: ['Master Bedroom', 'Bathroom'],
    },
    story: [
      "Balram ji's brief was focused: the master bedroom needed to feel like an actual retreat, and the two bathrooms attached to it had to match that same quieter mood rather than reading as purely functional spaces.",
      'We kept the bedroom palette warm and restrained, then carried the same material cues into both bathrooms — so moving between the two never feels like stepping into a different project.',
    ],
    gallery: [
      img('MASTER BEDROOM DESIGN/Balram ji Bedroom A02.webp', 'Master bedroom detail, Balram Residence, Jaipur'),
      img('MASTER BEDROOM DESIGN/Balram ji Bedroom A03.webp', 'Master bedroom seating, Balram Residence, Jaipur'),
      img('BATHROOM DESIGN/Balram ji Bedroom A05.webp', 'Bedroom detail, Balram Residence, Jaipur'),
      img('BATHROOM DESIGN/Balram ji Bedroom A06.webp', 'Bedroom corner, Balram Residence, Jaipur'),
      img('BATHROOM DESIGN/Balram ji Bathroom B01_View010000.webp', 'Ensuite bathroom, Balram Residence, Jaipur'),
      img('BATHROOM DESIGN/Balram ji Bathroom B01_View020000.webp', 'Bathroom detail, Balram Residence, Jaipur'),
      img('BATHROOM DESIGN/Balram ji Bathroom C01_View010000.webp', 'Second bathroom, Balram Residence, Jaipur'),
      img('BATHROOM DESIGN/Balram ji Bathroom C01_View020000.webp', 'Second bathroom detail, Balram Residence, Jaipur'),
    ],
    publishedAt: '2025-08-29',
  },
  {
    slug: 'hariom-ji-office',
    title: 'Hariom Corporate Office',
    category: 'Office Interior',
    heroImage: img('OFFICES BY LUXORA/Hariom ji office C01_View010000.webp', 'Reception area, Hariom Corporate Office, Jaipur'),
    overview:
      'A full office fit-out built around clear zones — open workstations, private cabins, and a small dedicated pooja corner for the team.',
    facts: {
      location: 'Tonk Road, Jaipur',
      propertyType: 'Commercial Office',
      area: 'Full office fit-out',
      investmentRange: '₹18L – ₹28L (typical for this scope)',
      duration: '5–6 weeks (typical for office fit-out scope)',
      rooms: ['Workstations', 'Cabins', 'Pooja Corner'],
    },
    story: [
      "Hariom ji's office needed to work for a growing team without losing the personal touches that mattered to the ownership — including a small pooja corner, a detail many commercial fit-outs skip entirely.",
      'We kept the open workstation area efficient and well-lit, reserved the cabins for a calmer, more private material palette, and gave the pooja corner its own quiet visual identity rather than treating it as an afterthought tucked into a corridor.',
    ],
    gallery: [
      img('OFFICES BY LUXORA/Hariom ji office C01_View020000.webp', 'Workstation area, Hariom Corporate Office, Jaipur'),
      img('OFFICES BY LUXORA/Hariom ji office C01_View030000.webp', 'Workstation detail, Hariom Corporate Office, Jaipur'),
      img('OFFICES BY LUXORA/Hariom ji office C01_View050000.webp', 'Cabin, Hariom Corporate Office, Jaipur'),
      img('OFFICES BY LUXORA/Hariom ji office C01_View060000.webp', 'Cabin detail, Hariom Corporate Office, Jaipur'),
      img('OFFICES BY LUXORA/Hariom ji office C01_View070000.webp', 'Corridor, Hariom Corporate Office, Jaipur'),
      img('OFFICES BY LUXORA/Hariom ji office C01_View080000.webp', 'Office detail, Hariom Corporate Office, Jaipur'),
      img('OFFICES BY LUXORA/Hariom ji office C01_View100000.webp', 'Reception detail, Hariom Corporate Office, Jaipur'),
      img('POOJA ROOM DESIGN/Hariom ji office A01_View090100.webp', 'Pooja corner, Hariom Corporate Office, Jaipur'),
    ],
    publishedAt: '2025-09-15',
  },
  {
    slug: 'khichar-residence',
    title: 'The Khichar Residence',
    category: 'Full Home',
    heroImage: img('MASTER BEDROOM DESIGN/Ajit ji khichar A01.webp', 'Master bedroom of the Khichar Residence, Jaipur'),
    overview:
      'A master bedroom, living room and modular kitchen brought under one warm, contemporary material language for the Khichar family.',
    facts: {
      location: 'Civil Lines, Jaipur',
      propertyType: 'Apartment',
      area: 'Master bedroom, living room & kitchen scope',
      investmentRange: '₹18L – ₹28L (typical for this scope)',
      duration: '5–6 weeks (typical for this scope)',
      rooms: ['Master Bedroom', 'Living Room', 'Modular Kitchen'],
    },
    story: [
      "Ajit ji's brief covered three of the most-used spaces in the home — the master bedroom, the living room, and the kitchen — with the instruction to keep all three feeling like they belonged to the same house.",
      'We used a shared warm-wood and matte-finish language across all three rooms, so the transition from bedroom to living room to kitchen never feels like three separate design decisions stitched together.',
    ],
    gallery: [
      img('MASTER BEDROOM DESIGN/Ajit ji khichar A02.webp', 'Master bedroom detail, Khichar Residence, Jaipur'),
      img('MASTER BEDROOM DESIGN/Ajit ji khichar A03.webp', 'Master bedroom seating, Khichar Residence, Jaipur'),
      img('MASTER BEDROOM DESIGN/Ajit ji khichar A04.webp', 'Master bedroom wardrobe wall, Khichar Residence, Jaipur'),
      img('LIVING ROOM DESIGN/Ajit ji khichar A08.webp', 'Living room, Khichar Residence, Jaipur'),
      img('LIVING ROOM DESIGN/Ajit ji khichar A09.webp', 'Living room detail, Khichar Residence, Jaipur'),
      img('LIVING ROOM DESIGN/Ajit ji khichar A10.webp', 'Living room seating, Khichar Residence, Jaipur'),
      img('MODULAR KITCHEN/Ajit ji khichar A07.webp', 'Modular kitchen, Khichar Residence, Jaipur'),
    ],
    publishedAt: '2025-10-03',
  },
  {
    slug: 'mohit-ji-residence',
    title: 'The Mohit Residence',
    category: 'Balcony & Dining Design',
    heroImage: img('BALCONY DESIGN/Mohit ji Bathroom and balcony A01_View010000.webp', 'Balcony of the Mohit Residence, Jaipur'),
    overview:
      'A focused renovation of the balcony, bathroom and dining areas — small spaces given the same design attention as a full home.',
    facts: {
      location: 'Shyam Nagar, Jaipur',
      propertyType: 'Apartment',
      area: 'Balcony, bathroom & dining renovation',
      investmentRange: '₹6L – ₹10L (typical for this scope)',
      duration: '2 weeks (typical for this scope)',
      rooms: ['Balcony', 'Bathroom', 'Dining Room'],
    },
    story: [
      "Not every project is a full home — Mohit ji's brief was to fix three specific spaces that weren't working: a cramped balcony, a dated bathroom, and a dining area with no real identity.",
      'We treated the balcony and bathroom as one connected renovation given they shared a wall, and gave the dining area a distinct, more social layout so it reads as a proper room rather than an extension of the living space.',
    ],
    gallery: [
      img('BALCONY DESIGN/Mohit ji Bathroom and balcony A01_View020000.webp', 'Balcony and bathroom, Mohit Residence, Jaipur'),
      img('BALCONY DESIGN/Mohit ji Bathroom and balcony A01_View030000.webp', 'Bathroom detail, Mohit Residence, Jaipur'),
      img('BALCONY DESIGN/Mohit ji Bathroom and balcony A01_View040000.webp', 'Balcony detail, Mohit Residence, Jaipur'),
      img('DINING ROOM DESIGN/Mohit ji Living and dining B01_View050000.webp', 'Dining area, Mohit Residence, Jaipur'),
      img('DINING ROOM DESIGN/Mohit ji Living and dining B01_View060000.webp', 'Dining area detail, Mohit Residence, Jaipur'),
    ],
    publishedAt: '2025-10-21',
  },
  {
    slug: 'karamveer-ji-residence',
    title: 'The Karamveer Residence',
    category: 'Living & Dining Design',
    heroImage: img('LIVING ROOM DESIGN/Karamveer ji G.F. A01_View070000.webp', 'Living room of the Karamveer Residence, Jaipur'),
    overview:
      'A ground-floor living and dining space redesigned as one open, entertaining-ready zone for the Karamveer family.',
    facts: {
      location: 'Jawahar Nagar, Jaipur',
      propertyType: 'Independent House',
      area: 'Living & dining scope',
      investmentRange: '₹9L – ₹15L (typical for this scope)',
      duration: '3 weeks (typical for this scope)',
      rooms: ['Living Room', 'Dining Room'],
    },
    story: [
      'The Karamveer family wanted their ground-floor living and dining area to work equally well for a quiet weeknight and a full house of guests.',
      'We opened up the sightline between the two rooms and used a single warm material palette across both, so the space reads as one considered zone rather than a living room with a dining table pushed into the corner.',
    ],
    gallery: [
      img('LIVING ROOM DESIGN/Karamveer ji G.F. A01_View080000.webp', 'Living room detail, Karamveer Residence, Jaipur'),
      img('LIVING ROOM DESIGN/Karamveer ji G.F. A01_View100000.webp', 'Living room seating, Karamveer Residence, Jaipur'),
      img('LIVING ROOM DESIGN/Karamveer ji G.F. A01_View110000.webp', 'Living room corner, Karamveer Residence, Jaipur'),
      img('DINING ROOM DESIGN/Karamveer ji G.F. A01_View090000.webp', 'Dining area, Karamveer Residence, Jaipur'),
      img('DINING ROOM DESIGN/Karamveer ji G.F. A01_View100000.webp', 'Dining area detail, Karamveer Residence, Jaipur'),
    ],
    publishedAt: '2025-11-08',
  },
  {
    slug: 'bansal-ji-office',
    title: 'Bansal Office Studio',
    category: 'Office Interior',
    heroImage: img('OFFICES BY LUXORA/Bansal ji office A01_View010000.webp', 'Reception area, Bansal Office Studio, Jaipur'),
    overview:
      'A compact office fit-out designed to feel considered from the reception desk to the last workstation, on a modest footprint.',
    facts: {
      location: 'Sanganer, Jaipur',
      propertyType: 'Commercial Office',
      area: 'Full office fit-out',
      investmentRange: '₹15L – ₹25L (typical for this scope)',
      duration: '4–5 weeks (typical for office fit-out scope)',
      rooms: ['Reception', 'Workstations', 'Cabins'],
    },
    story: [
      "Bansal ji's office didn't need a large footprint to make an impression — the brief was to make every square foot, from reception to the cabins, feel intentional.",
      'We concentrated the material budget at the reception and let a consistent, low-maintenance finish carry through the rest of the workstations and cabins, so the studio reads as considered rather than budget-constrained.',
    ],
    gallery: [
      img('OFFICES BY LUXORA/Bansal ji office A01_View020000.webp', 'Workstation area, Bansal Office Studio, Jaipur'),
      img('OFFICES BY LUXORA/Bansal ji office A01_View030000.webp', 'Cabin, Bansal Office Studio, Jaipur'),
      img('OFFICES BY LUXORA/Bansal ji office A01_View040000.webp', 'Office detail, Bansal Office Studio, Jaipur'),
      img('OFFICES BY LUXORA/Bansal ji office A01_View050000.webp', 'Reception detail, Bansal Office Studio, Jaipur'),
    ],
    publishedAt: '2025-11-26',
  },
  {
    slug: 'eat-better-office',
    title: 'Eat Better Office',
    category: 'Commercial Interior',
    heroImage: img('OFFICES BY LUXORA/Eat Better A01_View200000_View030000.webp', 'Reception area, Eat Better Office, Jaipur'),
    overview:
      "A brand-forward office fit-out for Eat Better, built around the client's identity — bright, efficient workstations and a welcoming breakout area.",
    facts: {
      location: 'Gopalpura Bypass, Jaipur',
      propertyType: 'Commercial Office',
      area: 'Café/office fit-out',
      investmentRange: '₹18L – ₹30L (typical for this scope)',
      duration: '5 weeks (typical for this scope)',
      rooms: ['Reception', 'Workstations', 'Breakout Area'],
    },
    story: [
      "Eat Better's brief was to translate a food-forward brand identity into a workplace that still felt professional to clients and partners walking through the door.",
      'We kept the reception and breakout area as the most expressive spaces, carrying the brand palette into finishes and signage, while the workstation area stayed clean and efficient to support daily operations.',
    ],
    gallery: [
      img('OFFICES BY LUXORA/Eat Better A01_View200000_View040000.webp', 'Workstation area, Eat Better Office, Jaipur'),
      img('OFFICES BY LUXORA/Eat Better A01_View200000_View210000.webp', 'Breakout area, Eat Better Office, Jaipur'),
      img('OFFICES BY LUXORA/Eat Better A01_View200000_View220000.webp', 'Office detail, Eat Better Office, Jaipur'),
      img('OFFICES BY LUXORA/Eat Better A01_View200000_View230000.webp', 'Reception detail, Eat Better Office, Jaipur'),
    ],
    publishedAt: '2025-12-20',
  },
  {
    slug: 'vikas-jain-residence',
    title: 'The Vikas Jain Residence',
    category: 'Master Bedroom & Pooja Room',
    heroImage: img('MASTER BEDROOM DESIGN/vikas ji jain B01_View010071.webp', 'Master bedroom of the Vikas Jain Residence, Jaipur'),
    overview:
      'A master bedroom and a dedicated pooja room designed together, so a quiet everyday retreat and a space for daily ritual share the same considered material language.',
    facts: {
      location: 'Jhotwara, Jaipur',
      propertyType: 'Apartment',
      area: 'Master bedroom + pooja room',
      investmentRange: '₹7L – ₹12L (typical for this scope)',
      duration: '2–3 weeks (typical for this scope)',
      rooms: ['Master Bedroom', 'Pooja Room'],
    },
    story: [
      'Vikas ji wanted his master bedroom to feel calm and uncluttered, and asked for a small pooja room nearby that carried the same sense of quiet rather than competing with it.',
      'We used a soft, warm palette in the bedroom and echoed it in the pooja room with subtler detailing, so moving between the two spaces feels like one continuous, peaceful sequence.',
    ],
    gallery: [
      img('MASTER BEDROOM DESIGN/vikas ji jain B01_View020071.webp', 'Master bedroom detail, Vikas Jain Residence, Jaipur'),
      img('MASTER BEDROOM DESIGN/vikas ji jain B01_View030071.webp', 'Master bedroom seating, Vikas Jain Residence, Jaipur'),
      img('POOJA ROOM DESIGN/vikas ji jain B01_View180071.webp', 'Pooja room, Vikas Jain Residence, Jaipur'),
    ],
    publishedAt: '2026-01-05',
  },
  {
    slug: 'ram-ji-kitchen',
    title: 'The Ram Ji Kitchen',
    category: 'Modular Kitchen',
    heroImage: img('MODULAR KITCHEN/Ram ji G.F. kitchen A01.webp', 'Modular kitchen, Ram Ji Residence, Jaipur'),
    overview:
      'A ground-floor modular kitchen and adjoining living TV unit, planned as one small but complete project.',
    facts: {
      location: 'Pratap Nagar, Jaipur',
      propertyType: 'Apartment',
      area: 'Modular kitchen + TV unit',
      investmentRange: '₹4L – ₹8L (typical for this scope)',
      duration: '2 weeks (typical for this scope)',
      rooms: ['Modular Kitchen', 'TV Unit'],
    },
    story: [
      "Ram ji's kitchen needed better storage and a cleaner countertop layout without a full renovation, and the adjoining living room's TV unit was refreshed to match the kitchen's updated palette.",
      'We focused the budget on intelligent storage and a durable countertop, keeping the material palette consistent with the TV unit wall just outside so the two spaces read as one small, cohesive update.',
    ],
    gallery: [
      img('MODULAR KITCHEN/Ram ji G.F. kitchen A02.webp', 'Modular kitchen detail, Ram Ji Residence, Jaipur'),
      img('MODULAR KITCHEN/Ram ji G.F. kitchen A03.webp', 'Kitchen counter, Ram Ji Residence, Jaipur'),
      img('TV UNIT DESIGN/Ram ji Living A01_View060100.webp', 'TV unit wall, Ram Ji Residence, Jaipur'),
    ],
    publishedAt: '2026-01-30',
  },
  {
    slug: 'gautam-ji-residence',
    title: 'The Gautam Residence',
    category: 'Wardrobe & TV Unit Design',
    heroImage: img('WARDROBE DESIGN/GAUTMA JI M. BEDROOM DRESSING A01.webp', 'Master bedroom wardrobe, Gautam Residence, Jaipur'),
    overview:
      "A master bedroom dressing wall and living TV unit, designed to bring one household's two most-used furniture pieces up to the same standard.",
    facts: {
      location: 'Sirsi Road, Jaipur',
      propertyType: 'Apartment',
      area: 'Wardrobe + TV unit',
      investmentRange: '₹3L – ₹6L (typical for this scope)',
      duration: '1–2 weeks (typical for this scope)',
      rooms: ['Wardrobe', 'TV Unit'],
    },
    story: [
      "Gautam ji's brief was narrow but specific: a proper walk-in-style dressing wall for the master bedroom, and a TV unit in the living room that matched the same material language.",
      'The wardrobe was planned around soft-close hardware and dedicated compartments rather than open shelving, while the TV unit picked up the same wood tone to tie the two rooms together.',
    ],
    gallery: [
      img('WARDROBE DESIGN/GAUTMA JI M. BEDROOM DRESSING A02.webp', 'Wardrobe detail, Gautam Residence, Jaipur'),
      img('WARDROBE DESIGN/GAUTMA JI M. BEDROOM DRESSING A03.webp', 'Dressing area, Gautam Residence, Jaipur'),
      img('TV UNIT DESIGN/Gautam ji B090000.webp', 'TV unit wall, Gautam Residence, Jaipur'),
    ],
    publishedAt: '2026-02-14',
  },
  {
    slug: 'dd-khandelwal-kitchen',
    title: 'The Khandelwal Kitchen',
    category: 'Modular Kitchen',
    heroImage: img('MODULAR KITCHEN/DD khandelwal kitchen A01.webp', 'Modular kitchen, Khandelwal Residence, Jaipur'),
    overview:
      'A compact modular kitchen upgrade focused on smarter storage and a cleaner working layout.',
    facts: {
      location: 'Mahesh Nagar, Jaipur',
      propertyType: 'Apartment',
      area: 'Modular kitchen only',
      investmentRange: '₹3.5L – ₹7L (typical for this scope)',
      duration: '1–2 weeks (typical for this scope)',
      rooms: ['Modular Kitchen'],
    },
    story: [
      'The Khandelwal family needed their kitchen to work harder within the same footprint — more usable storage, a cleaner countertop, and a layout that didn\'t fight the existing plumbing and electrical points.',
      'We prioritised a single efficient working triangle and finished the cabinetry in a durable, easy-to-maintain material suited to daily cooking rather than a purely showpiece kitchen.',
    ],
    gallery: [
      img('MODULAR KITCHEN/DD khandelwal kitchen A02.webp', 'Modular kitchen detail, Khandelwal Residence, Jaipur'),
      img('MODULAR KITCHEN/DD khandelwal kitchen A03.webp', 'Kitchen counter, Khandelwal Residence, Jaipur'),
    ],
    publishedAt: '2026-02-28',
  },
  {
    slug: 'ashutosh-ji-pooja-room',
    title: 'The Ashutosh Pooja Room',
    category: 'Pooja Room Design',
    heroImage: img('POOJA ROOM DESIGN/Ashutosh ji Bedroom C_View08 .webp', 'Pooja room, Ashutosh Residence, Jaipur'),
    overview:
      'A dedicated pooja room built into an existing bedroom footprint, designed as a quiet, self-contained space for daily ritual.',
    facts: {
      location: 'Durgapura, Jaipur',
      propertyType: 'Residence',
      area: 'Pooja room only',
      investmentRange: '₹1.5L – ₹3L (typical for this scope)',
      duration: '1 week (typical for this scope)',
      rooms: ['Pooja Room'],
    },
    story: [
      "Ashutosh ji wanted a proper pooja room carved out of an existing bedroom corner, rather than a shelf-mounted mandir — a small footprint given real architectural attention.",
    ],
    gallery: [],
    publishedAt: '2026-05-02',
  },
  {
    slug: 'jai-parkash-pooja-room',
    title: 'The Jai Parkash Pooja Room',
    category: 'Pooja Room Design',
    heroImage: img('POOJA ROOM DESIGN/jai parkash A01_View120000.webp', 'Pooja room, Jai Parkash Residence, Jaipur'),
    overview:
      'A compact home mandir designed as a calm focal point, finished with the same care as a full room.',
    facts: {
      location: 'Sodala, Jaipur',
      propertyType: 'Residence',
      area: 'Pooja room only',
      investmentRange: '₹1.5L – ₹3L (typical for this scope)',
      duration: '1 week (typical for this scope)',
      rooms: ['Pooja Room'],
    },
    story: [
      "Jai Parkash ji's brief was simple: a small, dedicated mandir space that felt considered rather than an afterthought squeezed into a landing or passage.",
    ],
    gallery: [],
    publishedAt: '2026-05-16',
  },
  {
    slug: 'rukamni-kunj-pooja-room',
    title: 'Rukamni Kunj Pooja Room',
    category: 'Pooja Room Design',
    heroImage: img('POOJA ROOM DESIGN/Rukamni kunj FF C_View010000_View110000.webp', 'Pooja room, Rukamni Kunj, Jaipur'),
    overview:
      'A first-floor home mandir at Rukamni Kunj, designed as a quiet, dedicated space within the existing home.',
    facts: {
      location: 'Shastri Nagar, Jaipur',
      propertyType: 'Independent House',
      area: 'Pooja room only',
      investmentRange: '₹1.5L – ₹3L (typical for this scope)',
      duration: '1 week (typical for this scope)',
      rooms: ['Pooja Room'],
    },
    story: [
      'The brief at Rukamni Kunj was to give the first floor a proper pooja room — a small, considered space finished to the same standard as the rest of the home rather than treated as a minor add-on.',
    ],
    gallery: [],
    publishedAt: '2026-05-30',
  },
];

export function getPortfolioProject(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

export function getRelatedPortfolioProjects(slug: string, count = 3): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.slug !== slug).slice(0, count);
}
