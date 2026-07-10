'use client';

import { useState } from 'react';
import { luxoraSpacing } from '@/lib/design/luxoraDesignTokens';
import Link from 'next/link';
import { portfolioProjects } from '@/lib/content/portfolio/projects';
import V4SectionHeader from './V4SectionHeader';

const FEATURED_SLUGS = [
  'krish-ji-residence',
  'vizora-house',
  'rishabh-ji-residence',
  'ashrit-corporate-studio',
  'rakesh-ji-residence',
  'paritosh-ji-residence',
];

const featured = FEATURED_SLUGS
  .map((slug) => portfolioProjects.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const PER_SLIDE = 3;
const slides: (typeof featured)[] = [];
for (let i = 0; i < featured.length; i += PER_SLIDE) {
  slides.push(featured.slice(i, i + PER_SLIDE));
}

function PortfolioCard({ project }: { project: (typeof featured)[number] }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex flex-col"
    >
      <div
        className="relative overflow-hidden rounded-[18px] mb-5 shadow-[0_8px_28px_rgba(60,35,16,0.07)] transition-shadow duration-500 group-hover:shadow-[0_20px_50px_rgba(60,35,16,0.14)]"
        style={{
          aspectRatio: '4/5',
          border: '1px solid rgba(160,120,80,0.14)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.heroImage.url}
          alt={project.heroImage.alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1005]/55 via-transparent to-transparent" />
        <div className="absolute inset-0 border-2 border-[#C8A44A]/0 transition-all duration-300 group-hover:border-[#C8A44A]/40 rounded-[18px]" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span
            className="text-[10px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(28,16,5,0.55)', color: '#C9A227', backdropFilter: 'blur(6px)' }}
          >
            {project.category}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-[11px] font-medium" style={{ color: 'rgba(253,250,246,0.85)' }}>
          <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {project.facts.location}
        </div>
      </div>

      <h3
        className="font-playfair text-[1.2rem] md:text-[1.3rem] font-normal leading-tight mb-2"
        style={{ color: '#1C1005' }}
      >
        {project.title}
      </h3>
      <div className="text-[12px] font-medium mb-3" style={{ color: '#9C7B68' }}>
        {project.facts.propertyType}
      </div>
      <p className="text-[13.5px] leading-relaxed font-light mb-4 line-clamp-2" style={{ color: '#6B4C3B' }}>
        {project.overview}
      </p>

      <span
        className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase w-fit pb-1 transition-colors duration-300"
        style={{ color: '#1C1005', borderBottom: '1.5px solid rgba(201,162,39,0.4)' }}
      >
        View Case Study
        <svg
          className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="#C9A227"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </Link>
  );
}

export default function V4PortfolioShowcaseSection() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const next = () => setCurrent((p) => (p + 1) % total);
  const prev = () => setCurrent((p) => (p - 1 + total) % total);

  return (
    <section
      id="v4-portfolio"
      className="relative overflow-hidden py-28 md:py-36 3xl:py-44"
      style={{ backgroundColor: '#FDFAF6' }}
    >
      {/* Dot grid — mirrors the Design Gallery's visual weight */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="portfolio-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#C9A96E" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#portfolio-dots)" />
        </svg>
      </div>

      <div className={`relative z-10 ${luxoraSpacing.container}`}>

        {/* Header row + nav arrows — same treatment as Design Gallery */}
        <div className="mb-12 flex items-end justify-between md:mb-16" data-v4-reveal-heading>
          <div className="flex-1">
            <V4SectionHeader
              eyebrow="COMPLETED PROJECTS"
              title="Real Homes,"
              titleItalic="Real Jaipur Addresses"
              description="Not concepts, not renders for inspiration — these are Luxora projects that were designed, built and handed over, each with a full case study behind it."
              centered={false}
            />
          </div>

          <div className="mb-14 hidden flex-shrink-0 items-center gap-3 pl-8 md:flex">
            <button
              onClick={prev}
              className="group flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 hover:border-[#1C1005] hover:bg-[#1C1005]"
              style={{ borderColor: 'rgba(160,120,80,0.30)', background: '#FDFAF6' }}
              aria-label="Previous projects"
            >
              <svg className="h-4 w-4 transition-colors duration-300 group-hover:stroke-[#C8A44A]" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="tabular-nums text-[11px] font-semibold tracking-[0.16em]" style={{ color: '#9C7B68' }}>
              {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <button
              onClick={next}
              className="group flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 hover:border-[#1C1005] hover:bg-[#1C1005]"
              style={{ borderColor: 'rgba(160,120,80,0.30)', background: '#FDFAF6' }}
              aria-label="Next projects"
            >
              <svg className="h-4 w-4 transition-colors duration-300 group-hover:stroke-[#C8A44A]" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* CSS track slider — same mechanism as Design Gallery, different card design */}
        <div className="overflow-hidden" data-v4-reveal>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, si) => (
              <div
                key={si}
                className="grid w-full flex-shrink-0 grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
              >
                {slide.map((project) => (
                  <PortfolioCard key={project.slug} project={project} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile nav */}
        <div className="mt-10 flex items-center justify-center gap-4 md:hidden">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(160,120,80,0.30)]"
            style={{ background: '#FDFAF6' }}
            aria-label="Previous projects"
          >
            <svg className="h-4 w-4" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: current === i ? '24px' : '8px',
                  height: '8px',
                  background: current === i ? '#C9A227' : 'rgba(201,162,39,0.3)',
                }}
                aria-label={`Project set ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(160,120,80,0.30)]"
            style={{ background: '#FDFAF6' }}
            aria-label="Next projects"
          >
            <svg className="h-4 w-4" fill="none" stroke="#2C1F14" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 md:mt-24" data-v4-reveal>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-[12px] tracking-[0.1em] uppercase transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: '#1C1005', color: '#FDFAF6' }}
          >
            Explore Complete Portfolio
            <svg className="h-3.5 w-3.5" fill="none" stroke="#C9A227" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
