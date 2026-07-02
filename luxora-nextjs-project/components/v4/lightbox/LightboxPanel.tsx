'use client';

import { useState } from 'react';
import Link from 'next/link';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { luxoraPriceCalculatorUrl } from '@/lib/content/global/contact';
import { useConsultationModal } from '../modal';
import type { LightboxFaqItem, LightboxPanelContent, LightboxVariant } from './types';

const WHY_CHOOSE_LUXORA = ['Custom Designs', 'Premium Materials', 'Expert Designers', 'Transparent Pricing', 'End-to-End Execution'];

const VARIANT_LABEL: Record<LightboxVariant, string> = {
  design: 'Design',
  portfolio: 'Completed Project',
  service: 'Service',
  product: 'Product',
  generic: 'Luxora',
};

function defaultFaqs(variant: LightboxVariant, title: string): LightboxFaqItem[] {
  const subject =
    variant === 'service' ? 'this service' : variant === 'portfolio' ? 'a project like this' : variant === 'product' ? 'this product' : 'this design';
  return [
    {
      question: `Can ${subject} be customised?`,
      answer:
        'Yes — every piece of work we show is real Luxora work, a starting point rather than a fixed template. Our design team adapts the layout, materials and budget to your exact space.',
    },
    {
      question: 'Can I use this style in a 2BHK or smaller home?',
      answer: 'Absolutely. The palette, materials and detailing shown here translate to any room size — our design team will scale the layout to fit your space.',
    },
    {
      question: 'What is the estimated budget?',
      answer: 'Use "Get Free Estimate" below for a same-day budget range, or book a free consultation for a detailed quote based on your exact requirements.',
    },
    {
      question: 'How long will execution take?',
      answer: 'Most single-room work is delivered in 2–3 weeks; full-home projects typically take 8–10 weeks depending on scale.',
    },
    {
      question: 'How do I get started?',
      answer: `Book a free consultation — our design team will review your space and ${title} within one business day.`,
    },
  ];
}

function ShareIcon() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path strokeLinecap="round" d="M8.2 10.7l7.6-4.4M8.2 13.3l7.6 4.4" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 14.5l5-5M11 8l1.2-1.2a3 3 0 114.2 4.2L15 12M13 16l-1.2 1.2a3 3 0 11-4.2-4.2L9 12" />
    </svg>
  );
}
function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg className="w-[18px] h-[18px]" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20s-7-4.35-9.5-8.5C.8 8.2 2.6 5 6 5c2 0 3.3 1 4 2 0.7-1 2-2 4-2 3.4 0 5.2 3.2 3.5 6.5C19 15.65 12 20 12 20z" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" />
    </svg>
  );
}

export interface LightboxPanelProps {
  content: LightboxPanelContent;
  onClose: () => void;
}

/**
 * LightboxPanel — the right-hand editorial pane. Contextual meta and
 * description change per caller; everything below (Why Choose Luxora, the
 * Estimate + Consultation cards, Related links, FAQ) is the fixed, shared
 * closing sequence every variant renders identically.
 */
