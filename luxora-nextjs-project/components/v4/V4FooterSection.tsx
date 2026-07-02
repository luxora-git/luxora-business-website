'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { luxoraContact, luxoraSocialLinks, luxoraPriceCalculatorUrl } from '@/lib/content/global/contact';
import { useConsultationModal } from './modal';

const socialIcons: Record<string, React.ReactNode> = {
  Facebook: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  Instagram: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  YouTube: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  LinkedIn: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
};

const col1 = { title: 'Company',  links: ['About Us', 'Contact Us', 'Careers', 'Call Us', 'Mail Us', 'WhatsApp'] };
const col2 = { title: 'Policies', links: ['Privacy Policy', 'Terms & Conditions', 'Disclaimer', 'Refund Policy', 'Cancellation Policy', 'Shipping Policy', 'Sitemap'] };
const col3 = { title: 'Explore',  links: ['Design Gallery', 'Interior Elements', 'Products', 'Portfolio', 'Services', 'Book Free Consultation', 'Get Free Estimate'] };

/** Footer link labels that should open the global consultation modal instead of navigating. */
const MODAL_TRIGGER_LABELS = new Set(['Book Free Consultation']);

/** Footer link labels that open an external URL in a new tab. */
const EXTERNAL_HREFS: Record<string, string> = {
  'Get Free Estimate': luxoraPriceCalculatorUrl,
};

/** Every other footer link label mapped to its real internal page. */
const INTERNAL_HREFS: Record<string, string> = {
  'About Us': '/luxury-v4/about-us',
  'Contact Us': '/luxury-v4/contact-us',
  'Careers': '/luxury-v4/careers',
  'Privacy Policy': '/luxury-v4/privacy-policy',
  'Terms & Conditions': '/luxury-v4/terms-conditions',
  'Disclaimer': '/luxury-v4/disclaimer',
  'Refund Policy': '/luxury-v4/refund-policy',
  'Cancellation Policy': '/luxury-v4/cancellation-policy',
  'Shipping Policy': '/luxury-v4/shipping-policy',
  'Sitemap': '/luxury-v4/sitemap',
  'Design Gallery': '/luxury-v4/gallery',
  'Interior Elements': '/luxury-v4/elements',
  'Products': '/luxury-v4/products',
  'Portfolio': '/luxury-v4/portfolio',
  'Services': '/luxury-v4/services/full-home-interior-design',
};

