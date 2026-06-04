'use client';

export default function MinimalTestimonials() {
  const testimonials = [
    {
      quote: "Luxora transformed our home into a sanctuary. Their attention to detail and understanding of our lifestyle was exceptional.",
      author: "Priya Mehta",
      role: "Homeowner, Mumbai",
      project: "Mumbai Penthouse",
    },
    {
      quote: "The corporate office design exceeded all expectations. It perfectly reflects our brand values and has improved team collaboration.",
      author: "Rajesh Sharma",
      role: "CEO, TechCorp India",
      project: "Delhi Headquarters",
    },
    {
      quote: "Working with Luxora was a seamless experience. They captured the essence of coastal luxury in our Goa villa perfectly.",
      author: "Sonia Verma",
      role: "Villa Owner, Goa",
      project: "Goa Coastal Retreat",
    },
  ];

  return (
    <section className="bg-luxora-cream py-24">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-px bg-luxora-gold"></div>
            <span className="mx-6 font-inter text-sm text-luxora-gold tracking-widest">CLIENT STORIES</span>
            <div className="w-16 h-px bg-luxora-gold"></div>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-light text-luxora-navy mb-8">
            Voices of
            <br />
            <span className="text-luxora-gold">Satisfaction</span>
          </h2>
          <p className="text-xl text-luxora-charcoal font-inter font-light max-w-2xl mx-auto">
            Hear from our clients about their transformative experiences with Luxora.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-12 group hover:shadow-xl transition-all duration-500">
              {/* Quote Icon */}
              <div className="text-4xl text-luxora-gold font-playfair font-light mb-8">"</div>
              
              {/* Quote */}
              <p className="text-xl text-luxora-charcoal font-inter font-light mb-10 leading-relaxed">
                {testimonial.quote}
              </p>
              
              {/* Author Info */}
              <div className="border-t border-luxora-cream pt-8">
                <div className="flex items-center mb-4">
                  {/* Avatar Placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-luxora-cream to-luxora-cream/60 mr-4"></div>
                  <div>
                    <h4 className="font-playfair text-lg text-luxora-navy">{testimonial.author}</h4>
                    <p className="font-inter text-sm text-luxora-charcoal">{testimonial.role}</p>
                  </div>
                </div>
                <div className="font-inter text-xs text-luxora-gold tracking-widest">
                  PROJECT: {testimonial.project}
                </div>
              </div>
              
              {/* Hover Effect Line */}
              <div className="h-px bg-luxora-gold w-0 group-hover:w-full transition-all duration-500 mt-8"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="p-8">
            <div className="text-5xl md:text-6xl font-playfair font-light text-luxora-navy mb-4">50+</div>
            <div className="font-inter text-sm text-luxora-charcoal tracking-widest">PROJECTS COMPLETED</div>
          </div>
          <div className="p-8">
            <div className="text-5xl md:text-6xl font-playfair font-light text-luxora-navy mb-4">10+</div>
            <div className="font-inter text-sm text-luxora-charcoal tracking-widest">YEARS EXPERIENCE</div>
          </div>
          <div className="p-8">
            <div className="text-5xl md:text-6xl font-playfair font-light text-luxora-navy mb-4">100%</div>
            <div className="font-inter text-sm text-luxora-charcoal tracking-widest">CLIENT SATISFACTION</div>
          </div>
          <div className="p-8">
            <div className="text-5xl md:text-6xl font-playfair font-light text-luxora-navy mb-4">3</div>
            <div className="font-inter text-sm text-luxora-charcoal tracking-widest">DESIGN AWARDS</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-playfair font-light text-luxora-navy mb-6">
              Begin Your Design Journey
            </h3>
            <p className="text-xl text-luxora-charcoal font-inter font-light max-w-2xl mx-auto">
              Join our community of satisfied clients and transform your space today.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="px-12 py-4 bg-luxora-gold text-luxora-navy font-inter text-sm tracking-widest hover:bg-luxora-navy hover:text-luxora-gold transition-all duration-300">
              SCHEDULE A CALL
            </button>
            <button className="px-12 py-4 border border-luxora-navy text-luxora-navy font-inter text-sm tracking-widest hover:bg-luxora-navy hover:text-white transition-all duration-300">
              VIEW CASE STUDIES
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}