'use client';

import Image from 'next/image';

const services = [
  {
    id: 'residential',
    title: 'Residential Interiors',
    description: 'Full-home interior design with premium materials and artisanal craftsmanship.',
    image: '/services/residential.jpg',
    cta: 'Explore Living',
  },
  {
    id: 'commercial',
    title: 'Commercial Interiors',
    description: 'Brand-driven office and retail spaces that elevate your business identity.',
    image: '/services/commercial.jpg',
    cta: 'View Portfolio',
  },
  {
    id: 'kitchen',
    title: 'Modular Kitchens',
    description: 'Intelligent kitchen systems with seamless storage and premium finishes.',
    image: '/services/kitchen.jpg',
    cta: 'Design Kitchen',
  },
  {
    id: 'wardrobe',
    title: 'Wardrobes & Storage',
    description: 'Bespoke storage solutions from walk-in closets to custom cabinetry.',
    image: '/services/wardrobe.jpg',
    cta: 'Explore Storage',
  },
  {
    id: 'design-3d',
    title: '3D Design & Visualization',
    description: 'Photorealistic renders and immersive walkthroughs before construction begins.',
    image: '/services/design-3d.jpg',
    cta: 'See in 3D',
  },
  {
    id: 'turnkey',
    title: 'Turnkey Execution',
    description: 'End-to-end project management from concept to handover, stress-free.',
    image: '/services/turnkey.jpg',
    cta: 'Learn Process',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-24 bg-luxora-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-luxora-gold text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-3 block">
            What We Do
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-luxora-navy mb-3">
            Our Services
          </h2>
          <p className="text-luxora-charcoal/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive interior design solutions crafted for modern living and working.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white overflow-hidden cursor-pointer"
            >
              {/* Image Container - reduced height */}
              <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxora-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Gold accent line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-luxora-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>

              {/* Content */}
              <div className="px-5 py-4 md:px-6 md:py-5">
                <h3 className="font-playfair text-lg md:text-xl font-bold text-luxora-navy mb-1.5 group-hover:text-luxora-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-luxora-charcoal/50 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Learn More CTA */}
                <div className="flex items-center gap-2 text-luxora-navy/60 group-hover:text-luxora-gold text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300">
                  <span>{service.cta}</span>
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M6 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Border effect on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-luxora-gold/20 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}