/** Mobile-only collapsible link column — desktop keeps the always-open columns below. */
function FooterAccordionSection({
  title,
  links,
  isOpen,
  onToggle,
  openConsultationModal,
}: {
  title: string;
  links: string[];
  isOpen: boolean;
  onToggle: () => void;
  openConsultationModal: () => void;
}) {
  return (
    <div className="border-b" style={{ borderColor: 'rgba(180,140,95,0.18)' }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-4 text-[11px] font-bold tracking-[0.20em] uppercase"
        style={{ color: '#2C1F14' }}
      >
        {title}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[400px] pb-5' : 'max-h-0'}`}>
        <ul className="space-y-3">
          {links.map((item) => (
            <li key={item}>
              <FooterLink label={item} openConsultationModal={openConsultationModal} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FooterBrandColumn() {
  return (
    <div>
      <Link href="/luxury-v4" className="inline-block mb-6">
        <Image
          src="/logo.png"
          alt="Luxora"
          width={200}
          height={54}
          style={{ height: 'auto', width: 'auto', maxWidth: '180px', maxHeight: '46px' }}
        />
      </Link>

      <p className="text-sm font-light leading-[1.75] mb-6 max-w-[280px]" style={{ color: '#6B4C3B' }}>
        Luxora transforms ideas into beautifully curated living experiences through bespoke interiors, premium craftsmanship, and seamless execution.
      </p>

      <div className="w-12 h-px mb-6" style={{ background: 'rgba(201,162,39,0.50)' }} />

      <div className="flex gap-2.5 mb-8">
        {luxoraSocialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit Luxora on ${social.name}`}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_16px_rgba(201,162,39,0.40)]"
            style={{ background: '#C9A227', color: '#1C1005' }}
          >
            {socialIcons[social.name]}
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="text-xs flex-shrink-0" style={{ color: '#C9A227' }}>📍</span>
          <span className="text-xs font-light" style={{ color: '#9C7B68' }}>Jaipur, Rajasthan, India</span>
        </div>
        <a href={luxoraContact.phone.href} className="flex items-center gap-2.5 group">
          <span className="text-xs flex-shrink-0" style={{ color: '#C9A227' }}>📞</span>
          <span className="text-xs font-light transition-colors duration-200 group-hover:text-[#C9A227]" style={{ color: '#9C7B68' }}>
            {luxoraContact.phone.display}
          </span>
        </a>
        <a href={luxoraContact.email.href} className="flex items-center gap-2.5 group">
          <span className="text-xs flex-shrink-0" style={{ color: '#C9A227' }}>✉️</span>
          <span className="text-xs font-light transition-colors duration-200 group-hover:text-[#C9A227]" style={{ color: '#9C7B68' }}>
            {luxoraContact.email.display}
          </span>
        </a>
      </div>
    </div>
  );
}

function FooterLink({ label, openConsultationModal }: { label: string; openConsultationModal: () => void }) {
  const sharedClassName = 'text-sm font-light inline-flex items-center gap-1.5 group transition-all duration-200';
  const sharedStyle = { color: '#6B4C3B' };
  const content = (
    <>
      <span className="w-0 group-hover:w-3 h-px transition-all duration-200 flex-shrink-0" style={{ background: '#C9A227' }} />
      <span className="group-hover:translate-x-0.5 transition-transform duration-200 group-hover:text-[#C9A227]">{label}</span>
    </>
  );

  if (MODAL_TRIGGER_LABELS.has(label)) {
    return (
      <button type="button" onClick={openConsultationModal} className={sharedClassName} style={sharedStyle}>
        {content}
      </button>
    );
  }
  if (label === 'Call Us') {
    return (
      <a href={luxoraContact.phone.href} className={sharedClassName} style={sharedStyle}>
        {content}
      </a>
    );
  }
  if (label === 'Mail Us') {
    return (
      <a href={luxoraContact.email.href} className={sharedClassName} style={sharedStyle}>
        {content}
      </a>
    );
  }
  if (label === 'WhatsApp') {
    return (
      <a href={luxoraContact.whatsapp.href} target="_blank" rel="noopener noreferrer" className={sharedClassName} style={sharedStyle}>
        {content}
      </a>
    );
  }
  if (EXTERNAL_HREFS[label]) {
    return (
      <a href={EXTERNAL_HREFS[label]} target="_blank" rel="noopener noreferrer" className={sharedClassName} style={sharedStyle}>
        {content}
      </a>
    );
  }
  return (
    <Link href={INTERNAL_HREFS[label] ?? '/luxury-v4'} className={sharedClassName} style={sharedStyle}>
      {content}
    </Link>
  );
}

export default function V4FooterSection() {
  const { open: openConsultationModal } = useConsultationModal();
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  return (
    <footer
      id="v4-contact"
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, rgba(44,31,20,0.05) 0%, transparent 9%), radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 55%), #F5EDE0',
      }}
    >

      {/* ── Decorative leaf — bottom right */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          width: 'clamp(240px, 28vw, 440px)',
          height: 'clamp(320px, 38vw, 580px)',
          opacity: 0.09,
          transform: 'translate(28%, 28%)',
        }}
      >
        <svg viewBox="0 0 400 520" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <path d="M200 520 C120 420,-40 280,20 140 C55 65,140 30,200 0 C260 30,345 65,380 140 C440 280,280 420,200 520Z" stroke="#C9A96E" strokeWidth="1.3"/>
          <path d="M200 480 C150 400,30 300,60 180 C85 110,150 80,200 50 C250 80,315 110,340 180 C370 300,250 400,200 480Z" stroke="#C9A96E" strokeWidth="1.0"/>
          <path d="M200 430 C165 360,70 280,90 190 C110 135,160 105,200 80 C240 105,290 135,310 190 C330 280,235 360,200 430Z" stroke="#C9A96E" strokeWidth="0.7"/>
          <line x1="200" y1="0" x2="200" y2="520" stroke="#C9A96E" strokeWidth="0.6"/>
          <path d="M200 140 Q125 175 80 235" stroke="#C9A96E" strokeWidth="0.5" fill="none"/>
          <path d="M200 200 Q278 238 320 298" stroke="#C9A96E" strokeWidth="0.5" fill="none"/>
          <path d="M200 280 Q138 318 105 378" stroke="#C9A96E" strokeWidth="0.5" fill="none"/>
        </svg>
      </div>

      {/* ── Subtle arc lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.055]" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" fill="none">
          <path d="M-120 550 Q360 350 720 450 T1560 550" stroke="#C9A96E" strokeWidth="1.2"/>
          <path d="M-120 440 Q360 270 720 360 T1560 440" stroke="#C9A96E" strokeWidth="0.8"/>
        </svg>
      </div>

      {/* ════ MOBILE FOOTER — brand block + collapsible accordion sections ═ */}
      <div className="relative z-10 md:hidden max-w-[1400px] mx-auto px-6 pt-16 pb-4">
        <div className="mb-8">
          <FooterBrandColumn />
        </div>
        <FooterAccordionSection
          title={col1.title}
          links={col1.links}
          isOpen={openMobileSection === col1.title}
          onToggle={() => setOpenMobileSection((s) => (s === col1.title ? null : col1.title))}
          openConsultationModal={openConsultationModal}
        />
        <FooterAccordionSection
          title={col2.title}
          links={col2.links}
          isOpen={openMobileSection === col2.title}
          onToggle={() => setOpenMobileSection((s) => (s === col2.title ? null : col2.title))}
          openConsultationModal={openConsultationModal}
        />
        <FooterAccordionSection
          title={col3.title}
          links={col3.links}
          isOpen={openMobileSection === col3.title}
          onToggle={() => setOpenMobileSection((s) => (s === col3.title ? null : col3.title))}
          openConsultationModal={openConsultationModal}
        />
      </div>

      {/* ════ DESKTOP FOOTER COLUMNS ═══════════════════════════════════ */}
      <div className="relative z-10 hidden md:block max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-14">
        {/* Fixed 4-column grid — no dynamic Tailwind classes */}
        <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-10">

          {/* ── COLUMN 1: Brand */}
          <FooterBrandColumn />

          {/* ── COLUMN 2: Our Policies */}
          <div>
            <h3
              className="text-[10px] font-bold tracking-[0.20em] uppercase pb-4 mb-6"
              style={{ color: '#2C1F14', borderBottom: '1px solid rgba(180,140,95,0.18)' }}
            >
              {col1.title}
            </h3>
            <ul className="space-y-3">
              {col1.links.map((item) => (
                <li key={item}>
                  <FooterLink label={item} openConsultationModal={openConsultationModal} />
                </li>
              ))}
            </ul>
          </div>

          {/* ── COLUMN 3: Important Links */}
          <div>
            <h3
              className="text-[10px] font-bold tracking-[0.20em] uppercase pb-4 mb-6"
              style={{ color: '#2C1F14', borderBottom: '1px solid rgba(180,140,95,0.18)' }}
            >
              {col2.title}
            </h3>
            <ul className="space-y-3">
              {col2.links.map((item) => (
                <li key={item}>
                  <FooterLink label={item} openConsultationModal={openConsultationModal} />
                </li>
              ))}
            </ul>
          </div>

          {/* ── COLUMN 4: Quick Access */}
          <div>
            <h3
              className="text-[10px] font-bold tracking-[0.20em] uppercase pb-4 mb-6"
              style={{ color: '#2C1F14', borderBottom: '1px solid rgba(180,140,95,0.18)' }}
            >
              {col3.title}
            </h3>
            <ul className="space-y-3">
              {col3.links.map((item) => (
                <li key={item}>
                  <FooterLink label={item} openConsultationModal={openConsultationModal} />
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ════ BOTTOM BAR ═════════════════════════════════════════════ */}
      <div
        className="relative z-10 border-t"
        style={{ borderColor: 'rgba(180,140,95,0.14)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[11px] tracking-[0.10em]" style={{ color: '#9C7B68' }}>
            &copy; 2026 Luxora Interiors. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] tracking-[0.08em]" style={{ color: '#C9A227' }}>✦</span>
            <span className="text-[11px] font-light tracking-[0.08em]" style={{ color: '#9C7B68' }}>
              Crafting Luxury Lifestyles
            </span>
            <span className="text-[11px] tracking-[0.08em]" style={{ color: '#C9A227' }}>✦</span>
          </div>
          <div className="flex gap-6 text-[11px] tracking-[0.10em]" style={{ color: '#9C7B68' }}>
            <Link href="/luxury-v4/privacy-policy" className="hover:text-[#C9A227] transition-colors duration-200">Privacy</Link>
            <Link href="/luxury-v4/terms-conditions" className="hover:text-[#C9A227] transition-colors duration-200">Terms</Link>
            <Link href="/luxury-v4/sitemap" className="hover:text-[#C9A227] transition-colors duration-200">Sitemap</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}