import type { ServiceLiteData } from './serviceLiteTypes';

function p(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
function ai(path: string): string {
  return p(`/img/AI BASED/${path}`);
}
function img(path: string, alt: string) {
  return { url: ai(path), alt };
}

export const homeAutomationService: ServiceLiteData = {
  slug: 'home-automation',
  categorySlug: 'living-room',
  title: 'Home Automation',
  titleItalic: 'Lighting, Climate & Security, One Touch Away',
  eyebrow: 'Home Automation',
  heroImage: img('FALSE CIELING DESIGN/fc2.webp', 'Ambient lighting design integrated with home automation, Jaipur'),
  overview:
    'Automation should disappear into the room, not sit on top of it. We integrate lighting scenes, climate control, curtains and security into the interior design itself, so the technology serves the space instead of competing with it.',
  overviewBullets: [
    'Scene-based lighting controlled from a single app or wall panel',
    'Motorised curtains and blinds integrated into the window design',
    'Climate control zoned by room, not one setting for the whole home',
    'Security and access control woven into the entrance and boundary design',
  ],
  process: [
    { number: '01', title: 'Needs Mapping', description: 'We identify which rooms and daily routines actually benefit from automation.' },
    { number: '02', title: 'System Design', description: 'Lighting circuits, sensors and panels are planned alongside the electrical layout.' },
    { number: '03', title: 'Integration Planning', description: 'Automation points are built into the interior design, not retrofitted after.' },
    { number: '04', title: 'Installation', description: 'Panels, sensors and control units are fitted by certified technicians.' },
    { number: '05', title: 'Scene Programming & Handover', description: 'Lighting and climate scenes are programmed and demonstrated before handover.' },
  ],
  gallery: [
    img('FALSE CIELING DESIGN/fc1.webp', 'Ambient ceiling lighting design, Jaipur'),
    img('FALSE CIELING DESIGN/fc3.webp', 'Layered ceiling lighting concept, Jaipur'),
    img('TV UNIT DESIGN/tv1.webp', 'Media wall with integrated lighting concept, Jaipur'),
    img('TV UNIT DESIGN/tv3.webp', 'Smart living TV unit concept, Jaipur'),
    img('LIVING BEDROOM DESIGNS/lr4.webp', 'Living room with ambient lighting concept, Jaipur'),
    img('MASTER BEDROOM DESIGNS/mb3.webp', 'Bedroom with layered ambient lighting concept, Jaipur'),
  ],
  relatedPortfolioSlugs: ['vizora-house', 'krish-ji-residence', 'karamveer-ji-residence'],
  faq: [
    { question: 'Can automation be added to an existing home, not just new builds?', answer: 'Yes — most lighting and climate automation can be retrofitted with minimal rework, depending on your existing wiring.' },
    { question: 'Which rooms benefit most from automation?', answer: 'Living rooms, master bedrooms and entrances see the most everyday use — that is usually where we recommend starting.' },
    { question: 'Do I need a separate app for each system?', answer: 'No — we integrate lighting, climate and security into a single control app or wall panel wherever possible.' },
  ],
};
