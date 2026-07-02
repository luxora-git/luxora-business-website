'use client';

import { useState } from 'react';
import V4BotanicalDecor from './V4BotanicalDecor';
import V4SectionHeader from './V4SectionHeader';
import { useConsultationModal } from './modal';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

const LUXORA_YOUTUBE_CHANNEL = 'https://www.youtube.com/@Luxorainteriors';

/**
 * Real Luxora YouTube videos — titles and thumbnails pulled from YouTube's
 * oEmbed API for each real videoId (no fabricated titles/thumbnails/durations).
 * To add or swap a video, just add/replace an entry here — the player and
 * thumbnail rail below are wired to any array length.
 */
const channelVideos = [
  {
    videoId: '153mazee_1w',
    title: '4BHK Luxury Residence by Luxora',
    thumbnail: 'https://i.ytimg.com/vi/153mazee_1w/hqdefault.jpg',
  },
  {
    videoId: 'WjyOqhrQMg4',
    title: 'Explore The Stunning Transformation Of This 3 BHK Flat',
    thumbnail: 'https://i.ytimg.com/vi/WjyOqhrQMg4/hqdefault.jpg',
  },
  {
    videoId: 'za8h0yI5osI',
    title: 'Divine Craft by Luxora — Where Design Meets Divine Detailing',
    thumbnail: 'https://i.ytimg.com/vi/za8h0yI5osI/hqdefault.jpg',
  },
  {
    videoId: 'RQS0zLzfUEw',
    title: "Welcome to Dr. Dilip's Dental Clinic — Where Smiles Meet Perfection",
    thumbnail: 'https://i.ytimg.com/vi/RQS0zLzfUEw/hqdefault.jpg',
  },
  {
    videoId: 'PDLDisdLCPA',
    title: 'Client Testimonial — Freshokartz',
    thumbnail: 'https://i.ytimg.com/vi/PDLDisdLCPA/hqdefault.jpg',
  },
];

export default function V4TestimonialsSection() {
  const { open: openConsultationModal } = useConsultationModal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const active = channelVideos[activeIndex];

  const selectVideo = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(true);
  };

  return (
    <section
      id="v4-projects"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 15% 0%, rgba(201,162,39,0.07) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(201,162,39,0.05) 0%, transparent 55%), #FDFAF6',
      }}
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs><pattern id="v4-yt-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.9" fill="#9C7B68" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#v4-yt-dots)" />
        </svg>
      </div>
      <div className="absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full border border-[#C9A227]/15 pointer-events-none" />
      <V4BotanicalDecor side="right" variant="small" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div data-v4-reveal-heading className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
          <V4SectionHeader
            eyebrow="Luxury Stories"
            title="Real Homes."
            titleItalic="Told Through Film"
            description="Step inside Luxora projects the way our clients experience them — watch the full transformations, filmed and shared on our own channel."
            centered={false}
          />
          <a
            href={LUXORA_YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex flex-shrink-0 items-center gap-2.5 px-6 py-3.5 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-0.5 mb-2"
            style={{ border: '1.5px solid rgba(160,120,80,0.30)', color: luxoraColors.espresso }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            @Luxorainteriors
          </a>
        </div>

        {/* ── FEATURED PLAYER + PLAYLIST RAIL ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-7" data-v4-reveal>

          {/* Featured video — large cinematic frame */}
          <div
            className="relative rounded-[28px] overflow-hidden group"
            style={{
              aspectRatio: '16/9',
              border: '1px solid rgba(201,162,39,0.22)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
              background: '#120A04',
            }}
          >
            {isPlaying ? (
              <iframe
                key={active.videoId}
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${active.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full h-full text-left"
                aria-label={`Play ${active.title}`}
              >
                <img
                  src={active.thumbnail}
                  alt={active.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(18,10,4,0.90) 0%, rgba(18,10,4,0.20) 45%, rgba(18,10,4,0.35) 100%)' }}
                />

                {/* Glass play button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(253,250,246,0.14)',
                      backdropFilter: 'blur(12px)',
                      border: '1.5px solid rgba(253,250,246,0.35)',
                    }}
                  >
                    <div
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                      style={{ background: '#C9A227', boxShadow: '0 0 40px rgba(201,162,39,0.45)' }}
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6 ml-1" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#1C1005' }}>
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom meta */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-2 text-[9px] font-semibold tracking-[0.18em] uppercase mb-2.5" style={{ color: '#C9A227' }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Now Playing
                  </div>
                  <h3 className="font-playfair italic text-2xl md:text-3xl leading-tight max-w-2xl" style={{ color: '#FDFAF6' }}>
                    {active.title}
                  </h3>
                </div>
              </button>
            )}
          </div>

          {/* Playlist rail */}
          <div className="flex lg:flex-col gap-3.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
            {channelVideos.map((video, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={video.videoId}
                  type="button"
                  onClick={() => selectVideo(i)}
                  className="group relative flex-shrink-0 flex items-center gap-3.5 rounded-2xl p-2.5 text-left transition-all duration-300 w-[260px] lg:w-auto"
                  style={{
                    background: isActive ? 'rgba(201,162,39,0.12)' : 'rgba(44,31,20,0.03)',
                    border: `1px solid ${isActive ? 'rgba(201,162,39,0.45)' : 'rgba(160,120,80,0.16)'}`,
                  }}
                >
                  <div className="relative flex-shrink-0 rounded-xl overflow-hidden" style={{ width: '104px', aspectRatio: '16/9' }}>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(18,10,4,0.25)' }}>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ background: isActive ? '#C9A227' : 'rgba(253,250,246,0.85)' }}
                      >
                        <svg className="w-2.5 h-2.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#1C1005' }}>
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-[12.5px] leading-snug font-medium line-clamp-3"
                    style={{ color: isActive ? luxoraColors.espresso : luxoraColors.softBrown }}
                  >
                    {video.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile subscribe link */}
        <a
          href={LUXORA_YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden mt-8 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase"
          style={{ border: '1.5px solid rgba(160,120,80,0.30)', color: luxoraColors.espresso }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          @Luxorainteriors
        </a>

        {/* Bottom CTA */}
        <div className="text-center mt-16" data-v4-reveal>
          <button
            type="button"
            onClick={openConsultationModal}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: '#C9A227', color: '#1C1005', boxShadow: '0 0 32px rgba(201,162,39,0.30)' }}>
            Start Your Luxora Journey
            <span className="text-base">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
