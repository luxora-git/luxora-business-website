export default function ServicesSection() {
  const services = [
    {
      title: 'Full Home Interiors',
      description: 'Complete end-to-end interior design for your entire home with premium materials and expert craftsmanship.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      features: ['Space Planning', 'Furniture Design', 'Lighting', 'Decor'],
    },
    {
      title: 'Modular Kitchen',
      description: 'Custom modular kitchen designs with smart storage, premium finishes, and modern appliances.',
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80',
      features: ['Custom Cabinets', 'Countertops', 'Backsplash', 'Appliances'],
    },
    {
      title: 'Wardrobe Solutions',
      description: 'Bespoke wardrobe designs maximizing storage with premium laminates and accessories.',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
      features: ['Sliding Doors', 'Walk-in Closets', 'Accessories', 'Mirrors'],
    },
    {
      title: 'Commercial Interiors',
      description: 'Professional office and retail space design that enhances productivity and brand identity.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      features: ['Office Design', 'Retail Spaces', 'Restaurants', 'Reception'],
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-luxora-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-luxora-gold text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-luxora-navy mb-4">
            Our Services
          </h2>
          <p className="text-luxora-charcoal/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive interior design solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="premium-card-hover bg-white overflow-hidden group border border-luxora-gray/30"
            >
              <div className="img-zoom-container relative h-72 md:h-[26rem]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7 md:p-9">
                <h3 className="text-xl md:text-2xl font-bold text-luxora-navy mb-3 font-playfair group-hover:text-luxora-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-luxora-charcoal/60 mb-6 leading-relaxed text-sm">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-4 py-1.5 bg-luxora-cream text-luxora-navy/70 text-xs font-medium tracking-wider uppercase hover:bg-luxora-navy hover:text-white transition-colors duration-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <button className="group inline-flex items-center gap-2 text-luxora-navy hover:text-luxora-gold text-sm font-semibold tracking-[0.1em] uppercase transition-colors duration-300">
                  Learn More
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}