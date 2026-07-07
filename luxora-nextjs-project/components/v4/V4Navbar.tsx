'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { luxoraPriceCalculatorUrl } from '@/lib/content/global/contact';
import { useConsultationModal } from './modal';
import V4MegaMenu from './nav/V4MegaMenu';
import {
  galleryMenu,
  servicesMenu,
  portfolioMenu,
  productsMenu,
  elementsMenu,
  type MegaMenuData,
} from '@/lib/content/navigation/megaMenuData';

interface NavItem {
  label: string;
  href?: string;
  menu?: MegaMenuData;
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Design Gallery', menu: galleryMenu, href: '/gallery' },
  { label: 'Interior Elements', menu: elementsMenu, href: '/elements' },
  { label: 'Services', menu: servicesMenu, href: '/services/full-home-interior-design' },
  { label: 'Products', menu: productsMenu, href: '/products' },
  { label: 'Portfolio', menu: portfolioMenu, href: '/portfolio' },
  { label: 'Price Calculator', href: luxoraPriceCalculatorUrl },
];

export default function V4Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { open: openConsultationModal } = useConsultationModal();

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMenu(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const activeItem = navItems.find((item) => item.label === activeMenu);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[65]"
        style={{ height: 0 }}
        onMouseLeave={scheduleClose}
      >
          {/* Floating capsule */}
          <div
            className="absolute left-1/2 -translate-x-1/2 inline-flex items-center"
            style={{
              top: '18px',
              height: '58px',
              maxWidth: '94vw',
              borderRadius: '999px',
              background: 'rgba(244,239,232,0.92)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              paddingLeft: '22px',
              paddingRight: '10px',
              gap: '18px',
              whiteSpace: 'nowrap',
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" style={{ width: '148px' }}>
              <Image
                src="/logo.png"
                alt="Luxora"
                width={148}
                height={40}
                priority
                style={{ height: 'auto', width: 'auto', maxWidth: '120px', maxHeight: '32px' }}
              />
            </Link>

          {/* Nav items - desktop */}
          <div className="hidden lg:flex items-center gap-1 flex-shrink-0">
            {navItems.map((item) => {
              const hasMenu = Boolean(item.menu);
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    if (hasMenu) setActiveMenu(item.label);
                  }}
                >
                  <Link
                    href={item.href ?? '#'}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-haspopup={hasMenu ? 'true' : undefined}
                    aria-expanded={hasMenu ? activeMenu === item.label : undefined}
                    onFocus={() => hasMenu && setActiveMenu(item.label)}
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      letterSpacing: '0.2px',
                      color: '#3D2B1F',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      transition: 'color 0.2s ease',
                      whiteSpace: 'nowrap',
                    }}
                    className="hover:text-[#C9A227] inline-flex items-center gap-1.5"
                  >
                    {item.label}
                    {hasMenu && (
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Book Free Consultation CTA — desktop */}
          <button
            type="button"
            onClick={openConsultationModal}
            className="hidden lg:inline-flex items-center justify-center flex-shrink-0 rounded-full font-bold uppercase transition-all duration-300 hover:-translate-y-0.5"
            style={{
              fontSize: '12px',
              letterSpacing: '0.08em',
              padding: '11px 22px',
              background: '#C9A227',
              color: '#1C1005',
              boxShadow: '0 6px 18px rgba(201,162,39,0.35)',
            }}
          >
            Book Free Consultation
          </button>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(160,120,80,0.18)] bg-[#F5EFE6]"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute left-0 top-0 block h-[1.5px] w-5 bg-[#2C1F14] transition-all duration-300 ${
                  isMobileOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-[1.5px] w-5 bg-[#2C1F14] transition-all duration-300 ${
                  isMobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] block h-[1.5px] w-5 bg-[#2C1F14] transition-all duration-300 ${
                  isMobileOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Desktop mega menu panel — centered below the capsule */}
        {activeItem && activeItem.menu && (
          <div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 z-[70]"
            style={{ top: '84px', width: 'min(92vw, 880px)' }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <V4MegaMenu data={activeItem.menu} onNavigate={() => setActiveMenu(null)} />
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${
          isMobileOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-[#2C1F14]/20 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
        <div
          className={`absolute top-28 left-5 right-5 bg-white rounded-2xl border border-[rgba(160,120,80,0.18)] shadow-[0_24px_70px_rgba(100,60,20,0.14)] p-6 max-h-[76vh] overflow-y-auto transition-all duration-300 ${
            isMobileOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              if (!item.menu) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    onClick={() => setIsMobileOpen(false)}
                    style={{ fontSize: '15px', fontWeight: 500, letterSpacing: '0.2px' }}
                    className="px-4 py-3 text-[#3D2B1F] hover:text-[#C9A227] hover:bg-[#F5EFE6] rounded-xl transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                );
              }

              const isOpen = openAccordion === item.label;
              return (
                <div key={item.label} className="border-b border-[rgba(160,120,80,0.12)] last:border-none">
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between px-4 py-3 text-[#3D2B1F] hover:text-[#C9A227] rounded-xl transition-colors duration-200"
                    style={{ fontSize: '15px', fontWeight: 500, letterSpacing: '0.2px' }}
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[560px]' : 'max-h-0'}`}>
                    <div className="px-4 pb-4 pt-1">
                      {item.href && (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block mb-3 text-[12px] font-bold tracking-[0.1em] uppercase"
                          style={{ color: '#C9A227' }}
                        >
                          {item.menu.viewAllLabel} →
                        </Link>
                      )}
                      <div className="flex flex-col gap-4">
                        {item.menu.columns.map((col) => (
                          <div key={col.heading}>
                            <div className="text-[10px] font-semibold tracking-[0.14em] uppercase mb-2" style={{ color: '#9C7B68' }}>
                              {col.heading}
                            </div>
                            <div className="flex flex-col gap-1.5">
                              {col.links.map((link) => (
                                <Link
                                  key={link.label}
                                  href={link.href}
                                  onClick={() => setIsMobileOpen(false)}
                                  className="text-[13.5px] py-1 text-[#3D2B1F] hover:text-[#C9A227] transition-colors duration-200"
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Book Free Consultation — mobile */}
            <button
              type="button"
              onClick={() => {
                setIsMobileOpen(false);
                openConsultationModal();
              }}
              className="mt-4 inline-flex items-center justify-center rounded-full font-bold uppercase transition-all duration-300"
              style={{
                fontSize: '12px',
                letterSpacing: '0.08em',
                padding: '13px 22px',
                background: '#C9A227',
                color: '#1C1005',
                boxShadow: '0 6px 18px rgba(201,162,39,0.35)',
              }}
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
