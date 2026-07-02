import type { ReactNode } from 'react';

export type GalleryImageBadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface GalleryImageBadgeProps {
  children: ReactNode;
  position?: GalleryImageBadgePosition;
  className?: string;
}

const POSITION_CLASSNAME: Record<GalleryImageBadgePosition, string> = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
};

/**
 * GalleryImageBadge — absolutely-positioned label floating over a
 * photograph corner ("Featured Project", "New"). Distinct from
 * `GalleryBadge` (which is laid out inline in normal flow, never over an image).
 */
export default function GalleryImageBadge({ children, position = 'top-left', className = '' }: GalleryImageBadgeProps) {
  return (
    <span
      className={`absolute z-10 text-[10px] font-semibold tracking-[0.24em] uppercase ${POSITION_CLASSNAME[position]} ${className}`}
      style={{ color: '#E8C468' }}
    >
      {children}
    </span>
  );
}
