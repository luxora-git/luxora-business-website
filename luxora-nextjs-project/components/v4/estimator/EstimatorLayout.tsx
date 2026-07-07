import type { ReactNode } from 'react';
import GalleryContainer from '@/components/v4/gallery/layout/GalleryContainer';
import { luxoraShadows } from '@/lib/design/luxoraDesignTokens';

export interface EstimatorLayoutProps {
  children: ReactNode;
}

/**
 * EstimatorLayout — the shared content-area wrapper every estimator screen
 * renders inside (consistent width, vertical rhythm, and card treatment).
 * Reuses GalleryContainer for width/gutter rather than a new wrapper.
 *
 * TODO (later phase): add the sticky bottom action bar (Back/Continue) and
 * the persistent live-budget bar here once flow navigation and business
 * logic are in scope.
 */
export default function EstimatorLayout({ children }: EstimatorLayoutProps) {
  return (
    <GalleryContainer className="py-16 md:py-24">
      <div className="rounded-3xl bg-white/60 p-8 md:p-12" style={{ boxShadow: luxoraShadows.card }}>
        {children}
      </div>
    </GalleryContainer>
  );
}
