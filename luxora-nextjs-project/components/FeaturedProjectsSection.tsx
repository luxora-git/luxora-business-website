const projects = [
  {
    title: 'The Artisan Residence',
    location: 'Mumbai, Maharashtra',
    type: 'Residential',
    size: '3,200 sq ft',
    duration: '90 Days',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    title: 'Skyline Penthouse',
    location: 'Bangalore, Karnataka',
    type: 'Residential',
    size: '4,500 sq ft',
    duration: '120 Days',
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80',
  },
  {
    title: 'The Executive Suite',
    location: 'Delhi, NCR',
    type: 'Commercial',
    size: '5,000 sq ft',
    duration: '60 Days',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
  },
  {
    title: 'Coastal Retreat',
    location: 'Goa',
    type: 'Residential',
    size: '2,800 sq ft',
    duration: '75 Days',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
  },
];

export default function FeaturedProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-28 bg-luxora-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-luxora-gold text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4 block">
            Our Portfolio
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-luxora-navy mb-4">
            Featured Projects
          </h2>
          <p className="text-luxora-charcoal/60 text-lg max-w-2xl mx-auto leading-relaxed">
            A curated selection of our finest work across residential and commercial spaces.
          </p>
        </div>

        {/* Project Grid - Larger Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="premium-card-hover group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-72 sm:h-80 md:h-96 lg:h-[28rem] img-zoom-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Floating Type Badge */}
                <div className="absolute top-5 left-5">
                  <span className="px-4 py-2 bg-luxora-gold text-luxora-navy text-xs font-semibold tracking-[0.15em] uppercase">
                    {project.type}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-luxora-gold text-sm tracking-[0.1em] uppercase">
                      {project.location}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-playfair mb-4 group-hover:text-luxora-gold transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-5 text-white/70 text-sm">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      {project.size}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {project.duration}
                    </span>
                  </div>
                </div>

                {/* Hover indicator line */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-luxora-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-10 py-4 border-2 border-luxora-navy text-luxora-navy font-semibold text-sm tracking-[0.1em] uppercase hover:bg-luxora-navy hover:text-white transition-all duration-500"
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}