'use client';

import Image from 'next/image';

export default function VisualHero() {
  const roomTypes = [
    { name: "Living Rooms", count: "1,200+", color: "bg-gradient-to-br from-luxora-cream/80 to-white/80" },
    { name: "Bedrooms", count: "900+", color: "bg-gradient-to-br from-luxora-cream/80 to-white/80" },
    { name: "Kitchens", count: "800+", color: "bg-gradient-to-br from-luxora-cream/80 to-white/80" },
    { name: "Bathrooms", count: "700+", color: "bg-gradient-to-br from-luxora-cream/80 to-white/80" },
    { name: "Wardrobes", count: "600+", color: "bg-gradient-to-br from-luxora-cream/80 to-white/80" },
    { name: "Home Offices", count: "400+", color: "bg-gradient-to-br from-luxora-cream/80 to-white/80" },
  ];

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxora-cream/20 via-white to-luxora-cream/10"></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, transparent 1px, rgba(0,0,0,0.1) 1px),
                            linear-gradient(to bottom, transparent 1px, rgba(0,0,0,0.1) 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Premium Navigation */}
        <div className="flex justify-between items-center px-8 md:px-16 lg:px-24 py-12">
          <div>
            <Image
              src="/logo.png"
              alt="Luxora"
              width={220}
              height={60}
              priority
              style={{ height: 'auto', width: 'auto', maxWidth: '180px', maxHeight: '48px' }}
            />
          </div>
          <div className="hidden md:flex items-center space-x-12">
            <a href="#" className="font-inter text-sm text-luxora-charcoal/70 hover:text-luxora-gold transition-colors tracking-widest">DESIGN GALLERY</a>
            <a href="#" className="font-inter text-sm text-luxora-charcoal/70 hover:text-luxora-gold transition-colors tracking-widest">SERVICES</a>
            <a href="#" className="font-inter text-sm text-luxora-charcoal/70 hover:text-luxora-gold transition-colors tracking-widest">DESIGNERS</a>
            <button className="px-8 py-3 bg-luxora-gold text-luxora-navy font-inter text-sm tracking-widest hover:bg-luxora-navy hover:text-white transition-all duration-300 shadow-lg">
              BOOK CONSULTATION
            </button>
          </div>
          <button className="md:hidden text-luxora-charcoal">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Hero Content - Luxurious Spacing */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pb-24">
          <div className="max-w-3xl">
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-20 h-px bg-luxora-gold"></div>
                <span className="mx-8 font-inter text-sm text-luxora-gold tracking-widest">PREMIUM INTERIOR DESIGN</span>
                <div className="w-20 h-px bg-luxora-gold"></div>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-playfair font-light text-luxora-navy mb-8 leading-none">
                Design
                <br />
                <span className="text-luxora-gold">Dream Spaces</span>
              </h1>
              <p className="text-2xl text-luxora-charcoal/80 font-inter font-light mb-12 max-w-xl">
                Discover curated interior designs that transform your vision into reality.
              </p>
            </div>

            {/* Aspirational Search */}
            <div className="max-w-xl mb-20">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for living room designs, modern kitchens..."
                  className="w-full px-8 py-5 bg-white/90 backdrop-blur-sm border-2 border-luxora-cream/50 rounded-full text-luxora-charcoal focus:outline-none focus:border-luxora-gold shadow-xl"
                />
                <button className="absolute right-4 top-4 px-6 py-2 bg-luxora-gold text-luxora-navy font-inter text-sm tracking-widest rounded-full hover:bg-luxora-navy hover:text-white transition-all shadow-lg">
                  SEARCH
                </button>
              </div>
            </div>

            {/* Premium Room Types */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {roomTypes.slice(0, 4).map((room, index) => (
                <div 
                  key={index}
                  className={`${room.color} p-6 rounded-2xl cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm border border-luxora-cream/30`}
                >
                  <div className="text-xl font-playfair font-light text-luxora-navy mb-2">
                    {room.name}
                  </div>
                  <div className="text-sm text-luxora-charcoal/60 font-inter tracking-widest">
                    {room.count} designs
                  </div>
                  <div className="mt-4 text-xs text-luxora-gold font-inter">
                    EXPLORE →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Premium Stats */}
        <div className="px-8 md:px-16 lg:px-24 py-12 border-t border-luxora-cream/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="text-4xl font-playfair font-light text-luxora-navy mb-2">5,000+</div>
              <div className="font-inter text-sm text-luxora-charcoal/70 tracking-widest">DESIGN IDEAS</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-playfair font-light text-luxora-navy mb-2">1,000+</div>
              <div className="font-inter text-sm text-luxora-charcoal/70 tracking-widest">HAPPY HOMES</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-playfair font-light text-luxora-navy mb-2">50+</div>
              <div className="font-inter text-sm text-luxora-charcoal/70 tracking-widest">EXPERTS</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-playfair font-light text-luxora-navy mb-2">15</div>
              <div className="font-inter text-sm text-luxora-charcoal/70 tracking-widest">CITIES</div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-px bg-luxora-gold"></div>
          <div className="animate-bounce">
            <svg className="w-8 h-8 text-luxora-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <div className="w-8 h-px bg-luxora-gold"></div>
        </div>
      </div>
    </section>
  );
}
