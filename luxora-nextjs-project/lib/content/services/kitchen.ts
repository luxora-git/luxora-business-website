import type { ServiceLiteData } from './serviceLiteTypes';

function p(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
function img(path: string, alt: string) {
  return { url: p(`/img/PROJECT BASED/${path}`), alt };
}

export const kitchenService: ServiceLiteData = {
  slug: 'modular-kitchen-design',
  categorySlug: 'kitchen',
  title: 'Modular Kitchen Design',
  titleItalic: 'Engineered for Daily Use',
  eyebrow: 'Modular Kitchens',
  heroImage: img('MODULAR KITCHEN/DD khandelwal kitchen A01.webp', 'Modular kitchen designed by Luxora, Jaipur'),
  overview:
    'A kitchen is used more than any other room in the house, which means it has to survive daily use without losing its finish. We plan the working triangle first, then build the storage and countertops around how you actually cook.',
  overviewBullets: [
    'German-grade hardware and soft-close fittings throughout',
    'Storage planned by what you actually store, not a generic layout',
    'Countertops and backsplashes chosen for daily wear, not just photos',
    'Concealed appliance garages to keep countertops clear',
  ],
  process: [
    { number: '01', title: 'Kitchen Audit', description: 'We map your cooking habits, appliances and storage needs.' },
    { number: '02', title: 'Layout & 3D', description: 'The working triangle is finalised before any material discussion.' },
    { number: '03', title: 'Material Selection', description: 'Countertop, cabinetry and hardware chosen together.' },
    { number: '04', title: 'Fabrication', description: 'Modules are built to precise measurements in our own facility.' },
    { number: '05', title: 'Install & Test', description: 'Every drawer, hinge and appliance is tested before handover.' },
  ],
  gallery: [
    img('MODULAR KITCHEN/DD khandelwal kitchen A02.webp', 'Modular kitchen detail, Jaipur'),
    img('MODULAR KITCHEN/DD khandelwal kitchen A03.webp', 'Kitchen island, Jaipur'),
    img('MODULAR KITCHEN/Ram ji G.F. kitchen A01.webp', 'Kitchen design, Jaipur'),
    img('MODULAR KITCHEN/Ajit ji khichar A07.webp', 'Kitchen interior, Jaipur'),
    img('MODULAR KITCHEN/Rakesh ji living A01_View060000.webp', 'Kitchen and living, Jaipur'),
    img('MODULAR KITCHEN/Rakesh ji living A01_View070000.webp', 'Kitchen detail, Jaipur'),
    img('MODULAR KITCHEN/Krish ji C01_View010000.webp', 'Kitchen, Krish Residence, Jaipur'),
    img('MODULAR KITCHEN/Rishabh ji kitchen E01.webp', 'Kitchen, Rishabh Residence, Jaipur'),
  ],
  relatedPortfolioSlugs: ['rishabh-ji-residence', 'vizora-house'],
  faq: [
    { question: 'Can you match my existing dining or living room?', answer: 'Yes — for open-plan homes we carry the same material language from the kitchen into the dining and living areas.' },
    { question: 'What hardware brands do you use?', answer: 'We fit German-grade soft-close hinges and channels as standard, with premium upgrades available on request.' },
    { question: 'How long does a modular kitchen take?', answer: 'A standard kitchen is typically delivered in 2–3 weeks once measurements and materials are finalised.' },
  ],
};
