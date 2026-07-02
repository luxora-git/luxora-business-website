'use client';

import { useState } from 'react';
import V4SectionHeader from '../V4SectionHeader';
import { LuxuryGrain, LuxuryDivider } from '../background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { ServiceFAQData } from '@/lib/content/services/types';

export interface ServiceFAQProps {
  data: ServiceFAQData;
}

/**
 * ServiceFAQ — a quiet, divider-separated accordion (no boxed cards),
 * matching the editorial restraint already established for the Services
 * index and Why Luxora table. Soft height/opacity transition on open.
 */
export default function ServiceFAQ({ data }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="v4-service-faq"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#FDFAF6' }}
    >
      <LuxuryGrain id="service-faq-grain" opacity={0.012} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 lg:px-16">
        <div data-v4-reveal-heading>
          <V4SectionHeader
            eyebrow={data.eyebrow}
            title={data.title}
            titleItalic={data.titleItalic}
            description={data.description}
            centered
          />
        </div>

        <div className="border-t" style={{ borderColor: 'rgba(160,120,80,0.18)' }} data-v4-reveal>
          {data.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left transition-colors duration-300"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-playfair text-[1.05rem] md:text-[1.15rem] leading-snug transition-colors duration-300"
                    style={{ color: isOpen ? luxoraColors.gold : luxoraColors.espresso }}
                  >
                    {item.question}
                  </span>
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-400"
                    style={{
                      border: '1px solid rgba(201,162,39,0.35)',
                      color: luxoraColors.gold,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: isOpen ? '320px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="text-[14.5px] leading-relaxed font-light pb-6 pr-10" style={{ color: '#6B4C3B' }}>
                    {item.answer}
                  </p>
                </div>

                <LuxuryDivider variant="line" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
