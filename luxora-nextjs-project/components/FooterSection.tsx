'use client';

export default function FooterSection() {
  return (
    <footer className="bg-luxora-navy text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">
          {/* Brand - Wider */}
          <div className="lg:col-span-2">
            <a href="#home" className="font-playfair text-3xl md:text-4xl font-bold tracking-wider inline-block mb-6">
              <span className="text-luxora-gold">LUX</span>ORA
            </a>
            <p className="text-white/45 leading-relaxed mb-8 text-sm max-w-sm font-light">
              Premium interior design studio transforming homes across India with timeless elegance, impeccable craftsmanship, and personalized service since 2009.
            </p>
            <div className="flex gap-3">
              {['FB', 'IG', 'YT', 'LI'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 border border-white/10 hover:border-luxora-gold hover:bg-luxora-gold flex items-center justify-center transition-all duration-500 group"
                >
                  <span className="text-xs text-white/40 group-hover:text-luxora-navy font-semibold transition-colors duration-500">
                    {social}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-[0.15em] uppercase mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {['Full Home Interiors', 'Modular Kitchen', 'Wardrobe Solutions', 'Commercial Interiors', '3D Design'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/45 hover:text-luxora-gold text-sm transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Design Gallery */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-[0.15em] uppercase mb-6">
              Inspiration
            </h3>
            <ul className="space-y-3">
              {['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Home Office'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/45 hover:text-luxora-gold text-sm transition-colors duration-300"
                  >
                    {item} Designs
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-[0.15em] uppercase mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/45 text-sm">
                <svg className="w-4 h-4 text-luxora-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="leading-relaxed">
                  Mumbai · Delhi · Bangalore<br />Pune · Hyderabad · Chennai
                </span>
              </li>
              <li className="flex items-center gap-3 text-white/45 text-sm">
                <svg className="w-4 h-4 text-luxora-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919876543210" className="hover:text-luxora-gold transition-colors duration-300">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/45 text-sm">
                <svg className="w-4 h-4 text-luxora-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hello@luxora.com" className="hover:text-luxora-gold transition-colors duration-300">
                  hello@luxora.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Luxora Interiors &mdash; All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-white/25 tracking-wider">
            <a href="#" className="hover:text-luxora-gold transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-luxora-gold transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-luxora-gold transition-colors duration-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}