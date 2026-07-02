export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 overflow-hidden"
    >
      {/* Premium Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1920&q=90"
          alt="Premium interior design studio"
          className="w-full h-full object-cover"
        />
        {/* Multi-layered cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxora-navy/90 via-luxora-navy/70 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        
        {/* Subtle radial light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxora-gold/5 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        {/* Gold accent line */}
        <div className="w-16 h-[2px] bg-luxora-gold mx-auto mb-10" />

        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.15]">
          Let&apos;s Create Something<br />
          <span className="text-luxora-gold">Extraordinary</span> Together
        </h2>

        <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light">
          Your dream space is just a conversation away. Schedule a free consultation 
          with our senior designers and discover the possibilities for your home.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-luxora-gold hover:bg-white text-luxora-navy font-semibold text-sm tracking-[0.1em] uppercase transition-all duration-500"
          >
            Book Free Consultation
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="tel:+917339993930"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent hover:bg-white/10 text-white font-semibold text-sm tracking-[0.1em] uppercase border border-white/30 hover:border-white/60 transition-all duration-500"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +91 73399 93930
          </a>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-14 pt-10 border-t border-white/15">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <svg className="w-5 h-5 text-luxora-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Free Site Visit</span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <svg className="w-5 h-5 text-luxora-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>3D Design Preview</span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <svg className="w-5 h-5 text-luxora-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>No Obligation Quote</span>
          </div>
        </div>
      </div>
    </section>
  );
}