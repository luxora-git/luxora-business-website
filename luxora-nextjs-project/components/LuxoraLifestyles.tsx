"use client";

import { useEffect, useMemo, useState } from "react";

interface Hotspot {
  id: number;
  x: number;
  y: number;
  title: string;
  category: string;
  price: string;
  description: string;
  url: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    x: 36,
    y: 68,
    title: "Velvet Lounge Chair",
    category: "Seating",
    price: "₹48,500",
    description:
      "Soft-touch velvet upholstery with a sculpted silhouette for premium lounge corners.",
    url: "https://luxoralifestyles.com/chairs",
  },
  {
    id: 2,
    x: 74,
    y: 87,
    title: "Statement Rug",
    category: "Decor",
    price: "₹62,000",
    description:
      "Hand-finished textured rug designed to anchor the room with warmth and depth.",
    url: "https://luxoralifestyles.com/rugs",
  },
  {
    id: 3,
    x: 64,
    y: 62,
    title: "Accent Side Table",
    category: "Tables",
    price: "₹24,900",
    description:
      "Minimal brass-detailed table crafted to elevate reading and lounge settings.",
    url: "https://luxoralifestyles.com/tables",
  },
  {
    id: 4,
    x: 83,
    y: 67,
    title: "Console Unit",
    category: "Storage",
    price: "₹74,000",
    description:
      "Low-profile luxury console with a clean modern form and premium lacquer finish.",
    url: "https://luxoralifestyles.com/storage",
  },
  {
    id: 5,
    x: 63,
    y: 32,
    title: "Pendant Light",
    category: "Lighting",
    price: "₹34,200",
    description:
      "Elegant suspended lighting that adds a focused glow and sculptural presence.",
    url: "https://luxoralifestyles.com/lighting",
  },
];

export default function LuxoraLifestyles() {
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<number>(2);

  const activeHotspot = useMemo(
    () => HOTSPOTS.find((item) => item.id === activeId) ?? HOTSPOTS[0],
    [activeId]
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 30);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="bg-[#F7F4EE] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        <div
          className={`mb-7 flex flex-col gap-4 md:mb-9 md:flex-row md:items-end md:justify-between transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div>
            <div className="mb-3 flex items-center gap-4">
              <span className="h-px w-10 bg-[#C9A227]/65" />
              <span className="text-[11px] font-medium uppercase tracking-[0.30em] text-[#C9A227]">
                Luxora Lifestyles
              </span>
            </div>
            <h2 className="font-playfair text-4xl italic leading-[0.94] tracking-[-0.03em] text-[#0D1B2A] md:text-5xl">
              Shop the Room
            </h2>
            <p className="mt-3 max-w-[540px] text-[15px] leading-relaxed text-[#0D1B2A]/62 md:text-base">
              Explore curated products inside the room. Tap a marker to reveal
              the piece and move straight to shopping.
            </p>
          </div>

          <a
            href="https://luxoralifestyles.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 border border-[#0D1B2A]/18 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.18em] text-[#0D1B2A] transition-all duration-300 hover:border-[#0D1B2A] hover:bg-[#0D1B2A] hover:text-white"
          >
            View All Products
            <span className="text-base leading-none">→</span>
          </a>
        </div>

        <div
          className={`overflow-hidden border border-[#C9A227]/12 bg-white shadow-[0_20px_60px_rgba(13,27,42,0.10)] transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_400px]">
            <div className="relative min-h-[420px] md:min-h-[560px] lg:min-h-[640px]">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2400&q=92"
                alt="Luxora shoppable living room"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/18 via-transparent to-transparent" />

              <div className="pointer-events-none absolute left-5 top-5 bg-[#0D1B2A]/84 px-4 py-2.5 backdrop-blur-sm md:left-7 md:top-7">
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/90">
                  5 Shoppable Pieces
                </span>
              </div>

              {HOTSPOTS.map((spot) => {
                const active = activeId === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveId(spot.id)}
                    className="group absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    aria-label={`Open ${spot.title}`}
                  >
                    {!active && (
                      <span className="absolute inset-0 animate-ping rounded-full border border-[#C9A227]/45" />
                    )}
                    <span
                      className={`relative flex items-center justify-center rounded-full border transition-all duration-300 ${
                        active
                          ? "h-9 w-9 border-[#C9A227] bg-[#0D1B2A] text-white shadow-[0_0_0_3px_rgba(201,162,39,0.22)]"
                          : "h-9 w-9 border-[#D8C27A]/70 bg-[#F7F4EE]/92 text-[#0D1B2A] shadow-[0_6px_18px_rgba(13,27,42,0.10)] backdrop-blur-sm group-hover:border-[#0D1B2A] group-hover:bg-[#0D1B2A] group-hover:text-white"
                      }`}
                    >
                      <span className="text-[18px] leading-none">+</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-[#0D1B2A]/8 bg-[#0D1B2A] p-6 text-white md:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="flex h-full flex-col justify-between gap-8">
                <div>
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-8 bg-[#C9A227]/70" />
                      <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#C9A227]">
                        {activeHotspot.category}
                      </span>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                      Luxora Edit
                    </span>
                  </div>

                  <h3 className="font-playfair text-[2rem] italic leading-[1] tracking-[-0.02em] text-white md:text-[2.45rem]">
                    {activeHotspot.title}
                  </h3>

                  <p className="mt-6 max-w-[30ch] text-[15px] leading-[1.85] text-white/68 md:text-base">
                    {activeHotspot.description}
                  </p>
                </div>

                <div className="space-y-6 border-t border-white/8 pt-6">
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-white/38">
                      Starting at
                    </span>
                    <span className="mt-2 block font-playfair text-[2.2rem] leading-none text-[#C9A227] md:text-[2.5rem]">
                      {activeHotspot.price}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href={activeHotspot.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[52px] items-center justify-center gap-2 bg-[#C9A227] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0D1B2A] transition-all duration-300 hover:bg-white"
                    >
                      Shop Now
                      <span className="text-base leading-none">→</span>
                    </a>
                    <a
                      href="https://luxoralifestyles.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[52px] items-center justify-center gap-2 border border-white/16 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-white/34 hover:bg-white/6"
                    >
                      Browse Collection
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          className={`mt-5 text-center text-[11px] uppercase tracking-[0.16em] text-[#0D1B2A]/38 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          Opens our dedicated ecommerce website · luxoralifestyles.com
        </p>
      </div>
    </section>
  );
}