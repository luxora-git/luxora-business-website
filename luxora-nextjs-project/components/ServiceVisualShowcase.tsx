'use client';

export default function ServiceVisualShowcase() {
  const services = [
    {
      title: "Interior Design Consultancy",
      description: "Expert guidance for your interior design projects",
      features: ["Space Planning", "Color Consultation", "Material Selection", "Furniture Layout"],
      icon: "🎨",
      imageSize: "large",
    },
    {
      title: "Architectural Design",
      description: "Complete architectural solutions for residential spaces",
      features: ["Floor Plans", "Structural Design", "3D Visualization", "Building Codes"],
      icon: "🏗️",
      imageSize: "medium",
    },
    {
      title: "Project Management",
      description: "End-to-end project execution and coordination",
      features: ["Vendor Management", "Timeline Control", "Quality Assurance", "Budget Management"],
      icon: "📋",
      imageSize: "medium",
    },
    {
      title: "Custom Furniture",
      description: "Bespoke furniture designed for your space",
      features: ["Custom Design", "Premium Materials", "Precision Crafting", "Installation"],
      icon: "🛋️",
      imageSize: "small",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center mb-6">
            <div className="w-16 h-px bg-luxora-gold"></div>
            <span className="mx-6 font-inter text-sm text-luxora-gold tracking-widest">OUR SERVICES</span>
            <div className="w-16 h-px bg-luxora-gold"></div>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-light text-luxora-navy mb-8">
            Complete
            <br />
            <span className="text-luxora-gold">Design Solutions</span>
          </h2>
          <p className="text-xl text-luxora-charcoal font-inter font-light max-w-3xl">
            From concept to completion, we provide comprehensive interior design services 
            for every aspect of your home.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {services.map((service, index) => (
            <div key={index} className="group">
              {/* Service Image */}
              <div className="h-[300px] relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-luxora-cream via-luxora-cream/80 to-luxora-cream/60">
                  {/* Placeholder for service image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{service.icon}</div>
                      <div className="text-2xl text-luxora-navy font-playfair font-light">
                        {service.title.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
              </div>

              {/* Service Content */}
              <div>
                <h3 className="text-3xl font-playfair font-light text-luxora-navy mb-4">
                  {service.title}
                </h3>
                <p className="text-lg text-luxora-charcoal font-inter font-light mb-6">
                  {service.description}
                </p>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-luxora-gold rounded-full mr-3"></div>
                      <span className="font-inter text-luxora-charcoal">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="px-8 py-3 border border-luxora-navy text-luxora-navy font-inter text-sm tracking-widest hover:bg-luxora-navy hover:text-white transition-all duration-300">
                  LEARN MORE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="bg-luxora-cream p-12 mb-24">
          <h3 className="text-3xl md:text-4xl font-playfair font-light text-luxora-navy mb-12 text-center">
            Our Design Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Understand your needs and vision" },
              { step: "02", title: "Concept Design", desc: "Create initial design concepts" },
              { step: "03", title: "Detailed Planning", desc: "Develop complete design plans" },
              { step: "04", title: "Execution", desc: "Implement design with precision" },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 border border-luxora-gold flex items-center justify-center mx-auto mb-6">
                  <span className="font-playfair text-xl text-luxora-gold">{process.step}</span>
                </div>
                <h4 className="font-playfair text-xl text-luxora-navy mb-3">{process.title}</h4>
                <p className="font-inter text-luxora-charcoal font-light">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-playfair font-light text-luxora-navy mb-6">
              Start Your Design Journey Today
            </h3>
            <p className="text-xl text-luxora-charcoal font-inter font-light max-w-2xl mx-auto">
              Book a free consultation with our design experts and take the first step 
              toward your dream home.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="px-12 py-4 bg-luxora-gold text-luxora-navy font-inter text-sm tracking-widest hover:bg-luxora-navy hover:text-luxora-gold transition-all duration-300">
              BOOK FREE CONSULTATION
            </button>
            <button className="px-12 py-4 border border-luxora-navy text-luxora-navy font-inter text-sm tracking-widest hover:bg-luxora-navy hover:text-white transition-all duration-300">
              DOWNLOAD BROCHURE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}