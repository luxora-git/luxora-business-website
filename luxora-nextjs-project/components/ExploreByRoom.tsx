export default function ExploreByRoom() {
  const rooms = [
    {
      name: 'Living Room',
      image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80',
      count: '1,200+ Designs',
    },
    {
      name: 'Bedroom',
      image: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=600&q=80',
      count: '900+ Designs',
    },
    {
      name: 'Kitchen',
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80',
      count: '800+ Designs',
    },
    {
      name: 'Bathroom',
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80',
      count: '700+ Designs',
    },
    {
      name: 'Wardrobe',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
      count: '600+ Designs',
    },
    {
      name: 'Home Office',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      count: '400+ Designs',
    },
  ];

  return (
    <section id="gallery" className="py-16 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <span className="text-luxora-gold text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4 block">
            Design Gallery
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-luxora-navy mb-4">
            Explore Designs by Room
          </h2>
          <p className="text-luxora-charcoal/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Browse thousands of interior design ideas for every room in your home
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {rooms.map((room) => (
            <div
              key={room.name}
              className="premium-card-hover group relative h-64 sm:h-80 md:h-[28rem] lg:h-[36rem] overflow-hidden cursor-pointer"
            >
              <div className="img-zoom-container w-full h-full">
                <img
                  src={room.image}
                  alt={`${room.name} interior design`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <h3 className="text-lg md:text-xl font-bold text-white font-playfair mb-1">
                  {room.name}
                </h3>
                <p className="text-sm text-luxora-gold/80 font-medium tracking-wider">
                  {room.count}
                </p>
              </div>

              {/* Hover accent border */}
              <div className="absolute inset-x-4 bottom-4 top-auto h-[1px] bg-luxora-gold/0 group-hover:bg-luxora-gold/60 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}