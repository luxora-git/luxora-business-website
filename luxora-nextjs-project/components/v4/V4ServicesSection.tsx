'use client';

import V4SectionHeader from './V4SectionHeader';
import { LuxuryContour, LuxuryBlueprint, LuxuryMarble, LuxuryHalo, LuxuryGrain } from './background';
import { useConsultationModal } from './modal';

const services = [
  {
    id: '01',
    title: 'Interior Design Consultancy',
    description: 'Personalised interiors crafted around your lifestyle, needs and vision.',
    href: '/services/full-home-interior-design',
  },
  {
    id: '02',
    title: 'Architectural Design',
    description: 'Structural planning to façade design — blending function with aesthetic vision.',
    href: '/services/architectural-design',
  },
  {
    id: '03',
    title: 'Designer Modular Kitchens',
    description: 'Bespoke modular kitchens with German-grade fittings and premium finishes.',
    href: '/services/modular-kitchen-design',
  },
  {
    id: '04',
    title: 'Designer Wardrobes',
    description: 'Smart storage solutions that combine elegance with everyday practicality.',
    href: '/services/wardrobe-design',
  },
  {
    id: '05',
    title: 'Home Automation',
    description: 'Lighting, climate and security — seamlessly integrated at a single touch.',
    href: '/services/home-automation',
  },
  {
    id: '06',
    title: 'Commercial & Office Interiors',
    description: 'Brand-driven workspaces and retail environments that inspire identity.',
    href: '/services/commercial-office-interior-design',
  },
];

