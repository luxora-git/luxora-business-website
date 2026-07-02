'use client';

import { useEffect, useRef, useState } from 'react';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { luxoraContact } from '@/lib/content/global/contact';
import { useConsultationModal } from '../modal';

export interface StickyConsultationCTAProps {
  /** The id of the Final CTA section — the sticky bar hides while it's in view. */
  finalCtaSectionId: string;
  /** The id of the Hero section — the sticky bar only appears after it's scrolled past. */
  heroSectionId: string;
}

/**
 * StickyConsultationCTA — a persistent, low-friction conversion path shared
 * by every service page: Call / WhatsApp / Book Consultation. Desktop: a
 * small floating pill, bottom-right. Mobile: a full-width bottom bar.
 * Appears once the visitor scrolls past the Hero, and hides automatically
 * once the Final CTA section enters the viewport so it never competes
 * with that closing moment. "Book Consultation" opens the same global
 * consultation modal used everywhere else on the site.
 */
export default function StickyConsultationCTA({ finalCtaSectionId, heroSectionId }: StickyConsultationCTAProps) {
  const { open: openConsultationModal } = useConsultationModal();
  const [pastHero, setPastHero] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);
  const observers = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    const heroEl = document.getElementById(heroSectionId);
    const finalCtaEl = document.getElementById(finalCtaSectionId);

    if (heroEl) {
      const heroObserver = new IntersectionObserver(
        ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
        { threshold: 0 }
      );
      heroObserver.observe(heroEl);
      observers.current.push(heroObserver);
    }

    if (finalCtaEl) {
      const finalCtaObserver = new IntersectionObserver(([entry]) => setFinalCtaVisible(entry.isIntersecting), {
        threshold: 0.15,
      });
      finalCtaObserver.observe(finalCtaEl);
      observers.current.push(finalCtaObserver);
    }

    return () => {
      observers.current.forEach((o) => o.disconnect());
      observers.current = [];
    };
  }, [heroSectionId, finalCtaSectionId]);

  const visible = pastHero && !finalCtaVisible;

  return (
    <>
      {/* Desktop — floating pill, bottom-right */}
      <div
        className="hidden md:flex fixed bottom-7 right-7 z-[90] items-center gap-2 p-2 rounded-full transition-all duration-500 ease-out"
        style={{
          background: 'rgba(253,250,246,0.95)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(201,162,39,0.30)',
          boxShadow: '0 16px 44px rgba(44,31,20,0.18)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        <a
          href={luxoraContact.phone.href}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 hover:bg-[rgba(44,31,20,0.06)]"
          style={{ color: luxoraColors.espresso }}
          aria-label={`Call Luxora at ${luxoraContact.phone.display}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
        <a
          href={luxoraContact.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 hover:bg-[rgba(44,31,20,0.06)]"
          style={{ color: luxoraColors.espresso }}
          aria-label="Chat with Luxora on WhatsApp"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.557 4.142 1.527 5.882L0 24l6.305-1.502A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.78 9.78 0 01-5.022-1.378l-.36-.214-3.74.89.91-3.65-.236-.376A9.787 9.787 0 012.182 12c0-5.413 4.405-9.818 9.818-9.818S21.818 6.587 21.818 12 17.413 21.818 12 21.818zm5.385-7.343c-.295-.148-1.746-.86-2.016-.959-.27-.099-.467-.148-.664.148-.197.295-.762.959-.934 1.156-.172.197-.344.222-.639.074-.295-.148-1.246-.46-2.374-1.466-.877-.782-1.47-1.748-1.642-2.043-.172-.295-.018-.455.13-.603.148-.148.33-.384.495-.576.165-.193.22-.33.33-.55.11-.22.055-.41-.04-.576-.099-.165-.882-2.122-1.208-2.847-.32-.708-.645-.612-.886-.624l-.756-.013c-.247 0-.65.092-.882.34-.232.247-.886.866-.886 2.122 0 1.256.91 2.47 1.038 2.642.128.172 1.756 2.683 4.255 3.654 2.498.972 2.498.648 2.95.608.452-.04 1.453-.594 1.658-1.168.205-.575.205-1.067.144-1.168-.06-.1-.221-.16-.516-.31z" />
          </svg>
        </a>
        <button
          type="button"
          onClick={openConsultationModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[10.5px] tracking-[0.08em] uppercase transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: luxoraColors.gold, color: '#1C1005' }}
        >
          Book Consultation
        </button>
      </div>

      {/* Mobile — full-width bottom bar */}
      <div
        className="md:hidden fixed inset-x-0 bottom-0 z-[90] flex items-stretch gap-2 px-3 transition-all duration-500 ease-out"
        style={{
          paddingTop: '10px',
          paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
          background: 'rgba(253,250,246,0.97)',
          backdropFilter: 'blur(14px)',
          borderTop: '1px solid rgba(201,162,39,0.25)',
          boxShadow: '0 -8px 30px rgba(44,31,20,0.12)',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        <a
          href={luxoraContact.phone.href}
          className="flex items-center justify-center w-12 flex-shrink-0 rounded-full"
          style={{ border: '1.5px solid rgba(44,31,20,0.18)', color: luxoraColors.espresso }}
          aria-label={`Call Luxora at ${luxoraContact.phone.display}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
        <a
          href={luxoraContact.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 flex-shrink-0 rounded-full"
          style={{ border: '1.5px solid rgba(44,31,20,0.18)', color: luxoraColors.espresso }}
          aria-label="Chat with Luxora on WhatsApp"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.557 4.142 1.527 5.882L0 24l6.305-1.502A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.78 9.78 0 01-5.022-1.378l-.36-.214-3.74.89.91-3.65-.236-.376A9.787 9.787 0 012.182 12c0-5.413 4.405-9.818 9.818-9.818S21.818 6.587 21.818 12 17.413 21.818 12 21.818zm5.385-7.343c-.295-.148-1.746-.86-2.016-.959-.27-.099-.467-.148-.664.148-.197.295-.762.959-.934 1.156-.172.197-.344.222-.639.074-.295-.148-1.246-.46-2.374-1.466-.877-.782-1.47-1.748-1.642-2.043-.172-.295-.018-.455.13-.603.148-.148.33-.384.495-.576.165-.193.22-.33.33-.55.11-.22.055-.41-.04-.576-.099-.165-.882-2.122-1.208-2.847-.32-.708-.645-.612-.886-.624l-.756-.013c-.247 0-.65.092-.882.34-.232.247-.886.866-.886 2.122 0 1.256.91 2.47 1.038 2.642.128.172 1.756 2.683 4.255 3.654 2.498.972 2.498.648 2.95.608.452-.04 1.453-.594 1.658-1.168.205-.575.205-1.067.144-1.168-.06-.1-.221-.16-.516-.31z" />
          </svg>
        </a>
        <button
          type="button"
          onClick={openConsultationModal}
          className="flex-1 inline-flex items-center justify-center rounded-full font-bold text-[12px] tracking-[0.08em] uppercase"
          style={{ background: luxoraColors.gold, color: '#1C1005' }}
        >
          Book Consultation
        </button>
      </div>
    </>
  );
}
