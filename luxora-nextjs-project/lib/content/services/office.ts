import type { ServiceLiteData } from './serviceLiteTypes';

function p(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
function img(path: string, alt: string) {
  return { url: p(`/img/PROJECT BASED/${path}`), alt };
}

export const officeService: ServiceLiteData = {
  slug: 'commercial-office-interior-design',
  categorySlug: 'office',
  title: 'Commercial & Office Interiors',
  titleItalic: 'Workspaces That Earn Trust on Sight',
  eyebrow: 'Office Interiors',
  heroImage: img('OFFICES BY LUXORA/Bansal ji office A01_View010000.webp', 'Office interior designed by Luxora, Jaipur'),
  overview:
    "Your office is the first physical proof of your business a client or candidate ever sees. We design reception, workstations and meeting rooms as one brand-consistent experience — not a furniture order.",
  overviewBullets: [
    'Reception and meeting rooms designed to make the right first impression',
    'Open workstation layouts planned for headcount and acoustics',
    'A single accent material carried through every zone for brand consistency',
    'Practical, low-maintenance finishes for daily commercial use',
  ],
  process: [
    { number: '01', title: 'Brand & Space Brief', description: "We understand your team size, workflow and brand identity." },
    { number: '02', title: 'Layout & 3D', description: 'Reception, workstations and meeting rooms planned as one flow.' },
    { number: '03', title: 'Material Selection', description: 'Finishes chosen for durability under daily commercial use.' },
    { number: '04', title: 'Fit-Out', description: 'Our team executes the full fit-out with minimal disruption to your business.' },
    { number: '05', title: 'Handover', description: 'A final walkthrough with your team before you move in.' },
  ],
  gallery: [
    img('OFFICES BY LUXORA/Bansal ji office A01_View020000.webp', 'Office workstation area, Jaipur'),
    img('OFFICES BY LUXORA/Bansal ji office A01_View030000.webp', 'Office meeting room, Jaipur'),
    img('OFFICES BY LUXORA/Bansal ji office A01_View040000.webp', "Office director's room, Jaipur"),
    img('OFFICES BY LUXORA/ASHRIT JI B_View050000.webp', 'Office breakout area, Jaipur'),
    img('OFFICES BY LUXORA/ASHRIT JI B_View060000.webp', 'Office workstation detail, Jaipur'),
    img('OFFICES BY LUXORA/ASHRIT JI B_View070000.webp', 'Office meeting room detail, Jaipur'),
    img('OFFICES BY LUXORA/ASHRIT JI B_View080000.webp', 'Office reception detail, Jaipur'),
    img('OFFICES BY LUXORA/Eat Better A01_View200000_View030000.webp', 'Commercial interior, Jaipur'),
  ],
  relatedPortfolioSlugs: ['ashrit-corporate-studio'],
  faq: [
    { question: 'Do you design retail and F&B spaces too, not just offices?', answer: 'Yes — our commercial work spans offices, studios and food & beverage spaces with the same design-and-build process.' },
    { question: 'Can you work around our existing lease timelines?', answer: 'Yes — we plan the fit-out schedule against your possession and move-in dates from the first meeting.' },
    { question: 'How long does a full office fit-out take?', answer: 'A full office fit-out is typically delivered in 6–8 weeks depending on scale.' },
  ],
};
