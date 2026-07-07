import type { ServiceHighlightItem } from '@/lib/content/services/types';
import { luxoraStats } from '@/lib/content/global/stats';

/**
 * Landing screen content — Phase 2. Unlike the category/style/package
 * scaffolds in ./types.ts (still intentionally empty), this is real,
 * authored content for the Landing Experience approved in Phase 2.
 */

function encodePath(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}
/** Real (non-AI-render) project photography — same folder GlobalClosingCTA sources from. */
function real(path: string): string {
  return encodePath(`/img/PROJECT BASED/${path}`);
}

export interface EstimatorTrustItem {
  label: string;
}

export interface EstimatorJourneyStep {
  number: string;
  title: string;
  description: string;
}

export interface EstimatorJourneyContent {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  steps: EstimatorJourneyStep[];
}

export interface EstimatorWhyUseThisContent {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description: string;
  items: ServiceHighlightItem[];
}

/** A full-bleed image conversion checkpoint — same recipe as GlobalClosingCTA
 * (the shared closing section every other V4 page ends with), so every CTA
 * on the site reads as one consistent design language. */
export interface EstimatorConversionCtaContent {
  eyebrow?: string;
  title: string;
  titleItalic?: string;
  description: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
}

export interface EstimatorLandingContent {
  eyebrow: string;
  headline: string;
  headlineItalic: string;
  subheading: string;
  promise: string;
  primaryCta: { label: string };
  secondaryCta: { label: string; targetId: string };
  trustItems: EstimatorTrustItem[];
  journey: EstimatorJourneyContent;
  timeEstimateLabel: string;
  timeEstimateValue: string;
  privacyNote: string;
  whyUseThis: EstimatorWhyUseThisContent;
  midConversionCta: EstimatorConversionCtaContent;
  closingConversionCta: EstimatorConversionCtaContent;
}

export const estimatorLandingContent: EstimatorLandingContent = {
  eyebrow: 'Luxora Interior Estimator',
  headline: 'Design Your Dream Home',
  headlineItalic: 'With Confidence',
  subheading:
    "A personalized, transparent, and refreshingly fast way to understand your interior investment — guided by Luxora's own design language, not a generic form.",
  promise: 'Complete your luxury interior estimate in under 3 minutes.',
  primaryCta: { label: 'Start Your Estimate' },
  secondaryCta: { label: 'Learn How It Works', targetId: 'estimator-journey' },
  // '\n' marks the deliberate line break — every label renders as exactly
  // two lines (via whitespace-pre-line) so the trust strip stays symmetric.
  // Quantified claims are sourced from luxoraStats (the sitewide single
  // source of truth) — a concrete number beats a generic quality label as
  // a trust device every time.
  trustItems: [
    { label: `${luxoraStats.homesDelivered} Homes\nDelivered` },
    { label: `${luxoraStats.clientRating}★ Client\nRating` },
    { label: `${luxoraStats.warrantyYears}-Year\nWarranty` },
    { label: 'Transparent\nPricing' },
    { label: 'Jaipur Based\nStudio' },
    { label: 'End-to-End\nExecution' },
  ],
  journey: {
    eyebrow: 'The Journey',
    title: 'Your Guided Path To',
    titleItalic: 'A Personal Estimate',
    description: 'Four unhurried steps — each one shaping a number you can actually trust.',
    steps: [
      {
        number: '01',
        title: 'Choose Home Type',
        description: "Full home, modular kitchen, or wardrobe — tell us what you're designing.",
      },
      {
        number: '02',
        title: 'Choose Interior Style',
        description: 'Pick the aesthetic that feels most like you.',
      },
      {
        number: '03',
        title: 'Tell Us About Your Project',
        description: 'A few quick details about your space.',
      },
      {
        number: '04',
        title: 'Receive Your Estimate',
        description: 'A personalized, transparent investment range.',
      },
    ],
  },
  timeEstimateLabel: 'Approx.',
  timeEstimateValue: '3 Minutes',
  privacyNote: 'No spam. Your information remains private.',
  whyUseThis: {
    eyebrow: 'Why Use This Estimator',
    title: 'Plan With',
    titleItalic: 'Absolute Clarity',
    description: 'Five reasons homeowners trust this estimate before they trust a quote.',
    items: [
      { value: '01', label: 'Know Your Realistic Budget', description: 'A grounded, honest number — not a lowball teaser.' },
      { value: '02', label: 'Avoid Hidden Surprises', description: 'Transparent inclusions from the very first estimate.' },
      { value: '03', label: 'Compare Package Options', description: 'See how Essential, Signature, and Bespoke differ — clearly.' },
      { value: '04', label: 'Plan Confidently', description: 'Move forward knowing what your investment actually covers.' },
      { value: '05', label: 'Talk To Designers With Clarity', description: 'Walk into your consultation already informed.' },
    ],
  },
  midConversionCta: {
    eyebrow: 'Just 3 Minutes Away',
    title: 'Curious What Your',
    titleItalic: 'Dream Home Actually Costs?',
    description: 'See your personalized investment range instantly — no forms to fill, no pressure, just clarity.',
    ctaLabel: 'Start Your Free Estimate',
    image: real('LIVING ROOM DESIGN/Karamveer ji G.F. A01_View070000.webp'),
    imageAlt: 'Elegant, fully styled living room by Luxora',
  },
  closingConversionCta: {
    eyebrow: 'Start Your Journey',
    title: 'Stop Guessing.',
    titleItalic: 'Start Planning With Real Numbers.',
    description: 'Join homeowners across Jaipur who planned their dream interiors with total budget clarity.',
    ctaLabel: 'Start Your Free Estimate',
    image: real('MASTER BEDROOM DESIGN/Balram ji Bedroom A01.webp'),
    imageAlt: 'Serene, fully styled master bedroom by Luxora',
  },
};
