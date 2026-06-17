'use client';

import Image from 'next/image';

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/luxoraInteriors',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/luxorainteriors/',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UCaDa9jYOm3vsJjdAx7xomvw',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/luxora-interiors',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const services = [
  'Interior Design Consultancy',
  'Architectural Design Consultancy',
  'Interior Design Projects',
  'Designer Modular Products',
  'Home Automation',
  'Commercial & Office Interiors',
];

const galleryLinks = [
  'Living Room Designs',
  'Bedroom Designs',
  'Kitchen Designs',
  'Bathroom Designs',
  'Wardrobe Designs',
  'Home Office Designs',
];

export default function FooterSection() {
  return (
    <footer className="bg-luxora-navy text-white border-t border-[#C9A227]/10">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* ───── Column 1: Brand ───── */}
          <div className="md:col-span-2 lg:col-span-1">
            <a href="#home" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="Luxora"
                width={220}
                height={60}
                className="brightness-0 invert"
                style={{ height: 'auto', width: 'auto', maxWidth: '200px', maxHeight: '50px' }}
              />
            </a>
            <p className="text-white/45 leading-relaxed text-sm font-light max-w-sm">
              Luxora Interiors crafts premium residential, commercial, and smart living spaces with a refined balance of luxury, function, and timeless design. From consultancy to execution, every detail is tailored to your lifestyle.
            </p>
            {/* Gold divider */}
            <div className="w-12 h-[1px] bg-[#C9A227]/40 mt-6 mb-6" />
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/12 flex items-center justify-center text-white/40 hover:text-[#C9A227] hover:border-[#C9A227]/50 transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {social.svg}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ───── Column 2: Services ───── */}
          <div>
            <h3 className="text-sm font-medium text-white/80 tracking-[0.15em] uppercase mb-8 border-b border-[#C9A227]/10 pb-3">
              Services
            </h3>
            <ul className="space-y-3.5">
              {services.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/40 hover:text-luxora-gold text-sm transition-colors duration-300 hover:translate-x-1 inline-block tracking-[0.02em]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ───── Column 3: Design Gallery ───── */}
          <div>
            <h3 className="text-sm font-medium text-white/80 tracking-[0.15em] uppercase mb-8 border-b border-[#C9A227]/10 pb-3">
              Design Gallery
            </h3>
            <ul className="space-y-3.5">
              {galleryLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/40 hover:text-luxora-gold text-sm transition-colors duration-300 hover:translate-x-1 inline-block tracking-[0.02em]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ───── Column 4: Contact ───── */}
          <div>
            <h3 className="text-sm font-medium text-white/80 tracking-[0.15em] uppercase mb-8 border-b border-[#C9A227]/10 pb-3">
              Contact
            </h3>
            <ul className="space-y-5">
              {/* Email */}
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-luxora-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium block mb-0.5">Email</span>
                  <a href="mailto:hello@luxora.in" className="text-white/70 hover:text-luxora-gold text-sm transition-colors duration-300">
                    hello@luxora.in
                  </a>
                </div>
              </li>
              {/* Phone */}
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-luxora-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium block mb-0.5">Phone</span>
                  <a href="tel:+91733993930" className="text-white/70 hover:text-luxora-gold text-sm transition-colors duration-300">
                    +91 73399 93930
                  </a>
                </div>
              </li>
              {/* Location */}
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-luxora-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium block mb-0.5">Location</span>
                  <span className="text-white/70 text-sm leading-relaxed">
                    2nd Floor, Shri Gulab Market, Jaipur
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#C9A227]/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs tracking-wider">
            &copy; 2026 Luxora Interiors. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-xs text-white/30 tracking-wider">
            <a href="#" className="hover:text-luxora-gold transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-luxora-gold transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-luxora-gold transition-colors duration-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}