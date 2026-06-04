'use client';

export default function ProjectGallery() {
  const projects = [
    {
      title: "Mumbai Skyline Penthouse",
      category: "Residential",
      description: "A 3,200 sq ft luxury apartment with panoramic city views",
      size: "Large",
      year: "2023",
    },
    {
      title: "Goa Coastal Retreat",
      category: "Villa",
      description: "Contemporary seaside villa with indoor-outdoor living",
      size: "Medium",
      year: "2022",
    },
    {
      title: "Delhi Corporate Headquarters",
      category: "Commercial",
      description: "Modern workspace design for a tech conglomerate",
      size: "Large",
      year: "2023",
    },
    {
      title: "Chennai Heritage Restaurant",
      category: "Hospitality",
      description: "Traditional-modern fusion in a heritage building",
      size: "Medium",
      year: "2022",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <div className="w-16 h-px bg-luxora-gold"></div>
            <span className="mx-6 font-inter text-sm text-luxora-gold tracking-widest">FEATURED WORK</span>
            <div className="w-16 h-px bg-luxora-gold"></div>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-light text-luxora-navy mb-8">
            Selected
            <br />
            <span className="text-luxora-gold">Projects</span>
          </h2>
          <p className="text-xl text-luxora-charcoal font-inter font-light max-w-2xl">
            A curated selection of our most transformative interior architecture projects.
          </p>
        </div>

        {/* Project Grid - Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Large Featured Project */}
          <div className="lg:col-span-2 lg:h-[600px] relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-luxora-cream via-luxora-cream/80 to-luxora-cream/60">
              {/* Placeholder for large interior image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl text-luxora-navy font-playfair font-light mb-4">
                    MUMBAI SKYLINE PENTHOUSE
                  </div>
                  <div className="text-lg text-luxora-charcoal font-inter font-light">
                    3,200 sq ft • 2023 • Residential
                  </div>
                </div>
              </div>
            </div>
            
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-12 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-white">
                  <h3 className="text-3xl font-playfair font-light mb-4">Mumbai Skyline Penthouse</h3>
                  <p className="font-inter text-lg font-light mb-6">
                    A luxury apartment with panoramic city views, featuring custom marble finishes, 
                    smart home integration, and bespoke furniture.
                  </p>
                  <button className="px-8 py-3 bg-white text-luxora-navy font-inter text-sm tracking-widest hover:bg-luxora-gold transition-all">
                    VIEW PROJECT
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Medium Project 1 */}
          <div className="h-[400px] relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-luxora-cream/90 via-luxora-cream/70 to-luxora-cream/50">
              {/* Placeholder for interior image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl text-luxora-navy font-playfair font-light mb-2">
                    GOA COASTAL RETREAT
                  </div>
                  <div className="text-sm text-luxora-charcoal font-inter font-light">
                    Villa • 2022
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-white">
                  <h3 className="text-xl font-playfair font-light mb-2">Goa Coastal Retreat</h3>
                  <p className="font-inter text-sm font-light mb-4">
                    Contemporary seaside villa with indoor-outdoor living spaces.
                  </p>
                  <button className="px-6 py-2 bg-white text-luxora-navy font-inter text-xs tracking-widest hover:bg-luxora-gold transition-all">
                    EXPLORE
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Medium Project 2 */}
          <div className="h-[400px] relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-luxora-cream/90 via-luxora-cream/70 to-luxora-cream/50">
              {/* Placeholder for interior image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl text-luxora-navy font-playfair font-light mb-2">
                    DELHI CORPORATE HQ
                  </div>
                  <div className="text-sm text-luxora-charcoal font-inter font-light">
                    Commercial • 2023
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-white">
                  <h3 className="text-xl font-playfair font-light mb-2">Delhi Corporate Headquarters</h3>
                  <p className="font-inter text-sm font-light mb-4">
                    Modern workspace design for a tech conglomerate.
                  </p>
                  <button className="px-6 py-2 bg-white text-luxora-navy font-inter text-xs tracking-widest hover:bg-luxora-gold transition-all">
                    EXPLORE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Projects */}
        <div className="mt-20 text-center">
          <button className="px-12 py-4 border border-luxora-navy text-luxora-navy font-inter text-sm tracking-widest hover:bg-luxora-navy hover:text-white transition-all duration-300">
            VIEW ALL PROJECTS
          </button>
        </div>
      </div>
    </section>
  );
}