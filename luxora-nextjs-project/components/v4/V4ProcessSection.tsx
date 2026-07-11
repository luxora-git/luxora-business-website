'use client';

import { useState } from 'react';
import { luxoraSpacing } from '@/lib/design/luxoraDesignTokens';
import { Architectural } from './background';
import { useConsultationModal } from './modal';
import { luxoraStats } from '@/lib/content/global/stats';

const steps = [
  {
    number: '01',
    label:  'Site Visit',
    title:  'Free Site Visit & Consultation',
    description: 'Our design expert visits your space, understands your lifestyle, budget, and vision. We walk you through the possibilities and answer every question — no pressure, no commitment.',
    highlight: 'Free · Available in 24hrs',
    image:  '/img/AI%20BASED/HOME%20OFFICE/ofc9.webp',
    tags:   ['Site Analysis', 'Brief Discussion', 'Budget Clarity'],
  },
  {
    number: '02',
    label:  '3D Design',
    title:  '3D Design & Concept Presentation',
    description: 'We translate your ideas into photorealistic 3D renders — every room, every angle. You see your future home before a single nail is hammered. Unlimited revisions included.',
    highlight: 'Photorealistic renders · Unlimited revisions',
    image:  '/img/PROJECT%20BASED/LIVING%20ROOM%20DESIGN/Vizora%20House%20G.F.%20A01_View040000.webp',
    tags:   ['3D Rendering', 'Material Boards', 'Floor Plans'],
  },
  {
    number: '03',
    label:  'Materials',
    title:  'Material Selection & Finalisation',
    description: `From Italian marble to custom fabric — our designers guide you through ${luxoraStats.catalogueChoices.toLowerCase()} curated choices. Every material is quality-checked, priced transparently, and matched to your aesthetic.`,
    highlight: `${luxoraStats.catalogueChoices} choices · Zero hidden costs`,
    image:  '/img/AI%20BASED/MODULAR%20KITCHEN/mk11.webp',
    tags:   ['Premium Materials', 'Transparent Pricing', 'Samples'],
  },
  {
    number: '04',
    label:  'Execution',
    title:  'Expert Execution & Installation',
    description: `Our certified craftsmen handle every aspect — carpentry, electrical, plumbing, painting, and installation. ${luxoraStats.qualityChecks}+ quality checks at every stage ensure flawless delivery.`,
    highlight: `${luxoraStats.qualityChecks} quality checks · Certified craftsmen`,
    image:  '/img/AI%20BASED/WARDROBE%20DESIGN/wd16.webp',
    tags:   ['Project Management', 'Quality Control', 'On-time Delivery'],
  },
  {
    number: '05',
    label:  'Handover',
    title:  'Handover & After-Sales Support',
    description: `Your dream home, delivered with a ${luxoraStats.warrantyYears}-year warranty and dedicated after-sales care. We remain your design partner — long after the last tile is laid.`,
    highlight: `${luxoraStats.warrantyYears}-year warranty · Dedicated support`,
    image:  '/img/AI%20BASED/LIVING%20BEDROOM%20DESIGNS/lr1.webp',
    tags:   [`${luxoraStats.warrantyYears}-Year Warranty`, 'Post-Handover Care', 'Helpdesk'],
  },
];

