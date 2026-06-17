'use client';

const services = [
  {
    id: 'interior-consultancy',
    title: 'Interior Design Consultancy',
    description: 'Expert guidance from concept to execution — we study your lifestyle, preferences, and space to craft a personalised design strategy before a single wall is touched.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=85',
    number: '01',
  },
  {
    id: 'architectural-consultancy',
    title: 'Architectural Design Consultancy',
    description: 'From structural planning to façade design — our architects blend functionality with aesthetic vision to create spaces that are as thoughtfully engineered as they are beautiful.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=85',
    number: '02',
  },
  {
    id: 'interior-projects',
    title: 'Interior Design Projects',
    description: 'Full-home and room-specific interior transformations with premium materials, artisanal craftsmanship, and end-to-end project management from design to handover.',
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=900&q=85',
    number: '03',
  },
  {
    id: 'modular-products',
    title: 'Designer Modular Products',
    description: 'Bespoke modular kitchens, wardrobes, and storage systems engineered with German-grade fittings, premium quartz countertops, and intelligent organisation built for luxury living.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85',
    number: '04',
  },
  {
    id: 'home-automation',
    title: 'Home Automation',
    description: 'Seamlessly integrated smart home systems — lighting, climate, security, and entertainment — all controlled with a single touch, designed to disappear into your interiors.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=900&q=85',
    number: '05',
  },
  {
    id: 'commercial-interiors',
    title: 'Commercial & Office Interiors',
    description: 'Brand-driven workspaces, retail environments, and hospitality interiors that inspire productivity, reflect your identity, and leave a lasting impression on every visitor.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85',
    number: '06',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-[#FAF8F4]">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[#C9A227] text-xs md:text-sm font-medium tracking-[0.25em] uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-normal italic text-luxora-navy mb-4">
            Our Services
          </h2>
          <div className="w-12 h-[1px] bg-[#C9A227]/60 mx-auto mt-4 mb-5" />
          <p className="text-luxora-charcoal/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Comprehensive design solutions crafted for modern living and working.
          </p>
        </div>
      </div>

      {/* Alternating Panels */}
      <div className="flex flex-col">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={service.id}
              className={`flex flex-col md:flex-row ${!isEven ? 'md:flex-row-reverse' : ''} group`}
            >
              {/* Image Side — 55% width */}
              <div className="w-full md:w-[55%] relative h-64 sm:h-80 md:h-[420px] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-[#0D1B2A]/10 group-hover:bg-[#0D1B2A]/5 transition-all duration-500" />
              </div>

              {/* Text Side — 45% width */}
              <div
                className={`w-full md:w-[45%] flex items-center px-8 md:px-12 lg:px-16 py-10 md:py-0 
                ${isEven ? 'bg-[#0D1B2A]' : 'bg-[#FAF8F4]'}`}
              >
                <div className="max-w-sm">
                  {/* Number */}
                  <span
                    className={`font-playfair text-5xl md:text-6xl font-normal leading-none mb-6 block
                    ${isEven ? 'text-[#C9A227]/20' : 'text-[#C9A227]/15'}`}
                  >
                    {service.number}
                  </span>

                  {/* Title */}
                  <h3
                    className={`font-playfair text-2xl md:text-3xl font-normal italic leading-tight mb-4
                    ${isEven ? 'text-white' : 'text-luxora-navy'}`}
                  >
                    {service.title}
                  </h3>

                  {/* Gold divider */}
                  <div className="w-10 h-[1px] bg-[#C9A227]/60 mb-5" />

                  {/* Description */}
                  <p
                    className={`text-sm md:text-base leading-relaxed mb-8
                    ${isEven ? 'text-white/60' : 'text-luxora-charcoal/60'}`}
                  >
                    {service.description}
                  </p>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className={`inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 group/cta
                    ${isEven
                      ? 'text-[#C9A227] hover:text-white'
                      : 'text-luxora-navy hover:text-[#C9A227]'
                    }`}
                  >
                    <span>Enquire Now</span>
                    <span className="w-8 h-[1px] bg-current transition-all duration-300 group-hover/cta:w-12" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}