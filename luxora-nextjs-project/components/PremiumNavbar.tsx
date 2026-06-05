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

const megaMenuData: MegaMenuItem[] = [
  {
    label: 'Design Gallery',
    href: '#gallery',
    columns: [
      {
        title: 'By Room',
        links: [
          { label: 'Living Room', href: '#gallery', description: '1,200+ designs' },
          { label: 'Bedroom', href: '#gallery', description: '900+ designs' },
          { label: 'Kitchen', href: '#gallery', description: '800+ designs' },
          { label: 'Bathroom', href: '#gallery', description: '700+ designs' },
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
          { label: 'Dining Room', href: '#gallery', description: '500+ designs' },
          { label: 'Wardrobe', href: '#gallery', description: '600+ designs' },
          { label: 'Balcony', href: '#gallery', description: '400+ designs' },
          { label: 'Home Office', href: '#gallery', description: '350+ designs' },
        ],
      },
    ],
    featured: {
      title: 'Featured: The Artisan Residence',
      description: 'A 3,200 sq ft Mumbai home blending contemporary design with timeless elegance.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80',
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
          { label: 'Interior Design Consultancy', href: '#services', description: 'Expert guidance for your space' },
          { label: 'Architectural Consultancy', href: '#services', description: 'Structural & spatial planning' },
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
      description: 'From concept to completion — we handle everything.',
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80',
      href: '#services',
    },
  },
  {
    label: 'Products',
    href: '#products',
    columns: [
      {
        title: 'Furniture & Modular',
        links: [
          { label: 'Modular Kitchens', href: '#products', description: 'Custom-designed kitchen modules' },
          { label: 'Wardrobes', href: '#products', description: 'Bespoke storage solutions' },
          { label: 'Furniture', href: '#products', description: 'Designer furniture collection' },
        ],
      },
      {
        title: 'Technology',
        links: [
          { label: 'Home Automation', href: '#products', description: 'Smart living technology' },
          { label: 'Lighting Solutions', href: '#products', description: 'Ambient & task lighting' },
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
      title: 'New: Smart Living Collection',
      description: 'Discover our latest range of home automation products.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80',
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
      title: 'View All Projects',
      description: 'Explore our portfolio of 500+ delivered spaces.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
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
          { label: 'Cost Calculator', href: '#', description: 'Estimate your project cost' },
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
      description: 'Explore our curated collection of design ideas, trends, and expert resources.',
      image: 'https://images.unsplash.com/photo-1616046229478-2b3d0f6a5b5a?w=400&q=80',
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
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
      href: '#',
    },
  },
];

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
    }, 200);
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
      {/* Sticky Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? 'bg-white shadow-lg shadow-black/[0.04] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-8 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex-shrink-0"
          >
            <Image
              src="/logo.png"
              alt="Luxora"
              width={220}
              height={60}
              priority
              className={`transition-all duration-400 ${
                isScrolled ? 'brightness-100' : 'brightness-0 invert'
              }`}
              style={{ height: 'auto', width: 'auto', maxWidth: '180px', maxHeight: '48px' }}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {megaMenuData.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={item.href}
                  className={`px-3.5 py-3 text-[12px] tracking-[0.08em] uppercase font-medium transition-colors duration-300 whitespace-nowrap flex items-center gap-1.5 ${
                    isScrolled
                      ? 'text-luxora-navy/80 hover:text-luxora-navy'
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
                  {/* Dropdown indicator */}
                  <svg
                    className={`w-2.5 h-2.5 transition-transform duration-300 ${
                      activeMegaMenu === item.label ? 'rotate-180' : ''
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
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <a
              href="#contact"
              className={`px-7 py-3 text-[13px] tracking-[0.08em] uppercase font-semibold transition-all duration-400 ${
                isScrolled
                  ? 'bg-luxora-gold text-luxora-navy hover:bg-luxora-navy hover:text-white'
                  : 'bg-luxora-gold text-luxora-navy hover:bg-white'
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

        {/* Mega Menu Dropdown — positioned relative to nav, spans viewport width */}
        <div
          onMouseEnter={() => activeMegaMenu && handleMouseEnter(activeMegaMenu)}
          onMouseLeave={handleMouseLeave}
          className={`absolute top-full left-1/2 -translate-x-1/2 mt-0 bg-white shadow-2xl shadow-black/[0.08] border border-black/[0.04] transition-all duration-300 ${
            activeItem
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible translate-y-2 pointer-events-none'
          }`}
          style={{ maxWidth: '1280px', width: 'calc(100vw - 120px)', minHeight: '320px' }}
        >
          {activeItem && (
            <div className="grid grid-cols-[1fr_1fr_1fr_320px] min-h-[320px] max-h-[calc(100vh-120px)] overflow-y-auto">
              {/* Navigation Columns — always render 3 columns */}
              {[0, 1, 2].map((colIndex) => {
                const column = activeItem.columns[colIndex];
                if (!column) {
                  /* Populate empty column with quick links from first column */
                  const sourceCol = activeItem.columns[0];
                  return (
                    <div
                      key={`placeholder-${colIndex}`}
                      className="px-8 py-8 border-r border-black/[0.04]"
                    >
                      <div className="text-[10px] tracking-[0.15em] uppercase text-luxora-gold font-semibold mb-5">
                        Quick Links
                      </div>
                      <ul className="space-y-3">
                        {sourceCol && sourceCol.links.slice(0, 4).map((link) => (
                          <li key={link.label}>
                            <a href={link.href} className="block group">
                              <span className="text-[13px] text-luxora-navy/80 group-hover:text-luxora-gold transition-colors duration-200 font-medium leading-tight">
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
                    className="px-8 py-8 border-r border-black/[0.04]"
                  >
                    <div className="text-[10px] tracking-[0.15em] uppercase text-luxora-gold font-semibold mb-5">
                      {column.title}
                    </div>
                    <ul className="space-y-3">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="block group"
                          >
                            <span className="text-[13px] text-luxora-navy/80 group-hover:text-luxora-gold transition-colors duration-200 font-medium leading-tight">
                              {link.label}
                            </span>
                            {link.description && (
                              <span className="block text-[11px] text-luxora-navy/40 mt-0.5 font-light">
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

              {/* Featured Card (4th column) */}
              {activeItem.featured && (
                <div className="bg-luxora-cream/50 border-l border-black/[0.04] p-0">
                  <a href={activeItem.featured.href} className="block h-full group">
                    <div className="overflow-hidden">
                      <img
                        src={activeItem.featured.image}
                        alt={activeItem.featured.title}
                        className="w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-[11px] font-semibold text-luxora-navy group-hover:text-luxora-gold transition-colors duration-200 leading-tight mb-2">
                        {activeItem.featured.title}
                      </div>
                      <div className="text-[10px] text-luxora-navy/50 leading-relaxed font-light">
                        {activeItem.featured.description}
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-luxora-gold font-semibold">
                        Explore
                        <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        className={`fixed inset-0 z-40 bg-luxora-navy transition-all duration-500 lg:hidden ${
          isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="h-full overflow-y-auto pt-28 pb-12 px-8">
          <div className="max-w-lg mx-auto space-y-2">
            {megaMenuData.map((item) => (
              <div key={item.label} className="border-b border-white/[0.08]">
                <button
                  onClick={() =>
                    setExpandedMobileItem(
                      expandedMobileItem === item.label ? null : item.label
                    )
                  }
                  className="w-full flex items-center justify-between py-5 text-left"
                >
                  <span className="text-lg font-playfair text-white/90 tracking-wider">
                    {item.label}
                  </span>
                  <svg
                    className={`w-4 h-4 text-luxora-gold transition-transform duration-300 ${
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

                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-400 ${
                    expandedMobileItem === item.label
                      ? 'max-h-[800px] opacity-100 pb-6'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-6">
                    {item.columns.map((column) => (
                      <div key={column.title}>
                        <div className="text-[10px] tracking-[0.15em] uppercase text-luxora-gold font-semibold mb-3">
                          {column.title}
                        </div>
                        <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                          {column.links.map((link) => (
                            <li key={link.label}>
                              <a
                                href={link.href}
                                onClick={handleLinkClick}
                                className="block py-1.5"
                              >
                                <span className="text-sm text-white/70 hover:text-luxora-gold transition-colors duration-200">
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

                    {/* Mobile Featured Card */}
                    {item.featured && (
                      <a
                        href={item.featured.href}
                        onClick={handleLinkClick}
                        className="block bg-white/[0.04] border border-white/[0.06] p-4 mt-4 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 overflow-hidden flex-shrink-0">
                            <img
                              src={item.featured.image}
                              alt={item.featured.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-white/90 group-hover:text-luxora-gold transition-colors leading-tight mb-1">
                              {item.featured.title}
                            </div>
                            <div className="text-[10px] text-white/40 leading-relaxed">
                              {item.featured.description}
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
                className="block w-full text-center px-8 py-4 bg-luxora-gold text-luxora-navy font-semibold text-sm tracking-[0.1em] uppercase hover:bg-white transition-colors duration-300"
              >
                Book Consultation
              </a>
              <div className="mt-8 flex justify-center gap-8">
                <a href="tel:+917339993930" className="text-sm text-white/50 hover:text-luxora-gold transition-colors">
                  +91 7339993930
                </a>
                <a href="mailto:hello@luxora.com" className="text-sm text-white/50 hover:text-luxora-gold transition-colors">
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