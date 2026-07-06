'use client';

import { useEffect, useState } from 'react';
import EstimatorStepShell from '../EstimatorStepShell';
import GalleryFilterChip from '@/components/v4/gallery/filters/GalleryFilterChip';
import { useEstimatorFlow } from '../useEstimatorFlow';
import { submitEstimatorLead, EstimatorLeadSubmissionError } from '@/lib/api/estimatorLead';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { EstimatorPackageTier } from '@/lib/content/estimator/pricing';
import type { EstimatorCategorySlug } from '@/lib/content/estimator/types';

const TIMELINE_OPTIONS = [
  { value: 'immediate', label: 'Immediately' },
  { value: '3-months', label: 'Within 3 months' },
  { value: '6-months', label: 'Within 6 months' },
  { value: 'exploring', label: 'Just exploring' },
];

/** Same field styling convention as the site's ConsultationModal, plus
 * always-visible labels per the approved UI Spec. */
const fieldClass =
  'w-full rounded-xl px-4 py-3 text-[14px] font-light bg-[#FDFAF6] border transition-colors duration-200 focus:outline-none focus:border-[#C9A227]';

interface FieldErrors {
  fullName?: string;
  mobileNumber?: string;
  city?: string;
}

/**
 * LeadScreen — the conversion gate (UI Spec Screen 9). Framed as claiming
 * the estimate, never as "submitting a form": the visitor's number is
 * already computed and waiting, and this screen unlocks it. Single-column
 * (per spec), three required fields only (name / mobile / city), email
 * and timeline optional, validation on blur, reassurance microcopy at the
 * point of ask. On success the lead is stored in flow state and the flow
 * advances to the reveal.
 */
