'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

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

const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"%3E%3Crect fill="%23f0ede8" width="600" height="400"/%3E%3Ctext fill="%23a0988c" font-family="serif" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ELuxora Design%3C/text%3E%3C/svg%3E';

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
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=85',
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
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=85',
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
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=85',
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
      description: '500+ spaces delivered across India, each one a story waiting to be told.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=85',
      href: '#projects',
    },
  },
  {
    label: 'Resources',
    href: '#',
    columns: [
      {
        title: 'Learn',
        links: [
          { label: 'Design Ideas', href: '#', description: 'Inspiration for every room' },
          { label: 'Blogs', href: '#', description: 'Design tips & trends' },
        ],
      },
      {
        title: 'Tools',
        links: [
          { label: 'Material Guides', href: '#', description: 'Quality materials explained' },
          { label: 'Cost Calculator', href: '#', description: 'Estimate your project' },
        ],
      },
      {
        title: 'Explore',
        links: [
          { label: 'E-books', href: '#', description: 'Downloadable design guides' },
          { label: 'Webinars', href: '#', description: 'Expert-led sessions' },
        ],
      },
    ],
    featured: {
      title: 'Design Inspiration Hub',
      description: 'Curated ideas, trends, and expert resources — your creative companion.',
      image: 'https://images.unsplash.com/photo-1616046229478-2b3d0f6a5b5a?w=600&q=85',
      href: '#',
    },
  },
  {
    label: 'About',
    href: '#',
    columns: [
      {
        title: 'Company',
        links: [
          { label: 'Our Story', href: '#', description: 'Who we are' },
          { label: 'Our Process', href: '#', description: 'How we work' },
          { label: 'Careers', href: '#', description: 'Join our team' },
        ],
      },
      {
        title: 'Connect',
        links: [
          { label: 'Contact', href: '#contact', description: 'Get in touch' },
          { label: 'Visit Our Studio', href: '#', description: 'Book an appointment' },
        ],
      },
      {
        title: 'Community',
        links: [
          { label: 'Press', href: '#', description: 'Media & coverage' },
          { label: 'Awards', href: '#', description: 'Recognition & milestones' },
        ],
      },
    ],
    featured: {
      title: 'Our Design Philosophy',
      description: 'Discover the passion and expertise behind every Luxora project.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=85',
      href: '#',
    },
  },
];

/** Shared fallback handler for broken images */
function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.src !== FALLBACK_IMAGE) {
    img.src = FALLBACK_IMAGE;
    img.classList.add('opacity-60');
  }
}

