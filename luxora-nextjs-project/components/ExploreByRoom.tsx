'use client';

const rooms = [
  {
    name: 'Living Room',
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=85',
    count: '1,200+ Designs',
  },
  {
    name: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&q=85',
    count: '900+ Designs',
  },
  {
    name: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=85',
    count: '800+ Designs',
  },
  {
    name: 'Bathroom',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=85',
    count: '700+ Designs',
  },
  {
    name: 'Wardrobe',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=85',
    count: '600+ Designs',
  },
  {
    name: 'Home Office',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85',
    count: '400+ Designs',
  },
];

function RoomCard({ room, className }: { room: typeof rooms[0]; className?: string }) {
  return (
    <div className={`group relative overflow-hidden cursor-pointer ${className}`}>
      <img
        src={room.image}
        alt={`${room.name} interior design`}
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/85 via-[#0D1B2A]/20 to-transparent group-hover:from-[#0D1B2A]/90 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <div className="w-8 h-[1px] bg-[#C9A227] mb-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        <h3 className="font-playfair text-white font-normal italic text-xl md:text-2xl leading-tight mb-1">
          {room.name}
        </h3>
        <p className="text-[#C9A227] text-[11px] tracking-[0.2em] uppercase font-medium">
          {room.count}
        </p>
        <div className="flex items-center gap-2 mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span className="text-white/70 text-[11px] tracking-[0.15em] uppercase">Explore</span>
          <svg className="w-3.5 h-3.5 text-[#C9A227] group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
      <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[#C9A227]/0 group-hover:border-[#C9A227]/60 transition-all duration-500" />
    </div>
  );
}

export default function ExploreByRoom() {
  return (
    <section id="gallery" className="py-16 md:py-28 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#C9A227] text-xs md:text-sm font-medium tracking-[0.25em] uppercase mb-4 block">
            Design Gallery
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-normal italic text-luxora-navy mb-4">
            Explore Designs by Room
          </h2>
          <div className="w-12 h-[1px] bg-[#C9A227]/60 mx-auto mt-4 mb-5" />
          <p className="text-luxora-charcoal/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Browse thousands of interior design ideas for every room in your home
          </p>
        </div>

        {/* DESKTOP BENTO GRID — visible md and above */}
        <div
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
            gridTemplateRows: '380px 300px',
            gridTemplateAreas: `
              "lr lr lr bd bd bd"
              "kt kt bt bt wd ho"
            `,
          }}
        >
          <RoomCard room={rooms[0]} className="[grid-area:lr]" />
          <RoomCard room={rooms[1]} className="[grid-area:bd]" />
          <RoomCard room={rooms[2]} className="[grid-area:kt]" />
          <RoomCard room={rooms[3]} className="[grid-area:bt]" />
          <RoomCard room={rooms[4]} className="[grid-area:wd]" />
          <RoomCard room={rooms[5]} className="[grid-area:ho]" />
        </div>

        {/* MOBILE GRID — visible below md */}
        <div className="grid md:hidden grid-cols-2 gap-3">
          {rooms.map((room) => (
            <RoomCard key={room.name} room={room} className="h-52" />
          ))}
        </div>

      </div>
    </section>
  );
}