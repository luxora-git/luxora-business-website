'use client';

export default function ImmersiveCTA() {
  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-luxora-navy via-luxora-navy/90 to-luxora-navy/80">
          {/* Placeholder for immersive interior image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl text-white font-playfair font-light mb-6">
                READY TO BEGIN?
              </div>
              <div className="text-2xl text-luxora-gold font-inter font-light">
                Your Transformation Awaits
              </div>
            </div>
          </div>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-light text-white mb-8">
            Let&apos;s Create
            <br />
            <span className="text-luxora-gold">Something</span> Extraordinary
          </h2>
          
          <p className="text-xl text-white/90 font-inter font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Schedule a consultation with our design team to discuss your vision and 
            begin your journey toward a transformed space.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
            <button className="px-12 py-4 bg-luxora-gold text-luxora-navy font-inter text-sm tracking-widest hover:bg-white hover:text-luxora-navy transition-all duration-300">
              BOOK A CONSULTATION
            </button>
            <button className="px-12 py-4 bg-transparent border border-white text-white font-inter text-sm tracking-widest hover:bg-white hover:text-luxora-navy transition-all duration-300">
              VIEW PORTFOLIO
            </button>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80">
            <div className="text-center">
              <div className="font-inter text-sm tracking-widest mb-2">EMAIL</div>
              <div className="font-inter text-lg">design@luxora.com</div>
            </div>
            <div className="text-center">
              <div className="font-inter text-sm tracking-widest mb-2">PHONE</div>
              <div className="font-inter text-lg">+91 73399 93930</div>
            </div>
            <div className="text-center">
              <div className="font-inter text-sm tracking-widest mb-2">LOCATIONS</div>
              <div className="font-inter text-lg">Mumbai • Delhi • Bangalore</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-pulse">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}