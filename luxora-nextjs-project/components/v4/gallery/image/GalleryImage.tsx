'use client';

import { useState } from 'react';
import Image from 'next/image';
import { luxoraColors, luxoraRadius } from '@/lib/design/luxoraDesignTokens';
import { RATIO_CLASSNAME, type GalleryImageRatio } from './ratios';

export type { GalleryImageRatio };

export type GalleryImageZoom = 'none' | 'fast' | 'standard' | 'slow';

export interface GalleryImageProps {
  src: string;
  alt: string;
  /** One of the frozen Gallery aspect ratios (Visual Language Guide §3.1). Ignored if `fill` is false and explicit `width`/`height` are passed. */
  ratio?: GalleryImageRatio;
  /** Hover zoom speed/magnitude, tied to card hierarchy (Visual Language Guide §3.3). `none` for Category Cards — they never zoom. */
  zoom?: GalleryImageZoom;
  radius?: keyof typeof luxoraRadius;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
  className?: string;
  /** Set false to render at intrinsic width/height instead of `fill` (rare — most Gallery imagery fills its card). */
  fill?: boolean;
  width?: number;
  height?: number;
  /** True when the calling card already defines its own `relative` + fixed-height/inset-0 box (Featured/Editorial cards) — renders the image as a plain absolute fill with no wrapping aspect-ratio div of its own. */
  coverParent?: boolean;
}

const ZOOM_CLASSNAME: Record<GalleryImageZoom, string> = {
  none: '',
  fast: 'transition-transform duration-300 ease-out group-hover:scale-[1.04]',
  standard: 'transition-transform duration-700 ease-out group-hover:scale-110',
  slow: 'transition-transform duration-[1100ms] ease-out group-hover:scale-[1.03]',
};

/**
 * GalleryImage — the single image primitive every Gallery surface renders
 * through. Always `object-fit: cover` (never stretched), always a blur
 * placeholder while loading, and a designed fallback panel — never a
 * generic gray box or broken-image icon — if the source fails to resolve
 * (Visual Language Guide §3.5). Expects the calling card to set `relative`
 * and `group` on its own wrapper for the zoom/hover mechanism to apply.
 */
export default function GalleryImage({
  src,
  alt,
  ratio = 'standard',
  zoom = 'standard',
  radius = 'lg',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
  objectPosition = 'center',
  className = '',
  fill = true,
  width,
  height,
  coverParent = false,
}: GalleryImageProps) {
  const [failed, setFailed] = useState(false);
  const borderRadius = luxoraRadius[radius];

  if (failed || !src) {
    return (
      <div
        className={`${coverParent ? 'absolute inset-0' : `relative w-full ${fill ? RATIO_CLASSNAME[ratio] : ''}`} flex items-center justify-center ${className}`}
        style={{ background: luxoraColors.warmCream, borderRadius: coverParent ? undefined : borderRadius }}
        role="img"
        aria-label={alt}
      >
        <svg viewBox="0 0 48 48" className="w-10 h-10 opacity-40" fill="none" stroke={luxoraColors.gold} strokeWidth={1}>
          <rect x="6" y="6" width="36" height="36" rx="2" />
          <path d="M14 30l8-8 6 6 6-10" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="17" cy="17" r="2.4" />
        </svg>
      </div>
    );
  }

  if (coverParent) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
        className={`absolute inset-0 ${ZOOM_CLASSNAME[zoom]} ${className}`}
        style={{ objectFit: 'cover', objectPosition }}
      />
    );
  }

  if (!fill) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onError={() => setFailed(true)}
        className={`${ZOOM_CLASSNAME[zoom]} ${className}`}
        style={{ borderRadius, objectFit: 'cover', objectPosition }}
      />
    );
  }

  return (
    <div className={`relative w-full overflow-hidden ${RATIO_CLASSNAME[ratio]} ${className}`} style={{ borderRadius }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="empty"
        onError={() => setFailed(true)}
        className={`absolute inset-0 ${ZOOM_CLASSNAME[zoom]}`}
        style={{ objectFit: 'cover', objectPosition }}
      />
    </div>
  );
}