export default function LeadScreen() {
  const { category, styles, answers, packageTier, setLead, goToScreen } = useEstimatorFlow();

  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [timeline, setTimeline] = useState<string | null>(null);
  const [whatsappConsent, setWhatsappConsent] = useState(true);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!category || !packageTier) goToScreen(category ? 'package' : 'category');
  }, [category, packageTier, goToScreen]);

  if (!category || !packageTier) return null;

  const cleanedMobile = mobileNumber.replace(/\D/g, '');
  const isValid = fullName.trim().length > 0 && cleanedMobile.length === 10 && city.trim().length > 0;

  const validateField = (field: keyof FieldErrors) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (field === 'fullName') next.fullName = fullName.trim() ? undefined : 'Please tell us your name.';
      if (field === 'mobileNumber')
        next.mobileNumber = cleanedMobile.length === 10 ? undefined : 'Please enter a valid 10-digit mobile number.';
      if (field === 'city') next.city = city.trim() ? undefined : 'Please tell us your city.';
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!isValid || submitting) return;
    setSubmitting(true);
    setSubmitError('');

    const lead = {
      fullName: fullName.trim(),
      mobileNumber: cleanedMobile,
      city: city.trim(),
      email: email.trim() || undefined,
      timeline: timeline ?? undefined,
      whatsappConsent,
    };

    try {
      await submitEstimatorLead({
        ...lead,
        category: category as EstimatorCategorySlug,
        styles,
        answers,
        packageTier: packageTier as EstimatorPackageTier,
      });
      setLead(lead);
      goToScreen('proposal');
    } catch (err) {
      setSubmitError(
        err instanceof EstimatorLeadSubmissionError ? err.message : 'Something went wrong. Please try again.',
      );
      setSubmitting(false);
    }
  };

  const labelClass = 'block text-[11px] font-bold uppercase tracking-[0.12em] mb-2';

  return (
    <EstimatorStepShell
      eyebrow="Step 6 — Unlock Your Estimate"
      question="Where should we"
      questionItalic="send your estimate?"
      subtitle="Your personalized investment range is ready — tell us who it's for and it unlocks instantly."
      onBack={() => goToScreen('package')}
      backLabel="Back to packages"
      onContinue={handleSubmit}
      continueLabel={submitting ? 'Unlocking…' : 'Reveal My Estimate'}
      canContinue={isValid && !submitting}
    >
      <div className="max-w-md mx-auto">
        <div
          className="rounded-3xl p-7 md:p-8 space-y-5"
          style={{
            background: 'rgba(253,250,246,0.95)',
            border: '1.5px solid rgba(160,120,80,0.3)',
            boxShadow: '0 16px 48px rgba(100,60,20,0.10)',
          }}
        >
          <div>
            <label htmlFor="est-name" className={labelClass} style={{ color: luxoraColors.softBrown }}>
              Full Name <span style={{ color: '#A6503E' }}>*</span>
            </label>
            <input
              id="est-name"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => validateField('fullName')}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'est-name-error' : undefined}
              placeholder="Your name"
              className={fieldClass}
              style={{ borderColor: errors.fullName ? '#A6503E' : 'rgba(160,120,80,0.25)', color: luxoraColors.espresso }}
            />
            {errors.fullName && (
              <p id="est-name-error" className="mt-1.5 text-[12px]" style={{ color: '#A6503E' }}>
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="est-mobile" className={labelClass} style={{ color: luxoraColors.softBrown }}>
              Mobile Number <span style={{ color: '#A6503E' }}>*</span>
            </label>
            <input
              id="est-mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/[^\d\s+-]/g, ''))}
              onBlur={() => validateField('mobileNumber')}
              aria-invalid={Boolean(errors.mobileNumber)}
              aria-describedby={errors.mobileNumber ? 'est-mobile-error' : 'est-mobile-why'}
              placeholder="10-digit mobile number"
              className={fieldClass}
              style={{ borderColor: errors.mobileNumber ? '#A6503E' : 'rgba(160,120,80,0.25)', color: luxoraColors.espresso }}
            />
            {errors.mobileNumber ? (
              <p id="est-mobile-error" className="mt-1.5 text-[12px]" style={{ color: '#A6503E' }}>
                {errors.mobileNumber}
              </p>
            ) : (
              <p id="est-mobile-why" className="mt-1.5 text-[11.5px] font-light" style={{ color: luxoraColors.mutedBeige }}>
                So your designer can reach you directly — never for telemarketing.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="est-city" className={labelClass} style={{ color: luxoraColors.softBrown }}>
              City <span style={{ color: '#A6503E' }}>*</span>
            </label>
            <input
              id="est-city"
              type="text"
              autoComplete="address-level2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onBlur={() => validateField('city')}
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? 'est-city-error' : undefined}
              placeholder="Your city"
              className={fieldClass}
              style={{ borderColor: errors.city ? '#A6503E' : 'rgba(160,120,80,0.25)', color: luxoraColors.espresso }}
            />
            {errors.city && (
              <p id="est-city-error" className="mt-1.5 text-[12px]" style={{ color: '#A6503E' }}>
                {errors.city}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="est-email" className={labelClass} style={{ color: luxoraColors.softBrown }}>
              Email <span className="normal-case font-medium tracking-normal">(optional)</span>
            </label>
            <input
              id="est-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className={fieldClass}
              style={{ borderColor: 'rgba(160,120,80,0.25)', color: luxoraColors.espresso }}
            />
          </div>

          <div>
            <span className={labelClass} style={{ color: luxoraColors.softBrown }}>
              When do you plan to start? <span className="normal-case font-medium tracking-normal">(optional)</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {TIMELINE_OPTIONS.map((opt) => (
                <GalleryFilterChip
                  key={opt.value}
                  label={opt.label}
                  active={timeline === opt.value}
                  onClick={() => setTimeline(timeline === opt.value ? null : opt.value)}
                />
              ))}
            </div>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={whatsappConsent}
              onChange={(e) => setWhatsappConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#C9A227]"
            />
            <span className="text-[12.5px] leading-snug font-light" style={{ color: luxoraColors.softBrown }}>
              Send my estimate and design updates on WhatsApp.
            </span>
          </label>

          {submitError && (
            <p role="alert" className="text-[12.5px] font-medium" style={{ color: '#A6503E' }}>
              {submitError}
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-[12px] font-light leading-relaxed" style={{ color: luxoraColors.mutedBeige }}>
          A senior Luxora designer will call within 24 hours. No spam, ever —{' '}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: luxoraColors.gold }}>
            privacy policy
          </a>
          .
        </p>
      </div>
    </EstimatorStepShell>
  );
}
