'use client';

import { useConsultationModal } from '../modal';
import type { ServiceCta } from '@/lib/content/services/types';

/** Sentinel href used across all service-page content to mean "open the global consultation modal". */
export const CONSULTATION_CTA_HREF = '#consultation';

export interface ServiceCtaButtonProps {
  cta: ServiceCta;
  className?: string;
  style?: React.CSSProperties;
  /** Optional content override (e.g. label + icon); defaults to `cta.label`. */
  children?: React.ReactNode;
}

/**
 * ServiceCtaButton — the single reusable primitive every service-page CTA
 * renders through. If `cta.href` is the consultation sentinel it renders a
 * `<button>` that opens the shared global consultation modal; otherwise it
 * renders a normal link, automatically opening external URLs in a new tab.
 * This is what guarantees "every CTA triggers the same modal, no
 * exceptions" without each section re-implementing the branching.
 */
export default function ServiceCtaButton({ cta, className, style, children }: ServiceCtaButtonProps) {
  const { open } = useConsultationModal();

  if (cta.href === CONSULTATION_CTA_HREF) {
    return (
      <button type="button" onClick={open} className={className} style={style}>
        {children ?? cta.label}
      </button>
    );
  }

  const isExternal = /^https?:\/\//.test(cta.href);
  return (
    <a
      href={cta.href}
      className={className}
      style={style}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children ?? cta.label}
    </a>
  );
}
