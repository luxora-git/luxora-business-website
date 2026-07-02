'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { luxoraStats } from '@/lib/content/global/stats';

interface MegaMenuItem {
  label: string;
  href: string;
  columns: {
    title: string;
    links: { label: string; href: string; description?: string }[];
  }[];
  featured?: {
    title: string;
    description: string;
    image: string;
    href: string;
  };
}

const FALLBACK_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"%3E%3Crect fill="%23f3efe8" width="600" height="400"/%3E%3Ctext fill="%239a9183" font-family="serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ELuxora Design%3C/text%3E%3C/svg%3E';

const trustItems = [
  luxoraStats.freeSiteVisitLabel,
  '3D Design Preview',
  'Transparent Pricing',
  `${luxoraStats.warrantyYears} Year Warranty`,
];

const megaMenuData: MegaMenuItem[] = [
  {
    label: 'Design Gallery',
    href: '#gallery',
    columns: [
      {
        title: 'By Room',
        links: [
          { label: 'Living Room', href: '#gallery', description: 'Curated living spaces' },
          { label: 'Bedroom', href: '#gallery', description: 'Tranquil retreats' },
          { label: 'Kitchen', href: '#gallery', description: 'Heart of the home' },
          { label: 'Bathroom', href: '#gallery', description: 'Spa-inspired sanctuaries' },
        ],
      },
      {
        title: 'By Style',
        links: [
          { label: 'Modern', href: '#gallery', description: 'Clean & contemporary' },
          { label: 'Minimalist', href: '#gallery', description: 'Less is more' },
          { label: 'Traditional', href: '#gallery', description: 'Timeless elegance' },
          { label: 'Transitional', href: '#gallery', description: 'Blended aesthetics' },
        ],
      },
      {
        title: 'Spaces',
        links: [
          { label: 'Dining Room', href: '#gallery', description: 'Memorable gatherings' },
          { label: 'Wardrobe', href: '#gallery', description: 'Bespoke organization' },
          { label: 'Balcony', href: '#gallery', description: 'Urban oases' },
          { label: 'Home Office', href: '#gallery', description: 'Purposeful productivity' },
        ],
      },
    ],
    featured: {
      title: 'The Artisan Residence',
      description: 'A 3,200 sq ft Mumbai home where contemporary design meets timeless Indian craftsmanship.',
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      href: '#gallery',
    },
  },
  {
    label: 'Services',
    href: '#services',
    columns: [
      {
        title: 'Consultancy',
        links: [
          { label: 'Interior Design', href: '#services', description: 'Expert guidance for your space' },
          { label: 'Architectural', href: '#services', description: 'Structural & spatial planning' },
        ],
      },
      {
        title: 'Execution',
        links: [
          { label: 'Full Home Interiors', href: '#services', description: 'End-to-end design & execution' },
          { label: 'Commercial Interiors', href: '#services', description: 'Office & retail spaces' },
        ],
      },
      {
        title: 'Specialized',
        links: [
          { label: 'Renovation Services', href: '#services', description: 'Transform your existing space' },
          { label: 'Space Planning', href: '#services', description: 'Optimize every square foot' },
        ],
      },
    ],
    featured: {
      title: 'End-to-End Service',
      description: 'From concept to completion — every detail, every finish, every moment.',
      image:
        'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=85',
      href: '#services',
    },
  },
  {
    label: 'Luxora Lifestyles',
    href: '#products',
    columns: [
      {
        title: 'Furniture & Modular',
        links: [
          { label: 'Modular Kitchens', href: '#products', description: 'Custom-designed modules' },
          { label: 'Wardrobes', href: '#products', description: 'Bespoke storage solutions' },
          { label: 'Furniture', href: '#products', description: 'Designer collection' },
        ],
      },
      {
        title: 'Technology',
        links: [
          { label: 'Home Automation', href: '#products', description: 'Smart living solutions' },
          { label: 'Lighting', href: '#products', description: 'Ambient & task lighting' },
        ],
      },
      {
        title: 'Collections',
        links: [
          { label: 'Premium Furniture', href: '#products', description: 'Exclusive designer pieces' },
          { label: 'Artisan Pieces', href: '#products', description: 'Handcrafted with care' },
        ],
      },
    ],
    featured: {
      title: 'Smart Living Collection',
      description: 'Discover our latest range of home automation — where design meets intelligence.',
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1200&q=85',
      href: '#products',
    },
  },
  {
    label: 'Projects',
    href: '#projects',
    columns: [
      {
        title: 'By Category',
        links: [
          { label: 'Residential', href: '#projects', description: 'Homes & apartments' },
          { label: 'Commercial', href: '#projects', description: 'Offices & retail' },
          { label: 'Hospitality', href: '#projects', description: 'Hotels & restaurants' },
        ],
      },
      {
        title: 'Featured',
        links: [
          { label: 'Skyline Penthouse', href: '#projects', description: 'Bangalore · 4,500 sq ft' },
          { label: 'Coastal Retreat', href: '#projects', description: 'Goa · 2,800 sq ft' },
        ],
      },
      {
        title: 'By Budget',
        links: [
          { label: 'Luxury', href: '#projects', description: 'Premium transformations' },
          { label: 'Mid-Range', href: '#projects', description: 'Quality & value' },
          { label: 'Value Design', href: '#projects', description: 'Affordable elegance' },
        ],
      },
    ],
    featured: {
      title: 'Portfolio Overview',
      description: `${luxoraStats.homesDelivered} spaces delivered across India, each one a story waiting to be told.`,
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      href: '#projects',
    },
  },
  {
    label: 'Resources',
    href: '#resources',
    columns: [
      {
        title: 'Learn',
        links: [
          { label: 'Design Ideas', href: '#resources', description: 'Inspiration for every room' },
          { label: 'Blogs', href: '#resources', description: 'Design tips & trends' },
        ],
      },
      {
        title: 'Tools',
        links: [
          { label: 'Material Guides', href: '#resources', description: 'Quality materials explained' },
          { label: 'Cost Calculator', href: '#resources', description: 'Estimate your project' },
        ],
      },
      {
        title: 'Explore',
        links: [
          { label: 'E-books', href: '#resources', description: 'Downloadable design guides' },
          { label: 'Webinars', href: '#resources', description: 'Expert-led sessions' },
        ],
      },
    ],
    featured: {
      title: 'Design Inspiration Hub',
      description: 'Curated ideas, trends, and expert resources — your creative companion.',
      image:
        'https://images.unsplash.com/photo-1616046229478-2b3d0f6a5b5a?auto=format&fit=crop&w=1200&q=85',
      href: '#resources',
    },
  },
  {
    label: 'About',
    href: '#about',
    columns: [
      {
        title: 'Company',
        links: [
          { label: 'Our Story', href: '#about', description: 'Who we are' },
          { label: 'Our Process', href: '#about', description: 'How we work' },
          { label: 'Careers', href: '#about', description: 'Join our team' },
        ],
      },
      {
        title: 'Connect',
        links: [
          { label: 'Contact', href: '#contact', description: 'Get in touch' },
          { label: 'Visit Our Studio', href: '#contact', description: 'Book an appointment' },
        ],
      },
      {
        title: 'Community',
        links: [
          { label: 'Press', href: '#about', description: 'Media & coverage' },
          { label: 'Awards', href: '#about', description: 'Recognition & milestones' },
        ],
      },
    ],
    featured: {
      title: 'Our Design Philosophy',
      description: 'Discover the passion and expertise behind every Luxora project.',
      image:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      href: '#about',
    },
  },
];

