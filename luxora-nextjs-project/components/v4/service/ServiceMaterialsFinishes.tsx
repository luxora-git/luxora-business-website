'use client';

import { useState } from 'react';
import V4SectionHeader from '../V4SectionHeader';
import { LuxuryAmbient } from '../background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { useLightbox } from '../lightbox';
import type { ServiceMaterialsData } from '@/lib/content/services/types';

export interface ServiceMaterialsFinishesProps {
  data: ServiceMaterialsData;
}

/**
 * ServiceMaterialsFinishes — the premium material library shared by every
 * service page. Editorial photography cards (full-bleed image + caption),
 * not e-commerce swatch tiles, grouped by category tabs (Wood, Stone,
 * Fabric, Hardware, Lighting, Luxury Finishes — content-driven).
 */
export default function ServiceMaterialsFinishes({ data }: ServiceMaterialsFinishesProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const category = data.categories[activeCategory];
  const { open: openLightbox } = useLightbox();

  return (
    <section
      id="v4-service-materials"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#F5EDE0' }}
    >
      <LuxuryAmbient id="service-materials" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div data-v4-reveal-heading>
          <V4SectionHeader
            eyebrow={data.eyebrow}
            title={data.title}
            titleItalic={data.titleItalic}
            description={data.description}
            centered
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-14" data-v4-reveal>
          {data.categories.map((c, i) => {
            const isActive = i === activeCategory;
            return (
              <button
                key={c.label}
                type="button"
                onClick={() => setActiveCategory(i)}
                className="px-6 py-3 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-300"
                style={
                  isActive
                    ? { background: luxoraColors.espresso, color: '#FDFAF6', boxShadow: '0 10px 26px rgba(44,31,20,0.22)' }
                    : { background: 'rgba(253,250,246,0.6)', color: '#9C7B68', border: '1px solid rgba(160,120,80,0.22)' }
                }
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Editorial material cards */}
        <div key={category.label} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-v4-reveal>
          {category.items.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() =>
                openLightbox({
                  images: [{ src: item.image, alt: item.imageAlt }],
                  panel: {
                    variant: 'service',
                    eyebrow: category.label,
                    title: item.name,
                    description: item.description,
                    meta: [{ label: 'Category', value: category.label }],
                  },
                })
              }
              className="group relative rounded-2xl overflow-hidden h-[340px] block w-full text-left border shadow-[0_4px_18px_rgba(100,60,20,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C9A227] hover:shadow-[0_22px_50px_rgba(100,60,20,0.20)]"
              style={{ borderColor: 'rgba(160,120,80,0.16)' }}
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(20,14,6,0.86) 0%, rgba(20,14,6,0.18) 55%, transparent 100%)' }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-playfair text-[1.2rem] leading-snug mb-2" style={{ color: '#FDFAF6' }}>
                  {item.name}
                </h3>
                <div className="w-7 h-px mb-2.5" style={{ background: luxoraColors.gold }} />
                <p className="text-[12.5px] leading-relaxed font-light" style={{ color: 'rgba(253,250,246,0.75)' }}>
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
