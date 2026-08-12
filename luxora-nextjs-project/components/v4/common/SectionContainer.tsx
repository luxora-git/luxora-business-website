import type { ElementType, ReactNode } from 'react';
import { luxoraSpacing } from '@/lib/design/luxoraDesignTokens';

export interface SectionContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * SectionContainer — Design System V2's one max-width/padding wrapper for
 * section content, consuming `luxoraSpacing.container`. Identical to the
 * legacy `max-w-7xl mx-auto px-6 md:px-12 lg:px-16` recipe up to 1535px,
 * then widens through the named large-display tiers (2xl/3xl/4xl) so
 * every page scales past laptop widths without per-section media queries.
 * Existing sections may consume `luxoraSpacing.container` directly when
 * restructuring their JSX is riskier than merging a class string.
 */
export default function SectionContainer({ children, as: Component = 'div', className = '' }: SectionContainerProps) {
  return <Component className={`${luxoraSpacing.container} ${className}`}>{children}</Component>;
}