function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.src !== FALLBACK_IMAGE) {
    img.src = FALLBACK_IMAGE;
    img.classList.add('opacity-70');
  }
}

export default function PremiumNavbar() {
  const pathname = usePathname();
  const isV2 = pathname.startsWith('/luxury-v2');
  const isV3 = pathname.startsWith('/luxury-v3');
  const isV4 = pathname.startsWith('/luxury-v4');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [mobileNoticeIndex, setMobileNoticeIndex] = useState(0);

  const navRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const activeItem = useMemo(
    () => megaMenuData.find((item) => item.label === activeMegaMenu) || null,
    [activeMegaMenu]
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMegaMenu(null);
        setIsMobileOpen(false);
        setExpandedMobileItem(null);
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (navRef.current && !navRef.current.contains(target)) {
        setActiveMegaMenu(null);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) setExpandedMobileItem(null);
  }, [isMobileOpen]);

  useEffect(() => {
    const id = setInterval(() => {
      setMobileNoticeIndex((prev) => (prev + 1) % trustItems.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setActiveMegaMenu(null), 120);
  };

  const openMenu = (label: string) => {
    clearCloseTimer();
    setActiveMegaMenu(label);
  };

  const closeAll = () => {
    clearCloseTimer();
    setActiveMegaMenu(null);
    setIsMobileOpen(false);
    setExpandedMobileItem(null);
  };

  const toggleMobileItem = (label: string) => {
    setExpandedMobileItem((prev) => (prev === label ? null : label));
  };

  const nextNotice = () => setMobileNoticeIndex((prev) => (prev + 1) % trustItems.length);
  const V2_ANCHOR_MAP: Record<string, string> = {
    home: 'home',
    gallery: 'home',
    services: 'services',
    projects: 'projects',
    products: 'services',
    resources: 'home',
    about: 'home',
    contact: 'contact',
  };

  const V3_ANCHOR_MAP: Record<string, string> = {
    home: 'home',
    gallery: 'gallery',
    services: 'services',
    projects: 'projects',
    products: 'services',
    resources: 'home',
    about: 'home',
    contact: 'contact',
  };

  const prefixHref = (href: string) => {
    if (!isV2 && !isV3) return href;
    if (href.startsWith('#')) {
      const anchor = href.slice(1);
      if (isV2) {
        const v2Target = V2_ANCHOR_MAP[anchor];
        return v2Target ? `/luxury-v2#luxury-v2-${v2Target}` : href;
      }
      if (isV3) {
        const v3Target = V3_ANCHOR_MAP[anchor];
        return v3Target ? `/luxury-v3#v3-${v3Target}` : href;
      }
    }
    return href;
  };

  const prevNotice = () => setMobileNoticeIndex((prev) => (prev - 1 + trustItems.length) % trustItems.length);

  if (isV4) return null;

  return (
    <>
      <style jsx global>{`
        .luxora-navbar-shell {
          --luxora-navy: #0a1f44;
          --luxora-gold: #d4af37;
          --luxora-ivory: #f8f5ef;
          --luxora-ivory-2: #f2eee7;
          --luxora-border: rgba(12, 23, 42, 0.08);
          --luxora-shadow: 0 22px 70px -28px rgba(10, 31, 68, 0.28);
          --luxora-shadow-soft: 0 14px 34px -20px rgba(10, 31, 68, 0.18);
          --luxora-blur: blur(18px);
        }

        .luxora-top-strip {
          background: linear-gradient(180deg, rgba(11, 35, 75, 0.97) 0%, rgba(10, 31, 68, 0.94) 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.03);
        }

        .luxora-top-strip-text {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.76);
        }

        .luxora-mobile-strip {
          display: grid;
          grid-template-columns: 32px 1fr 32px;
          align-items: center;
          gap: 8px;
          width: 100%;
        }

        .luxora-mobile-strip-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          color: rgba(255, 255, 255, 0.55);
        }

        .luxora-mobile-strip-center {
          overflow: hidden;
          text-align: center;
        }

        .luxora-mobile-strip-slide {
          white-space: nowrap;
          animation: luxoraSlideFade 0.32s ease;
        }

        @keyframes luxoraSlideFade {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .luxora-nav-solid,
        .luxora-nav-transparent {
          will-change: transform, background-color, box-shadow;
          transform: translateZ(0);
        }

        .luxora-nav-solid {
          background: rgba(248, 245, 239, 0.95);
          backdrop-filter: var(--luxora-blur);
          -webkit-backdrop-filter: var(--luxora-blur);
          border-bottom: 1px solid rgba(12, 23, 42, 0.06);
          box-shadow: 0 10px 36px -14px rgba(10, 31, 68, 0.18);
        }

        .luxora-nav-transparent {
          background: linear-gradient(
            180deg,
            rgba(7, 18, 38, 0.22) 0%,
            rgba(7, 18, 38, 0.08) 50%,
            rgba(7, 18, 38, 0) 100%
          );
        }

        .luxora-nav-link {
          position: relative;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: color 0.22s ease, transform 0.22s ease;
        }

        .luxora-nav-link::after {
          content: '';
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 8px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--luxora-gold) 24%,
            var(--luxora-gold) 76%,
            transparent 100%
          );
          transform: scaleX(0);
          opacity: 0;
          transition: transform 240ms ease, opacity 240ms ease;
        }

        .luxora-nav-link:hover::after,
        .luxora-nav-link[data-active='true']::after {
          transform: scaleX(1);
          opacity: 1;
        }

        .luxora-cta,
        .luxora-mobile-cta {
          background: linear-gradient(180deg, #dfbf57 0%, #d4af37 100%);
          color: var(--luxora-navy);
          box-shadow: 0 14px 28px -18px rgba(212, 175, 55, 0.9);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .luxora-cta:hover,
        .luxora-mobile-cta:hover {
          transform: translateY(-1px);
        }

        .luxora-mega-backdrop {
          background: rgba(8, 18, 38, 0.18);
          backdrop-filter: blur(2px);
        }

        .luxora-mega-panel {
          background: linear-gradient(180deg, #f7f3ed 0%, #f4efe7 100%);
          border: 1px solid rgba(12, 23, 42, 0.06);
          box-shadow: 0 30px 80px -20px rgba(10, 31, 68, 0.28), 0 8px 20px -10px rgba(10, 31, 68, 0.1);
        }

        .luxora-mega-topline {
          height: 2px;
          background: linear-gradient(
            90deg,
            rgba(212, 175, 55, 0.2) 0%,
            rgba(212, 175, 55, 1) 18%,
            rgba(212, 175, 55, 0.75) 82%,
            rgba(212, 175, 55, 0.2) 100%
          );
        }

        .luxora-mega-column {
          background: rgba(255, 255, 255, 0.34);
          border-right: 1px solid rgba(12, 23, 42, 0.05);
        }

        .luxora-mega-label {
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--luxora-gold);
        }

        .luxora-feature-card {
          background: rgba(255, 255, 255, 0.96);
        }

        .luxora-feature-image {
          position: relative;
          overflow: hidden;
        }

        .luxora-feature-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8, 18, 38, 0.04) 0%, rgba(8, 18, 38, 0.12) 40%, rgba(8, 18, 38, 0.5) 100%);
          pointer-events: none;
        }

        .luxora-feature-chip {
          background: var(--luxora-gold);
          color: var(--luxora-navy);
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .luxora-mobile-overlay {
          background: linear-gradient(180deg, #fbf8f3 0%, #f2eee7 100%);
          will-change: transform, opacity;
          transform: translateZ(0);
        }

        .luxora-mobile-panel-header {
          position: sticky;
          top: 0;
          z-index: 8;
          background: rgba(251, 248, 243, 0.98);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(12, 23, 42, 0.06);
        }

        .luxora-mobile-section {
          border-bottom: 1px solid rgba(12, 23, 42, 0.06);
        }

        .luxora-mobile-title {
          color: var(--luxora-navy);
          font-size: 22px;
          line-height: 1;
        }

        .luxora-mobile-feature {
          background: rgba(255, 255, 255, 0.78);
          border: 1px solid rgba(12, 23, 42, 0.06);
          box-shadow: var(--luxora-shadow-soft);
        }

        .luxora-hamburger-line {
          transition: transform 260ms ease, opacity 200ms ease, background-color 220ms ease;
        }

        .luxora-focus:focus-visible {
          outline: 2px solid rgba(212, 175, 55, 0.9);
          outline-offset: 3px;
        }

        .luxora-accordion {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.28s ease, opacity 0.22s ease;
          opacity: 0;
        }

        .luxora-accordion > div {
          overflow: hidden;
        }

        .luxora-accordion[data-open='true'] {
          grid-template-rows: 1fr;
          opacity: 1;
        }

        @media (max-width: 767px) {
          .luxora-top-strip-text {
            font-size: 9px;
            letter-spacing: 0.14em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .luxora-navbar-shell *,
          .luxora-navbar-shell *::before,
          .luxora-navbar-shell *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div className="luxora-navbar-shell">
        <div className="fixed top-0 left-0 right-0 z-[70] hidden md:block">
          <div className="luxora-top-strip h-10">
            <div className="max-w-[90rem] mx-auto h-full px-8 md:px-12 lg:px-16 flex items-center justify-center">
              <div className="flex items-center gap-4 lg:gap-6 luxora-top-strip-text font-medium">
                {trustItems.map((item, index) => (
                  <div key={item} className="flex items-center gap-4 lg:gap-6">
                    <span>{item}</span>
                    {index !== trustItems.length - 1 && <span className="text-white/20">|</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="fixed top-0 left-0 right-0 z-[70] md:hidden">
          <div className="luxora-top-strip h-9">
            <div
              className="h-full px-3 flex items-center justify-center"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                if (touchStartX.current === null) return;
                const delta = e.changedTouches[0]?.clientX - touchStartX.current;
                if (delta > 40) prevNotice();
                if (delta < -40) nextNotice();
                touchStartX.current = null;
              }}
            >
              <div className="luxora-mobile-strip">
                <button
                  type="button"
                  onClick={prevNotice}
                  className="luxora-mobile-strip-btn luxora-focus"
                  aria-label="Previous notification"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <div className="luxora-mobile-strip-center">
                  <div key={mobileNoticeIndex} className="luxora-top-strip-text font-medium luxora-mobile-strip-slide">
                    {trustItems[mobileNoticeIndex]}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextNotice}
                  className="luxora-mobile-strip-btn luxora-focus"
                  aria-label="Next notification"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`luxora-mega-backdrop fixed inset-0 z-40 hidden lg:block transition-all duration-300 ${
            activeMegaMenu ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        />

        <nav
          ref={navRef}
          className={`fixed left-0 right-0 z-[65] transition-[background-color,box-shadow,height,transform] duration-300 ${
            isMobileOpen
              ? 'top-9 md:top-10 luxora-nav-solid'
              : `top-9 md:top-10 ${isScrolled ? 'luxora-nav-solid' : 'luxora-nav-transparent'}`
          }`}
        >
          <div className="max-w-[90rem] mx-auto px-5 sm:px-6 md:px-12 lg:px-16">
            <div
              className={`flex items-center justify-between transition-[height,padding,opacity] duration-300 ${
                isMobileOpen
                  ? 'h-[64px] md:h-[80px]'
                  : isScrolled
                    ? 'h-[64px] md:h-[80px]'
                    : 'h-[72px] md:h-[92px]'
              }`}
            >
              <a
                href={prefixHref('#home')}
                className={`flex-shrink-0 luxora-focus transition-opacity duration-300 ${
                  isMobileOpen ? 'opacity-100' : 'opacity-100'
                }`}
                onClick={closeAll}
              >
                <Image
                  src="/logo.png"
                  alt="Luxora"
                  width={220}
                  height={60}
                  priority
                  className={`transition-all duration-500 ${
                    isScrolled || isMobileOpen ? 'brightness-100' : 'brightness-0 invert'
                  }`}
                  style={{ height: 'auto', width: 'auto', maxWidth: '176px', maxHeight: '46px' }}
                />
              </a>

              <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                {megaMenuData.map((item) => {
                  const isActive = activeMegaMenu === item.label;
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => openMenu(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      <button
                        type="button"
                        aria-expanded={isActive}
                        aria-controls={`mega-menu-${item.label}`}
                        onClick={() => setActiveMegaMenu((prev) => (prev === item.label ? null : item.label))}
                        data-active={isActive ? 'true' : 'false'}
                        className={`luxora-nav-link luxora-focus flex items-center gap-1.5 px-4 xl:px-5 py-3 ${
                          isScrolled ? 'text-luxora-navy/75 hover:text-luxora-navy' : 'text-white/85 hover:text-white'
                        } ${isActive ? (isScrolled ? 'text-luxora-navy' : 'text-white') : ''}`}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-3 h-3 transition-all duration-300 ${isActive ? 'rotate-180 text-luxora-gold' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="hidden lg:flex items-center">
                <a
                  href={prefixHref('#contact')}
                  onClick={closeAll}
                  className="luxora-cta luxora-focus inline-flex items-center justify-center px-7 xl:px-8 h-11 text-[11px] xl:text-[12px] tracking-[0.14em] uppercase font-semibold"
                >
                  Book Consultation
                </a>
              </div>

              <button
                type="button"
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileOpen}
                onClick={() => {
                  if (isMobileOpen) closeAll();
                  else {
                    setIsMobileOpen(true);
                    setActiveMegaMenu(null);
                  }
                }}
                className="lg:hidden relative z-[80] w-11 h-11 flex items-center justify-center luxora-focus"
              >
                <span className="sr-only">{isMobileOpen ? 'Close menu' : 'Open menu'}</span>
                <div className="relative w-6 h-5">
                  <span
                    className={`luxora-hamburger-line absolute left-0 top-0 block h-[1.5px] w-6 ${
                      isScrolled || isMobileOpen ? 'bg-luxora-navy' : 'bg-white'
                    } ${isMobileOpen ? 'translate-y-[9px] rotate-45' : ''}`}
                  />
                  <span
                    className={`luxora-hamburger-line absolute left-0 top-[9px] block h-[1.5px] w-6 ${
                      isScrolled || isMobileOpen ? 'bg-luxora-navy' : 'bg-white'
                    } ${isMobileOpen ? 'opacity-0' : ''}`}
                  />
                  <span
                    className={`luxora-hamburger-line absolute left-0 top-[18px] block h-[1.5px] w-6 ${
                      isScrolled || isMobileOpen ? 'bg-luxora-navy' : 'bg-white'
                    } ${isMobileOpen ? '-translate-y-[9px] -rotate-45' : ''}`}
                  />
                </div>
              </button>
            </div>
          </div>

          <div
            id={activeItem ? `mega-menu-${activeItem.label}` : undefined}
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
            className={`absolute top-full left-1/2 -translate-x-1/2 hidden lg:block transition-all duration-300 ${
              activeItem ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 pointer-events-none'
            }`}
            style={{ width: 'min(1280px, calc(100vw - 64px))' }}
          >
            <div className="luxora-mega-panel overflow-hidden">
              <div className="luxora-mega-topline" />
              {activeItem && (
                <div className="grid grid-cols-[1fr_1fr_1fr_360px] min-h-[390px]">
                  {activeItem.columns.map((column) => (
                    <div key={column.title} className="luxora-mega-column px-9 py-9">
                      <div className="luxora-mega-label mb-6 flex items-center gap-3">
                        <span className="w-5 h-px bg-luxora-gold/60" />
                        {column.title}
                      </div>
                      <ul className="space-y-1">
                        {column.links.map((link) => (
                          <li key={link.label}>
                            <a
                              href={prefixHref(link.href)}
                              onClick={closeAll}
                              className="group block px-3 py-3 -mx-3 luxora-focus rounded-sm transition-colors duration-150 hover:bg-white/70"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-0 group-hover:w-3 h-px bg-luxora-gold transition-all duration-200" />
                                <span className="text-[13px] font-medium text-luxora-navy/80 group-hover:text-luxora-navy transition-colors duration-150">
                                  {link.label}
                                </span>
                              </div>
                              {link.description && (
                                <p className="mt-1 ml-6 text-[11px] leading-relaxed text-luxora-navy/45">
                                  {link.description}
                                </p>
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {activeItem.featured && (
                    <div className="luxora-feature-card flex flex-col">
                      <a href={prefixHref(activeItem.featured.href)} onClick={closeAll} className="group block h-full luxora-focus">
                        <div className="luxora-feature-image relative h-[235px]">
                          <img
                            src={activeItem.featured.image}
                            alt={activeItem.featured.title}
                            loading="lazy"
                            onError={handleImageError}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-5 left-5 px-3 py-1.5 luxora-feature-chip">Featured</div>
                        </div>
                        <div className="p-7 flex flex-col h-[calc(100%-235px)]">
                          <div className="w-12 h-px bg-luxora-gold mb-5" />
                          <h3 className="font-playfair text-[18px] leading-snug text-luxora-navy mb-3">
                            {activeItem.featured.title}
                          </h3>
                          <p className="text-[12px] leading-relaxed text-luxora-navy/48 font-light mb-auto">
                            {activeItem.featured.description}
                          </p>
                          <div className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-luxora-gold font-semibold">
                            <span>Explore Project</span>
                            <svg
                              className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>

        <div
          className={`fixed inset-0 z-[75] lg:hidden transition-opacity duration-300 ${
            isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          style={{ top: '36px' }}
        >
          <div className="absolute inset-0 bg-[rgba(8,18,38,0.18)]" onClick={closeAll} />

          <div
            className={`luxora-mobile-overlay absolute inset-x-0 top-[64px] bottom-0 transition-[transform,opacity] duration-300 ${
              isMobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
          >
            <div className="h-full overflow-y-auto">
              <div className="luxora-mobile-panel-header px-5 sm:px-6 py-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-luxora-gold font-semibold">
                  Menu
                </p>
              </div>

              <div className="px-5 sm:px-6 pb-10">
                <div className="space-y-1">
                  {megaMenuData.map((item) => {
                    const expanded = expandedMobileItem === item.label;
                    return (
                      <div key={item.label} className="luxora-mobile-section">
                        <button
                          type="button"
                          aria-expanded={expanded}
                          onClick={() => toggleMobileItem(item.label)}
                          className={`w-full flex items-center justify-between gap-4 py-5 text-left luxora-focus transition-all duration-300 ${
                            expanded
                              ? 'bg-white/55 border-b border-luxora-gold/60'
                              : 'bg-transparent border-b border-transparent'
                          }`}
                        >
                          <span className="luxora-mobile-title font-playfair">{item.label}</span>
                          <svg
                            className={`w-4 h-4 text-luxora-gold transition-transform duration-300 ${
                              expanded ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        <div className="luxora-accordion" data-open={expanded ? 'true' : 'false'}>
                          <div>
                            <div className="pt-2 pb-6 space-y-6">
                              {item.columns.map((column) => (
                                <div key={column.title} className="pl-4 ml-1 border-l border-luxora-gold/15">
                                  <div className="luxora-mega-label mb-3 flex items-center gap-2">
                                    <span className="w-3 h-px bg-luxora-gold/50" />
                                    {column.title}
                                  </div>
                                  <ul className="grid grid-cols-1 gap-y-2">
                                    {column.links.map((link) => (
                                      <li key={link.label}>
                                        <a href={prefixHref(link.href)} onClick={closeAll} className="block py-2 luxora-focus group">
                                          <span className="block text-[14px] text-luxora-navy/78 group-hover:text-luxora-navy transition-colors">
                                            {link.label}
                                          </span>
                                          {link.description && (
                                            <span className="block mt-0.5 text-[11px] text-luxora-navy/38 leading-relaxed">
                                              {link.description}
                                            </span>
                                          )}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}

                              {item.featured && (
                                <a
                                  href={prefixHref(item.featured.href)}
                                  onClick={closeAll}
                                  className="luxora-mobile-feature block overflow-hidden luxora-focus rounded-[2px]"
                                >
                                  <div className="grid grid-cols-[92px_1fr]">
                                    <div className="h-24 overflow-hidden">
                                      <img
                                        src={item.featured.image}
                                        alt={item.featured.title}
                                        loading="lazy"
                                        onError={handleImageError}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="p-4">
                                      <div className="text-[10px] uppercase tracking-[0.18em] text-luxora-gold font-semibold mb-2">
                                        Featured
                                      </div>
                                      <div className="font-playfair text-[16px] text-luxora-navy mb-1 leading-snug">
                                        {item.featured.title}
                                      </div>
                                      <div className="text-[11px] text-luxora-navy/45 leading-relaxed line-clamp-2">
                                        {item.featured.description}
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-8 mt-8 border-t border-black/[0.06] space-y-4">
                  <a
                    href={prefixHref('#contact')}
                    onClick={closeAll}
                    className="luxora-mobile-cta luxora-focus inline-flex w-full items-center justify-center h-12 text-[12px] uppercase tracking-[0.14em] font-semibold"
                  >
                    Book Consultation
                  </a>

                  <div className="grid grid-cols-1 gap-3 text-[13px] text-luxora-navy/48">
                    <a href="tel:+917339993930" className="hover:text-luxora-gold transition-colors luxora-focus">
                      +91 7339993930
                    </a>
                    <a href="mailto:hello@luxora.in" className="hover:text-luxora-gold transition-colors luxora-focus">
                      hello@luxora.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}