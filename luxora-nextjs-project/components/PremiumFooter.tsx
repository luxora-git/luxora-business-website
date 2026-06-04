'use client';

export default function PremiumFooter() {
  return (
    <footer className="bg-luxora-navy text-white">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div>
            <div className="text-3xl font-playfair font-light tracking-wider mb-8">LUXORA</div>
            <p className="font-inter text-white/70 font-light mb-8 leading-relaxed">
              Premium interior architecture and design studio creating 
              transformative spaces that tell stories and evoke emotions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 border border-white/30 flex items-center justify-center hover:border-luxora-gold hover:text-luxora-gold transition-all">
                <span className="font-inter text-sm">IG</span>
              </a>
              <a href="#" className="w-10 h-10 border border-white/30 flex items-center justify-center hover:border-luxora-gold hover:text-luxora-gold transition-all">
                <span className="font-inter text-sm">IN</span>
              </a>
              <a href="#" className="w-10 h-10 border border-white/30 flex items-center justify-center hover:border-luxora-gold hover:text-luxora-gold transition-all">
                <span className="font-inter text-sm">FB</span>
              </a>
              <a href="#" className="w-10 h-10 border border-white/30 flex items-center justify-center hover:border-luxora-gold hover:text-luxora-gold transition-all">
                <span className="font-inter text-sm">PT</span>
              </a>
            </div>
          </div>

          {/* Studio Column */}
          <div>
            <h3 className="font-inter text-sm tracking-widest text-luxora-gold mb-8">STUDIO</h3>
            <ul className="space-y-4">
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">About</a></li>
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">Team</a></li>
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">Philosophy</a></li>
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">Careers</a></li>
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Work Column */}
          <div>
            <h3 className="font-inter text-sm tracking-widest text-luxora-gold mb-8">WORK</h3>
            <ul className="space-y-4">
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">Residential</a></li>
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">Commercial</a></li>
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">Hospitality</a></li>
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">Portfolio</a></li>
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">Case Studies</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-inter text-sm tracking-widest text-luxora-gold mb-8">SERVICES</h3>
            <ul className="space-y-4">
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">Interior Architecture</a></li>
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">Space Planning</a></li>
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">Material Selection</a></li>
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">Project Management</a></li>
              <li><a href="#" className="font-inter text-white/70 hover:text-luxora-gold transition-colors">Consultation</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-12 mb-16">
          <div className="max-w-md">
            <h3 className="font-inter text-sm tracking-widest text-luxora-gold mb-4">NEWSLETTER</h3>
            <p className="font-inter text-white/70 font-light mb-6">
              Subscribe to receive updates on our latest projects and design insights.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-luxora-gold"
              />
              <button className="px-8 py-4 bg-luxora-gold text-luxora-navy font-inter text-sm tracking-widest hover:bg-white transition-all">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-inter text-sm text-white/50 mb-4 md:mb-0">
              © 2024 Luxora Interiors. All rights reserved.
            </div>
            <div className="flex space-x-8">
              <a href="#" className="font-inter text-sm text-white/50 hover:text-luxora-gold transition-colors">Privacy Policy</a>
              <a href="#" className="font-inter text-sm text-white/50 hover:text-luxora-gold transition-colors">Terms of Service</a>
              <a href="#" className="font-inter text-sm text-white/50 hover:text-luxora-gold transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}