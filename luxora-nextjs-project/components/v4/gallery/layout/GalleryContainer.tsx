import type { ElementType, ReactNode } from 'react';
import { luxoraSpacing } from '@/lib/design/luxoraDesignTokens';

export interface GalleryContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * GalleryContainer — the one max-width/padding wrapper every Gallery
 * section content area uses. Consumes `luxoraSpacing.container` (Design
 * System V2) instead of duplicating the recipe, so the Gallery pages get
 * the large-display width tiers automatically.
 */
export default function GalleryContainer({ children, as: Component = 'div', className = '' }: GalleryContainerProps) {
  return <Component className={`${luxoraSpacing.container} ${className}`}>{children}</Component>;
}
