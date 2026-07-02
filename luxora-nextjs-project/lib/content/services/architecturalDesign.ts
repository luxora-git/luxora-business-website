import type { ServiceLiteData } from './serviceLiteTypes';

function p(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
function img(path: string, alt: string) {
  return { url: p(`/img/PROJECT BASED/${path}`), alt };
}

export const architecturalDesignService: ServiceLiteData = {
  slug: 'architectural-design',
  categorySlug: 'full-home',
  title: 'Architectural Design',
  titleItalic: 'From Structure to Story',
  eyebrow: 'Architectural Design',
  heroImage: img('FOYER DESIGN/krish ji entrance+kitchen+dining area A01_View020100 lux.webp', 'Double-height foyer, architectural planning by Luxora, Jaipur'),
  overview:
    'Great interiors start with the shell around them. We work on structural planning, façade language and spatial flow before a single finish is chosen — so the architecture and the interior read as one decision, not two.',
  overviewBullets: [
    'Structural and spatial planning before interior finishes are chosen',
    'Façade and elevation design that reflects the interior language',
    'Double-height and open-plan volumes planned for light and flow',
    'Coordinated with structural engineers for safe, buildable detailing',
  ],
  process: [
    { number: '01', title: 'Site & Structure Study', description: 'We study the plot, structure and existing constraints before any design begins.' },
    { number: '02', title: 'Spatial Planning', description: 'Room adjacencies and volumes are planned around how the home will actually be used.' },
    { number: '03', title: 'Façade & Elevation', description: 'The exterior language is developed alongside the interior, not after it.' },
    { number: '04', title: 'Engineering Coordination', description: 'Structural and MEP inputs are folded into the design before drawings are finalised.' },
    { number: '05', title: 'Execution Oversight', description: 'We stay involved through construction to protect the original design intent.' },
  ],
  gallery: [
    img('FOYER DESIGN/Vizora House G.F. A01_View130000.webp', 'Entrance foyer, Vizora House, Jaipur'),
    img('FOYER DESIGN/Paritosh ji Living A01_View010000.webp', 'Foyer, Paritosh Residence, Jaipur'),
    img('FOYER DESIGN/Rakesh ji living A01_View040000.webp', 'Foyer detail, Rakesh Residence, Jaipur'),
    img('FOYER DESIGN/krish ji entrance+kitchen+dining area A01_View010100 lux.webp', 'Entrance foyer, Krish Residence, Jaipur'),
    img('BALCONY DESIGN/Krish ji S.F. Bathrooms A01_View160042.webp', 'Balcony, Krish Residence, Jaipur'),
    img('BALCONY DESIGN/Saurabh jain f.f. C01_View050100_View120025.webp', 'Balcony, Saurabh Jain Residence, Jaipur'),
  ],
  relatedPortfolioSlugs: ['vizora-house', 'krish-ji-residence', 'paritosh-ji-residence'],
  faq: [
    { question: 'Do you handle structural approvals and drawings?', answer: 'We coordinate with structural engineers and licensed architects for approvals — our team leads the design and spatial planning.' },
    { question: "Can you work with an architect I've already hired?", answer: 'Yes — we regularly collaborate with independent architects, aligning interior and structural design on the same project.' },
    { question: 'Do you only take on full-home or new-build projects?', answer: 'Architectural planning is usually part of a full-home or new-build scope, but we also take on additions and renovations that involve structural changes.' },
  ],
};
