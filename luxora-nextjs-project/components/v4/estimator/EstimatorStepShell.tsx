'use client';

import type { ReactNode } from 'react';
import GalleryButton from '@/components/v4/gallery/common/GalleryButton';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export interface EstimatorStepShellProps {
  eyebrow?: string;
  /** The step's question — the screen's single h1-level heading. */
  question: string;
  questionItalic?: string;
  subtitle?: string;
  children: ReactNode;
  /** Back target — rendered as a quiet ghost control in the bottom bar. */
  onBack?: () => void;
  backLabel?: string;
  /** Continue action — omit entirely for auto-advancing steps (e.g. Category). */
  onContinue?: () => void;
  continueLabel?: string;
  canContinue?: boolean;
}

/**
 * EstimatorStepShell — the shared scaffold every guided step screen renders
 * through (question header → content → sticky bottom action bar). Built
 * once in Phase 3 so Category and every subsequent step (Style, Questions,
 * Budget, Package…) share identical rhythm, chrome, and behavior instead
 * of each screen hand-rolling its own. The sticky bottom bar uses the same
 * glass recipe as the site's StickyConsultationCTA mobile bar.
 */
export default function EstimatorStepShell({
  eyebrow,
  question,
  questionItalic,
  subtitle,
  children,
  onBack,
  backLabel = 'Back',
  onContinue,
  continueLabel = 'Continue',
  canContinue = true,
}: EstimatorStepShellProps) {
  return (
    <div className="relative min-h-[calc(100vh-90px)] flex flex-col">
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-16 pt-10 md:pt-14 pb-32">
        {/* Question header */}
        <div className="text-center mb-10 md:mb-14">
          {eyebrow && (
            <span className="block text-[11px] font-semibold tracking-[0.28em] uppercase mb-4" style={{ color: luxoraColors.gold }}>
              {eyebrow}
            </span>
          )}
          <h1
            className="font-playfair font-normal leading-[1.12] tracking-[-0.02em] text-balance"
            style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)', color: luxoraColors.espresso }}
          >
            {question}
            {questionItalic && (
              <>
                {/* Space is real text so screen readers don't read the two
                    lines as one run-on word; visually inert (italic span is
                    block-level). */}{' '}
                <span className="block font-playfair italic">{questionItalic}</span>
              </>
            )}
          </h1>
          {subtitle && (
            <p className="mt-3.5 text-[14.5px] md:text-base font-light leading-relaxed max-w-xl mx-auto" style={{ color: luxoraColors.softBrown }}>
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </div>

      {/* Sticky bottom action bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-[60]"
        style={{
          background: 'rgba(253,250,246,0.94)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderTop: '1px solid rgba(201,162,39,0.25)',
          boxShadow: '0 -8px 30px rgba(44,31,20,0.10)',
          paddingBottom: 'max(0px, env(safe-area-inset-bottom))',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 h-[72px] flex items-center justify-between gap-4">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 hover:bg-[rgba(44,31,20,0.06)]"
              style={{ color: luxoraColors.softBrown }}
            >
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {backLabel}
            </button>
          ) : (
            <span />
          )}

          {onContinue && (
            <GalleryButton
              variant="primary"
              size="md"
              onClick={onContinue}
              disabled={!canContinue}
              className={!canContinue ? 'opacity-45 cursor-not-allowed hover:translate-y-0' : ''}
            >
              {continueLabel}
            </GalleryButton>
          )}
        </div>
      </div>
    </div>
  );
}
