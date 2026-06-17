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
    <section id="projects" className="py-20 md:py-28 bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-luxora-gold text-xs md:text-sm font-medium tracking-[0.25em] uppercase mb-4 block">
            Our Portfolio
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-normal italic text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-12 h-[1px] bg-[#C9A227]/60 mx-auto mt-4 mb-5" />
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            A curated selection of our finest work across residential and commercial spaces.
          </p>
        </div>

        {/* Desktop — Equal 2x2 Grid */}
        <div className="hidden md:grid grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group cursor-pointer relative overflow-hidden"
              style={{ height: '460px' }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/85 transition-all duration-500" />
              <div className="absolute top-5 left-5 z-10">
                <span className="px-3 py-1.5 bg-transparent border border-[#C9A227]/70 text-[#C9A227] text-[10px] tracking-[0.2em] uppercase font-medium">
                  {project.type}
                </span>
              </div>
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#C9A227]/0 group-hover:border-[#C9A227]/60 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-3.5 h-3.5 text-[#C9A227]" fill="currentColor" viewBox="0 0 14 14">
                    <path d="M7 1C4.24 1 2 3.24 2 6C2 9.75 7 13 7 13C7 13 12 9.75 12 6C12 3.24 9.76 1 7 1ZM7 7.75C6.04 7.75 5.25 6.96 5.25 6C5.25 5.04 6.04 4.25 7 4.25C7.96 4.25 8.75 5.04 8.75 6C8.75 6.96 7.96 7.75 7 7.75Z" />
                  </svg>
                  <span className="text-[#C9A227] text-xs tracking-[0.15em] uppercase font-medium">
                    {project.location}
                  </span>
                </div>
                <h3 className="font-playfair text-2xl md:text-3xl font-normal italic text-white mb-4 group-hover:text-[#C9A227] transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex items-center gap-5 text-white/60 text-sm">
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
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C9A227] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        {/* Mobile — Single column */}
        <div className="flex flex-col md:hidden gap-4">
          {projects.map((project) => (
            <div key={project.title} className="group cursor-pointer relative overflow-hidden h-72">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#C9A227]/0 group-hover:border-[#C9A227]/60 transition-all duration-500 z-10" />

              <div className="absolute top-5 left-5">
                <span className="bg-transparent border border-[#C9A227]/70 text-[#C9A227] px-3 py-1.5 text-[10px] tracking-[0.2em] font-medium uppercase">
                  {project.type}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-4 mb-3">
                  <svg className="w-3.5 h-3.5 text-luxora-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-luxora-gold text-sm tracking-[0.1em] uppercase">
                    {project.location}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-normal italic text-white font-playfair mb-4 group-hover:text-luxora-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex items-center gap-5 text-white/55 text-sm">
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

              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C9A227] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-10 py-4 border border-[#C9A227]/60 text-[#C9A227] font-medium text-sm tracking-[0.15em] uppercase hover:bg-[#C9A227] hover:text-[#0D1B2A] transition-all duration-500"
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