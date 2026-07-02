import type { ServiceLiteData } from './serviceLiteTypes';

function p(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
function img(path: string, alt: string) {
  return { url: p(`/img/PROJECT BASED/${path}`), alt };
}

export const livingRoomService: ServiceLiteData = {
  slug: 'living-room-interior-design',
  categorySlug: 'living-room',
  title: 'Living Room Design',
  titleItalic: 'Built Around How You Actually Live',
  eyebrow: 'Living Room Interiors',
  heroImage: img('LIVING ROOM DESIGN/Karamveer ji G.F. A01_View070000.webp', 'Living room designed by Luxora, Jaipur'),
  overview:
    'Your living room carries more weight than any other room in the house — it hosts guests, holds family evenings, and sets the first impression of your entire home. We design it as one considered composition, not a sofa and a TV unit chosen separately.',
  overviewBullets: [
    'Custom seating layouts planned for your actual room dimensions',
    'Integrated TV units and display walls built to the millimetre',
    'Lighting layered for daytime, entertaining and quiet evenings',
    'One material language carried from flooring to ceiling',
  ],
  process: [
    { number: '01', title: 'Site Visit', description: 'We measure your space and understand how your family actually uses the room.' },
    { number: '02', title: 'Concept & 3D', description: 'A full 3D visual of your living room before a single panel is cut.' },
    { number: '03', title: 'Material Selection', description: 'Fabrics, finishes and lighting chosen together, not one at a time.' },
    { number: '04', title: 'Execution', description: 'Our own production team builds and installs — no subcontracted guesswork.' },
    { number: '05', title: 'Handover', description: 'A final walkthrough before you move back in.' },
  ],
  gallery: [
    img('LIVING ROOM DESIGN/Karamveer ji G.F. A01_View080000.webp', 'Living room seating area, Jaipur'),
    img('LIVING ROOM DESIGN/Karamveer ji G.F. A01_View100000.webp', 'Living room TV wall, Jaipur'),
    img('LIVING ROOM DESIGN/Karamveer ji G.F. A01_View110000.webp', 'Living room detail, Jaipur'),
    img('LIVING ROOM DESIGN/Paritosh ji Living A01_View040000.webp', 'Living room design, Jaipur'),
    img('LIVING ROOM DESIGN/Ajit ji khichar A08.webp', 'Living room interior, Jaipur'),
    img('LIVING ROOM DESIGN/Ajit ji khichar A09.webp', 'Living room seating, Jaipur'),
    img('LIVING ROOM DESIGN/Ajit ji khichar A10.webp', 'Living room styling, Jaipur'),
    img('LIVING ROOM DESIGN/Vizora House G.F. A01_View040000.webp', 'Living room, Vizora House, Jaipur'),
  ],
  relatedPortfolioSlugs: ['krish-ji-residence', 'vizora-house'],
  faq: [
    { question: 'Can you design around furniture I already own?', answer: 'Yes — tell us what you want to keep during the site visit and we design the rest of the room to complement it.' },
    { question: 'How long does a living room typically take?', answer: 'A standalone living room is usually delivered in 2–3 weeks once materials are finalised.' },
    { question: 'Do you handle false ceilings and lighting too?', answer: 'Yes — false ceiling design, electrical planning and lighting layers are all part of the same brief, not a separate vendor.' },
  ],
};