export default function V4ServicesSection() {
  const { open: openConsultationModal } = useConsultationModal();
  return (
    <section
      id="v4-services"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, rgba(28,22,16,0.16) 0%, rgba(28,22,16,0.04) 7%, transparent 16%), #F5EFE6',
      }}
    >
      {/* Soft gold seam — eases the eye from the dark Hero into this section */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.45), transparent)' }}
      />
      {/* Layer 1 — soft glow behind the cinematic image */}
      <LuxuryHalo position="top-left" size="xl" opacity={0.07} blur={110} />

      {/* Layer 2 — architectural contour lines, corner to corner */}
      <LuxuryContour position="top-left" opacity={0.04} scale={1.5} />
      <LuxuryContour position="bottom-right" opacity={0.035} scale={1.6} rotation={180} />

      {/* Layer 3 — architectural floor-plan line art, opposite corners */}
      <LuxuryBlueprint position="top-right" opacity={0.035} scale={1.35} variant="b" density="medium" />
      <LuxuryBlueprint position="bottom-left" opacity={0.03} scale={1.3} variant="c" density="low" rotation={4} />

      {/* Layer 4 — a single subtle marble-flow accent beneath everything */}
      <LuxuryMarble position="center" opacity={0.028} scale={1.2} />

      {/* Layer 5 — whisper-quiet grain across the full section */}
      <LuxuryGrain id="v4-services-grain" opacity={0.012} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div data-v4-reveal-heading>
          <V4SectionHeader
            eyebrow="What We Do"
            title="Complete Interior Solutions"
            titleItalic="Crafted Around Your Lifestyle"
            description="From the first sketch to the final finishing touch — we create spaces that are as functional as they are beautiful."
            centered
          />
        </div>

        {/* ── Editorial composition — cinematic image (55%) + service index (45%) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.22fr_1fr] gap-12 lg:gap-16 items-start" data-v4-reveal>

          {/* ── LEFT — cinematic hero image ───────────────────────── */}
          <button
            type="button"
            onClick={openConsultationModal}
            className="group relative block w-full text-left rounded-[2rem] h-[460px] md:h-[600px] lg:h-[650px] shadow-[0_20px_60px_rgba(100,60,20,0.14)]"
          >
            {/* Image + gradient are clipped to the rounded card; the badge and
                CTA panel below live outside this wrapper so they're never
                cropped regardless of content length or viewport size. */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
              <img
                src="/img/PROJECT%20BASED/LIVING%20ROOM%20DESIGN/Krish%20ji%20S.F.%20A01_View130000.webp"
                alt="Luxora signature interior"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(20,14,6,0.10) 0%, rgba(20,14,6,0.12) 40%, rgba(20,14,6,0.80) 100%)',
                }}
              />
            </div>

            {/* Luxury badge */}
            <div
              className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: 'rgba(20,14,6,0.45)', backdropFilter: 'blur(10px)', border: '1px solid rgba(201,162,39,0.35)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.4">
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
              </svg>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: '#E8C468' }}>
                Luxora Signature Experience
              </span>
            </div>

            {/* Glass panel */}
            <div
              className="absolute bottom-6 left-6 right-6 md:right-auto md:w-[72%] lg:w-[66%] rounded-2xl p-6 md:p-8"
              style={{
                background: 'rgba(20,14,6,0.45)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.10)',
              }}
            >
              <span className="text-[10px] font-semibold tracking-[0.24em] uppercase mb-2 block" style={{ color: '#C9A227' }}>
                Start Your Journey To
              </span>
              <h3
                className="font-playfair font-normal leading-[1.1] mb-2"
                style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', color: '#FDFAF6' }}
              >
                Timeless Interiors
              </h3>
              <p className="text-sm leading-relaxed font-light mb-5" style={{ color: 'rgba(253,250,246,0.78)' }}>
                Personalised design. Premium materials. Flawless execution.
              </p>
              <span
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[11px] font-bold tracking-[0.10em] uppercase transition-all duration-300 group-hover:gap-3.5"
                style={{ background: '#C9A227', color: '#1C1005' }}
              >
                Book Consultation
                <span className="text-sm leading-none">→</span>
              </span>
            </div>
          </button>

          {/* ── RIGHT — editorial service index ───────────────────── */}
          <div className="border-t border-[rgba(160,120,80,0.18)] divide-y divide-[rgba(160,120,80,0.18)]">
            {services.map((service) => (
              <a
                key={service.id}
                href={service.href}
                className="group flex items-center gap-5 md:gap-6 py-6 px-2 -mx-2 rounded-xl transition-all duration-300 hover:bg-[rgba(201,162,39,0.05)]"
              >
                <span
                  className="font-playfair italic flex-shrink-0 w-9 text-lg transition-colors duration-300 group-hover:text-[#2C1F14]"
                  style={{ color: 'rgba(201,162,39,0.65)' }}
                >
                  {service.id}
                </span>

                <div className="min-w-0 flex-1">
                  <h3
                    className="font-playfair text-[1.15rem] font-normal leading-snug mb-1 transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: '#2C1F14' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-[13px] leading-snug font-light" style={{ color: '#6B4C3B' }}>
                    {service.description}
                  </p>
                </div>

                <span
                  className="flex-shrink-0 text-lg transition-transform duration-300 group-hover:translate-x-1.5"
                  style={{ color: '#C9A227' }}
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Editorial CTA ───────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-5 md:gap-8 mt-20" data-v4-reveal>
          <span className="hidden sm:flex items-center flex-1 max-w-[160px]" aria-hidden="true">
            <span className="h-px flex-1" style={{ background: 'rgba(201,162,39,0.30)' }} />
            <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: 'rgba(201,162,39,0.45)' }} />
          </span>

          <a
            href="/portfolio"
            className="inline-flex items-center gap-3 px-9 py-3.5 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase border border-[rgba(201,162,39,0.45)] text-[#C9A227] transition-all duration-400 hover:bg-[#C9A227] hover:text-[#1C1005]"
          >
            Explore Our Portfolio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <span className="hidden sm:flex items-center flex-1 max-w-[160px]" aria-hidden="true">
            <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: 'rgba(201,162,39,0.45)' }} />
            <span className="h-px flex-1" style={{ background: 'rgba(201,162,39,0.30)' }} />
          </span>
        </div>
      </div>
    </section>
  );
}
