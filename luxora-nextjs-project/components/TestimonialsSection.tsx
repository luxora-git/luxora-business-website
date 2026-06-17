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

const getInitials = (name: string) => {
  const words = name.replace('&', '').split(' ').filter(Boolean);
  if (words.length >= 2) {
    return `${words[0][0]}${words[words.length - 1][0]}`;
  }
  return words.slice(0, 2).join('').toUpperCase();
};

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-luxora-gold text-xs md:text-sm font-medium tracking-[0.25em] uppercase mb-4 block">
            Client Stories
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-normal italic text-luxora-navy mb-4">
            What Our Clients Say
          </h2>
          <div className="w-12 h-[1px] bg-[#C9A227]/60 mx-auto mt-4 mb-5" />
          <p className="text-luxora-charcoal/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Real stories from homeowners and businesses who trusted us to bring their vision to life.
          </p>
        </div>

        {/* Editorial Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group bg-white border border-[#C9A227]/15 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(13,27,42,0.1)] transition-all duration-500 flex flex-col relative"
            >
              {/* Project Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={testimonial.projectImage}
                  alt={`${testimonial.projectType} project`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="inline-block px-3 py-1.5 bg-transparent border border-[#C9A227]/80 text-[#C9A227] text-[10px] font-medium tracking-[0.18em] uppercase">
                    {testimonial.projectType}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 md:px-8 pt-6 pb-7 flex flex-col flex-1 relative">
                {/* Faded oversized quotation mark */}
                <div className="font-playfair text-[5rem] leading-none text-[#C9A227]/18 mb-3 -mt-2 select-none">
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex mb-3 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-luxora-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-luxora-charcoal/70 leading-relaxed text-sm md:text-[15px] mb-7 flex-1 font-light italic relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Client Info — Monogram + Details */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#C9A227]/12">
                  {/* Initials monogram circle */}
                  <div className="w-12 h-12 flex-shrink-0 bg-[#0D1B2A] flex items-center justify-center select-none">
                    <span className="text-[#C9A227] text-sm font-medium tracking-[0.05em]">
                      {getInitials(testimonial.name)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-luxora-navy text-sm truncate">
                      {testimonial.name}
                    </div>
                    <div className="text-luxora-charcoal/50 text-[11px] mt-0.5 truncate">
                      {testimonial.projectLocation}
                    </div>
                    <div className="text-[#C9A227] text-[9px] tracking-[0.15em] uppercase mt-0.5 font-medium truncate">
                      {testimonial.projectType}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom gold hover line */}
              <div className="h-[1px] bg-[#C9A227] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}