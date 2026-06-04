'use client';

export default function DesignGalleryShowcase() {
  const roomCategories = [
    {
      title: "Living Rooms",
      description: "Create welcoming spaces for family and guests",
      count: "1,200+ Designs",
      imageSize: "large",
    },
    {
      title: "Bedrooms",
      description: "Design peaceful retreats for rest and relaxation",
      count: "900+ Designs",
      imageSize: "medium",
    },
    {
      title: "Kitchens",
      description: "Modern, functional, and beautiful kitchen spaces",
      count: "800+ Designs",
      imageSize: "medium",
    },
    {
      title: "Wardrobes",
      description: "Custom storage solutions with premium finishes",
      count: "600+ Designs",
      imageSize: "small",
    },
    {
      title: "Bathrooms",
      description: "Luxury bathrooms with spa-like experiences",
      count: "700+ Designs",
      imageSize: "small",
    },
    {
      title: "Home Offices",
      description: "Productive workspaces with elegant design",
      count: "400+ Designs",
      imageSize: "small",
    },
    {
      title: "Balconies",
      description: "Transform outdoor spaces into relaxing retreats",
      count: "300+ Designs",
      imageSize: "small",
    },
    {
      title: "Pooja Rooms",
      description: "Sacred spaces with traditional and modern designs",
      count: "500+ Designs",
      imageSize: "small",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="w-16 h-px bg-luxora-gold"></div>
            <span className="mx-6 font-inter text-sm text-luxora-gold tracking-widest">DESIGN GALLERY</span>
            <div className="w-16 h-px bg-luxora-gold"></div>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-light text-luxora-navy mb-8">
            Explore
            <br />
            <span className="text-luxora-gold">Room Designs</span>
          </h2>
          <p className="text-xl text-luxora-charcoal font-inter font-light max-w-3xl">
            Browse thousands of interior design ideas for every room in your home. 
            Get inspired and discover the perfect style for your space.
          </p>
        </div>

        {/* Featured Large Room */}
        <div className="mb-16">
          <div className="h-[500px] lg:h-[600px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-luxora-cream via-luxora-cream/90 to-luxora-cream/80">
              {/* Placeholder for large living room image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl text-luxora-navy font-playfair font-light mb-4">
                    LIVING ROOM DESIGNS
                  </div>
                  <div className="text-2xl text-luxora-charcoal font-inter font-light">
                    1,200+ Design Ideas • Modern • Traditional • Contemporary
                  </div>
                </div>
              </div>
            </div>
            
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-12 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-white">
                  <h3 className="text-4xl font-playfair font-light mb-4">Living Room Designs</h3>
                  <p className="font-inter text-lg font-light mb-6 max-w-2xl">
                    Discover modern, traditional, and contemporary living room designs 
                    that create the perfect atmosphere for family gatherings and entertainment.
                  </p>
                  <button className="px-8 py-3 bg-white text-luxora-navy font-inter text-sm tracking-widest hover:bg-luxora-gold transition-all">
                    EXPLORE 1,200+ DESIGNS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Room Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roomCategories.slice(1).map((room, index) => (
            <div 
              key={index}
              className="h-[300px] relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-luxora-cream/90 via-luxora-cream/70 to-luxora-cream/50">
                {/* Placeholder for room image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl text-luxora-navy font-playfair font-light mb-2">
                      {room.title.toUpperCase()}
                    </div>
                    <div className="text-sm text-luxora-charcoal font-inter font-light">
                      {room.count}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-center text-white p-6">
                    <h3 className="text-xl font-playfair font-light mb-2">{room.title}</h3>
                    <p className="font-inter text-sm font-light mb-4">{room.description}</p>
                    <button className="px-6 py-2 bg-white text-luxora-navy font-inter text-xs tracking-widest hover:bg-luxora-gold transition-all">
                      VIEW DESIGNS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Design Styles */}
        <div className="mt-24">
          <h3 className="text-3xl md:text-4xl font-playfair font-light text-luxora-navy mb-12 text-center">
            Popular Design Styles
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Modern", "Contemporary", "Traditional", "Minimalist", "Industrial", "Scandinavian", "Bohemian", "Luxury"].map((style, index) => (
              <div 
                key={index}
                className="px-8 py-4 border border-luxora-cream bg-white text-luxora-navy font-inter text-center tracking-widest hover:bg-luxora-gold hover:text-white hover:border-luxora-gold transition-all duration-300 cursor-pointer"
              >
                {style}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-playfair font-light text-luxora-navy mb-6">
              Need Help Choosing a Design?
            </h3>
            <p className="text-xl text-luxora-charcoal font-inter font-light max-w-2xl mx-auto">
              Our design experts can help you select the perfect style for your home.
            </p>
          </div>
          <button className="px-12 py-4 bg-luxora-gold text-luxora-navy font-inter text-sm tracking-widest hover:bg-luxora-navy hover:text-luxora-gold transition-all duration-300">
            TALK TO A DESIGN EXPERT
          </button>
        </div>
      </div>
    </section>
  );
}