export default function PremiumNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const hideMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (hideMenuTimeout.current) clearTimeout(hideMenuTimeout.current);
    setActiveMegaMenu(label);
  };

  const handleMouseLeave = () => {
    hideMenuTimeout.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 250);
  };

  const handleLinkClick = () => {
    setIsMobileOpen(false);
    setExpandedMobileItem(null);
  };

  const activeItem = activeMegaMenu
    ? megaMenuData.find((item) => item.label === activeMegaMenu)
    : null;

  return (
    <>
      {/* Page overlay backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          activeMegaMenu
            ? 'opacity-100 visible bg-black/25'
            : 'opacity-0 invisible pointer-events-none'
        }`}
        onMouseEnter={() => {
          if (hideMenuTimeout.current) clearTimeout(hideMenuTimeout.current);
        }}
        onMouseLeave={handleMouseLeave}
      />

      {/* Sticky Navigation */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'top-0 bg-white/95 backdrop-blur-lg shadow-[0_4px_24px_-2px_rgba(10,31,68,0.08)] py-3 md:py-4'
            : 'top-[38px] md:top-[40px] bg-transparent py-5 md:py-6'
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-8 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Luxora"
              width={220}
              height={60}
              priority
              className={`transition-all duration-500 ${
                isScrolled ? 'brightness-100' : 'brightness-0 invert'
              }`}
              style={{ height: 'auto', width: 'auto', maxWidth: '180px', maxHeight: '48px' }}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0">
            {megaMenuData.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={item.href}
                  className={`px-4 py-3 text-[12px] tracking-[0.1em] uppercase font-medium transition-all duration-300 relative flex items-center gap-1.5 ${
                    isScrolled
                      ? 'text-luxora-navy/75 hover:text-luxora-navy'
                      : 'text-white/85 hover:text-white'
                  } ${
                    activeMegaMenu === item.label
                      ? isScrolled
                        ? 'text-luxora-navy'
                        : 'text-white'
                      : ''
                  }`}
                >
                  {item.label}
                  {/* Active gold underline */}
                  <span
                    className={`absolute -bottom-px left-4 right-4 h-[2px] bg-luxora-gold transition-all duration-300 ${
                      activeMegaMenu === item.label ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                  />
                  <svg
                    className={`w-2.5 h-2.5 transition-all duration-300 ${
                      activeMegaMenu === item.label ? 'rotate-180 text-luxora-gold' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <a
              href="#contact"
              className={`px-8 py-3 text-[12px] tracking-[0.12em] uppercase font-semibold transition-all duration-300 ${
                isScrolled
                  ? 'bg-luxora-gold text-luxora-navy hover:bg-luxora-navy hover:text-luxora-gold shadow-[0_4px_12px_-4px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_20px_-4px_rgba(212,175,55,0.3)]'
                  : 'bg-luxora-gold text-luxora-navy hover:bg-white shadow-[0_4px_12px_-4px_rgba(212,175,55,0.4)]'
              }`}
            >
              Book Consultation
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden flex flex-col gap-[5px] p-2 z-50 relative"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300 ${
                isScrolled && !isMobileOpen ? 'bg-luxora-navy' : 'bg-white'
              } ${isMobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}
            />
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300 ${
                isScrolled && !isMobileOpen ? 'bg-luxora-navy' : 'bg-white'
              } ${isMobileOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300 ${
                isScrolled && !isMobileOpen ? 'bg-luxora-navy' : 'bg-white'
              } ${isMobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}
            />
          </button>
        </div>

        {/* Mega Menu Dropdown */}
        <div
          onMouseEnter={() => activeMegaMenu && handleMouseEnter(activeMegaMenu)}
          onMouseLeave={handleMouseLeave}
          className={`absolute top-full left-1/2 -translate-x-1/2 mt-0 bg-[#faf8f5] shadow-[0_24px_80px_-16px_rgba(10,31,68,0.3),0_8px_24px_-8px_rgba(10,31,68,0.12)] border border-black/[0.06] transition-all duration-400 ${
            activeItem
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible translate-y-3 pointer-events-none'
          }`}
          style={{ maxWidth: '1280px', width: 'calc(100vw - 80px)', minHeight: '400px' }}
        >
          {/* Gold accent top border */}
          <div className="h-[3px] w-full bg-gradient-to-r from-luxora-gold via-luxora-gold/80 to-luxora-gold" />

          {activeItem && (
            <div className="grid grid-cols-[1fr_1fr_1fr_400px] min-h-[400px] max-h-[calc(100vh-120px)] overflow-y-auto">
              {/* Navigation Columns */}
              {[0, 1, 2].map((colIndex) => {
                const column = activeItem.columns[colIndex];
                if (!column) {
                  const sourceCol = activeItem.columns[0];
                  return (
                    <div
                      key={`placeholder-${colIndex}`}
                      className="px-10 py-10 border-r border-black/[0.04]"
                    >
                      <div className="text-[10px] tracking-[0.2em] uppercase text-luxora-gold font-semibold mb-6">
                        <span className="inline-block w-5 h-px bg-luxora-gold/50 align-middle mr-2" />
                        Quick Links
                      </div>
                      <ul className="space-y-1">
                        {sourceCol && sourceCol.links.slice(0, 4).map((link) => (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              className="group flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-sm transition-all duration-250 hover:bg-white/80"
                            >
                              <span className="w-0 h-[2px] bg-luxora-gold transition-all duration-250 group-hover:w-3" />
                              <span className="text-[13px] text-luxora-navy/70 group-hover:text-luxora-navy transition-all duration-250 group-hover:translate-x-1 leading-tight">
                                {link.label}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return (
                  <div
                    key={column.title}
                    className="px-10 py-10 border-r border-black/[0.04] bg-white/40"
                  >
                    {/* Gold overline + category title */}
                    <div className="text-[10px] tracking-[0.2em] uppercase text-luxora-gold font-semibold mb-6">
                      <span className="inline-block w-5 h-px bg-luxora-gold/50 align-middle mr-2" />
                      {column.title}
                    </div>
                    <ul className="space-y-1">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="group flex flex-col py-2.5 px-3 -mx-3 rounded-sm transition-all duration-250 hover:bg-white/80"
                          >
                            <span className="flex items-center gap-3">
                              <span className="w-0 h-[2px] bg-luxora-gold transition-all duration-250 group-hover:w-3" />
                              <span className="text-[13px] text-luxora-navy/70 group-hover:text-luxora-navy group-hover:translate-x-1 transition-all duration-250 font-medium leading-tight">
                                {link.label}
                              </span>
                            </span>
                            {link.description && (
                              <span className="text-[11px] text-luxora-navy/35 mt-0.5 ml-6 font-light leading-relaxed">
                                {link.description}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              {/* Featured Project Card (4th column) — luxury showcase */}
              {activeItem.featured && (
                <div className="bg-white border-l border-black/[0.06] p-0 relative overflow-hidden group/card">
                  <a href={activeItem.featured.href} className="block h-full flex flex-col">
                    {/* Image — larger, more prominent */}
                    <div className="relative overflow-hidden h-[280px] flex-shrink-0">
                      <img
                        src={activeItem.featured.image}
                        alt={activeItem.featured.title}
                        loading="lazy"
                        onError={handleImageError}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover/card:scale-105"
                      />
                      {/* Gradient overlay — deeper for better text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      {/* Featured badge */}
                      <div className="absolute top-4 left-4 bg-luxora-gold text-luxora-navy text-[9px] tracking-[0.15em] uppercase font-semibold px-3 py-1.5">
                        Featured
                      </div>
                    </div>

                    {/* Content — more breathing room */}
                    <div className="px-7 pt-6 pb-8 flex flex-col flex-1">
                      {/* Gold accent line */}
                      <div className="w-12 h-[2px] bg-luxora-gold mb-5" />

                      <h3 className="font-playfair text-[17px] leading-snug text-luxora-navy group-hover/card:text-luxora-gold transition-colors duration-300 mb-3">
                        {activeItem.featured.title}
                      </h3>

                      <p className="text-[12px] text-luxora-navy/50 leading-relaxed font-light mb-auto">
                        {activeItem.featured.description}
                      </p>

                      <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-luxora-gold font-semibold transition-all duration-300 group-hover/card:gap-4 mt-5">
                        <span>Explore Project</span>
                        <svg
                          className="w-3 h-3 transition-all duration-300 group-hover/card:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div
        className={`fixed inset-0 z-40 bg-gradient-to-b from-luxora-navy via-luxora-navy to-[#0e2852] transition-all duration-500 lg:hidden ${
          isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="h-full overflow-y-auto pt-28 pb-12 px-8">
          <div className="max-w-lg mx-auto space-y-2">
            {megaMenuData.map((item) => (
              <div key={item.label} className="border-b border-white/[0.06] last:border-b-0">
                <button
                  onClick={() =>
                    setExpandedMobileItem(
                      expandedMobileItem === item.label ? null : item.label
                    )
                  }
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="text-lg font-playfair text-white/90 tracking-wider group-hover:text-luxora-gold transition-colors duration-300">
                    {item.label}
                  </span>
                  <svg
                    className={`w-4 h-4 text-luxora-gold/70 transition-all duration-300 ${
                      expandedMobileItem === item.label ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-400 ${
                    expandedMobileItem === item.label
                      ? 'max-h-[800px] opacity-100 pb-6'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-6">
                    {item.columns.map((column) => (
                      <div key={column.title} className="pl-3 border-l border-luxora-gold/20">
                        <div className="text-[10px] tracking-[0.2em] uppercase text-luxora-gold/80 font-semibold mb-3 flex items-center gap-2">
                          <span className="w-3 h-px bg-luxora-gold/40" />
                          {column.title}
                        </div>
                        <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                          {column.links.map((link) => (
                            <li key={link.label}>
                              <a
                                href={link.href}
                                onClick={handleLinkClick}
                                className="block py-1.5 group"
                              >
                                <span className="text-sm text-white/70 group-hover:text-luxora-gold transition-colors duration-200">
                                  {link.label}
                                </span>
                                {link.description && (
                                  <span className="block text-xs text-white/30 mt-0.5 font-light">
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
                        href={item.featured.href}
                        onClick={handleLinkClick}
                        className="block bg-white/[0.04] border border-white/[0.08] rounded-sm overflow-hidden mt-4 group hover:bg-white/[0.07] transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 p-4">
                          <div className="w-20 h-20 overflow-hidden flex-shrink-0 rounded-sm">
                            <img
                              src={item.featured.image}
                              alt={item.featured.title}
                              loading="lazy"
                              onError={handleImageError}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-white/90 group-hover:text-luxora-gold transition-colors leading-tight mb-1 font-playfair">
                              {item.featured.title}
                            </div>
                            <div className="text-[10px] text-white/40 leading-relaxed mb-2">
                              {item.featured.description}
                            </div>
                            <div className="text-[9px] tracking-[0.15em] uppercase text-luxora-gold/70 font-semibold">
                              Explore →
                            </div>
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="pt-8">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="block w-full text-center px-8 py-4 bg-luxora-gold text-luxora-navy font-semibold text-sm tracking-[0.12em] uppercase hover:bg-white transition-all duration-300"
              >
                Book Consultation
              </a>
              <div className="mt-8 flex justify-center gap-8">
                <a href="tel:+917339993930" className="text-sm text-white/40 hover:text-luxora-gold transition-colors duration-200">
                  +91 7339993930
                </a>
                <a href="mailto:hello@luxora.com" className="text-sm text-white/40 hover:text-luxora-gold transition-colors duration-200">
                  hello@luxora.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}