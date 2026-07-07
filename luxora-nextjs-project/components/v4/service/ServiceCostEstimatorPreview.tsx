'use client';

import { useMemo, useState } from 'react';
import V4SectionHeader from '../V4SectionHeader';
import { LuxuryGrain } from '../background';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { ServiceCostEstimatorData } from '@/lib/content/services/types';

export interface ServiceCostEstimatorPreviewProps {
  data: ServiceCostEstimatorData;
}

function formatLakh(value: number): string {
  if (value >= 100) return `₹${(value / 100).toFixed(value % 100 === 0 ? 0 : 1)}Cr`;
  return `₹${Math.round(value)}L`;
}

/**
 * ServiceCostEstimatorPreview — a compact, glanceable estimate widget
 * (area + package → instant range), not the full estimator. Feeds into
 * the integrated Luxora Interior Estimator via `ctaHref`.
 */
export default function ServiceCostEstimatorPreview({ data }: ServiceCostEstimatorPreviewProps) {
  const [areaIndex, setAreaIndex] = useState(Math.floor(data.areaOptions.length / 2));
  const [packageIndex, setPackageIndex] = useState(0);

  const area = data.areaOptions[areaIndex];
  const pkg = data.packageOptions[packageIndex];

  const estimate = useMemo(() => {
    const sqFt = parseInt(area.value.replace(/[^0-9]/g, ''), 10) || 0;
    const baseLakh = (sqFt * data.baseRatePerSqFt * pkg.multiplier) / 100000;
    const low = baseLakh * 0.9;
    const high = baseLakh * 1.15;
    return `${formatLakh(low)} – ${formatLakh(high)}`;
  }, [area, pkg, data.baseRatePerSqFt]);

  return (
    <section
      id="v4-service-cost-estimator"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#FDFAF6' }}
    >
      <LuxuryGrain id="service-cost-estimator-grain" opacity={0.012} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        <div data-v4-reveal-heading>
          <V4SectionHeader
            eyebrow={data.eyebrow}
            title={data.title}
            titleItalic={data.titleItalic}
            description={data.description}
            centered
          />
        </div>

        <div
          className="rounded-3xl border p-7 md:p-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center"
          style={{ borderColor: 'rgba(160,120,80,0.18)', boxShadow: '0 20px 60px rgba(100,60,20,0.10)', background: '#F5EFE6' }}
          data-v4-reveal
        >
          <div>
            {/* Area */}
            <div className="mb-7">
              <div className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: '#9C7B68' }}>
                Carpet Area
              </div>
              <div className="flex flex-wrap gap-2">
                {data.areaOptions.map((opt, i) => (
                  <button
                    key={opt.label}
                    onClick={() => setAreaIndex(i)}
                    className="px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.06em] transition-all duration-300"
                    style={
                      i === areaIndex
                        ? { background: luxoraColors.espresso, color: '#FDFAF6' }
                        : { background: 'rgba(253,250,246,0.8)', color: '#6B4C3B', border: '1px solid rgba(160,120,80,0.22)' }
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Package */}
            <div>
              <div className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: '#9C7B68' }}>
                Package Tier
              </div>
              <div className="flex flex-wrap gap-2">
                {data.packageOptions.map((opt, i) => (
                  <button
                    key={opt.label}
                    onClick={() => setPackageIndex(i)}
                    className="px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.06em] transition-all duration-300"
                    style={
                      i === packageIndex
                        ? { background: luxoraColors.gold, color: '#1C1005' }
                        : { background: 'rgba(253,250,246,0.8)', color: '#6B4C3B', border: '1px solid rgba(160,120,80,0.22)' }
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center lg:border-l lg:pl-10" style={{ borderColor: 'rgba(201,162,39,0.25)' }}>
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: '#9C7B68' }}>
              Estimated Range
            </div>
            <div className="font-playfair italic mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: luxoraColors.espresso }}>
              {estimate}
            </div>
            <p className="text-[11px] leading-relaxed font-light mb-6 max-w-[220px] mx-auto" style={{ color: '#9C7B68' }}>
              {data.disclaimer}
            </p>
            <a
              href={data.ctaHref}
              target={/^https?:\/\//.test(data.ctaHref) ? '_blank' : undefined}
              rel={/^https?:\/\//.test(data.ctaHref) ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-[11px] tracking-[0.10em] uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: luxoraColors.gold, color: '#1C1005', boxShadow: '0 8px 28px rgba(201,162,39,0.28)' }}
            >
              {data.ctaLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
