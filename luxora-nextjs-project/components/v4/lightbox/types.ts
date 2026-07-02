/**
 * The single global Lightbox contract — every page across V4 (Design
 * Gallery, Portfolio, Services, Interior Elements, Products, Homepage
 * galleries) opens the same `PremiumLightbox` through `useLightbox().open()`,
 * only varying this content. No page renders its own lightbox markup.
 */

export interface LightboxImage {
  src: string;
  alt: string;
}

export interface LightboxMetaItem {
  label: string;
  value: string;
}

export interface LightboxRelatedLink {
  label: string;
  sublabel?: string;
  href: string;
}

export interface LightboxFaqItem {
  question: string;
  answer: string;
}

/** Which contextual info panel shape to render — drives the eyebrow copy and default FAQ set. */
export type LightboxVariant = 'design' | 'portfolio' | 'service' | 'product' | 'generic';

export interface LightboxPanelContent {
  variant: LightboxVariant;
  /** Small label above the title, e.g. the category or "Completed Project". */
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: LightboxMetaItem[];
  /** e.g. "Related Designs", "Related Portfolio", "Related Services", "Related Collections". */
  relatedTitle?: string;
  relatedLinks?: LightboxRelatedLink[];
  /** Overrides the variant's default FAQ set. */
  faqs?: LightboxFaqItem[];
}

export interface OpenLightboxOptions {
  images: LightboxImage[];
  initialIndex?: number;
  panel: LightboxPanelContent;
}
