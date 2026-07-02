'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import ConsultationModal from './ConsultationModal';

interface ConsultationModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextValue | null>(null);

/**
 * ConsultationModalProvider — mounted once in the root layout so every
 * page (homepage + every service page) shares the exact same modal
 * instance. Call `useConsultationModal().open()` from any CTA to trigger
 * it — there is never more than one modal implementation on the site.
 */
export function ConsultationModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <ConsultationModalContext.Provider value={value}>
      {children}
      <ConsultationModal isOpen={isOpen} onClose={close} />
    </ConsultationModalContext.Provider>
  );
}

export function useConsultationModal(): ConsultationModalContextValue {
  const ctx = useContext(ConsultationModalContext);
  if (!ctx) {
    throw new Error('useConsultationModal must be used within a ConsultationModalProvider');
  }
  return ctx;
}