export default function V4ProcessSection() {
  const { open: openConsultationModal } = useConsultationModal();
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section
      id="v4-process"
      className="relative overflow-hidden py-20 md:py-28 3xl:py-36"
      style={{
        background:
          'linear-gradient(to bottom, rgba(44,31,20,0.05) 0%, transparent 9%), radial-gradient(ellipse 70% 50% at 8% 0%, rgba(255,255,255,0.45) 0%, transparent 55%), radial-gradient(ellipse 60% 60% at 98% 100%, rgba(201,162,39,0.09) 0%, transparent 55%), #F5EFE6',
      }}
    >
      {/* Scene: Architectural — the drafted, structured register for the
          process journey (see docs/background-design-system.md) */}
      <Architectural id="home-process" />

      <div className={`relative z-10 ${luxoraSpacing.container}`}>

        {/* ── Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12" data-v4-reveal-heading>
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-20" style={{ background: 'rgba(180,130,60,0.35)' }} />
              <span className="text-[11px] font-semibold tracking-[0.28em] uppercase" style={{ color: '#B07D3A' }}>
                How It Works
              </span>
            </div>
            <h2
              className="font-playfair font-normal leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.2rem)', color: '#2C1F14' }}
            >
              Your Home,{' '}
              <span className="font-playfair italic">Our Process</span>
            </h2>
          </div>
          <p
            className="text-sm md:text-base font-light leading-relaxed max-w-xs md:text-right"
            style={{ color: '#6B4C3B' }}
          >
            Transparent, personal, and crafted around you — from first call to final handover.
          </p>
        </div>

        {/* ── Step Tab Navigation */}
        <div className="relative mb-10" data-v4-reveal>
          {/* Connecting line */}
          <div
            className="absolute hidden lg:block"
            style={{
              top: '22px', left: '10%', right: '10%', height: '1px',
              background: 'rgba(201,162,39,0.20)',
            }}
          />
          {/* Progress fill */}
          <div
            className="absolute hidden lg:block transition-all duration-500"
            style={{
              top: '22px',
              left: '10%',
              width: `${(active / (steps.length - 1)) * 80}%`,
              height: '1px',
              background: 'rgba(201,162,39,0.55)',
            }}
          />

          <div className="grid grid-cols-5 gap-2">
            {steps.map((s, i) => {
              const done   = i < active;
              const current = i === active;
              return (
                <button
                  key={s.number}
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center gap-2.5 group transition-all duration-200"
                >
                  {/* Circle indicator */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 relative z-10"
                    style={{
                      background: current
                        ? '#C9A227'
                        : done
                          ? 'rgba(201,162,39,0.18)'
                          : 'rgba(253,250,246,0.80)',
                      border: current
                        ? 'none'
                        : done
                          ? '1.5px solid rgba(201,162,39,0.45)'
                          : '1.5px solid rgba(180,140,95,0.25)',
                      boxShadow: current ? '0 0 0 6px rgba(201,162,39,0.12)' : 'none',
                    }}
                  >
                    {done ? (
                      <svg className="w-4 h-4" fill="none" stroke="#C9A227" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span
                        className="font-playfair text-sm font-semibold"
                        style={{ color: current ? '#1C1005' : done ? '#C9A227' : '#9C7B68' }}
                      >
                        {s.number}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className="text-[11px] font-semibold tracking-[0.06em] hidden md:block transition-colors duration-200 text-center"
                    style={{ color: current ? '#2C1F14' : '#9C7B68' }}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Content Panel — fixed height, switches with animation */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            border: '1px solid rgba(180,140,95,0.18)',
            boxShadow: '0 24px 70px rgba(100,60,20,0.12)',
            minHeight: '420px',
          }}
          data-v4-reveal
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">

            {/* ── LEFT: Text content */}
            <div
              className="relative flex flex-col justify-center px-8 md:px-12 py-10 overflow-hidden"
              style={{ background: '#FDFAF6' }}
            >
              {/* Decorative large number watermark */}
              <span
                className="absolute font-playfair font-bold select-none pointer-events-none"
                aria-hidden="true"
                style={{
                  fontSize: 'clamp(100px, 14vw, 180px)',
                  color: 'rgba(201,162,39,0.06)',
                  lineHeight: 1,
                  top: '-10px',
                  right: '-10px',
                }}
              >
                {step.number}
              </span>

              {/* Step label */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.16em] uppercase"
                  style={{ background: 'rgba(201,162,39,0.12)', color: '#B07D3A', border: '1px solid rgba(201,162,39,0.25)' }}
                >
                  Step {step.number}
                </div>
                <div className="h-px flex-1 max-w-[60px]" style={{ background: 'rgba(201,162,39,0.30)' }} />
              </div>

              <h3
                className="font-playfair font-normal leading-[1.15] mb-4 relative z-10"
                style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', color: '#2C1F14' }}
              >
                {step.title}
              </h3>

              <p
                className="text-sm md:text-base font-light leading-relaxed mb-5 relative z-10"
                style={{ color: '#6B4C3B', maxWidth: '440px' }}
              >
                {step.description}
              </p>

              {/* Highlight pill */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 self-start"
                style={{ background: 'rgba(201,162,39,0.10)', border: '1px solid rgba(201,162,39,0.22)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#C9A227' }} />
                <span className="text-[11px] font-semibold" style={{ color: '#B07D3A' }}>
                  {step.highlight}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.06em] uppercase"
                    style={{ background: 'rgba(44,31,20,0.05)', color: '#9C7B68', border: '1px solid rgba(180,140,95,0.18)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Step nav arrows (prev/next) */}
              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={() => setActive(Math.max(0, active - 1))}
                  disabled={active === 0}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                  style={{ border: '1.5px solid rgba(201,162,39,0.35)', color: '#B07D3A', background: 'transparent' }}
                  aria-label="Previous step"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
                  disabled={active === steps.length - 1}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                  style={{ background: '#C9A227', color: '#1C1005', border: 'none', boxShadow: '0 4px 14px rgba(201,162,39,0.35)' }}
                  aria-label="Next step"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <span className="text-[11px] font-medium ml-1" style={{ color: '#9C7B68' }}>
                  {active + 1} / {steps.length}
                </span>
              </div>
            </div>

            {/* ── RIGHT: Image */}
            <div className="relative overflow-hidden" style={{ minHeight: '300px' }}>
              <img
                key={step.image}
                src={step.image}
                alt={step.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(44,31,20,0.25) 0%, transparent 60%)' }}
              />
              {/* Step number overlay on image */}
              <div
                className="absolute top-6 right-6 w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(201,162,39,0.90)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 20px rgba(201,162,39,0.35)',
                }}
              >
                <span
                  className="font-playfair italic font-semibold text-lg"
                  style={{ color: '#1C1005' }}
                >
                  {step.number}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-10" data-v4-reveal>
          <p className="font-playfair italic text-lg" style={{ color: '#6B4C3B' }}>
            Ready to start your dream home journey?
          </p>
          <button
            type="button"
            onClick={openConsultationModal}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-[11px] tracking-[0.10em] uppercase transition-all duration-300 hover:-translate-y-0.5 flex-shrink-0"
            style={{ background: '#C9A227', color: '#1C1005', boxShadow: '0 8px 28px rgba(201,162,39,0.28)' }}
          >
            Book Free Consultation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}