export default function LightboxPanel({ content, onClose }: LightboxPanelProps) {
  const { open: openConsultation } = useConsultationModal();
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = content.faqs && content.faqs.length > 0 ? content.faqs : defaultFaqs(content.variant, content.title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: content.title, url: window.location.href });
      } catch {
        /* user cancelled the native share sheet */
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="relative h-full flex flex-col" style={{ background: luxoraColors.ivory }}>
      <div
        className="flex items-center justify-between px-6 md:px-8 pt-6 pb-4 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(160,120,80,0.14)' }}
      >
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[rgba(201,162,39,0.1)]"
            style={{ color: luxoraColors.softBrown }}
          >
            <ShareIcon />
          </button>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy link"
            className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[rgba(201,162,39,0.1)]"
            style={{ color: luxoraColors.softBrown }}
          >
            <LinkIcon />
            {copied && (
              <span
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-wide uppercase px-2 py-1 rounded-md whitespace-nowrap"
                style={{ background: luxoraColors.espresso, color: luxoraColors.ivory }}
              >
                Copied
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setFavorited((f) => !f)}
            aria-label="Save to favourites"
            aria-pressed={favorited}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[rgba(201,162,39,0.1)]"
            style={{ color: favorited ? luxoraColors.gold : luxoraColors.softBrown }}
          >
            <HeartIcon filled={favorited} />
          </button>
          <button
            type="button"
            disabled
            title="Coming soon"
            aria-label="Download PDF (coming soon)"
            className="w-9 h-9 rounded-full flex items-center justify-center opacity-40 cursor-not-allowed"
            style={{ color: luxoraColors.softBrown }}
          >
            <DownloadIcon />
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="w-9 h-9 rounded-full flex items-center justify-center text-lg transition-colors duration-300 hover:bg-[rgba(201,162,39,0.1)]"
          style={{ color: luxoraColors.espresso }}
        >
          ✕
        </button>
      </div>

      <div
        className="flex-1 min-h-0 overflow-y-auto px-6 md:px-8 py-7"
        data-lenis-prevent
        style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
      >
        <span className="text-[10px] font-semibold tracking-[0.24em] uppercase mb-3 block" style={{ color: luxoraColors.gold }}>
          {content.eyebrow ?? VARIANT_LABEL[content.variant]}
        </span>
        <h2
          className="font-playfair font-normal leading-[1.15] mb-5"
          style={{ fontSize: 'clamp(1.5rem, 2vw, 1.9rem)', color: luxoraColors.espresso }}
        >
          {content.title}
        </h2>

        {content.meta && content.meta.length > 0 && (
          <div className="grid grid-cols-2 gap-x-5 gap-y-4 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(160,120,80,0.14)' }}>
            {content.meta.map((item) => (
              <div key={item.label}>
                <div className="text-[9px] font-semibold tracking-[0.16em] uppercase mb-1.5" style={{ color: luxoraColors.gold }}>
                  {item.label}
                </div>
                <div className="font-playfair text-[14px] leading-snug" style={{ color: luxoraColors.espresso }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {content.description && (
          <p className="text-[14px] leading-relaxed font-light mb-8" style={{ color: luxoraColors.softBrown }}>
            {content.description}
          </p>
        )}

        <div className="mb-8">
          <h3 className="font-playfair italic text-[1.05rem] mb-4" style={{ color: luxoraColors.espresso }}>
            Why Choose Luxora
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WHY_CHOOSE_LUXORA.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[13px]" style={{ color: luxoraColors.espresso }}>
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(201,162,39,0.12)', color: luxoraColors.gold }}
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {content.relatedLinks && content.relatedLinks.length > 0 && (
          <div className="mb-8">
            <h3 className="font-playfair italic text-[1.05rem] mb-4" style={{ color: luxoraColors.espresso }}>
              {content.relatedTitle ?? 'Related'}
            </h3>
            <div className="flex flex-col gap-2.5">
              {content.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-colors duration-300 hover:bg-[rgba(201,162,39,0.08)]"
                  style={{ border: '1px solid rgba(160,120,80,0.16)' }}
                >
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium truncate" style={{ color: luxoraColors.espresso }}>
                      {link.label}
                    </div>
                    {link.sublabel && (
                      <div className="text-[11px] font-light" style={{ color: luxoraColors.softBrown }}>
                        {link.sublabel}
                      </div>
                    )}
                  </div>
                  <span className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" style={{ color: luxoraColors.gold }}>
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="font-playfair italic text-[1.05rem] mb-4" style={{ color: luxoraColors.espresso }}>
            Frequently Asked
          </h3>
          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={faq.question} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(160,120,80,0.16)' }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
                  >
                    <span className="text-[13px] font-medium" style={{ color: luxoraColors.espresso }}>
                      {faq.question}
                    </span>
                    <span
                      className="flex-shrink-0 transition-transform duration-300 text-base leading-none"
                      style={{ color: luxoraColors.gold, transform: isOpen ? 'rotate(45deg)' : 'none' }}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <p className="px-4 pb-4 text-[12.5px] leading-relaxed font-light" style={{ color: luxoraColors.softBrown }}>
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pinned CTA footer — outside the scroll area so the two conversion actions are always visible without scrolling. */}
      <div
        className="flex-shrink-0 px-6 md:px-8 py-5 flex flex-col gap-3"
        style={{ borderTop: '1px solid rgba(160,120,80,0.14)', background: luxoraColors.ivory }}
      >
        <button
          type="button"
          onClick={openConsultation}
          className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-full font-bold text-[12px] tracking-[0.08em] uppercase transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: luxoraColors.gold, color: '#1C1005' }}
        >
          Book Free Consultation
        </button>
        <a
          href={luxoraPriceCalculatorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-full font-bold text-[12px] tracking-[0.08em] uppercase transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: 'transparent', color: luxoraColors.gold, border: `1px solid ${luxoraColors.gold}` }}
        >
          Get Free Estimate
        </a>
      </div>
    </div>
  );
}
