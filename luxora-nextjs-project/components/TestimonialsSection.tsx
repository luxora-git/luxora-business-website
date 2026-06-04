const testimonials = [
  {
    name: 'Priya & Rahul Mehta',
    location: 'Mumbai',
    projectType: 'Full Home Interiors · 3BHK',
    projectLocation: 'Worli, Mumbai',
    quote: 'Luxora transformed our 3BHK apartment into a stunning home. The modular kitchen and wardrobes are exactly what we dreamed of. Professional team, on-time delivery!',
    rating: 5,
    clientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    projectImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  },
  {
    name: 'Vikram Sharma',
    location: 'Bangalore',
    projectType: 'Luxury Villa · 4,500 sq ft',
    projectLocation: 'Whitefield, Bangalore',
    quote: 'We got our entire villa designed by Luxora. The attention to detail, material quality, and design aesthetics exceeded our expectations. Highly recommended.',
    rating: 5,
    clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    projectImage: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80',
  },
  {
    name: 'Anita & Arjun Desai',
    location: 'Delhi',
    projectType: 'Commercial Office · 5,000 sq ft',
    projectLocation: 'Gurugram, NCR',
    quote: 'Our office renovation was completed in just 45 days. The team understood our brand identity and created a workspace that our employees love coming to.',
    rating: 5,
    clientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    projectImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-luxora-gold text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4 block">
            Client Stories
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-luxora-navy mb-4">
            What Our Clients Say
          </h2>
          <p className="text-luxora-charcoal/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Real stories from homeowners and businesses who trusted us to bring their vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="premium-card-hover bg-white border border-luxora-gray/50 flex flex-col"
            >
              {/* Project Image */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={testimonial.projectImage}
                  alt={`${testimonial.projectType} project`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="px-3 py-1.5 bg-luxora-gold/90 backdrop-blur-sm text-luxora-navy text-[10px] font-semibold tracking-[0.15em] uppercase">
                    {testimonial.projectType}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-luxora-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-luxora-charcoal/70 leading-relaxed text-sm mb-6 flex-1 font-light italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-luxora-gray/50">
                  <div className="relative">
                    <img
                      src={testimonial.clientImage}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-luxora-gold/30"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-luxora-gold rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-luxora-navy" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-luxora-navy text-sm">{testimonial.name}</div>
                    <div className="text-luxora-charcoal/50 text-xs mt-0.5">{testimonial.projectLocation}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}