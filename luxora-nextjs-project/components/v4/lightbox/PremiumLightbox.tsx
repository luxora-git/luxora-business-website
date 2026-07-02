'use client';

import { useEffect, useState } from 'react';
import LightboxImageStage from './LightboxImageStage';
import LightboxPanel from './LightboxPanel';
import type { LightboxImage, LightboxPanelContent } from './types';

export interface PremiumLightboxProps {
  images: LightboxImage[];
  panel: LightboxPanelContent;
  activeIndex: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

/**
 * PremiumLightbox — the ONE global image viewer for the entire V4 site.
 * Desktop/tablet: split-screen (dark immersive stage + cream editorial
 * panel). Mobile: image first, panel below. The panel owns its own pinned
 * CTA footer (see `LightboxPanel`), so the two sitewide conversion actions
 * are always visible without scrolling on every breakpoint. Mounted once
 * by `LightboxProvider`; every page opens it via `useLightbox().open(...)`.
 *
 * `data-lenis-prevent` on the root is required because the site runs a
 * global Lenis smooth-scroll instance (`V4SmoothScroll`) that otherwise
 * intercepts every wheel/touch event on the page — without this flag Lenis
 * swallows scroll input meant for the panel and the image stage, and only
 * dragging the scrollbar directly (which bypasses wheel handling) works.
 */
export default function PremiumLightbox({ images, panel, activeIndex, onNavigate, onClose }: PremiumLightboxProps) {
  const [visible, setVisible] = useState(false);
  const total = images.length;

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((activeIndex + 1) % total);
      if (e.key === 'ArrowLeft') onNavigate((activeIndex - 1 + total) % total);
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, total, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-0 md:p-6 lg:p-10 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={panel.title}
      data-lenis-prevent
    >
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(15,11,6,0.94)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative w-full h-full md:h-[92vh] md:max-w-[1440px] rounded-none md:rounded-[28px] overflow-hidden shadow-2xl flex flex-col md:flex-row transition-transform duration-300"
        style={{ transform: visible ? 'scale(1)' : 'scale(0.97)' }}
      >
        <div className="relative flex-shrink-0 h-[42vh] sm:h-[48vh] md:h-full md:w-[60%] lg:w-[68%]">
          <LightboxImageStage images={images} activeIndex={activeIndex} onNavigate={onNavigate} />
        </div>

        <div className="relative flex-1 min-h-0 md:w-[40%] lg:w-[32%]">
          <LightboxPanel content={panel} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
