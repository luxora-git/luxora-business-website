import type { ReactNode } from 'react';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import GalleryContainer from './GalleryContainer';

export type GallerySectionSpacing = 'standard' | 'editorial' | 'tight';

export interface GallerySectionProps {
  children: ReactNode;
  /** Background-pattern elements (e.g. `<LuxuryHalo />`, `<LuxuryGrain />`) rendered before `children`, absolutely positioned per the pattern library's own convention. Per Visual Language Guide §9, at most one feature pattern plus `LuxuryGrain`. */
  patterns?: ReactNode;
  spacing?: GallerySectionSpacing;
  background?: string;
  id?: string;
  className?: string;
  /** Set false to render `children` without the standard container wrapper (e.g. a full-bleed Hero/Editorial spread that manages its own width). */
  contained?: boolean;
}

const SPACING_CLASSNAME: Record<GallerySectionSpacing, string> = {
  standard: 'py-24 md:py-32',
  editorial: 'py-28 md:py-40',
  tight: 'py-16 md:py-24',
};

/**
 * GallerySection — the one section shell every Gallery page section uses:
 * consistent vertical rhythm, a background-pattern slot, and the standard
 * container. No Gallery section should hand-roll its own `<section>` +
 * padding + container combination outside this component.
 */
export default function GallerySection({
  children,
  patterns,
  spacing = 'standard',
  background = luxoraColors.warmCream,
  id,
  className = '',
  contained = true,
}: GallerySectionProps) {
  return (
    <section id={id} className={`relative overflow-hidden ${SPACING_CLASSNAME[spacing]} ${className}`} style={{ backgroundColor: background }}>
      {patterns}
      {contained ? <GalleryContainer className="relative z-10">{children}</GalleryContainer> : <div className="relative z-10">{children}</div>}
    </section>
  );
}
