import type { ElementType, ReactNode } from 'react';

export interface GalleryContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * GalleryContainer — the one max-width/padding wrapper every Gallery
 * section content area uses, matching `luxoraSpacing.container`
 * (`max-w-7xl mx-auto px-6 md:px-12 lg:px-16`) exactly.
 */
export default function GalleryContainer({ children, as: Component = 'div', className = '' }: GalleryContainerProps) {
  return <Component className={`max-w-7xl mx-auto px-6 md:px-12 lg:px-16 ${className}`}>{children}</Component>;
}
