'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { luxoraContact } from '@/lib/content/global/contact';
import { submitConsultationRequest, ConsultationSubmissionError, type ConsultationFormData } from '@/lib/api/consultation';

export interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const PROPERTY_TYPES = ['Apartment', 'Independent House / Villa', 'Office / Commercial', 'Other'];
const PROJECT_TYPES = ['Full Home Interior', 'Modular Kitchen', 'Designer Wardrobes', 'Single Room', 'Renovation', 'Office Interior', 'Other'];
const BUDGET_RANGES = ['Under ₹15L', '₹15L – ₹30L', '₹30L – ₹50L', '₹50L – ₹75L', '₹75L+'];

const EMPTY_FORM: ConsultationFormData = {
  fullName: '',
  mobileNumber: '',
  email: '',
  city: '',
  propertyType: '',
  projectType: '',
  budgetRange: '',
  message: '',
};

const fieldClass =
  'w-full rounded-xl px-4 py-3 text-[14px] font-light bg-[#FDFAF6] border transition-colors duration-200 focus:outline-none';
const fieldStyle = { borderColor: 'rgba(160,120,80,0.25)', color: luxoraColors.espresso };

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [form, setForm] = useState<ConsultationFormData>(EMPTY_FORM);
  const [agreed, setAgreed] = useState(false);
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // ESC closes
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Reset form a moment after close, so the closing animation doesn't show a blank form
  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setForm(EMPTY_FORM);
      setAgreed(false);
      setState('idle');
      setErrorMessage('');
    }, 400);
    return () => clearTimeout(t);
  }, [isOpen]);

  const updateField = (key: keyof ConsultationFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || state === 'submitting') return;

    setState('submitting');
    setErrorMessage('');
    try {
      await submitConsultationRequest(form);
      setState('success');
    } catch (err) {
      setState('error');
      setErrorMessage(err instanceof ConsultationSubmissionError ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(20,14,6,0.55)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-modal-title"
            className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl"
            style={{
              background: 'rgba(253,250,246,0.97)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(201,162,39,0.25)',
              boxShadow: '0 30px 90px rgba(20,14,6,0.35)',
            }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[rgba(44,31,20,0.08)]"
              style={{ color: luxoraColors.espresso }}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="p-7 md:p-10">
              {state === 'success' ? (
                <div className="py-10 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: 'rgba(201,162,39,0.12)', border: '1.5px solid rgba(201,162,39,0.4)' }}
                  >
                    <svg className="w-7 h-7" fill="none" stroke={luxoraColors.gold} strokeWidth={2.2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-playfair text-2xl mb-3" style={{ color: luxoraColors.espresso }}>
                    Thank You
                  </h2>
                  <p className="text-[14px] leading-relaxed font-light mb-8 max-w-sm mx-auto" style={{ color: luxoraColors.softBrown }}>
                    Your request has been received. A Luxora design expert will reach out within 24 hours to schedule your free consultation.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-7 py-3 rounded-full font-bold text-[11px] tracking-[0.10em] uppercase"
                    style={{ background: luxoraColors.gold, color: '#1C1005' }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h2 id="consultation-modal-title" className="font-playfair text-[1.6rem] md:text-[1.8rem] leading-snug mb-2.5 pr-8" style={{ color: luxoraColors.espresso }}>
                    Book Your Free Design Consultation
                  </h2>
                  <p className="text-[13.5px] leading-relaxed font-light mb-7" style={{ color: luxoraColors.softBrown }}>
                    Talk to a Luxora Design Expert and receive personalised recommendations, budget guidance and a free consultation.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        required
                        type="text"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={updateField('fullName')}
                        className={fieldClass}
                        style={fieldStyle}
                      />
                      <input
                        required
                        type="tel"
                        placeholder="Mobile Number"
                        value={form.mobileNumber}
                        onChange={updateField('mobileNumber')}
                        className={fieldClass}
                        style={fieldStyle}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        required
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={updateField('email')}
                        className={fieldClass}
                        style={fieldStyle}
                      />
                      <input
                        required
                        type="text"
                        placeholder="City"
                        value={form.city}
                        onChange={updateField('city')}
                        className={fieldClass}
                        style={fieldStyle}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <select required value={form.propertyType} onChange={updateField('propertyType')} className={fieldClass} style={fieldStyle}>
                        <option value="" disabled>Property Type</option>
                        {PROPERTY_TYPES.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <select required value={form.projectType} onChange={updateField('projectType')} className={fieldClass} style={fieldStyle}>
                        <option value="" disabled>Project Type</option>
                        {PROJECT_TYPES.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <select required value={form.budgetRange} onChange={updateField('budgetRange')} className={fieldClass} style={fieldStyle}>
                      <option value="" disabled>Budget Range</option>
                      {BUDGET_RANGES.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>

                    <textarea
                      placeholder="Message (optional)"
                      value={form.message}
                      onChange={updateField('message')}
                      rows={3}
                      className={`${fieldClass} resize-none`}
                      style={fieldStyle}
                    />

                    <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                      <input
                        required
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#C9A227]"
                      />
                      <span className="text-[12.5px] leading-snug font-light" style={{ color: luxoraColors.softBrown }}>
                        I agree to the{' '}
                        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: luxoraColors.gold }}>
                          Privacy Policy
                        </a>
                        .
                      </span>
                    </label>

                    {state === 'error' && (
                      <p className="text-[12.5px] font-medium" style={{ color: '#B33A3A' }}>
                        {errorMessage}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={!agreed || state === 'submitting'}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-[11.5px] tracking-[0.08em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                        style={{ background: luxoraColors.gold, color: '#1C1005' }}
                      >
                        {state === 'submitting' ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          'Book Free Consultation'
                        )}
                      </button>
                      <a
                        href={luxoraContact.phone.href}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[11.5px] tracking-[0.08em] uppercase transition-all duration-300"
                        style={{ border: `1.5px solid rgba(44,31,20,0.18)`, color: luxoraColors.espresso }}
                      >
                        Call Now
                      </a>
                    </div>
                  </form>

                  <div className="mt-7 pt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px]" style={{ borderTop: '1px solid rgba(160,120,80,0.16)', color: luxoraColors.softBrown }}>
                    <a href={luxoraContact.phone.href} className="hover:underline">{luxoraContact.phone.display}</a>
                    <span className="w-1 h-1 rotate-45" style={{ background: 'rgba(201,162,39,0.5)' }} aria-hidden="true" />
                    <a href={luxoraContact.email.href} className="hover:underline">{luxoraContact.email.display}</a>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
